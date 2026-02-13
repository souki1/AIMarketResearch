import { useState, useCallback } from "react";
import type { FileItem } from "../lib/fileParsing";
import FileView from "./FileView";
import {
  DragHandleDots1Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
  EnterFullScreenIcon,
} from "@radix-ui/react-icons";

type DraggableFilePreviewListProps = {
  items: FileItem[];
  onReorder: (items: FileItem[]) => void;
  onViewFullscreen?: (item: FileItem) => void;
};

function reorder<T>(list: T[], from: number, to: number): T[] {
  const result = [...list];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
}

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function DraggableFilePreviewList({
  items,
  onReorder,
  onViewFullscreen,
}: DraggableFilePreviewListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [minimizedIds, setMinimizedIds] = useState<Set<string>>(new Set());
  const [zoomLevels, setZoomLevels] = useState<Record<string, number>>({});

  const getItemId = useCallback(
    (item: FileItem, index: number) => item.id ?? item.filename + "-" + (item.dbId ?? index),
    []
  );

  const toggleMinimize = useCallback((id: string) => {
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const getZoom = useCallback(
    (id: string) => zoomLevels[id] ?? 1,
    [zoomLevels]
  );

  const zoomIn = useCallback((id: string) => {
    setZoomLevels((prev) => {
      const current = prev[id] ?? 1;
      const idx = ZOOM_LEVELS.findIndex((z) => z >= current);
      const i = idx >= 0 ? Math.min(idx + 1, ZOOM_LEVELS.length - 1) : ZOOM_LEVELS.length - 1;
      return { ...prev, [id]: ZOOM_LEVELS[i] };
    });
  }, []);

  const zoomOut = useCallback((id: string) => {
    setZoomLevels((prev) => {
      const current = prev[id] ?? 1;
      const idx = ZOOM_LEVELS.findIndex((z) => z >= current);
      const i = idx > 0 ? idx - 1 : 0;
      return { ...prev, [id]: ZOOM_LEVELS[i] };
    });
  }, []);

  function handleDragStart(e: React.DragEvent, index: number) {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
    const card = (e.target as HTMLElement).closest(".draggable-file-card");
    if (card) {
      try {
        e.dataTransfer.setDragImage(card as HTMLElement, 0, 0);
      } catch {
        // ignore
      }
    }
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  }

  function handleDragLeave(e: React.DragEvent) {
    const related = e.relatedTarget as Node | null;
    if (!related || !e.currentTarget.contains(related)) {
      setDragOverIndex(null);
    }
  }

  function handleDrop(e: React.DragEvent, toIndex: number) {
    e.preventDefault();
    const fromIndex = draggedIndex;
    setDraggedIndex(null);
    setDragOverIndex(null);
    if (fromIndex == null || fromIndex === toIndex) return;
    onReorder(reorder(items, fromIndex, toIndex));
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  return (
    <div className="flex flex-col items-start gap-4">
      {items.map((item, i) => (
        <div
          key={`${item.filename}-${item.dbId ?? item.id}-${i}`}
          className={`draggable-file-card w-fit max-w-full self-start rounded border border-white/10 bg-white/5 overflow-hidden transition-shadow ${
            draggedIndex === i ? "opacity-50" : ""
          } ${dragOverIndex === i ? "ring-2 ring-white/40 ring-inset" : ""}`}
          onDragOver={(e) => handleDragOver(e, i)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, i)}
        >
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragEnd={handleDragEnd}
            className="flex items-center gap-2 p-4 pb-2 cursor-grab active:cursor-grabbing select-none touch-none"
          >
            <DragHandleDots1Icon className="w-4 h-4 text-white/50 shrink-0" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize(getItemId(item, i));
              }}
              className="shrink-0 p-0.5 rounded text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
              title={minimizedIds.has(getItemId(item, i)) ? "Expand" : "Collapse"}
            >
              {minimizedIds.has(getItemId(item, i)) ? (
                <ChevronRightIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
            <span className="text-xs text-white/60 truncate flex-1 min-w-0">{item.filename}</span>
            {!minimizedIds.has(getItemId(item, i)) && (
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomOut(getItemId(item, i));
                  }}
                  className="p-1 rounded text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOutIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomIn(getItemId(item, i));
                  }}
                  className="p-1 rounded text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
                  title="Zoom in"
                >
                  <ZoomInIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewFullscreen?.(item);
                  }}
                  className="p-1 rounded text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
                  title="View full width and height"
                >
                  <EnterFullScreenIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {!minimizedIds.has(getItemId(item, i)) && (
            <div className="px-4 pb-4 pt-0">
              <FileView item={item} zoom={getZoom(getItemId(item, i))} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
