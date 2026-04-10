import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  CubeIcon,
  GridIcon,
  LayersIcon,
  LightningBoltIcon,
  ReaderIcon,
  RocketIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { CALENDLY_DEMO_URL } from "../../constants/booking";

/**
 * Reference brands in manufacturing & procurement tech. Logos resolved via public logo CDNs
 * (Clearbit, then favicon); trademarks belong to respective owners.
 */
const referenceBrands = [
  { name: "Suzohapp", domain: "suzohapp.com" },
  { name: "Lio", domain: "lio.ai", formerName: "formerly askLio" },
  { name: "Levelpath", domain: "levelpath.com" },
  { name: "Pactum AI", domain: "pactum.com" },
  { name: "Supply Wisdom", domain: "supplywisdom.com" },
  { name: "General Dynamics", domain: "gd.com" },
];

function BrandLogoMark({ name, domain, formerName }: { name: string; domain: string; formerName?: string }) {
  const [phase, setPhase] = useState<"clearbit" | "favicon" | "fallback">("clearbit");
  const clearbitSrc = `https://logo.clearbit.com/${domain}`;
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const label = formerName ? `${name} (${formerName})` : name;

  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className="flex w-29 flex-col items-center gap-2 sm:w-32 shrink-0"
      role="group"
      aria-label={label}
    >
      <div className="flex h-13 w-full items-center justify-center rounded-xl border border-slate-200/90 bg-white px-3 py-2 shadow-sm">
        {phase !== "fallback" ? (
          <img
            src={phase === "clearbit" ? clearbitSrc : faviconSrc}
            alt=""
            width={120}
            height={48}
            className="max-h-10 w-auto max-w-28 object-contain object-center opacity-90 transition hover:opacity-100"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setPhase((p) => (p === "clearbit" ? "favicon" : "fallback"))}
          />
        ) : (
          <span className="font-display text-sm font-bold tracking-tight text-slate-500" aria-hidden>
            {initials}
          </span>
        )}
      </div>
      <div className="text-center">
        <p className="text-[11px] font-semibold leading-tight text-brand sm:text-xs">{name}</p>
        {formerName ? <p className="mt-0.5 text-[10px] leading-tight text-slate-500">{formerName}</p> : null}
      </div>
    </div>
  );
}

/** Platform outcomes — goals and product intent, not customer-reported benchmarks. */
const platformOutcomes: {
  kicker: string;
  title: string;
  sub: string;
  Icon: typeof LightningBoltIcon;
}[] = [
  {
    kicker: "Data",
    title: "High volume, on demand, near real time",
    sub: "Compare large amounts of part and supplier data as you need it—refreshed in near real time when your sources and integrations allow—instead of static exports that age by the hour.",
    Icon: LightningBoltIcon,
  },
  {
    kicker: "Insight",
    title: "Patterns that narrow the field",
    sub: "Surface patterns across alternatives so you can shortlist the right vendors and safer buying paths—not only the lowest quote, but options that fit risk, qualification, and how you actually run production.",
    Icon: GridIcon,
  },
  {
    kicker: "Decisions",
    title: "Expectations, buffer, and analysis",
    sub: "Go beyond unit price: weigh lead time, reliability, and on-time performance, leave room for schedule slack, and use structured comparison and analysis when you need to justify the award to category, plant, or finance.",
    Icon: ReaderIcon,
  },
];

/** Capability themes — descriptive only; not testimonials or attributed quotes. */
const teamFocusAreas: { title: string; description: string; Icon: typeof GridIcon }[] = [
  {
    title: "Compare massive datasets in one place",
    description:
      "Pull together high-volume part and supplier signals so buyers are not reconciling portals, ERP extracts, and email attachments by hand.",
    Icon: GridIcon,
  },
  {
    title: "Live refresh when your stack allows",
    description:
      "Work from on-demand views that can update in near real time as feeds change—so the team debates current availability and risk, not last week’s spreadsheet.",
    Icon: LightningBoltIcon,
  },
  {
    title: "Patterns, not just rows",
    description:
      "Highlight trends and outliers across vendors and alternates so you spot who consistently meets expectations—and where a “cheap” line item might cost you later.",
    Icon: ReaderIcon,
  },
  {
    title: "Safer buys and better vendor fit",
    description:
      "Rank and filter toward suppliers that match your technical, quality, and compliance needs, not only headline price.",
    Icon: CubeIcon,
  },
  {
    title: "On-time performance in the same frame as cost",
    description:
      "Put delivery, lead time, and buffer alongside price so awards reflect what keeps lines running—not a single column of unit cost.",
    Icon: TimerIcon,
  },
  {
    title: "Decision analysis stakeholders can use",
    description:
      "Exportable, explainable comparison and rationale so approvals and post-award reviews do not depend on memory or ad hoc slides.",
    Icon: LayersIcon,
  },
];

