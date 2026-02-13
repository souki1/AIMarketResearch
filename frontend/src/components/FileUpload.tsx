import { useState, useEffect, useRef } from "react";
import type { FileItem } from "../lib/fileParsing";
import { isImage, isExcelOrCsv, readExcelOrCsv } from "../lib/fileParsing";
import FileUploadDropZone from "./FileUploadDropZone";
import FileItemPreview from "./FileItemPreview";

type FileUploadProps = {
  /** When provided with onItemsChange, enables controlled mode. Parent can reorder via onItemsChange. */
  items?: FileItem[];
  /** Called whenever files change. Use for controlled mode or to render FileView elsewhere. */
  onItemsChange?: (items: FileItem[]) => void;
  /** Called when a file is removed. Use to delete from backend. */
  onRemove?: (item: FileItem) => void;
  /** @deprecated Use onItemsChange instead */
  onFilesChange?: (items: FileItem[]) => void;
};

export default function FileUpload({
  items: controlledItems,
  onItemsChange,
  onFilesChange,
  onRemove,
}: FileUploadProps) {
  const [internalItems, setInternalItems] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const itemsRef = useRef<FileItem[]>([]);

  const isControlled = controlledItems != null && (onItemsChange != null || onFilesChange != null);
  const items = isControlled ? controlledItems : internalItems;
  const setItems = (fn: (prev: FileItem[]) => FileItem[]) => {
    const next = fn(items);
    if (isControlled) {
      (onItemsChange ?? onFilesChange)?.(next);
    } else {
      setInternalItems(next);
      onFilesChange?.(next);
    }
  };
  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        if (it.imageUrl) URL.revokeObjectURL(it.imageUrl);
      });
    };
  }, []);

  async function addFiles(newFiles: File[]) {
    const newItems: FileItem[] = await Promise.all(
      newFiles.map(async (file) => {
        const item: FileItem = {
          id: crypto.randomUUID(),
          file,
          filename: file.name,
        };
        if (isImage(file)) {
          item.imageUrl = URL.createObjectURL(file);
        } else if (isExcelOrCsv(file)) {
          try {
            item.tableData = await readExcelOrCsv(file);
          } catch {
            item.tableData = [];
          }
        }
        return item;
      })
    );
    setItems((prev) => [...prev, ...newItems]);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (selected) addFiles(Array.from(selected));
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files;
    if (dropped) addFiles(Array.from(dropped));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function removeFile(index: number) {
    setItems((prev) => {
      const removed = prev[index];
      const next = prev.filter((_, i) => i !== index);
      if (removed?.imageUrl && removed.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(removed.imageUrl);
      }
      onRemove?.(removed);
      return next;
    });
  }

  return (
    <div className="mt-4 w-[40%] mx-auto">
      <FileUploadDropZone
        isDragging={isDragging}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onFileChange={handleFileChange}
      />

      {items.length > 0 && (
        <ul className="mt-1.5 space-y-0.5">
          {items.map((it, i) => (
            <FileItemPreview
              key={`${it.filename}-${it.dbId ?? it.id}-${i}`}
              item={it}
              onRemove={() => removeFile(i)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
