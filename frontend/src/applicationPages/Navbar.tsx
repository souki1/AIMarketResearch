import { Link } from "react-router-dom";

const NAVBAR_BG = "rgb(31, 39, 45)";

type NavbarProps = {
  sidebarOpen: boolean;
  onMenuClick: () => void;
};

export default function Navbar({ sidebarOpen, onMenuClick }: NavbarProps) {
  return (
    <header
      className="h-14 shrink-0 flex items-center gap-4 px-4 border-b border-white/10"
      style={{ backgroundColor: NAVBAR_BG }}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="shrink-0 w-9 h-9 cursor-pointer rounded-lg flex items-center justify-center text-white/90 hover:bg-white/10 transition-colors"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <Link to="/app" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors shrink-0">
        <img src="/logo.svg" alt="CustomMarket" className="w-5 h-5" />
        <span className="font-display font-bold text-lg tracking-tight">CustomMarket</span>
      </Link>
      <div className="w-9 shrink-0" aria-hidden="true" />
      <div className="flex-1 flex justify-center">
        <label htmlFor="app-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full max-w-sm">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            id="app-search"
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border border-white/20 bg-white/5 pl-9 pr-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
        </div>
      </div>
      <button
        type="button"
        className="shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/90 hover:bg-white/15 transition-colors"
        aria-label="Profile"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 8zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </header>
  );
}
