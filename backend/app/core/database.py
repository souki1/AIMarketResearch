"""PostgreSQL database configuration."""
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import DATABASE_URL
from app.db.models import Base

SYNC_URL = DATABASE_URL.replace("+asyncpg", "").replace("postgresql+asyncpg", "postgresql")
engine_sync = create_engine(SYNC_URL)
engine = create_async_engine(DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


def init_db():
    """Create all tables if they don't exist."""
    try:
        Base.metadata.create_all(engine_sync)
    except Exception as e:
        print(f"PostgreSQL connection failed: {e}")
        print("Create backend/.env with: DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@localhost:5432/aimarket")
