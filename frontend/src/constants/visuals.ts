const svg = (title: string, subtitle: string, accent: string, elements: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="0.58" stop-color="#102033"/>
      <stop offset="1" stop-color="#16283d"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" x2="1">
      <stop offset="0" stop-color="#f8fafc"/>
      <stop offset="1" stop-color="#dbeafe"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#020617" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <path d="M0 604 C196 552 310 658 520 604 C742 546 836 576 1200 474 L1200 800 L0 800 Z" fill="#0b1626"/>
  <g opacity="0.18" stroke="#60a5fa" stroke-width="1">
    ${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 86 - 90} 0V800"/>`).join("")}
    ${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${i * 86}H1200"/>`).join("")}
  </g>
  <g filter="url(#shadow)">
    ${elements}
  </g>
  <rect x="72" y="68" width="420" height="92" rx="22" fill="#ffffff" opacity="0.93"/>
  <text x="102" y="112" font-family="Inter, Arial, sans-serif" font-size="27" font-weight="700" fill="#0f172a">${title}</text>
  <text x="102" y="140" font-family="Inter, Arial, sans-serif" font-size="16" fill="#475569">${subtitle}</text>
  <circle cx="1080" cy="106" r="50" fill="${accent}" opacity="0.9"/>
  <path d="M1058 106h44M1080 84v44" stroke="white" stroke-width="10" stroke-linecap="round"/>
</svg>`)}`

const partBlocks = `
  <rect x="178" y="260" width="252" height="190" rx="26" fill="url(#panel)"/>
  <circle cx="304" cy="355" r="66" fill="#94a3b8"/>
  <circle cx="304" cy="355" r="30" fill="#e2e8f0"/>
  <rect x="472" y="242" width="354" height="232" rx="28" fill="#f8fafc"/>
  <rect x="514" y="286" width="236" height="24" rx="12" fill="#0ea5e9"/>
  <rect x="514" y="338" width="186" height="20" rx="10" fill="#94a3b8"/>
  <rect x="514" y="386" width="260" height="20" rx="10" fill="#94a3b8"/>
  <path d="M304 450v90h572" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/>
  <rect x="872" y="504" width="150" height="72" rx="18" fill="#22c55e"/>
`;

const dashboardBlocks = `
  <rect x="164" y="196" width="806" height="418" rx="34" fill="#f8fafc"/>
  <rect x="164" y="196" width="806" height="68" rx="34" fill="#e2e8f0"/>
  <circle cx="210" cy="230" r="10" fill="#ef4444"/><circle cx="244" cy="230" r="10" fill="#f59e0b"/><circle cx="278" cy="230" r="10" fill="#22c55e"/>
  <rect x="222" y="316" width="240" height="190" rx="24" fill="#dbeafe"/>
  <rect x="526" y="318" width="342" height="28" rx="14" fill="#0ea5e9"/>
  <rect x="526" y="376" width="270" height="22" rx="11" fill="#94a3b8"/>
  <rect x="526" y="428" width="312" height="22" rx="11" fill="#94a3b8"/>
  <rect x="526" y="480" width="198" height="22" rx="11" fill="#94a3b8"/>
  <path d="M260 464l58-72 52 38 76-98" fill="none" stroke="#0284c7" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
`;

const supplierBlocks = `
  <circle cx="600" cy="376" r="86" fill="#f8fafc"/>
  <text x="600" y="390" text-anchor="middle" font-family="Inter, Arial" font-size="28" font-weight="700" fill="#0f172a">AI</text>
  ${[
    [300, 232],
    [880, 230],
    [250, 548],
    [920, 540],
    [598, 626],
  ]
    .map(
      ([x, y]) => `
  <line x1="600" y1="376" x2="${x}" y2="${y}" stroke="#38bdf8" stroke-width="8" opacity="0.7"/>
  <rect x="${x - 86}" y="${y - 38}" width="172" height="76" rx="20" fill="#f8fafc"/>
  <circle cx="${x - 52}" cy="${y}" r="16" fill="#0ea5e9"/>
  <rect x="${x - 24}" y="${y - 14}" width="72" height="12" rx="6" fill="#64748b"/>
  <rect x="${x - 24}" y="${y + 10}" width="104" height="10" rx="5" fill="#cbd5e1"/>`,
    )
    .join("")}
`;

const logisticsBlocks = `
  <rect x="142" y="426" width="350" height="104" rx="18" fill="#f8fafc"/>
  <rect x="220" y="336" width="202" height="90" rx="16" fill="#dbeafe"/>
  <circle cx="226" cy="548" r="34" fill="#64748b"/><circle cx="424" cy="548" r="34" fill="#64748b"/>
  <path d="M562 480h212l66 68h-278z" fill="#f8fafc"/>
  <circle cx="628" cy="570" r="34" fill="#64748b"/><circle cx="810" cy="570" r="34" fill="#64748b"/>
  <path d="M212 300c180-88 442-82 650 22" fill="none" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" stroke-dasharray="22 24"/>
  <path d="M850 316l-72-4 40 60z" fill="#38bdf8"/>
`;

const factoryBlocks = `
  <path d="M138 552V328l164 82V328l168 84V256h312v296z" fill="#f8fafc"/>
  <rect x="508" y="298" width="214" height="42" rx="8" fill="#cbd5e1"/>
  <rect x="190" y="460" width="70" height="58" rx="10" fill="#0ea5e9"/>
  <rect x="320" y="460" width="70" height="58" rx="10" fill="#0ea5e9"/>
  <rect x="500" y="460" width="70" height="58" rx="10" fill="#0ea5e9"/>
  <path d="M828 552V246h126v306z" fill="#dbeafe"/>
  <path d="M850 246h82l-18-72h-46z" fill="#94a3b8"/>
  <path d="M148 604h904" stroke="#38bdf8" stroke-width="14" stroke-linecap="round"/>
`;

const securityBlocks = `
  <rect x="258" y="210" width="660" height="390" rx="34" fill="#f8fafc"/>
  <path d="M588 286l154 58v96c0 94-64 144-154 178-90-34-154-84-154-178v-96z" fill="#dbeafe"/>
  <path d="M522 434l46 46 96-116" fill="none" stroke="#0ea5e9" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="306" y="276" width="112" height="18" rx="9" fill="#94a3b8"/>
  <rect x="764" y="276" width="112" height="18" rx="9" fill="#94a3b8"/>
  <rect x="306" y="520" width="142" height="18" rx="9" fill="#94a3b8"/>
  <rect x="734" y="520" width="142" height="18" rx="9" fill="#94a3b8"/>
`;

export const VISUALS = {
  aiRecommendation: svg("AI recommendation engine", "Ranked supplier awards with explainable scoring", "#2563eb", dashboardBlocks),
  dashboard: svg("Sourcing dashboard", "Cost, lead time, MOQ, and supplier fit in one view", "#0ea5e9", dashboardBlocks),
  factory: svg("Manufacturing operations", "Built for plant teams, buyers, and suppliers", "#0284c7", factoryBlocks),
  landedCost: svg("Landed cost model", "Unit price plus freight, duty, and lead-time risk", "#16a34a", logisticsBlocks),
  logistics: svg("Freight and lead-time lanes", "Compare delivery paths before awarding suppliers", "#0891b2", logisticsBlocks),
  partResearch: svg("Part research workspace", "OEM, aftermarket, and alternate part intelligence", "#2563eb", partBlocks),
  security: svg("Enterprise controls", "Identity, audit, and governed supplier data", "#334155", securityBlocks),
  supplierNetwork: svg("Supplier network", "Multi-source market research for manufacturing parts", "#0ea5e9", supplierBlocks),
} as const;
