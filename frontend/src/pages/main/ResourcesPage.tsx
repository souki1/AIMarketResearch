import { Link } from "react-router-dom";
import { ArrowRightIcon, ReaderIcon, RocketIcon, TimerIcon } from "@radix-ui/react-icons";

const resourceCategories = [
  {
    title: "Platform documentation",
    description: "API references, data models, and integration guides for sourcing stacks.",
    to: "#documentation",
    tag: "Docs",
  },
  {
    title: "Procurement playbooks",
    description: "Supplier qualification, RFQ optimization, and award governance.",
    to: "#playbooks",
    tag: "Guides",
  },
  {
    title: "Industry insights",
    description: "Trends, risk outlooks, and category intelligence.",
    to: "#insights",
    tag: "Blog",
  },
  {
    title: "Customer support",
    description: "Implementation, enablement, and onboarding.",
    to: "#support",
    tag: "Help",
  },
  {
    title: "Technology & AI",
    description: "Models, governance, and explainability.",
    to: "#technology-ai",
    tag: "AI",
  },
  {
    title: "Upcoming AI",
    description: "Roadmap: scenarios, assistive workflows, and more.",
    to: "#upcoming-ai",
    tag: "Roadmap",
  },
];

const techAiPillars = [
  {
    title: "Grounded in your parts and quotes",
    detail:
      "Models rank and explain options using attributes you already care about—price, MOQ, lead time, landed cost assumptions, and plant rules—not generic web blurbs.",
  },
  {
    title: "Explainable recommendations",
    detail:
      "Shortlists and scores surface why one supplier or line ranks above another (factors, weights, and confidence). Teams can override or reject with a full audit trail.",
  },
  {
    title: "Enterprise-safe patterns",
    detail:
      "Role-based access, retention controls, and export paths align with how IT and legal expect vendor AI to run. Subprocessor and model-use terms are disclosed in enterprise agreements.",
  },
  {
    title: "Human-in-the-loop by design",
    detail:
      "Awards and PO handoff stay under your approvals. AI accelerates research and comparison; humans sign off on spend and exceptions.",
  },
];

const upcomingAiFeatures = [
  {
    title: "Conversational part research",
    summary:
      "Ask follow-up questions in context of a part or RFQ—refine constraints, compare scenarios, and pull rationale into the award record without retyping.",
    horizon: "In development",
    phase: "active" as const,
  },
  {
    title: "Scenario and “what-if” sourcing",
    summary:
      "Model duty, freight, or allocation changes across shortlisted suppliers and see impact on total landed cost and lead time before you commit.",
    horizon: "Planned",
    phase: "planned" as const,
  },
  {
    title: "Cross-plant anomaly and risk signals",
    summary:
      "Surface unusual price moves, lead-time drift, or concentration risk across plants and categories—tied to the same parts and suppliers you already track.",
    horizon: "Exploring",
    phase: "explore" as const,
  },
  {
    title: "Assistive RFQ and spec drafting",
    summary:
      "Generate first-pass line items and technical notes from part attributes and history, with review and edit before anything is sent externally.",
    horizon: "Planned",
    phase: "planned" as const,
  },
];

const docTopics = [
  {
    title: "Getting started",
    items: ["Workspace setup and roles", "Importing part catalogs and alternates", "Connecting SSO and user provisioning"],
  },
  {
    title: "Integrations",
    items: ["ERP and PLM data patterns", "REST and file-based exports", "Webhooks for award and PO handoff"],
  },
  {
    title: "Data & governance",
    items: ["Retention and export policies", "Audit trails for comparisons and awards", "Plant and category scoping"],
  },
];

const playbooks = [
  {
    title: "Supplier qualification at scale",
    summary: "Scorecards, documentation requests, and gate criteria you can reuse across plants and categories.",
  },
  {
    title: "RFQ to award in one workflow",
    summary: "How to structure line items, landed cost assumptions, and approval steps so finance can sign off faster.",
  },
  {
    title: "Multi-plant part governance",
    summary: "Normalize part numbers, manage alternates, and avoid duplicate sourcing decisions across sites.",
  },
];

