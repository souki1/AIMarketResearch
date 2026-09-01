import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../../components/Seo";

type Stage = "upload" | "file" | "leads" | "compare" | "rfq";

type BomLine = { id: string; pn: string; qty: number; plant: string };

type Lead = {
  id: string;
  name: string;
  flag: string;
  region: string;
  unit: number;
  landed: number;
  leadDays: number;
  lead: string;
  moq: number;
  reliability: number;
};

const STAGES: { id: Stage; n: string; label: string }[] = [
  { id: "upload", n: "1", label: "Upload" },
  { id: "file", n: "2", label: "Read" },
  { id: "leads", n: "3", label: "Research" },
  { id: "compare", n: "4", label: "Compare" },
  { id: "rfq", n: "5", label: "RFQ" },
];

const SAMPLE: BomLine[] = [
  { id: "1", pn: "HD-CSD-25-160-2A-GR", qty: 50, plant: "Plant A" },
  { id: "2", pn: "SKF-6205-2RS", qty: 200, plant: "Plant A" },
  { id: "3", pn: "ISO-4762-M8x25", qty: 500, plant: "Plant B" },
];

const VENDORS = [
  { name: "SureGear Industries", flag: "🇯🇵", region: "Asia Pacific", unit: 27.6, leadDays: 24, moq: 5, reliability: 99 },
  { name: "KinetiX Motion GmbH", flag: "🇩🇪", region: "Europe", unit: 24.9, leadDays: 32, moq: 10, reliability: 97 },
  { name: "Midwest Motion", flag: "🇺🇸", region: "Americas", unit: 29.2, leadDays: 18, moq: 15, reliability: 96 },
  { name: "MapleTorque Ltd.", flag: "🇨🇦", region: "Americas", unit: 23.8, leadDays: 38, moq: 15, reliability: 95 },
  { name: "Doosan Motion", flag: "🇰🇷", region: "Asia Pacific", unit: 21.0, leadDays: 30, moq: 10, reliability: 96 },
  { name: "HarmoTech China", flag: "🇨🇳", region: "Asia Pacific", unit: 17.3, leadDays: 40, moq: 50, reliability: 89 },
  { name: "Atlas Bearing Co.", flag: "🇺🇸", region: "Americas", unit: 31.4, leadDays: 22, moq: 25, reliability: 94 },
  { name: "Bonfiglioli SPA", flag: "🇮🇹", region: "Europe", unit: 26.4, leadDays: 35, moq: 8, reliability: 96 },
];

const REGIONS = ["All", "Asia Pacific", "Europe", "Americas"] as const;

function usd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function leadsFor(pn: string, qty: number): Lead[] {
  return VENDORS.map((v) => {
    const jitter = ((hash(pn + v.name) % 17) - 8) / 100;
    const unit = Math.round(v.unit * (1 + jitter) * 100) / 100;
    const freight = 1.8 + (v.leadDays / 40) * 2.4;
    const landed = Math.round((unit * qty + freight * qty * 0.04) * 100) / 100;
    return {
      id: `${pn}-${v.name}`,
      name: v.name,
      flag: v.flag,
      region: v.region,
      unit,
      landed,
      leadDays: v.leadDays,
      lead: `${Math.round(v.leadDays / 7)}–${Math.round(v.leadDays / 7) + 1} wk`,
      moq: v.moq,
      reliability: v.reliability,
    };
  });
}

function col(row: Record<string, string>, names: string[]) {
  const keys = Object.keys(row);
  const hit = keys.find((k) => names.includes(k.trim().toLowerCase()));
  return hit ? String(row[hit] ?? "").trim() : "";
}

function rowsToLines(rows: Record<string, string>[]): BomLine[] {
  return rows
    .map((row, i) => {
      const pn = col(row, ["part number", "part", "pn", "oem", "sku", "item", "mpn"]);
      if (!pn) return null;
      const qty = Number(col(row, ["qty", "quantity", "qty.", "q"]) || "1") || 1;
      const plant = col(row, ["plant", "site", "location", "facility"]) || "—";
      return { id: String(i + 1), pn, qty, plant };
    })
    .filter((x): x is BomLine => x !== null);
}

function parseCsv(text: string): BomLine[] {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows = lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = cells[i] ?? "";
    });
    return row;
  });
  return rowsToLines(rows);
}

async function parseFile(file: File): Promise<BomLine[]> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv") || name.endsWith(".txt")) return parseCsv(await file.text());
  const XLSX = await import("xlsx");
  const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
  const rows = json.map((r) => {
    const o: Record<string, string> = {};
    for (const [k, v] of Object.entries(r)) o[k] = String(v ?? "");
    return o;
  });
  return rowsToLines(rows);
}

type SortKey = "landed" | "leadDays" | "reliability" | "unit" | "name";

