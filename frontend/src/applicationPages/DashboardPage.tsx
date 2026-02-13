import { useState, useEffect, useCallback, useMemo } from "react";
import type { FileItem } from "../lib/fileParsing";
import { filesApi, type StoredFile } from "../lib/api";
import FileUpload from "../components/FileUpload";
import DataResearchTable from "../components/DataResearchTable";

function storedFileToItem(f: StoredFile): FileItem {
  return {
    dbId: f.id,
    id: String(f.id),
    filename: f.filename,
    tableData: f.parsed_data ?? undefined,
  };
}

export default function DashboardPage() {
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    filesApi
      .list()
      .then((files) => files.map(storedFileToItem))
      .then(setFileItems)
      .catch(() => setFileItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handleItemsChange = useCallback((newItems: FileItem[]) => {
    const pending = newItems.filter((it) => it.file && !it.dbId);
    setFileItems(newItems);
    if (pending.length === 0) return;
    const files = pending.map((it) => it.file!);
    filesApi.upload(files).then(({ uploaded }) => {
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
  }, []);

  const handleRemove = useCallback((item: FileItem) => {
    if (item.dbId) {
      filesApi.delete(item.dbId).catch(() => {});
    }
  }, []);

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
  }, [fileItems]);

  return (
    <div className="p-6 flex flex-col h-full min-h-0">
      <div className="shrink-0">
        <h1 className="font-display font-bold text-xl text-white/90">Dashboard</h1>
        <p className="mt-2 text-sm text-white/60">
          Upload Excel or CSV files. Data is saved to the database and displayed in the Data Research table.
        </p>

        <FileUpload
          items={fileItems}
          onItemsChange={handleItemsChange}
          onRemove={handleRemove}
        />
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-white/60">Loading...</p>
      ) : headers.length > 0 && rows.length > 0 ? (
        <div className="mt-6 flex-1 min-h-[300px] w-full overflow-hidden flex flex-col">
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
