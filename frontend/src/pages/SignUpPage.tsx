import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PAGE_BG = "rgb(31, 39, 45)";
const CARD_BG = "rgb(17, 23, 28)";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim();
    if (!email || !password) return;
    try {
      await register(email, password, name || undefined);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: PAGE_BG }}
    >
      <div className="w-full max-w-sm mx-auto">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
          aria-label="CustomMarket home"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path
              d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M16 8v16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        <div
          className="rounded-xl border border-white/10 p-8 shadow-xl text-center"
          style={{ backgroundColor: CARD_BG }}
        >
          <h1 className="font-display font-bold text-2xl text-white/80 tracking-tight">
            Create account
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sign up to get started with CustomMarket
          </p>

          <form className="mt-6 space-y-4 text-left" onSubmit={handleSubmit}>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <div>
              <label
                htmlFor="signup-name"
                className="block text-xs font-medium text-white/90"
              >
                Name (optional)
              </label>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-medium text-white/90"
              >
                Email
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="signup-password"
                className="block text-xs font-medium text-white/90"
              >
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand py-2 text-sm font-medium text-white hover:bg-brand-light transition-colors cursor-pointer disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-xs text-white/60">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-accent-light hover:underline"
          >
            Log in
          </Link>
        </p>
        <p className="text-center mt-3">
          <Link
            to="/"
            className="text-xs text-white/50 hover:text-white/70 transition-colors"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
