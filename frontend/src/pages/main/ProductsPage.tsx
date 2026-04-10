import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import SimpleBarChart from "../../components/SimpleBarChart";
import BarChart from "../../components/BarChart";
import SolutionsProductShowcase from "../../components/SolutionsProductShowcase";
import { CALENDLY_DEMO_URL } from "../../constants/booking";

const products = [
  {
    title: "Part research engine",
    description:
      "Enter a part number or query and automatically gather data from multiple sources—cleaned, matched, and ready to compare.",
    to: "#product-demo",
    icon: "hub",
  },
  {
    title: "Vendor comparison workspace",
    description:
      "Compare suppliers side by side on price, availability, lead time, and reliability so every award is transparent and defensible.",
    to: "#product-demo",
    icon: "analytics",
  },
  {
    title: "Recommendation intelligence",
    description:
      "Go beyond lists: get ranked options and explainable AI insights for the best sourcing decision on each part.",
    to: "#product-demo",
    icon: "ai",
  },
  {
    title: "Integrations & data layer",
    description:
      "Connect your stack—ERP, supplier feeds, and internal systems—so research and decisions stay in one place.",
    to: "#capabilities",
    icon: "api",
  },
];

const solutions = [
  {
    title: "By manufacturing function",
    items: [
      { name: "Direct procurement", desc: "Source production-critical materials with AI-backed supplier recommendations" },
      { name: "MRO sourcing", desc: "Maintain part availability while optimizing maintenance and operations spend" },
      { name: "Supplier quality", desc: "Tie supplier quality metrics to sourcing decisions and plant performance" },
      { name: "Production planning", desc: "Align supplier lead times with manufacturing schedule requirements" },
      { name: "Factory governance", desc: "Standardize sourcing decision frameworks across multi-plant operations" },
    ],
  },
  {
    title: "By role",
    items: [
      { name: "CPO / Procurement leaders", desc: "Category strategy, governance, and savings visibility" },
      { name: "Category managers", desc: "Supplier benchmarking, bid analysis, and scenario planning" },
      { name: "Sourcing managers", desc: "RFQ optimization and award recommendation workflows" },
      { name: "Plant operations", desc: "Lead-time and supplier performance visibility for continuity" },
      { name: "Finance partners", desc: "Cost trend intelligence and forecasting support" },
    ],
  },
  {
    title: "By use case",
    items: [
      { name: "Supplier qualification", desc: "Automated fit scoring and shortlist recommendations" },
      { name: "RFQ intelligence", desc: "Bid comparison with explainable AI recommendations" },
      { name: "Risk management", desc: "Disruption and concentration risk monitoring with alerts" },
      { name: "Cost optimization", desc: "Should-cost insights and cost movement tracking" },
      { name: "Performance governance", desc: "OTIF, quality, and compliance trend visibility" },
    ],
  },
];

const productCapabilities = [
  "Part number and query-based research across multiple sources",
  "Normalized vendor data: price, MOQ, availability, and lead time",
  "Reliability and quality signals where available",
  "Side-by-side comparison views for sourcing teams",
  "AI-ranked recommendations with explainable rationale",
  "Workflow hooks for manufacturing and procurement teams",
];

const usageByWorkflow = [
  { label: "Supplier discovery", value: 93 },
  { label: "RFQ & bid management", value: 89 },
  { label: "Decision analysis", value: 91 },
  { label: "Award governance", value: 84 },
  { label: "Performance tracking", value: 90 },
];

const aiAdoptionData = [
  { label: "Insights only", value: 29, sublabel: "AI summaries for sourcing visibility" },
  { label: "Insights + recommendations", value: 49, sublabel: "Actionable recommendations added to analysis" },
  { label: "Autonomous decision support", value: 22, sublabel: "End-to-end decision intelligence workflows" },
];

const adoptionByRole = [
  { label: "Procurement", value: 36 },
  { label: "Category teams", value: 25 },
  { label: "Operations", value: 17 },
  { label: "Finance", value: 12 },
  { label: "Executive leadership", value: 10 },
];

