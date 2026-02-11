import { Suspense } from "react";
import { Outlet } from "react-router-dom";
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
    </Suspense>
  );
}

export default Root;
