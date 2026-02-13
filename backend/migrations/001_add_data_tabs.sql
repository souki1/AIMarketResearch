-- Migration: Add data_tabs table and tab_id to uploaded_files
-- Run this if the app's automatic migration (lifespan) hasn't applied yet.
-- Database: SQLite (default)

-- 1. Create data_tabs table
CREATE TABLE IF NOT EXISTS data_tabs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    workspace_id VARCHAR NOT NULL REFERENCES workspaces(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sort_order INTEGER DEFAULT 0
);

-- 2. Add tab_id column to uploaded_files (ignore error if column exists)
ALTER TABLE uploaded_files ADD COLUMN tab_id INTEGER;

-- 3. Migrate orphan files (tab_id NULL) to default tab
-- Create default tab if none exists
INSERT INTO data_tabs (name, workspace_id, sort_order)
SELECT 'Tab 1', '7474654407029309', 0
WHERE NOT EXISTS (SELECT 1 FROM data_tabs WHERE workspace_id = '7474654407029309');

-- Assign orphan files to default tab
UPDATE uploaded_files
SET tab_id = (SELECT id FROM data_tabs WHERE workspace_id = '7474654407029309' ORDER BY id LIMIT 1)
WHERE tab_id IS NULL;

-- 4. Add user_id column to uploaded_files (for tracking who uploaded)
ALTER TABLE uploaded_files ADD COLUMN user_id INTEGER;
