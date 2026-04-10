import { Link } from "react-router-dom";
import { CALENDLY_DEMO_URL } from "../../constants/booking";

/** Short blurbs shown below the hero image—not in the hero itself */
const outcomes = [
  { title: "One system, every plant", detail: "Shared part data and award history across sites." },
  { title: "Defensible decisions", detail: "Quotes, landed cost, and approvals on the record." },
  { title: "Faster sourcing cycles", detail: "From research to PO-ready output in one workflow." },
];

const productModules = [
  {
    title: "Part & supplier intelligence",
    summary: "Single source of truth for the parts you buy repeatedly.",
    bullets: [
      "Normalize part numbers and attributes across ERP and legacy catalogs.",
      "Track alternates, plant-specific qualifiers, and category ownership.",
      "Enrich from approved internal and external sources—your rules, your audit trail.",
    ],
  },
  {
    title: "Comparison, cost & award",
    summary: "Apples-to-apples quotes with economics your finance team can stand behind.",
    bullets: [
      "Side-by-side matrix: unit price, MOQ, lead time, landed cost (duty, freight models).",
      "AI-ranked shortlist with explainable factors—not a black box.",
      "Export award rationale and line detail for Coupa, SAP Ariba, or internal PO workflows.",
    ],
  },
  {
    title: "Enterprise delivery",
    summary: "How we run alongside your identity stack and procurement org model.",
    bullets: [
      "SAML SSO and role-based access by plant, category, or cost center.",
      "API and file-based integration patterns for ERP, PLM, and supplier data feeds.",
      "Environments for pilot vs. production; change controls aligned to your release calendar.",
    ],
  },
];

const securityRows = [
  {
    topic: "Encryption",
    detail: "TLS for data in transit; encryption at rest for customer content stored in the service. Key management practices documented in the security exhibit.",
  },
  {
    topic: "Access & identity",
    detail: "SSO via SAML 2.0, optional SCIM for user lifecycle, and least-privilege roles mapped to how your teams actually source.",
  },
  {
    topic: "Audit & retention",
    detail: "Configurable retention aligned to policy; export and deletion workflows described in the DPA. Activity suitable for internal and external audit sampling.",
  },
  {
    topic: "Vendor risk",
    detail: "Subprocessor list, annual review cadence, and breach-notification timelines committed in enterprise agreements—not ad hoc email.",
  },
];

const implementationPhases = [
  {
    step: "01",
    title: "Discovery & design",
    text: "Align on plants, categories, data sources, and success metrics. Produce a joint integration and rollout plan with named owners on both sides.",
  },
  {
    step: "02",
    title: "Pilot",
    text: "Limited users and part families in a non-production or scoped production environment. Validate landed-cost rules, approvals, and reporting before broad rollout.",
  },
  {
    step: "03",
    title: "Rollout",
    text: "Wave by site or category with training materials and office hours. Configuration changes tracked; go-live dates coordinated with your change board.",
  },
  {
    step: "04",
    title: "Steady state",
    text: "Named customer success contact, regular health checks, and a path to QBRs and roadmap input—captured in your support exhibit.",
  },
];

const severityDefs = [
  { code: "P1", meaning: "Production sourcing or PO workflow blocked for a defined set of users or plants." },
  { code: "P2", meaning: "Major feature impaired; workaround exists but is burdensome." },
  { code: "P3", meaning: "Minor defect or question; normal business-hours handling." },
  { code: "P4", meaning: "Enhancement, documentation, or general guidance." },
];

const slaRows = [
  {
    area: "Uptime (application)",
    detail:
      "Enterprise agreements typically include a monthly uptime target (for example 99.9%), measured per the SLA exhibit. Planned maintenance is excluded when announced in advance.",
  },
  {
    area: "First response (business hours)",
    detail:
      "P1: initial response targeted within one hour. P2: same business day. P3/P4: within agreed windows. Exact times, regions, and holidays are fixed in your support exhibit—not on this marketing page.",
  },
  {
    area: "Maintenance & releases",
    detail:
      "Scheduled windows communicated at least 72 hours ahead where possible; emergency security patches as needed with notice through your designated channel.",
  },
  {
    area: "Customer success",
    detail:
      "Named contact for enterprise accounts; quarterly business reviews and an annual roadmap session are standard in full enterprise packages unless otherwise agreed.",
  },
];

