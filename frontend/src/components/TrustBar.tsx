export default function TrustBar() {
  return (
    <div className="trust-bar fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden />
            SOC 2 Type II
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden />
            GDPR compliant
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden />
            ISO 27001
          </span>
          <span className="text-white/60">Trusted by 500+ enterprises globally</span>
        </div>
      </div>
    </div>
  );
}
