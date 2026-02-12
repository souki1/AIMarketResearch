import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";

// Layout components (regular import – used as wrappers with Outlet)
import MainLayout from "../layouts/MainLayout";
import AppLayout from "../applicationPages/AppLayout";

// Lazy load all page components
const HomePage = lazy(() => import("../pages/HomePage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const SolutionsPage = lazy(() => import("../pages/SolutionsPage"));
const CustomersPage = lazy(() => import("../pages/CustomersPage"));
const ResourcesPage = lazy(() => import("../pages/ResourcesPage"));
const CompanyPage = lazy(() => import("../pages/CompanyPage"));
const EnterprisePage = lazy(() => import("../pages/EnterprisePage"));
const SignInPage = lazy(() => import("../pages/SignInPage"));
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
      {
        path: "app",
        element: <AppLayout />,
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