const contractDocs = [
  {
    title: "Master services agreement (MSA)",
    what: "Governs license, acceptable use, confidentiality, limitation of liability, and indemnities.",
    who: "Signed once; amended only by order form or written amendment.",
  },
  {
    title: "Order form",
    what: "Commercial truth: SKUs (modules), user or site quantities, subscription term, fees, invoicing, and auto-renewal / notice to cancel.",
    who: "Procurement and finance; references exhibits below.",
  },
  {
    title: "Data processing addendum (DPA)",
    what: "Roles (controller/processor), subprocessors, cross-border transfers, retention, and data subject request handling.",
    who: "Privacy and security stakeholders; often required before production data.",
  },
  {
    title: "Security exhibit",
    what: "Technical and organizational measures, encryption summary, incident response, and customer responsibilities (e.g. SSO configuration).",
    who: "IT security and GRC reviewers.",
  },
  {
    title: "SLA & support exhibit",
    what: "Uptime calculation, severity definitions, response and restoration targets, and service credits if contracted.",
    who: "IT operations and category leadership.",
  },
  {
    title: "Statement of work (SOW) — optional",
    what: "Fixed-fee or time-and-materials work: data migration, custom integrations, or training beyond standard enablement.",
    who: "Signed when you buy professional services; separate from pure subscription.",
  },
];

const capabilities = [
  { title: "Identity and access", description: "SAML SSO, SCIM provisioning, and granular roles aligned to plants, categories, and spend thresholds." },
  { title: "Implementation support", description: "Named onboarding lead, configuration workshops, and cutover planning with your project office." },
  { title: "Enterprise reliability", description: "Architected for high availability; enterprise SLAs and support tiers documented—not handshake-only." },
  { title: "Data control", description: "Retention, export, and deletion aligned to your policies; subprocessors disclosed and updated per contract." },
  { title: "Security controls", description: "Encryption, logging, and access policies suitable for vendor risk questionnaires and audits." },
  { title: "Governance & approvals", description: "Structured workflows so awards, escalations, and exceptions leave a clear evidence trail." },
];

