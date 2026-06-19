import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import PretextHeroReserve from "../../components/enterprise/PretextHeroReserve";
import SolutionsProductShowcase from "../../components/SolutionsProductShowcase";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import Seo from "../../components/Seo";
import partImage from "../../assets/images/download (1).jpg";

const HERO_HEADLINE_TEXT =
  "Find, analyze, and choose the best supplier and pricing for any part";

const products = [
  {
    eyebrow: "01 / Research",
    title: "Part research engine",
    description:
      "Enter a part number or query and automatically gather data from multiple sources—cleaned, matched, and ready to compare.",
    to: "#product-demo",
    icon: "hub",
    image: partImage,
    metric: "12+ source types",
  },
  {
    eyebrow: "02 / Compare",
    title: "Vendor comparison workspace",
    description:
      "Compare suppliers side by side on price, availability, lead time, and reliability so every award is transparent and defensible.",
    to: "#product-demo",
    icon: "analytics",
    image:
      "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1200&q=85",
    metric: "Same-frame quotes",
  },
  {
    eyebrow: "03 / Decide",
    title: "Recommendation intelligence",
    description:
      "Go beyond lists: get ranked options and explainable AI insights for the best sourcing decision on each part.",
    to: "#product-demo",
    icon: "ai",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    metric: "Explainable ranking",
  },
  {
    eyebrow: "04 / Connect",
    title: "Integrations & data layer",
    description:
      "Connect your stack—ERP, supplier feeds, and internal systems—so research and decisions stay in one place.",
    to: "#capabilities",
    icon: "api",
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=85",
    metric: "ERP-ready handoff",
  },
];

const heroStats = [
  { value: "3 min", label: "to a comparable supplier shortlist" },
  { value: "4 steps", label: "from part scope to PO-ready award" },
  { value: "AI", label: "ranked recommendations with rationale" },
];

const heroSignals = [
  { label: "OEM cross match", value: "98%", tone: "bg-accent" },
  { label: "Landed cost confidence", value: "92%", tone: "bg-emerald-500" },
  { label: "Lead-time coverage", value: "86%", tone: "bg-cyan-400" },
];

const solutionHighlights = [
  {
    title: "Research",
    text: "Find OEM, aftermarket, and alternate supplier options for the same part.",
  },
  {
    title: "Compare",
    text: "Review price, MOQ, lead time, reliability, and landed cost in one view.",
  },
  {
    title: "Decide",
    text: "Use ranked recommendations and clear rationale to move faster.",
  },
];

