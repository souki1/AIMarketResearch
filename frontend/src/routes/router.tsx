import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../Root";

// Layout components (regular import – used as wrappers with Outlet)
import MainLayout from "../layouts/MainLayout";
import AppLayout from "../applicationPages/AppLayout";
import { useAuth } from "../contexts/AuthContext";

function AppGuard({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <span className="text-white/70">Loading...</span>
      </div>
    );
  }
  if (!token) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

// Lazy load all page components
const HomePage = lazy(() => import("../pages/HomePage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const SolutionsPage = lazy(() => import("../pages/SolutionsPage"));
const CustomersPage = lazy(() => import("../pages/CustomersPage"));
const ResourcesPage = lazy(() => import("../pages/ResourcesPage"));
const CompanyPage = lazy(() => import("../pages/CompanyPage"));
const EnterprisePage = lazy(() => import("../pages/EnterprisePage"));
const SignInPage = lazy(() => import("../pages/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const DashboardPage = lazy(() => import("../applicationPages/DashboardPage"));
const AppProductsPage = lazy(() => import("../applicationPages/ProductsPage"));
const AppCustomersPage = lazy(() => import("../applicationPages/CustomersPage"));
const AppSettingsPage = lazy(() => import("../applicationPages/SettingsPage"));

export const router = createBrowserRouter([ 
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      {
        path: "app",
        element: (
          <AppGuard>
            <AppLayout />
          </AppGuard>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "products", element: <AppProductsPage /> },
          { path: "customers", element: <AppCustomersPage /> },
          { path: "settings", element: <AppSettingsPage /> },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "solutions", element: <SolutionsPage /> },
          { path: "customers", element: <CustomersPage /> },
          { path: "resources", element: <ResourcesPage /> },
          { path: "company", element: <CompanyPage /> },
          { path: "enterprise", element: <EnterprisePage /> },
        ],
      },
    ],
  },
]);
