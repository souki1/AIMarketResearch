import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ChatBubbleIcon,
  CheckCircledIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import Seo from "../../components/Seo";

const outcomes = [
  { title: "AI agents on every workflow", detail: "Research, compare, risk-check, and explain—situation by situation." },
  { title: "Security your CISO can sign", detail: "SSO, encryption, audit trails, and diligence under NDA." },
  { title: "Multi-plant, one governed stack", detail: "Same platform from pilot plant to global rollout." },
];

const sourcingAgents: {
  situation: string;
  agent: string;
  does: string;
  Icon: typeof MagnifyingGlassIcon;
}[] = [
  {
    situation: "New part inquiry",
    agent: "Research agent",
    does: "Pulls OEM crosses, aftermarket alternates, and supplier catalogs—normalizes specs before a buyer opens email.",
    Icon: MagnifyingGlassIcon,
  },
  {
    situation: "Line-down or expedite",
    agent: "Alternate agent",
    does: "Surfaces in-stock alternates, faster lanes, and MOQ-friendly options ranked by lead time and landed cost.",
    Icon: RocketIcon,
  },
  {
    situation: "Award under scrutiny",
    agent: "Rationale agent",
    does: "Drafts explainable shortlists with price, logistics, and supplier signals—ready for category and plant approval.",
    Icon: ChatBubbleIcon,
  },
  {
    situation: "Multi-plant governance",
    agent: "Policy agent",
    does: "Checks plant rules, approved vendor lists, and category caps before an award leaves the workspace.",
    Icon: LockClosedIcon,
  },
];

const productModules: { title: string; summary: string; bullets: string[]; image: string }[] = [
  {
    title: "Agentic research layer",
    summary: "Autonomous part intelligence across your sources.",
    bullets: ["Multi-source OEM & aftermarket pulls", "Context-aware alternate discovery", "Human-in-the-loop review gates"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Comparison & award workspace",
    summary: "Agents assist; your team decides.",
    bullets: ["Landed cost & logistics in one matrix", "Explainable AI rankings with audit trail", "Exportable approval packets"],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Enterprise control plane",
    summary: "Identity, APIs, environments—IT-grade delivery.",
    bullets: ["SAML · SCIM · RBAC by plant/category", "Pilot vs production environments", "API & ERP handoff patterns"],
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=80",
  },
];

const securityRows = [
  {
    topic: "Encryption & transport",
    detail: "TLS 1.2+ in transit; AES-256 at rest. Key management and rotation described in the security exhibit.",
    Icon: LockClosedIcon,
  },
  {
    topic: "Identity & access",
    detail: "SAML 2.0 SSO, optional SCIM provisioning, least-privilege RBAC scoped to plants, categories, and roles.",
    Icon: PersonIcon,
  },
  {
    topic: "Audit & retention",
    detail: "Activity logs for research, comparisons, and awards. Retention, export, and deletion per your DPA.",
    Icon: CheckCircledIcon,
  },
  {
    topic: "AI data handling",
    detail: "Customer data is not used to train shared models without contract consent. Inference logs available for review.",
    Icon: ChatBubbleIcon,
  },
  {
    topic: "Subprocessors & residency",
    detail: "Current subprocessor list with change notification. Region and data-residency options on enterprise orders.",
    Icon: MagnifyingGlassIcon,
  },
  {
    topic: "Diligence package",
    detail: "Security questionnaire, pen-test summary, SOC 2 Type II report (where available), and IR playbook under NDA.",
    Icon: RocketIcon,
  },
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
    title: "Sourcing agents",
    description: "Research, alternates, rationale, and policy—per situation.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Identity & access",
    description: "SSO, SCIM, plant/category scopes.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1100&q=80",
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
    description: "Retention, export, subprocessors, AI handling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Governance",
    description: "Approval trails for awards & agent actions.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80",
  },
];

export default function EnterprisePage() {
  return (
    <div>
      <Seo
        title="Enterprise — Security, Integration & Deployment | Partsource"
        description="Enterprise Partsource: AI agents for every sourcing situation, enterprise security and SSO, governed multi-plant rollout, and IT-grade SLAs for manufacturing procurement."
        canonicalPath="/enterprise"
      />
      <section
        className="relative overflow-hidden border-b border-slate-200/80"
        aria-labelledby="enterprise-hero-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.78) 45%, rgba(0,113,227,0.18) 100%), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=80')",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_90%_0%,rgba(41,151,255,0.22),transparent_55%)] pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28 lg:py-32 min-h-[min(68vh,580px)] flex flex-col justify-end">
          <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white/85">Enterprise</p>
          <h1
            id="enterprise-hero-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 max-w-4xl leading-[1.05] tracking-tight text-balance"
          >
            AI agents for every sourcing situation —{" "}
            <span className="text-accent-light">with enterprise security built in</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            Partsource deploys specialized agents that research parts, compare suppliers, and explain awards—while your IT team gets SSO, audit trails, DPAs, and contracted SLAs across plants.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-lg shadow-black/25 transition hover:bg-slate-100 min-h-[44px]"
            >
              Book enterprise scoping
              <ArrowRightIcon className="w-4 h-4" aria-hidden />
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 min-h-[44px]"
            >
              Product tour
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="grid sm:grid-cols-3 gap-8">
            {outcomes.map((o) => (
              <li key={o.title} className="border-l-2 border-accent/30 pl-5">
                <p className="font-display font-semibold text-brand">{o.title}</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{o.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface border-b border-slate-200/90" aria-labelledby="enterprise-agents-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-start">
            <div>
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.22em]">Agentic sourcing</p>
              <h2 id="enterprise-agents-heading" className="mt-2 font-display text-3xl sm:text-4xl font-bold text-brand leading-tight text-balance">
                An agent for the moment—not a generic chatbot
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-xl">
                Each workflow triggers the right agent: research when a part lands, alternates when the line is at risk, rationale when approvals need defending. Your team stays in control—agents do the heavy lifting.
              </p>
              <p className="mt-4 text-sm text-slate-500 max-w-xl leading-relaxed">
                All agent actions are logged, reviewable, and scoped by role. No silent auto-awards without your governance rules.
              </p>
            </div>

            <ul className="space-y-4">
              {sourcingAgents.map(({ situation, agent, does, Icon }) => (
                <li
                  key={agent}
                  className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-accent/30 hover:shadow-md"
                >
                  <span className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{situation}</p>
                    <h3 className="mt-1 font-display text-lg font-bold text-brand">{agent}</h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{does}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Platform</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Agents, workspace, and control plane</h2>
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

      <section className="section-alt py-16 md:py-24" aria-labelledby="enterprise-security-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-start">
            <div>
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.22em]">Security &amp; trust</p>
              <h2 id="enterprise-security-heading" className="mt-2 font-display text-3xl sm:text-4xl font-bold text-brand leading-tight">
                Controls your security team can evaluate
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
                Full diligence package under NDA—questionnaires, exhibits, and subprocessors. Summarized below; executed agreements control.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <CheckCircledIcon className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden />
                  <span>Separate pilot and production environments</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircledIcon className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden />
                  <span>Role-based access by plant, category, and function</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircledIcon className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden />
                  <span>Agent activity logged for audit and sampling</span>
                </li>
              </ul>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              {securityRows.map(({ topic, detail, Icon }) => (
                <div key={topic} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <dt className="flex items-center gap-2 font-display font-semibold text-brand">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {topic}
                  </dt>
                  <dd className="mt-3 text-sm text-slate-600 leading-relaxed">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
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
