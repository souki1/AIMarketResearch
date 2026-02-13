import type { FileItem } from "../lib/fileParsing";

const BASE_MAX_HEIGHT = 384;

type FileViewProps = {
  item: FileItem;
  className?: string;
  /** Zoom level: 0.5, 0.75, 1, 1.25, 1.5, 2 */
  zoom?: number;
  /** Use "full" for fullscreen modal (full width/height) */
  fullscreen?: boolean;
};

/**
 * Renders the preview of a single file (image or Excel/CSV table).
 */
export default function FileView({
  item,
  className = "",
  zoom = 1,
  fullscreen = false,
}: FileViewProps) {
  const maxH = fullscreen ? "90vh" : Math.round(BASE_MAX_HEIGHT * zoom) + "px";

  if (item.imageUrl) {
    return (
      <div className={`w-fit max-w-full ${className}`}>
        <img
          src={item.imageUrl}
          alt={item.filename}
          draggable={false}
          className="max-w-full w-auto h-auto rounded object-contain block"
          style={{ maxHeight: maxH }}
        />
      </div>
    );
  }

  if (item.tableData && item.tableData.length > 0) {
    return (
      <div className={`overflow-auto ${className}`} style={{ maxHeight: maxH }}>
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
