import { Link } from "react-router-dom";
import { CALENDLY_DEMO_URL } from "../../constants/booking";

const outcomes = [
  { title: "One stack", detail: "Parts & awards across plants." },
  { title: "Defensible file", detail: "Quotes, landed cost, approvals." },
  { title: "Faster cycles", detail: "Research → PO in one flow." },
];

const productModules: { title: string; summary: string; bullets: string[]; image: string }[] = [
  {
    title: "Part & supplier intelligence",
    summary: "Normalize OEM / aftermarket data once.",
    bullets: ["ERP & catalog crosswalk", "Alternates & plant rules"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Comparison & award",
    summary: "Price + logistics in one matrix.",
    bullets: ["Landed cost models", "Explainable AI shortlist"],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Enterprise delivery",
    summary: "Identity, APIs, your release calendar.",
    bullets: ["SAML · SCIM · RBAC", "Pilot vs prod environments"],
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=80",
  },
];

const securityRows = [
  { topic: "Encryption", detail: "TLS in transit; encryption at rest — details in security exhibit." },
  { topic: "Identity", detail: "SAML 2.0, optional SCIM, least-privilege roles." },
  { topic: "Audit", detail: "Retention & export per DPA; activity suitable for sampling." },
  { topic: "Subprocessors", detail: "Listed & reviewed; enterprise agreement timelines." },
];

const implementationPhases = [
  { step: "01", title: "Discover", text: "Plants, categories, integrations." },
  { step: "02", title: "Pilot", text: "Scoped users & part families." },
  { step: "03", title: "Roll", text: "Waves with training & cutover." },
  { step: "04", title: "Run", text: "CSM, health checks, QBR path." },
];

const severityDefs = [
  { code: "P1", meaning: "Sourcing or PO blocked for defined users/plants." },
  { code: "P2", meaning: "Major impairment; workaround exists." },
  { code: "P3", meaning: "Minor defect; business hours." },
  { code: "P4", meaning: "Enhancement or guidance." },
];

const slaRows = [
  {
    area: "Uptime",
    detail: "Monthly target (e.g. 99.9%) per SLA exhibit; planned maintenance excluded when announced.",
  },
  {
    area: "First response",
    detail: "P1 ~1 hr · P2 same day · P3/P4 per window — exact clocks in your exhibit.",
  },
  {
    area: "Releases",
    detail: "72h notice where possible; emergency patches via your channel.",
  },
  {
    area: "Success",
    detail: "Named contact; QBR cadence in full enterprise packages.",
  },
];

const contractDocs = [
  { title: "MSA", what: "License, use, confidentiality, liability." },
  { title: "Order form", what: "SKUs, seats/sites, term, fees." },
  { title: "DPA", what: "Roles, subprocessors, retention." },
  { title: "Security exhibit", what: "TOMs, encryption, IR." },
  { title: "SLA / support", what: "Uptime, severity, credits." },
  { title: "SOW (optional)", what: "Migration, integrations, training." },
];

const capabilities = [
  {
    title: "Identity & access",
    description: "SSO, SCIM, plant/category scopes.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Rollout",
    description: "Named onboarding & cutover planning.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Reliability",
    description: "HA architecture; contracted SLAs.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Data control",
    description: "Retention, export, subprocessors.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Security",
    description: "Questionnaire-ready controls.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Governance",
    description: "Approval trails for awards & exceptions.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80",
  },
];

export default function EnterprisePage() {
  return (
    <div>
      <section
        className="relative w-full overflow-hidden border-b border-slate-200/40 min-h-[min(78vh,760px)] flex flex-col items-center justify-center"
        aria-labelledby="enterprise-hero-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=80')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 100% 65% at 100% 0%, rgba(0,113,227,0.32), transparent 55%)",
              "linear-gradient(120deg, rgba(5,9,20,0.94) 0%, rgba(8,15,30,0.82) 55%, rgba(0,30,80,0.55) 100%)",
            ].join(", "),
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-24 md:py-28 text-center">
          <p className="font-display text-accent-light font-semibold text-xs sm:text-sm uppercase tracking-[0.22em]">Enterprise</p>
          <h1
            id="enterprise-hero-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 leading-[1.05] tracking-tight text-balance"
          >
            Multi-plant parts intelligence — with IT-grade delivery
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            SSO, SLAs, DPAs — same platform your buyers use for OEM, aftermarket, price, and logistics.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-brand bg-white hover:bg-slate-100 shadow-lg shadow-black/30 min-h-[48px]"
            >
              Book enterprise scoping
            </a>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 min-h-[48px]"
            >
              Product tour
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2000&q=80"
              alt=""
              className="w-full h-[220px] md:h-[320px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">Supply chain reality</p>
              <p className="mt-1 font-display text-xl md:text-2xl font-bold text-white">Price, freight, lead time — governed in one system</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="grid sm:grid-cols-3 gap-8">
            {outcomes.map((o) => (
              <li key={o.title}>
                <p className="font-display font-semibold text-brand">{o.title}</p>
                <p className="mt-1 text-sm text-slate-600">{o.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Scope</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">What you deploy</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {productModules.map((m) => (
              <div key={m.title} className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 bg-white shadow-sm flex flex-col">
                <div className="relative h-40">
                  <img src={m.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-semibold text-brand">{m.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{m.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-accent">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand">Security &amp; trust — snapshot</h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl">Full diligence package under NDA; items below are summarized.</p>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {securityRows.map((row) => (
              <div key={row.topic} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="font-display font-semibold text-brand">{row.topic}</dt>
                <dd className="mt-2 text-sm text-slate-600">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand">Rollout</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {implementationPhases.map((p) => (
              <div key={p.step} className="rounded-xl border border-slate-200 p-5 bg-slate-50/80">
                <span className="font-mono text-xs font-bold text-accent">{p.step}</span>
                <p className="mt-2 font-display font-semibold text-brand">{p.title}</p>
                <p className="mt-2 text-sm text-slate-600">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand">SLA &amp; severity</h2>
          <p className="mt-2 text-sm text-slate-600 mb-6">Illustrative — executed exhibit controls.</p>
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Severity definitions</caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 font-display font-semibold text-brand">Code</th>
                    <th className="px-4 py-3 font-display font-semibold text-brand">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {severityDefs.map((s) => (
                    <tr key={s.code}>
                      <th className="px-4 py-3 font-mono font-semibold text-brand">{s.code}</th>
                      <td className="px-4 py-3 text-slate-600">{s.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-xl">
                <caption className="sr-only">SLA summary</caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 font-display font-semibold text-brand">Area</th>
                    <th className="px-4 py-3 font-display font-semibold text-brand">Typical commitment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slaRows.map((row) => (
                    <tr key={row.area}>
                      <th className="px-4 py-3 font-medium text-slate-800 align-top">{row.area}</th>
                      <td className="px-4 py-3 text-slate-600">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand">Commercial stack</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contractDocs.map((doc) => (
              <div key={doc.title} className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-display font-semibold text-brand">{doc.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{doc.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Capabilities</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-brand">What enterprise teams evaluate</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c) => (
              <div key={c.title} className="group relative h-64 rounded-2xl overflow-hidden ring-1 ring-white/10 card-hover">
                <img
                  src={c.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display font-semibold text-white">{c.title}</h3>
                  <p className="mt-1 text-sm text-white/85">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-t border-slate-100 text-center px-4">
        <p className="text-sm font-medium text-slate-500">Diligence</p>
        <h2 className="font-display text-xl font-bold text-brand mt-2">Exhibit package &amp; questionnaires</h2>
        <p className="mt-3 text-sm text-slate-600 max-w-lg mx-auto">Under NDA. Align plants, stack, and timeline on a single call.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={CALENDLY_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-light"
          >
            Schedule with us
          </a>
          <Link to="/company" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-brand border-2 border-slate-200 hover:bg-slate-50">
            Contact
          </Link>
        </div>
        <p className="mt-8 text-[11px] text-slate-500 max-w-xl mx-auto">
          Nothing here replaces a signed agreement. SLAs and regions vary by order form.
        </p>
      </section>
    </div>
  );
}
