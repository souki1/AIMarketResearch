-- CustomMarket - Create tables
-- In pgAdmin: 1) Create database "custommarket" 2) Right-click it -> Query Tool 3) Paste and run below
-- If you get "users_workspace_id_fkey" error, run: ALTER TABLE users DROP CONSTRAINT IF EXISTS users_workspace_id_fkey;

-- Users: each user has workspace_id
CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    name            VARCHAR(255),
    workspace_id    VARCHAR(36) NOT NULL,
    workspace_name  VARCHAR(255) NOT NULL
);

CREATE INDEX ix_users_email ON users (email);

-- Tabs: each tab has tab_id (id), belongs to workspace
CREATE TABLE data_tabs (
    id           SERIAL PRIMARY KEY,
    workspace_id VARCHAR(36) NOT NULL,
    name         VARCHAR(255) NOT NULL,
    sort_order   INTEGER DEFAULT 0
);

-- Research requests (selected rows/columns): user-submitted research tasks
CREATE TABLE IF NOT EXISTS research_requests (
    id              SERIAL PRIMARY KEY,
    workspace_id    VARCHAR(36) NOT NULL,
    file_id         INTEGER NOT NULL,
    filename        VARCHAR(255) NOT NULL DEFAULT '',
    selected_rows   JSONB NOT NULL DEFAULT '[]',
    selected_columns JSONB NOT NULL DEFAULT '[]',
    why_fields      TEXT NOT NULL DEFAULT '',
    what_result     TEXT NOT NULL DEFAULT '',
    status          VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Research All requests: all rows/columns selected (separate table)
CREATE TABLE IF NOT EXISTS research_all_requests (
    id              SERIAL PRIMARY KEY,
    workspace_id    VARCHAR(36) NOT NULL,
    file_id         INTEGER NOT NULL,
    filename        VARCHAR(255) NOT NULL DEFAULT '',
    total_rows      INTEGER NOT NULL DEFAULT 0,
    total_columns   INTEGER NOT NULL DEFAULT 0,
    why_fields      TEXT NOT NULL DEFAULT '',
    what_result     TEXT NOT NULL DEFAULT '',
    status          VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Analyze query: LLM analysis result (query template with placeholders)
CREATE TABLE IF NOT EXISTS analyze_query (
    id                      SERIAL PRIMARY KEY,
    workspace_id            VARCHAR(36) NOT NULL,
    research_request_id     INTEGER REFERENCES research_requests(id) ON DELETE SET NULL,
    research_all_request_id INTEGER REFERENCES research_all_requests(id) ON DELETE SET NULL,
    file_id                 INTEGER NOT NULL,
    filename                VARCHAR(255) NOT NULL DEFAULT '',
    query_template          TEXT NOT NULL DEFAULT '',
    selected_columns        JSONB NOT NULL DEFAULT '[]',
    why_fields              TEXT NOT NULL DEFAULT '',
    what_result             TEXT NOT NULL DEFAULT '',
    row_count               INTEGER NOT NULL DEFAULT 0,
    column_count            INTEGER NOT NULL DEFAULT 0,
    status                  VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Searchable query: per-row filled query (values placed, ready for search)
CREATE TABLE IF NOT EXISTS searchable_query (
    id              SERIAL PRIMARY KEY,
    analyze_query_id INTEGER NOT NULL REFERENCES analyze_query(id) ON DELETE CASCADE,
    workspace_id    VARCHAR(36) NOT NULL,
    row_index       INTEGER NOT NULL DEFAULT 0,
    row_values      JSONB NOT NULL DEFAULT '{}',
    query_text      TEXT NOT NULL DEFAULT '',
    status          VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS ix_searchable_query_analyze ON searchable_query(analyze_query_id);

-- Documents/Files: stored in MongoDB (flexible schema, no fixed structure)
-- MongoDB collections: documents, counters
