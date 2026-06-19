import { Link } from "react-router-dom";
import { ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import Seo from "../../components/Seo";

/** Verified Unsplash URLs (404 IDs removed) */
const IMG = {
  hero: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=2000&q=85",
  docs: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1400&h=900&q=85",
  guides: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&h=900&q=85",
  support: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1400&h=900&q=85",
  insights: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&h=900&q=85",
  trustWide: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85",
  ai: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600&q=85",
  readA: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&h=900&q=85",
  readB: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&h=900&q=85",
  readC: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&h=900&q=85",
  cta: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2000&q=85",
} as const;

const libraryItems = [
  {
    num: "01",
    label: "Integration",
    title: "API & authentication",
    desc: "Webhooks, exports, sandbox vs production—full pack under NDA.",
    href: "/enterprise",
    image: IMG.docs,
    imageAlt: "Server room and cloud infrastructure for API integration",
    accent: "border-teal-500",
  },
  {
    num: "02",
    label: "Playbooks",
    title: "Sourcing workflows",
    desc: "RFQ patterns, landed cost models, multi-plant award governance.",
    href: "/products",
    image: IMG.guides,
    imageAlt: "Team workshop reviewing sourcing playbook materials",
    accent: "border-violet-500",
  },
  {
    num: "03",
    label: "Support",
    title: "SLAs & severity",
    desc: "P1–P4 routing, response clocks, and customer success cadence.",
    href: "/enterprise",
    image: IMG.support,
    imageAlt: "Customer success team collaborating on support response",
    accent: "border-amber-500",
  },
  {
    num: "04",
    label: "Insights",
    title: "Price & logistics briefs",
    desc: "Short reads on total cost, freight lanes, and award prep.",
    href: "#reads",
    image: IMG.insights,
    imageAlt: "Analytics dashboard with pricing and logistics metrics",
    accent: "border-rose-500",
  },
];

const trustColumns = [
  {
    title: "Current supplier intelligence",
    body: "Catalogs, quotes, and lane data refresh on governed schedules—not quarterly spreadsheet dumps.",
    points: ["Multi-source ingestion", "Normalization & dedupe", "Change alerts"],
  },
  {
    title: "Information kept safe",
    body: "TLS in transit, encryption at rest, tenant isolation. TOMs and IR detail in the security exhibit.",
    points: ["TLS 1.2+", "At-rest encryption", "Regional residency"],
  },
  {
    title: "Access you can audit",
    body: "SAML SSO, optional SCIM, least-privilege roles, and approval trails exportable per DPA.",
    points: ["SSO · SCIM · RBAC", "Award sign-off", "Activity logs"],
  },
];

const cadence = [
  { k: "Catalog sync", v: "Daily" },
  { k: "Quote refresh", v: "4–6 hrs" },
  { k: "Lane updates", v: "Weekly" },
  { k: "Patch notice", v: "72h" },
];

const aiRules = [
  { t: "Grounded to your parts", d: "Recommendations use your attributes—not generic web snippets." },
  { t: "Explainable to finance", d: "Ranking weights you can defend in review." },
  { t: "Human in the loop", d: "Awards require your rules and approvers." },
];

const reads = [
  {
    title: "When unit price lies",
    sub: "Landed cost checklist for plant buyers",
    img: IMG.readA,
    imgAlt: "Warehouse logistics and freight lanes",
    span: "lg:col-span-2 lg:row-span-2",
    minH: "min-h-[280px] lg:min-h-[376px]",
  },
  {
    title: "Aftermarket crosses that survive audit",
    sub: "OEM alternates without compliance risk",
    img: IMG.readB,
    imgAlt: "Precision manufacturing components",
    span: "",
    minH: "min-h-[240px]",
  },
  {
    title: "Security review in two weeks",
    sub: "What to prep before IT asks",
    img: IMG.readC,
    imgAlt: "Procurement team planning security review",
    span: "",
    minH: "min-h-[240px]",
  },
];

export default function ResourcesPage() {
  return (
    <div className="resources-v2 bg-[#faf9f7] text-brand">
      <Seo
        title="Resources — Docs, Guides & Sourcing Playbooks | Partsource"
        description="Integration and API notes, sourcing playbooks, and diligence resources for OEM and aftermarket procurement teams adopting Partsource."
        canonicalPath="/resources"
      />

      {/* Hero — light editorial split */}
      <section
        className="relative border-b border-black/8 overflow-hidden"
        aria-labelledby="resources-hero"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[min(88vh,780px)]">
            <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-16 lg:py-20 order-2 lg:order-1">
              <div className="resources-v2-rule w-12 h-1 bg-accent mb-8" aria-hidden />
              <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                Resources
              </p>
              <h1
                id="resources-hero"
                className="font-display text-[2.75rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.02] tracking-tight mt-4 text-balance"
              >
                The knowledge base for serious sourcing teams
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
                Docs, playbooks, and trust materials—and how we keep supplier data current and your information protected.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#library"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light transition"
                >
                  Browse library
                  <ChevronRightIcon className="w-4 h-4" aria-hidden />
                </a>
                <a
                  href="#trust"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-brand hover:border-accent hover:text-accent transition"
                >
                  Trust &amp; data safety
                </a>
              </div>
            </div>
            <div className="relative min-h-[320px] lg:min-h-0 order-1 lg:order-2">
              <img
                src={IMG.hero}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#faf9f7] via-[#faf9f7]/20 to-transparent lg:via-transparent lg:to-black/10" />
              <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-8 lg:bottom-10 lg:max-w-xs rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-xl ring-1 ring-black/5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Under the hood</p>
                <p className="mt-2 font-display text-lg font-bold leading-snug">
                  Live pipelines · encrypted · tenant-scoped
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library — editorial list with thumbnails */}
      <section id="library" className="scroll-mt-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Library</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight">
                Four paths in
              </h2>
            </div>
            <p className="max-w-sm text-slate-600 leading-relaxed md:text-right">
              Deep technical packs ship under NDA. Start with the track that matches your eval stage.
            </p>
          </div>

          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {libraryItems.map((item) => (
              <Link
                key={item.num}
                to={item.href}
                className="group grid md:grid-cols-[1fr_220px] lg:grid-cols-[120px_1fr_280px] gap-6 md:gap-8 py-8 md:py-10 items-center transition hover:bg-white/60"
              >
                <span className="hidden lg:block font-display text-4xl font-bold text-slate-200 group-hover:text-accent/40 transition tabular-nums">
                  {item.num}
                </span>
                <div className={`border-l-4 pl-5 md:pl-6 ${item.accent}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight group-hover:text-accent transition">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed max-w-xl">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition">
                    Open resource <ArrowRightIcon className="w-4 h-4" />
                  </span>
                </div>
                <div className="relative h-44 md:h-48 lg:h-52 w-full md:w-[220px] lg:w-[280px] md:justify-self-end rounded-2xl overflow-hidden ring-1 ring-black/8 shadow-md bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width={560}
                    height={360}
                    className="absolute inset-0 z-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                    aria-hidden
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust — panoramic + columns */}
      <section id="trust" className="scroll-mt-20" aria-labelledby="trust-heading">
        <div className="relative min-h-[420px] md:min-h-[480px] flex items-end">
          <img
            src={IMG.trustWide}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />
          <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-12 md:pb-16 pt-32">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-light">Trust center</p>
            <h2
              id="trust-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 max-w-3xl leading-tight text-balance"
            >
              Technology we use to keep data updated &amp; information safe
            </h2>
          </div>
        </div>

        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 md:py-20">
            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {trustColumns.map((col) => (
                <article key={col.title}>
                  <h3 className="font-display text-xl font-bold leading-snug">{col.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{col.body}</p>
                  <ul className="mt-5 space-y-2 list-none p-0">
                    {col.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-14 rounded-2xl bg-[#faf9f7] ring-1 ring-slate-200 p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <p className="font-display font-semibold text-lg">Update cadence</p>
                  <p className="mt-1 text-sm text-slate-500">Typical windows—exact SLAs in your enterprise exhibit.</p>
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1 lg:max-w-2xl">
                  {cadence.map(({ k, v }) => (
                    <div key={k}>
                      <dt className="text-xs text-slate-500">{k}</dt>
                      <dd className="mt-1 font-display text-xl font-bold tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-600">
                Production data never trains shared models without contract addendum.{" "}
                <Link to="/enterprise" className="font-semibold text-accent hover:underline">
                  Security exhibit &amp; DPA →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI governance */}
      <section id="ai" className="scroll-mt-20 py-20 md:py-28 bg-[#f3f2ef] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[420px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10">
              <img src={IMG.ai} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-linear-to-tr from-black/50 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-display text-2xl font-bold text-white">
                AI that procurement can defend
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">AI governance</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
                Recommendations under your rules
              </h2>
              <ul className="mt-10 space-y-8 list-none p-0">
                {aiRules.map((r, i) => (
                  <li key={r.t} className="flex gap-5">
                    <span className="font-display text-3xl font-bold text-slate-200 tabular-nums">{i + 1}</span>
                    <div>
                      <p className="font-display text-lg font-semibold">{r.t}</p>
                      <p className="mt-1 text-slate-600 leading-relaxed">{r.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-slate-500">
                Subprocessors:{" "}
                <Link to="/enterprise" className="font-semibold text-accent hover:underline">
                  Enterprise page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reads — asymmetric grid */}
      <section id="reads" className="scroll-mt-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Insights</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">Short reads</h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Soon</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            {reads.map((r) => (
              <article
                key={r.title}
                className={`group relative overflow-hidden rounded-3xl ring-1 ring-black/8 bg-slate-300 ${r.minH} ${r.span || "lg:col-span-1"}`}
              >
                <img
                  src={r.img}
                  alt={r.imgAlt}
                  width={800}
                  height={600}
                  className="absolute inset-0 z-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/85 via-black/45 to-black/15" aria-hidden />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{r.sub}</p>
                  <h3 className="mt-2 font-display text-xl md:text-2xl font-bold text-white leading-snug max-w-md">
                    {r.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src={IMG.cta} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-brand/88" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
              Ready for the full security pack?
            </h2>
            <p className="mt-5 text-lg text-white/75 leading-relaxed">
              SLAs, DPA, questionnaire responses—everything IT and legal need for production rollout.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/enterprise"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand hover:bg-slate-100"
              >
                Enterprise overview
                <ArrowRightIcon className="w-4 h-4" aria-hidden />
              </Link>
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
