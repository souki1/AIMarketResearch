from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db import get_db
from app.db.models import User, Workspace
from app.models.schemas import Token, UserCreate, UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
def register(data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    # Create default workspace for new user
    workspace_id = str(hash(data.email) % 10**16)
    workspace = Workspace(id=workspace_id, name="workspace")
    db.add(workspace)
    db.commit()
    user = User(
        email=data.email,
        hashed_password=get_password_hash(data.password),
        name=data.name,
        workspace_id=workspace_id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        workspace_id=user.workspace_id,
        workspace_name=user.workspace.name,
    )


@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = create_access_token(subject=user.id)
    return Token(access_token=token)


@router.get("/me", response_model=UserResponse)
def me(user: User = Depends(get_current_user)):
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        workspace_id=user.workspace_id,
        workspace_name=user.workspace.name,
    )
