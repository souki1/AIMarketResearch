"""Files API routes."""
import uuid
from fastapi import APIRouter, Depends, File, Form, Header, HTTPException, UploadFile
from fastapi.responses import Response
from bson import Binary

from app.core.mongodb import documents_coll, next_doc_seq, search_results_coll, to_json_safe
from app.db.models import User
from app.schemas import FileNotesUpdate, FileParsedDataUpdate
from app.services.file_parser import parse_excel_or_csv
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/files", tags=["files"])


@router.get("")
async def list_files(
    tab_id: int | None = None,
    user: User = Depends(get_current_user),
):
    query = {"workspace_id": user.workspace_id}
    if tab_id is not None:
        query["tab_id"] = tab_id
    cursor = documents_coll.find(query).sort("id", 1)
    files = []
    for doc in cursor:
        files.append({
            "id": doc["id"],
            "document_id": doc.get("document_id", ""),
            "filename": doc["filename"],
            "storage_path": "",
            "mime_type": doc.get("mime_type"),
            "size": doc.get("size"),
            "tab_id": doc.get("tab_id"),
            "parsed_data": doc.get("parsed_data"),
            "notes": doc.get("notes", ""),
        })
    return files


@router.post("/upload")
async def upload_files(
    files: list[UploadFile] = File(alias="files"),
    tab_id: int | None = Form(None),
    user: User = Depends(get_current_user),
):
    uploaded = []
    for uf in files:
        content = await uf.read()
        ext = (uf.filename or "").split(".")[-1].lower()
        parsed = parse_excel_or_csv(content, uf.filename or "") if ext in ("csv", "xlsx", "xls") else None
        doc_id = str(uuid.uuid4())
        seq_id = next_doc_seq()
        parsed_safe = to_json_safe(parsed) if parsed is not None else None
        doc = {
            "id": seq_id,
            "document_id": doc_id,
            "workspace_id": user.workspace_id,
            "tab_id": tab_id,
            "filename": uf.filename or "file",
            "mime_type": uf.content_type,
            "size": len(content),
            "file_content": Binary(content),
            "parsed_data": parsed_safe,
        }
        documents_coll.insert_one(doc)
        uploaded.append({
            "id": seq_id,
            "document_id": doc_id,
            "filename": doc["filename"],
            "storage_path": "",
            "mime_type": doc["mime_type"],
            "size": doc["size"],
            "tab_id": tab_id,
            "parsed_data": parsed_safe,
        })
    return {"uploaded": uploaded}


@router.get("/{file_id}/content")
async def get_file_content(
    file_id: int,
    user: User = Depends(get_current_user),
):
    doc = documents_coll.find_one({"id": file_id, "workspace_id": user.workspace_id})
    if not doc:
        raise HTTPException(status_code=404, detail="File not found")
    content = doc.get("file_content")
    if not content:
        raise HTTPException(status_code=404, detail="File content not found")
    return Response(
        content=bytes(content),
        media_type=doc.get("mime_type") or "application/octet-stream",
        headers={"Content-Disposition": f'attachment; filename="{doc["filename"]}"'},
    )


@router.patch("/{file_id}")
async def update_file_notes(
    file_id: int,
    body: FileNotesUpdate,
    user: User = Depends(get_current_user),
):
    r = documents_coll.update_one(
        {"id": file_id, "workspace_id": user.workspace_id},
        {"$set": {"notes": body.notes}},
    )
    if r.matched_count == 0:
        raise HTTPException(status_code=404, detail="File not found")
    return {"ok": True, "notes": body.notes}


@router.patch("/{file_id}/data")
async def update_file_parsed_data(
    file_id: int,
    body: FileParsedDataUpdate,
    user: User = Depends(get_current_user),
):
    parsed_safe = to_json_safe(body.parsed_data)
    r = documents_coll.update_one(
        {"id": file_id, "workspace_id": user.workspace_id},
        {"$set": {"parsed_data": parsed_safe}},
    )
    if r.matched_count == 0:
        raise HTTPException(status_code=404, detail="File not found")
    return {"ok": True, "parsed_data": parsed_safe}


@router.get("/{file_id}/search-results")
async def get_file_search_results(
    file_id: int,
    user: User = Depends(get_current_user),
):
    """Get search results for a file, keyed by data row index."""
    doc = documents_coll.find_one({"id": file_id, "workspace_id": user.workspace_id})
    if not doc:
        raise HTTPException(status_code=404, detail="File not found")
    cursor = search_results_coll.find(
        {"file_id": file_id, "workspace_id": user.workspace_id}
    ).sort("created_at", -1)
    by_row: dict[int, dict] = {}
    seen_rows: set[int] = set()
    for sr in cursor:
        row_idx = sr.get("data_row_index", sr.get("row_index", -1))
        if row_idx < 0 or row_idx in seen_rows:
            continue
        seen_rows.add(row_idx)
        results = sr.get("results") or []
        by_row[row_idx] = {
            "results_count": len(results),
            "results": results,
            "query_text": sr.get("query_text", ""),
            "query_used": sr.get("query_used", ""),
        }
    return {"by_row": by_row}


@router.delete("/{file_id}")
async def delete_file(file_id: int, user: User = Depends(get_current_user)):
    r = documents_coll.delete_one({"id": file_id, "workspace_id": user.workspace_id})
    if r.deleted_count == 0:
        raise HTTPException(status_code=404, detail="File not found")
    return {"ok": True}
