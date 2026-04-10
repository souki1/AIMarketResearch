import { useMemo, useState } from "react";

/** Single demo part across all three panels so labels stay consistent */
const DEMO_PART = {
  number: "HD-CSD-25-160-2A-GR",
  title: "Harmonic drive gearbox assembly",
} as const;

/** en-US grouping + 2 decimals — use everywhere so Step 3 and Step 4 totals always match */
function usd(amount: number): string {
  return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type RegionFilter = "All" | "Asia Pacific" | "Europe" | "Americas";

const COMPARE_ROWS = [
  {
    name: "SureGear Industries",
    flag: "🇯🇵",
    region: "Asia Pacific" as const,
    unit: 27.6,
    lead: "3–4 wk",
    moq: 5,
    rel: 99,
    score: 94,
    recommended: true,
  },
  {
    name: "HarmoTech China",
    flag: "🇨🇳",
    region: "Asia Pacific" as const,
    unit: 17.3,
    lead: "5–6 wk",
    moq: 50,
    rel: 89,
    score: 78,
    recommended: false,
  },
  {
    name: "MapleTorque Ltd.",
    flag: "🇨🇦",
    region: "Americas" as const,
    unit: 23.8,
    lead: "5–6 wk",
    moq: 15,
    rel: 95,
    score: 88,
    recommended: false,
  },
  {
    name: "KinetiX Motion GmbH",
    flag: "🇩🇪",
    region: "Europe" as const,
    unit: 24.9,
    lead: "4–5 wk",
    moq: 10,
    rel: 97,
    score: 91,
    recommended: false,
  },
];

const REGION_FILTERS: RegionFilter[] = ["All", "Asia Pacific", "Europe", "Americas"];

function WindowChrome({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-slate-200/90 bg-slate-50/90">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-[11px] font-semibold text-brand truncate font-mono">{title}</p>
          {subtitle ? (
            <p className="text-[10px] text-slate-500 truncate mt-0.5">{subtitle}</p>
          ) : null}
        </div>
        <span className="w-14 shrink-0" aria-hidden />
      </div>
    </div>
  );
}

/** Ties each mock to the same part + step so copy matches the pixels */
function PanelContext({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 sm:px-4 py-3 bg-white border-b border-slate-100 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
      {children}
    </div>
  );
}

export default function SolutionsProductShowcase() {
  const [region, setRegion] = useState<RegionFilter>("All");
  const [qty, setQty] = useState(50);
  const [selectedVendor, setSelectedVendor] = useState(COMPARE_ROWS[0].name);

  const filteredCompare = useMemo(() => {
    if (region === "All") return COMPARE_ROWS;
    return COMPARE_ROWS.filter((r) => r.region === region);
  }, [region]);

  const activeVendor = useMemo(
    () => COMPARE_ROWS.find((v) => v.name === selectedVendor) ?? COMPARE_ROWS[0],
    [selectedVendor],
  );

  const moqOk = qty >= activeVendor.moq;
  const subtotal = qty * activeVendor.unit;
  const duty = subtotal * 0.025;
  const shipping = 118;
  const landed = subtotal + duty + shipping;
  const worstUnit = Math.max(...COMPARE_ROWS.map((r) => r.unit));
  const worstCaseLanded = qty * worstUnit * 1.025 + shipping;
  const savingsVsWorst = worstCaseLanded - landed;

  return (
    <div className="space-y-0 md:space-y-0">
      {/* Step 1 — copy left · UI right */}
      <div className="grid lg:grid-cols-[1fr_minmax(0,1.15fr)] gap-8 lg:gap-12 lg:gap-x-16 items-center py-10 md:py-12 first:pt-0">
        <div className="min-w-0 lg:order-1">
          <p className="inline-flex items-center rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
            Step 1 · Part scope
          </p>
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider mt-4">Lock the part first</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">One part number, one sourcing run</h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
            Before you compare suppliers in detail (Step 2), you anchor the workflow: the exact part, plant context, and what “good” means. Everything below stays tied to this scope.
          </p>
        </div>
        <div className="min-w-0 rounded-2xl border border-slate-200/90 bg-white shadow-[0_16px_50px_-20px_rgba(0,0,0,0.15)] overflow-hidden ring-1 ring-black/5 lg:order-2">
          <WindowChrome title="Partsource · Part scope" subtitle="Sourcing run · locked" />
          <PanelContext>
            <p className="text-slate-700">
              <span className="font-mono font-semibold text-brand break-all">{DEMO_PART.number}</span>
              <span className="text-slate-400 mx-1.5">·</span>
              <span>{DEMO_PART.title}</span>
            </p>
          </PanelContext>
          <div className="p-4 sm:p-5 bg-[#fafafa] space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                Plant: Detroit 04
              </span>
              <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                Category: Motion / gearboxes
              </span>
              <span className="rounded-md border border-accent/20 bg-accent/5 px-2.5 py-1 text-[11px] font-semibold text-accent">
                Global supplier scan
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Next: <span className="font-semibold text-brand">Step 2</span> opens the full compare grid—region filters, unit price, lead, MOQ, reliability, and AI score for every quote on this part.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 — UI left · copy right (zig-zag) · wider mock column */}
      <div className="grid lg:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] gap-8 max-lg:gap-y-12 lg:gap-12 lg:gap-x-16 items-center py-12 md:py-16 border-t border-slate-200/60 bg-slate-100/35 rounded-2xl sm:rounded-3xl px-3 sm:px-4 lg:-mx-4 lg:px-4">
        <div className="min-w-0 lg:order-2 pl-4 sm:pl-5 lg:pl-8">
          <p className="inline-flex items-center rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
            Step 2 · Compare in detail
          </p>
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider mt-4">Regional supplier matrix</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Every quote on the same part, side by side</h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
            This is the detailed compare for <span className="font-mono font-semibold text-brand">{DEMO_PART.number}</span>: region chips filter the table; columns are unit economics, lead, MOQ, reliability, and composite{" "}
            <span className="font-semibold text-brand">AI score</span>. After you pick a direction,{" "}
            <span className="font-semibold text-brand">Step 3</span> models landed cost for a chosen supplier and quantity.
          </p>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200/90 bg-white shadow-[0_28px_90px_-28px_rgba(0,0,0,0.2)] overflow-hidden ring-1 ring-black/5 lg:order-1 text-[13px] sm:text-sm">
          <WindowChrome title="Partsource · Supplier compare" subtitle={`Part ${DEMO_PART.number}`} />
          <PanelContext>
            <p className="text-slate-700">
              <span className="font-mono font-semibold text-brand break-all">{DEMO_PART.number}</span>
              <span className="text-slate-400 mx-1.5">·</span>
              <span>{DEMO_PART.title}</span>
            </p>
            <p className="mt-2.5 pt-2.5 border-t border-slate-100 text-slate-500 leading-snug">
              Each row is one supplier quote on this part.{" "}
              <span className="text-brand font-medium">Top</span> marks the recommended shortlist pick (AI score + fit).
            </p>
          </PanelContext>
          <div className="p-4 sm:p-6 bg-[#fafafa]">
            <div className="flex flex-wrap gap-2 mb-4">
              {REGION_FILTERS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    region === r
                      ? "bg-brand text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-xs sm:text-sm">
                <caption className="sr-only">
                  Supplier quotes for {DEMO_PART.number}: unit price in USD, lead time, MOQ, on-time reliability, and composite AI score.
                </caption>
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/90 text-slate-500 uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    <th scope="col" className="px-4 py-3 font-semibold text-left">
                      Vendor
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-left">
                      Region
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold tabular-nums text-left" title="Unit price, U.S. dollars">
                      $/unit
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-left">
                      Lead
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold tabular-nums text-left" title="Minimum order quantity (units)">
                      MOQ
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold tabular-nums text-left" title="On-time delivery reliability">
                      Rel.
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-semibold text-right tabular-nums"
                      title="Composite score (price, MOQ, reliability)"
                    >
                      AI score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCompare.map((row) => (
                    <tr
                      key={row.name}
                      className={
                        row.recommended
                          ? "bg-accent/6 ring-1 ring-inset ring-accent/20"
                          : "hover:bg-slate-50/80"
                      }
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg leading-none">{row.flag}</span>
                          <span className="font-semibold text-brand">{row.name}</span>
                          {row.recommended && (
                            <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                              Top
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{row.region}</td>
                      <td className="px-4 py-3 font-mono tabular-nums text-brand">${usd(row.unit)}</td>
                      <td className="px-4 py-3 text-slate-700">{row.lead}</td>
                      <td className="px-4 py-3 font-mono tabular-nums">{row.moq}</td>
                      <td className="px-4 py-3 font-mono tabular-nums text-emerald-700">{row.rel}%</td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`inline-flex min-w-9 justify-center rounded-full px-2.5 py-1 font-bold tabular-nums text-sm ${
                            row.score >= 90 ? "bg-accent/15 text-accent" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {row.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center sm:text-left">
              <span className="font-medium text-slate-600">Demo data.</span> Prices in USD. AI score weights reliability, unit price, and MOQ fit—column headers match the grid above.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 — copy left · UI right */}
      <div className="grid lg:grid-cols-[1fr_minmax(0,1.15fr)] gap-8 lg:gap-12 lg:gap-x-16 items-center py-10 md:py-12 border-t border-slate-200/60">
        <div className="min-w-0 lg:order-1">
          <p className="inline-flex items-center rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
            Step 3 · Landed cost
          </p>
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider mt-4">Price & landed cost model</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Same part · pick supplier · set quantity</h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
            After <span className="font-semibold text-brand">Step 2</span>, you cost the award: choose a supplier from the shortlist, set quantity, then review duty and freight.{" "}
            <span className="font-semibold text-brand">Step 4</span> then builds the PO from the same totals—no second data entry.
          </p>
        </div>

        <div className="flex min-w-0 flex-col rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.18)] ring-1 ring-black/5 lg:order-2 w-full overflow-hidden">
            <WindowChrome
              title="Partsource · Landed cost model"
              subtitle={`${DEMO_PART.number} · duty + freight estimate`}
            />
            <PanelContext>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent whitespace-nowrap">Step 3</span>
                  <span className="text-slate-300 select-none" aria-hidden>
                    ·
                  </span>
                  <span className="text-slate-600">Costing</span>
                  <span className="text-slate-300 select-none" aria-hidden>
                    ·
                  </span>
                  <span className="font-semibold text-brand">{activeVendor.name}</span>
                  <span className="text-slate-300 select-none" aria-hidden>
                    ·
                  </span>
                  <span className="font-mono font-semibold text-brand tabular-nums">
                    {qty} <span className="text-slate-500 font-sans font-normal">units</span>
                  </span>
                </p>
              </div>
              <p className="mt-2.5 text-slate-500 border-t border-slate-100 pt-2.5">
                Use the fields below to set supplier and quantity. The <span className="font-semibold text-brand">Landed total</span> is what Step 4 copies into the purchase order (same currency: USD).
              </p>
            </PanelContext>
            <div className="p-4 sm:p-5 flex flex-col gap-4 bg-[#fafafa]">
              <div>
                <label htmlFor="showcase-vendor" className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                  Supplier (from Step 2 shortlist)
                </label>
                <select
                  id="showcase-vendor"
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-brand shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                  aria-label="Select supplier for landed cost model"
                >
                  {COMPARE_ROWS.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.flag} {v.name} · ${usd(v.unit)}/u · MOQ {v.moq}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                  <label htmlFor="showcase-qty">Order quantity (units)</label>
                  <span className="font-mono text-accent tabular-nums">{qty} units</span>
                </div>
                <input
                  id="showcase-qty"
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="mt-2 w-full accent-accent h-2 rounded-full bg-slate-200"
                  aria-valuemin={5}
                  aria-valuemax={200}
                  aria-valuenow={qty}
                  aria-label="Order quantity in units"
                />
                <div className="mt-1 flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5</span>
                  <span>200</span>
                </div>
              </div>

              {!moqOk && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  Below supplier MOQ ({activeVendor.moq}). Adjust quantity or pick another line.
                </div>
              )}

              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5 text-sm text-neutral-900">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 pb-1 border-b border-slate-100">
                  Line · <span className="font-mono text-brand">{DEMO_PART.number}</span>
                </p>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600 shrink-0">Unit price</span>
                  <span className="font-mono font-semibold tabular-nums text-neutral-900">${usd(activeVendor.unit)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600 shrink-0">Line subtotal</span>
                  <span className="font-mono font-semibold tabular-nums text-neutral-900">${usd(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4 text-slate-700">
                  <span>Est. duty (2.5%)</span>
                  <span className="font-mono font-semibold tabular-nums text-neutral-900">${usd(duty)}</span>
                </div>
                <div className="flex justify-between gap-4 text-slate-700">
                  <span>Freight & handling</span>
                  <span className="font-mono font-semibold tabular-nums text-neutral-900">${usd(shipping)}</span>
                </div>
                <div className="border-t border-slate-100 pt-2.5 flex justify-between items-baseline">
                  <span className="font-display font-bold text-brand">Landed total</span>
                  <span className="font-display text-xl font-bold text-accent tabular-nums">${usd(landed)}</span>
                </div>
                {moqOk && savingsVsWorst > 15 && (
                  <p className="text-xs text-emerald-700 font-medium pt-1">
                    ≈ ${Math.round(savingsVsWorst).toLocaleString("en-US")} vs. highest unit-cost option at this volume (incl. duty & freight)
                  </p>
                )}
              </div>
            </div>
          </div>
      </div>

      {/* Step 4 — UI left · copy right (zig-zag) · wider mock column */}
      <div className="grid lg:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] gap-8 max-lg:gap-y-16 lg:gap-12 lg:gap-x-16 xl:gap-x-20 items-center mt-10 sm:mt-12 md:mt-14 py-12 md:py-16 pb-6 md:pb-8 bg-slate-100/35 rounded-2xl sm:rounded-3xl px-3 sm:px-4 lg:-mx-4 lg:px-4">
        <div className="min-w-0 lg:order-2 pl-4 sm:pl-5 lg:pl-8">
          <p className="inline-flex items-center rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
            Step 4 · Purchase order
          </p>
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider mt-4">PO draft & export</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Same line items as Step 3</h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
            Vendor, qty, unit, ext., duty, freight, and total match <span className="font-semibold text-brand">Step 3</span> exactly. The PO is the handoff—CSV, Coupa, or approval—without retyping the landed cost model.
          </p>
        </div>

        <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.18)] ring-1 ring-black/5 w-full max-lg:max-w-[min(100%,42rem)] max-lg:mx-auto lg:order-1">
            <WindowChrome
              title="Partsource · Purchase order (draft)"
              subtitle={`${DEMO_PART.number} · totals = Step 3`}
            />
            <PanelContext>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent whitespace-nowrap">Step 4</span>
                  <span className="text-slate-300 select-none" aria-hidden>
                    ·
                  </span>
                  <span className="text-slate-600">PO matches Step 3</span>
                </p>
                <p className="font-mono text-xs sm:text-sm text-brand tabular-nums sm:text-right break-all">
                  {activeVendor.name} · {qty} units · ${usd(landed)}
                </p>
              </div>
              <p className="mt-2.5 text-slate-500 border-t border-slate-100 pt-2.5">
                Header and line totals below mirror Step 3 (read-only; no re-entry).
              </p>
            </PanelContext>
            <div className="p-4 sm:p-6 bg-white text-[11px] sm:text-xs text-neutral-900">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Purchase order</p>
                  <p className="font-display text-lg font-bold text-brand mt-0.5">PO-2026-0842</p>
                  <p className="text-slate-500 mt-1">Status: <span className="text-emerald-600 font-semibold">Ready for approval</span></p>
                  <p className="text-[10px] text-slate-400 mt-1.5">Currency: USD · Incoterms: FOB origin</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500">Issue date</p>
                  <p className="font-mono font-semibold text-brand">Apr 9, 2026</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 py-4 border-b border-slate-100">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Vendor</p>
                  <p className="font-semibold text-brand mt-1">{activeVendor.flag} {activeVendor.name}</p>
                  <p className="text-slate-500 mt-0.5">Payment: Net 30</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Ship to</p>
                  <p className="font-semibold text-brand mt-1">Plant 04 — Detroit, MI</p>
                  <p className="text-slate-500 mt-0.5">Receiving dock B</p>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[420px] mt-2">
                  <caption className="sr-only">
                    Purchase order lines for {DEMO_PART.number}: quantity, unit price, and extended price in USD.
                  </caption>
                  <thead>
                    <tr className="text-left text-[9px] uppercase tracking-widest text-slate-500 border-b border-slate-100">
                      <th scope="col" className="py-2 pr-2 font-semibold">
                        Line
                      </th>
                      <th scope="col" className="py-2 pr-2 font-semibold">
                        Part / description
                      </th>
                      <th scope="col" className="py-2 pr-2 font-semibold text-right tabular-nums whitespace-nowrap">
                        Qty
                      </th>
                      <th scope="col" className="py-2 pr-2 font-semibold text-right tabular-nums whitespace-nowrap" title="Unit price, USD">
                        Unit
                      </th>
                      <th scope="col" className="py-2 pl-2 font-semibold text-right tabular-nums whitespace-nowrap min-w-26" title="Extended = Qty × unit">
                        Ext.
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 font-mono text-slate-500">001</td>
                      <td className="py-2.5 max-w-[200px]">
                        <span className="font-mono font-semibold text-neutral-900">{DEMO_PART.number}</span>
                        <span className="block text-slate-600 mt-0.5">{DEMO_PART.title}</span>
                      </td>
                      <td className="py-2.5 text-right font-mono font-semibold tabular-nums text-neutral-900 whitespace-nowrap">{qty}</td>
                      <td className="py-2.5 text-right font-mono font-semibold tabular-nums text-neutral-900 whitespace-nowrap">${usd(activeVendor.unit)}</td>
                      <td className="py-2.5 pl-2 text-right font-mono font-semibold tabular-nums text-neutral-900 whitespace-nowrap">${usd(subtotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 w-full max-w-xs ml-auto">
                <div className="flex justify-between gap-6 text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold tabular-nums text-neutral-900">${usd(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-6 text-slate-600">
                  <span>Duty (est.)</span>
                  <span className="font-mono font-semibold tabular-nums text-neutral-900">${usd(duty)}</span>
                </div>
                <div className="flex justify-between gap-6 text-slate-600">
                  <span>Freight</span>
                  <span className="font-mono font-semibold tabular-nums text-neutral-900">${usd(shipping)}</span>
                </div>
                <div className="flex justify-between gap-6 font-display text-sm font-bold text-neutral-900 pt-1 border-t border-slate-100">
                  <span>Total</span>
                  <span className="font-mono font-bold text-accent tabular-nums">${usd(landed)}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                  Export CSV
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                  Send to Coupa
                </span>
                <span className="rounded-md bg-brand px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                  Submit for approval
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
