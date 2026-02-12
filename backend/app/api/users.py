from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.db.models import User
from app.models.schemas import UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
def get_me(user: User = Depends(get_current_user)):
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        workspace_id=user.workspace_id,
        workspace_name=user.workspace.name,
    )
