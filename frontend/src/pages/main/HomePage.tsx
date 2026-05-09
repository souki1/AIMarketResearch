import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import BarChart from "../../components/BarChart";
import HeroProductMockup from "../../components/HeroProductMockup";
import PartShowcase from "../../components/PartShowcase";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import { SITE_CANONICAL_ORIGIN } from "../../constants/site";
import Seo from "../../components/Seo";

const homeJsonLd: Record<string, unknown>[] = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Partsource",
    url: SITE_CANONICAL_ORIGIN,
    logo: `${SITE_CANONICAL_ORIGIN}/logo.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Partsource",
    url: SITE_CANONICAL_ORIGIN,
  },
];

const stats = [
  { value: "2,400+", label: "Active supplier networks" },
  { value: "31%", label: "Average sourcing cycle reduction" },
  { value: "$420M", label: "Annual spend analyzed" },
  { value: "89%", label: "Decision confidence uplift" },
];

const features = [
  {
    title: "Multi-source part research",
    description: "OEM numbers, alternates, and aftermarket crosses—normalized in one search.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7m9-8l2 2-5 5H8v-2l5-5z" />
      </svg>
    ),
  },
  {
    title: "Fair vendor comparison",
    description: "Unit price, landed cost, MOQ, and lead time—same frame, apples-to-apples.",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z" />
      </svg>
    ),
  },
  {
    title: "Intelligent recommendations",
    description: "Ranked awards with rationale—so procurement and the plant agree faster.",
    image:
      "https://images.unsplash.com/photo-1566576919226-cbbf78296392?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const industryImages: Record<string, string> = {
  "Direct materials sourcing":
    "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1100&q=80",
  "MRO procurement":
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=80",
  "Supplier quality management":
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1100&q=80",
  "Production continuity planning":
    "https://images.unsplash.com/photo-1578575436955-47349bb07281?auto=format&fit=crop&w=1100&q=80",
  "Plant-level category control":
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1100&q=80",
};

const logos = [
  "Right unit & landed price",
  "Faster logistics signals",
  "OEM & aftermarket coverage",
  "Multi-plant sourcing",
];

const howItWorks = [
  { step: 1, title: "Part in", text: "Part number, OEM cross, or aftermarket query." },
  { step: 2, title: "Research", text: "Aggregated quotes, MOQ, lead time, freight assumptions." },
  { step: 3, title: "Compare", text: "One matrix—price, logistics, reliability." },
  { step: 4, title: "Award", text: "Explainable pick + audit trail." },
];

const industries = [
  { name: "Direct materials sourcing", desc: "Production BOMs: best total cost of ownership, not sticker price alone." },
  { name: "MRO procurement", desc: "Keep lines running—availability and expedite paths in the same view." },
  { name: "Supplier quality management", desc: "Pair quality signals with cost and delivery before you award." },
  { name: "Production continuity planning", desc: "Dual-source and alternate parts before the shortage hits." },
  { name: "Plant-level category control", desc: "One policy, many sites—local constraints preserved." },
];

const timeToInsightData = [
  { label: "Manual supplier research", value: 18, sublabel: "Days from part inquiry to a confident vendor choice" },
  { label: "With Partsource", value: 6, sublabel: "Same workflow with automated research and recommendations" },
];

const responseVolumeData = [
  { label: "Supplier performance", value: 26 },
  { label: "Cost movement", value: 24 },
  { label: "Delivery reliability", value: 21 },
  { label: "Risk exposure", value: 17 },
  { label: "Sustainability metrics", value: 12 },
];

const aiImpactIcons = {
  faster: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  data: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  easier: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  confidence: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};
const aiImpactData = [
  { label: "Faster sourcing decisions", value: 88, iconKey: "faster" as const },
  { label: "More data-driven awards", value: 84, iconKey: "data" as const },
  { label: "Easier supplier collaboration", value: 79, iconKey: "easier" as const },
  { label: "Higher confidence in outcomes", value: 91, iconKey: "confidence" as const },
];

const useCaseTiles: { label: string; image: string }[] = [
  { label: "Aftermarket & OEM crosses", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80" },
  { label: "Landed cost vs unit price", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" },
  { label: "Lead time & freight lanes", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=900&q=80" },
  { label: "Alternates before stockouts", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80" },
];

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

/* ── Component ── */

export default function HomePage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <Seo
        title="Partsource — AI-Powered Part Sourcing & Supplier Comparison"
        description="AI-powered strategic sourcing and decision intelligence. Find, analyze, and choose the best suppliers and pricing for OEM and aftermarket parts."
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />
      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden border-b border-slate-200/60 min-h-screen flex items-center bg-linear-to-br from-slate-950 via-[#0a1020] to-slate-950"
        aria-labelledby="home-hero-heading"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 85% 55% at 75% 15%, rgba(0,113,227,0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(41,151,255,0.08), transparent 45%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,9,20,0.2),rgba(5,9,20,0.65))]" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-12 md:py-16 lg:py-20 shrink-0">
          <div className="sr-stagger max-w-7xl mx-auto flex flex-col gap-12 lg:gap-14">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 xl:gap-16 items-center">
              <div className="flex flex-col text-center lg:text-left">
                <p
                  className="sr font-display text-accent-light font-semibold text-sm sm:text-base uppercase tracking-[0.22em] w-full"
                  style={{ "--sr-i": 0 } as CSSProperties}
                >
                  OEM · aftermarket · manufacturing parts
                </p>
                <h1
                  id="home-hero-heading"
                  className="sr font-display text-4xl sm:text-5xl md:text-6xl lg:text-[2.75rem] xl:text-6xl font-bold text-white mt-5 w-full max-w-xl lg:max-w-none mx-auto lg:mx-0 leading-[1.05] tracking-tight text-balance"
                  style={{ "--sr-i": 1 } as CSSProperties}
                >
                  Research every part. Pay the right price. Ship on time.
                </h1>
                <p
                  className="sr mt-6 text-base sm:text-lg md:text-xl text-white/80 w-full max-w-xl lg:max-w-lg mx-auto lg:mx-0 leading-relaxed text-pretty"
                  style={{ "--sr-i": 2 } as CSSProperties}
                >
                  Cross OEM and aftermarket data, compare landed cost and logistics, then award with a clear audit trail.
                </p>
                <div
                  className="sr mt-10 flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 sm:gap-4 w-full"
                  style={{ "--sr-i": 3 } as CSSProperties}
                >
                  <a
                    href="#product-demo"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-lg shadow-black/40 transition hover:bg-slate-100 min-h-[48px] w-full sm:w-auto"
                  >
                    See an interactive demo
                    <ChevronRightIcon className="w-4 h-4 shrink-0" aria-hidden />
                  </a>
                  <a
                    href={CALENDLY_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10 min-h-[48px] w-full sm:w-auto"
                  >
                    Book a live walkthrough
                  </a>
                </div>
              </div>
              <figure className="sr w-full max-w-xl mx-auto lg:max-w-none lg:mx-0" style={{ "--sr-i": 4 } as CSSProperties}>
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/15 bg-slate-900/80 shadow-2xl shadow-black/60">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-800/95 border-b border-white/10">
                    <div className="flex gap-1.5 shrink-0" aria-hidden>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/90" />
                    </div>
                    <div className="flex-1 min-w-0 rounded-md bg-slate-950/90 px-3 py-1.5 text-[11px] sm:text-xs text-slate-400 font-mono truncate border border-white/5">
                      app.partsource.io/research
                    </div>
                  </div>
                  <HeroProductMockup />
                </div>
              </figure>
            </div>
            <div
              className="sr grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
              style={{ "--sr-i": 5 } as CSSProperties}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md text-center lg:text-left"
                >
                  <p className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">{s.value}</p>
                  <p className="mt-1 text-[11px] md:text-xs font-medium text-white/70 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Built for manufacturing — image strip */}
      <section className="relative bg-white py-10 md:py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 mb-6">
            Price · logistics · parts intelligence
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {logos.map((text, i) => {
              const imgs = [
                "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1566576919226-cbbf78296392?auto=format&fit=crop&w=900&q=80",
              ];
              return (
                <div
                  key={text}
                  className="sr relative h-28 md:h-32 rounded-xl overflow-hidden ring-1 ring-slate-200/80 group"
                  style={{ "--sr-i": i } as CSSProperties}
                >
                  <img src={imgs[i]} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
                  <p className="absolute bottom-3 left-3 right-3 font-display text-xs sm:text-sm font-semibold text-white leading-tight">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Part showcase — vendor intelligence + decision impact (below hero, trust, stats) */}
      <PartShowcase />

      {/* How it works */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">How it works</h2>
            <p className="sr mt-4 text-slate-600">Four steps from part lookup to award.</p>
          </div>
          <div className="sr-stagger grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="sr relative p-8 rounded-xl bg-white border border-slate-100 card-hover" style={{ "--sr-i": i } as CSSProperties}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent font-display font-bold text-lg">{item.step}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision signals — compact dual charts */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="sr font-display text-accent font-semibold text-sm uppercase tracking-wider">Signals</p>
            <h2 className="sr font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Faster decisions. Full signal mix.</h2>
            <p className="sr mt-3 text-sm text-slate-600">Time to decide vs manual · What the engine weighs (price, logistics, risk).</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="sr-scale p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-100">
              <BarChart data={timeToInsightData} title="Days to a confident comparison" description="Lower is better." valueSuffix=" days" maxValue={20} barColor="bg-accent" />
            </div>
            <div className="sr-scale p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-100">
              <BarChart data={responseVolumeData} title="Signal weights in awards" description="% contribution (illustrative)." valueSuffix="%" maxValue={35} />
            </div>
          </div>
        </div>
      </section>

      {/* AI impact stats */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="sr font-display text-2xl sm:text-3xl font-bold text-brand">Teams report stronger outcomes</h2>
            <p className="sr mt-2 text-sm text-slate-500">% agreeing improvement (illustrative benchmark).</p>
          </div>
          <div className="sr-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiImpactData.map((item, i) => (
              <div key={item.label} className="sr relative p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center overflow-hidden card-hover" style={{ "--sr-i": i } as CSSProperties}>
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-accent/15 text-accent">{aiImpactIcons[item.iconKey]}</div>
                <p className="font-display text-4xl sm:text-5xl font-bold text-accent tabular-nums">{item.value}%</p>
                <p className="mt-2 text-sm font-medium text-slate-700 leading-snug">{item.label}</p>
                <div className="mt-4 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries — image-led cards */}
      <section className="section-alt py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">Where it shows up</h2>
            <p className="sr mt-4 text-slate-600">Direct materials, MRO, quality, continuity—one workflow.</p>
          </div>
          <div className="sr-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {industries.map((ind, i) => (
              <div
                key={ind.name}
                className="sr group relative h-72 rounded-2xl overflow-hidden ring-1 ring-white/10 card-hover"
                style={{ "--sr-i": i } as CSSProperties}
              >
                <img
                  src={industryImages[ind.name]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/20" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-lg font-semibold text-white leading-snug">{ind.name}</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus tiles — image-led */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="sr font-display text-2xl sm:text-3xl font-bold text-brand">Built for price &amp; logistics</h2>
          </div>
          <div className="sr-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCaseTiles.map((uc, i) => (
              <div key={uc.label} className="sr group relative h-40 rounded-xl overflow-hidden ring-1 ring-slate-200/80 card-hover" style={{ "--sr-i": i } as CSSProperties}>
                <img src={uc.image} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-display text-sm font-semibold text-white">{uc.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — visual cards */}
      <section className="section-alt py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">What Partsource does</h2>
            <p className="sr mt-4 text-slate-600">Research, compare, and decide—on one platform.</p>
          </div>
          <div className="sr-stagger grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="sr group rounded-2xl overflow-hidden bg-white ring-1 ring-slate-200/80 shadow-sm card-hover flex flex-col"
                style={{ "--sr-i": i } as CSSProperties}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={f.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/95 text-accent shadow-md">
                    {f.icon}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-semibold text-brand">{f.title}</h3>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — image-backed */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=2000&q=80')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,113,227,0.35), transparent 55%)",
              "linear-gradient(120deg, rgba(5,9,20,0.92) 0%, rgba(8,15,30,0.85) 60%, rgba(0,40,90,0.75) 100%)",
            ].join(", "),
          }}
          aria-hidden
        />
        <div className="relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">Get started</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Ready to source smarter?
            </h2>
            <p className="mt-5 text-white/80 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
              Book a walkthrough—see OEM, aftermarket, and landed cost in one flow.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-brand bg-white hover:bg-slate-100 transition shadow-lg shadow-black/30 min-h-[48px]"
              >
                Request a demo
              </a>
              <Link
                to="/enterprise"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white border border-white/35 bg-white/5 backdrop-blur-md hover:bg-white/10 transition min-h-[48px]"
              >
                Enterprise solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
