import type { FileItem } from "../lib/fileParsing";

type FileItemPreviewProps = {
  item: FileItem;
  onRemove: () => void;
};

export default function FileItemPreview({ item, onRemove }: FileItemPreviewProps) {
  return (
    <li className="flex items-center justify-between gap-2 rounded px-2 py-1 text-xs text-white/80 bg-white/5">
      <span className="truncate">{item.file.name}</span>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 text-white/50 hover:text-white/90"
      >
        ×
      </button>
    </li>
  );
}
