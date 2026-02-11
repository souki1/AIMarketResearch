import { Link, useLocation } from "react-router-dom";

const SIDEBAR_BG = "rgb(31, 39, 45)";
const ACTIVE_COLOR = "rgb(138, 202, 255)";
const ACTIVE_BG = "rgba(138, 202, 255, 0.08)";

const navItems = [
  { label: "Dashboard", to: "/app" },
  { label: "Products", to: "/app/products" },
  { label: "Customers", to: "/app/customers" },
  { label: "Settings", to: "/app/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="w-56 shrink-0 h-full border-r border-white/10 flex flex-col"
      style={{ backgroundColor: SIDEBAR_BG }}
    >
      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        {navItems.map(({ label, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`px-3 py-2 rounded-lg text-[13px] transition-colors no-underline ${
                !isActive && "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              style={
                isActive
                  ? {
                      color: ACTIVE_COLOR,
                      backgroundColor: ACTIVE_BG,
                      textDecoration: "none",
                      outline: "revert",
                    }
                  : undefined
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