const adoptionByUseCase = [
  { label: "Supplier qualification", value: 24 },
  { label: "RFQ optimization", value: 23 },
  { label: "Risk monitoring", value: 19 },
  { label: "Cost optimization", value: 17 },
  { label: "Performance governance", value: 17 },
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
      <section
        className="border-b border-slate-100 min-h-screen flex items-center"
        style={{
          /* Layers: accent glows on top, linear gradient base below */
          backgroundImage: [
            "radial-gradient(ellipse 110% 65% at 100% 0%, rgba(0, 113, 227, 0.14), transparent 52%)",
            "radial-gradient(ellipse 75% 55% at 0% 100%, rgba(59, 130, 246, 0.09), transparent 48%)",
            "linear-gradient(168deg, #eff6ff 0%, #f8fafc 18%, #f1f5f9 42%, #eef2ff 72%, #f8fafc 100%)",
          ].join(", "),
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-12 md:py-16 lg:py-20 shrink-0">
          <div className="sr-stagger w-full flex flex-col text-center">
            <p
              className="sr font-display text-accent font-semibold text-sm sm:text-base uppercase tracking-[0.18em] sm:tracking-[0.2em] w-full"
              style={{ "--sr-i": 0 } as CSSProperties}
            >
              Products &amp; solutions
            </p>
            <h1
              className="sr font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand mt-4 w-full max-w-none leading-tight text-balance"
              style={{ "--sr-i": 1 } as CSSProperties}
            >
              Strategic sourcing and intelligent workflows for every part
            </h1>
            <p
              className="sr mt-6 text-lg text-slate-600 w-full max-w-none leading-relaxed text-pretty"
              style={{ "--sr-i": 2 } as CSSProperties}
            >
              An AI-powered research and comparison platform for manufacturing teams: find suppliers, analyze pricing and availability, compare options with clarity, and get ranked recommendations—so
              strategic sourcing is data-driven, not guesswork.
            </p>
            <div
              className="sr mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
              style={{ "--sr-i": 3 } as CSSProperties}
            >
              <a
                href="#product-demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-light min-h-[44px] w-full sm:w-auto"
              >
                Interactive product demo
                <ChevronRightIcon className="w-4 h-4 shrink-0" aria-hidden />
              </a>
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white/90 px-6 py-3 text-sm font-semibold text-brand backdrop-blur-sm transition hover:border-accent hover:bg-white min-h-[44px] w-full sm:w-auto"
              >
                Book a live walkthrough
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="sr-stagger grid md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <Link
                key={p.title}
                to={p.to}
                className="sr block p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow card-hover scroll-mt-24"
                style={{ "--sr-i": i } as CSSProperties}
              >
                <span className="inline-flex w-11 h-11 rounded-lg items-center justify-center bg-accent/10 text-accent mb-4">
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
                <h2 className="font-display text-xl font-semibold text-brand">{p.title}</h2>
                <p className="mt-3 text-slate-600">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-accent font-medium text-sm">
                  Learn more
                  <ChevronRightIcon className="w-4 h-4" />
                </span>
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

      {/* Solutions grid */}
      <section id="solutions-coverage" className="scroll-mt-20 py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="sr-stagger grid md:grid-cols-3 gap-8">
            {solutions.map((s, i) => (
              <div
                key={s.title}
                className="sr relative z-10 p-8 rounded-xl bg-white border border-black box-border card-hover hover:z-20"
                style={{ "--sr-i": i } as CSSProperties}
              >
                <h2 className="font-display text-xl font-semibold text-brand">{s.title}</h2>
                <ul className="mt-6 space-y-4">
                  {s.items.map((item) => (
                    <li key={item.name}>
                      <span className="font-medium text-slate-800">{item.name}</span>
                      <p className="mt-0.5 text-sm text-slate-600">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-2 md:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=80"
            alt="Manufacturing procurement dashboard on laptop"
            className="sr-scale w-full h-[260px] md:h-[340px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      {/* Platform usage */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="sr-left">
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Platform adoption</p>
              <h2 className="font-display text-3xl font-bold text-brand mt-2">Used across the full sourcing lifecycle</h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Procurement teams run supplier discovery, RFQ decisions, and performance tracking on one platform. The chart shows where the modules create the highest adoption.
              </p>
            </div>
            <div className="sr-right p-6 md:p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow">
              <SimpleBarChart
                items={usageByWorkflow}
                title="Platform usage by workflow stage"
                description="% of teams using the platform at this stage."
                barColor="bg-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI adoption */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="sr-left p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-300 shadow-sm hover:shadow-md transition-shadow order-2 lg:order-1">
              <BarChart
                data={aiAdoptionData}
                title="How customers use AI"
                description="Share of customers (%) in each AI usage tier."
                valueSuffix="%"
                maxValue={55}
              />
            </div>
            <div className="sr-right order-1 lg:order-2">
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">AI adoption</p>
              <h2 className="font-display text-3xl font-bold text-brand mt-2">From visibility to AI-guided decisions</h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Teams start with analytics visibility and then activate recommendation flows for RFQ awards and supplier actions. Adoption grows quickly once decision simulation is enabled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who uses Partsource */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="sr font-display text-3xl font-bold text-brand">Who uses Partsource</h2>
            <p className="sr mt-4 text-slate-600">
              The platform is used across procurement, category, operations, and finance. The charts show how adoption is distributed by team and decision use case.
            </p>
          </div>
          <div className="sr-stagger grid lg:grid-cols-2 gap-8">
            <div
              className="sr p-6 md:p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow"
              style={{ "--sr-i": 0 } as CSSProperties}
            >
              <SimpleBarChart
                items={adoptionByRole}
                title="Adoption by role"
                description="Share of users (%) by primary job function."
                max={35}
                barColor="bg-accent"
              />
            </div>
            <div
              className="sr p-6 md:p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow"
              style={{ "--sr-i": 1 } as CSSProperties}
            >
              <SimpleBarChart
                items={adoptionByUseCase}
                title="Adoption by use case"
                description="Share of projects (%) by primary use case."
                max={30}
                barColor="bg-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key capabilities */}
      <section id="capabilities" className="scroll-mt-20 section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="sr font-display text-2xl font-bold text-brand text-center mb-4">Key capabilities</h2>
          <p className="sr text-center text-slate-600 max-w-xl mx-auto mb-8">
            From part input to recommendation—research, comparison, and decision support in one system.
          </p>
          <div className="sr-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCapabilities.map((cap, i) => (
              <div
                key={cap}
                className="sr p-6 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow card-hover"
                style={{ "--sr-i": i } as CSSProperties}
              >
                <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 mb-3">
                  {"\u2713"}
                </span>
                <p className="text-slate-700 font-medium">{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="sr font-display text-2xl font-bold text-brand text-center mb-6">Why recommendations—not just search</h2>
          <p className="sr max-w-3xl mx-auto text-slate-600 text-center">
            Search and comparison alone do not choose a supplier. Partsource adds decision intelligence: ranked options, explainable rationale, and a faster path from part number to award.
          </p>
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
