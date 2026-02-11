import { Outlet } from "react-router-dom";
import TrustBar from "../components/TrustBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <TrustBar />
      <Navbar />
      <main className="flex-1 pt-[104px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
