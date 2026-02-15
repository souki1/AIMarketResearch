"""Application configuration from environment variables."""
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/custommarket"
)
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-in-production")
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB = os.getenv("MONGODB_DB", "custommarket")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama2:latest")
SERPER_API_KEY = os.getenv("SERPER_API_KEY", "")
