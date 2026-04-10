import { Link } from "react-router-dom";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Part research", to: "/products" },
      { label: "Vendor comparison", to: "/products" },
      { label: "Recommendations", to: "/products" },
      { label: "Integrations", to: "/products" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "By Industry", to: "/solutions" },
      { label: "By Role", to: "/solutions" },
      { label: "Enterprise", to: "/enterprise" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/resources" },
      { label: "Case Studies", to: "/resources" },
      { label: "Blog", to: "/resources" },
      { label: "Support", to: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/company" },
      { label: "Contact", to: "/company" },
      { label: "Partners", to: "/company" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/company" },
      { label: "Terms of Service", to: "/company" },
      { label: "Security", to: "/enterprise" },
      { label: "Compliance", to: "/enterprise" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="enterprise-container py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 lg:gap-8">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-accent-light" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-display font-semibold text-lg tracking-[-0.28px]">Partsource</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 max-w-[220px]">
              AI-powered research and comparison for parts—find suppliers, compare pricing, and get intelligent recommendations.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display font-semibold text-sm uppercase tracking-[0.2px] text-white/90 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-white/60 hover:text-accent-light transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Partsource. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-sm text-white/50">
            <Link to="/company" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/company" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/company" className="hover:text-white transition-colors">
              Cookie preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
