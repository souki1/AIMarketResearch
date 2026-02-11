import { Link } from "react-router-dom";
import SimpleBarChart from "../components/SimpleBarChart";
import BarChart from "../components/BarChart";

const products = [
  {
    title: "Surveys & Panels",
    description: "Design, deploy, and manage surveys at scale with branching logic, quotas, and global panel access. Use AI to suggest questions and improve completion rates.",
    to: "#",
  },
  {
    title: "Analytics & Reporting",
    description: "Dashboards, crosstabs, and exportable reports with role-based access and audit trails. AI-generated summaries and recommended cuts so stakeholders get the story fast.",
    to: "#",
  },
  {
    title: "AI Insights",
    description: "Natural language summaries, sentiment and theme detection, trend alerts, and recommended actions. Ask questions in plain language and get answers backed by your data.",
    to: "#",
  },
  {
    title: "Integrations & API",
    description: "Connect to your stack via API, webhooks, and pre-built integrations (Salesforce, Slack, data warehouses). Sync respondents and results for a single source of truth.",
    to: "#",
  },
];

const productCapabilities = [
  "Survey builder with logic, piping, and randomization",
  "Global panel and custom audience sourcing",
  "Real-time dashboards and automated reports",
  "AI summaries and suggested segments",
  "SSO, RBAC, and audit logs",
  "Data residency and compliance controls",
];

const usageByWorkflow = [
  { label: "Survey design & launch", value: 98 },
  { label: "Data collection & QC", value: 95 },
  { label: "Analysis & reporting", value: 94 },
  { label: "AI summaries & insights", value: 87 },
  { label: "Sharing & export", value: 91 },
];

const aiAdoptionData = [
  { label: "AI summary only", value: 35, sublabel: "Use AI for executive summaries" },
  { label: "AI + recommendations", value: 48, sublabel: "Summaries plus suggested actions" },
  { label: "Full AI workflow", value: 17, sublabel: "End-to-end from design to insights" },
];

export default function ProductsPage() {
  return (
    <div>
      <section className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Products</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            AI-driven market research platform
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            End-to-end capabilities for surveys, panels, analytics, and AI—with the security and scale your organization requires. Every product is built to work together so you spend less time moving data and more time acting on insights.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p) => (
              <Link key={p.title} to={p.to} className="block p-8 rounded-xl bg-white border border-slate-100 card-hover">
                <h2 className="font-display text-xl font-semibold text-brand">{p.title}</h2>
                <p className="mt-3 text-slate-600">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-accent font-medium text-sm">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Chart: Platform usage across workflow */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Platform adoption</p>
              <h2 className="font-display text-3xl font-bold text-brand mt-2">
                Used across the entire research workflow
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Customers use CustomMarket from survey design through to sharing results. The chart shows the percentage of customers who use the platform for each stage of the workflow—so you can see how one product supports the full lifecycle.
              </p>
            </div>
            <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-100">
              <SimpleBarChart
                items={usageByWorkflow}
                title="Platform usage by workflow stage"
                description="% of customers using CustomMarket for this stage."
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
            <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-100 order-2 lg:order-1">
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
                From summaries to full AI-driven workflows
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Most teams start with AI-generated summaries, then add recommended actions and segments. A growing share runs the full workflow—from AI-suggested questions to automated insights. The bar chart shows how our customer base is distributed across these usage levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities list */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-4">Key capabilities</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-8">
            Everything you need to run enterprise-grade, AI-driven market research in one platform.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {productCapabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">See the platform in action</h2>
          <p className="mt-2 text-slate-600">Request a personalized demo for your organization.</p>
          <Link to="/company" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Request a demo
          </Link>
        </div>
      </section>
    </div>
  );
}
