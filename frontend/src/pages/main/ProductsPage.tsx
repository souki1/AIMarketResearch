import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import SimpleBarChart from "../../components/SimpleBarChart";
import BarChart from "../../components/BarChart";

const products = [
  {
    title: "Part research engine",
    description: "Enter a part number or query and automatically gather data from multiple sources—cleaned, matched, and ready to compare.",
    to: "#",
    icon: "hub",
  },
  {
    title: "Vendor comparison workspace",
    description: "Compare suppliers side by side on price, availability, lead time, and reliability so every award is transparent and defensible.",
    to: "#",
    icon: "analytics",
  },
  {
    title: "Recommendation intelligence",
    description: "Go beyond lists: get ranked options and explainable AI insights for the best sourcing decision on each part.",
    to: "#",
    icon: "ai",
  },
  {
    title: "Integrations & data layer",
    description: "Connect your stack—ERP, supplier feeds, and internal systems—so research and decisions stay in one place.",
    to: "#",
    icon: "api",
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

export default function ProductsPage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-100 py-12 md:py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1586528116493-40d0f0e0f4c8?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Products</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Strategic sourcing and decision intelligence for every part
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            An AI-powered research and comparison platform: find suppliers, analyze pricing and availability, and get intelligent recommendations—not just search results.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p) => (
              <Link key={p.title} to={p.to} className="block p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow card-hover">
                <span className="inline-flex w-11 h-11 rounded-lg items-center justify-center bg-accent/10 text-accent mb-4">
                  {p.icon === "hub" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v6H4zM4 14h7v6H4zM13 14h7v6h-7z" /></svg>}
                  {p.icon === "analytics" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7M4 20h16" /></svg>}
                  {p.icon === "ai" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3v2.25M14.25 3v2.25M6 8.25h12M6.75 20.25h10.5A2.25 2.25 0 0019.5 18V9.75A2.25 2.25 0 0017.25 7.5H6.75A2.25 2.25 0 004.5 9.75V18A2.25 2.25 0 006.75 20.25z" /></svg>}
                  {p.icon === "api" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8M8 17h5M4 4h16v16H4z" /></svg>}
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

      <section className="py-2 md:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=80"
            alt="Manufacturing procurement dashboard on laptop"
            className="w-full h-[260px] md:h-[340px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      {/* Chart: Platform usage across workflow */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Platform adoption</p>
              <h2 className="font-display text-3xl font-bold text-brand mt-2">
                Used across the full sourcing lifecycle
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Procurement teams run supplier discovery, RFQ decisions, and performance tracking on one platform. The chart shows where the modules create the highest adoption.
              </p>
            </div>
            <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Chart: How customers use AI */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-300 shadow-sm hover:shadow-md transition-shadow order-2 lg:order-1">
              <BarChart
                data={aiAdoptionData}
                title="How customers use AI"
                description="Share of customers (%) in each AI usage tier."
                valueSuffix="%"
                maxValue={55}
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">AI adoption</p>
              <h2 className="font-display text-3xl font-bold text-brand mt-2">
                From visibility to AI-guided decisions
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Teams start with analytics visibility and then activate recommendation flows for RFQ awards and supplier actions. Adoption grows quickly once decision simulation is enabled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key capabilities cards */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-4">Key capabilities</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-8">
            From part input to recommendation—research, comparison, and decision support in one system.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCapabilities.map((cap) => (
              <div key={cap} className="p-6 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow card-hover">
                <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 mb-3">
                  <span className="text-accent">✓</span>
                </span>
                <p className="text-slate-700 font-medium">{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">See the platform in action</h2>
          <p className="mt-2 text-slate-600">Request a personalized sourcing intelligence walkthrough.</p>
          <Link to="/company" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Request a demo
          </Link>
        </div>
      </section>
    </div>
  );
}
