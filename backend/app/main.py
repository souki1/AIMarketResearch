"""CustomMarket FastAPI application."""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.database import engine, init_db
from app.core.mongodb import _mongo_client
from app.api.auth import router as auth_router
from app.api.tabs import router as tabs_router
from app.api.files import router as files_router
from app.api.research import router as research_router, router_all as research_all_router

app = FastAPI(title="CustomMarket API")


@app.on_event("startup")
def startup():
    init_db()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(tabs_router)
app.include_router(files_router)
app.include_router(research_router)
app.include_router(research_all_router)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/health/db")
async def health_db():
    result = {}
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        result["postgresql"] = "connected"
    except Exception as e:
        result["postgresql"] = str(e)
    try:
        _mongo_client.admin.command("ping")
        result["mongodb"] = "connected"
    except Exception as e:
        result["mongodb"] = str(e)
    if result.get("postgresql") != "connected" or result.get("mongodb") != "connected":
        raise HTTPException(status_code=503, detail=result)
    return {"status": "ok", **result}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
