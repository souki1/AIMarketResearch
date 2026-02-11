import { Link } from "react-router-dom";

const capabilities = [
  { title: "SSO & identity", description: "SAML 2.0, SCIM, and integration with your identity provider." },
  { title: "Dedicated support", description: "Named customer success manager and priority support." },
  { title: "Custom SLAs", description: "99.9% uptime and tailored service agreements." },
  { title: "Data residency", description: "Choose where your data is stored; regional deployment options." },
  { title: "Advanced security", description: "Encryption at rest and in transit; audit logs and RBAC." },
  { title: "Compliance", description: "SOC 2 Type II, GDPR, ISO 27001; compliance documentation available." },
];

export default function EnterprisePage() {
  return (
    <div>
      <section className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Enterprise</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Enterprise-grade security, scale, and support
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            CustomMarket meets the requirements of global organizations: compliance, data residency, SSO, dedicated support, and custom SLAs.
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

      <section className="section-alt py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-8">What’s included</h2>
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

      <section className="py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-slate-500">Compliance & certifications</p>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            <span className="font-display font-semibold text-slate-400">SOC 2 Type II</span>
            <span className="font-display font-semibold text-slate-400">GDPR</span>
            <span className="font-display font-semibold text-slate-400">ISO 27001</span>
          </div>
          <Link to="/company" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Talk to our team
          </Link>
        </div>
      </section>
    </div>
  );
}
