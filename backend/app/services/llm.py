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

CRITICAL: The search will use ACTUAL VALUES from each row (e.g. Part Name="A10VSO18", Manufacturer="Bosch Rexroth"). You output a TEMPLATE with [ColumnName] placeholders. The system replaces each [ColumnName] with the real cell value from that row. Use EXACT column names in brackets.

STEP 1 - ANALYZE:
- User's requirement: {why_fields or 'Not specified'}
- Desired result: {what_result or 'Not specified'}
- Columns (use each as [ColumnName]): {columns_str}

STEP 2 - BUILD TEMPLATE:
(1) Add intent keywords from user's words (e.g. "price" "vendor" "competitors" if they said that).
(2) Add ALL column placeholders so each row's Part Name, Manufacturer, etc. are searched: {placeholders_example}
(3) Format: "keyword1" "keyword2" [Part Name] [Manufacturer] [Manufacturer Part Nr.] ...

Output ONLY one line. No JSON. No prefix. Example: "price" "vendor" [Part Name] [Product Group] [Manufacturer] [Manufacturer Part Nr.]"""
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
    """Replace [ColumnName] and ["ColumnName"] placeholders with actual row values."""
    result = template
    for col_name, val in zip(column_names, row_values):
        raw_val = str(val or "").strip()
        quoted_val = f'"{raw_val}"' if raw_val else ""
        result = result.replace(f'["{col_name}"]', quoted_val)
        result = result.replace(f"[{col_name}]", quoted_val)
    result = re.sub(r'\["[^\]]*"\]', "", result)
    result = re.sub(r"\[\w[^\]]*\]", "", result)
    result = " ".join(result.split())
    # Fallback: if empty/short, build from intent + all column values
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
    # Deduplicate: keep first occurrence of each quoted term (LLM may repeat placeholders)
    terms = re.findall(r'"([^"]+)"', result)
    seen: set[str] = set()
    deduped: list[str] = []
    for t in terms:
        key = t.strip().lower()
        if key and key not in seen:
            seen.add(key)
            deduped.append(f'"{t}"')
    return "+".join(deduped) if deduped else result.replace(" ", "+")


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