const industriesServed: { label: string; blurb: string; Icon: typeof CubeIcon }[] = [
  {
    label: "Discrete manufacturing",
    blurb: "BOM-heavy assemblies, engineered parts, and make-vs-buy decisions across plants.",
    Icon: CubeIcon,
  },
  {
    label: "Process manufacturing",
    blurb: "Materials, batches, and specs where traceability and change control matter.",
    Icon: LayersIcon,
  },
  {
    label: "Industrial equipment",
    blurb: "OEM and tier suppliers balancing lead times, alternates, and qualification.",
    Icon: RocketIcon,
  },
  {
    label: "Multi-plant operations",
    blurb: "Shared categories with local constraints—one governed view of options.",
    Icon: GridIcon,
  },
  {
    label: "Factory supply networks",
    blurb: "High-mix environments where disruption signals need to surface early.",
    Icon: LightningBoltIcon,
  },
  {
    label: "Contract manufacturing",
    blurb: "Programs where award documentation and supplier performance are audited.",
    Icon: ReaderIcon,
  },
];

export default function CustomersPage() {
  return (
    <div className="customers-page bg-[#eef1f4]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80" aria-labelledby="customers-hero-heading">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.78) 45%, rgba(0,113,227,0.15) 100%), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(0,113,227,0.2),transparent_50%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28 lg:py-32 min-h-[min(62vh,520px)] flex flex-col justify-end">
          <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white/85">Customers</p>
          <h1 id="customers-hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 max-w-4xl leading-[1.05] tracking-tight text-balance">
            Clearer buys from live data—at the volume manufacturing runs on
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed text-pretty">
            Partsource helps you compare large volumes of part and supplier data on demand—often in near real time—so you can see patterns,
            narrow to the right vendors, and choose safer options. Decisions weigh price with delivery, risk, and on-time performance, with
            room to plan and the analysis you need when it is time to commit.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-lg shadow-black/25 transition hover:bg-slate-100"
            >
              Book a 30-minute demo
              <ArrowRightIcon className="w-4 h-4" aria-hidden />
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Explore the platform
            </Link>
          </div>
        </div>
      </section>

      {/* Logo strip — reference brands (real logos via CDN + fallbacks) */}
      <section
        id="customer-logos"
        className="border-b border-slate-200/90 bg-white py-8 md:py-10 scroll-mt-24"
        aria-labelledby="customer-logos-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Ecosystem</p>
          <h2 id="customer-logos-heading" className="font-display text-xl sm:text-2xl font-bold text-brand mt-1">
            Procurement &amp; manufacturing innovators
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Logos are trademarks of their respective owners. Shown for industry context; does not imply endorsement, partnership, or that
            these organizations use Partsource unless stated elsewhere by us in writing.
          </p>
        </div>

        <div className="relative mt-6 md:mt-8">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-linear-to-r from-white to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-linear-to-l from-white to-transparent"
            aria-hidden
          />
          <div
            className="overflow-x-auto overflow-y-hidden scroll-smooth pb-3 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.6)_transparent]"
            role="region"
            aria-label="Scrollable row of reference company logos"
          >
            <ul className="flex w-max items-stretch gap-8 sm:gap-10 md:gap-12 px-6 sm:px-10 md:px-14 py-2 snap-x snap-mandatory">
              {referenceBrands.map(({ name, domain, formerName }) => (
                <li key={name} className="snap-center shrink-0 list-none">
                  <BrandLogoMark name={name} domain={domain} formerName={formerName} />
                </li>
              ))}
              {referenceBrands.map(({ name, domain, formerName }) => (
                <li key={`${name}-repeat`} className="snap-center shrink-0 list-none" aria-hidden>
                  <BrandLogoMark name={name} domain={domain} formerName={formerName} />
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-2 md:hidden">Swipe sideways for more</p>
          <p className="hidden md:block text-center text-xs text-slate-400 mt-2">Scroll horizontally to see all logos</p>
        </div>
      </section>

      {/* Outcomes — light surface, icon-led stats */}
      <section
        className="relative py-16 md:py-24 bg-surface border-y border-slate-200/90 overflow-hidden"
        aria-labelledby="outcomes-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.22)_1px,transparent_0)] bg-size-[28px_28px]"
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/7 blur-3xl" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Outcomes</p>
            <h2 id="outcomes-heading" className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3 tracking-tight">
              What Partsource helps you drive
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              How far you get depends on your data sources and rollout—these are the outcomes we build toward: faster comparison at scale,
              sharper patterns, and decisions that hold up when price is only part of the story.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
            {platformOutcomes.map((o) => (
              <div
                key={o.title}
                className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_40px_-16px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_48px_-12px_rgba(0,113,227,0.15)]"
              >
                <span
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent/15"
                  aria-hidden
                >
                  <o.Icon className="h-5 w-5" />
                </span>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent">{o.kicker}</p>
                <p className="mt-2 font-display text-xl font-bold text-brand leading-snug">{o.title}</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{o.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability themes — no testimonials */}
      <section className="relative py-16 md:py-24 bg-white border-y border-slate-200/70 overflow-hidden" aria-labelledby="focus-heading">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,113,227,0.08),transparent_60%)]"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Platform</p>
              <h2 id="focus-heading" className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3 tracking-tight text-balance">
                What we help teams solve
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We do not publish customer quotes or case-study metrics here—below is how the product is meant to help teams work through
                high-volume, time-sensitive data so sourcing and operations can align on vendors, timing, and risk—not only unit price.
              </p>
              <div className="mt-8 hidden lg:block h-px w-16 bg-linear-to-r from-accent to-transparent" aria-hidden />
            </div>

            <div className="lg:col-span-8 mt-12 lg:mt-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
                {teamFocusAreas.map(({ title, description, Icon }) => (
                  <article
                    key={title}
                    className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-accent/25 hover:shadow-md"
                  >
                    <div className="flex gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
                        aria-hidden
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-sm font-semibold text-brand leading-snug">{title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page band — headline, proof line, CTAs */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        aria-labelledby="workflow-bridge-heading"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#050a14] via-[#0a1a33] to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-15%,rgba(0,113,227,0.42),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_100%,rgba(41,151,255,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(0,113,227,0.06)_50%,transparent_60%)]" aria-hidden />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Alignment</p>
          <h2 id="workflow-bridge-heading" className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight text-balance leading-[1.15]">
            One workflow from research to award
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
            From first search through pattern insight, vendor shortlists, and documented awards—category, plant, and finance stay on the same
            live comparison, with analysis when you need to defend the decision.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/products#product-demo"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-lg shadow-black/25 transition hover:bg-slate-100 min-h-[48px]"
            >
              Interactive product demo
              <ChevronRightIcon className="w-4 h-4 shrink-0" aria-hidden />
            </Link>
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 min-h-[48px]"
            >
              Book a live walkthrough
              <ArrowRightIcon className="w-4 h-4 shrink-0" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* Industries — icon cards */}
      <section
        className="py-16 md:py-20 bg-white border-t border-slate-200/80"
        aria-labelledby="industries-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Coverage</p>
            <h2 id="industries-heading" className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3 tracking-tight">
              Industries we serve
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Typical environments where Partsource replaces ad hoc spreadsheets and email for part-level sourcing decisions.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 list-none p-0">
            {industriesServed.map(({ label, blurb, Icon }) => (
              <li
                key={label}
                className="flex gap-4 rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 transition hover:border-accent/35 hover:bg-white hover:shadow-md"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-brand leading-snug">{label}</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-alt py-14 md:py-16 border-t border-white/10" aria-labelledby="customers-cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/3 p-8 md:p-12 backdrop-blur-md md:flex md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-xl">
              <h2 id="customers-cta-heading" className="font-display text-2xl md:text-3xl font-bold text-brand">
                See Partsource on your categories
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Book a short call to walk through your plants, data sources, and approval model. Opens scheduling in a new tab.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Prefer to read first?{" "}
                <Link to="/enterprise" className="font-medium text-accent-light hover:underline">
                  Enterprise
                </Link>{" "}
                ·{" "}
                <Link to="/resources" className="font-medium text-accent-light hover:underline">
                  Resources
                </Link>
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-accent-light min-h-[48px]"
              >
                Book a 30-minute demo
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <Link
                to="/company"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 min-h-[48px]"
              >
                Company &amp; contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
