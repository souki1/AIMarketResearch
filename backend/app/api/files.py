import json
import uuid
from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.file_parser import parse_file_to_rows
from app.db import get_db
from app.db.models import UploadedFile, Workspace

router = APIRouter(prefix="/files", tags=["files"])

UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

DEFAULT_WORKSPACE_ID = "7474654407029309"


def get_workspace_id(db: Session) -> str:
    """Use default workspace for now. Can add auth later."""
    w = db.query(Workspace).filter(Workspace.id == DEFAULT_WORKSPACE_ID).first()
    if w:
        return w.id
    w = Workspace(id=DEFAULT_WORKSPACE_ID, name="workspace")
    db.add(w)
    db.commit()
    return w.id


@router.post("/upload")
def upload_files(
    files: list[UploadFile] = File(...),
    db: Annotated[Session, Depends(get_db)] = None,
):
    """Upload files and store in database."""
    workspace_id = get_workspace_id(db)
    saved = []

    for f in files:
        ext = Path(f.filename or "").suffix
        unique_name = f"{uuid.uuid4().hex}{ext}"
        path = UPLOAD_DIR / unique_name

        content = f.file.read()
        path.write_bytes(content)

        parsed_data = None
        try:
            rows = parse_file_to_rows(path, f.filename or "")
            if rows:
                parsed_data = json.dumps(rows)
        except Exception:
            pass

        rec = UploadedFile(
            filename=f.filename or "unnamed",
            storage_path=unique_name,
            mime_type=f.content_type,
            size=len(content),
            workspace_id=workspace_id,
            parsed_data=parsed_data,
        )
        db.add(rec)
        db.commit()
        db.refresh(rec)
        saved.append(
            {
                "id": rec.id,
                "filename": rec.filename,
                "storage_path": rec.storage_path,
                "mime_type": rec.mime_type,
                "size": rec.size,
                "parsed_data": json.loads(rec.parsed_data) if rec.parsed_data else None,
            }
        )

    return {"uploaded": saved}


@router.get("")
def list_files(db: Annotated[Session, Depends(get_db)] = None):
    """List all uploaded files for the workspace."""
    files = (
        db.query(UploadedFile)
        .filter(UploadedFile.workspace_id == DEFAULT_WORKSPACE_ID)
        .order_by(UploadedFile.created_at.desc())
        .all()
    )
    return [
        {
            "id": f.id,
            "filename": f.filename,
            "storage_path": f.storage_path,
            "mime_type": f.mime_type,
            "size": f.size,
            "parsed_data": json.loads(f.parsed_data) if f.parsed_data else None,
        }
        for f in files
    ]


@router.get("/{file_id}/data")
def get_file_data(file_id: int, db: Annotated[Session, Depends(get_db)] = None):
    """Get parsed file data as rows and columns."""
    rec = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
    if not rec:
        raise HTTPException(404, "File not found")
    if not rec.parsed_data:
        return {"filename": rec.filename, "rows": [], "columns": 0}
    rows = json.loads(rec.parsed_data)
    cols = len(rows[0]) if rows else 0
    return {"filename": rec.filename, "rows": rows, "columns": cols}


@router.get("/{file_id}/content")
def get_file_content(file_id: int, db: Annotated[Session, Depends(get_db)] = None):
    """Serve the file content (for images, downloads, etc.)."""
    rec = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
    if not rec:
        raise HTTPException(404, "File not found")
    path = UPLOAD_DIR / rec.storage_path
    if not path.exists():
        raise HTTPException(404, "File not found")
    return FileResponse(path, filename=rec.filename, media_type=rec.mime_type)


@router.delete("/{file_id}")
def delete_file(file_id: int, db: Annotated[Session, Depends(get_db)] = None):
    """Delete an uploaded file."""
    rec = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
    if not rec:
        raise HTTPException(404, "File not found")
    path = UPLOAD_DIR / rec.storage_path
    if path.exists():
        path.unlink()
    db.delete(rec)
    db.commit()
    return {"deleted": file_id}
