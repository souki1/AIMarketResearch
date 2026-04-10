import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const resourceCategories = [
  {
    title: "Platform documentation",
    description: "API references, data models, and integration guides for sourcing stacks.",
    to: "#documentation",
  },
  {
    title: "Procurement playbooks",
    description: "Actionable guides for supplier qualification, RFQ optimization, and award governance.",
    to: "#playbooks",
  },
  {
    title: "Industry insights",
    description: "Manufacturing sourcing trends, risk outlooks, and category intelligence.",
    to: "#insights",
  },
  {
    title: "Customer support",
    description: "Implementation help, workflow enablement, and team onboarding resources.",
    to: "#support",
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

export default function ResourcesPage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-100 py-12 md:py-16 lg:py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Resources</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-3xl leading-tight">
            Learn, deploy, and scale sourcing intelligence
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">
            Documentation, playbooks, and stories from teams that run part-level research, vendor comparison, and governed awards at
            scale—plus the channels to get help when you need it.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((r) => (
              <a key={r.title} href={r.to} className="block p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow card-hover">
                <h2 className="font-display text-lg font-semibold text-brand">{r.title}</h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{r.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-accent font-medium text-sm">
                  Jump to section
                  <ChevronRightIcon className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="documentation" className="py-14 md:py-18 bg-white border-b border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Documentation</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">What teams read first</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Structured for IT, procurement operations, and category managers—so you can onboard without hunting through PDFs. Full API
            and security references are available under NDA for enterprise evaluations.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {docTopics.map((block) => (
              <div key={block.title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="font-display font-semibold text-brand">{block.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600 leading-relaxed">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0" aria-hidden>
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="playbooks" className="section-alt py-14 md:py-18 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Playbooks</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Procurement guides</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Practical patterns—not generic checklists—for teams that need repeatable sourcing decisions across plants and categories.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {playbooks.map((p) => (
              <div key={p.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display font-semibold text-brand">{p.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.summary}</p>
              </div>
            ))}
          </div>

          <div id="case-studies" className="mt-16 scroll-mt-24">
            <h3 className="font-display text-xl font-bold text-brand">Case study snapshots</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Illustrative outcomes from manufacturing sourcing programs. Detailed references available as part of enterprise
              diligence.
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {caseStudies.map((c) => (
                <div key={c.headline} className="rounded-xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{c.industry}</p>
                  <p className="mt-2 font-display font-semibold text-brand">{c.headline}</p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="py-14 md:py-18 bg-white border-b border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Blog &amp; insights</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">Latest articles</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Short reads on sourcing economics, governance, and enterprise rollout—no fluff, no vendor jargon walls.
          </p>
          <ul className="mt-10 divide-y divide-slate-100 border-t border-slate-100">
            {insights.map((post) => (
              <li key={post.title} className="py-6 first:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">{post.date}</p>
                    <p className="mt-1 font-display font-semibold text-brand text-lg">{post.title}</p>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">{post.blurb}</p>
                  </div>
                  <span className="text-sm font-medium text-accent shrink-0 sm:pt-6">Coming soon</span>
                </div>
              </li>
            ))}
          </ul>
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

      <section id="support" className="py-14 md:py-18 bg-white border-b border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Support</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-2">How to get help</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Whether you are in a pilot or full production, you should know where answers live and how urgent issues are handled.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {supportChannels.map((s) => (
              <div key={s.title} className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-display font-semibold text-brand">{s.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-600 max-w-3xl leading-relaxed">
            For security packs, DPAs, and SLA exhibits, see the{" "}
            <Link to="/enterprise" className="text-accent font-medium hover:underline">
              Enterprise
            </Link>{" "}
            page. For product depth, visit{" "}
            <Link to="/products" className="text-accent font-medium hover:underline">
              Products &amp; solutions
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-alt py-10 md:py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">Stay updated</h2>
          <p className="mt-2 text-slate-600 max-w-xl mx-auto leading-relaxed">
            Sourcing intelligence updates and procurement best practices in your inbox. We send sparingly—no daily blasts.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Work email"
              autoComplete="email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white text-brand placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button type="button" className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light whitespace-nowrap min-h-[44px]">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            By subscribing you agree to our communications policy. Unsubscribe anytime; we do not sell your email.
          </p>
        </div>
      </section>
    </div>
  );
}
