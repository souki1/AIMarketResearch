import { Link } from "react-router-dom";

const values = [
  { title: "Customer-first", text: "We build for the way insights teams work—integrated workflows, clear deliverables, and support when you need it." },
  { title: "AI with guardrails", text: "Our AI speeds up analysis and surfaces what matters, while keeping humans in the loop and data under your control." },
  { title: "Security by default", text: "Enterprise-grade security and compliance so you can run sensitive research without compromise." },
];

const milestones = [
  "Founded with a focus on enterprise market research",
  "Launched AI summaries and recommended actions",
  "500+ enterprise customers worldwide",
  "150+ countries supported; SOC 2 Type II, GDPR, ISO 27001",
];

export default function CompanyPage() {
  return (
    <div>
      <section className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Company</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Enterprise market intelligence, built for scale
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            CustomMarket helps organizations make better decisions with secure, compliant, and AI-powered market research. We serve 500+ enterprises across industries and regions—from survey design and global panels to AI-driven insights and reporting.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand">Our mission</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We believe every enterprise deserves access to high-quality market intelligence without compromising on security or compliance. By combining global panels, flexible surveys, and AI-driven analytics, we enable organizations to understand their markets and act with confidence. Our goal is to make advanced research accessible—so more teams can make decisions backed by data.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-brand">What we offer</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                A single, AI-driven platform for the full research lifecycle: survey design and deployment, panel and audience access, real-time analytics, and AI-generated summaries and recommendations. We invest in security, compliance, and support so you can focus on strategy and execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-8">Our values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="p-8 rounded-xl bg-white border border-slate-100 card-hover">
                <h3 className="font-display text-lg font-semibold text-brand">{v.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-6">Where we are today</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-10">
            Key milestones in our journey to become the AI-driven market intelligence platform for enterprises.
          </p>
          <ul className="max-w-2xl mx-auto space-y-4">
            {milestones.map((m, i) => (
              <li key={m} className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-display font-semibold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-slate-700">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand">Contact us</h2>
              <p className="mt-4 text-slate-600">
                Request a demo or speak with our sales team about your requirements. We’ll walk you through the platform and answer your questions.
              </p>
            </div>
            <div>
              <form className="space-y-4 max-w-md">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Work email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors"
                >
                  Request a demo
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center">Careers</h2>
          <p className="mt-2 text-slate-600 text-center max-w-xl mx-auto">
            We’re building the future of enterprise market research. If you’re passionate about data, AI, and helping teams make better decisions, we’d love to hear from you.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-brand border-2 border-brand hover:bg-brand hover:text-white transition-colors">
              View open roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
