import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import BarChart from "../../components/BarChart";
import PretextHeroReserve from "../../components/enterprise/PretextHeroReserve";
import partImage from "../../assets/images/download (1).jpg";
import PartShowcase from "../../components/PartShowcase";

const HERO_HEADLINE_TEXT =
  "Find, analyze, and choose the best supplier and pricing for any part";

const stats = [
  { value: "2,400+", label: "Active supplier networks" },
  { value: "31%", label: "Average sourcing cycle reduction" },
  { value: "$420M", label: "Annual spend analyzed" },
  { value: "89%", label: "Decision confidence uplift" },
];

const features = [
  {
    title: "Multi-source part research",
    description:
      "Enter a part number or query and automatically gather normalized data from multiple sources—no more tab-hopping between catalogs and spreadsheets.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7m9-8l2 2-5 5H8v-2l5-5z" />
      </svg>
    ),
  },
  {
    title: "Fair vendor comparison",
    description:
      "Compare vendors side by side on price, availability, lead time, and reliability signals so every award is defensible.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z" />
      </svg>
    ),
  },
  {
    title: "Intelligent recommendations",
    description:
      "Go beyond search and comparison—get AI-ranked options and explainable insights for the best sourcing decision on every part.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const logos = [
  "Discrete Manufacturing",
  "Process Manufacturing",
  "Industrial Plants",
  "Factory Procurement Teams",
];

const howItWorks = [
  { step: 1, title: "Input", text: "Enter a part number or search query—your starting point for every sourcing decision." },
  { step: 2, title: "Research", text: "We automatically pull and match data from multiple sources so you see a complete picture, not fragments." },
  { step: 3, title: "Compare", text: "Evaluate vendors on price, availability, lead time, and reliability in one structured view." },
  { step: 4, title: "Decide", text: "Receive intelligent recommendations and insights—not just lists—so you choose the best option faster." },
];

