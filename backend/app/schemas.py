"""Pydantic request/response schemas."""
from pydantic import BaseModel


# Auth
class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str | None = None


# Tabs
class TabCreate(BaseModel):
    name: str = "New Tab"


class TabRename(BaseModel):
    name: str


# Files
class FileNotesUpdate(BaseModel):
    notes: str = ""


class FileParsedDataUpdate(BaseModel):
    parsed_data: list[list[str]]


# Research
class ResearchRequestCreate(BaseModel):
    file_id: int
    selected_rows: list[int] = []
    selected_columns: list[int] = []
    why_fields: str = ""
    what_result: str = ""


class ResearchAllRequestCreate(BaseModel):
    file_id: int
    total_rows: int = 0
    total_columns: int = 0
    why_fields: str = ""
    what_result: str = ""
