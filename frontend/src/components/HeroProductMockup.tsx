import { useEffect, useMemo, useRef, useState } from "react";
import partImage from "../assets/images/download (1).jpg";

type View = "upload" | "research" | "compare" | "rfq" | "reports";
type BomLine = { id: string; pn: string; qty: number; plant: string };
type Lead = {
  id: string;
  name: string;
  region: string;
  unit: number;
  landed: number;
  lead: string;
  leadDays: number;
  moq: number;
  reliability: number;
};

const NAV: { id: View; n: string; label: string }[] = [
  { id: "upload", n: "1", label: "Upload" },
  { id: "research", n: "2", label: "Research" },
  { id: "compare", n: "3", label: "Compare" },
  { id: "rfq", n: "4", label: "Create RFQ" },
  { id: "reports", n: "5", label: "Reports" },
];

const SAMPLE: BomLine[] = [
  { id: "1", pn: "HD-CSD-25-160-2A-GR", qty: 50, plant: "Plant A" },
  { id: "2", pn: "SKF-6205-2RS", qty: 200, plant: "Plant A" },
  { id: "3", pn: "ISO-4762-M8x25", qty: 500, plant: "Plant B" },
];

const PART_META: Record<string, { name: string; mfr: string }> = {
  "HD-CSD-25-160-2A-GR": { name: "Harmonic drive gearbox", mfr: "Harmonic Drive" },
  "SKF-6205-2RS": { name: "Deep groove ball bearing", mfr: "SKF" },
  "ISO-4762-M8x25": { name: "Socket head cap screw", mfr: "ISO" },
};

const VENDORS = [
  { name: "Midwest Motion", region: "Americas", unit: 29.2, leadDays: 18, moq: 15, reliability: 96 },
  { name: "Atlas Bearing Co.", region: "Americas", unit: 31.4, leadDays: 22, moq: 25, reliability: 94 },
  { name: "SureGear Industries", region: "Asia Pacific", unit: 27.6, leadDays: 24, moq: 5, reliability: 99 },
  { name: "KinetiX Motion GmbH", region: "Europe", unit: 24.9, leadDays: 32, moq: 10, reliability: 97 },
  { name: "HarmoTech China", region: "Asia Pacific", unit: 17.3, leadDays: 40, moq: 50, reliability: 89 },
];

const VENDOR_CC: Record<string, string> = {
  "Midwest Motion": "US",
  "Atlas Bearing Co.": "US",
  "SureGear Industries": "JP",
  "KinetiX Motion GmbH": "DE",
  "HarmoTech China": "CN",
};

const COMPARE_FILTERS = ["All", "Asia Pacific", "Europe", "Americas"] as const;

const DEMO_REPORTS = [
  {
    title: "Procurement Report for Part HD-CSD-25-160-2A-GR",
    tag: "Spend",
    summary: "Consolidates quotes, landed cost, and vendor coverage for the harmonic drive gearbox.",
    when: "1 Sept 2026, 6:41 am",
    tone: "rose" as const,
  },
  {
    title: "Award rationale — SureGear Industries",
    tag: "Award",
    summary: "Top pick vs KinetiX and Midwest: 99% reliability, MOQ 5, 3–4 wk lead on qty 50.",
    when: "1 Sept 2026, 6:38 am",
    tone: "sky" as const,
  },
];
const SLUG: Record<View, string> = {
  upload: "upload",
  research: "research",
  compare: "compare",
  rfq: "rfq",
  reports: "reports",
};

