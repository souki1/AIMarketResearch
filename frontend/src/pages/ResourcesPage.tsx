import { Link } from "react-router-dom";

const resources = [
  { title: "Documentation", description: "API reference, guides, and best practices for technical teams.", to: "#" },
  { title: "Case studies", description: "How enterprises use CustomMarket for product and market research.", to: "#" },
  { title: "Blog", description: "Industry trends, product updates, and research methodology.", to: "#" },
  { title: "Support", description: "Help center, SLAs, and dedicated support for enterprise customers.", to: "#" },
];

export default function ResourcesPage() {
  return (
    <div>
      <section className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Resources</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Learn, integrate, and scale
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Documentation, case studies, and support to help your team get the most from CustomMarket.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((r) => (
              <Link key={r.title} to={r.to} className="block p-6 rounded-xl bg-white border border-slate-100 card-hover">
                <h2 className="font-display text-lg font-semibold text-brand">{r.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{r.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-accent font-medium text-sm">
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">Stay updated</h2>
          <p className="mt-2 text-slate-600">Product updates and research insights in your inbox.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Work email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button type="button" className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
