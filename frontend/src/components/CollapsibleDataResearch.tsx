import { useState, useCallback } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import type { FileItem } from "../lib/fileParsing";
import DataResearchTable from "./DataResearchTable";
import FileView from "./FileView";

type CollapsibleDataResearchProps = {
  items: FileItem[];
};

function getItemKey(item: FileItem, index: number): string {
  return item.dbId ? String(item.dbId) : `${item.filename}-${index}`;
}

function getHeadersAndRows(item: FileItem): { headers: string[]; rows: string[][] } {
  const data = item.tableData;
  if (!data || data.length === 0) return { headers: [], rows: [] };
  const firstRow = data[0].map((c) => String(c ?? ""));
  const headers = firstRow.length > 0 ? firstRow : ["Column 1"];
  const rows = data.slice(1).map((row) => row.map((c) => String(c ?? "")));
  return { headers, rows };
}

export default function CollapsibleDataResearch({ items }: CollapsibleDataResearchProps) {
  const [minimizedIds, setMinimizedIds] = useState<Set<string>>(new Set());

  const toggle = useCallback((key: string) => {
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const filesWithData = items.filter(
    (it) => it.dbId && it.tableData && it.tableData.length > 0
  );
  const filesWithImages = items.filter((it) => it.imageUrl);

  if (filesWithData.length === 0 && filesWithImages.length === 0) {
    return (
      <p className="mt-6 text-sm text-white/60">
        No tabular data yet. Upload Excel (.xlsx) or CSV files to see the Data Research table.
      </p>
    );
  }

  return (
    <div className="mt-6 flex-1 min-h-0 min-w-0 w-full flex flex-col gap-2 overflow-auto">
      {filesWithData.map((item, i) => {
        const key = getItemKey(item, i);
        const isMinimized = minimizedIds.has(key);
        const { headers, rows } = getHeadersAndRows(item);

        return (
          <div
            key={key}
            className="w-full rounded-lg border border-white/10 bg-white/5 overflow-hidden flex flex-col shrink-0"
          >
            <button
              type="button"
              onClick={() => toggle(key)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-white/5 transition-colors"
            >
              {isMinimized ? (
                <ChevronRightIcon className="w-4 h-4 text-white/60 shrink-0" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-white/60 shrink-0" />
              )}
              <span className="text-sm font-medium text-white/90 truncate">
                {item.filename}
              </span>
              <span className="text-xs text-white/50 ml-auto">
                {rows.length} rows
              </span>
            </button>
            {!isMinimized && (
              <div className="flex-1 min-h-[200px] overflow-hidden border-t border-white/10">
                <DataResearchTable headers={headers} rows={rows} hideTitle />
              </div>
            )}
          </div>
        );
      })}
      {filesWithImages.map((item, i) => {
        const key = `img-${getItemKey(item, i)}`;
        const isMinimized = minimizedIds.has(key);

        return (
          <div
            key={key}
            className="w-full rounded-lg border border-white/10 bg-white/5 overflow-hidden flex flex-col shrink-0"
          >
            <button
              type="button"
              onClick={() => toggle(key)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-white/5 transition-colors"
            >
              {isMinimized ? (
                <ChevronRightIcon className="w-4 h-4 text-white/60 shrink-0" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-white/60 shrink-0" />
              )}
              <span className="text-sm font-medium text-white/90 truncate">
                {item.filename}
              </span>
            </button>
            {!isMinimized && (
              <div className="p-4 border-t border-white/10">
                <FileView item={item} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
