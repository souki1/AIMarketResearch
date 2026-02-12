from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, dashboard, users
from app.db.database import engine
from app.db.models import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    # Seed demo user for testing (email: demo@custommarket.com, password: demo123)
    from app.db import SessionLocal
    from app.db.models import User, Workspace
    from app.core.security import get_password_hash

    db = SessionLocal()
    try:
        if db.query(User).filter(User.email == "demo@custommarket.com").first() is None:
            w = Workspace(id="7474654407029309", name="workspace")
            db.add(w)
            db.commit()
            u = User(
                email="demo@custommarket.com",
                hashed_password=get_password_hash("demo123"),
                name="Demo User",
                workspace_id="7474654407029309",
            )
            db.add(u)
            db.commit()
    finally:
        db.close()
    yield


app = FastAPI(
    title="CustomMarket API",
    description="Backend API for CustomMarket - AI-driven market research platform",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "CustomMarket API", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
