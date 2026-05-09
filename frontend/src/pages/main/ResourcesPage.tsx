import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const heroBg =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2400&q=80";

const tiles = [
  {
    id: "docs",
    tag: "Docs",
    title: "Integration & API",
    line: "Auth, webhooks, exports — under NDA for evals.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    href: "/enterprise",
  },
  {
    id: "playbooks",
    tag: "Guides",
    title: "Sourcing playbooks",
    line: "RFQ, landed cost, multi-plant governance.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=80",
    href: "/products",
  },
  {
    id: "insights",
    tag: "Insights",
    title: "Price & logistics",
    line: "Brief reads on total cost and lanes.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
    href: "#reads",
  },
  {
    id: "support",
    tag: "Help",
    title: "Support tiers",
    line: "Severity routing — see Enterprise SLAs.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    href: "/enterprise",
  },
];

const aiNotes = [
  { t: "Grounded quotes", s: "Uses your part attributes—not generic web copy." },
  { t: "Explainable ranks", s: "Weights you can defend to finance." },
  { t: "Human approval", s: "Awards stay under your rules." },
];

const roadmap = [
  { label: "Part chat", state: "Building" },
  { label: "What-if landed cost", state: "Planned" },
  { label: "Lane risk alerts", state: "Explore" },
];

const reads = [
  { title: "Landed cost vs unit price", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80" },
  { title: "Aftermarket crosses", img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80" },
  { title: "Enterprise security prep", img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=900&q=80" },
];

export default function ResourcesPage() {
  return (
    <div className="resources-hub bg-[#eef1f4]">
      <Seo
        title="Resources — Docs, Guides & Sourcing Playbooks | Partsource"
        description="Integration and API notes, sourcing playbooks, and diligence resources for OEM and aftermarket procurement teams adopting Partsource."
        canonicalPath="/resources"
      />
      <section className="relative overflow-hidden border-b border-slate-200/80 min-h-[min(52vh,480px)] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(115deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.72) 50%, rgba(0,113,227,0.12) 100%), url('${heroBg}')`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_0%,rgba(0,113,227,0.28),transparent_55%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-24 w-full">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-white/90">Resources</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 max-w-3xl leading-[1.05] tracking-tight">
            Docs, guides &amp; diligence—without the wall of text
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/78 max-w-xl">
            OEM &amp; aftermarket sourcing: integrate faster, read less, ship sooner.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/enterprise"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-lg shadow-black/20 hover:bg-slate-100"
            >
              Security &amp; legal <ArrowRightIcon className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10"
            >
              Product tour
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Start here</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-1">Pick a door</h2>
            </div>
            <p className="text-sm text-slate-600 max-w-sm">Deep references ship under NDA—this page is the map.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiles.map((t) => (
              <Link
                key={t.id}
                to={t.href}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={t.image} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                    {t.tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display font-semibold text-brand leading-snug">{t.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 flex-1">{t.line}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Open <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-xl min-h-[240px]">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/75 to-transparent" />
              <div className="relative p-8 md:p-10 max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">AI</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-2">Built for procurement reality</h2>
              </div>
            </div>
            <ul className="space-y-6">
              {aiNotes.map((n) => (
                <li key={n.t} className="flex gap-4 border-l-2 border-accent/40 pl-4">
                  <div>
                    <p className="font-display font-semibold text-brand">{n.t}</p>
                    <p className="mt-1 text-sm text-slate-600">{n.s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 text-center text-xs text-slate-500">
            Subprocessors &amp; regions: <Link to="/enterprise" className="font-medium text-accent hover:underline">Enterprise</Link>.
          </p>
        </div>
      </section>

      <section className="section-alt py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="font-display text-accent-light font-semibold text-xs uppercase tracking-[0.2em]">Roadmap</p>
              <h2 className="font-display text-2xl font-bold text-brand mt-2">Product direction</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {roadmap.map((r) => (
                <span
                  key={r.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white"
                >
                  <span className="text-[10px] uppercase tracking-wider text-accent-light">{r.state}</span>
                  {r.label}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl">
            Indicative only—priorities follow pilots. Mention roadmap interests on a{" "}
            <Link to="/company" className="font-medium text-accent-light hover:underline">
              demo call
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="reads" className="scroll-mt-24 py-14 md:py-18 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand mb-8">Short reads (coming soon)</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {reads.map((r) => (
              <article key={r.title} className="group relative h-52 rounded-2xl overflow-hidden ring-1 ring-slate-200/80">
                <img src={r.img} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 font-display font-semibold text-white text-sm">{r.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#eef1f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1566576919226-cbbf78296392?auto=format&fit=crop&w=2000&q=80"
              alt=""
              className="w-full h-[200px] md:h-[280px] object-cover"
              loading="lazy"
            />
            <div className="bg-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="font-display font-semibold text-brand">From research to PO — one governed path.</p>
              <Link to="/products#product-demo" className="text-sm font-semibold text-accent hover:underline shrink-0">
                View interactive demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-xl font-bold text-brand">Need SLAs or security pack?</h2>
          <Link
            to="/enterprise"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Enterprise overview <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
