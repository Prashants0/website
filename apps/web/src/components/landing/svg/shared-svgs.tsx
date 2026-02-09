"use client";

import type { AccentColor } from "../data";

/* ═══════════════════════════════════════════════════════════
   SHARED / REUSABLE SVG COMPONENTS
   Used across multiple pages (homepage, product, pricing, nav)
   ═══════════════════════════════════════════════════════════ */

/** Renders a product icon from its `d` path string */
export function ProductIcon({
  d,
  size = 16,
  className = "",
}: {
  d: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

/** Green circle checkmark for comparison tables */
export function TableCheckmarkSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`mx-auto size-5 ${className}`}>
      <circle cx="10" cy="10" r="8" fill="var(--color-success)" fillOpacity="0.12" />
      <path
        d="M6 10 L9 13 L14 7"
        stroke="var(--color-success)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Horizontal dash for comparison tables */
export function TableDashSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`mx-auto size-5 opacity-40 ${className}`}>
      <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Protocol dot icon (concentric circles) */
export function ProtocolDotSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={`size-3 ${className}`}>
      <circle cx="6" cy="6" r="4" stroke="var(--color-brand)" strokeWidth="1" fill="var(--color-brand)" fillOpacity="0.15" />
      <circle cx="6" cy="6" r="1.5" fill="var(--color-brand)" />
    </svg>
  );
}

/** Quotation mark SVG for testimonials */
export function QuoteMarkSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`mb-4 text-brand opacity-40 ${className}`}
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

/** Small checkmark in circle, accent-colored. Used in feature cards on product page. */
export function FeatureCheckSvg({
  accent,
  className = "",
}: {
  accent: AccentColor;
  className?: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`size-5 ${className}`}>
      <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
      <path d="M7 10 L9 12 L13 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Tiny checkmark in circle for pricing feature lists on product page */
export function PricingCheckSvg({
  accent,
  className = "",
}: {
  accent: AccentColor;
  className?: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`size-3.5 shrink-0 ${className}`}>
      <circle cx="8" cy="8" r="6" fill={color} fillOpacity="0.12" />
      <path d="M5.5 8 L7 9.5 L10.5 6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Integration dot icon used on product page integration section */
export function IntegrationDotSvg({
  accent,
  className = "",
}: {
  accent: AccentColor;
  className?: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`size-4 shrink-0 ${className}`}>
      <circle cx="8" cy="8" r="5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.15" />
      <circle cx="8" cy="8" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

/** Fallback use-case circle icon */
export function UseCaseFallbackSvg({
  accent,
  className = "",
}: {
  accent: AccentColor;
  className?: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <svg viewBox="0 0 32 32" fill="none" className={`size-8 ${className}`}>
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08" />
    </svg>
  );
}

/** Horizontal arrow connector between pipeline steps (desktop layout) */
export function HorizontalArrowConnector({
  animDur,
  className = "",
}: {
  animDur: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 60 24" fill="none" className={`mx-3 hidden h-6 w-[60px] shrink-0 lg:block ${className}`}>
      <line x1="0" y1="12" x2="48" y2="12" stroke="var(--color-brand)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <path d="M44 6 L54 12 L44 18" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" opacity="0.75" />
      <circle r="2" fill="var(--color-brand)" opacity="0.75">
        <animate attributeName="cx" from="0" to="48" dur={animDur} repeatCount="indefinite" />
        <animate attributeName="cy" values="12" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/** Vertical arrow connector between pipeline steps (mobile layout) */
export function VerticalArrowConnector({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 40" fill="none" className={`my-3 block h-[40px] w-6 lg:hidden ${className}`}>
      <line x1="12" y1="0" x2="12" y2="32" stroke="var(--color-brand)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <path d="M6 28 L12 38 L18 28" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" opacity="0.75" />
    </svg>
  );
}

/** Mini architecture diagram for homepage product tab (Input -> Engine -> Output) */
export function MiniArchDiagramSvg({
  inputLabel,
  engineName,
  engineTech,
  accent,
  className = "",
}: {
  inputLabel: string;
  engineName: string;
  engineTech: string;
  accent: AccentColor;
  className?: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <svg viewBox="0 0 300 60" fill="none" className={`w-full ${className}`}>
      {/* Input box */}
      <rect x="0" y="10" width="80" height="40" rx="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      <text x="40" y="34" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="var(--font-mono)" opacity="0.7">
        {inputLabel}
      </text>
      {/* Arrow 1 */}
      <svg viewBox="0 0 40 20" x="90" y="20" width="40" height="20">
        <line x1="0" y1="10" x2="30" y2="10" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
        <path d="M28 4 L36 10 L28 16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.75" />
      </svg>
      {/* Engine box */}
      <rect x="140" y="5" width="80" height="50" rx="8" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.06" />
      <text x="180" y="28" textAnchor="middle" fill={color} fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
        {engineName}
      </text>
      <text x="180" y="40" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.65">
        {engineTech}
      </text>
      {/* Arrow 2 */}
      <svg viewBox="0 0 40 20" x="230" y="20" width="40" height="20">
        <line x1="0" y1="10" x2="30" y2="10" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
        <path d="M28 4 L36 10 L28 16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.75" />
      </svg>
      {/* Output box */}
      <rect x="280" y="10" width="20" height="40" rx="4" stroke="var(--color-success)" strokeWidth="1" fill="var(--color-success)" fillOpacity="0.08" />
      <text x="290" y="18" textAnchor="middle" fill="var(--color-success)" fontSize="6" fontFamily="var(--font-mono)">
        Signed
      </text>
      <path d="M285 30 L288 33 L295 26" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
