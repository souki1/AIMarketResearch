"""
CustomMarket backend - PostgreSQL only.
"""
import csv
import io
import os
import uuid
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy import JSON, Column, Integer, String, create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

try:
    import openpyxl
except ImportError:
    openpyxl = None

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/aimarket"
)
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-in-production")
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Sync engine for migrations (create tables)
SYNC_URL = DATABASE_URL.replace("+asyncpg", "").replace("postgresql+asyncpg", "postgresql")
engine_sync = create_engine(SYNC_URL)
engine = create_async_engine(DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=True)
    workspace_id = Column(String(36), nullable=False)
    workspace_name = Column(String(255), nullable=False)


class DataTab(Base):
    __tablename__ = "data_tabs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    workspace_id = Column(String(36), nullable=False)
    name = Column(String(255), nullable=False)
    sort_order = Column(Integer, default=0)


class StoredFile(Base):
    __tablename__ = "stored_files"
    id = Column(Integer, primary_key=True, autoincrement=True)
    workspace_id = Column(String(36), nullable=False)
    tab_id = Column(Integer, nullable=True)
    filename = Column(String(255), nullable=False)
    storage_path = Column(String(512), nullable=False)
    mime_type = Column(String(128), nullable=True)
    size = Column(Integer, nullable=True)
    parsed_data = Column(JSON, nullable=True)


def _init_db():
    try:
        Base.metadata.create_all(engine_sync)
    except Exception as e:
        print(f"PostgreSQL connection failed: {e}")
        print("Create backend/.env with: DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@localhost:5432/aimarket")


def parse_excel_or_csv(content: bytes, filename: str) -> list[list[str]]:
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext == "csv":
        text = content.decode("utf-8", errors="replace")
        reader = csv.reader(io.StringIO(text))
        return [row for row in reader]
    if ext in ("xlsx", "xls") and openpyxl:
        from openpyxl import load_workbook
        wb = load_workbook(io.BytesIO(content), read_only=True, data_only=True)
        ws = wb.active
        return [[str(c.value or "") for c in row] for row in ws.iter_rows()]
    return []


def create_access_token(user_id: int) -> str:
    return jwt.encode({"sub": str(user_id)}, SECRET_KEY, algorithm="HS256")


def get_user_id_from_token(token: str) -> int | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return int(payload.get("sub", 0))
    except (JWTError, ValueError):
        return None


async def get_current_user(authorization: str | None = Header(None, alias="Authorization")) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ", 1)[1]
    user_id = get_user_id_from_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    async with async_session() as db:
        from sqlalchemy import select
        r = await db.execute(select(User).where(User.id == user_id))
        user = r.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


app = FastAPI(title="CustomMarket API")


@app.on_event("startup")
def startup():
    _init_db()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Auth ---
class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str | None = None


@app.post("/api/auth/login")
async def login(req: LoginRequest):
    from sqlalchemy import select
    async with async_session() as db:
        r = await db.execute(select(User).where(User.email == req.email))
        user = r.scalar_one_or_none()
    if not user or not pwd_context.verify(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"access_token": create_access_token(user.id)}


@app.post("/api/auth/register")
async def register(req: RegisterRequest):
    from sqlalchemy import select
    async with async_session() as db:
        r = await db.execute(select(User).where(User.email == req.email))
        if r.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Email already registered")
        ws_id = str(uuid.uuid4())
        ws_name = (req.name or req.email.split("@")[0]) + "'s Workspace"
        user = User(
            email=req.email,
            hashed_password=pwd_context.hash(req.password),
            name=req.name,
            workspace_id=ws_id,
            workspace_name=ws_name,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "workspace_id": user.workspace_id,
        "workspace_name": user.workspace_name,
    }


@app.get("/api/auth/me")
async def auth_me(authorization: str | None = Header(None, alias="Authorization")):
    user = await get_current_user(authorization)
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "workspace_id": user.workspace_id,
        "workspace_name": user.workspace_name,
    }


# --- Tabs ---
@app.get("/api/tabs")
async def list_tabs(authorization: str | None = Header(None, alias="Authorization")):
    user = await get_current_user(authorization)
    from sqlalchemy import select
    async with async_session() as db:
        r = await db.execute(
            select(DataTab)
            .where(DataTab.workspace_id == user.workspace_id)
            .order_by(DataTab.sort_order, DataTab.id)
        )
        tabs = r.scalars().all()
    return [{"id": t.id, "name": t.name, "sort_order": t.sort_order} for t in tabs]


class TabCreate(BaseModel):
    name: str = "New Tab"


class TabRename(BaseModel):
    name: str


