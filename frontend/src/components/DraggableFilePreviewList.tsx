import { useState } from "react";
import type { FileItem } from "../lib/fileParsing";
import FileView from "./FileView";
import { DragHandleDots1Icon } from "@radix-ui/react-icons";

type DraggableFilePreviewListProps = {
  items: FileItem[];
  onReorder: (items: FileItem[]) => void;
};

function reorder<T>(list: T[], from: number, to: number): T[] {
  const result = [...list];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
}

export default function DraggableFilePreviewList({
  items,
  onReorder,
}: DraggableFilePreviewListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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
          key={`${item.file.name}-${i}`}
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
            <span className="text-xs text-white/60">{item.file.name}</span>
          </div>
          <div className="px-4 pb-4 pt-0">
            <FileView item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
