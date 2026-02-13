-- CustomMarket - Create tables
-- In pgAdmin: 1) Create database "custommarket" 2) Right-click it -> Query Tool 3) Paste and run below
-- If you get "users_workspace_id_fkey" error, run: ALTER TABLE users DROP CONSTRAINT IF EXISTS users_workspace_id_fkey;

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    name            VARCHAR(255),
    workspace_id    VARCHAR(36) NOT NULL,
    workspace_name  VARCHAR(255) NOT NULL
);

CREATE INDEX ix_users_email ON users (email);

CREATE TABLE data_tabs (
    id           SERIAL PRIMARY KEY,
    workspace_id VARCHAR(36) NOT NULL,
    name         VARCHAR(255) NOT NULL,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE stored_files (
    id           SERIAL PRIMARY KEY,
    workspace_id VARCHAR(36) NOT NULL,
    tab_id       INTEGER,
    filename     VARCHAR(255) NOT NULL,
    storage_path VARCHAR(512) NOT NULL,
    mime_type    VARCHAR(128),
    size         INTEGER,
    parsed_data  JSONB
);
