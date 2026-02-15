"""Research API routes."""
from fastapi import APIRouter, Depends, HTTPException

from app.core.database import async_session
from app.core.mongodb import documents_coll
from app.db.models import AnalyzeQuery, ResearchAllRequest, ResearchRequest, SearchableQuery, User
from app.schemas import ResearchAllRequestCreate, ResearchRequestCreate
from app.services.llm import call_ollama_for_query_template, fill_query_template, get_parsed_data
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/research-requests", tags=["research"])


@router.post("")
async def create_research_request(
    body: ResearchRequestCreate,
    user: User = Depends(get_current_user),
):
    doc = documents_coll.find_one({"id": body.file_id, "workspace_id": user.workspace_id})
    if not doc:
        raise HTTPException(status_code=404, detail="File not found")
    filename = doc.get("filename", "")
    headers, data_rows = get_parsed_data(doc)
    if not headers or not data_rows:
        raise HTTPException(status_code=400, detail="File has no tabular data")

    col_indices = [i for i in body.selected_columns if 0 <= i < len(headers)]
    row_indices = [i for i in body.selected_rows if 0 <= i < len(data_rows)]
    if not col_indices:
        col_indices = list(range(len(headers)))
    if not row_indices:
        row_indices = list(range(len(data_rows)))

    column_names = [headers[i] for i in col_indices]
    rows_to_process = [data_rows[i] for i in row_indices]

    query_template = call_ollama_for_query_template(
        column_names, body.why_fields, body.what_result
    )

    async with async_session() as db:
        req = ResearchRequest(
            workspace_id=user.workspace_id,
            file_id=body.file_id,
            filename=filename,
            selected_rows=body.selected_rows,
            selected_columns=body.selected_columns,
            why_fields=body.why_fields,
            what_result=body.what_result,
            status="pending",
        )
        db.add(req)
        await db.commit()
        await db.refresh(req)

        analyze = AnalyzeQuery(
            workspace_id=user.workspace_id,
            research_request_id=req.id,
            research_all_request_id=None,
            file_id=body.file_id,
            filename=filename,
            query_template=query_template,
            selected_columns=column_names,
            why_fields=body.why_fields,
            what_result=body.what_result,
            row_count=len(rows_to_process),
            column_count=len(column_names),
            status="completed",
        )
        db.add(analyze)
        await db.commit()
        await db.refresh(analyze)

        intent_keywords = f"{body.why_fields} {body.what_result}".strip()
        for row_idx, row in enumerate(rows_to_process):
            row_vals = [row[c] if c < len(row) else "" for c in col_indices]
            row_values_dict = dict(zip(column_names, row_vals))
            query_text = fill_query_template(
                query_template, column_names, row_vals, intent_keywords=intent_keywords
            )
            sq = SearchableQuery(
                analyze_query_id=analyze.id,
                workspace_id=user.workspace_id,
                row_index=row_idx,
                row_values=row_values_dict,
                query_text=query_text,
                status="pending",
            )
            db.add(sq)
        await db.commit()

    return {"id": req.id, "analyze_id": analyze.id, "searchable_count": len(rows_to_process), "ok": True}


# Research All - separate path to match frontend
router_all = APIRouter(prefix="/api/research-all-requests", tags=["research"])


@router_all.post("")
async def create_research_all_request(
    body: ResearchAllRequestCreate,
    user: User = Depends(get_current_user),
):
    doc = documents_coll.find_one({"id": body.file_id, "workspace_id": user.workspace_id})
    if not doc:
        raise HTTPException(status_code=404, detail="File not found")
    filename = doc.get("filename", "")
    headers, data_rows = get_parsed_data(doc)
    if not headers or not data_rows:
        raise HTTPException(status_code=400, detail="File has no tabular data")

    col_count = min(body.total_columns, len(headers)) or len(headers)
    row_count = min(body.total_rows, len(data_rows)) or len(data_rows)
    col_indices = list(range(col_count))
    row_indices = list(range(row_count))

    column_names = [headers[i] for i in col_indices]
    rows_to_process = [data_rows[i] for i in row_indices]

    query_template = call_ollama_for_query_template(
        column_names, body.why_fields, body.what_result
    )

    async with async_session() as db:
        req = ResearchAllRequest(
            workspace_id=user.workspace_id,
            file_id=body.file_id,
            filename=filename,
            total_rows=row_count,
            total_columns=col_count,
            why_fields=body.why_fields,
            what_result=body.what_result,
            status="pending",
        )
        db.add(req)
        await db.commit()
        await db.refresh(req)

        analyze = AnalyzeQuery(
            workspace_id=user.workspace_id,
            research_request_id=None,
            research_all_request_id=req.id,
            file_id=body.file_id,
            filename=filename,
            query_template=query_template,
            selected_columns=column_names,
            why_fields=body.why_fields,
            what_result=body.what_result,
            row_count=len(rows_to_process),
            column_count=len(column_names),
            status="completed",
        )
        db.add(analyze)
        await db.commit()
        await db.refresh(analyze)

        intent_keywords = f"{body.why_fields} {body.what_result}".strip()
        for row_idx, row in enumerate(rows_to_process):
            row_vals = [row[c] if c < len(row) else "" for c in col_indices]
            row_values_dict = dict(zip(column_names, row_vals))
            query_text = fill_query_template(
                query_template, column_names, row_vals, intent_keywords=intent_keywords
            )
            sq = SearchableQuery(
                analyze_query_id=analyze.id,
                workspace_id=user.workspace_id,
                row_index=row_idx,
                row_values=row_values_dict,
                query_text=query_text,
                status="pending",
            )
            db.add(sq)
        await db.commit()

    return {"id": req.id, "analyze_id": analyze.id, "searchable_count": len(rows_to_process), "ok": True}
