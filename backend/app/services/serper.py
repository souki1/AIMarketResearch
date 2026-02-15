"""Serper.dev Google Search API integration."""
import asyncio
import httpx
from fastapi import HTTPException

from app.core.config import SERPER_API_KEY

SERPER_SEARCH_URL = "https://google.serper.dev/search"
RESULTS_PER_PAGE = 10


def format_query_for_search(query_text: str) -> str:
    """Remove extra spaces and replace spaces with + for search."""
    if not query_text:
        return ""
    return "+".join(query_text.split())


async def search_serper(query_text: str) -> tuple[list[dict], str]:
    """
    Search using Serper.dev API with pagination. Returns (results, query_used).
    Fetches page 1, then page 2, etc. until a page returns fewer than 10 results.
    query_text: search query (spaces will be replaced with +)
    Raises HTTPException if SERPER_API_KEY not set or API fails.
    """
    if not SERPER_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="SERPER_API_KEY not configured. Set it in .env to enable web search.",
        )
    formatted = format_query_for_search(query_text)
    if not formatted:
        return [], ""
    try:
        all_results: list[dict] = []
        page = 1
        async with httpx.AsyncClient(timeout=15.0) as client:
            while True:
                r = await client.post(
                    SERPER_SEARCH_URL,
                    json={"q": formatted, "page": page},
                    headers={
                        "X-Api-Key": SERPER_API_KEY,
                        "Content-Type": "application/json",
                    },
                )
                r.raise_for_status()
                data = r.json()
                organic = data.get("organic") or []
                for item in organic:
                    all_results.append(dict(item))
                if len(organic) < RESULTS_PER_PAGE:
                    break
                page += 1
                if page > 5:
                    break
                await asyncio.sleep(0.3)
        return all_results, formatted
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Serper API error: {e.response.text}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Serper search failed: {str(e)}",
        )


def is_serper_configured() -> bool:
    """Check if Serper API key is set."""
    return bool(SERPER_API_KEY)
