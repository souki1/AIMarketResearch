import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  GridIcon,
  LightningBoltIcon,
  ReaderIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import Seo from "../../components/Seo";

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
    title: "Volume without spreadsheet drift",
    sub: "Live feeds where your stack allows—one governed view of parts and suppliers.",
    Icon: LightningBoltIcon,
  },
  {
    kicker: "Price",
    title: "Unit & landed in one frame",
    sub: "Freight, duty, MOQ—so “cheap” lines don’t hide logistics risk.",
    Icon: GridIcon,
  },
  {
    kicker: "Logistics",
    title: "Lead time as a first-class signal",
    sub: "OTIF and lane fit beside price for awards your plant will defend.",
    Icon: ReaderIcon,
  },
];

const teamFocusAreas: { title: string; description: string; Icon: typeof GridIcon }[] = [
  {
    title: "One comparison view",
    description: "Parts, suppliers, and quotes in one workspace—not portals, ERP exports, and email.",
    Icon: GridIcon,
  },
  {
    title: "Current data",
    description: "Refresh from your stack when feeds change so teams work from live availability and risk.",
    Icon: LightningBoltIcon,
  },
  {
    title: "Awards you can defend",
    description: "Price, lead time, and logistics together—with exportable rationale for approvals.",
    Icon: TimerIcon,
  },
];

const industriesServed: { label: string; blurb: string }[] = [
  {
    label: "Discrete manufacturing",
    blurb: "BOM-heavy assemblies and engineered parts across plants.",
  },
  {
    label: "Process manufacturing",
    blurb: "Materials and specs where traceability matters.",
  },
  {
    label: "Industrial equipment",
    blurb: "OEM and tier suppliers balancing lead times and alternates.",
  },
  {
    label: "Multi-plant operations",
    blurb: "Shared categories with local constraints—one governed view.",
  },
  {
    label: "Factory supply networks",
    blurb: "High-mix environments with early disruption signals.",
  },
  {
    label: "Contract manufacturing",
    blurb: "Audited awards and supplier performance documentation.",
  },
];

export default function CustomersPage() {
  return (
    <div className="customers-page bg-[#eef1f4]">
      <Seo
        title="Customers — Manufacturing Part Sourcing at Scale | Partsource"
        description="Compare parts, price, and logistics at manufacturing scale. OEM and aftermarket research, landed cost, and lead-time signals for procurement and plant teams."
        canonicalPath="/customers"
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80" aria-labelledby="customers-hero-heading">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.78) 45%, rgba(0,113,227,0.15) 100%), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(0,113,227,0.2),transparent_50%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28 lg:py-32 min-h-[min(62vh,520px)] flex flex-col justify-end">
          <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white/85">Customers</p>
          <h1 id="customers-hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 max-w-4xl leading-[1.05] tracking-tight text-balance">
            Compare parts, price, and logistics at manufacturing scale
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
            OEM &amp; aftermarket research, landed cost, and lead-time lanes—so awards match how you actually run plants.
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

      {/* Outcomes — image header + cards */}
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
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-5">
              <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Outcomes</p>
              <h2 id="outcomes-heading" className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3 tracking-tight">
                What Partsource helps you drive
              </h2>
              <p className="mt-4 text-sm text-slate-600">Price accuracy + logistics fit—not spreadsheets by email.</p>
            </div>
            <div className="lg:col-span-7 relative h-56 sm:h-72 rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-xl shadow-slate-300/30">
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1800&q=80"
                alt="Freight and logistics"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
            </div>
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

      {/* Platform capabilities */}
      <section className="py-14 md:py-20 bg-white border-y border-slate-200/70" aria-labelledby="focus-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Platform</p>
            <h2 id="focus-heading" className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3 tracking-tight">
              What we help teams solve
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Align sourcing and operations on vendors, timing, and risk—not only unit price.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {teamFocusAreas.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6"
              >
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow CTA */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-slate-950" aria-labelledby="workflow-bridge-heading">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,113,227,0.28),transparent_55%)]"
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 id="workflow-bridge-heading" className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
            Research to award on one platform
          </h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed">
            Category, plant, and finance stay on the same live comparison.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products#product-demo"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-slate-100 min-h-[48px]"
            >
              Interactive demo
              <ChevronRightIcon className="w-4 h-4 shrink-0" aria-hidden />
            </Link>
            <a
              href={CALENDLY_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 min-h-[48px]"
            >
              Book a walkthrough
              <ArrowRightIcon className="w-4 h-4 shrink-0" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-14 md:py-20 bg-white border-t border-slate-200/80" aria-labelledby="industries-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-accent font-semibold text-xs uppercase tracking-[0.2em]">Coverage</p>
            <h2 id="industries-heading" className="font-display text-3xl sm:text-4xl font-bold text-brand mt-3 tracking-tight">
              Industries we serve
            </h2>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
            {industriesServed.map(({ label, blurb }) => (
              <li
                key={label}
                className="rounded-xl border border-slate-200/80 bg-slate-50/60 px-5 py-4"
              >
                <p className="font-display text-base font-semibold text-brand">{label}</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{blurb}</p>
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
