import { useRef, useEffect, useState, useMemo } from "react";
import partImage from "../assets/images/download (1).jpg";

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const demoPart = {
  vendors: [
    { name: "SureGear Industries", country: "Japan", flag: "🇯🇵", region: "Asia Pacific", price: 1380, leadTime: "3–4 weeks", moq: 5, reliability: 99, cert: "ISO 9001" },
    { name: "KinetiX Motion GmbH", country: "Germany", flag: "🇩🇪", region: "Europe", price: 1245, leadTime: "4–5 weeks", moq: 10, reliability: 97, cert: "ISO 9001" },
    { name: "Nordic Actuators AB", country: "Sweden", flag: "🇸🇪", region: "Europe", price: 1410, leadTime: "4 weeks", moq: 5, reliability: 98, cert: "ISO 14001" },
    { name: "PrecisionDrive Co.", country: "USA", flag: "🇺🇸", region: "Americas", price: 1125, leadTime: "6–7 weeks", moq: 25, reliability: 94, cert: "AS9100" },
    { name: "HarmoTech China", country: "China", flag: "🇨🇳", region: "Asia Pacific", price: 865, leadTime: "5–6 weeks", moq: 50, reliability: 89, cert: "ISO 9001" },
    { name: "Apex Drives India", country: "India", flag: "🇮🇳", region: "Asia Pacific", price: 780, leadTime: "7–8 weeks", moq: 100, reliability: 85, cert: "ISO 9001" },
    { name: "MapleTorque Ltd.", country: "Canada", flag: "🇨🇦", region: "Americas", price: 1190, leadTime: "5–6 weeks", moq: 15, reliability: 95, cert: "ISO 9001" },
    { name: "Doosan Motion", country: "South Korea", flag: "🇰🇷", region: "Asia Pacific", price: 1050, leadTime: "4–5 weeks", moq: 10, reliability: 96, cert: "ISO 14001" },
    { name: "Bonfiglioli SPA", country: "Italy", flag: "🇮🇹", region: "Europe", price: 1320, leadTime: "5 weeks", moq: 8, reliability: 96, cert: "ISO 9001" },
    { name: "Gulf Precision LLC", country: "UAE", flag: "🇦🇪", region: "Middle East", price: 1480, leadTime: "3–4 weeks", moq: 5, reliability: 93, cert: "ISO 9001" },
  ],
};

const regions = ["All Regions", "Asia Pacific", "Europe", "Americas", "Middle East"] as const;

const keyNumbers = [
  { value: "$780", label: "Lowest price", sub: "Apex Drives India" },
  { value: "99%", label: "Highest reliability", sub: "SureGear Industries" },
  { value: "3 wks", label: "Fastest lead time", sub: "SureGear Industries" },
  { value: "10", label: "Vendors compared", sub: "Across 4 regions, 10 countries" },
  { value: "38%", label: "Price variance", sub: "$780 – $1,480 spread" },
  { value: "87%", label: "Decision confidence", sub: "AI-weighted score" },
];

/* ══════════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════════ */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".sr, .sr-scale, .sr-left, .sr-right");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */

