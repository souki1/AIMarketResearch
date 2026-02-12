from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    password: str
    name: str | None = None


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    email: str
    name: str | None
    workspace_id: str
    workspace_name: str


class WorkspaceResponse(BaseModel):
    id: str
    name: str


class DashboardStats(BaseModel):
    total_surveys: int
    total_responses: int
    active_projects: int


class SearchResult(BaseModel):
    id: str
    type: str
    title: str
    link: str
