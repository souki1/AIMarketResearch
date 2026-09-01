import { Link } from "react-router-dom";
import { ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { CALENDLY_DEMO_URL } from "../../constants/booking";
import Seo from "../../components/Seo";
import HeroProductMockup from "../../components/HeroProductMockup";

const workflow = [
  { n: "01", title: "Upload", text: "Drop a BOM, open order list, or catalog excerpt. One file instead of a portal scavenger hunt." },
  { n: "02", title: "Research", text: "File lines on screen—select parts, click Research, and pull OEM and alternate leads." },
  { n: "03", title: "Compare", text: "Filter and sort leads, then put the shortlist side by side." },
  { n: "04", title: "Create RFQ", text: "Send the compared set out as an RFQ on the same part and qty." },
  { n: "05", title: "Reports", text: "Coverage of the file, leads, and RFQ status in one view." },
];

const outcomes = [
  { title: "Right part, first search", text: "Normalized OEM and aftermarket numbers so procurement is not guessing the catalog line." },
  { title: "Alternates that survive audit", text: "Crosses and substitutes with the trail finance and the plant can defend." },
  { title: "OEM match", text: "See which OEM can actually fulfill—then compare landed cost and lead time in one frame." },
];

export default function SuppliersPage() {
  return (
    <div>
      <Seo
        title="For suppliers & procurement — Find the part, alternate & OEM | Partsource"
        description="Partsource is the supplier and procurement side of the bridge: upload a BOM, we read it, then match the right part, alternate, and OEM."
        canonicalPath="/suppliers"
      />

      <section className="relative overflow-hidden border-b border-slate-200/60 bg-linear-to-br from-slate-950 via-[#0a1020] to-slate-950" aria-labelledby="suppliers-hero-heading">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 50% at 12% 20%, rgba(41,151,255,0.16), transparent 50%), radial-gradient(ellipse 80% 55% at 88% 80%, rgba(0,113,227,0.14), transparent 48%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <p className="font-display text-accent-light font-semibold text-sm uppercase tracking-[0.22em]">For suppliers &amp; procurement</p>
              <h1 id="suppliers-hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 leading-[1.05] tracking-tight text-balance">
                Find the part. Find the alternate. Find the OEM.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Upload a BOM. We read every line. Procurement and supplier teams match the right part—and the OEM who can ship it—then award with a trail.
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
                  to="/oem"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white min-h-[48px]"
                >
                  For OEM teams
                </Link>
              </div>
            </div>
            <HeroProductMockup />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-b border-slate-100" aria-labelledby="suppliers-flow-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-[0.2em]">Workflow</p>
          <h2 id="suppliers-flow-heading" className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand tracking-tight">
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
          <h2 className="font-display text-3xl font-bold text-brand">What procurement gets</h2>
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
