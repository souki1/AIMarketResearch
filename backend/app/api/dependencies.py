"""FastAPI dependencies."""
from fastapi import Header, HTTPException, Query
from sqlalchemy import select

from app.core.database import async_session
from app.db.models import User
from app.services.auth import get_user_id_from_token


async def get_current_user(
    authorization: str | None = Header(None, alias="Authorization"),
    token: str | None = Query(None),
) -> User:
    auth = authorization or (f"Bearer {token}" if token else None)
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token_val = auth.split(" ", 1)[1]
    user_id = get_user_id_from_token(token_val)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    async with async_session() as db:
        r = await db.execute(select(User).where(User.id == user_id))
        user = r.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
