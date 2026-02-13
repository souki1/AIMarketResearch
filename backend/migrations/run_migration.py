"""
Run SQL migrations against the database.
Usage: python -m migrations.run_migration [migration_file.sql]
If no file given, runs 001_add_data_tabs.sql
"""
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import text
from app.db.database import engine
from app.core.config import settings


def run_sql_file(filepath: Path) -> None:
    sql = filepath.read_text()
    # Split by ; but keep multi-line statements together
    statements = []
    for part in sql.split(";"):
        stmt = part.strip()
        if stmt and not stmt.startswith("--"):
            statements.append(stmt)
    with engine.connect() as conn:
        for stmt in statements:
            try:
                conn.execute(text(stmt))
                conn.commit()
            except Exception as e:
                print(f"Warning (may be expected if already applied): {e}")
                conn.rollback()


def main():
    migrations_dir = Path(__file__).parent
    if len(sys.argv) > 1:
        migration_file = Path(sys.argv[1])
        if not migration_file.is_absolute():
            migration_file = migrations_dir / migration_file
    else:
        migration_file = migrations_dir / "001_add_data_tabs.sql"

    if not migration_file.exists():
        print(f"Migration file not found: {migration_file}")
        sys.exit(1)

    print(f"Running migration: {migration_file}")
    run_sql_file(migration_file)
    print("Done.")


if __name__ == "__main__":
    main()