export default function ResearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>("upload");
  const [fileName, setFileName] = useState("");
  const [lines, setLines] = useState<BomLine[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [sortKey, setSortKey] = useState<SortKey>("reliability");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [picked, setPicked] = useState<string[]>([]);
  const [drag, setDrag] = useState(false);

  const active = lines.find((l) => l.id === activeId) ?? lines[0];
  const rawLeads = useMemo(() => (active ? leadsFor(active.pn, active.qty) : []), [active]);

  const leads = useMemo(() => {
    const list = region === "All" ? rawLeads : rawLeads.filter((l) => l.region === region);
    const dir = sortDir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
      return ((a[sortKey] as number) - (b[sortKey] as number)) * dir;
    });
  }, [rawLeads, region, sortKey, sortDir]);

  const compared = leads.filter((l) => picked.includes(l.id));

  async function onFiles(list: FileList | null) {
    const file = list?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const parsed = await parseFile(file);
      if (!parsed.length) {
        setError("No part numbers found. Use columns like Part Number, Qty, Plant.");
        return;
      }
      setFileName(file.name);
      setLines(parsed);
      setActiveId(parsed[0].id);
      setPicked([]);
      setStage("file");
    } catch {
      setError("Could not read that file. Try .xlsx, .xls, or .csv.");
    } finally {
      setBusy(false);
    }
  }

  function useSample() {
    setFileName("Plant-A-BOM.xlsx");
    setLines(SAMPLE);
    setActiveId(SAMPLE[0].id);
    setPicked([]);
    setError("");
    setStage("file");
  }

  function research() {
    if (!lines.length) return;
    setPicked([]);
    setStage("leads");
  }

  function togglePick(id: string) {
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(0, 4)));
  }

  function sortBy(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "name" || key === "landed" || key === "leadDays" || key === "unit" ? "asc" : "desc");
    }
  }

  function downloadRfq() {
    if (!active || !compared.length) return;
    const header = "Part,Qty,Plant,Supplier,Region,Unit USD,Landed USD,Lead,MOQ,Reliability";
    const rows = compared.map(
      (l) =>
        `${active.pn},${active.qty},${active.plant},${l.name},${l.region},${l.unit},${l.landed},${l.lead},${l.moq},${l.reliability}`,
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `RFQ-${active.pn}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const canGo = (id: Stage) => {
    if (id === "upload") return true;
    if (id === "file") return lines.length > 0;
    if (id === "leads") return lines.length > 0;
    if (id === "compare") return picked.length >= 2;
    if (id === "rfq") return picked.length >= 2;
    return false;
  };

  return (
    <div className="bg-surface min-h-[calc(100vh-4rem)]">
      <Seo
        title="Research — Upload, find leads, compare, RFQ | Partsource"
        description="Upload a BOM or price file, read the lines, research supplier leads, filter and sort, compare, then create an RFQ."
        canonicalPath="/research"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Workspace</p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-brand tracking-tight">Research</h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Upload a file, read the parts, research leads, then filter, sort, compare, and raise an RFQ.
            </p>
          </div>
          {fileName ? <p className="font-mono text-xs text-slate-500 truncate max-w-xs">{fileName}</p> : null}
        </div>

        <ol className="flex flex-wrap gap-2 mb-8" aria-label="Workflow">
          {STAGES.map((s) => {
            const on = stage === s.id;
            const done = STAGES.findIndex((x) => x.id === stage) > STAGES.findIndex((x) => x.id === s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={!canGo(s.id)}
                  onClick={() => canGo(s.id) && setStage(s.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold min-h-[40px] ${
                    on
                      ? "bg-brand text-white"
                      : done
                        ? "bg-accent/10 text-accent"
                        : "bg-white text-slate-400 border border-slate-200"
                  } disabled:opacity-40`}
                >
                  <span className="tabular-nums text-[11px]">{s.n}</span>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ol>

        {stage === "upload" && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              void onFiles(e.dataTransfer.files);
            }}
            className={`rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center bg-white ${
              drag ? "border-accent bg-accent/5" : "border-slate-200"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.csv,.txt"
              className="sr-only"
              onChange={(e) => void onFiles(e.target.files)}
            />
            <p className="font-display text-xl font-bold text-brand">Drop a BOM or price file</p>
            <p className="mt-2 text-sm text-slate-500">.xlsx · .xls · .csv — columns: Part Number, Qty, Plant</p>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                disabled={busy}
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white min-h-[48px] disabled:opacity-50"
              >
                {busy ? "Reading…" : "Upload file"}
              </button>
              <button
                type="button"
                onClick={useSample}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-brand min-h-[48px]"
              >
                Use sample BOM
              </button>
            </div>
          </div>
        )}

        {stage === "file" && (
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-brand">{lines.length} lines in file</p>
              <button
                type="button"
                onClick={research}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white min-h-[44px]"
              >
                Research leads
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Part</th>
                    <th className="px-5 py-3 font-semibold">Qty</th>
                    <th className="px-5 py-3 font-semibold">Plant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lines.map((line) => (
                    <tr
                      key={line.id}
                      className={`cursor-pointer ${activeId === line.id ? "bg-accent/5" : "hover:bg-slate-50"}`}
                      onClick={() => setActiveId(line.id)}
                    >
                      <td className="px-5 py-3 font-mono text-brand">{line.pn}</td>
                      <td className="px-5 py-3 tabular-nums">{line.qty}</td>
                      <td className="px-5 py-3 text-slate-600">{line.plant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-5 py-3 text-xs text-slate-500">Select a line, then Research — we find supplier leads for that part.</p>
          </div>
        )}

        {stage === "leads" && active && (
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-4 border-b border-slate-100">
              <p className="font-mono text-sm font-semibold text-brand min-w-0 truncate">{active.pn}</p>
              <p className="text-xs text-slate-500 lg:mr-auto">qty {active.qty} · {leads.length} leads</p>
              <label className="text-sm text-slate-600">
                Region{" "}
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as (typeof REGIONS)[number])}
                  className="ml-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                disabled={picked.length < 2}
                onClick={() => setStage("compare")}
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white min-h-[44px] disabled:opacity-40"
              >
                Compare ({picked.length})
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-3 w-10" />
                    <th className="px-4 py-3">
                      <button type="button" className="font-semibold" onClick={() => sortBy("name")}>
                        Supplier
                      </button>
                    </th>
                    <th className="px-4 py-3">
                      <button type="button" className="font-semibold" onClick={() => sortBy("unit")}>
                        Unit
                      </button>
                    </th>
                    <th className="px-4 py-3">
                      <button type="button" className="font-semibold" onClick={() => sortBy("landed")}>
                        Landed
                      </button>
                    </th>
                    <th className="px-4 py-3">
                      <button type="button" className="font-semibold" onClick={() => sortBy("leadDays")}>
                        Lead
                      </button>
                    </th>
                    <th className="px-4 py-3">
                      <button type="button" className="font-semibold" onClick={() => sortBy("reliability")}>
                        Rel.
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((l) => (
                    <tr key={l.id} className={picked.includes(l.id) ? "bg-accent/5" : "hover:bg-slate-50"}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={picked.includes(l.id)}
                          onChange={() => togglePick(l.id)}
                          aria-label={`Select ${l.name}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="mr-1">{l.flag}</span>
                        {l.name}
                        <span className="block text-[11px] text-slate-400">{l.region}</span>
                      </td>
                      <td className="px-4 py-3 tabular-nums">{usd(l.unit)}</td>
                      <td className="px-4 py-3 tabular-nums font-semibold text-brand">{usd(l.landed)}</td>
                      <td className="px-4 py-3">{l.lead}</td>
                      <td className="px-4 py-3 tabular-nums">{l.reliability}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-5 py-3 text-xs text-slate-500">Check 2–4 leads, then Compare. Click a column header to sort.</p>
          </div>
        )}

        {stage === "compare" && active && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="font-display text-xl font-bold text-brand">Compare</h2>
              <button
                type="button"
                onClick={() => setStage("rfq")}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white min-h-[44px]"
              >
                Create RFQ
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {compared.map((l) => (
                <article key={l.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="font-display font-bold text-brand">
                    {l.flag} {l.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{l.region}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-[10px] uppercase text-slate-400">Unit</dt>
                      <dd className="tabular-nums font-semibold">{usd(l.unit)}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase text-slate-400">Landed</dt>
                      <dd className="tabular-nums font-semibold text-brand">{usd(l.landed)}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase text-slate-400">Lead</dt>
                      <dd>{l.lead}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase text-slate-400">MOQ / Rel.</dt>
                      <dd>
                        {l.moq} · {l.reliability}%
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        )}

        {stage === "rfq" && active && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">RFQ draft</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-brand">RFQ-{active.pn}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {active.qty} units · {active.plant} · {compared.length} suppliers
                </p>
              </div>
              <button
                type="button"
                onClick={downloadRfq}
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white min-h-[44px]"
              >
                Download CSV
              </button>
            </div>
            <ul className="mt-6 divide-y divide-slate-100">
              {compared.map((l) => (
                <li key={l.id} className="py-3 flex items-center justify-between gap-3 text-sm">
                  <span>
                    {l.flag} {l.name}
                  </span>
                  <span className="tabular-nums text-slate-600">
                    {usd(l.unit)} · {l.lead}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-400">Illustrative RFQ — production sends this to your supplier network and approval trail.</p>
            <Link to="/products#product-demo" className="mt-4 inline-flex text-sm font-semibold text-accent">
              See the full product walkthrough
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
