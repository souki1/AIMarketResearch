"""LLM service for query template generation."""
import re
import httpx
from fastapi import HTTPException

from app.core.config import OLLAMA_MODEL, OLLAMA_URL

_LLM_FILLER_PATTERNS = [
    r"^(?:Sure!?|Okay!?|Certainly!?)\s*",
    r"^(?:Based on (?:the )?information provided,?\s*)?(?:here is|here's) (?:a |the )?(?:short )?search query (?:that you can use|below):?\s*",
    r"^(?:You can use (?:the )?following (?:search )?query:?\s*)?",
    r"^(?:The (?:search )?query (?:is|would be):?\s*)?",
    r"^[^\[\w]*(?:query|search):\s*",
    r"^[\[].*$",
]


def _extract_query_only(raw: str, column_names: list[str]) -> str:
    if not raw:
        return ""
    text = raw.strip().strip('"\'')
    for pat in _LLM_FILLER_PATTERNS:
        text = re.sub(pat, "", text, flags=re.IGNORECASE).strip()
    lines = [ln.strip().strip('"\'') for ln in text.split("\n") if ln.strip()]
    for line in lines:
        if "[" in line and "]" in line:
            return line
        if ":" in line:
            after = line.split(":", 1)[-1].strip().strip('"\'')
            if after and len(after) < 100:
                return after
    for line in lines:
        if line and len(line) < 150:
            return line
    return ""


def call_ollama_for_query_template(
    column_names: list[str], why_fields: str, what_result: str
) -> str:
    columns_str = ", ".join(column_names)
    placeholders_example = " ".join(f"[{c}]" for c in column_names)
    prompt = f"""ANALYZE the user's requirement and the selected fields. Then output ONE Google search query TEMPLATE.

IMPORTANT: You output a TEMPLATE with [ColumnName] placeholders. The system will replace each [ColumnName] with the actual ROW VALUE (e.g. [Part Name] becomes "NTN Tapered Roller Bearing", [Manufacturer Part] becomes "4T-30205"). The final search query will have VALUES in quotes, NOT column headers. Never put "Part Name" or headers as literal text—only [ColumnName] format.

STEP 1 - ANALYZE:
- User's requirement: {why_fields or 'Not specified'}
- User's desired result: {what_result or 'Not specified'}
- Selected fields (use as [ColumnName] placeholders): {columns_str}

STEP 2 - BUILD THE TEMPLATE:
Include: (1) search terms from user intent in "quotes", (2) each column as [ColumnName] so it gets replaced with actual values.
Example: "alternative suppliers" "price" "vendor" {placeholders_example}
When filled, this becomes: "alternative suppliers" "price" "vendor" "NTN Tapered Roller Bearing" "Bearings" "NTN" "4T-30205"

Output ONLY the template, nothing else:"""
    try:
        with httpx.Client(timeout=60.0) as client:
            r = client.post(
                f"{OLLAMA_URL.rstrip('/')}/api/generate",
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": prompt,
                    "stream": False,
                    "system": "You output a search query TEMPLATE with [ColumnName] placeholders. Each placeholder will be replaced with the actual row value (e.g. [Part Name] -> 'Siemens Circuit Breaker'). The final query has values in quotes, not headers. Output only the template.",
                },
            )
            r.raise_for_status()
            data = r.json()
            raw = (data.get("response") or "").strip()
            extracted = _extract_query_only(raw, column_names)
            if not extracted:
                raise HTTPException(
                    status_code=503,
                    detail="LLM did not return a valid query. Please try again or rephrase your request.",
                )
            return extracted
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"LLM unavailable: {str(e)}. Ensure Ollama is running and the model is loaded.",
        )


def fill_query_template(
    template: str, column_names: list[str], row_values: list[str]
) -> str:
    result = template
    for col_name, val in zip(column_names, row_values):
        placeholder = f"[{col_name}]"
        raw_val = str(val or "").strip()
        quoted_val = f'"{raw_val}"' if raw_val else ""
        result = result.replace(placeholder, quoted_val)
    result = re.sub(r"\[\w[^\]]*\]", "", result)
    return " ".join(result.split())


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
