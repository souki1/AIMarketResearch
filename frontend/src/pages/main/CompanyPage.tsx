import { Link } from "react-router-dom";
import { CALENDLY_DEMO_URL } from "../../constants/booking";

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

const pricingTiers = [
  {
    name: "Team",
    description: "Pilot and single-site teams getting started with governed part research and comparison.",
    highlights: ["Core research & comparison workspace", "Standard data sources and exports", "Email support during business hours", "Annual or multi-year subscription"],
    cta: "Talk to sales",
    href: CALENDLY_DEMO_URL,
    external: true,
    emphasized: false,
  },
  {
    name: "Business",
    description: "Category and plant teams that need shared workflows, more users, and faster response targets.",
    highlights: ["Multi-team and multi-plant scope", "Expanded integrations and file/API patterns", "Priority support with defined severities", "SSO available as an add-on"],
    cta: "Book a demo",
    href: CALENDLY_DEMO_URL,
    external: true,
    emphasized: true,
  },
  {
    name: "Enterprise",
    description: "IT-aligned rollouts with identity, SLAs, legal exhibits, and named customer success.",
    highlights: ["SAML SSO and SCIM provisioning", "Enterprise SLA & support exhibit", "Security and DPA package for production data", "Implementation and training via SOW"],
    cta: "Enterprise overview",
    href: "/enterprise",
    external: false,
    emphasized: false,
  },
];

export default function CompanyPage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-100 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-12 md:py-16 lg:py-20">
          <div className="w-full flex flex-col items-center text-center">
            <p className="font-display text-accent font-semibold text-base sm:text-lg md:text-xl uppercase tracking-[0.18em] sm:tracking-[0.22em]">
              Company
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand mt-4 sm:mt-5 mx-auto leading-[1.08] flex flex-col items-center gap-2 sm:gap-3 text-balance">
              <span className="block w-full max-w-6xl">
                We turn complex supplier research into instant,
              </span>
              <span className="block w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl">
                data-driven decisions
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Partsource is an AI-powered strategic sourcing and decision intelligence platform. We help businesses find, analyze, and choose the best suppliers and pricing for any part—starting with a part number and multi-source data you can trust.
            </p>
          </div>
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
            src="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1400&q=80"
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

      <section id="pricing" className="py-12 md:py-16 bg-white border-t border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Pricing</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Plans that scale with how you source</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Partsource is sold as an annual subscription. Fees depend on modules (e.g. research, comparison, recommendations), named users or
              site counts, and support tier—your order form and MSA are the only binding commercial terms.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6 lg:gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-6 lg:p-8 ${
                  tier.emphasized ? "border-accent shadow-lg shadow-accent/10 bg-white ring-1 ring-accent/20 md:scale-[1.02]" : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <h3 className="font-display text-xl font-bold text-brand">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{tier.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600 flex-1">
                  {tier.highlights.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-accent shrink-0 mt-0.5" aria-hidden>
                        ✓
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  {tier.external ? (
                    <a
                      href={tier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex w-full justify-center items-center px-5 py-3 rounded-lg text-sm font-semibold transition-colors min-h-[44px] ${
                        tier.emphasized
                          ? "text-white bg-brand hover:bg-brand-light"
                          : "text-brand border-2 border-slate-200 hover:border-accent hover:bg-slate-50"
                      }`}
                    >
                      {tier.cta}
                    </a>
                  ) : (
                    <Link
                      to={tier.href}
                      className="inline-flex w-full justify-center items-center px-5 py-3 rounded-lg text-sm font-semibold text-brand border-2 border-slate-200 hover:border-accent hover:bg-slate-50 transition-colors min-h-[44px]"
                    >
                      {tier.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            List prices are not published here. We scope pilots with your category and IT stakeholders, then align modules and fees in a
            written quote. Volume, multi-year terms, and services may apply.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand">Contact us</h2>
              <p className="mt-4 text-slate-600">
                Book a 30-minute call with our team to see a demo, discuss your requirements, and get answers—opens our scheduling page in a new tab.
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
                <a
                  href={CALENDLY_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors"
                >
                  Schedule a call — 30 min
                </a>
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