export default function EnterprisePage() {
  return (
    <div>
      <section
        className="relative w-full overflow-hidden border-b border-slate-200/90 bg-slate-100 bg-cover bg-center min-h-[min(88vh,720px)] md:min-h-[min(90vh,800px)] lg:min-h-[min(92vh,880px)] flex flex-col items-center justify-center"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 110% 70% at 50% -15%, rgba(3, 105, 161, 0.14), transparent 52%)",
            "linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 252, 0.9) 42%, rgba(241, 245, 249, 0.82) 100%)",
            "url('https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1920&q=80')",
          ].join(", "),
          backgroundColor: "#f1f5f9",
        }}
      >
        <div className="relative z-1 w-full max-w-none mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 py-24 md:py-28 lg:py-32">
          <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-center text-center">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-[0.18em]">
              Enterprise
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-brand mt-4 w-full max-w-6xl mx-auto leading-[1.12] tracking-tight text-balance">
              Sourcing intelligence for multi-plant manufacturing
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 w-full max-w-4xl mx-auto leading-relaxed text-pretty">
              Research parts, compare suppliers, and document awards—with identity, SLAs, and contracts your IT and legal teams can review.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors min-h-[44px] w-full sm:w-auto"
              >
                Book a demo
              </a>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-semibold text-brand border-2 border-slate-200 hover:border-accent hover:bg-slate-50 transition-colors min-h-[44px] w-full sm:w-auto"
              >
                Product tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-2 md:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1400&q=80"
            alt="Manufacturing floor and enterprise operations"
            className="w-full h-[220px] md:h-[300px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {outcomes.map((o) => (
              <li key={o.title} className="text-center sm:text-left">
                <p className="font-display font-semibold text-brand text-sm">{o.title}</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">{o.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">What you deploy</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Product scope for enterprise</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Three capability layers work together: intelligence on parts and suppliers, economic comparison and awards, and enterprise-grade delivery around your identity and data boundaries.
            </p>
          </div>
          <div className="mt-12 space-y-10 max-w-4xl">
            {productModules.map((m) => (
              <div key={m.title} className="border-l-4 border-accent pl-5 sm:pl-6">
                <h3 className="font-display text-xl font-semibold text-brand">{m.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-700">{m.summary}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600 leading-relaxed list-disc pl-5 marker:text-accent">
                  {m.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Security &amp; trust</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">What security and legal teams review first</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We expect diligence questionnaires, vendor risk reviews, and DPAs before you load production spend data. The items below are addressed in standard enterprise documentation; specifics follow your exhibit package.
            </p>
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {securityRows.map((row) => (
              <div key={row.topic} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <dt className="font-display font-semibold text-brand">{row.topic}</dt>
                <dd className="mt-2 text-sm text-slate-600 leading-relaxed">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Implementation</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">From contract signature to steady state</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Enterprise rollouts are phased so plants are not forced onto half-configured workflows. Duration depends on data complexity and integration depth—your SOW spells out milestones.
            </p>
          </div>
          <ol className="mt-10 space-y-6 max-w-4xl">
            {implementationPhases.map((p) => (
              <li key={p.step} className="flex gap-4">
                <span className="font-mono text-xs font-bold text-accent shrink-0 pt-1 w-8">{p.step}</span>
                <div>
                  <p className="font-display font-semibold text-brand">{p.title}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-alt py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">SLA &amp; support</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Service levels and severity</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Production incidents are triaged by priority. Definitions below are illustrative; your executed SLA exhibit defines measurable clocks, coverage hours, and any credits.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <caption className="sr-only">Severity definitions</caption>
                <colgroup>
                  <col style={{ width: "5.5rem" }} />
                  <col />
                </colgroup>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th scope="col" className="px-4 py-3 font-display font-semibold text-brand whitespace-nowrap">
                      Code
                    </th>
                    <th scope="col" className="px-4 py-3 font-display font-semibold text-brand min-w-0">
                      Meaning (typical)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {severityDefs.map((s) => (
                    <tr key={s.code}>
                      <th scope="row" className="px-4 py-3 font-mono font-semibold text-brand align-top whitespace-nowrap">
                        {s.code}
                      </th>
                      <td className="px-4 py-3 text-slate-600 min-w-0 wrap-break-word">{s.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-xl text-left text-sm border-collapse">
                <caption className="sr-only">Enterprise SLA summary</caption>
                <colgroup>
                  <col style={{ width: "14rem" }} />
                  <col />
                </colgroup>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th scope="col" className="px-4 py-3.5 font-display font-semibold text-brand align-top">
                      Area
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-display font-semibold text-brand align-top min-w-0">
                      Typical enterprise commitment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slaRows.map((row) => (
                    <tr key={row.area} className="align-top">
                      <th scope="row" className="px-4 py-4 font-medium text-slate-800 min-w-0 wrap-break-word">
                        {row.area}
                      </th>
                      <td className="px-4 py-4 text-slate-600 leading-relaxed min-w-0 wrap-break-word">{row.detail}</td>
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
          <div className="max-w-3xl">
            <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Commercial &amp; legal</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Documents that make up the deal</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Most customers consolidate on a single MSA and attach order-specific terms. Below is the usual stack—your counsel receives redlines against our standard package.
            </p>
          </div>

          <div className="mt-10 space-y-8 max-w-4xl">
            {contractDocs.map((doc) => (
              <div key={doc.title} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <h3 className="font-display font-semibold text-lg text-brand">{doc.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  <span className="font-medium text-slate-800">Covers: </span>
                  {doc.what}
                </p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  <span className="font-medium text-slate-800">Who usually reviews: </span>
                  {doc.who}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-2">Platform capabilities</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
            Capabilities below map to how enterprise IT, procurement, and operations evaluate vendor software—not a feature checklist, but the outcomes each area enables.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <div key={c.title} className="p-6 rounded-xl bg-white border border-slate-100 card-hover">
                <h3 className="font-display font-semibold text-brand">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-slate-500">Due diligence &amp; next step</p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-brand mt-3 max-w-xl mx-auto">
            Need the exhibit package or a security questionnaire?
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            We share subprocessors, policy summaries, and draft MSAs under NDA. Schedule a call to align on your timeline, plants, and procurement stack.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light"
            >
              Schedule with our team
            </a>
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-brand border-2 border-slate-200 hover:bg-slate-50"
            >
              Enterprise scoping call
            </a>
          </div>
          <p className="mt-8 text-xs text-slate-500 max-w-2xl mx-auto">
            Nothing on this page amends or replaces a signed agreement. Availability of specific SLAs, regions, or deployment models may vary by order form.
          </p>
        </div>
      </section>
    </div>
  );
}
