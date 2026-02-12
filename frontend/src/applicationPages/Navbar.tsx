import { Link, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, MagnifyingGlassIcon, PersonIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";

const NAVBAR_BG = "rgb(31, 39, 45)";

type NavbarProps = {
  sidebarOpen: boolean;
  onMenuClick: () => void;
};

export default function Navbar({ sidebarOpen, onMenuClick }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <header
      className="h-14 shrink-0 flex items-center gap-4 px-4 border-b border-white/10"
      style={{ backgroundColor: NAVBAR_BG }}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="shrink-0 w-9 h-9 cursor-pointer rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <HamburgerMenuIcon className="w-5 h-5" aria-hidden />
      </button>
      <Link to="/app" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors shrink-0">
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
            <MagnifyingGlassIcon className="w-4 h-4" aria-hidden />
          </span>
          <input
            id="app-search"
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border border-white/20 bg-white/5 pl-9 pr-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
        </div>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/90 hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Profile"
          >
            <PersonIcon className="w-5 h-5" aria-hidden />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
            className="w-64 rounded-lg border border-white/10 bg-[rgb(31,39,45)] py-2 shadow-xl z-50 outline-none"
            sideOffset={8}
            align="end"
          >
            <div className="px-4 py-2 border-b border-white/10">
              <span className="text-sm font-medium text-white/90 block truncate">
                user@example.com
              </span>
            </div>
            <DropdownMenu.Item className="px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 outline-none cursor-default flex items-center gap-2">
              <span className="truncate">workspace</span>
              <span className="text-xs text-white/50 truncate">Workspace ID: 7474654407029309</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-white/10 my-2" />
            <DropdownMenu.Item asChild>
              <Link
                to="/app/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 outline-none"
              >
                <GearIcon className="w-4 h-4" /> Settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
                to="/company"
                className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 outline-none"
              >
                Privacy policy
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-white/10 my-2" />
            <DropdownMenu.Item className="px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 outline-none cursor-pointer">
              Send feedback
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-white/10 my-2" />
            <DropdownMenu.Item
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 outline-none cursor-pointer"
              onSelect={() => navigate("/signin", { replace: true })}
            >
              <ExitIcon className="w-4 h-4" /> Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
  );
}
