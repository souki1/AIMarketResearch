import type { FileItem } from "../lib/fileParsing";

type FileViewProps = {
  item: FileItem;
  className?: string;
};

/**
 * Renders the preview of a single file (image or Excel/CSV table).
 * Use this in any component where you want to display file content.
 */
export default function FileView({ item, className = "" }: FileViewProps) {
  if (item.imageUrl) {
    return (
      <div className={`w-fit max-w-full ${className}`}>
        <img
          src={item.imageUrl}
          alt={item.file.name}
          draggable={false}
          className="max-w-full max-h-96 w-auto h-auto rounded object-contain block"
        />
      </div>
    );
  }

  if (item.tableData && item.tableData.length > 0) {
    return (
      <div className={`overflow-auto max-h-48 ${className}`}>
        <table className="min-w-full text-xs text-white/90">
          <tbody>
            {item.tableData.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border border-white/10 px-2 py-1"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
