from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.dependencies import get_optional_user
from app.db import get_db
from app.db.models import DataTab, User, Workspace

router = APIRouter(prefix="/tabs", tags=["tabs"])

DEFAULT_WORKSPACE_ID = "7474654407029309"


class CreateTabBody(BaseModel):
    name: str = "New Tab"


def ensure_workspace(db: Session, user: User | None) -> str:
    workspace_id = user.workspace_id if user else DEFAULT_WORKSPACE_ID
    w = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if w:
        return w.id
    w = Workspace(id=workspace_id, name="workspace")
    db.add(w)
    db.commit()
    return w.id


@router.get("")
def list_tabs(
    db: Annotated[Session, Depends(get_db)] = None,
    user: Annotated[User | None, Depends(get_optional_user)] = None,
):
    """List all tabs for the workspace."""
    workspace_id = user.workspace_id if user else DEFAULT_WORKSPACE_ID
    ensure_workspace(db, user)
    tabs = (
        db.query(DataTab)
        .filter(DataTab.workspace_id == workspace_id)
        .order_by(DataTab.sort_order.asc(), DataTab.created_at.asc())
        .all()
    )
    return [{"id": t.id, "name": t.name, "sort_order": t.sort_order} for t in tabs]


@router.patch("/{tab_id}")
def rename_tab(
    tab_id: int,
    body: CreateTabBody | None = None,
    db: Annotated[Session, Depends(get_db)] = None,
    user: Annotated[User | None, Depends(get_optional_user)] = None,
):
    """Rename a tab."""
    workspace_id = user.workspace_id if user else DEFAULT_WORKSPACE_ID
    tab = (
        db.query(DataTab)
        .filter(DataTab.id == tab_id, DataTab.workspace_id == workspace_id)
        .first()
    )
    if not tab:
        raise HTTPException(404, "Tab not found")
    name = (body or CreateTabBody()).name
    tab.name = name or "New Tab"
    db.commit()
    db.refresh(tab)
    return {"id": tab.id, "name": tab.name, "sort_order": tab.sort_order}


@router.post("")
def create_tab(
    body: CreateTabBody | None = None,
    db: Annotated[Session, Depends(get_db)] = None,
    user: Annotated[User | None, Depends(get_optional_user)] = None,
):
    """Create a new tab."""
    name = (body or CreateTabBody()).name
    workspace_id = ensure_workspace(db, user)
    max_order = (
        db.query(DataTab)
        .filter(DataTab.workspace_id == workspace_id)
        .count()
    )
    tab = DataTab(name=name or "New Tab", workspace_id=workspace_id, sort_order=max_order)
    db.add(tab)
    db.commit()
    db.refresh(tab)
    return {"id": tab.id, "name": tab.name, "sort_order": tab.sort_order}
