import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="apple-site enterprise-app min-h-screen flex flex-col">
      <Navbar />
      <main className="enterprise-main flex-1 pt-16 relative">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="enterprise-main-grid absolute inset-0 opacity-[0.45]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(1400px,100%)] h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.07),transparent_65%)]" />
        </div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