function usd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function aiScore(row: Lead) {
  const bonus = row.reliability >= 97 ? 5 : row.reliability >= 94 ? 2 : 0;
  const moqHit = row.moq > 25 ? 8 : 0;
  return Math.round(row.reliability * 0.9 + bonus - moqHit);
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
    const landed = Math.round((unit * qty + qty * 0.12) * 100) / 100;
    return {
      id: `${pn}-${v.name}`,
      name: v.name,
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

function PointerCursor({ x, y, click, on }: { x: number; y: number; click: boolean; on: boolean }) {
  return (
    <div
      className="pointer-events-none absolute z-20 hidden sm:block"
      style={{
        left: x,
        top: y,
        opacity: on ? 1 : 0,
        transform: `translate(-3px, -2px) scale(${click ? 0.82 : 1})`,
        transition:
          "left 0.55s cubic-bezier(.22,1,.36,1), top 0.55s cubic-bezier(.22,1,.36,1), transform 0.12s ease, opacity 0.2s ease",
      }}
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_0_6px_rgba(255,255,255,0.55)]">
        <path
          fill="#fff"
          stroke="#fff"
          strokeLinejoin="round"
          strokeWidth="1.25"
          d="M4.2 3.2v17.2l4.6-4.6 3.2 7.1 2.6-1.2-3.2-7 6.1-.3Z"
        />
      </svg>
    </div>
  );
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

async function parseFile(file: File): Promise<BomLine[]> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv") || name.endsWith(".txt")) {
    const text = (await file.text()).replace(/^\uFEFF/, "");
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
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
  const XLSX = await import("xlsx");
  const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
  return rowsToLines(
    json.map((r) => {
      const o: Record<string, string> = {};
      for (const [k, v] of Object.entries(r)) o[k] = String(v ?? "");
      return o;
    }),
  );
}

type SortKey = "landed" | "leadDays" | "reliability";

export default function HeroProductMockup() {
  const inputRef = useRef<HTMLInputElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const userPaused = useRef(false);
  const [view, setView] = useState<View>("upload");
  const [fileName, setFileName] = useState("Plant-A-BOM.xlsx");
  const [lines, setLines] = useState<BomLine[]>(SAMPLE);
  const [selected, setSelected] = useState<string[]>([SAMPLE[0].id]);
  const [hasLeads, setHasLeads] = useState(true);
  const [region, setRegion] = useState<(typeof COMPARE_FILTERS)[number]>("All");
  const [sortKey, setSortKey] = useState<SortKey>("reliability");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [cursor, setCursor] = useState({ x: 48, y: 86, click: false, on: false });
  const [tourPress, setTourPress] = useState<View | null>(null);

  function pauseGuide() {
    userPaused.current = true;
  }

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    let alive = true;
    let inView = true;
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
    }, { threshold: 0.3 });
    io.observe(shell);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const stop = () => {
      setTourPress(null);
      setCursor((c) => ({ ...c, on: false, click: false }));
    };

    (async () => {
      let i = 0;
      await sleep(700);
      while (alive) {
        if (userPaused.current) {
          stop();
          break;
        }
        if (!inView) {
          await sleep(280);
          continue;
        }
        const step = NAV[i];
        const btn = navRefs.current[i];
        const aside = asideRef.current;
        if (!reduce && btn && aside && btn.offsetWidth > 0) {
          const ar = aside.getBoundingClientRect();
          const br = btn.getBoundingClientRect();
          setCursor({
            x: br.left - ar.left + br.width * 0.72,
            y: br.top - ar.top + br.height * 0.48,
            click: false,
            on: true,
          });
          await sleep(600);
          if (!alive || userPaused.current) {
            stop();
            break;
          }
          setCursor((c) => ({ ...c, click: true }));
          setTourPress(step.id);
          await sleep(140);
          if (!alive || userPaused.current) {
            stop();
            break;
          }
          setView(step.id);
          await sleep(120);
          setCursor((c) => ({ ...c, click: false }));
          setTourPress(null);
          await sleep(["upload", "research", "compare", "rfq", "reports"].includes(step.id) ? 4200 : 2400);
        } else {
          setView(step.id);
          await sleep(reduce ? 2800 : ["upload", "research", "compare", "rfq", "reports"].includes(step.id) ? 4200 : 2400);
        }
        if (userPaused.current) {
          stop();
          break;
        }
        i = (i + 1) % NAV.length;
      }
    })();

    return () => {
      alive = false;
      io.disconnect();
    };
  }, []);

  const active = lines.find((l) => selected.includes(l.id)) ?? lines[0];
  const rawLeads = useMemo(() => (active && hasLeads ? leadsFor(active.pn, active.qty) : []), [active, hasLeads]);
  const leads = useMemo(() => {
    const list = region === "All" ? rawLeads : rawLeads.filter((l) => l.region === region);
    return [...list].sort((a, b) => a[sortKey] - b[sortKey] || b.reliability - a.reliability);
  }, [rawLeads, region, sortKey]);
  const poVendor = useMemo(
    () => (rawLeads.length ? [...rawLeads].sort((a, b) => aiScore(b) - aiScore(a))[0] : null),
    [rawLeads],
  );
  const poQty = active?.qty ?? 0;
  const poSubtotal = poVendor ? poQty * poVendor.unit : 0;
  const poDuty = poSubtotal * 0.025;
  const poFreight = 118;
  const poTotal = poSubtotal + poDuty + poFreight;

  async function onFiles(list: FileList | null) {
    const file = list?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const parsed = await parseFile(file);
      if (!parsed.length) {
        setError("No part numbers found. Use Part Number, Qty, Plant columns.");
        return;
      }
      load(file.name, parsed);
    } catch {
      setError("Could not read that file. Try .xlsx or .csv.");
    } finally {
      setBusy(false);
    }
  }

  function load(name: string, parsed: BomLine[]) {
    setFileName(name);
    setLines(parsed);
    setSelected([parsed[0].id]);
    setHasLeads(false);
    setError("");
    setView("research");
  }

  function toggleLine(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setHasLeads(false);
  }

  function runResearch() {
    const ids = selected.length ? selected : lines.slice(0, 1).map((l) => l.id);
    if (!selected.length) setSelected(ids);
    setHasLeads(true);
  }

  const navBtn = (item: (typeof NAV)[number], i: number) => {
    const active = view === item.id || tourPress === item.id;
    return (
      <button
        key={item.id}
        ref={(el) => {
          navRefs.current[i] = el;
        }}
        type="button"
        onClick={() => setView(item.id)}
        className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[10px] font-medium transition-colors ${
          active ? "bg-accent/25 text-white ring-1 ring-accent/40" : "text-white/55 hover:bg-white/8 hover:text-white"
        }`}
      >
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${
            active ? "bg-accent text-white" : "bg-white/10 text-white/50"
          }`}
        >
          {item.n}
        </span>
        {item.label}
      </button>
    );
  };

  return (
    <div
      ref={shellRef}
      onPointerDown={pauseGuide}
      className="rounded-2xl overflow-hidden ring-1 ring-white/15 bg-slate-900/80 shadow-2xl shadow-black/60"
    >
      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-800/95 border-b border-white/10">
        <div className="flex gap-1.5 shrink-0" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/90" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <div className="flex-1 min-w-0 rounded-md bg-slate-950/90 px-3 py-1.5 text-[11px] sm:text-xs text-slate-400 font-mono truncate border border-white/5">
          app.partsource.io/{SLUG[view]}
        </div>
      </div>
      <div className="relative w-full overflow-hidden bg-[#0a0e14] text-left shadow-inner" aria-label="Partsource workspace">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 80% 10%, rgba(0,113,227,0.35), transparent 50%), radial-gradient(ellipse 60% 50% at 12% 88%, rgba(41,151,255,0.12), transparent 45%)",
        }}
      />
      <div className="relative flex min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
        <aside ref={asideRef} className="relative hidden w-[28%] shrink-0 border-r border-white/8 bg-black/35 p-2.5 sm:flex sm:flex-col">
          <div className="mb-3 flex items-center gap-2">
            <img src="/logo.svg" alt="" width={24} height={24} className="h-6 w-6 rounded-md" />
            <span className="font-display text-[10px] font-semibold tracking-tight text-white/90">Partsource</span>
          </div>
          <p className="mb-1.5 px-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/35">Workspace</p>
          <nav className="space-y-0.5" aria-label="Workspace views">
            {NAV.map(navBtn)}
          </nav>
          <PointerCursor {...cursor} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col p-2 sm:p-2.5">
          <div className="mb-2 flex gap-0.5 overflow-x-auto sm:hidden">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-semibold ${
                  view === item.id ? "bg-accent text-white" : "bg-white/8 text-white/50"
                }`}
              >
                {item.n} {item.label}
              </button>
            ))}
          </div>

          {view === "upload" && (
            <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,.csv,.txt"
                className="sr-only"
                onChange={(e) => onFiles(e.target.files)}
              />
              <div className="shrink-0">
                <p className="font-display text-[11px] font-semibold leading-tight text-white">Upload Data</p>
                <p className="mt-0.5 text-[8px] leading-snug text-white/45">
                  Import BOMs, part lists, or vendor documentation.
                </p>
              </div>

              <div className="grid min-h-0 flex-[1.15] grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-1.5">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onFiles(e.dataTransfer.files);
                  }}
                  className="flex min-h-0 flex-col items-center justify-center rounded-lg border border-dashed border-accent/40 bg-accent/8 px-2 py-2 text-center"
                >
                  <span className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-md bg-accent/20 text-accent">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M12 16V9m0 0l-3 3m3-3l3 3" />
                    </svg>
                  </span>
                  <p className="font-display text-[9px] font-semibold text-white">Drag and drop your BOM or part list here</p>
                  <p className="mt-0.5 text-[7px] text-white/45">{busy ? "Reading…" : "or click to browse from your computer"}</p>
                  <span className="mt-1.5 rounded-md bg-accent px-2 py-0.5 text-[8px] font-semibold text-white">
                    Browse Files
                  </span>
                  {error ? <p className="mt-1 text-[7px] text-red-300">{error}</p> : null}
                </button>

                <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/8 bg-black/25 p-1.5">
                  <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-white/40">Supported formats</p>
                  <div className="mt-1 space-y-1">
                    <div className="flex gap-1.5 rounded-md bg-white/5 px-1.5 py-1">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent/20 text-accent">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M7 6h10M7 18h10" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-[8px] font-semibold text-white">CSV / XLSX</p>
                        <p className="text-[7px] leading-snug text-white/40">Part data, pricing, inventory logs.</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5 rounded-md bg-white/5 px-1.5 py-1">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-red-500/20 text-red-300">
                        <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 7V3.5L19.5 9H15z" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-[8px] font-semibold text-white">PDF</p>
                        <p className="text-[7px] leading-snug text-white/40">Quotes, drawings, spec sheets.</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-auto pt-1 text-[7px] text-white/35">Max file size: 50MB</p>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
                <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/8 bg-black/25 p-1.5">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-white/40">Recent uploads</p>
                    <span className="text-[7px] font-semibold text-accent-light">View all</span>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto">
                    <div className="grid grid-cols-[1fr_auto] gap-x-1 pb-0.5 text-[6px] font-semibold uppercase tracking-wide text-white/30">
                      <span>File name</span>
                      <span>Status</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => load("Plant-A-BOM.xlsx", SAMPLE)}
                      className="grid w-full grid-cols-[1fr_auto] items-center gap-x-1 border-t border-white/6 py-1 text-left"
                    >
                      <span className="truncate font-mono text-[7px] text-white/80">Plant-A-BOM.xlsx</span>
                      <span className="rounded-full bg-emerald-500/15 px-1 py-0.5 text-[6px] font-semibold text-emerald-400">Completed</span>
                    </button>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-x-1 border-t border-white/6 py-1">
                      <span className="truncate font-mono text-[7px] text-white/80">BOM_Q3_Final.csv</span>
                      <span className="inline-flex items-center gap-0.5 text-[6px] font-medium text-accent-light">
                        <span className="h-1.5 w-1.5 animate-spin rounded-full border border-accent-light border-t-transparent" />
                        Processing
                      </span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-x-1 border-t border-white/6 py-1">
                      <span className="truncate font-mono text-[7px] text-white/80">Legacy_Parts_List.xlsx</span>
                      <span className="rounded-full bg-red-500/15 px-1 py-0.5 text-[6px] font-semibold text-red-300">Error in row 42</span>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/8 bg-black/25 p-1.5">
                  <p className="mb-1 text-[7px] font-semibold uppercase tracking-[0.14em] text-white/40">PDF document review</p>
                  <div className="min-h-0 flex-1 space-y-0.5 overflow-auto">
                    {["Vendor_Quote_A.pdf", "Vendor_Quote_B.pdf", "Spec_Sheet_HD25.pdf"].map((name) => (
                      <div key={name} className="flex items-center gap-1 border-t border-white/6 py-1 first:border-t-0">
                        <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-accent/20 text-accent">
                          <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                          </svg>
                        </span>
                        <span className="min-w-0 flex-1 truncate font-mono text-[7px] text-white/75">{name}</span>
                        <span className="shrink-0 text-[7px] font-semibold text-accent-light">Review</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "research" && (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {!lines.length ? (
                <Empty go={() => setView("upload")} label="Upload a file to see its lines here." />
              ) : (
                <>
                  <p className="font-display text-[11px] font-semibold leading-tight text-white">Data Research</p>
                  <div className="mt-1 flex items-center gap-1 border-b border-white/8 pb-1">
                    <span className="inline-flex max-w-[70%] items-center gap-1 rounded-t-md border border-b-0 border-white/12 bg-white/8 px-1.5 py-0.5">
                      <svg className="h-2.5 w-2.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M7 6h10M7 18h10" />
                      </svg>
                      <span className="truncate font-mono text-[7px] text-white/80">{fileName}</span>
                    </span>
                    <span className="rounded-md px-1 py-0.5 text-[7px] font-semibold text-white/40">+ New tab</span>
                  </div>
                  <div className="flex items-center gap-0.5 py-1">
                    {[
                      "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243",
                      "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
                      "M4 6h7v12H4V6zm9 0h7v5h-7V6zm0 7h7v5h-7v-5z",
                      "M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4",
                    ].map((d) => (
                      <span key={d.slice(0, 18)} className="flex h-5 w-5 items-center justify-center rounded text-white/40">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                        </svg>
                      </span>
                    ))}
                    <span className="mx-0.5 h-3 w-px bg-white/10" />
                    <span className="flex h-5 w-5 items-center justify-center rounded text-white/40">
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded text-red-300/80">
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h10" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={runResearch}
                      title="Research"
                      className="ml-0.5 flex h-5 w-5 items-center justify-center rounded bg-accent/20 text-accent"
                    >
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </button>
                    <div className="ml-auto flex h-5 min-w-0 max-w-[42%] items-center rounded border border-white/10 bg-black/30 px-1.5">
                      <svg className="mr-1 h-2.5 w-2.5 shrink-0 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                      </svg>
                      <span className="truncate text-[7px] text-white/35">Search rows…</span>
                    </div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto rounded-md border border-white/8">
                    <table className="w-full border-collapse text-left">
                      <thead className="sticky top-0 bg-[#0d1219]">
                        <tr className="text-[6px] font-semibold uppercase tracking-wide text-white/35">
                          <th className="w-5 px-1 py-1">
                            <input
                              type="checkbox"
                              checked={lines.length > 0 && selected.length === lines.length}
                              onChange={() => setSelected(selected.length === lines.length ? [] : lines.map((l) => l.id))}
                              className="accent-[#2997ff]"
                            />
                          </th>
                          <th className="px-1 py-1">Research</th>
                          <th className="px-1 py-1">Internal part no.</th>
                          <th className="px-1 py-1">Part name</th>
                          <th className="px-1 py-1">Mfr</th>
                          <th className="px-1 py-1">Mfr part no.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lines.map((row, i) => {
                          const meta = PART_META[row.pn];
                          const on = selected.includes(row.id);
                          const found = hasLeads && on ? leadsFor(row.pn, row.qty).length : 0;
                          return (
                            <tr key={row.id} className={`text-[7px] ${on ? "bg-accent/12" : i % 2 ? "bg-white/4" : ""}`}>
                              <td className="px-1 py-0.5">
                                <input
                                  type="checkbox"
                                  checked={on}
                                  onChange={() => toggleLine(row.id)}
                                  className="accent-[#2997ff]"
                                />
                              </td>
                              <td className="px-1 py-0.5">
                                {found ? (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-400/20 px-1 py-0.5 text-[6px] font-semibold text-amber-200">
                                    {found} found
                                    <span aria-hidden>↗</span>
                                  </span>
                                ) : (
                                  <span className="text-white/25">—</span>
                                )}
                              </td>
                              <td className="max-w-[5.5rem] truncate px-1 py-0.5 font-mono text-white/85">{row.pn}</td>
                              <td className="max-w-[5.5rem] truncate px-1 py-0.5 text-white/70">{meta?.name ?? row.pn}</td>
                              <td className="truncate px-1 py-0.5 text-white/55">{meta?.mfr ?? row.plant}</td>
                              <td className="max-w-[5rem] truncate px-1 py-0.5 font-mono text-white/50">{row.pn}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-1 flex shrink-0 items-center gap-1.5">
                    <span className="rounded bg-accent px-1.5 py-0.5 text-[7px] font-semibold text-white">+ Add row</span>
                    <span className="rounded border border-white/12 px-1.5 py-0.5 text-[7px] font-medium text-white/55">Delete row</span>
                    <span className="ml-auto text-[6px] text-white/35">
                      Showing 1 to {lines.length} of {lines.length}
                    </span>
                    <span className="text-[6px] text-white/35">Page 1 of 1</span>
                  </div>
                </>
              )}
            </div>
          )}

          {view === "compare" && (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {!rawLeads.length ? (
                <Empty go={() => setView("research")} label="Research leads, then compare quotes." />
              ) : (
                <>
                  <div className="flex shrink-0 items-start gap-2">
                    <span className="h-9 w-9 shrink-0 overflow-hidden rounded-md border border-white/12 bg-white/5">
                      <img src={partImage} alt="" className="h-full w-full object-cover" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[9px] font-semibold text-white">
                        {active?.pn}
                        <span className="ml-1 font-sans font-medium text-white/45">
                          {PART_META[active?.pn ?? ""]?.name ?? "Part"} assembly
                        </span>
                      </p>
                      <p className="mt-0.5 text-[7px] leading-snug text-white/40">
                        Each row is one supplier quote. <span className="font-semibold text-accent-light">Top</span> marks the recommended pick.
                      </p>
                    </div>
                  </div>
                  <div className="mt-1.5 flex shrink-0 flex-wrap gap-1">
                    {COMPARE_FILTERS.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRegion(r)}
                        className={`rounded-full px-2 py-0.5 text-[7px] font-semibold ${
                          region === r ? "bg-white text-slate-900" : "border border-white/12 bg-white/5 text-white/55"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <div className="mt-1.5 min-h-0 flex-1 overflow-auto rounded-md border border-white/8">
                    <table className="w-full border-collapse text-left">
                      <thead className="sticky top-0 bg-[#0d1219]">
                        <tr className="text-[6px] font-semibold uppercase tracking-wide text-white/35">
                          <th className="px-1.5 py-1">Vendor</th>
                          <th className="px-1 py-1">Region</th>
                          <th className="px-1 py-1">$/unit</th>
                          <th className="px-1 py-1">Lead</th>
                          <th className="px-1 py-1">MOQ</th>
                          <th className="px-1 py-1">Rel.</th>
                          <th className="px-1 py-1 text-right">AI score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...leads]
                          .map((row) => ({ ...row, score: aiScore(row) }))
                          .sort((a, b) => b.score - a.score)
                          .map((row, i) => {
                            const top = i === 0;
                            return (
                              <tr
                                key={row.id}
                                className={`text-[7px] ${top ? "bg-accent/14" : i % 2 ? "bg-white/3" : ""}`}
                              >
                                <td className="px-1.5 py-1">
                                  <span className="flex items-center gap-1">
                                    <span className="w-3 shrink-0 text-[6px] font-semibold text-white/30">{VENDOR_CC[row.name] ?? ""}</span>
                                    <span className="truncate font-semibold text-white">{row.name}</span>
                                    {top ? (
                                      <span className="shrink-0 rounded bg-accent px-1 py-px text-[6px] font-bold uppercase tracking-wide text-white">
                                        Top
                                      </span>
                                    ) : null}
                                  </span>
                                </td>
                                <td className="max-w-[4.5rem] truncate px-1 py-1 text-white/50">{row.region}</td>
                                <td className="px-1 py-1 tabular-nums text-white/80">{usd(row.unit)}</td>
                                <td className="px-1 py-1 tabular-nums text-white/55">{row.lead}</td>
                                <td className="px-1 py-1 tabular-nums text-white/35">{row.moq}</td>
                                <td className="px-1 py-1 tabular-nums font-semibold text-emerald-400">{row.reliability}%</td>
                                <td className="px-1 py-1 text-right">
                                  {row.score >= 90 ? (
                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/25 text-[7px] font-bold text-accent-light">
                                      {row.score}
                                    </span>
                                  ) : (
                                    <span className="tabular-nums text-white/70">{row.score}</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {view === "rfq" && (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {!poVendor || !active ? (
                <Empty go={() => setView("compare")} label="Compare leads, then create an RFQ." />
              ) : (
                <>
                  <div className="flex shrink-0 items-baseline justify-between gap-2">
                    <p className="text-[7px] text-white/45">
                      <span className="font-bold uppercase tracking-wider text-accent">Step 4</span>
                      <span className="mx-1 text-white/20">·</span>
                      PO matches Step 3
                    </p>
                    <p className="truncate font-mono text-[7px] tabular-nums text-white/70">
                      {poVendor.name} · {poQty} units · {usd(poTotal)}
                    </p>
                  </div>
                  <p className="mt-1 shrink-0 text-[7px] text-white/35">
                    Header and line totals below mirror Step 3 (read-only).
                  </p>
                  <div className="mt-1.5 min-h-0 flex-1 overflow-auto rounded-md border border-white/8 bg-black/25 p-2">
                    <div className="flex items-start justify-between gap-2 border-b border-white/8 pb-1.5">
                      <div>
                        <p className="text-[6px] font-semibold uppercase tracking-[0.14em] text-white/35">Purchase order</p>
                        <p className="font-display text-[11px] font-bold text-white">PO-2026-0842</p>
                        <p className="mt-0.5 text-[7px] text-white/45">
                          Status: <span className="font-semibold text-emerald-400">Ready for approval</span>
                        </p>
                        <p className="mt-0.5 text-[6px] text-white/35">Currency: USD · Incoterms: FOB origin</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[6px] text-white/35">Issue date</p>
                        <p className="font-mono text-[7px] font-semibold text-white/80">Apr 9, 2026</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b border-white/8 py-1.5">
                      <div>
                        <p className="text-[6px] font-semibold uppercase tracking-[0.14em] text-white/35">Vendor</p>
                        <p className="mt-0.5 text-[8px] font-semibold text-white">
                          {VENDOR_CC[poVendor.name] ?? ""} {poVendor.name}
                        </p>
                        <p className="text-[6px] text-white/40">Payment: Net 30</p>
                      </div>
                      <div>
                        <p className="text-[6px] font-semibold uppercase tracking-[0.14em] text-white/35">Ship to</p>
                        <p className="mt-0.5 text-[8px] font-semibold text-white">Plant 04 — Detroit, MI</p>
                        <p className="text-[6px] text-white/40">Receiving dock B</p>
                      </div>
                    </div>
                    <table className="mt-1 w-full border-collapse text-left">
                      <thead>
                        <tr className="text-[6px] font-semibold uppercase tracking-wide text-white/35">
                          <th className="py-1 pr-1">Line</th>
                          <th className="py-1 pr-1">Part / description</th>
                          <th className="py-1 pr-1 text-right">Qty</th>
                          <th className="py-1 pr-1 text-right">Unit</th>
                          <th className="py-1 text-right">Ext.</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-[7px] text-white/80">
                          <td className="py-1 pr-1 font-mono text-white/40">001</td>
                          <td className="py-1 pr-1">
                            <span className="block truncate font-mono font-semibold text-white">{active.pn}</span>
                            <span className="block truncate text-[6px] text-white/40">
                              {PART_META[active.pn]?.name ?? "Part"} assembly
                            </span>
                          </td>
                          <td className="py-1 pr-1 text-right tabular-nums">{poQty}</td>
                          <td className="py-1 pr-1 text-right tabular-nums">{usd(poVendor.unit)}</td>
                          <td className="py-1 text-right tabular-nums">{usd(poSubtotal)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="ml-auto mt-1.5 w-[55%] min-w-[7.5rem] space-y-0.5 border-t border-white/8 pt-1.5 text-[7px]">
                      <div className="flex justify-between text-white/45">
                        <span>Subtotal</span>
                        <span className="font-mono tabular-nums text-white/80">{usd(poSubtotal)}</span>
                      </div>
                      <div className="flex justify-between text-white/45">
                        <span>Duty (est.)</span>
                        <span className="font-mono tabular-nums text-white/80">{usd(poDuty)}</span>
                      </div>
                      <div className="flex justify-between text-white/45">
                        <span>Freight</span>
                        <span className="font-mono tabular-nums text-white/80">{usd(poFreight)}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/8 pt-1 font-display text-[8px] font-bold text-white">
                        <span>Total</span>
                        <span className="font-mono tabular-nums text-accent-light">{usd(poTotal)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1.5 flex shrink-0 flex-wrap gap-1">
                    <span className="rounded border border-white/12 px-1.5 py-0.5 text-[7px] font-semibold text-white/55">Export CSV</span>
                    <span className="rounded border border-white/12 px-1.5 py-0.5 text-[7px] font-semibold text-white/55">Send to Coupa</span>
                    <span className="rounded bg-white px-1.5 py-0.5 text-[7px] font-semibold text-slate-900">Submit for approval</span>
                  </div>
                </>
              )}
            </div>
          )}

          {view === "reports" && (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex shrink-0 items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-display text-[11px] font-semibold leading-tight text-white">Reports</p>
                  <p className="mt-0.5 text-[7px] text-white/40">Create and edit Word-style reports; export as .docx.</p>
                </div>
                <div className="flex shrink-0 flex-wrap justify-end gap-1">
                  <span className="inline-flex items-center gap-0.5 rounded border border-white/12 px-1.5 py-0.5 text-[7px] font-semibold text-white/60">
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Word
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded border border-white/12 px-1.5 py-0.5 text-[7px] font-semibold text-white/60">
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    AI report
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded bg-accent px-1.5 py-0.5 text-[7px] font-semibold text-white">
                    + New report
                  </span>
                </div>
              </div>
              <div className="mt-1.5 min-h-0 flex-1 space-y-1.5 overflow-auto">
                {DEMO_REPORTS.map((r) => (
                  <div key={r.title} className="flex items-start gap-1.5 rounded-md border border-white/8 bg-black/25 p-1.5">
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${
                        r.tone === "rose" ? "bg-rose-500/15 text-rose-300" : "bg-sky-500/15 text-sky-300"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 7V3.5L19.5 9H15z" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <p className="truncate text-[8px] font-semibold text-white">{r.title}</p>
                        <span
                          className={`rounded px-1 py-px text-[6px] font-semibold ${
                            r.tone === "rose" ? "bg-rose-500/20 text-rose-300" : "bg-sky-500/20 text-sky-300"
                          }`}
                        >
                          {r.tag}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[7px] leading-snug text-white/40">{r.summary}</p>
                      <p className="mt-1 text-[6px] text-white/30">{r.when}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5 pt-0.5">
                      <span className="grid h-5 w-5 place-items-center rounded border border-white/12 text-white/45" title="Edit">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l9.414-9.414a2 2 0 00-2.828-2.828L6.465 16.88A1 1 0 006.172 17.586V20z" />
                        </svg>
                      </span>
                      <span className="hidden items-center gap-0.5 px-1 text-[6px] font-semibold text-white/45 sm:inline-flex">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        .docx
                      </span>
                      <span className="grid h-5 w-5 place-items-center text-white/30" title="Delete">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h10" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function Empty({ go, label }: { go: () => void; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-3 text-center">
      <p className="text-[10px] text-white/55">{label}</p>
      <button type="button" onClick={go} className="mt-2 text-[10px] font-semibold text-accent-light">
        Go there
      </button>
    </div>
  );
}
