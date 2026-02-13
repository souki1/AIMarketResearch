import { useState, useEffect, useCallback, useMemo } from "react";
import type { FileItem } from "../lib/fileParsing";
import { filesApi, tabsApi, type DataTab, type StoredFile } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import FileUpload from "../components/FileUpload";
import DataResearchTable from "../components/DataResearchTable";

function storedFileToItem(f: StoredFile): FileItem {
  return {
    dbId: f.id,
    id: String(f.id),
    tabId: f.tab_id ?? undefined,
    filename: f.filename,
    tableData: f.parsed_data ?? undefined,
  };
}

export default function DashboardPage() {
  const { token } = useAuth();
  const [tabs, setTabs] = useState<DataTab[]>([]);
  const [selectedTabId, setSelectedTabId] = useState<number | null>(null);
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tabsApi
      .list(token)
      .then(setTabs)
      .catch(() => setTabs([]));
  }, [token]);

  useEffect(() => {
    if (tabs.length > 0 && selectedTabId === null) {
      setSelectedTabId(tabs[0].id);
    }
  }, [tabs, selectedTabId]);

  useEffect(() => {
    if (selectedTabId == null) {
      setFileItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    filesApi
      .list(selectedTabId, token)
      .then((files) => files.map(storedFileToItem))
      .then(setFileItems)
      .catch(() => setFileItems([]))
      .finally(() => setLoading(false));
  }, [selectedTabId, token]);

  const handleItemsChange = useCallback(
    (newItems: FileItem[]) => {
      const pending = newItems.filter((it) => it.file && !it.dbId);
      setFileItems(newItems);
      if (pending.length === 0) return;
      const files = pending.map((it) => it.file!);
      const tabId = selectedTabId ?? undefined;
      filesApi.upload(files, tabId, token).then(({ uploaded }) => {
        tabsApi.list(token).then((t) => {
          setTabs(t);
          if (selectedTabId == null && uploaded.length > 0 && uploaded[0].tab_id != null) {
            setSelectedTabId(uploaded[0].tab_id);
          }
        });
        setFileItems((prev) => {
          const result: FileItem[] = [];
          let savedIdx = 0;
          for (const it of prev) {
            if (it.file && !it.dbId && savedIdx < uploaded.length) {
              const u = uploaded[savedIdx++];
              result.push(storedFileToItem(u));
            } else {
              result.push(it);
            }
          }
          return result;
        });
      });
  }, [selectedTabId, token]);

  const handleCreateTab = useCallback(() => {
    tabsApi.create(undefined, token).then((tab) => {
      setTabs((prev) => [...prev, tab]);
      setSelectedTabId(tab.id);
    });
  }, [token]);

  const handleRemove = useCallback((item: FileItem) => {
    if (item.dbId) {
      filesApi.delete(item.dbId, token).catch(() => {});
    }
  }, [token]);

  const { headers, rows } = useMemo(() => {
    const filesWithData = fileItems.filter(
      (it) => it.dbId && it.tableData && it.tableData.length > 0
    );
    if (filesWithData.length === 0) return { headers: [] as string[], rows: [] as string[][] };

    const allRows: string[][] = [];
    let headers: string[] = [];

    for (const file of filesWithData) {
      const data = file.tableData!;
      if (data.length === 0) continue;
      const firstRow = data[0].map((c) => String(c ?? ""));
      if (headers.length === 0) {
        headers = firstRow.length > 0 ? firstRow : ["Column 1"];
      }
      for (let i = 1; i < data.length; i++) {
        const row = data[i].map((c) => String(c ?? ""));
        allRows.push(row);
      }
    }

    if (headers.length === 0) headers = ["Data"];
    return { headers, rows: allRows };
  }, [fileItems, selectedTabId]);

  return (
    <div className="p-6 flex flex-col min-h-0 min-w-0 overflow-hidden">
      <div className="shrink-0">
        <h1 className="font-display font-bold text-xl text-white/90">Dashboard</h1>
        <p className="mt-2 text-sm text-white/60">
          Upload Excel or CSV files. Data is saved to the database and displayed in the Data Research table.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTabId(t.id)}
                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedTabId === t.id
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white/90"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleCreateTab}
            className="rounded-lg border border-dashed border-white/30 px-3 py-1.5 text-sm text-white/70 hover:border-white/50 hover:bg-white/5 hover:text-white/90"
          >
            + New Tab
          </button>
        </div>

        <FileUpload
          items={fileItems}
          onItemsChange={handleItemsChange}
          onRemove={handleRemove}
        />
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-white/60">Loading...</p>
      ) : headers.length > 0 && rows.length > 0 ? (
        <div className="mt-6 flex-1 min-h-[300px] min-w-0 w-full overflow-hidden flex flex-col">
          <DataResearchTable headers={headers} rows={rows} />
        </div>
      ) : fileItems.length > 0 ? (
        <p className="mt-6 text-sm text-white/60">
          No tabular data yet. Upload Excel (.xlsx) or CSV files to see the Data Research table.
        </p>
      ) : null}
    </div>
  );
}
