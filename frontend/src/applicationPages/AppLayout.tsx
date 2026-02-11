import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
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
        <main className="flex-1 min-w-0 overflow-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