@app.post("/api/tabs")
async def create_tab(
    body: TabCreate,
    authorization: str | None = Header(None, alias="Authorization"),
):
    user = await get_current_user(authorization)
    name = body.name
    from sqlalchemy import select, func
    async with async_session() as db:
        r = await db.execute(
            select(func.coalesce(func.max(DataTab.sort_order), 0))
            .where(DataTab.workspace_id == user.workspace_id)
        )
        max_order = (r.scalar() or 0) + 1
        tab = DataTab(workspace_id=user.workspace_id, name=name, sort_order=max_order)
        db.add(tab)
        await db.commit()
        await db.refresh(tab)
    return {"id": tab.id, "name": tab.name, "sort_order": tab.sort_order}


@app.patch("/api/tabs/{tab_id}")
async def rename_tab(tab_id: int, body: TabRename, authorization: str | None = Header(None, alias="Authorization")):
    user = await get_current_user(authorization)
    name = body.name
    from sqlalchemy import select
    async with async_session() as db:
        r = await db.execute(
            select(DataTab).where(
                DataTab.id == tab_id,
                DataTab.workspace_id == user.workspace_id,
            )
        )
        tab = r.scalar_one_or_none()
        if not tab:
            raise HTTPException(status_code=404, detail="Tab not found")
        tab.name = name
        await db.commit()
        await db.refresh(tab)
    return {"id": tab.id, "name": tab.name, "sort_order": tab.sort_order}


# --- Files ---
@app.get("/api/files")
async def list_files(tab_id: int | None = None, authorization: str | None = Header(None, alias="Authorization")):
    user = await get_current_user(authorization)
    from sqlalchemy import select
    async with async_session() as db:
        q = select(StoredFile).where(StoredFile.workspace_id == user.workspace_id)
        if tab_id is not None:
            q = q.where(StoredFile.tab_id == tab_id)
        r = await db.execute(q)
        files = r.scalars().all()
    return [
        {
            "id": f.id,
            "filename": f.filename,
            "storage_path": f.storage_path,
            "mime_type": f.mime_type,
            "size": f.size,
            "tab_id": f.tab_id,
            "parsed_data": f.parsed_data,
        }
        for f in files
    ]


@app.post("/api/files/upload")
async def upload_files(
    files: list[UploadFile] = File(alias="files"),
    tab_id: int | None = Form(None),
    authorization: str | None = Header(None, alias="Authorization"),
):
    user = await get_current_user(authorization)
    uploaded = []
    for uf in files:
        content = await uf.read()
        ext = (uf.filename or "").split(".")[-1].lower()
        parsed = parse_excel_or_csv(content, uf.filename or "") if ext in ("csv", "xlsx", "xls") else None
        storage_name = f"{user.workspace_id}/{uuid.uuid4().hex}_{uf.filename}"
        path = UPLOAD_DIR / storage_name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content)
        async with async_session() as db:
            f = StoredFile(
                workspace_id=user.workspace_id,
                tab_id=tab_id,
                filename=uf.filename or "file",
                storage_path=str(path),
                mime_type=uf.content_type,
                size=len(content),
                parsed_data=parsed,
            )
            db.add(f)
            await db.commit()
            await db.refresh(f)
        uploaded.append({
            "id": f.id,
            "filename": f.filename,
            "storage_path": f.storage_path,
            "mime_type": f.mime_type,
            "size": f.size,
            "tab_id": f.tab_id,
            "parsed_data": f.parsed_data,
        })
    return {"uploaded": uploaded}


@app.get("/api/files/{file_id}/content")
async def get_file_content(
    file_id: int,
    authorization: str | None = Header(None, alias="Authorization"),
    token: str | None = None,
):
    auth = authorization or (f"Bearer {token}" if token else None)
    user = await get_current_user(auth)
    from sqlalchemy import select
    async with async_session() as db:
        r = await db.execute(
            select(StoredFile).where(
                StoredFile.id == file_id,
                StoredFile.workspace_id == user.workspace_id,
            )
        )
        f = r.scalar_one_or_none()
    if not f:
        raise HTTPException(status_code=404, detail="File not found")
    path = Path(f.storage_path)
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    from fastapi.responses import FileResponse
    return FileResponse(path, filename=f.filename)


@app.delete("/api/files/{file_id}")
async def delete_file(file_id: int, authorization: str | None = Header(None, alias="Authorization")):
    user = await get_current_user(authorization)
    from sqlalchemy import select
    async with async_session() as db:
        r = await db.execute(
            select(StoredFile).where(
                StoredFile.id == file_id,
                StoredFile.workspace_id == user.workspace_id,
            )
        )
        f = r.scalar_one_or_none()
        if not f:
            raise HTTPException(status_code=404, detail="File not found")
        await db.delete(f)
        await db.commit()
    path = Path(f.storage_path)
    if path.exists():
        path.unlink(missing_ok=True)
    return {"ok": True}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/health/db")
async def health_db():
    from sqlalchemy import text
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
