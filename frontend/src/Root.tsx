import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

function Root() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <span className="text-slate-500">Loading...</span>
        </div>
      }
    >
      <Outlet />
      <Analytics />
    </Suspense>
  );
}

export default Root;
