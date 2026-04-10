import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import { CALENDLY_DEMO_URL } from "../constants/booking";

const navLinks: { label: string; path: string }[] = [
  { label: "Products", path: "/products" },
  { label: "Customers", path: "/customers" },
  { label: "Resources", path: "/resources" },
  { label: "Company", path: "/company" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="apple-glass-nav fixed top-0 left-0 right-0 z-40 shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="enterprise-container h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-display font-semibold text-lg text-white tracking-[-0.28px]">Partsource</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={path}
                  className={`px-4 py-2 rounded-xl text-xs font-normal tracking-[-0.12px] transition-colors ${
                    isActive ? "text-white bg-white/15" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              to="/enterprise"
              className="px-4 py-2 rounded-xl text-xs font-normal text-accent-light hover:bg-white/10 transition-colors"
            >
              Enterprise
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-cta-primary px-4 py-2.5 rounded-xl text-xs font-normal transition-colors"
              >
                Request a demo
              </a>
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-cta-secondary apple-pill-link px-4 py-2.5 text-xs font-normal transition-colors"
              >
                Contact Sales
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              {mobileMenuOpen ? (
                <Cross2Icon className="w-6 h-6" />
              ) : (
                <HamburgerMenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <button
            type="button"
            className="lg:hidden absolute inset-0 top-16 left-0 right-0 bg-black/20 z-10"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div
          className={`lg:hidden absolute top-16 left-0 right-0 bg-black/95 border-b border-white/10 transition-all duration-200 overflow-hidden z-20 ${
            mobileMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className="py-3 px-3 rounded-lg text-white font-medium hover:bg-white/10 min-h-[44px] flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link to="/enterprise" className="py-3 px-3 rounded-lg text-accent-light font-medium hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>
              Enterprise
            </Link>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg text-center font-medium text-white bg-accent hover:bg-[#0066cc] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request a demo
              </a>
              <a
                href={CALENDLY_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full text-center font-medium text-accent-light border border-accent-light min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
