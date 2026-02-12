from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.db.models import User
from app.models.schemas import DashboardStats, SearchResult

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStats)
def get_stats(user: User = Depends(get_current_user)):
    """Dashboard stats for the app home."""
    return DashboardStats(
        total_surveys=0,
        total_responses=0,
        active_projects=0,
    )


@router.get("/search", response_model=list[SearchResult])
def search(
    q: str = "",
    user: User = Depends(get_current_user),
):
    """Search across surveys, projects, etc. Used by the app navbar search."""
    if not q.strip():
        return []
    # Placeholder: return empty results for now
    return []
