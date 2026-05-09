import { Link } from "react-router-dom";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import Seo from "../../components/Seo";

const values = [
  {
    title: "Operational impact first",
    text: "We design for measurable procurement outcomes: faster sourcing, better supplier performance, and stronger resilience.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Explainable AI",
    text: "Recommendations are transparent so category and operations teams can trust and defend decisions.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Enterprise reliability",
    text: "Built for large manufacturing environments with robust governance and cross-team workflows.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
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
      <Seo
        title="Company — About Partsource | Partsource"
        description="Partsource designs for measurable procurement outcomes: faster sourcing, explainable AI recommendations, and enterprise reliability for manufacturing teams."
        canonicalPath="/company"
      />
      <section className="relative overflow-hidden border-b border-slate-200/60 min-h-[78vh] md:min-h-[82vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2400&q=80')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(0,113,227,0.32), transparent 55%)",
              "linear-gradient(120deg, rgba(5,9,20,0.92) 0%, rgba(8,15,30,0.78) 50%, rgba(0,30,80,0.55) 100%)",
            ].join(", "),
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-20 md:py-28">
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
            <p className="font-display text-accent-light font-semibold text-xs sm:text-sm uppercase tracking-[0.22em]">
              Company
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-5 max-w-5xl mx-auto leading-[1.05] tracking-tight text-balance">
              We turn complex supplier research into instant, <span className="text-accent-light">data-driven decisions</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              An AI-powered strategic sourcing and decision intelligence platform—built for manufacturing teams that ship on schedule.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg shadow-black/30 transition hover:bg-slate-100 min-h-[48px]"
              >
                Book a demo
              </a>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10 min-h-[48px]"
              >
                Explore the product
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + What we offer with image side */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="relative h-72 lg:h-auto rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-xl shadow-slate-300/30 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1600&q=80"
                alt="Manufacturing operations"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-display text-lg md:text-xl font-semibold text-white leading-snug">
                Built alongside the teams that run production
              </p>
            </div>
            <div className="order-1 lg:order-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="p-7 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-accent">Mission</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-brand">From spreadsheets to certainty</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Give every team instant, comparable data and clear recommendations for every part they buy.
                </p>
              </div>
              <div className="p-7 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-accent">What we offer</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-brand">Research, comparison, recommendation</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Input a part number—gather, compare, and decide with explainable AI rankings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.22em]">Values</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand">What we build for</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="group relative h-80 rounded-2xl overflow-hidden ring-1 ring-white/10 card-hover"
              >
                <img
                  src={v.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/15" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-white leading-snug">{v.title}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{v.text}</p>
                </div>
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

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="relative h-72 lg:h-auto rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-xl shadow-slate-300/30">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80"
                alt="Team meeting"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">Contact us</p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-white leading-snug">
                  Book a 30-minute call with our team
                </h2>
                <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-md">
                  See a demo, discuss your categories and plants, and get straight answers on rollout.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-[#f8fafc] ring-1 ring-slate-200/80 p-7 md:p-10">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Work email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <a
                  href={CALENDLY_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors"
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
