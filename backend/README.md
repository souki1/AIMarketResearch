# CustomMarket API

FastAPI backend for the CustomMarket AI-driven market research platform.

## PostgreSQL setup

1. Install PostgreSQL and create a database:
   ```sql
   CREATE DATABASE custommarket;
   ```

2. Copy `.env.example` to `.env` and set your connection string:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/custommarket
   ```

## Setup

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
pip install -r requirements.txt
```

> **Note:** If you get Rust/pydantic build errors on Python 3.13, use Python 3.11 or 3.12.

## Run

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

## Demo credentials

- **Email:** demo@custommarket.com  
- **Password:** demo123  

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/register | Sign up (email, password, name?) |
| POST | /api/auth/login | Login (email, password) → JWT |
| GET | /api/auth/me | Current user (requires Bearer token) |
| GET | /api/users/me | Current user (requires Bearer token) |
| GET | /api/dashboard/stats | Dashboard stats (requires Bearer token) |
| GET | /api/dashboard/search?q= | Search (requires Bearer token) |

## CORS

Configured for `http://localhost:5173` (Vite default) and `http://localhost:3000`. Add more origins in `main.py` if needed.
