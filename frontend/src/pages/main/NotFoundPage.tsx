import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function NotFoundPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-display text-6xl font-bold text-slate-200">404</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand mt-4">
          Page not found
        </h1>
        <p className="mt-4 text-slate-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors"
        >
          Back to home
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
