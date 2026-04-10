import { Link } from "react-router-dom";

const stories = [
  { quote: "We reduced sourcing cycles by nearly a third while improving supplier quality outcomes.", author: "VP Procurement, manufacturing company" },
  { quote: "Decision intelligence gave our category teams a shared view of risk, cost, and delivery trade-offs.", author: "Head of Strategic Sourcing, manufacturing enterprise" },
  { quote: "Our plant teams now trust recommendations because the AI reasoning is transparent and actionable.", author: "Director of Operations, industrial manufacturing group" },
  { quote: "We replaced fragmented spreadsheets with one workflow from supplier intake to award governance.", author: "Senior Category Manager, multi-plant manufacturer" },
  { quote: "Supplier disruptions are now flagged early enough for us to act before production is impacted.", author: "Supply Chain Excellence Lead, manufacturing network" },
];

const outcomes = [
  { value: "31%", label: "Average reduction in sourcing cycle time" },
  { value: "22%", label: "Average improvement in on-time supplier delivery" },
  { value: "1", label: "Unified platform for sourcing intelligence and decisions" },
];

const industriesServed = ["Discrete manufacturing", "Process manufacturing", "Industrial manufacturing", "Multi-plant operations", "Factory supply networks", "Contract manufacturing"];

export default function CustomersPage() {
  return (
    <div>
      <section
        className="bg-white border-b border-slate-300 shadow-sm py-12 md:py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,247,0.9), rgba(245,245,247,0.94)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-display text-accent font-semibold text-sm uppercase tracking-wider">Customers</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand mt-2 max-w-2xl">
            Trusted by manufacturing sourcing leaders
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Teams use Partsource to cut manual supplier research, compare vendors faster, and choose the best source for every part with data-backed recommendations.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-8">What customers say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((s) => (
              <div key={s.author} className="p-8 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow card-hover">
                <p className="text-slate-700 leading-relaxed">&ldquo;{s.quote}&rdquo;</p>
                <p className="mt-6 font-medium text-brand">{s.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-2 md:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1400&q=80"
            alt="Manufacturing leadership team reviewing sourcing performance"
            className="w-full h-[240px] md:h-[320px] object-cover rounded-xl border border-slate-100"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-alt py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-4">Typical outcomes</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-8">
            Customers report faster awards, stronger supplier performance, and more reliable decisions.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {outcomes.map((o) => (
              <div key={o.label} className="text-center p-6 rounded-xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-display text-3xl font-bold text-accent">{o.value}</p>
                <p className="mt-2 text-slate-600">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand text-center mb-6">Industries we serve</h2>
          <p className="text-center text-slate-600 max-w-xl mx-auto mb-10">
            Our AI-powered platform supports procurement and operations teams across these manufacturing sectors.
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {industriesServed.map((ind) => (
              <li key={ind} className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 font-medium">
                {ind}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-alt py-10 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand">Join leading sourcing organizations</h2>
          <p className="mt-2 text-slate-600">Get a personalized demo tailored to your procurement workflow.</p>
          <Link to="/company" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand hover:bg-brand-light">
            Request a demo
          </Link>
        </div>
      </section>
    </div>
  );
}
