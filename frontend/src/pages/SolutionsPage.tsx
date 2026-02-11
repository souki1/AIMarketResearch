import { Link } from "react-router-dom";
import SimpleBarChart from "../components/SimpleBarChart";

const solutions = [
  {
    title: "By industry",
    items: [
      { name: "Technology & SaaS", desc: "Product-market fit, feature prioritization, competitive intelligence" },
      { name: "Financial services", desc: "Customer satisfaction, brand tracking, compliant research" },
      { name: "Healthcare & pharma", desc: "Patient and physician insights, market access" },
      { name: "Retail & CPG", desc: "Shopper behavior, concept testing, brand health" },
      { name: "Manufacturing & B2B", desc: "B2B panels, purchase intent, supply chain insights" },
    ],
  },
  {
    title: "By role",
    items: [
      { name: "Product", desc: "Feature prioritization, concept tests, user needs" },
      { name: "Marketing", desc: "Brand tracking, ad testing, campaign effectiveness" },
      { name: "Strategy", desc: "Market sizing, competitive analysis, M&A due diligence" },
      { name: "Customer experience", desc: "NPS, journey mapping, satisfaction tracking" },
      { name: "Sales", desc: "Win/loss, pricing, buyer personas" },
    ],
  },
  {
    title: "By use case",
    items: [
      { name: "Concept testing", desc: "Validate ideas before launch with AI-summarized feedback" },
      { name: "Brand tracking", desc: "Awareness, consideration, and sentiment over time" },
      { name: "CX measurement", desc: "NPS, CSAT, and driver analysis with AI themes" },
      { name: "Ad testing", desc: "Creative and message testing with fast turnaround" },
      { name: "Market sizing", desc: "TAM/SAM/SOM and segmentation with clear deliverables" },
    ],
  },
];

const adoptionByRole = [
  { label: "Product", value: 28 },
  { label: "Marketing", value: 32 },
  { label: "Strategy", value: 18 },
  { label: "CX / Customer success", value: 14 },
  { label: "Sales", value: 8 },
];

const adoptionByUseCase = [
  { label: "Concept / product testing", value: 26 },
  { label: "Brand tracking", value: 22 },
  { label: "Customer experience", value: 20 },
  { label: "Market sizing", value: 15 },
  { label: "Ad / creative testing", value: 17 },
];

export default function SolutionsPage() {
  return (
    <div>
      <section className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Solutions</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Purpose-built for your organization
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Pre-built workflows, best practices, and AI-driven templates for your industry and role—so you get to insights faster. Every solution is designed to work with our AI summaries and recommendations.
          </p>
        </div>
      </section>

      {/* Solutions grid with descriptions */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((s) => (
              <div key={s.title} className="p-8 rounded-xl bg-white border border-slate-100 card-hover">
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

      {/* Chart: Adoption by role */}
      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl font-bold text-brand">Who uses CustomMarket</h2>
            <p className="mt-4 text-slate-600">
              Our platform is used across product, marketing, strategy, and more. The charts below show how adoption breaks down by role and by use case—so you can see how teams like yours use AI-driven research.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-100">
              <SimpleBarChart
                items={adoptionByRole}
                title="Adoption by role"
                description="Share of users (%) by primary job function."
                max={35}
                barColor="bg-accent"
              />
            </div>
            <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-100">
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
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-6">Why an AI-driven solution</h2>
          <p className="max-w-3xl mx-auto text-slate-600 text-center">
            Every solution—whether by industry, role, or use case—includes AI summaries, theme detection, and recommended actions. That means less manual analysis, faster time to insight, and decisions backed by clear evidence. Templates and workflows are optimized for the way your team works.
          </p>
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">Need a custom solution?</h2>
          <p className="mt-2 text-slate-600">Our team can design a program tailored to your goals.</p>
          <Link to="/company" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
