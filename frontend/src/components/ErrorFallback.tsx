import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorFallback() {
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const message = is404
    ? "The page you're looking for doesn't exist."
    : "Something went wrong. Please try again.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md mx-auto text-center">
        <p className="font-display text-6xl font-bold text-slate-200">
          {is404 ? "404" : "Oops"}
        </p>
        <h1 className="font-display text-2xl font-bold text-brand mt-4">
          {is404 ? "Page not found" : "Something went wrong"}
        </h1>
        <p className="mt-4 text-slate-600">{message}</p>
        {!is404 && error instanceof Error && (
          <p className="mt-2 text-sm text-slate-500 font-mono truncate max-w-full">
            {error.message}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg text-base font-semibold text-brand border-2 border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Reload page
          </button>
          <Link
            to="/"
            className="px-6 py-3 rounded-lg text-base font-semibold text-white bg-brand hover:bg-brand-light transition-colors text-center"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
