import { AUTH_ROUTES } from "./paths/authPaths";
import { APP_ROUTES } from "./paths/appPaths";

export const ROUTES = {
  HOME: "/",
  ...AUTH_ROUTES,
  PRODUCTS: "/products",
  /** @deprecated Use PRODUCTS — `/solutions` redirects to `/products`. */
  SOLUTIONS: "/solutions",
  CUSTOMERS: "/customers",
  RESOURCES: "/resources",
  COMPANY: "/company",
  ENTERPRISE: "/enterprise",
  ...APP_ROUTES,
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

// Re-export for direct imports
export { AUTH_ROUTES } from "./paths/authPaths";
export { APP_ROUTES } from "./paths/appPaths";
