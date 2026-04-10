import { Link } from "react-router-dom";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/partsource",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/partsource",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@partsource",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const columns = [
  {
    title: "Products & solutions",
    links: [
      { label: "Part research", to: "/products" },
      { label: "Interactive demo", to: "/products#product-demo" },
      { label: "Vendor comparison", to: "/products#product-demo" },
      { label: "By function & role", to: "/products#solutions-coverage" },
      { label: "Key capabilities", to: "/products#capabilities" },
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
      <div className="enterprise-container py-12 sm:py-14 lg:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-14">
          <div className="shrink-0 lg:max-w-[min(100%,20rem)] xl:max-w-88">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-accent-light" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-display font-semibold text-lg tracking-[-0.28px]">Partsource</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              AI-powered research and comparison for parts—find suppliers, compare pricing, and get intelligent recommendations.
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-2" aria-label="Social media">
              {socialLinks.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/65 transition-colors hover:bg-white/10 hover:text-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
                    aria-label={`Partsource on ${label}`}
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            className="min-w-0 flex-1 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-4 md:gap-y-8 lg:gap-x-6 xl:gap-x-10"
            aria-label="Footer"
          >
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <h3 className="font-display font-semibold text-sm uppercase tracking-[0.2px] text-white/90 mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map(({ label, to }) => (
                    <li key={label}>
                      <Link to={to} className="text-sm text-white/60 hover:text-accent-light transition-colors leading-snug">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 sm:mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
