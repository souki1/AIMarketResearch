"""LLM service for query template generation."""
import re
import httpx
from fastapi import HTTPException

from app.core.config import OLLAMA_MODEL, OLLAMA_URL

def _extract_query_only(raw: str, column_names: list[str]) -> str:
    """Extract the search query template from LLM response. Reject JSON or malformed output."""
    if not raw:
        return ""
    text = raw.strip().strip('"\'')
    # Reject JSON-like output (LLM sometimes returns {"key": "val"} instead of a query)
    if text.strip().startswith("{") and "}" in text:
        return ""
    lines = [ln.strip().strip('"\'') for ln in text.split("\n") if ln.strip()]
    for line in lines:
        # Prefer line with [ColumnName] placeholders - that's the real template
        if "[" in line and "]" in line and "{" not in line and "}" not in line:
            return line
        if ":" in line and "{" not in line:
            after = line.split(":", 1)[-1].strip().strip('"\'')
            if after and len(after) < 200 and "{" not in after:
                return after
    for line in lines:
        if line and len(line) < 200 and "{" not in line:
            return line
    return ""


def call_ollama_for_query_template(
    column_names: list[str], why_fields: str, what_result: str
) -> str:
    columns_str = ", ".join(column_names)
    placeholders_example = " ".join(f"[{c}]" for c in column_names)
    prompt = f"""ANALYZE the user's requirement and the selected fields. Then output ONE Google search query TEMPLATE.

IMPORTANT: You output a TEMPLATE with [ColumnName] placeholders. The system will replace each [ColumnName] with the actual ROW VALUE from the file. Never put column headers as literal text—only [ColumnName] format. Do NOT use generic default keywords. Extract keywords ONLY from the user's actual words below.

STEP 1 - ANALYZE (use these exact inputs, not examples):
- User's requirement (why these fields): {why_fields or 'Not specified'}
- User's desired result: {what_result or 'Not specified'}
- Selected fields (MUST use each as [ColumnName]): {columns_str}

STEP 2 - BUILD THE TEMPLATE:
(1) Extract search keywords from the user's requirement and desired result above. If they say "price vendor competitors" use those. If they say "datasheet specifications" use those. NEVER use "alternative suppliers price vendor" unless the user actually wrote those words.
(2) Add ALL column placeholders: {placeholders_example}
(3) Format: "keyword1" "keyword2" [Column1] [Column2] ...

Output ONLY a single-line search query. Do NOT output JSON. Do NOT output Template: or any prefix. Example: "price" "vendor" [Part Name] [Manufacturer] [Manufacturer Part Nr.]"""
    try:
        with httpx.Client(timeout=60.0) as client:
            r = client.post(
                f"{OLLAMA_URL.rstrip('/')}/api/generate",
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": prompt,
                    "stream": False,
                    "system": "You output a single-line search query string with [ColumnName] placeholders. Never output JSON. Never output Template: or any prefix. Use exact column names in brackets.",
                },
            )
            r.raise_for_status()
            data = r.json()
            raw = (data.get("response") or "").strip()
            extracted = _extract_query_only(raw, column_names)
            if not extracted:
                # Fallback: build template from placeholders when LLM returns JSON or invalid output
                placeholders = " ".join(f"[{c}]" for c in column_names)
                return placeholders
            return extracted
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"LLM unavailable: {str(e)}. Ensure Ollama is running and the model is loaded.",
        )


def fill_query_template(
    template: str, column_names: list[str], row_values: list[str],
    intent_keywords: str = "",
) -> str:
    """Replace [ColumnName] placeholders with row values. Returns Google-searchable query."""
    result = template
    for col_name, val in zip(column_names, row_values):
        placeholder = f"[{col_name}]"
        raw_val = str(val or "").strip()
        quoted_val = f'"{raw_val}"' if raw_val else ""
        result = result.replace(placeholder, quoted_val)
    result = re.sub(r"\[\w[^\]]*\]", "", result)
    result = " ".join(result.split())
    # Fallback: if template produced empty/short result, build query from intent + values
    if not result or len(result) < 10:
        parts = []
        if intent_keywords:
            for kw in intent_keywords.split():
                if kw.strip():
                    parts.append(f'"{kw.strip()}"')
        for val in row_values:
            v = str(val or "").strip()
            if v:
                parts.append(f'"{v}"')
        result = " ".join(parts)
    return result


def get_parsed_data(doc: dict) -> tuple[list[str], list[list[str]]]:
    parsed = doc.get("parsed_data")
    if not parsed or not isinstance(parsed, list):
        return [], []
    rows = [[str(c or "") for c in r] for r in parsed]
    if not rows:
        return [], []
    headers = rows[0]
    data_rows = rows[1:]
    return headers, data_rows
