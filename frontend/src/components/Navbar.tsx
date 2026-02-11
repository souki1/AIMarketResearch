import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks: { label: string; path: string }[] = [
  { label: "Products", path: "/products" },
  { label: "Solutions", path: "/solutions" },
  { label: "Customers", path: "/customers" },
  { label: "Resources", path: "/resources" },
  { label: "Company", path: "/company" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-10 left-0 right-0 z-40 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg text-brand tracking-tight">CustomMarket</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "text-accent bg-slate-100" : "text-slate-600 hover:text-brand hover:bg-slate-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              to="/enterprise"
              className="px-4 py-2 rounded-lg text-sm font-medium text-accent hover:bg-slate-50 transition-colors"
            >
              Enterprise
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/signin"
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-brand hover:bg-slate-50 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/company"
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-brand hover:bg-brand-light transition-colors"
              >
                Request a demo
              </Link>
              <Link
                to="/company"
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-brand border border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>

            <button
              type="button"
              className="lg:hidden p-2.5 rounded-lg text-brand hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
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
          className={`lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-lg transition-all duration-200 overflow-hidden z-20 ${
            mobileMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className="py-3 px-3 rounded-lg text-brand font-medium hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link to="/enterprise" className="py-3 px-3 rounded-lg text-accent font-medium hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              Enterprise
            </Link>
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/signin" className="w-full py-3 rounded-lg text-center font-medium text-slate-600 bg-slate-100 hover:bg-slate-200" onClick={() => setMobileMenuOpen(false)}>
                Sign in
              </Link>
              <Link to="/company" className="w-full py-3 rounded-lg text-center font-medium text-white bg-brand hover:bg-brand-light" onClick={() => setMobileMenuOpen(false)}>
                Request a demo
              </Link>
              <Link to="/company" className="w-full py-3 rounded-lg text-center font-semibold text-brand border border-slate-300" onClick={() => setMobileMenuOpen(false)}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
