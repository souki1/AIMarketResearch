import { Link } from "react-router-dom";
import BarChart from "../components/BarChart";

const stats = [
  { value: "500+", label: "Enterprise customers" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50M+", label: "Responses processed annually" },
  { value: "150+", label: "Countries supported" },
];

const features = [
  {
    title: "Scale with confidence",
    description: "Run global surveys and panels at enterprise scale with built-in governance, quotas, and compliance controls.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Security & compliance first",
    description: "SOC 2 Type II, GDPR, and ISO 27001. Data residency options and role-based access control.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "AI-powered intelligence",
    description: "Turn raw data into actionable insights with natural language summaries, trend detection, and recommended actions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.947V20a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1.053c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const logos = ["Fortune 500", "Global 2000", "Leading brands across technology, financial services, healthcare, and retail"];

const howItWorks = [
  { step: 1, title: "Design & deploy", text: "Create surveys with our builder or use AI-suggested questions. Set quotas, logic, and target audiences. Deploy to your own panel or our global network." },
  { step: 2, title: "Collect & validate", text: "Responses flow in real time. Our AI helps with quality checks, deduplication, and completion tracking so you get clean, representative data." },
  { step: 3, title: "Analyze with AI", text: "Get automatic summaries, sentiment analysis, and trend detection. Ask questions in plain language and receive clear, actionable insights—no data science required." },
  { step: 4, title: "Act on insights", text: "Export to your stack, share dashboards with stakeholders, or use our API. Decisions stay aligned with the latest market intelligence." },
];

const industries = [
  { name: "Technology & SaaS", desc: "Product-market fit, feature prioritization, and competitive intelligence for software and digital products." },
  { name: "Financial services", desc: "Customer satisfaction, brand tracking, and regulatory-compliant research for banks, insurers, and fintechs." },
  { name: "Healthcare & pharma", desc: "Patient and physician insights, treatment awareness, and market access research with full compliance." },
  { name: "Retail & CPG", desc: "Shopper behavior, concept testing, and brand health across online and offline channels." },
  { name: "Manufacturing & B2B", desc: "B2B panels, purchase intent, and supply chain insights for industrial and enterprise buyers." },
];

const timeToInsightData = [
  { label: "Traditional (manual analysis)", value: 14, sublabel: "Days from survey close to executive summary" },
  { label: "With CustomMarket AI", value: 2, sublabel: "Same deliverable, AI-generated summaries + human review" },
];

const responseVolumeData = [
  { label: "North America", value: 22 },
  { label: "Europe", value: 28 },
  { label: "Asia Pacific", value: 32 },
  { label: "Latin America", value: 10 },
  { label: "Middle East & Africa", value: 8 },
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
  { label: "Faster time to insight", value: 85, iconKey: "faster" as const },
  { label: "Better use of data", value: 78, iconKey: "data" as const },
  { label: "Easier for non-experts", value: 92, iconKey: "easier" as const },
  { label: "Higher confidence in decisions", value: 81, iconKey: "confidence" as const },
];

const useCases = [
  "Concept and product testing",
  "Brand health and awareness tracking",
  "Customer and employee experience (CX/EX)",
  "Market sizing and segmentation",
  "Competitive and win/loss analysis",
  "Pricing and packaging research",
  "Ad and creative testing",
  "Thought leadership and trend reports",
];

const useCaseIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              AI-driven enterprise market intelligence
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand leading-[1.1] tracking-tight">
              Make decisions with{" "}
              <span className="text-accent">confidence</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Custom surveys, global panels, and AI-driven analytics—built for scale, security, and compliance. Our AI turns raw data into clear narratives and recommended actions so your team can act faster. Trusted by 500+ enterprises worldwide.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/company"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors"
              >
                Request a demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/enterprise"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-brand border-2 border-slate-200 hover:border-accent hover:bg-slate-50 transition-colors"
              >
                Enterprise
              </Link>
              <Link
                to="/company"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-slate-600 hover:text-brand transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="section-alt py-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-medium text-slate-500 mb-8">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((text) => (
              <span key={text} className="font-display text-lg font-semibold text-slate-400">
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-brand">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">
              How the platform works
            </h2>
            <p className="mt-4 text-slate-600">
              From survey design to AI-powered insights—one integrated flow for market research at scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative p-8 rounded-xl bg-white border border-slate-100 card-hover">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent font-display font-bold text-lg">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-driven section + chart: Time to insight */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">AI-driven insights</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-2">
                From data to decisions in days, not weeks
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Our AI analyzes survey responses as they come in: it surfaces themes, detects sentiment, suggests segments, and generates executive-ready summaries. Your team gets clear, actionable insights without waiting on manual analysis or data science.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span className="text-slate-600">Natural language summaries and recommended next steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span className="text-slate-600">Automatic theme and sentiment detection across open ends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span className="text-slate-600">Trend alerts and anomaly detection so you spot changes early</span>
                </li>
              </ul>
            </div>
            <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-100">
              <BarChart
                data={timeToInsightData}
                title="Time to insight: traditional vs AI-driven"
                description="Average days from survey close to executive summary. Lower is better."
                valueSuffix=" days"
                maxValue={20}
                barColor="bg-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chart: Response volume by region */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-100 order-2 lg:order-1">
              <BarChart
                data={responseVolumeData}
                title="Survey response volume by region"
                description="Share of total responses (%). Our panel and integrations cover 150+ countries."
                valueSuffix="%"
                maxValue={35}
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Global reach</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-2">
                One platform, worldwide coverage
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Run surveys in the regions that matter to you. We support 150+ countries with localized panels, translation support, and compliance with local data laws. The chart shows how response volume is distributed across regions—so you can plan sampling and quotas with real data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What teams say about our AI — stat cards */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">
              What teams say about our AI
            </h2>
            <p className="mt-3 text-slate-600">
              Survey of customers who use AI summaries and recommendations (agree or strongly agree).<br />
              <span className="text-sm text-slate-500">% who agree CustomMarket AI improves this aspect of their work.</span>
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiImpactData.map((item) => (
              <div
                key={item.label}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center overflow-hidden card-hover"
              >
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-accent/15 text-accent">
                  {aiImpactIcons[item.iconKey]}
                </div>
                <p className="font-display text-4xl sm:text-5xl font-bold text-accent tabular-nums">
                  {item.value}%
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700 leading-snug">
                  {item.label}
                </p>
                <div className="mt-4 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">
              Built for your industry
            </h2>
            <p className="mt-4 text-slate-600">
              Pre-built templates, panels, and compliance settings for the sectors we serve.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <div key={ind.name} className="p-6 rounded-xl bg-white border border-slate-100 card-hover">
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
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">
              Use cases we power
            </h2>
            <p className="mt-4 text-slate-600">
              From concept testing to brand tracking—one AI-driven platform for many research needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((uc) => (
              <div
                key={uc}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 card-hover"
              >
                <span className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  {useCaseIcon}
                </span>
                <p className="pt-1.5 text-sm font-medium text-slate-800 leading-snug">
                  {uc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">
              Built for enterprise requirements
            </h2>
            <p className="mt-4 text-slate-600">
              Scale, security, and AI intelligence in one platform—so your team can focus on strategy, not infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-xl bg-white border border-slate-100 card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-5">
                  {f.icon}
                </div>
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
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Ready to scale your market intelligence?
          </h2>
          <p className="mt-4 text-white/80">
            Join 500+ enterprises using CustomMarket for secure, compliant, and AI-powered insights.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/company"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-brand bg-white hover:bg-slate-100 transition-colors"
            >
              Request a demo
            </Link>
            <Link
              to="/enterprise"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white border-2 border-white/40 hover:bg-white/10 transition-colors"
            >
              Enterprise solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
