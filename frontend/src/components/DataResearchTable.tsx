import { useState, useEffect } from "react";
import {
  ReloadIcon,
  MixerHorizontalIcon,
  DownloadIcon,
  HamburgerMenuIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

export type DataResearchTableProps = {
  /** Headers from first row, data rows after */
  headers: string[];
  rows: string[][];
  /** Hide the "Data Research" header when nested (e.g. in collapsible cards) */
  hideTitle?: boolean;
  /** Called when selection count changes (for parent to display count) */
  onSelectedCountChange?: (count: number) => void;
};

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export default function DataResearchTable({
  headers,
  rows,
  hideTitle = false,
  onSelectedCountChange,
}: DataResearchTableProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    onSelectedCountChange?.(selected.size);
  }, [selected.size, onSelectedCountChange]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const totalRows = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const pageRows = rows.slice(startIdx, startIdx + rowsPerPage);

  const toggleRow = (idx: number) => {
    const globalIdx = startIdx + idx;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(globalIdx)) next.delete(globalIdx);
      else next.add(globalIdx);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === pageRows.length) {
      setSelected(new Set());
    } else {
      setSelected(
        new Set(pageRows.map((_, i) => startIdx + i))
      );
    }
  };

  const allSelected = pageRows.length > 0 && selected.size === pageRows.length;

  return (
    <div className={`flex flex-col h-full min-h-0 w-full overflow-hidden ${!hideTitle ? "rounded-lg border border-white/10 bg-white/5" : ""}`}>
      {/* Header */}
      {!hideTitle && (
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10 shrink-0">
        <h2 className="font-display font-semibold text-lg text-white/90">
          Data Research
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium"
          >
            <ReloadIcon className="w-4 h-4" />
            Research All
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 text-sm"
          >
            <ReloadIcon className="w-4 h-4" />
            Research Selected
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/70"
            title="Other options"
          >
            <HamburgerMenuIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white/80 text-sm"
          >
            <MixerHorizontalIcon className="w-4 h-4" />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white/80 text-sm"
          >
            <DownloadIcon className="w-4 h-4" />
            Download Selected
          </button>
        </div>
      </div>
      )}

      {/* Table - full width/height, inner scroll when content overflows */}
      <div className="flex-1 min-h-0 w-full overflow-auto">
        <table className="min-w-full text-sm text-white/90">
          <thead className="sticky top-0 bg-[rgb(17,23,28)] z-10">
            <tr>
              <th className="w-10 px-3 py-2 border-b border-white/10 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded border-white/30"
                />
              </th>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-3 py-2 border-b border-white/10 text-left font-medium text-white/80"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, ri) => {
              const globalIdx = startIdx + ri;
              const isSelected = selected.has(globalIdx);
              return (
                <tr
                  key={globalIdx}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(ri)}
                      className="rounded border-white/30"
                    />
                  </td>
                  {headers.map((_, ci) => (
                    <td key={ci} className="px-3 py-2">
                      {row[ci] ?? ""}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-white/10 shrink-0 bg-white/5">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white/80 text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Add Row
        </button>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span>
            Showing {startIdx + 1} to {Math.min(startIdx + rowsPerPage, totalRows)} of {totalRows} entries
          </span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white/90"
          >
            {ROWS_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>Rows Per Page</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(1)}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50"
              disabled={currentPage <= 1}
            >
              &laquo;
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50"
              disabled={currentPage <= 1}
            >
              &lsaquo;
            </button>
            <span className="px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50"
              disabled={currentPage >= totalPages}
            >
              &rsaquo;
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50"
              disabled={currentPage >= totalPages}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
