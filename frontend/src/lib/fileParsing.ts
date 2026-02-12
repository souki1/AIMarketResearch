import * as XLSX from "xlsx";

export type FileItem = {
  file: File;
  imageUrl?: string;
  tableData?: string[][];
};

export function isImage(file: File) {
  return file.type.startsWith("image/");
}

export function isExcelOrCsv(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext === "xlsx" || ext === "xls" || ext === "csv";
}

function parseCsv(text: string): string[][] {
  const rows = text.split(/\r?\n/).filter((r) => r.trim());
  return rows.map((row) => {
    const cells: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const c = row[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if ((c === "," && !inQuotes) || c === "\t") {
        cells.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    cells.push(cur.trim());
    return cells;
  });
}

export function readExcelOrCsv(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext === "csv") {
          const text = (e.target?.result as string) || "";
          resolve(parseCsv(text));
          return;
        }
        const data = e.target?.result;
        if (!data || typeof data === "string") {
          resolve(parseCsv((data as string) || ""));
          return;
        }
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json<string[]>(ws, {
          header: 1,
          defval: "",
        });
        resolve(sheetData as string[][]);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    if (file.name.toLowerCase().endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}
