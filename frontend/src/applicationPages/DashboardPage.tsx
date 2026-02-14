import { useState, useEffect, useCallback, useRef } from "react";
import type { FileItem } from "../lib/fileParsing";
import { API_BASE, filesApi, tabsApi, researchApi, type DataTab, type StoredFile } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import FileUpload from "../components/FileUpload";
import FileItemPreview from "../components/FileItemPreview";
import CollapsibleDataResearch from "../components/CollapsibleDataResearch";

function storedFileToItem(f: StoredFile): FileItem {
  return {
    dbId: f.id,
    id: String(f.id),
    tabId: f.tab_id ?? undefined,
    filename: f.filename,
    tableData: f.parsed_data ?? undefined,
    notes: f.notes ?? "",
  };
}

const UPLOAD_NEW_TAB = -1;

export default function DashboardPage() {
  const { token } = useAuth();
  const [tabs, setTabs] = useState<DataTab[]>([]);
  const [selectedTabId, setSelectedTabId] = useState<number | null>(null);
  const [uploadToTabId, setUploadToTabId] = useState<number>(UPLOAD_NEW_TAB);
  const [newTabName, setNewTabName] = useState("");
  const [editingTabId, setEditingTabId] = useState<number | null>(null);
  const [editingTabName, setEditingTabName] = useState("");
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadToPopupOpen, setUploadToPopupOpen] = useState(false);
  const [filesPopupOpen, setFilesPopupOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const tabClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (tabs.length > 0 && uploadToTabId === UPLOAD_NEW_TAB) {
      setUploadToTabId(tabs[0].id);
    }
  }, [tabs, uploadToTabId]);

  useEffect(() => {
    setApiError(null);
    tabsApi
      .list(token)
      .then((t) => {
        setTabs(t);
        setApiError(null);
      })
      .catch((err) => {
        setTabs([]);
        setApiError(
          err instanceof Error
            ? err.message
            : `Cannot connect to API. Check VITE_API_URL in .env${API_BASE ? ` (current: ${API_BASE})` : " (using proxy)"}.`
        );
      });
  }, [token]);

  useEffect(() => {
    if (tabs.length > 0 && selectedTabId === null) {
      setSelectedTabId(tabs[0].id);
    }
  }, [tabs, selectedTabId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUploadToPopupOpen(false);
        setFilesPopupOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [uploadToPopupOpen, filesPopupOpen]);

  useEffect(() => {
    return () => {
      if (tabClickTimeoutRef.current) clearTimeout(tabClickTimeoutRef.current);
    };
  }, []);

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

      const doUpload = (targetTabId: number | undefined) => {
        filesApi.upload(files, targetTabId, token).then(({ uploaded }) => {
          tabsApi.list(token).then((t) => {
            setTabs(t);
            if (uploaded.length > 0 && uploaded[0].tab_id != null) {
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
      };

      const useNewTab = uploadToTabId === UPLOAD_NEW_TAB || tabs.length === 0;
      if (useNewTab) {
        const name = newTabName.trim() || undefined;
        tabsApi.create(name, token).then((tab) => {
          setTabs((prev) => [...prev, tab]);
          setSelectedTabId(tab.id);
          setUploadToTabId(tab.id);
          setNewTabName("");
          doUpload(tab.id);
        });
      } else {
        doUpload(uploadToTabId);
      }
  }, [uploadToTabId, token, tabs.length]);

  const handleCreateTab = useCallback(() => {
    const name = newTabName.trim() || undefined;
    tabsApi.create(name, token).then((tab) => {
      setTabs((prev) => [...prev, tab]);
      setSelectedTabId(tab.id);
      setNewTabName("");
    });
  }, [token, newTabName]);

  const handleRenameTab = useCallback(
    (tabId: number) => {
      const name = editingTabName.trim();
      if (!name) {
        setEditingTabId(null);
        return;
      }
      tabsApi.rename(tabId, name, token).then((updated) => {
        setTabs((prev) =>
          prev.map((t) => (t.id === tabId ? { ...t, name: updated.name } : t))
        );
        setEditingTabId(null);
        setEditingTabName("");
      });
    },
    [token, editingTabName]
  );

  const startEditingTab = useCallback((tab: DataTab) => {
    setEditingTabId(tab.id);
    setEditingTabName(tab.name);
  }, []);

  const handleTabClick = useCallback(
    (tab: DataTab, isDoubleClick: boolean) => {
      if (tabClickTimeoutRef.current) {
        clearTimeout(tabClickTimeoutRef.current);
        tabClickTimeoutRef.current = null;
      }
      setSelectedTabId(tab.id);
      if (isDoubleClick) {
        startEditingTab(tab);
      } else {
        tabClickTimeoutRef.current = setTimeout(() => setFilesPopupOpen(true), 200);
      }
    },
    [startEditingTab]
  );

  const handleResearchSubmit = useCallback(
    async (payload: {
      file_id: number;
      selected_rows: number[];
      selected_columns: number[];
      why_fields: string;
      what_result: string;
    }) => {
      await researchApi.create(payload, token);
    },
    [token]
  );

  const handleResearchAllSubmit = useCallback(
    async (payload: {
      file_id: number;
      total_rows: number;
      total_columns: number;
      why_fields: string;
      what_result: string;
    }) => {
      await researchApi.createAll(payload, token);
    },
    [token]
  );

  const handleNoteSaved = useCallback(
    async (fileId: number, notes: string) => {
      await filesApi.updateNotes(fileId, notes, token);
      setFileItems((prev) =>
        prev.map((f) => (f.dbId === fileId ? { ...f, notes } : f))
      );
    },
    [token]
  );

  const handleDataEdit = useCallback(
    async (fileId: number, updatedTableData: string[][]) => {
      await filesApi.updateParsedData(fileId, updatedTableData, token);
      setFileItems((prev) =>
        prev.map((f) =>
          f.dbId === fileId ? { ...f, tableData: updatedTableData } : f
        )
      );
    },
    [token]
  );

  const handleCellEdit = useCallback(
    async (
      fileId: number,
      _rowIdx: number,
      _colIdx: number,
      _value: string,
      updatedTableData: string[][]
    ) => {
      await handleDataEdit(fileId, updatedTableData);
    },
    [handleDataEdit]
  );

  const handleHeaderEdit = useCallback(
    async (
      fileId: number,
      _colIdx: number,
      _value: string,
      updatedTableData: string[][]
    ) => {
      await handleDataEdit(fileId, updatedTableData);
    },
    [handleDataEdit]
  );

  const handleRemove = useCallback(
    (item: FileItem) => {
      if (item.dbId) {
        filesApi
          .delete(item.dbId, token)
          .then(() => {
            setFileItems((prev) => prev.filter((f) => f.dbId !== item.dbId));
            tabsApi.list(token).then(setTabs);
          })
          .catch(() => {});
      }
    },
    [token]
  );

  return (
    <div className="p-6 flex flex-col min-h-0 min-w-0 overflow-hidden">
      {apiError && (
        <div className="mb-4 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {apiError}
        </div>
      )}
      <div className="shrink-0">
        <h1 className="font-display font-bold text-xl text-white/90">Dashboard</h1>
        <p className="mt-2 text-sm text-white/60">
          Upload Excel or CSV files. Data is saved to the database and displayed in the Data Research table.
        </p>

        <FileUpload
          insertBetween={
            <>
              <div className="mt-3 flex items-center gap-2">
              
              </div>
              {uploadToPopupOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  onClick={() => setUploadToPopupOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="upload-to-title"
                >
                  <div
                    className="absolute inset-0 bg-black/50"
                    aria-hidden
                  />
                  <div
                    className="relative rounded-xl border border-white/20 bg-[rgb(17,23,28)] p-4 shadow-xl w-full max-w-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 id="upload-to-title" className="font-semibold text-white/90 mb-3">Upload to</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-white/60 mb-1">Destination tab</label>
                        <select
                          value={uploadToTabId}
                          onChange={(e) => setUploadToTabId(Number(e.target.value))}
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/90 focus:border-white/40 focus:outline-none"
                        >
                          {tabs.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                          <option value={UPLOAD_NEW_TAB}>+ Create new tab</option>
                        </select>
                      </div>
                      {uploadToTabId === UPLOAD_NEW_TAB && (
                        <div>
                          <label className="block text-xs text-white/60 mb-1">New tab name</label>
                          <input
                            type="text"
                            value={newTabName}
                            onChange={(e) => setNewTabName(e.target.value)}
                            placeholder="Tab name"
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder-white/40 focus:border-white/40 focus:outline-none"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setUploadToPopupOpen(false)}
                        className="w-full rounded-lg bg-white/15 py-2 text-sm font-medium text-white/90 hover:bg-white/20"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {filesPopupOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  onClick={() => setFilesPopupOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="files-popup-title"
                >
                  <div className="absolute inset-0 bg-black/50" aria-hidden />
                  <div
                    className="relative rounded-xl border border-white/20 bg-[rgb(17,23,28)] p-4 shadow-xl w-full max-w-md max-h-[70vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 id="files-popup-title" className="font-semibold text-white/90 mb-3">
                      Files in {tabs.find((t) => t.id === selectedTabId)?.name ?? "Tab"}
                    </h3>
                    <div className="overflow-y-auto flex-1 min-h-0">
                      {loading ? (
                        <p className="text-sm text-white/60">Loading...</p>
                      ) : fileItems.length === 0 ? (
                        <p className="text-sm text-white/60">No files in this tab</p>
                      ) : (
                        <ul className="space-y-1">
                          {fileItems.map((it, i) => (
                            <FileItemPreview
                              key={`${it.filename}-${it.dbId ?? it.id}-${i}`}
                              item={it}
                              onRemove={() => handleRemove(it)}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFilesPopupOpen(false)}
                      className="mt-3 w-full rounded-lg bg-white/15 py-2 text-sm font-medium text-white/90 hover:bg-white/20"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-1">
                {tabs.map((t) =>
                  editingTabId === t.id ? (
                    <input
                      key={t.id}
                      type="text"
                      value={editingTabName}
                      onChange={(e) => setEditingTabName(e.target.value)}
                      onBlur={() => {
                        if (editingTabName.trim()) handleRenameTab(t.id);
                        else setEditingTabId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameTab(t.id);
                        if (e.key === "Escape") setEditingTabId(null);
                      }}
                      autoFocus
                      className="rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white/90 w-24 focus:outline-none"
                    />
                  ) : (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleTabClick(t, false)}
                      onDoubleClick={(e) => {
                        e.preventDefault();
                        handleTabClick(t, true);
                      }}
                      title="Click to view files, double-click to rename"
                      className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                        selectedTabId === t.id
                          ? "bg-white/15 text-white"
                          : "text-white/60 hover:bg-white/10 hover:text-white/80"
                      }`}
                    >
                      {t.name}
                      <span className="ml-1 text-white/50">({t.file_count ?? 0})</span>
                    </button>
                  )
                )}
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newTabName}
                    onChange={(e) => setNewTabName(e.target.value)}
                    placeholder="Tab name"
                    className="rounded border border-white/20 bg-white/5 px-2 py-0.5 text-xs text-white/90 placeholder-white/40 w-24 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={handleCreateTab}
                    className="rounded border border-dashed border-white/30 px-2.5 py-1 text-xs text-white/50 hover:border-white/50 hover:text-white/70"
                  >
                    + Tab
                  </button>
                </div>
              </div>
            </>
          }
          items={fileItems}
          onItemsChange={handleItemsChange}
          onRemove={handleRemove}
          hideFileList
        />
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-white/60">Loading...</p>
      ) : fileItems.length > 0 ? (
        <CollapsibleDataResearch
          items={fileItems}
          onNoteSaved={handleNoteSaved}
          onCellEdit={handleCellEdit}
          onHeaderEdit={handleHeaderEdit}
          onResearchSubmit={handleResearchSubmit}
          onResearchAllSubmit={handleResearchAllSubmit}
        />
      ) : null}
    </div>
  );
}
