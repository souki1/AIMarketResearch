import { Link } from "react-router-dom";

const capabilities = [
  { title: "Identity and access", description: "SAML SSO, SCIM provisioning, and granular role controls for manufacturing sourcing teams." },
  { title: "Implementation support", description: "Dedicated onboarding, category configuration, and workflow enablement." },
  { title: "Enterprise reliability", description: "High-availability architecture and tailored service commitments." },
  { title: "Data control", description: "Flexible deployment options and governance policies aligned to enterprise needs." },
  { title: "Advanced security controls", description: "Encryption, audit trails, and policy-driven access across workflows." },
  { title: "Governance framework", description: "Structured approvals and decision traceability for sourcing governance." },
];

export default function EnterprisePage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-100 py-12 md:py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Enterprise</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Enterprise platform for manufacturing procurement
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Deploy Partsource at scale: enterprise controls, secure data handling, and governance for teams that source thousands of parts.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/company" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light">
              Contact Sales
            </Link>
            <Link to="/company" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-brand border-2 border-slate-200 hover:bg-slate-50">
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-2 md:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="https://images.unsplash.com/photo-1565514020179-026b92b2d2db?auto=format&fit=crop&w=1400&q=80"
            alt="Enterprise procurement command center"
            className="w-full h-[230px] md:h-[320px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-alt py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-8">What's included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <div key={c.title} className="p-6 rounded-xl bg-white border border-slate-100 card-hover">
                <h3 className="font-display font-semibold text-brand">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-slate-500">Compliance & governance</p>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We provide enterprise-grade controls, approval workflows, and decision traceability with documentation available on request.
          </p>
          <Link to="/company" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Talk to our team
          </Link>
        </div>
      </section>
    </div>
  );
}