const productCapabilities = [
  "Part search",
  "Vendor comparison",
  "Landed cost",
  "AI recommendations",
  "Supplier signals",
  "Workflow handoff",
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
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function ProductsPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <Seo
        title="Products — Part Research, Vendor Comparison & Awards | Partsource"
        description="Find, analyze, and choose the best supplier and pricing for any part. Multi-source OEM and aftermarket research, fair vendor comparison, and explainable AI recommendations."
        canonicalPath="/products"
      />
      <section
        className="relative overflow-hidden border-b border-white/10 min-h-[88vh] md:min-h-[90vh] lg:min-h-[92vh] flex items-center bg-slate-950"
        aria-labelledby="products-hero-heading"
      >
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage: [
                "radial-gradient(ellipse 65% 52% at 78% 20%, rgba(0,113,227,0.34), transparent 58%)",
                "radial-gradient(ellipse 52% 44% at 12% 86%, rgba(20,184,166,0.16), transparent 55%)",
                "linear-gradient(135deg, #020617 0%, #07111f 42%, #0b1730 100%)",
              ].join(", "),
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]" />
          <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-20 md:py-24 lg:py-28">
          <div className="sr-stagger max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)] gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="text-center lg:text-left">
              <p
                id="products-hero-kicker"
                className="sr inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 font-display text-accent-light font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] backdrop-blur"
                style={{ "--sr-i": 0 } as CSSProperties}
              >
                Products & solutions
              </p>
              <PretextHeroReserve text={HERO_HEADLINE_TEXT.replace("\n", " ")} className="mt-6 max-w-5xl mx-auto lg:mx-0">
                <h1
                  id="products-hero-heading"
                  className="sr font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.55rem] font-bold text-white leading-[1.02] tracking-tight text-balance"
                  style={{ "--sr-i": 1 } as CSSProperties}
                >
                  Find, analyze, and choose the best supplier and pricing for
                  <span className="block text-accent-light">any part.</span>
                </h1>
              </PretextHeroReserve>
              <p
                className="sr mt-6 text-base sm:text-lg md:text-xl text-white/76 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-pretty"
                style={{ "--sr-i": 2 } as CSSProperties}
              >
                An AI-powered research and comparison platform for manufacturing teams—turning complex supplier research into instant, data-driven decisions.
              </p>
              <div
                className="sr mt-10 flex flex-col sm:flex-row flex-wrap items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4"
                style={{ "--sr-i": 3 } as CSSProperties}
              >
                <a
                  href={CALENDLY_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-brand bg-white hover:bg-slate-100 transition shadow-lg shadow-black/30 min-h-[48px]"
                >
                  Request a demo <ChevronRightIcon className="w-4 h-4" />
                </a>
                <a
                  href="#product-demo"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/5 backdrop-blur-md hover:bg-white/10 transition min-h-[48px]"
                >
                  View product flow
                </a>
              </div>
              <div
                className="sr mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto lg:mx-0"
                style={{ "--sr-i": 4 } as CSSProperties}
              >
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/6 p-4 text-left backdrop-blur">
                    <p className="font-display text-2xl font-bold text-white tabular-nums">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium leading-snug text-white/58">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sr relative" style={{ "--sr-i": 5 } as CSSProperties}>
              <div className="absolute -inset-5 rounded-[2.25rem] bg-accent/20 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-white/8 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <div className="rounded-[1.45rem] border border-white/10 bg-slate-950/90 overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/4 px-4 py-3">
                    <div className="flex gap-1.5" aria-hidden>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="ml-2 min-w-0 flex-1 rounded-full border border-white/8 bg-black/25 px-3 py-1.5 font-mono text-[11px] text-white/45 truncate">
                      products.partsource.io/HD-CSD-25-160-2A-GR
                    </div>
                  </div>
                  <div className="grid gap-4 p-4 sm:p-5">
                    <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-light">Live part profile</p>
                          <h2 className="mt-3 font-display text-2xl font-bold text-white">HD-CSD-25-160-2A-GR</h2>
                          <p className="mt-2 text-sm text-white/58">Harmonic drive gearbox assembly · 4 supplier matches</p>
                        </div>
                        <span className="w-fit rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-300/20">
                          Award ready
                        </span>
                      </div>
                      <div className="mt-6 grid gap-3">
                        {heroSignals.map((signal) => (
                          <div key={signal.label}>
                            <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                              <span className="font-medium text-white/68">{signal.label}</span>
                              <span className="font-bold text-white">{signal.value}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                              <div className={`h-full rounded-full ${signal.tone}`} style={{ width: signal.value }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[1fr_0.72fr] gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">Supplier comparison</p>
                        <div className="mt-4 space-y-3">
                          {["MotionWorks", "Atlas Industrial", "OEM Direct"].map((supplier, i) => (
                            <div key={supplier} className="rounded-2xl bg-white/6 p-3">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-white">{supplier}</span>
                                <span className="font-mono text-xs text-accent-light">{94 - i * 5}/100</span>
                              </div>
                              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-white/52">
                                <span>${(1280 + i * 145).toLocaleString()}</span>
                                <span>{8 + i * 3} days</span>
                                <span>{i === 0 ? "Low risk" : "Med risk"}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-3xl border border-accent-light/20 bg-accent/14 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">AI recommendation</p>
                        <p className="mt-4 font-display text-3xl font-bold text-white">MotionWorks</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/64">
                          Best balance of landed cost, verified stock, and lead-time reliability.
                        </p>
                        <div className="mt-6 rounded-2xl bg-white/10 p-3">
                          <p className="text-xs text-white/48">Estimated savings</p>
                          <p className="mt-1 font-display text-2xl font-bold text-emerald-300">$18.4K</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product cards — image-led */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#f8fafc]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(0,113,227,0.14),transparent_65%)]"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="sr mb-10 md:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.22em]">
                Product modules
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand tracking-tight text-balance">
                Every supplier decision starts from the same clean workspace.
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-slate-600 lg:text-right">
              Move from part discovery to vendor award with a connected set of tools built for manufacturing sourcing teams.
            </p>
          </div>
          <div className="sr-stagger grid md:grid-cols-2 gap-5 lg:gap-6">
            {products.map((p, i) => (
              <Link
                key={p.title}
                to={p.to}
                className="sr group relative flex min-h-[440px] flex-col overflow-hidden rounded-4xl bg-white ring-1 ring-slate-200/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/45 card-hover scroll-mt-24"
                style={{ "--sr-i": i } as CSSProperties}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent via-cyan-400 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={p.image}
                    alt=""
                    className={`absolute inset-0 w-full h-full transition duration-700 group-hover:scale-105 ${
                      p.image === partImage ? "object-contain bg-slate-100 p-8 md:p-10" : "object-cover"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/72 via-slate-950/10 to-transparent" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand shadow-sm ring-1 ring-black/5 backdrop-blur">
                      {p.eyebrow}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-accent shadow-md ring-1 ring-black/5">
                      {p.icon === "hub" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v6H4zM4 14h7v6H4zM13 14h7v6h-7z" />
                        </svg>
                      )}
                      {p.icon === "analytics" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7M4 20h16" />
                        </svg>
                      )}
                      {p.icon === "ai" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 3v2.25M14.25 3v2.25M6 8.25h12M6.75 20.25h10.5A2.25 2.25 0 0019.5 18V9.75A2.25 2.25 0 0017.25 7.5H6.75A2.25 2.25 0 004.5 9.75V18A2.25 2.25 0 006.75 20.25z"
                          />
                        </svg>
                      )}
                      {p.icon === "api" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8M8 17h5M4 4h16v16H4z" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <span className="absolute bottom-5 left-5 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10 backdrop-blur">
                    {p.metric}
                  </span>
                </div>
                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-brand tracking-tight">{p.title}</h2>
                  <p className="mt-4 text-slate-600 leading-relaxed flex-1">{p.description}</p>
                  <span className="mt-7 inline-flex w-fit items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-accent font-semibold text-sm transition group-hover:bg-accent group-hover:text-white">
                    Learn more
                    <ChevronRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive product UI (from former Solutions page) */}
      <section id="product-demo" className="scroll-mt-24 py-14 md:py-20 bg-surface border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 md:mb-16 sr">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">What we build</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand mt-2 leading-tight">
              Compare, calculate, and move to purchase—on one platform
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              The interactive mock follows one demo part:{" "}
              <span className="font-mono font-semibold text-brand">HD-CSD-25-160-2A-GR</span>{" "}
              <span className="text-slate-500">(harmonic drive gearbox assembly).</span> Each step reuses the same part number and live selections—no reset between panels.
            </p>
            <ol className="mt-5 space-y-2.5 text-sm sm:text-base text-slate-600 list-decimal pl-5 max-w-3xl marker:text-accent marker:font-semibold">
              <li>
                <strong className="text-brand font-semibold">Part scope</strong> — plant, category, and scan context (Step 1).
              </li>
              <li>
                <strong className="text-brand font-semibold">Compare</strong> — regional filters and the full quote matrix with AI score (Step 2).
              </li>
              <li>
                <strong className="text-brand font-semibold">Landed cost</strong> — supplier, quantity, duty, freight; all amounts USD (Step 3).
              </li>
              <li>
                <strong className="text-brand font-semibold">Purchase order</strong> — line items and totals copied from Step 3 (Step 4).
              </li>
            </ol>
          </div>

          <div className="sr-scale">
            <SolutionsProductShowcase />
          </div>

          <p className="sr mt-14 md:mt-16 text-center text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Sliders and filters above are illustrative; in production, Partsource connects to your supplier data, plants, and approval rules—the layout and labels stay the same.
          </p>
        </div>
      </section>

      {/* Solution coverage + capabilities */}
      <section id="solutions-coverage" className="scroll-mt-20 relative overflow-hidden bg-white py-16 md:py-24 border-y border-slate-100">
        <span id="capabilities" className="absolute -top-20" aria-hidden />
        <div
          className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(0,113,227,0.12),transparent_60%)]"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="sr max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.22em]">Platform flow</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand tracking-tight">
              One workflow. Three clear steps.
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Everything else supports the same goal: get from part lookup to a confident supplier decision.
            </p>
          </div>

          <div className="sr-stagger grid md:grid-cols-3 gap-4 md:gap-5">
            {solutionHighlights.map((item, i) => (
              <article
                key={item.title}
                className="sr rounded-3xl bg-slate-50 border border-slate-200/80 p-6 md:p-8 shadow-sm"
                style={{ "--sr-i": i } as CSSProperties}
              >
                <span className="font-display text-sm font-bold text-accent tabular-nums">0{i + 1}</span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-brand">{item.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="sr mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {productCapabilities.map((cap) => (
              <span
                key={cap}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="sr font-display text-2xl font-bold text-brand">See the platform in action</h2>
          <p className="sr mt-2 text-slate-600 max-w-lg mx-auto">
            Request a personalized walkthrough or talk to us about tailoring workflows to your categories and plants.
          </p>
          <div className="sr mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <a
              href="#product-demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light min-h-[44px]"
            >
              Interactive demo
              <ChevronRightIcon className="w-4 h-4" aria-hidden />
            </a>
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-brand border-2 border-slate-200 hover:border-accent hover:bg-slate-50 min-h-[44px]"
            >
              Request a demo
            </a>
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 min-h-[44px]"
            >
              Contact sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
