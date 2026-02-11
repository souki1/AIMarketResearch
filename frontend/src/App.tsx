import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import TrustBar from "./components/TrustBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import SolutionsPage from "./pages/SolutionsPage";
import CustomersPage from "./pages/CustomersPage";
import ResourcesPage from "./pages/ResourcesPage";
import CompanyPage from "./pages/CompanyPage";
import EnterprisePage from "./pages/EnterprisePage";
import SignInPage from "./pages/SignInPage";
import AppLayout from "./applicationPages/AppLayout";
import DashboardPage from "./applicationPages/DashboardPage";

function MainLayout() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
