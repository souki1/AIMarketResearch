import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "rgb(31, 39, 45)" }}
    >
      <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6 justify-center">
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
      </div>
        <div
          className="rounded-xl border border-white/10 p-8 shadow-xl text-center"
          style={{ backgroundColor: "rgb(17, 23, 28)" }}
        >
          <h1 className="font-display font-bold text-2xl text-white/80 tracking-tight">Log in</h1>
        

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              className="w-full cursor-pointer flex items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full cursor-pointer flex items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Continue with Microsoft
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-white/20" aria-hidden="true" />
            <span className="text-xs text-white/50">or</span>
            <span className="flex-1 h-px bg-white/20" aria-hidden="true" />
          </div>

          {!showEmailForm ? (
            <button
              type="button"
              onClick={() => setShowEmailForm(true)}
              className="mt-6 w-full cursor-pointer flex items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors font-medium"
            >
              <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Continue with email
            </button>
          ) : (
            <form className="mt-6 space-y-4 text-left">
              <div>
<label htmlFor="email" className="block text-xs font-medium text-white/90">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="you@company.com"
                />
              </div>
              <div>
<label htmlFor="password" className="block text-xs font-medium text-white/90">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-brand py-2 text-sm font-medium text-white hover:bg-brand-light transition-colors"
              >
                Sign in with email
              </button>
            </form>
          )}

       
       
        </div>
        <p className="text-center mt-10 text-xs text-white/60">
          Don't have an account? <Link to="/company" className="font-medium text-accent-light hover:underline text-xs">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
