import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
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
    to: "/products#product-demo",
    image:
      "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1400&q=85",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7m9-8l2 2-5 5H8v-2l5-5z" />
      </svg>
    ),
  },
  {
    title: "Fair vendor comparison",
    description: "Unit price, landed cost, MOQ, and lead time—same frame, apples-to-apples.",
    to: "/products#product-demo",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z" />
      </svg>
    ),
  },
  {
    title: "Intelligent recommendations",
    description: "Ranked awards with rationale—so procurement and the plant agree faster.",
    to: "/products#solutions-coverage",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const audiences = [
  {
    kicker: "OEMs",
    title: "Data, trends, and research before you set the price",
    body: "OEM teams use Partsource to see supplier coverage, pricing movement, and part research in one place—so quotes and awards are evidence, not a lagging spreadsheet.",
    points: [
      "Pricing trends across quotes and lanes",
      "Supplier coverage and performance",
      "Part research before the RFQ goes out",
    ],
    to: "/oem",
  },
  {
    kicker: "Suppliers & procurement",
    title: "The right part, the alternate, and the OEM who can deliver",
    body: "Procurement and supplier teams use Partsource to match the part on the first search, pull OEM crosses and aftermarket alternates, then compare and award with a trail.",
    points: [
      "Find the right part on the first search",
      "OEM crosses and aftermarket alternates",
      "Compare, award, and hand off to the plant",
    ],
    to: "/suppliers",
  },
] as const;

const trustStripTiles: { label: string; image: string }[] = [
  {
    label: "Right unit & landed price",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Faster logistics signals",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "OEM & aftermarket coverage",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Multi-plant sourcing",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=900&q=80",
  },
];

const howItWorks = [
  { step: 1, title: "Part in", text: "Part number, OEM cross, or aftermarket query." },
  { step: 2, title: "Research", text: "Aggregated quotes, MOQ, lead time, freight assumptions." },
  { step: 3, title: "Compare", text: "One matrix—price, logistics, reliability." },
  { step: 4, title: "Award", text: "Explainable pick + audit trail." },
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
        description="Partsource is the bridge between OEMs and suppliers. OEMs get pricing data, trends, and research. Procurement and supplier teams find the right part, alternates, and OEM to fulfill."
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />
      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden border-b border-slate-200/60 min-h-screen flex items-start bg-linear-to-br from-slate-950 via-[#0a1020] to-slate-950"
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
            <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] gap-10 lg:gap-12 xl:gap-14 items-start">
              <div className="flex flex-col text-center lg:text-left">
                <p
                  className="sr font-display text-accent-light font-semibold text-sm sm:text-base uppercase tracking-[0.22em] w-full"
                  style={{ "--sr-i": 0 } as CSSProperties}
                >
                  The OEM–supplier bridge
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
                  Upload a BOM, research leads, compare suppliers, draft an RFQ, and pull reports — the workspace between OEMs and the suppliers who fulfill.
                </p>
                <div
                  className="sr mt-10 flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 sm:gap-4 w-full"
                  style={{ "--sr-i": 3 } as CSSProperties}
                >
                  <a
                    href="#workspace-demo"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-lg shadow-black/40 transition hover:bg-slate-100 min-h-[48px] w-full sm:w-auto"
                  >
                    Try the workspace
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
              <figure id="workspace-demo" className="sr w-full max-w-xl mx-auto lg:max-w-none lg:mx-0" style={{ "--sr-i": 4 } as CSSProperties}>
                <HeroProductMockup />
                <figcaption className="mt-3 text-center lg:text-left text-[11px] sm:text-xs text-white/45 tracking-wide">
                  Upload · Research · Compare · Create RFQ · Reports
                </figcaption>
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
            {trustStripTiles.map(({ label, image }, i) => (
                <div
                  key={label}
                  className="sr relative h-28 md:h-32 rounded-xl overflow-hidden ring-1 ring-slate-200/80 group"
                  style={{ "--sr-i": i } as CSSProperties}
                >
                  <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
                  <p className="absolute bottom-3 left-3 right-3 font-display text-xs sm:text-sm font-semibold text-white leading-tight">
                    {label}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge — OEM ↔ supplier & procurement */}
      <section id="who-we-serve" className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100" aria-labelledby="bridge-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="sr font-display text-accent font-semibold text-sm uppercase tracking-[0.2em]">Who we serve</p>
            <h2 id="bridge-heading" className="sr font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand mt-3 tracking-tight text-balance">
              The bridge between OEM and supplier.
            </h2>
            <p className="sr mt-4 text-slate-600 text-base sm:text-lg leading-relaxed text-pretty">
              One workspace. Two sides of the same award—pricing intelligence for OEMs, part and alternate finding for procurement.
            </p>
          </div>

          <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-stretch">
            {audiences.map((side, i) => (
              <article
                key={side.kicker}
                className={`sr relative flex flex-col rounded-3xl border p-7 sm:p-9 ${
                  i === 0
                    ? "bg-slate-950 text-white border-white/10 lg:order-1"
                    : "bg-[#fafafa] text-brand border-slate-200/80 lg:mt-8 lg:order-3"
                }`}
                style={{ "--sr-i": i } as CSSProperties}
              >
                <p className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${i === 0 ? "text-accent-light" : "text-accent"}`}>
                  {side.kicker}
                </p>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-balance">
                  {side.title}
                </h3>
                <p className={`mt-4 text-sm sm:text-base leading-relaxed ${i === 0 ? "text-white/70" : "text-slate-600"}`}>
                  {side.body}
                </p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {side.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-accent-light" : "bg-accent"}`} aria-hidden />
                      <span className={i === 0 ? "text-white/85" : "text-slate-700"}>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={side.to}
                  className={`mt-8 inline-flex w-fit items-center gap-1 text-sm font-semibold ${
                    i === 0 ? "text-accent-light hover:text-white" : "text-accent hover:text-brand"
                  }`}
                >
                  Learn more
                  <ChevronRightIcon className="w-4 h-4" aria-hidden />
                </Link>
              </article>
            ))}

            <div className="hidden lg:order-2 lg:flex flex-col items-center justify-center px-5 z-10" aria-hidden>
              <div className="w-px flex-1 bg-linear-to-b from-transparent via-slate-200 to-slate-200" />
              <div className="my-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/80">
                <img src="/logo.svg" alt="" width={36} height={36} className="h-9 w-9 rounded-lg" />
              </div>
              <div className="w-px flex-1 bg-linear-to-b from-slate-200 via-slate-200 to-transparent" />
            </div>
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

      {/* Decision signals — speed + signal mix */}
      <section className="py-14 md:py-20 bg-[#fafafa] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-12">
            <p className="sr font-display text-accent font-semibold text-sm uppercase tracking-[0.2em]">Decision signals</p>
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand mt-3 text-balance">
              Decide faster with every signal in one view
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
            {/* Speed comparison */}
            <div
              className="sr rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]"
              style={{ "--sr-i": 0 } as CSSProperties}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-brand">Time to compare</p>
                  <p className="mt-1 text-sm text-slate-500">From part inquiry to a confident shortlist</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">3× faster</span>
              </div>

              <div className="mt-8 flex items-baseline gap-3">
                <p className="font-display text-5xl sm:text-6xl font-bold text-brand tabular-nums leading-none">6</p>
                <p className="text-lg font-medium text-slate-400">days</p>
              </div>
              <p className="mt-2 text-sm font-medium text-accent">With Partsource</p>

              <p className="mt-6 text-sm text-slate-500">
                Manual research averages{" "}
                <span className="font-semibold text-slate-400 line-through decoration-slate-300">18 days</span>
              </p>

              <div className="mt-8 space-y-5">
                {timeToInsightData.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="text-sm font-semibold text-brand tabular-nums">{item.value} days</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.label.includes("Partsource") ? "bg-accent" : "bg-slate-300"
                        }`}
                        style={{ width: `${(item.value / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal weights */}
            <div
              className="sr rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]"
              style={{ "--sr-i": 1 } as CSSProperties}
            >
              <div>
                <p className="text-sm font-semibold text-brand">What we weigh</p>
                <p className="mt-1 text-sm text-slate-500">Price, logistics, and risk—balanced for each award</p>
              </div>

              <ul className="mt-8 space-y-4">
                {responseVolumeData.map((item, i) => (
                  <li key={item.label} className="flex items-center gap-4">
                    <span className="w-6 text-xs font-bold text-slate-300 tabular-nums">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-medium text-slate-700 truncate">{item.label}</span>
                        <span className="text-sm font-semibold text-brand tabular-nums shrink-0">{item.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent/80"
                          style={{ width: `${item.value}%`, opacity: 1 - i * 0.12 }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
                Illustrative mix — tuned per category and plant rules
              </p>
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

      {/* Features — Apple-style product bands */}
      <section className="section-alt relative overflow-hidden py-20 md:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(41,151,255,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(0,113,227,0.08), transparent 50%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
            <h2 className="sr font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight text-balance">
              What Partsource does.
            </h2>
            <p className="sr mt-5 text-lg sm:text-xl text-white/70 font-normal leading-relaxed text-pretty">
              Research, compare, and decide—on one platform.
            </p>
          </header>

          <div className="flex flex-col gap-5 md:gap-6">
            {features.map((f, i) => {
              const imageFirst = i % 2 === 1;
              return (
                <article
                  key={f.title}
                  className="sr group relative overflow-hidden rounded-[28px] bg-brand ring-1 ring-white/8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65)]"
                  style={{ "--sr-i": i } as CSSProperties}
                >
                  <div className="grid md:grid-cols-2 md:min-h-[340px] lg:min-h-[380px]">
                    <div
                      className={`relative flex flex-col justify-center px-8 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 ${
                        imageFirst ? "md:order-2" : ""
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 tabular-nums">
                        0{i + 1}
                      </p>
                      <div className="mt-5 inline-flex w-11 h-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                        {f.icon}
                      </div>
                      <h3 className="mt-6 font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-[1.12] text-balance">
                        {f.title}
                      </h3>
                      <p className="mt-4 text-base sm:text-lg text-white/65 leading-relaxed max-w-md text-pretty">
                        {f.description}
                      </p>
                      <Link
                        to={f.to}
                        className="mt-7 inline-flex items-center gap-1 text-[17px] font-medium text-accent hover:underline underline-offset-4 w-fit"
                      >
                        Learn more
                        <ChevronRightIcon className="w-4 h-4" aria-hidden />
                      </Link>
                    </div>

                    <div className={`relative min-h-[220px] sm:min-h-[260px] md:min-h-0 overflow-hidden ${imageFirst ? "md:order-1" : ""}`}>
                      <img
                        src={f.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div
                        className={`absolute inset-0 ${
                          imageFirst
                            ? "bg-linear-to-l from-brand from-0% via-brand/25 via-30% to-transparent to-75%"
                            : "bg-linear-to-r from-brand from-0% via-brand/25 via-30% to-transparent to-75%"
                        }`}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
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
              Book a walkthrough—see how OEMs, suppliers, and procurement share one part-to-award flow.
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
