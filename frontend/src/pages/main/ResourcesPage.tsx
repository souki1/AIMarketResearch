import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const resources = [
  { title: "Platform documentation", description: "API references, data models, and integration guides for sourcing stacks.", to: "#" },
  { title: "Procurement playbooks", description: "Actionable guides for supplier qualification, RFQ optimization, and award governance.", to: "#" },
  { title: "Industry insights", description: "Manufacturing sourcing trends, risk outlooks, and category intelligence.", to: "#" },
  { title: "Customer support", description: "Implementation help, workflow enablement, and team onboarding resources.", to: "#" },
];

export default function ResourcesPage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-100 py-12 md:py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Resources</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Learn, deploy, and scale sourcing intelligence
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Documentation and guides to help your teams get the most from part-level research, vendor comparison, and recommendations.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((r) => (
              <Link key={r.title} to={r.to} className="block p-6 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow card-hover">
                <h2 className="font-display text-lg font-semibold text-brand">{r.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{r.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-accent font-medium text-sm">
                  Explore
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
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80"
            alt="Procurement and operations team workshop"
            className="w-full h-[220px] md:h-[300px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">Stay updated</h2>
          <p className="mt-2 text-slate-600">Sourcing intelligence updates and procurement best practices in your inbox.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Work email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button type="button" className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light whitespace-nowrap min-h-[44px]">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
