import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme appearance="dark">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Theme>
  </StrictMode>
);
