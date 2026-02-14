"""Auth API routes."""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from app.core.database import async_session
from app.db.models import User
from app.schemas import LoginRequest, RegisterRequest
from app.services.auth import create_access_token, pwd_context
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
async def login(req: LoginRequest):
    async with async_session() as db:
        r = await db.execute(select(User).where(User.email == req.email))
        user = r.scalar_one_or_none()
    if not user or not pwd_context.verify(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"access_token": create_access_token(user.id)}


@router.post("/register")
async def register(req: RegisterRequest):
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


@router.get("/me")
async def auth_me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "workspace_id": user.workspace_id,
        "workspace_name": user.workspace_name,
    }
