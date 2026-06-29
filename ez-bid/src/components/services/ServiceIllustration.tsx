import type { ReactNode } from "react";

/**
 * Local, dependency-free service illustrations built from simple inline SVG
 * shapes. No external images or icon libraries are used. Each illustration is
 * mapped by service name; unknown services fall back to a generic toolbox.
 */

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, ReactNode> = {
  Landscaping: (
    <Svg>
      <rect x="6" y="48" width="52" height="6" rx="3" fill="#4ade80" />
      <circle cx="22" cy="26" r="12" fill="#16a34a" />
      <rect x="20" y="34" width="4" height="15" fill="#92400e" />
      <circle cx="44" cy="34" r="9" fill="#22c55e" />
      <rect x="42" y="40" width="4" height="9" fill="#92400e" />
      <circle cx="34" cy="44" r="2.5" fill="#f59e0b" />
    </Svg>
  ),
  "Lawn mowing": (
    <Svg>
      <rect x="6" y="50" width="52" height="6" rx="3" fill="#4ade80" />
      <path d="M40 36 L55 19" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="32" width="26" height="13" rx="2" fill="#dc2626" />
      <rect x="18" y="24" width="9" height="9" rx="1" fill="#b91c1c" />
      <circle cx="19" cy="47" r="5" fill="#1f2937" />
      <circle cx="35" cy="47" r="5" fill="#1f2937" />
    </Svg>
  ),
  "Power washing": (
    <Svg>
      <rect x="12" y="28" width="20" height="9" rx="2" fill="#2563eb" />
      <rect x="16" y="37" width="7" height="13" rx="2" fill="#1d4ed8" />
      <rect x="32" y="29" width="14" height="4" rx="1" fill="#64748b" />
      <path
        d="M47 31 L58 23 M47 31 L60 31 M47 31 L58 39"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  ),
  "Handyman services": (
    <Svg>
      <rect x="24" y="18" width="20" height="8" rx="2" fill="#475569" />
      <rect x="32" y="24" width="4" height="26" fill="#92400e" />
      <path d="M16 50 L30 34" stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round" />
      <circle cx="14" cy="52" r="6" fill="none" stroke="#0ea5e9" strokeWidth="4" />
    </Svg>
  ),
  Plumbing: (
    <Svg>
      <path
        d="M18 16 V30 a14 14 0 0 0 14 14 H40"
        stroke="#64748b"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="13" y="13" width="10" height="5" rx="1" fill="#475569" />
      <path
        d="M48 36 c4 6 6 8 6 11 a6 6 0 0 1 -12 0 c0 -3 2 -5 6 -11 z"
        fill="#38bdf8"
      />
    </Svg>
  ),
  HVAC: (
    <Svg>
      <rect x="10" y="20" width="44" height="24" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <line x1="14" y1="37" x2="50" y2="37" stroke="#94a3b8" strokeWidth="2" />
      <g stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round">
        <line x1="22" y1="24" x2="22" y2="33" />
        <line x1="17.5" y1="28.5" x2="26.5" y2="28.5" />
        <line x1="19" y1="25.5" x2="25" y2="31.5" />
        <line x1="25" y1="25.5" x2="19" y2="31.5" />
      </g>
      <circle cx="42" cy="28.5" r="4" fill="#f59e0b" />
      <g stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round">
        <line x1="42" y1="20" x2="42" y2="22" />
        <line x1="42" y1="35" x2="42" y2="37" />
        <line x1="34" y1="28.5" x2="36" y2="28.5" />
        <line x1="48" y1="28.5" x2="50" y2="28.5" />
      </g>
    </Svg>
  ),
  "Electrical work": (
    <Svg>
      <circle cx="32" cy="32" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <path d="M35 14 L21 36 H31 L28 50 L44 27 H34 Z" fill="#f59e0b" />
    </Svg>
  ),
  "Junk removal": (
    <Svg>
      <rect x="16" y="24" width="6" height="5" rx="1" fill="#15803d" />
      <rect x="13" y="28" width="26" height="5" rx="2" fill="#15803d" />
      <path d="M16 33 h20 l-2 19 h-16 z" fill="#16a34a" />
      <line x1="22" y1="38" x2="22" y2="47" stroke="#dcfce7" strokeWidth="2" />
      <line x1="29" y1="38" x2="29" y2="47" stroke="#dcfce7" strokeWidth="2" />
      <path d="M44 38 q5 0 6 7 l1 7 h-12 l1 -7 q1 -7 4 -7 z" fill="#334155" />
    </Svg>
  ),
  "House cleaning": (
    <Svg>
      <path d="M22 32 h22 l-3 20 h-16 z" fill="#2563eb" />
      <path d="M20 32 a13 7 0 0 1 26 0" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      <rect x="38" y="20" width="13" height="8" rx="2" fill="#fbbf24" />
      <circle cx="49" cy="15" r="3" fill="#bae6fd" />
      <circle cx="42" cy="13" r="2" fill="#bae6fd" />
      <circle cx="46" cy="9" r="1.5" fill="#bae6fd" />
    </Svg>
  ),
  "Tree removal": (
    <Svg>
      <ellipse cx="26" cy="38" rx="9" ry="3.5" fill="#b45309" />
      <rect x="17" y="38" width="18" height="13" fill="#92400e" />
      <ellipse cx="26" cy="38" rx="4" ry="1.6" fill="#78350f" />
      <path d="M40 51 L51 25" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      <path d="M49 21 q9 2 6 11 l-11 -3 z" fill="#94a3b8" />
    </Svg>
  ),
  "Gutter cleaning": (
    <Svg>
      <rect x="8" y="24" width="44" height="9" rx="2" fill="#cbd5e1" />
      <rect x="8" y="24" width="44" height="3" fill="#94a3b8" />
      <path d="M16 22 q5 -7 12 -2 q-5 7 -12 2 z" fill="#22c55e" />
      <path d="M28 21 q4 -5 9 -1 q-4 5 -9 1 z" fill="#16a34a" />
      <g stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="42" y1="30" x2="47" y2="52" />
        <line x1="50" y1="30" x2="55" y2="52" />
        <line x1="44" y1="38" x2="52" y2="38" />
        <line x1="46" y1="46" x2="54" y2="46" />
      </g>
    </Svg>
  ),
  "Snow removal": (
    <Svg>
      <path d="M6 52 q14 -11 26 -3 q12 -8 26 3 z" fill="#e0f2fe" />
      <path d="M46 16 L31 39" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 36 l9 9 l7 -7 -9 -9 z" fill="#3b82f6" />
      <g stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round">
        <line x1="16" y1="20" x2="16" y2="28" />
        <line x1="12" y1="24" x2="20" y2="24" />
      </g>
    </Svg>
  ),
  Painting: (
    <Svg>
      <rect x="30" y="18" width="20" height="9" rx="2" fill="#3b82f6" />
      <path d="M30 22 h-6 v9" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="22" y="31" width="4" height="13" fill="#475569" />
      <rect x="13" y="40" width="17" height="14" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="13" y="40" width="17" height="4" fill="#3b82f6" />
    </Svg>
  ),
  "Fence repair": (
    <Svg>
      <g fill="#d97706">
        <path d="M12 26 l4 -5 4 5 v26 h-8 z" />
        <path d="M26 26 l4 -5 4 5 v26 h-8 z" />
        <path d="M40 26 l4 -5 4 5 v26 h-8 z" />
      </g>
      <rect x="8" y="32" width="48" height="4" fill="#b45309" />
      <rect x="8" y="44" width="48" height="4" fill="#b45309" />
    </Svg>
  ),
  "Deck repair": (
    <Svg>
      <rect x="10" y="20" width="44" height="4" fill="#854d0e" />
      <rect x="12" y="24" width="4" height="16" fill="#854d0e" />
      <rect x="48" y="24" width="4" height="16" fill="#854d0e" />
      <g stroke="#a16207" strokeWidth="2">
        <line x1="24" y1="24" x2="24" y2="40" />
        <line x1="32" y1="24" x2="32" y2="40" />
        <line x1="40" y1="24" x2="40" y2="40" />
      </g>
      <g fill="#a16207">
        <rect x="10" y="42" width="44" height="5" rx="1" />
        <rect x="10" y="49" width="44" height="5" rx="1" />
      </g>
    </Svg>
  ),
  "Appliance installation": (
    <Svg>
      <rect x="14" y="14" width="28" height="36" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="28" cy="34" r="9" fill="#bae6fd" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="20" cy="21" r="1.8" fill="#64748b" />
      <circle cx="36" cy="21" r="1.8" fill="#64748b" />
      <path d="M44 52 L52 44" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" />
      <circle cx="53" cy="43" r="4" fill="none" stroke="#0ea5e9" strokeWidth="3" />
    </Svg>
  ),
  "Moving help": (
    <Svg>
      <rect x="12" y="18" width="18" height="16" fill="#d97706" />
      <line x1="21" y1="18" x2="21" y2="34" stroke="#92400e" strokeWidth="2" />
      <rect x="14" y="34" width="20" height="14" fill="#f59e0b" />
      <path d="M40 14 V50" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 50 H52" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <circle cx="44" cy="54" r="4" fill="#1f2937" />
    </Svg>
  ),
  "Small demolition": (
    <Svg>
      <rect x="8" y="48" width="48" height="6" fill="#cbd5e1" />
      <path d="M10 48 l6 -8 6 8 z" fill="#94a3b8" />
      <path d="M22 48 l5 -6 5 6 z" fill="#cbd5e1" />
      <rect x="28" y="16" width="18" height="11" rx="1" fill="#475569" />
      <rect x="35" y="25" width="4" height="22" fill="#92400e" />
    </Svg>
  ),
  "Garage cleanout": (
    <Svg>
      <path d="M10 28 L32 14 L54 28 V52 H10 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <rect x="24" y="34" width="20" height="18" fill="#cbd5e1" />
      <g stroke="#94a3b8" strokeWidth="1.5">
        <line x1="24" y1="40" x2="44" y2="40" />
        <line x1="24" y1="46" x2="44" y2="46" />
      </g>
      <rect x="13" y="44" width="9" height="8" fill="#d97706" />
    </Svg>
  ),
  "Yard cleanup": (
    <Svg>
      <path d="M40 38 h13 l-2 16 h-9 z" fill="#a16207" />
      <path d="M46 16 L30 40" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 41 h16" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
      <g stroke="#15803d" strokeWidth="2" strokeLinecap="round">
        <line x1="24" y1="41" x2="23" y2="47" />
        <line x1="29" y1="41" x2="28.5" y2="47" />
        <line x1="34" y1="41" x2="34" y2="47" />
      </g>
      <circle cx="16" cy="46" r="3" fill="#f59e0b" />
      <circle cx="22" cy="52" r="2.5" fill="#22c55e" />
    </Svg>
  ),
  "Mulch installation": (
    <Svg>
      <path d="M30 50 q11 -14 24 0 z" fill="#92400e" />
      <path d="M14 26 h16 v24 h-16 z" fill="#78350f" />
      <rect x="14" y="26" width="16" height="6" fill="#92400e" />
      <rect x="18" y="36" width="8" height="7" fill="#fbbf24" />
    </Svg>
  ),
  "Pressure washing": (
    <Svg>
      <rect x="14" y="28" width="20" height="20" rx="3" fill="#2563eb" />
      <rect x="17" y="22" width="11" height="6" rx="1" fill="#1d4ed8" />
      <circle cx="20" cy="49" r="3" fill="#1f2937" />
      <circle cx="30" cy="49" r="3" fill="#1f2937" />
      <path d="M34 34 q11 -2 15 -11" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M49 22 l6 -4 M49 22 l7 0 M49 22 l6 4" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  ),
  "Driveway sealing": (
    <Svg>
      <rect x="8" y="40" width="48" height="13" rx="2" fill="#334155" />
      <rect x="8" y="40" width="24" height="13" fill="#1e293b" />
      <line x1="34" y1="46.5" x2="50" y2="46.5" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M46 16 L34 40" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <rect x="26" y="38" width="16" height="5" rx="1" fill="#0f172a" />
    </Svg>
  ),

  // Coming soon
  "Dog grooming": (
    <Svg>
      <circle cx="32" cy="34" r="14" fill="#d6a35c" />
      <path d="M18 22 q-4 8 2 12 z" fill="#a16207" />
      <path d="M46 22 q4 8 -2 12 z" fill="#a16207" />
      <circle cx="27" cy="32" r="2" fill="#1f2937" />
      <circle cx="37" cy="32" r="2" fill="#1f2937" />
      <circle cx="32" cy="38" r="2.5" fill="#1f2937" />
    </Svg>
  ),
  "Pet sitting": (
    <Svg>
      <circle cx="32" cy="40" r="8" fill="#f59e0b" />
      <circle cx="22" cy="28" r="4" fill="#f59e0b" />
      <circle cx="30" cy="24" r="4" fill="#f59e0b" />
      <circle cx="38" cy="24" r="4" fill="#f59e0b" />
      <circle cx="44" cy="30" r="4" fill="#f59e0b" />
    </Svg>
  ),
  "Mobile car detailing": (
    <Svg>
      <path d="M12 40 l4 -10 h24 l8 10 z" fill="#2563eb" />
      <rect x="10" y="40" width="44" height="6" rx="2" fill="#1d4ed8" />
      <circle cx="20" cy="48" r="4" fill="#1f2937" />
      <circle cx="44" cy="48" r="4" fill="#1f2937" />
      <rect x="20" y="32" width="16" height="6" fill="#bae6fd" />
    </Svg>
  ),
  "Pool cleaning": (
    <Svg>
      <rect x="10" y="26" width="44" height="24" rx="4" fill="#bae6fd" />
      <g stroke="#0ea5e9" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M14 34 q5 -4 10 0 t10 0 t10 0" />
        <path d="M14 42 q5 -4 10 0 t10 0 t10 0" />
      </g>
    </Svg>
  ),
  "Pest control": (
    <Svg>
      <ellipse cx="32" cy="36" rx="9" ry="12" fill="#dc2626" />
      <line x1="32" y1="24" x2="32" y2="48" stroke="#7f1d1d" strokeWidth="2" />
      <g stroke="#1f2937" strokeWidth="2" strokeLinecap="round">
        <line x1="23" y1="30" x2="16" y2="26" />
        <line x1="23" y1="38" x2="15" y2="38" />
        <line x1="41" y1="30" x2="48" y2="26" />
        <line x1="41" y1="38" x2="49" y2="38" />
        <line x1="28" y1="22" x2="24" y2="16" />
        <line x1="36" y1="22" x2="40" y2="16" />
      </g>
    </Svg>
  ),
  Roofing: (
    <Svg>
      <path d="M8 32 L32 14 L56 32 Z" fill="#dc2626" />
      <rect x="16" y="32" width="32" height="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <rect x="28" y="40" width="8" height="12" fill="#a16207" />
    </Svg>
  ),
  Masonry: (
    <Svg>
      <g fill="#d97706" stroke="#9a3412" strokeWidth="1.5">
        <rect x="12" y="22" width="18" height="9" />
        <rect x="34" y="22" width="18" height="9" />
        <rect x="20" y="33" width="18" height="9" />
        <rect x="42" y="33" width="10" height="9" />
        <rect x="12" y="33" width="6" height="9" />
        <rect x="12" y="44" width="18" height="9" />
        <rect x="34" y="44" width="18" height="9" />
      </g>
    </Svg>
  ),
  "Concrete work": (
    <Svg>
      <rect x="10" y="42" width="44" height="10" rx="1" fill="#94a3b8" />
      <path d="M40 14 L30 42" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <rect x="22" y="38" width="18" height="5" rx="1" fill="#475569" />
      <path d="M46 24 l4 18 h-8 z" fill="#f59e0b" />
    </Svg>
  ),
  "Window cleaning": (
    <Svg>
      <rect x="14" y="14" width="28" height="28" rx="2" fill="#bae6fd" stroke="#60a5fa" strokeWidth="2" />
      <line x1="28" y1="14" x2="28" y2="42" stroke="#60a5fa" strokeWidth="2" />
      <line x1="14" y1="28" x2="42" y2="28" stroke="#60a5fa" strokeWidth="2" />
      <rect x="40" y="40" width="12" height="4" rx="1" fill="#475569" transform="rotate(45 46 42)" />
      <line x1="48" y1="44" x2="54" y2="50" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  ),
  "Carpet cleaning": (
    <Svg>
      <path d="M16 22 h30 a6 6 0 0 1 0 24 h-30 z" fill="#7c3aed" />
      <ellipse cx="16" cy="34" rx="6" ry="12" fill="#a78bfa" />
      <path d="M46 22 v24" stroke="#5b21b6" strokeWidth="2" />
    </Svg>
  ),
  Locksmith: (
    <Svg>
      <circle cx="24" cy="28" r="10" fill="none" stroke="#f59e0b" strokeWidth="5" />
      <rect x="29" y="32" width="20" height="5" fill="#f59e0b" transform="rotate(45 29 32)" />
      <rect x="44" y="44" width="6" height="4" fill="#f59e0b" />
      <rect x="48" y="48" width="5" height="4" fill="#f59e0b" />
    </Svg>
  ),
  "Security camera installation": (
    <Svg>
      <rect x="14" y="22" width="28" height="14" rx="3" fill="#475569" transform="rotate(-12 28 29)" />
      <circle cx="20" cy="26" r="3" fill="#bae6fd" />
      <rect x="40" y="20" width="6" height="6" rx="1" fill="#334155" />
      <line x1="30" y1="36" x2="30" y2="50" stroke="#94a3b8" strokeWidth="3" />
      <rect x="24" y="50" width="12" height="3" rx="1" fill="#94a3b8" />
    </Svg>
  ),
  "Smart home setup": (
    <Svg>
      <path d="M12 34 L32 18 L52 34 V52 H12 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <g stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M28 40 a6 6 0 0 1 8 0" />
        <path d="M25 36 a11 11 0 0 1 14 0" />
      </g>
      <circle cx="32" cy="44" r="2" fill="#16a34a" />
    </Svg>
  ),
  "Computer help": (
    <Svg>
      <rect x="16" y="18" width="32" height="22" rx="2" fill="#475569" />
      <rect x="19" y="21" width="26" height="16" fill="#bae6fd" />
      <path d="M10 46 h44 l-3 -6 h-38 z" fill="#94a3b8" />
    </Svg>
  ),
  "Small engine repair": (
    <Svg>
      <circle cx="32" cy="32" r="10" fill="#64748b" />
      <circle cx="32" cy="32" r="4" fill="#e2e8f0" />
      <g fill="#475569">
        <rect x="29" y="14" width="6" height="6" />
        <rect x="29" y="44" width="6" height="6" />
        <rect x="14" y="29" width="6" height="6" />
        <rect x="44" y="29" width="6" height="6" />
        <rect x="19" y="19" width="6" height="6" transform="rotate(45 22 22)" />
        <rect x="39" y="39" width="6" height="6" transform="rotate(45 42 42)" />
      </g>
    </Svg>
  ),
};

const FALLBACK = (
  <Svg>
    <rect x="10" y="28" width="44" height="22" rx="3" fill="#3b82f6" />
    <rect x="24" y="20" width="16" height="8" rx="2" fill="#1d4ed8" />
    <rect x="10" y="36" width="44" height="4" fill="#1d4ed8" />
    <rect x="28" y="34" width="8" height="8" rx="1" fill="#e2e8f0" />
  </Svg>
);

/**
 * Some surfaces (e.g. the job categories / customer dashboard) use slightly
 * different service names than the Services page. Map those to the canonical
 * illustration key so the same visuals are reused everywhere.
 */
const NAME_ALIASES: Record<string, string> = {
  "Lawn Mowing": "Lawn mowing",
  "Power Washing": "Power washing",
  Handyman: "Handyman services",
  Electrical: "Electrical work",
  "Tree Removal": "Tree removal",
  "Junk Removal": "Junk removal",
  "House Cleaning": "House cleaning",
};

function resolveName(name: string): string {
  return NAME_ALIASES[name] ?? name;
}

// Soft tinted background per service (canonical keys), matching the Services page.
const SERVICE_TINTS: Record<string, string> = {
  Landscaping: "bg-emerald-50",
  "Lawn mowing": "bg-lime-50",
  "Power washing": "bg-blue-50",
  "Handyman services": "bg-orange-50",
  Plumbing: "bg-sky-50",
  HVAC: "bg-cyan-50",
  "Electrical work": "bg-amber-50",
  "Junk removal": "bg-stone-100",
  "House cleaning": "bg-violet-50",
  "Tree removal": "bg-emerald-50",
};

export function serviceTint(name: string): string {
  return SERVICE_TINTS[resolveName(name)] ?? "bg-slate-100";
}

export function ServiceIllustration({
  name,
  muted = false,
  className = "h-12 w-12",
}: {
  name: string;
  muted?: boolean;
  className?: string;
}) {
  const art = ILLUSTRATIONS[resolveName(name)] ?? FALLBACK;
  return (
    <span
      className={`inline-flex ${className} ${muted ? "opacity-50 grayscale" : ""}`}
    >
      {art}
    </span>
  );
}
