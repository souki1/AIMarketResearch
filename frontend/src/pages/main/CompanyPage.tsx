import { Link } from "react-router-dom";

const values = [
  { title: "Operational impact first", text: "We design for measurable procurement outcomes: faster sourcing, better supplier performance, and stronger resilience." },
  { title: "Explainable AI", text: "Recommendations are transparent so category and operations teams can trust and defend decisions." },
  { title: "Enterprise reliability", text: "Built for large manufacturing environments with robust governance and cross-team workflows." },
];

const milestones = [
  "Founded to modernize procurement and sourcing decisions",
  "Launched AI-powered supplier scoring and recommendation engine",
  "Focused exclusively on manufacturing sourcing workflows",
  "Supporting enterprise sourcing teams across complex supply networks",
];

export default function CompanyPage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-100 py-12 md:py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Company</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            We turn complex supplier research into instant, data-driven decisions
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Partsource is an AI-powered strategic sourcing and decision intelligence platform. We help businesses find, analyze, and choose the best suppliers and pricing for any part—starting with a part number and multi-source data you can trust.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-slate-300 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-brand">Our mission</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We believe sourcing should not mean endless spreadsheets and manual vendor research. Our mission is to give every team instant, comparable data and clear recommendations for every part they buy.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-300 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-brand">What we offer</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Input a part number, automatically gather data from multiple sources, compare vendors on price, availability, and reliability, and receive intelligent recommendations—not just search results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-2 md:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="https://images.unsplash.com/photo-1581091215367-59ab6dcef975?auto=format&fit=crop&w=1400&q=80"
            alt="Manufacturing facility and procurement operations context"
            className="w-full h-[220px] md:h-[320px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-8">Our values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow card-hover">
                <h3 className="font-display text-lg font-semibold text-brand">{v.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-6">Where we are today</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-10">
            Key milestones in our journey to build the leading sourcing decision intelligence platform.
          </p>
          <ul className="max-w-2xl mx-auto space-y-4">
            {milestones.map((m, i) => (
              <li key={m} className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-display font-semibold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-slate-700">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand">Contact us</h2>
              <p className="mt-4 text-slate-600">
                Request a demo or speak with our sales team about your requirements. We'll walk you through the platform and answer your questions.
              </p>
            </div>
            <div>
              <form className="space-y-4 max-w-md">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-lg border border-black text-black placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Work email"
                  className="w-full px-4 py-3 rounded-lg border border-black text-black placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-lg border border-black text-black placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors"
                >
                  Request a demo
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center">Careers</h2>
          <p className="mt-2 text-slate-600 text-center max-w-xl mx-auto">
            We are building the future of sourcing decision intelligence. If you care about AI, operations, and real business impact, we would love to hear from you.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/company" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-brand border-2 border-brand hover:bg-brand hover:text-white transition-colors">
              View open roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
