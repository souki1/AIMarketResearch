import { Link } from "react-router-dom";

const stories = [
  { quote: "CustomMarket gave us a single platform for global research with the compliance and scale we need.", author: "VP Insights, Fortune 500 technology company" },
  { quote: "We cut time-to-insight by 50% and improved governance with role-based access and audit trails.", author: "Head of Market Research, global financial services firm" },
  { quote: "The AI summaries and recommended actions help our team act faster on what matters.", author: "Director of Product, enterprise SaaS" },
  { quote: "We moved from spreadsheets and multiple tools to one AI-driven platform. Game changer for our team.", author: "Senior Manager, Brand & Insights, retail" },
  { quote: "The ability to run surveys and get AI-generated insights in the same place has streamlined our entire process.", author: "Head of CX, healthcare" },
];

const outcomes = [
  { value: "50%", label: "Faster time to insight (typical)" },
  { value: "1", label: "Single platform for design, field, and analysis" },
  { value: "150+", label: "Countries supported for global studies" },
];

const industriesServed = [
  "Technology & SaaS",
  "Financial services",
  "Healthcare & pharma",
  "Retail & CPG",
  "Manufacturing & B2B",
  "Media & entertainment",
];

export default function CustomersPage() {
  return (
    <div>
      <section className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Customers</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Trusted by leading enterprises
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Organizations across industries use CustomMarket for secure, scalable, AI-driven market intelligence. See what they say about the platform and the outcomes they achieve.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-8">What customers say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((s) => (
              <div key={s.author} className="p-8 rounded-xl bg-white border border-slate-100 card-hover">
                <p className="text-slate-700 leading-relaxed">&ldquo;{s.quote}&rdquo;</p>
                <p className="mt-6 font-medium text-brand">{s.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-4">Typical outcomes</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-8">
            Customers report faster insights, better governance, and one platform from design to delivery.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {outcomes.map((o) => (
              <div key={o.label} className="text-center p-6 rounded-xl bg-white border border-slate-100">
                <p className="font-display text-3xl font-bold text-accent">{o.value}</p>
                <p className="mt-2 text-slate-600">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-6">Industries we serve</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-10">
            Our AI-driven platform is used by product, marketing, strategy, and insights teams across these sectors.
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {industriesServed.map((ind) => (
              <li key={ind} className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 font-medium">
                {ind}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">Join 500+ enterprises</h2>
          <p className="mt-2 text-slate-600">Get a personalized demo for your organization.</p>
          <Link to="/company" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Request a demo
          </Link>
        </div>
      </section>
    </div>
  );
}
