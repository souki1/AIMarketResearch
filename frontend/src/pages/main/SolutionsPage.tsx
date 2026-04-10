import { Link } from "react-router-dom";
import SimpleBarChart from "../../components/SimpleBarChart";
import SolutionsProductShowcase from "../../components/SolutionsProductShowcase";

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

export default function SolutionsPage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-100 py-12 md:py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1581092921461-39b9d08a9b2b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Solutions</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Part sourcing workflows for manufacturing teams
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Use Partsource to research any part, compare vendors on price and availability, and get AI-backed recommendations—so strategic sourcing is data-driven, not guesswork.
          </p>
        </div>
      </section>

      {/* Core product UI: compare, calculator, PO */}
      <section className="py-14 md:py-20 bg-surface border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 md:mb-16">
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

          <SolutionsProductShowcase />

          <p className="mt-14 md:mt-16 text-center text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Sliders and filters above are illustrative; in production, Partsource connects to your supplier data, plants, and approval rules—the layout and labels stay the same.
          </p>
        </div>
      </section>

      {/* Solutions grid with descriptions */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((s) => (
              <div key={s.title} className="relative z-10 p-8 rounded-xl bg-white border border-black box-border card-hover hover:z-20">
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
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
            alt="Procurement operations planning in manufacturing"
            className="w-full h-[240px] md:h-[320px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      {/* Chart: Adoption by role */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl font-bold text-brand">Who uses Partsource</h2>
            <p className="mt-4 text-slate-600">
              The platform is used across procurement, category, operations, and finance. The charts show how adoption is distributed by team and decision use case.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow">
              <SimpleBarChart
                items={adoptionByRole}
                title="Adoption by role"
                description="Share of users (%) by primary job function."
                max={35}
                barColor="bg-accent"
              />
            </div>
            <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Why AI-driven */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-6">Why recommendations—not just search</h2>
          <p className="max-w-3xl mx-auto text-slate-600 text-center">
            Search and comparison alone do not choose a supplier. Partsource adds decision intelligence: ranked options, explainable rationale, and a faster path from part number to award.
          </p>
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">Need a custom solution?</h2>
          <p className="mt-2 text-slate-600">Our team can tailor workflows to your categories, plants, and sourcing model.</p>
          <Link to="/company" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
