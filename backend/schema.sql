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

-- Documents/Files: stored in MongoDB (flexible schema, no fixed structure)
-- MongoDB collections: documents, counters
