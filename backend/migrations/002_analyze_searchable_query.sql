-- Migration: Add analyze_query and searchable_query tables for LLM query analysis
-- Run this in pgAdmin if your DB was created before these tables existed.

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
