import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ReloadIcon,
  HamburgerMenuIcon,
  MixerHorizontalIcon,
  DownloadIcon,
  MagnifyingGlassIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import type { FileItem } from "../lib/fileParsing";
import DataResearchTable, { type SelectionState } from "./DataResearchTable";
import FileView from "./FileView";

type DataResearchOptionsProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  headers: string[];
  columnFilters: Record<number, string>;
  onColumnFilterChange: (colIdx: number, value: string) => void;
  onClearAllFilters: () => void;
  selectedCount?: number;
  selectedRows?: Set<number>;
  selectedColumns?: Set<number>;
  totalRowCount?: number;
  fileId?: number;
  notes?: string;
  onNotesSave?: (notes: string) => void;
  onResearchSubmit?: (payload: {
    file_id: number;
    selected_rows: number[];
    selected_columns: number[];
    why_fields: string;
    what_result: string;
  }) => Promise<void>;
  onResearchAllSubmit?: (payload: {
    file_id: number;
    total_rows: number;
    total_columns: number;
    why_fields: string;
    what_result: string;
  }) => Promise<void>;
};

function DataResearchOptions({
  searchQuery,
  onSearchChange,
  headers,
  columnFilters,
  onColumnFilterChange,
  onClearAllFilters,
  selectedCount = 0,
  selectedRows,
  selectedColumns,
  totalRowCount = 0,
  fileId,
  notes = "",
  onNotesSave,
  onResearchSubmit,
  onResearchAllSubmit,
}: DataResearchOptionsProps) {
  const [noteOpen, setNoteOpen] = useState(false);
  const [researchPopupOpen, setResearchPopupOpen] = useState(false);
  const [researchAllMode, setResearchAllMode] = useState(false);
  const [researchSubmitting, setResearchSubmitting] = useState(false);
  const [whyFields, setWhyFields] = useState("");
  const [whatResult, setWhatResult] = useState("");
  const [noteDraft, setNoteDraft] = useState(notes);
  const [saving, setSaving] = useState(false);

  const hasActiveFilters = Object.values(columnFilters).some((v) => v.trim() !== "");

  const handleOpenNote = () => {
    setNoteDraft(notes);
    setNoteOpen(true);
  };

  useEffect(() => {
    if (noteOpen) setNoteDraft(notes);
  }, [noteOpen, notes]);

  const hasSelection = (selectedCount ?? 0) > 0 || (selectedColumns?.size ?? 0) > 0;

  const handleResearchSelectedClick = () => {
    if (hasSelection) {
      setWhyFields("");
      setWhatResult("");
      setResearchAllMode(false);
      setResearchPopupOpen(true);
    }
  };

  const handleResearchAllClick = () => {
    setWhyFields("");
    setWhatResult("");
    setResearchAllMode(true);
    setResearchPopupOpen(true);
  };

  const handleSaveNote = async () => {
    if (onNotesSave) {
      setSaving(true);
      await onNotesSave(noteDraft);
      setSaving(false);
      setNoteOpen(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10 bg-white/5">
      {selectedCount > 0 && (
        <span className="text-emerald-400 font-medium text-sm shrink-0">
          {selectedCount} selected
        </span>
      )}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="relative flex-1 max-w-xs min-w-[180px]">
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-white/20 bg-white/5 text-sm text-white/90 placeholder-white/40 focus:border-white/40 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleResearchAllClick}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium shrink-0"
        >
          <ReloadIcon className="w-4 h-4" />
          Research All
        </button>
        <button
          type="button"
          onClick={handleResearchSelectedClick}
          disabled={!hasSelection}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/15 text-white/80 text-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ReloadIcon className="w-4 h-4" />
          Research Selected
        </button>
        {fileId != null && onNotesSave && (
          <button
            type="button"
            onClick={handleOpenNote}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm shrink-0 ${
              notes.trim() ? "border-amber-500/50 bg-amber-500/10 text-amber-200" : "border-white/20 hover:bg-white/10 text-white/80"
            }`}
            title="Add or view notes for this file"
          >
            <FileTextIcon className="w-4 h-4" />
            Note {notes.trim() ? "•" : ""}
          </button>
        )}
        <button
          type="button"
          className="p-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white/60 shrink-0"
          title="Other options"
        >
          <HamburgerMenuIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm shrink-0 ${
                hasActiveFilters
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-200"
                  : "border-white/20 hover:bg-white/10 text-white/80"
              }`}
            >
              <MixerHorizontalIcon className="w-4 h-4" />
              Filter
              {hasActiveFilters && (
                <span className="ml-1 text-xs">({Object.values(columnFilters).filter((v) => v.trim()).length})</span>
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            align="end"
            sideOffset={4}
            className="min-w-[280px] rounded-lg border border-white/20 bg-[rgb(17,23,28)] p-3 shadow-xl z-50"
          >
              <div className="text-xs font-medium text-white/60 mb-3">Filter by column</div>
              <div className="space-y-2 max-h-[240px] overflow-y-auto">
                {headers.map((h, i) => (
                  <div key={i} className="space-y-1">
                    <label className="block text-xs text-white/70 truncate" title={h}>
                      {h}
                    </label>
                    <input
                      type="text"
                      value={columnFilters[i] ?? ""}
                      onChange={(e) => onColumnFilterChange(i, e.target.value)}
                      placeholder={`Contains...`}
                      className="w-full px-2.5 py-1.5 rounded border border-white/20 bg-white/5 text-sm text-white/90 placeholder-white/40 focus:border-white/40 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={onClearAllFilters}
                className="mt-3 w-full py-1.5 text-xs text-white/60 hover:text-white/80"
              >
                Clear all filters
              </button>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white/80 text-sm shrink-0"
        >
          <DownloadIcon className="w-4 h-4" />
          Download Selected
        </button>
      </div>
      {noteOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={() => setNoteOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-dialog-title"
          >
            <div className="absolute inset-0 bg-black/50" aria-hidden />
            <div
              className="relative rounded-xl border border-white/20 bg-[rgb(17,23,28)] p-4 shadow-xl w-full max-w-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="note-dialog-title" className="font-semibold text-white/90 mb-3">
                Note for this file
              </h3>
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Add your notes here..."
                rows={6}
                className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-sm text-white/90 placeholder-white/40 focus:border-white/40 focus:outline-none resize-y"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoteOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 text-sm hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={saving}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      {researchPopupOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={() => setResearchPopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="research-popup-title"
          >
            <div className="absolute inset-0 bg-black/50" aria-hidden />
            <div
              className="relative rounded-xl border border-white/20 bg-[rgb(17,23,28)] p-4 shadow-xl w-full max-w-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="research-popup-title" className="font-semibold text-white/90 mb-4">
                Research Selected
              </h3>
              <p className="text-sm text-white/60 mb-2">
                {researchAllMode
                  ? `All ${totalRowCount} rows, all ${headers.length} columns selected`
                  : `${selectedCount ?? 0} rows, ${selectedColumns?.size ?? 0} columns selected`}
              </p>
              <p className="text-sm text-amber-200/90 mb-4">
                Based on this info, an AI agent will be assigned to work on your request.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Why these fields?
                  </label>
                  <input
                    type="text"
                    value={whyFields}
                    onChange={(e) => setWhyFields(e.target.value)}
                    placeholder="Explain why you selected these fields..."
                    className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-sm text-white/90 placeholder-white/40 focus:border-white/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    What result you want?
                  </label>
                  <input
                    type="text"
                    value={whatResult}
                    onChange={(e) => setWhatResult(e.target.value)}
                    placeholder="Describe the result you're looking for..."
                    className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-sm text-white/90 placeholder-white/40 focus:border-white/40 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResearchPopupOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 text-sm hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={
                    researchSubmitting ||
                    !fileId ||
                    (researchAllMode ? !onResearchAllSubmit : !onResearchSubmit)
                  }
                  onClick={async () => {
                    if (!fileId) return;
                    setResearchSubmitting(true);
                    try {
                      if (researchAllMode) {
                        if (onResearchAllSubmit) {
                          await onResearchAllSubmit({
                            file_id: fileId,
                            total_rows: totalRowCount,
                            total_columns: headers.length,
                            why_fields: whyFields,
                            what_result: whatResult,
                          });
                        }
                      } else {
                        if (onResearchSubmit) {
                          await onResearchSubmit({
                            file_id: fileId,
                            selected_rows: Array.from(selectedRows ?? []),
                            selected_columns: Array.from(selectedColumns ?? []),
                            why_fields: whyFields,
                            what_result: whatResult,
                          });
                        }
                      }
                      setResearchPopupOpen(false);
                      setWhyFields("");
                      setWhatResult("");
                    } finally {
                      setResearchSubmitting(false);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium disabled:opacity-50"
                >
                  {researchSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

type CollapsibleDataResearchProps = {
  items: FileItem[];
  onNoteSaved?: (fileId: number, notes: string) => void | Promise<void>;
  onResearchSubmit?: (payload: {
    file_id: number;
    selected_rows: number[];
    selected_columns: number[];
    why_fields: string;
    what_result: string;
  }) => Promise<void>;
  onResearchAllSubmit?: (payload: {
    file_id: number;
    total_rows: number;
    total_columns: number;
    why_fields: string;
    what_result: string;
  }) => Promise<void>;
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

function filterRows(
  rows: string[][],
  searchQuery: string,
  columnFilters: Record<number, string>
): string[][] {
  const search = searchQuery.trim().toLowerCase();
  const colFilters = Object.entries(columnFilters)
    .filter(([, v]) => v.trim() !== "")
    .map(([k, v]) => [Number(k), v.trim().toLowerCase()] as const);

  if (search === "" && colFilters.length === 0) return rows;

  return rows.filter((row) => {
    if (search !== "") {
      const rowText = row.join(" ").toLowerCase();
      if (!rowText.includes(search)) return false;
    }
    for (const [colIdx, filterVal] of colFilters) {
      const cell = (row[colIdx] ?? "").toLowerCase();
      if (!cell.includes(filterVal)) return false;
    }
    return true;
  });
}

type FileFilterState = {
  search: string;
  columnFilters: Record<number, string>;
};

export default function CollapsibleDataResearch({
  items,
  onNoteSaved,
  onResearchSubmit,
  onResearchAllSubmit,
}: CollapsibleDataResearchProps) {
  const [minimizedIds, setMinimizedIds] = useState<Set<string>>(new Set());
  const [filterState, setFilterState] = useState<Record<string, FileFilterState>>({});
  const [selectedCountByKey, setSelectedCountByKey] = useState<Record<string, number>>({});
  const [selectionByKey, setSelectionByKey] = useState<Record<string, SelectionState>>({});

  const getFilterState = useCallback((key: string): FileFilterState => {
    return filterState[key] ?? { search: "", columnFilters: {} };
  }, [filterState]);

  const setSearch = useCallback((key: string, value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? { search: "", columnFilters: {} }), search: value },
    }));
  }, []);

  const setColumnFilter = useCallback((key: string, colIdx: number, value: string) => {
    setFilterState((prev) => {
      const current = prev[key] ?? { search: "", columnFilters: {} };
      const nextFilters = { ...current.columnFilters, [colIdx]: value };
      if (value === "") delete nextFilters[colIdx];
      return { ...prev, [key]: { ...current, columnFilters: nextFilters } };
    });
  }, []);

  const clearAllFilters = useCallback((key: string) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: { search: "", columnFilters: {} },
    }));
  }, []);

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
            {!isMinimized && (() => {
              const state = getFilterState(key);
              const filteredRows = filterRows(rows, state.search, state.columnFilters);
              return (
                <>
                  <DataResearchOptions
                    searchQuery={state.search}
                    onSearchChange={(v) => setSearch(key, v)}
                    headers={headers}
                    columnFilters={state.columnFilters}
                    onColumnFilterChange={(colIdx, v) => setColumnFilter(key, colIdx, v)}
                    onClearAllFilters={() => clearAllFilters(key)}
                    selectedCount={selectedCountByKey[key] ?? 0}
                    selectedRows={selectionByKey[key]?.rows}
                    selectedColumns={selectionByKey[key]?.columns}
                    totalRowCount={filteredRows.length}
                    fileId={item.dbId ?? undefined}
                    onResearchSubmit={
                      item.dbId && onResearchSubmit
                        ? (payload) => onResearchSubmit(payload)
                        : undefined
                    }
                    onResearchAllSubmit={
                      item.dbId && onResearchAllSubmit
                        ? (payload) => onResearchAllSubmit(payload)
                        : undefined
                    }
                    notes={item.notes ?? ""}
                    onNotesSave={
                      item.dbId && onNoteSaved
                        ? (notes) => onNoteSaved(item.dbId!, notes)
                        : undefined
                    }
                  />
                  <div className="flex-1 min-h-[200px] overflow-hidden">
                    <DataResearchTable
                      headers={headers}
                      rows={filteredRows}
                      hideTitle
                      selection={selectionByKey[key] ?? { rows: new Set(), columns: new Set() }}
                      onSelectionChange={(sel) =>
                        setSelectionByKey((prev) => ({ ...prev, [key]: sel }))
                      }
                      onSelectedCountChange={(count) =>
                        setSelectedCountByKey((prev) => ({ ...prev, [key]: count }))
                      }
                    />
                  </div>
                </>
              );
            })()}
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
