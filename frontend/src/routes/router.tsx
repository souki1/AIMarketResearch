import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import ErrorFallback from "../components/ErrorFallback";

// Layout components (regular import – used as wrappers with Outlet)
import MainLayout from "../layouts/MainLayout";


// Lazy load all page components
const HomePage = lazy(() => import("../pages/main/HomePage"));
const ProductsPage = lazy(() => import("../pages/main/ProductsPage"));
const SolutionsPage = lazy(() => import("../pages/main/SolutionsPage"));
const CustomersPage = lazy(() => import("../pages/main/CustomersPage"));
const ResourcesPage = lazy(() => import("../pages/main/ResourcesPage"));
const CompanyPage = lazy(() => import("../pages/main/CompanyPage"));
const EnterprisePage = lazy(() => import("../pages/main/EnterprisePage"));
const NotFoundPage = lazy(() => import("../pages/main/NotFoundPage"));


export const router = createBrowserRouter([ 
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorFallback />,
    children: [
      // { path: "signin", element: <SignInPage /> },
      // { path: "signup", element: <SignUpPage /> },
      // {
      //   path: "app",
      //   element: (
      //     <AppGuard>
      //       <AppLayout />
      //     </AppGuard>
      //   ),
      //   children: [
      //     { index: true, element: <FilesPage /> },
      //     { path: "research/:fileId", element: <ResearchPage /> },
      //     { path: "products", element: <AppProductsPage /> },
      //     { path: "customers", element: <AppCustomersPage /> },
      //     { path: "settings", element: <AppSettingsPage /> },
      //   ],
      // },
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
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
