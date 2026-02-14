"""Tabs API routes."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func

from app.core.database import async_session
from app.core.mongodb import documents_coll
from app.db.models import DataTab, User
from app.schemas import TabCreate, TabRename
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/tabs", tags=["tabs"])


@router.get("")
async def list_tabs(user: User = Depends(get_current_user)):
    async with async_session() as db:
        r = await db.execute(
            select(DataTab)
            .where(DataTab.workspace_id == user.workspace_id)
            .order_by(DataTab.sort_order, DataTab.id)
        )
        tabs = r.scalars().all()
    tab_ids = [t.id for t in tabs]
    pipeline = [
        {"$match": {"workspace_id": user.workspace_id, "tab_id": {"$in": tab_ids}}},
        {"$group": {"_id": "$tab_id", "count": {"$sum": 1}}},
    ]
    counts = {r["_id"]: r["count"] for r in documents_coll.aggregate(pipeline)}
    return [
        {"id": t.id, "name": t.name, "sort_order": t.sort_order, "file_count": counts.get(t.id, 0)}
        for t in tabs
    ]


@router.post("")
async def create_tab(body: TabCreate, user: User = Depends(get_current_user)):
    async with async_session() as db:
        r = await db.execute(
            select(func.coalesce(func.max(DataTab.sort_order), 0))
            .where(DataTab.workspace_id == user.workspace_id)
        )
        max_order = (r.scalar() or 0) + 1
        tab = DataTab(workspace_id=user.workspace_id, name=body.name, sort_order=max_order)
        db.add(tab)
        await db.commit()
        await db.refresh(tab)
    return {"id": tab.id, "name": tab.name, "sort_order": tab.sort_order}


@router.patch("/{tab_id}")
async def rename_tab(tab_id: int, body: TabRename, user: User = Depends(get_current_user)):
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
        tab.name = body.name
        await db.commit()
        await db.refresh(tab)
    return {"id": tab.id, "name": tab.name, "sort_order": tab.sort_order}
