"""SQLAlchemy ORM models."""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=True)
    workspace_id = Column(String(36), nullable=False)
    workspace_name = Column(String(255), nullable=False)


class DataTab(Base):
    __tablename__ = "data_tabs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    workspace_id = Column(String(36), nullable=False)
    name = Column(String(255), nullable=False)
    sort_order = Column(Integer, default=0)


class ResearchRequest(Base):
    __tablename__ = "research_requests"
    id = Column(Integer, primary_key=True, autoincrement=True)
    workspace_id = Column(String(36), nullable=False)
    file_id = Column(Integer, nullable=False)
    filename = Column(String(255), nullable=False, default="")
    selected_rows = Column(JSONB, nullable=False, default=list)
    selected_columns = Column(JSONB, nullable=False, default=list)
    why_fields = Column(Text, nullable=False, default="")
    what_result = Column(Text, nullable=False, default="")
    status = Column(String(50), nullable=False, default="pending")
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


class ResearchAllRequest(Base):
    __tablename__ = "research_all_requests"
    id = Column(Integer, primary_key=True, autoincrement=True)
    workspace_id = Column(String(36), nullable=False)
    file_id = Column(Integer, nullable=False)
    filename = Column(String(255), nullable=False, default="")
    total_rows = Column(Integer, nullable=False, default=0)
    total_columns = Column(Integer, nullable=False, default=0)
    why_fields = Column(Text, nullable=False, default="")
    what_result = Column(Text, nullable=False, default="")
    status = Column(String(50), nullable=False, default="pending")
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


class AnalyzeQuery(Base):
    __tablename__ = "analyze_query"
    id = Column(Integer, primary_key=True, autoincrement=True)
    workspace_id = Column(String(36), nullable=False)
    research_request_id = Column(Integer, nullable=True)
    research_all_request_id = Column(Integer, nullable=True)
    file_id = Column(Integer, nullable=False)
    filename = Column(String(255), nullable=False, default="")
    query_template = Column(Text, nullable=False, default="")
    selected_columns = Column(JSONB, nullable=False, default=list)
    why_fields = Column(Text, nullable=False, default="")
    what_result = Column(Text, nullable=False, default="")
    row_count = Column(Integer, nullable=False, default=0)
    column_count = Column(Integer, nullable=False, default=0)
    status = Column(String(50), nullable=False, default="pending")
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


class SearchableQuery(Base):
    __tablename__ = "searchable_query"
    id = Column(Integer, primary_key=True, autoincrement=True)
    analyze_query_id = Column(Integer, nullable=False)
    workspace_id = Column(String(36), nullable=False)
    row_index = Column(Integer, nullable=False, default=0)
    row_values = Column(JSONB, nullable=False, default=dict)
    query_text = Column(Text, nullable=False, default="")
    status = Column(String(50), nullable=False, default="pending")
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
