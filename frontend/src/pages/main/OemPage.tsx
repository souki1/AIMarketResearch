import { Link } from "react-router-dom";
import { ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import Seo from "../../components/Seo";
import HeroProductMockup from "../../components/HeroProductMockup";

const workflow = [
  { n: "01", title: "Upload", text: "Drop a price book, demand file, or open RFQ list. .xlsx and .csv in, no re-keying." },
  { n: "02", title: "Research", text: "See every line from the file, select parts, then find supplier leads. Filter and sort the results." },
  { n: "03", title: "Compare", text: "Put shortlisted leads in one frame—landed cost, lead time, MOQ, reliability." },
  { n: "04", title: "Create RFQ", text: "Turn the compare set into an RFQ draft on the same part and quantity." },
  { n: "05", title: "Reports", text: "Lines uploaded, leads found, and RFQ coverage in one glance." },
];

const outcomes = [
  { title: "Pricing trends", text: "See movement across quotes and lanes before you lock a list price or discount." },
  { title: "Supplier coverage", text: "Who can actually fulfill—capacity, reliability, and lead time—not a stale AVL." },
  { title: "Part research", text: "OEM numbers and alternates normalized before the RFQ leaves the building." },
];

export default function OemPage() {
  return (
    <div>
      <Seo
        title="For OEMs — Pricing data, trends & supplier research | Partsource"
        description="Partsource is the OEM side of the bridge: upload a file, we read it, then pricing trends, supplier coverage, and part research land on one screen."
        canonicalPath="/oem"
      />

      <section className="relative overflow-hidden border-b border-slate-200/60 bg-linear-to-br from-slate-950 via-[#0a1020] to-slate-950" aria-labelledby="oem-hero-heading">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 85% 55% at 75% 15%, rgba(0,113,227,0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(41,151,255,0.08), transparent 45%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <p className="font-display text-accent-light font-semibold text-sm uppercase tracking-[0.22em]">For OEMs</p>
              <h1 id="oem-hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 leading-[1.05] tracking-tight text-balance">
                Data and trends before you set the price.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Upload a file. We read the parts. You get supplier coverage, pricing movement, and research—so awards are evidence, not a lagging spreadsheet.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3">
                <a
                  href={CALENDLY_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand min-h-[48px]"
                >
                  Book a walkthrough
                  <ArrowRightIcon className="w-4 h-4" aria-hidden />
                </a>
                <Link
                  to="/suppliers"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white min-h-[48px]"
                >
                  For suppliers &amp; procurement
                </Link>
              </div>
            </div>
            <HeroProductMockup />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-b border-slate-100" aria-labelledby="oem-flow-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-[0.2em]">Workflow</p>
          <h2 id="oem-flow-heading" className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand tracking-tight">
            Upload. Research. Compare. RFQ. Reports.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflow.map((s) => (
              <article key={s.n} className="rounded-3xl border border-slate-200/80 bg-[#fafafa] p-7">
                <span className="font-display text-sm font-bold text-accent tabular-nums">{s.n}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-brand">{s.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fafafa] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-brand">What OEM teams get</h2>
          <ul className="mt-8 grid md:grid-cols-3 gap-5">
            {outcomes.map((o) => (
              <li key={o.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-display font-semibold text-brand">{o.title}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{o.text}</p>
              </li>
            ))}
          </ul>
          <Link to="/products#product-demo" className="mt-10 inline-flex items-center gap-1 text-accent font-semibold text-sm">
            See the product flow
            <ChevronRightIcon className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