export default function PartShowcase() {
  const revealRef = useReveal();
  const [activeRegion, setActiveRegion] = useState<string>("All Regions");

  const maxPrice = Math.max(...demoPart.vendors.map((v) => v.price));
  const minPrice = Math.min(...demoPart.vendors.map((v) => v.price));
  const bestVendor = demoPart.vendors.reduce((a, b) => (a.reliability > b.reliability ? a : b));

  const filteredVendors = useMemo(() => {
    const list = activeRegion === "All Regions"
      ? demoPart.vendors
      : demoPart.vendors.filter((v) => v.region === activeRegion);
    return [...list].sort((a, b) => b.reliability - a.reliability);
  }, [activeRegion]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const v of demoPart.vendors) {
      counts[v.region] = (counts[v.region] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <section id="part-showcase" className="relative scroll-mt-20">
      <div ref={revealRef}>
        {/* ── Global vendor intelligence ── */}
        <div className="relative py-20 sm:py-28 bg-[#fafafa] text-brand overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.04),transparent_70%)]" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

            {/* Featured part — teaser (from home hero) */}
            <div className="sr group relative w-full max-w-xl mx-auto min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] mb-10 sm:mb-14">
              <div className="relative h-full w-full rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] p-5 sm:p-6 transition-all duration-300 group-hover:shadow-[0_12px_50px_-10px_rgba(0,113,227,0.18)] group-hover:border-accent/30">
                <div className="flex flex-col items-center text-center">
                  <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                    <img src={partImage} alt="Harmonic Drive Gearbox" className="w-full h-full object-contain p-3" />
                  </div>
                  <span className="mt-4 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent/10 text-accent">Gearboxes &amp; Speed Reducers</span>
                  <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-brand leading-snug">Harmonic Drive Gearbox</h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 font-mono tracking-tight">HD-CSD-25-160-2A-GR</p>
                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold text-brand">{demoPart.vendors.length} vendors</span> &middot;{" "}
                    <span className="font-semibold text-accent">${minPrice.toLocaleString()}</span>
                    {" – "}${maxPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 rounded-full bg-accent/8 blur-3xl lg:block" aria-hidden />
              <div className="pointer-events-none absolute -bottom-8 -left-8 hidden h-36 w-36 rounded-full bg-blue-200/20 blur-3xl lg:block" aria-hidden />
            </div>

            {/* Header */}
            <div className="text-center mb-10 sm:mb-14">
              <p className="sr font-display text-accent font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Global vendor intelligence
              </p>
              <h2 className="sr font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand leading-tight">
                {demoPart.vendors.length} vendors. 4 regions.<br />
                <span className="text-accent">One clear choice.</span>
              </h2>
              <p className="sr mt-5 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                Research suppliers by region, compare pricing across ${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}, and let AI surface the best decision.
              </p>
            </div>

            {/* Region filter tabs */}
            <div className="sr flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
              {regions.map((r) => {
                const isActive = r === activeRegion;
                const count = r === "All Regions" ? demoPart.vendors.length : regionCounts[r] || 0;
                return (
                  <button
                    key={r}
                    onClick={() => setActiveRegion(r)}
                    className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-brand text-white shadow-lg shadow-black/10"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    {r === "Asia Pacific" && <span className="text-xs">🌏</span>}
                    {r === "Europe" && <span className="text-xs">🌍</span>}
                    {r === "Americas" && <span className="text-xs">🌎</span>}
                    {r === "Middle East" && <span className="text-xs">🌐</span>}
                    {r}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Vendor table/grid */}
            <div className="sr rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden mb-10 sm:mb-14">
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">
                <span>Vendor</span>
                <span>Price</span>
                <span>Lead time</span>
                <span>MOQ</span>
                <span>Reliability</span>
                <span className="text-right">Score</span>
              </div>

              {/* Vendor rows */}
              <div className="divide-y divide-slate-100">
                {filteredVendors.map((v, i) => {
                  const isBest = v.name === bestVendor.name;
                  const score = Math.round(
                    v.reliability * 0.4 +
                    (1 - (v.price - minPrice) / (maxPrice - minPrice)) * 100 * 0.35 +
                    (1 - v.moq / 100) * 100 * 0.25,
                  );
                  return (
                    <div
                      key={v.name}
                      className={`group grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-2 sm:gap-4 items-center px-5 py-4 transition-colors duration-200 ${
                        isBest ? "bg-accent/3" : "hover:bg-slate-50/80"
                      }`}
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      {/* Vendor identity */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl leading-none">{v.flag}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-display font-bold text-brand text-sm truncate">{v.name}</p>
                            {isBest && (
                              <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold bg-accent text-white uppercase tracking-wider">
                                AI Top Pick
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[11px] text-slate-400">{v.country}</p>
                            <span className="text-slate-300">·</span>
                            <p className="text-[11px] text-slate-400">{v.region}</p>
                            <span className="text-slate-300">·</span>
                            <p className="text-[10px] text-slate-400 font-mono">{v.cert}</p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile labels + Desktop values */}
                      <div className="sm:contents grid grid-cols-4 gap-2 mt-1 sm:mt-0">
                        <div>
                          <p className="sm:hidden text-[9px] text-slate-400 uppercase tracking-wider">Price</p>
                          <p className="font-display text-base sm:text-lg font-bold text-brand tabular-nums">${v.price.toLocaleString()}</p>
                          {/* Relative price bar */}
                          <div className="mt-1 h-1 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isBest ? "bg-accent" : "bg-slate-300"}`}
                              style={{ width: `${(v.price / maxPrice) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="sm:hidden text-[9px] text-slate-400 uppercase tracking-wider">Lead</p>
                          <p className="font-display text-sm font-semibold text-brand">{v.leadTime}</p>
                        </div>
                        <div>
                          <p className="sm:hidden text-[9px] text-slate-400 uppercase tracking-wider">MOQ</p>
                          <p className="font-display text-base sm:text-lg font-bold text-brand tabular-nums">{v.moq}</p>
                        </div>
                        <div>
                          <p className="sm:hidden text-[9px] text-slate-400 uppercase tracking-wider">Reliability</p>
                          <p className={`font-display text-base sm:text-lg font-bold tabular-nums ${
                            v.reliability >= 97 ? "text-green-600" : v.reliability >= 93 ? "text-emerald-600" : v.reliability >= 89 ? "text-yellow-600" : "text-orange-500"
                          }`}>{v.reliability}%</p>
                        </div>
                      </div>

                      {/* AI composite score */}
                      <div className="hidden sm:flex items-center justify-end gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2"
                          style={{
                            borderColor: score >= 85 ? "#2997ff" : score >= 70 ? "#34d399" : "#94a3b8",
                            color: score >= 85 ? "#2997ff" : score >= 70 ? "#059669" : "#64748b",
                            background: score >= 85 ? "rgba(41,151,255,0.06)" : "transparent",
                          }}
                        >{score}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decision Intelligence panel */}
            <div className="sr grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Left — Decision funnel */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base font-bold text-brand">How we narrow it down</h3>
                </div>

                <div className="space-y-3">
                  {[
                    { step: 1, label: "Global scan", desc: `${demoPart.vendors.length} vendors across 4 regions identified`, vendors: demoPart.vendors.length, color: "bg-slate-200" },
                    { step: 2, label: "Reliability filter", desc: "Removed vendors below 90% reliability", vendors: demoPart.vendors.filter(v => v.reliability >= 90).length, color: "bg-yellow-400" },
                    { step: 3, label: "Lead time check", desc: "Prioritized < 6 week delivery", vendors: demoPart.vendors.filter(v => v.reliability >= 90 && !v.leadTime.includes("7") && !v.leadTime.includes("8") && !v.leadTime.includes("9")).length, color: "bg-emerald-400" },
                    { step: 4, label: "AI recommendation", desc: `${bestVendor.name} — best balance of all factors`, vendors: 1, color: "bg-accent" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center text-[10px] font-bold text-white`}>{s.step}</div>
                        {s.step < 4 && <div className="w-px h-5 bg-slate-200" />}
                      </div>
                      <div className="pt-0.5">
                        <p className="font-display text-sm font-bold text-brand">{s.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                      </div>
                      <div className="ml-auto shrink-0 pt-1">
                        <span className="text-xs font-bold text-slate-400 tabular-nums">{s.vendors}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block bg-slate-100" />

              {/* Right — AI pick summary */}
              <div className="p-6 sm:p-8 border-t lg:border-t-0 border-slate-100">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base font-bold text-brand">AI-powered decision</h3>
                </div>

                <div className="rounded-xl bg-accent/5 border border-accent/15 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{bestVendor.flag}</span>
                    <div>
                      <p className="font-display font-bold text-brand text-lg">{bestVendor.name}</p>
                      <p className="text-xs text-slate-500">{bestVendor.country} · {bestVendor.region}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center rounded-lg bg-white p-2.5 border border-slate-100">
                      <p className="font-display text-lg font-bold text-brand tabular-nums">${bestVendor.price.toLocaleString()}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Price</p>
                    </div>
                    <div className="text-center rounded-lg bg-white p-2.5 border border-slate-100">
                      <p className="font-display text-lg font-bold text-green-600 tabular-nums">{bestVendor.reliability}%</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Reliability</p>
                    </div>
                    <div className="text-center rounded-lg bg-white p-2.5 border border-slate-100">
                      <p className="font-display text-lg font-bold text-brand">{bestVendor.leadTime}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Lead time</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Highest reliability score across all 10 vendors",
                      "Low MOQ of 5 units reduces inventory risk",
                      "Fastest lead time among top-tier suppliers",
                      `${bestVendor.cert} certified for quality assurance`,
                    ].map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-slate-600 leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-slate-400 text-center">
                  Weighted by reliability (40%), price (35%), and MOQ flexibility (25%)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Act 4: Key Numbers — Decision Impact ── */}
        <div className="bg-[#0a0a0a] text-white py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="sr font-display text-accent-light font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Decision impact
            </p>
            <h2 className="sr font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-16 sm:mb-20">
              From hours of research<br />
              <span className="text-accent-light">to instant clarity.</span>
            </h2>
            <div className="sr-stagger grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {keyNumbers.map((item, i) => (
                <div key={item.label} className="sr group rounded-2xl bg-white/4 border border-white/8 p-6 sm:p-8 transition-all duration-300 hover:border-accent-light/30 hover:bg-white/7" style={{ "--sr-i": i } as React.CSSProperties}>
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-accent-light uppercase tracking-wider">{item.label}</p>
                  <p className="mt-1 text-xs text-[#86868b]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
