export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  PRODUCTS: "/products",
  SOLUTIONS: "/solutions",
  CUSTOMERS: "/customers",
  RESOURCES: "/resources",
  COMPANY: "/company",
  ENTERPRISE: "/enterprise",
  // App (post-login)
  APP: "/app",
  APP_DASHBOARD: "/app",
  APP_SETTINGS: "/app/settings",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
