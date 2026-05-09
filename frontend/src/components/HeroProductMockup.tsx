/**
 * Decorative “screen inside the hero” — built from the same UI tokens as the marketing site
 * (no stock photography). Pure HTML/CSS for crisp scaling and brand alignment.
 */
export default function HeroProductMockup() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#0a0e14] text-left shadow-inner"
      role="img"
      aria-label="Illustrative Partsource interface: part search, metrics, and vendor comparison table"
    >
      {/* Ambient depth behind the fake UI */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 80% 10%, rgba(0,113,227,0.35), transparent 50%), radial-gradient(ellipse 60% 50% at 12% 88%, rgba(41,151,255,0.12), transparent 45%)",
        }}
      />

      <div className="relative flex aspect-16/10 min-h-[200px]">
        {/* Sidebar — dense app chrome */}
        <aside
          className="hidden w-[26%] shrink-0 border-r border-white/8 bg-black/35 p-2.5 sm:flex sm:flex-col"
          aria-hidden
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-white/10 ring-1 ring-white/10" />
            <span className="font-display text-[10px] font-semibold tracking-tight text-white/90">Partsource</span>
          </div>
          <div className="space-y-1.5">
            {["Research", "Compare", "Awards", "Suppliers"].map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-medium ${
                  i === 0 ? "bg-accent/25 text-white ring-1 ring-accent/40" : "text-white/55"
                }`}
              >
                <span className={`h-1 w-1 rounded-full ${i === 0 ? "bg-accent-light" : "bg-white/25"}`} />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-auto space-y-2 pt-4">
            <div className="h-10 rounded-lg bg-white/4 ring-1 ring-white/6" />
            <div className="h-10 rounded-lg bg-white/4 ring-1 ring-white/6" />
          </div>
        </aside>

        {/* Main workspace */}
        <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-3">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-2.5 ring-1 ring-black/20">
              <svg className="h-3.5 w-3.5 shrink-0 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="truncate font-mono text-[10px] text-white/45 sm:text-[11px]">HD-17 · OEM cross · alternates</span>
            </div>
            <button
              type="button"
              tabIndex={-1}
              className="shrink-0 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm shadow-black/30 sm:text-[11px]"
            >
              Run research
            </button>
          </div>

          {/* KPI strip */}
          <div className="mb-2 grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { k: "Quotes", v: "14", s: "in network" },
              { k: "Best landed", v: "$182.40", s: "Plant A" },
              { k: "Fastest", v: "6 d", s: "dock→line" },
            ].map((row) => (
              <div
                key={row.k}
                className="rounded-lg border border-white/10 bg-white/3 px-2 py-1.5 sm:px-2.5 sm:py-2"
              >
                <p className="text-[9px] font-medium uppercase tracking-wide text-white/45">{row.k}</p>
                <p className="font-display text-sm font-semibold tabular-nums text-white sm:text-base">{row.v}</p>
                <p className="text-[9px] text-accent-light/90">{row.s}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-white/8 bg-black/25 ring-1 ring-black/40">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/3 px-2 py-1.5 sm:px-2.5">
              <span className="text-[10px] font-semibold text-white/90">Vendor matrix</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-medium text-emerald-300/95">Live signals</span>
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <table className="w-full border-collapse text-[9px] sm:text-[10px]">
                <thead>
                  <tr className="text-left text-white/50">
                    <th className="sticky top-0 bg-[#0a0e14]/95 px-2 py-1.5 font-medium backdrop-blur-sm">Supplier</th>
                    <th className="sticky top-0 bg-[#0a0e14]/95 px-2 py-1.5 font-medium backdrop-blur-sm">Unit</th>
                    <th className="sticky top-0 bg-[#0a0e14]/95 px-2 py-1.5 font-medium backdrop-blur-sm">Landed</th>
                    <th className="sticky top-0 bg-[#0a0e14]/95 px-2 py-1.5 font-medium backdrop-blur-sm">Lead</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/85">
                  {[
                    { name: "Midwest Motion", unit: "$164.00", land: "$182.40", lead: "6 d", hi: true },
                    { name: "Atlas Bearing Co.", unit: "$171.20", land: "$188.90", lead: "9 d", hi: false },
                    { name: "Harbor Industrial", unit: "$159.80", land: "$201.10", lead: "12 d", hi: false },
                  ].map((row) => (
                    <tr key={row.name} className="bg-white/5">
                      <td className="px-2 py-1.5 font-medium">
                        {row.name}
                        {row.hi ? (
                          <span className="ml-1 rounded bg-accent/25 px-1 py-px text-[8px] font-semibold text-accent-light">
                            Pick
                          </span>
                        ) : null}
                      </td>
                      <td className="px-2 py-1.5 tabular-nums text-white/75">{row.unit}</td>
                      <td className="px-2 py-1.5 tabular-nums">{row.land}</td>
                      <td className="px-2 py-1.5 tabular-nums text-white/70">{row.lead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Sparkline-ish bars */}
            <div className="flex h-11 items-end gap-0.5 border-t border-white/10 bg-black/20 px-2 py-1.5" aria-hidden>
              {[40, 72, 55, 88, 63, 91, 48].map((h, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-1 rounded-sm bg-linear-to-t from-accent/85 to-accent-light/35"
                  style={{ height: `${Math.round(16 + (h / 100) * 28)}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
