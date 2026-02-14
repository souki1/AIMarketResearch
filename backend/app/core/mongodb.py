"""MongoDB configuration."""
from bson import Binary
from pymongo import MongoClient, ReturnDocument

from app.core.config import MONGODB_DB, MONGODB_URI

_mongo_client = MongoClient(MONGODB_URI)
_mongo_db = _mongo_client[MONGODB_DB]
documents_coll = _mongo_db["documents"]
counters_coll = _mongo_db["counters"]


def next_doc_seq() -> int:
    """Get next numeric id for documents (frontend compatibility)."""
    r = counters_coll.find_one_and_update(
        {"_id": "document_seq"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    return r["seq"]


def to_json_safe(obj):
    """Convert parsed data to MongoDB-safe format (handles any structure)."""
    if obj is None:
        return None
    if isinstance(obj, (list, dict, str, int, float, bool)):
        return obj
    return str(obj)