const caseStudies = [
  {
    industry: "Automotive tier 1",
    headline: "Single source of truth for direct materials",
    outcome: "Consolidated part and quote data across four plants; reduced duplicate RFQs and shortened award cycle time.",
  },
  {
    industry: "Industrial equipment",
    headline: "Defensible awards for critical components",
    outcome: "Documented MOQ, lead time, and landed cost for every comparison—ready for audit and management review.",
  },
  {
    industry: "Electronics manufacturing",
    headline: "Faster responses to allocation and EOL risk",
    outcome: "Category teams use the same shortlist and rationale when switching suppliers or approving premiums.",
  },
];

const insights = [
  {
    title: "Why landed cost still breaks spreadsheets in 2026",
    date: "Mar 2026",
    blurb: "Duty, freight, and MOQ interact in ways that static tables miss—we outline a practical modeling approach.",
  },
  {
    title: "Explainable AI in sourcing: what buyers should ask vendors",
    date: "Feb 2026",
    blurb: "From feature weights to audit logs: questions that separate real decision support from black-box rankings.",
  },
  {
    title: "Category management in a multi-plant world",
    date: "Jan 2026",
    blurb: "Balancing central standards with plant-specific constraints without losing visibility.",
  },
  {
    title: "Security questionnaires: what procurement can prep before IT joins the call",
    date: "Dec 2025",
    blurb: "Encryption, identity, and subprocessors—aligned to how enterprise vendor reviews actually run.",
  },
];

const supportChannels = [
  {
    title: "Help center",
    detail: "Searchable articles on workflows, integrations, and account administration. Updated as the product evolves.",
  },
  {
    title: "Implementation & success",
    detail: "Named contacts for enterprise rollouts: pilot scope, data mapping, training, and go-live checkpoints.",
  },
  {
    title: "Severity-based support",
    detail: "Production-impacting issues are triaged with agreed response targets in your support exhibit—not a generic inbox SLA.",
  },
];

function horizonStyles(phase: "active" | "planned" | "explore") {
  if (phase === "active") return "bg-accent/15 text-accent border-accent/30";
  if (phase === "explore") return "bg-amber-500/10 text-amber-200 border-amber-500/25";
  return "bg-white/5 text-white/85 border-white/15";
}