const industries = [
  { name: "Direct materials sourcing", desc: "Improve supplier performance and optimize category strategy for production-critical parts." },
  { name: "MRO procurement", desc: "Control spend and availability for maintenance, repair, and operations inventory." },
  { name: "Supplier quality management", desc: "Track quality trends and link sourcing decisions to plant performance outcomes." },
  { name: "Production continuity planning", desc: "Detect disruption risks early and protect manufacturing schedules with backup scenarios." },
  { name: "Plant-level category control", desc: "Standardize sourcing decisions across plants while preserving local flexibility." },
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

const useCases = [
  "Find alternate suppliers for a part in minutes",
  "Compare pricing and MOQs across vendors",
  "Validate availability before you commit production",
  "Benchmark reliability when choosing a new source",
  "Support make-vs-buy and dual-sourcing decisions",
  "Reduce time spent on manual supplier research",
  "Standardize how teams evaluate parts across plants",
  "Turn part research into documented, data-driven awards",
];

const useCaseIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

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
      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white border-b border-slate-100 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center">
            <div className="max-w-2xl lg:max-w-none">
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider mb-4">
                AI-powered strategic sourcing and decision intelligence
              </p>
              <PretextHeroReserve text={HERO_HEADLINE_TEXT.replace("\n", " ")}>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand leading-[1.1] tracking-tight">
                  Find, analyze, and choose the best supplier and pricing for
                  <span className="text-accent"> any part</span>
                </h1>
              </PretextHeroReserve>
              <p className="mt-6 text-lg text-slate-600 max-w-xl">
                An AI-powered research and comparison platform for manufacturing teams. Enter a part number—we gather data from multiple sources, compare vendors on price, availability, and reliability, and deliver intelligent recommendations for the best decision.
              </p>
              <p className="mt-4 text-base text-slate-500 max-w-xl italic">
                We turn complex supplier research into instant, data-driven decisions.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <Link to="/company" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors min-h-[44px]">
                  Request a demo <ChevronRightIcon className="w-4 h-4" />
                </Link>
                <Link to="/enterprise" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-brand border-2 border-slate-200 hover:border-accent hover:bg-slate-50 transition-colors min-h-[44px]">
                  Explore platform
                </Link>
                <a href="#part-showcase" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-slate-600 hover:text-accent transition-colors min-h-[44px]">
                  See it in action
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </a>
              </div>
            </div>

            {/* Hero right — part teaser */}
            <a href="#part-showcase" className="group relative w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] block">
              <div className="relative h-full w-full rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] p-5 sm:p-6 transition-all duration-300 group-hover:shadow-[0_12px_50px_-10px_rgba(0,113,227,0.18)] group-hover:border-accent/30">
                <div className="flex flex-col items-center text-center">
                  <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-2xl overflow-hidden bg-white/60 border border-white/50 shadow-sm flex items-center justify-center">
                    <img src={partImage} alt="Harmonic Drive Gearbox" className="w-full h-full object-contain p-3" />
                  </div>
                  <span className="mt-4 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent/10 text-accent">Gearboxes &amp; Speed Reducers</span>
                  <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-brand leading-snug">Harmonic Drive Gearbox</h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 font-mono tracking-tight">HD-CSD-25-160-2A-GR</p>
                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold text-brand">5 vendors</span> &middot;{" "}
                    <span className="font-semibold text-accent">$865</span>
                    {" – "}$1,410
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-accent text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
                    Scroll to explore
                    <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 rounded-full bg-accent/8 blur-3xl lg:block" aria-hidden />
              <div className="pointer-events-none absolute -bottom-8 -left-8 hidden h-36 w-36 rounded-full bg-blue-200/20 blur-3xl lg:block" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="section-alt py-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-medium text-slate-500 mb-8">Built exclusively for manufacturing organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((text) => (
              <span key={text} className="font-display text-lg font-semibold text-slate-400">{text}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="sr-stagger grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="sr text-center" style={{ "--sr-i": i } as React.CSSProperties}>
                <p className="font-display text-3xl md:text-4xl font-bold text-brand">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part showcase — vendor intelligence + decision impact (below hero, trust, stats) */}
      <PartShowcase />

      {/* How it works */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">How the platform works</h2>
            <p className="sr mt-4 text-slate-600">From part number to recommendation—research, compare, and decide in one flow.</p>
          </div>
          <div className="sr-stagger grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="sr relative p-8 rounded-xl bg-white border border-slate-100 card-hover" style={{ "--sr-i": i } as React.CSSProperties}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent font-display font-bold text-lg">{item.step}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-driven section + chart */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <p className="sr font-display text-accent font-semibold text-sm uppercase tracking-wider">Decision intelligence</p>
              <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand mt-2">Not just search—recommendations you can act on</h2>
              <p className="sr mt-6 text-slate-600 leading-relaxed">Strategic sourcing means data-driven choices for best value. Partsource cleans and matches multi-source data, compares options on what matters, and surfaces ranked recommendations—not endless tabs.</p>
              <ul className="mt-6 space-y-3">
                {["Explainable rankings: why one vendor wins for this part", "Side-by-side comparison: price, lead time, availability, reliability", "Faster path from part lookup to a confident award"].map((t) => (
                  <li key={t} className="sr flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span className="text-slate-600">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sr-scale p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-100">
              <BarChart data={timeToInsightData} title="Time to a sourcing decision: manual vs Partsource" description="Average time from part inquiry to a decision-ready comparison. Lower is better." valueSuffix=" days" maxValue={20} barColor="bg-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Chart: Signal mix */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="sr-scale p-6 md:p-8 rounded-xl bg-white border border-slate-100 order-2 lg:order-1">
              <BarChart data={responseVolumeData} title="Decision signal mix across sourcing workflows" description="Relative contribution (%) of core signals used by the decision engine." valueSuffix="%" maxValue={35} />
            </div>
            <div className="order-1 lg:order-2">
              <p className="sr font-display text-accent font-semibold text-sm uppercase tracking-wider">One place for every part</p>
              <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand mt-2">Every signal you need to pick the right supplier</h2>
              <p className="sr mt-6 text-slate-600 leading-relaxed">Price, availability, lead time, and reliability—combined into a single decision view so manufacturing teams stop reconciling spreadsheets and start choosing with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI impact stats */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">What teams report after adopting the platform</h2>
            <p className="sr mt-3 text-slate-600">
              Survey of manufacturing sourcing leaders using our decision intelligence workflows.<br />
              <span className="text-sm text-slate-500">% who agree performance improved in this area.</span>
            </p>
          </div>
          <div className="sr-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiImpactData.map((item, i) => (
              <div key={item.label} className="sr relative p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center overflow-hidden card-hover" style={{ "--sr-i": i } as React.CSSProperties}>
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

      {/* Industries */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">Built for manufacturing workflows</h2>
            <p className="sr mt-4 text-slate-600">Built for how manufacturing teams buy parts—direct materials, MRO, and plant-level sourcing.</p>
          </div>
          <div className="sr-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div key={ind.name} className="sr p-6 rounded-xl bg-white border border-slate-100 card-hover" style={{ "--sr-i": i } as React.CSSProperties}>
                <h3 className="font-display font-semibold text-brand">{ind.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">Use cases we power</h2>
            <p className="sr mt-4 text-slate-600">From a single part number to a clear recommendation—one platform for research, comparison, and decision.</p>
          </div>
          <div className="sr-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((uc, i) => (
              <div key={uc} className="sr flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 card-hover" style={{ "--sr-i": i } as React.CSSProperties}>
                <span className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">{useCaseIcon}</span>
                <p className="pt-1.5 text-sm font-medium text-slate-800 leading-snug">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="sr font-display text-3xl sm:text-4xl font-bold text-brand">What Partsource does</h2>
            <p className="sr mt-4 text-slate-600">Research from multiple sources, structured comparison, and AI-backed recommendations—so you find the best supplier for any part, faster.</p>
          </div>
          <div className="sr-stagger grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={f.title} className="sr p-8 rounded-xl bg-white border border-slate-100 card-hover" style={{ "--sr-i": i } as React.CSSProperties}>
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-5">{f.icon}</div>
                <h3 className="font-display text-xl font-semibold text-brand">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Ready to source smarter?</h2>
          <p className="mt-4 text-white/80">See how Partsource turns part-level research into instant, data-driven supplier decisions for your team.</p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/company" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-brand bg-white hover:bg-slate-100 transition-colors min-h-[44px]">
              Request a demo
            </Link>
            <Link to="/enterprise" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white border-2 border-white/40 hover:bg-white/10 transition-colors min-h-[44px]">
              Enterprise solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
