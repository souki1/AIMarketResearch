import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const SIDEBAR_BG = "rgb(31, 39, 45)";

  return (
    <div className="flex flex-col h-screen bg-[SIDEBAR_BG] " style={{ backgroundColor: SIDEBAR_BG }}>
      <Navbar
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div
          className={`overflow-hidden transition-[width] duration-500 ease-in-out shrink-0 ${
            sidebarOpen ? "w-56" : "w-0"
          }`}
        >
          <Sidebar />
        </div>
        <div className="flex-1 min-h-0 px-1 py-1 flex">
          <main
            className="w-[99.5%] h-full min-h-0 overflow-auto rounded-lg scroll-smooth scrollbar-app"
            style={{ backgroundColor: "var(--dubois-global-background-color, #1f272d)" }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
