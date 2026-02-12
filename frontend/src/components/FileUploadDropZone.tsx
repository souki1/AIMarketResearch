import { UploadIcon } from "@radix-ui/react-icons";

type FileUploadDropZoneProps = {
  isDragging: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileUploadDropZone({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
}: FileUploadDropZoneProps) {
  return (
    <label
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`flex items-center gap-1.5 rounded border border-dashed px-3 py-2 cursor-pointer transition-colors ${
        isDragging
          ? "border-white/40 bg-white/10"
          : "border-white/20 hover:border-white/30 hover:bg-white/5"
      }`}
    >
      <UploadIcon className="w-4 h-4 shrink-0 text-white/50" />
      <span className="text-xs text-white/70">Drop files or click</span>
      <input
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
        onChange={onFileChange}
        className="sr-only"
      />
    </label>
  );
}