export default function ResourcesPage() {
  return (
    <div className="resources-hub bg-[#eef1f4]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 42%, rgba(0,113,227,0.12) 100%), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_0%,rgba(0,113,227,0.25),transparent_55%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28 lg:py-32 min-h-[min(68vh,560px)] flex flex-col justify-end">
          <p className="font-display font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] text-white/90">
            Resources
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 max-w-4xl leading-[1.05] tracking-tight text-balance">
            The library for serious sourcing teams
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed text-pretty">
            Documentation, playbooks, AI principles, and roadmap—everything in one place to deploy Partsource with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#documentation"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-lg shadow-black/20 transition hover:bg-slate-100"
            >
              <ReaderIcon className="w-4 h-4" aria-hidden />
              Start with docs
            </a>
            <a
              href="#upcoming-ai"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              <RocketIcon className="w-4 h-4" aria-hidden />
              See AI roadmap
            </a>
          </div>
        </div>
      </section>

      {/* Sticky jump nav */}
      <nav
        className="sticky top-16 z-30 border-b border-slate-200/90 bg-[#eef1f4]/90 backdrop-blur-md supports-backdrop-filter:bg-[#eef1f4]/75"
        aria-label="Resources sections"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex gap-2 overflow-x-auto py-3.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {resourceCategories.map((r) => (
              <a
                key={r.title}
                href={r.to}
                className="group flex shrink-0 items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-brand shadow-sm transition hover:border-accent hover:shadow-md"
              >
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 group-hover:bg-accent/10 group-hover:text-accent">
                  {r.tag}
                </span>
                <span className="max-w-40 truncate sm:max-w-none">{r.title}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Documentation — bento */}
      <section id="documentation" className="scroll-mt-28 py-16 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-slate-200/90 pb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-slate-200/80 shadow-sm">
                <TimerIcon className="w-3.5 h-3.5" aria-hidden />
                Documentation
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-4 tracking-tight">What teams read first</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Structured for IT, procurement operations, and category managers. Full API and security references ship under NDA for enterprise evaluations.
              </p>
            </div>
            <Link to="/enterprise" className="text-sm font-semibold text-accent hover:underline shrink-0">
              Enterprise security &amp; legal →
            </Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5 rounded-3xl bg-white p-8 shadow-[0_1px_0_rgba(15,23,42,0.06),0_12px_40px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80">
              <p className="font-display text-sm font-semibold text-accent">{docTopics[0].title}</p>
              <ul className="mt-6 space-y-4">
                {docTopics[0].items.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
              {[docTopics[1], docTopics[2]].map((block) => (
                <div
                  key={block.title}
                  className="rounded-3xl bg-white/80 p-7 ring-1 ring-slate-200/70 backdrop-blur-sm transition hover:bg-white hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <p className="font-display text-sm font-semibold text-brand">{block.title}</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-600 leading-relaxed">
                    {block.items.map((item) => (
                      <li key={item} className="border-l-2 border-accent/30 pl-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology & AI */}
      <section id="technology-ai" className="scroll-mt-28 border-y border-slate-200/80 bg-white py-16 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Technology &amp; AI</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3">Intelligence that fits procurement reality</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Structured data from your systems plus models that assist—not replace—judgment. Evidence you can defend with finance and audit.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-slate-200/90 ring-1 ring-slate-200/90 sm:grid-cols-2">
            {techAiPillars.map((block, i) => (
              <div key={block.title} className="bg-[#f8f9fb] p-8 transition hover:bg-white">
                <span className="font-mono text-xs font-bold text-accent/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-brand">{block.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{block.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Subprocessors, encryption, and processing locations: see the{" "}
            <Link to="/enterprise" className="font-medium text-accent hover:underline">
              Enterprise
            </Link>{" "}
            page. Product AI behavior is documented for customers under NDA.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section id="upcoming-ai" className="section-alt scroll-mt-28 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-accent-light font-semibold text-xs uppercase tracking-[0.2em]">Roadmap</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3">Upcoming AI in the product</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Indicative only—priority follows pilots and customer feedback. No opaque automation on critical spend without your controls.
            </p>
          </div>

          <div className="mt-14 relative max-w-3xl">
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-linear-to-b from-accent via-white/20 to-white/10 md:left-[15px]" aria-hidden />
            <ul className="space-y-0">
              {upcomingAiFeatures.map((item, idx) => (
                <li key={item.title} className="relative pl-10 md:pl-12 pb-12 last:pb-0">
                  <span
                    className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-black text-[10px] font-bold text-white shadow-[0_0_0_4px_rgba(0,113,227,0.2)]"
                    aria-hidden
                  >
                    {idx + 1}
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm transition hover:bg-white/7">
                    <div className="flex flex-wrap items-center gap-3 gap-y-2">
                      <h3 className="font-display text-lg font-semibold text-brand">{item.title}</h3>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${horizonStyles(item.phase)}`}
                      >
                        {item.horizon}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-sm text-slate-600 max-w-xl">
            Want pilot access? Mention it on your{" "}
            <Link to="/company" className="font-medium text-accent-light hover:underline">
              Company
            </Link>{" "}
            demo or enterprise scoping call.
          </p>
        </div>
      </section>

      {/* Playbooks + case studies */}
      <section id="playbooks" className="scroll-mt-28 py-16 md:py-22 bg-[#eef1f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Playbooks</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-2">Procurement guides</h2>
              <p className="mt-3 text-slate-600 max-w-xl leading-relaxed">Patterns for repeatable decisions across plants—not generic checklists.</p>
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {playbooks.map((p, i) => (
              <article
                key={p.title}
                className="group relative flex flex-col rounded-3xl bg-white p-7 ring-1 ring-slate-200/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-300/40"
              >
                <span className="font-mono text-4xl font-bold text-slate-100 transition group-hover:text-accent/20">{i + 1}</span>
                <h3 className="font-display mt-4 text-lg font-semibold text-brand group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm text-slate-600 leading-relaxed">{p.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                  Read framework <ArrowRightIcon className="w-4 h-4" />
                </span>
              </article>
            ))}
          </div>

          <div id="case-studies" className="mt-20 scroll-mt-28">
            <h3 className="font-display text-2xl font-bold text-brand">Case study snapshots</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">Illustrative outcomes; detailed references available in enterprise diligence.</p>
            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              {caseStudies.map((c) => (
                <article
                  key={c.headline}
                  className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 p-7 text-white ring-1 ring-white/10"
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
                  <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-accent-light">{c.industry}</p>
                  <p className="relative mt-3 font-display text-lg font-semibold leading-snug">{c.headline}</p>
                  <p className="relative mt-4 text-sm text-white/75 leading-relaxed">{c.outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights — editorial */}
      <section id="insights" className="scroll-mt-28 py-16 md:py-22 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-slate-200 pb-10">
            <div>
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Blog &amp; insights</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-2">Latest articles</h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">Sourcing economics, governance, and rollout—concise reads for busy teams.</p>
          </div>

          <div className="mt-12 space-y-0">
            {insights.map((post, i) => (
              <article
                key={post.title}
                className={`grid gap-6 border-b border-slate-100 py-10 first:pt-4 md:grid-cols-[minmax(0,7rem)_1fr_auto] md:items-start md:gap-10 ${
                  i === 0 ? "bg-linear-to-r from-slate-50/80 to-transparent -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl border-b-0 mb-2" : ""
                }`}
              >
                <time className="font-mono text-sm text-slate-400 md:pt-1">{post.date}</time>
                <div className="min-w-0">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-brand leading-snug">{post.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{post.blurb}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 md:justify-self-end">Coming soon</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual break */}
      <section className="py-8 md:py-12 bg-[#eef1f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-4xl overflow-hidden ring-1 ring-slate-200/80 shadow-2xl shadow-slate-400/20">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80"
              alt="Procurement and operations team workshop"
              className="h-[200px] sm:h-[280px] md:h-[340px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
            <p className="absolute bottom-5 left-6 right-6 text-sm font-medium text-white/90 md:text-base">From research to award—one governed workflow.</p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="scroll-mt-28 py-16 md:py-22 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Support</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand mt-2">How to get help</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">Pilot or production—you should know where answers live and how incidents are triaged.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {supportChannels.map((s, i) => (
              <div
                key={s.title}
                className="relative rounded-3xl border border-slate-200/90 bg-[#f8f9fb] p-8 pt-12 transition hover:border-accent/30 hover:bg-white"
              >
                <span className="absolute top-6 left-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-lg font-bold text-accent shadow-sm ring-1 ring-slate-200/80">
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold text-brand">{s.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-slate-600">
            Security packs and SLAs:{" "}
            <Link to="/enterprise" className="font-semibold text-accent hover:underline">
              Enterprise
            </Link>
            {" · "}
            <Link to="/products" className="font-semibold text-accent hover:underline">
              Products &amp; solutions
            </Link>
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-alt py-14 md:py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/3 p-8 md:p-12 backdrop-blur-md md:flex md:items-center md:justify-between md:gap-12">
            <div className="max-w-lg">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand">Stay updated</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Sourcing intelligence and best practices—sparingly. No daily blasts.
              </p>
            </div>
            <div className="mt-8 md:mt-0 w-full max-w-md shrink-0 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Work email"
                  autoComplete="email"
                  className="flex-1 min-w-0 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-light"
                />
                <button
                  type="button"
                  className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition min-h-[44px] shrink-0"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Unsubscribe anytime. We do not sell your email.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
