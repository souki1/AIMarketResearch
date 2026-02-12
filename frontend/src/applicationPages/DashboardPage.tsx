import { useState } from "react";
import type { FileItem } from "../lib/fileParsing";
import FileUpload from "../components/FileUpload";
import DraggableFilePreviewList from "../components/DraggableFilePreviewList";

export default function DashboardPage() {
  const [fileItems, setFileItems] = useState<FileItem[]>([]);

  return (
    <div className="p-6">
      

      <FileUpload items={fileItems} onItemsChange={setFileItems} />

      {fileItems.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="font-display font-semibold text-base text-white/90 mb-3">Preview</h2>
          <DraggableFilePreviewList items={fileItems} onReorder={setFileItems} />
        </div>
      )}
    </div>
  );
}
