"use client";

import type React from "react";

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE SVG COMPONENTS
   Extracted from apps/web/src/app/(marketing)/page.tsx
   ═══════════════════════════════════════════════════════════ */

/** Animated circuit-board background pattern */
export function CircuitBoardSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal lines */}
      <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.25" />
      <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.18" />
      <line x1="0" y1="300" x2="800" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.25" />
      <line x1="0" y1="400" x2="800" y2="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.18" />
      <line x1="0" y1="500" x2="800" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.25" />
      {/* Vertical lines */}
      <line x1="160" y1="0" x2="160" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.18" />
      <line x1="320" y1="0" x2="320" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.25" />
      <line x1="480" y1="0" x2="480" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.18" />
      <line x1="640" y1="0" x2="640" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.25" />
      {/* Junction nodes */}
      {[
        [160, 100], [320, 100], [480, 200], [640, 300],
        [160, 300], [320, 400], [480, 400], [640, 500],
        [320, 200], [480, 300], [160, 500], [640, 100],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3" fill="var(--color-brand)" opacity="0.45">
            <animate attributeName="opacity" values="0.3;0.65;0.3" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r="1.5" fill="var(--color-brand)" opacity="0.7" />
        </g>
      ))}
      {/* Trace paths connecting nodes */}
      <path d="M160 100 L320 100 L320 200 L480 200 L480 300 L640 300" stroke="var(--color-brand)" strokeWidth="1" opacity="0.25" fill="none">
        <animate attributeName="stroke-dashoffset" from="600" to="0" dur="8s" repeatCount="indefinite" />
      </path>
      <path d="M160 300 L320 400 L480 400 L640 500" stroke="var(--color-violet)" strokeWidth="1" opacity="0.2" fill="none" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="500" to="0" dur="10s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

/** Hero: Signing architecture flow diagram */
export function ArchitectureDiagramSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowLineV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central hub - SignSecure core */}
      <circle cx="260" cy="210" r="60" fill="url(#nodeGlow)" />
      <circle cx="260" cy="210" r="44" stroke="var(--color-brand)" strokeWidth="2" fill="none" opacity="0.45">
        <animate attributeName="r" values="44;48;44" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.45;0.25;0.45" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="210" r="36" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.08" />
      {/* Lock icon in center */}
      <g transform="translate(260,210)">
        <rect x="-10" y="-4" width="20" height="14" rx="2" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
        <path d="M-6 -4 L-6 -10 Q-6 -16 0 -16 Q6 -16 6 -10 L6 -4" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
        <circle cx="0" cy="3" r="2" fill="var(--color-brand)" />
      </g>
      <text x="260" y="270" textAnchor="middle" fill="var(--color-brand)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">SIGNSECURE</text>

      {/* Node: Desktop (top-left) - SignSecure Win */}
      <g>
        <line x1="160" y1="115" x2="225" y2="175" stroke="url(#flowLine)" strokeWidth="1.5" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3s" repeatCount="indefinite" />
        </line>
        <rect x="60" y="60" rx="12" ry="12" width="120" height="72" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
        <g transform="translate(120, 82)">
          <rect x="-14" y="-8" width="28" height="18" rx="2" stroke="var(--color-brand)" strokeWidth="1.2" fill="none" />
          <line x1="-6" y1="14" x2="6" y2="14" stroke="var(--color-brand)" strokeWidth="1.2" />
          <line x1="0" y1="10" x2="0" y2="14" stroke="var(--color-brand)" strokeWidth="1.2" />
        </g>
        <text x="120" y="114" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.85">WIN DESKTOP</text>
        <text x="120" y="125" textAnchor="middle" fill="var(--color-brand)" fontSize="7.5" fontFamily="var(--font-mono)" opacity="0.7">10K+ PDFs/batch</text>
      </g>

      {/* Node: Bridge (top-right) - SignBridge */}
      <g>
        <line x1="360" y1="115" x2="295" y2="175" stroke="var(--color-violet)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3.5s" repeatCount="indefinite" />
        </line>
        <rect x="340" y="60" rx="12" ry="12" width="120" height="72" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.06" />
        <g transform="translate(400, 82)">
          <path d="M-12 0 L0 -8 L12 0 L0 8Z" stroke="var(--color-violet)" strokeWidth="1.2" fill="none" />
          <path d="M-12 5 L0 13 L12 5" stroke="var(--color-violet)" strokeWidth="1.2" fill="none" />
          <path d="M-12 -5 L0 -13 L12 -5" stroke="var(--color-violet)" strokeWidth="1.2" fill="none" opacity="0.5" />
        </g>
        <text x="400" y="114" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.85">LOCALHOST BRIDGE</text>
        <text x="400" y="125" textAnchor="middle" fill="var(--color-violet)" fontSize="7.5" fontFamily="var(--font-mono)" opacity="0.7">0ms key exposure</text>
      </g>

      {/* Node: Cloud (bottom-right) - Signly API */}
      <g>
        <line x1="360" y1="310" x2="295" y2="250" stroke="var(--color-cyan)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="4s" repeatCount="indefinite" />
        </line>
        <rect x="340" y="290" rx="12" ry="12" width="120" height="72" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.06" />
        <g transform="translate(400, 312)">
          <path d="M-10 2 Q-14 2 -14 -2 Q-14 -6 -10 -7 Q-8 -12 -2 -12 Q4 -12 6 -8 Q12 -8 12 -3 Q12 2 8 2Z" stroke="var(--color-cyan)" strokeWidth="1.2" fill="none" />
          <text x="0" y="2" textAnchor="middle" fill="var(--color-cyan)" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">API</text>
        </g>
        <text x="400" y="344" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.85">CLOUD ENGINE</text>
        <text x="400" y="355" textAnchor="middle" fill="var(--color-cyan)" fontSize="7.5" fontFamily="var(--font-mono)" opacity="0.7">99.99% uptime</text>
      </g>

      {/* Node: Platform (bottom-left) - Moonlight */}
      <g>
        <line x1="160" y1="310" x2="225" y2="250" stroke="var(--color-amber)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3.8s" repeatCount="indefinite" />
        </line>
        <rect x="60" y="290" rx="12" ry="12" width="120" height="72" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.06" />
        <g transform="translate(120, 316)">
          <rect x="-12" y="-10" width="10" height="10" rx="2" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" />
          <rect x="2" y="-10" width="10" height="10" rx="2" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" />
          <rect x="-12" y="2" width="10" height="10" rx="2" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" />
          <rect x="2" y="2" width="10" height="10" rx="2" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" />
        </g>
        <text x="120" y="344" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.85">SAAS PLATFORM</text>
        <text x="120" y="355" textAnchor="middle" fill="var(--color-amber)" fontSize="7.5" fontFamily="var(--font-mono)" opacity="0.7">3 sign methods</text>
      </g>

      {/* Orbiting data packets */}
      <circle r="3" fill="var(--color-brand)" filter="url(#softGlow)">
        <animateMotion dur="6s" repeatCount="indefinite" path="M225 175 Q260 150 295 175 Q260 195 225 175" />
      </circle>
      <circle r="2.5" fill="var(--color-cyan)" filter="url(#softGlow)">
        <animateMotion dur="7s" repeatCount="indefinite" path="M295 250 Q330 280 360 310 Q330 280 295 250" />
      </circle>
      <circle r="2.5" fill="var(--color-amber)" filter="url(#softGlow)">
        <animateMotion dur="5.5s" repeatCount="indefinite" path="M225 250 Q180 280 160 310 Q180 280 225 250" />
      </circle>

      {/* Protocol labels around center */}
      <text x="260" y="156" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55" letterSpacing="0.15em">X.509 / PAdES / LTV</text>
      <text x="260" y="290" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55" letterSpacing="0.15em">SHA-256 / AES-256 / JWT</text>
    </svg>
  );
}

/** Cryptographic shield SVG for trust section */
export function CryptoShieldSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4 L56 16 L56 32 Q56 52 32 60 Q8 52 8 32 L8 16 Z" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <path d="M32 12 L48 20 L48 32 Q48 46 32 52 Q16 46 16 32 L16 20 Z" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M24 32 L30 38 L40 26" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Key/lock SVG for zero-exposure */
export function KeySvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="28" r="12" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.06" />
      <circle cx="24" cy="28" r="6" stroke="var(--color-violet)" strokeWidth="1" fill="none" opacity="0.4" />
      <line x1="36" y1="28" x2="56" y2="28" stroke="var(--color-violet)" strokeWidth="1.5" />
      <line x1="48" y1="28" x2="48" y2="36" stroke="var(--color-violet)" strokeWidth="1.5" />
      <line x1="54" y1="28" x2="54" y2="34" stroke="var(--color-violet)" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="2.5" fill="var(--color-violet)" />
    </svg>
  );
}

/** Cloud/serverless SVG */
export function ServerlessSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 38 Q8 38 8 30 Q8 22 16 20 Q20 10 30 10 Q40 10 44 18 Q54 16 56 24 Q58 32 50 36 L50 38 Z" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.06" />
      <g transform="translate(32, 28)">
        <path d="M-6 -6 L0 6 L6 -6" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <circle cx="24" cy="50" r="2" fill="var(--color-cyan)" opacity="0.4" />
      <circle cx="32" cy="50" r="2" fill="var(--color-cyan)" opacity="0.6" />
      <circle cx="40" cy="50" r="2" fill="var(--color-cyan)" opacity="0.4" />
      <line x1="24" y1="50" x2="40" y2="50" stroke="var(--color-cyan)" strokeWidth="0.8" opacity="0.3" />
      <line x1="32" y1="38" x2="32" y2="48" stroke="var(--color-cyan)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  );
}

/** Workflow/pipeline SVG */
export function WorkflowSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="32" r="6" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <circle cx="32" cy="16" r="6" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <circle cx="32" cy="48" r="6" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <circle cx="52" cy="32" r="6" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.12" />
      <path d="M18 29 L26 19" stroke="var(--color-amber)" strokeWidth="1" opacity="0.5" />
      <path d="M18 35 L26 45" stroke="var(--color-amber)" strokeWidth="1" opacity="0.5" />
      <path d="M38 19 L46 29" stroke="var(--color-amber)" strokeWidth="1" opacity="0.5" />
      <path d="M38 45 L46 35" stroke="var(--color-amber)" strokeWidth="1" opacity="0.5" />
      <circle cx="12" cy="32" r="2" fill="var(--color-amber)" />
      <circle cx="32" cy="16" r="2" fill="var(--color-amber)" />
      <circle cx="32" cy="48" r="2" fill="var(--color-amber)" />
      <circle cx="52" cy="32" r="3" fill="var(--color-amber)" />
      <path d="M49 32 L51 34 L55 30" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Batch processing SVG */
export function BatchProcessSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="8" width="28" height="36" rx="3" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.2" />
      <rect x="14" y="12" width="28" height="36" rx="3" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.35" />
      <rect x="10" y="16" width="28" height="36" rx="3" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="var(--color-brand)" strokeWidth="1" opacity="0.3" />
      <line x1="16" y1="30" x2="28" y2="30" stroke="var(--color-brand)" strokeWidth="1" opacity="0.2" />
      <line x1="16" y1="36" x2="30" y2="36" stroke="var(--color-brand)" strokeWidth="1" opacity="0.2" />
      <path d="M18 44 Q22 40 26 44 Q30 48 34 44" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
      <g transform="translate(48, 32)">
        <path d="M-4 -8 L4 0 L-4 8" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <text x="56" y="35" textAnchor="middle" fill="var(--color-brand)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="700">10K</text>
    </svg>
  );
}

/** Certificate SVG */
export function CertificateSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="48" height="48" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15" />
      <circle cx="32" cy="26" r="10" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.08" />
      <circle cx="32" cy="26" r="5" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M26 34 L26 52 L32 48 L38 52 L38 34" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <path d="M32 22 L33.5 25 L37 25.5 L34.5 28 L35 31.5 L32 30 L29 31.5 L29.5 28 L27 25.5 L30.5 25 Z" fill="var(--color-brand)" opacity="0.6" />
    </svg>
  );
}

/** Animated data-flow line for section breaks */
export function DataFlowDivider({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 24" fill="none" preserveAspectRatio="none">
      <line x1="0" y1="12" x2="1200" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <circle r="3" fill="var(--color-brand)" opacity="0.5">
        <animate attributeName="cx" from="0" to="1200" dur="8s" repeatCount="indefinite" />
        <animate attributeName="cy" values="12" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="var(--color-cyan)" opacity="0.4">
        <animate attributeName="cx" from="1200" to="0" dur="10s" repeatCount="indefinite" />
        <animate attributeName="cy" values="12" dur="10s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST BADGE SVG ICONS
   ═══════════════════════════════════════════════════════════ */

export const trustSvgIcons: Record<string, React.ReactNode> = {
  "X.509": (
    <svg viewBox="0 0 40 40" fill="none" className="size-10">
      <rect x="4" y="4" width="32" height="32" rx="6" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <path d="M14 14 L26 26 M26 14 L14 26" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill="var(--color-brand)" opacity="0.3" />
    </svg>
  ),
  PAdES: (
    <svg viewBox="0 0 40 40" fill="none" className="size-10">
      <rect x="8" y="4" width="24" height="32" rx="3" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <line x1="12" y1="12" x2="28" y2="12" stroke="var(--color-brand)" strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="17" x2="24" y2="17" stroke="var(--color-brand)" strokeWidth="1" opacity="0.2" />
      <path d="M14 26 Q18 22 22 26 Q26 30 28 26" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  LTV: (
    <svg viewBox="0 0 40 40" fill="none" className="size-10">
      <circle cx="20" cy="20" r="14" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <path d="M20 10 L20 20 L28 24" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 28 Q16 32 20 34 Q24 32 28 28" stroke="var(--color-brand)" strokeWidth="1" opacity="0.3" fill="none" />
    </svg>
  ),
  "SHA-256": (
    <svg viewBox="0 0 40 40" fill="none" className="size-10">
      <rect x="4" y="4" width="32" height="32" rx="4" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <text x="20" y="18" textAnchor="middle" fill="var(--color-brand)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="700">#</text>
      <rect x="10" y="22" width="20" height="6" rx="1" stroke="var(--color-brand)" strokeWidth="0.8" fill="none" opacity="0.3" />
      <text x="20" y="27" textAnchor="middle" fill="var(--color-brand)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">256</text>
    </svg>
  ),
  "256-bit AES": (
    <svg viewBox="0 0 40 40" fill="none" className="size-10">
      <rect x="6" y="12" width="28" height="18" rx="3" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <path d="M14 12 L14 8 Q14 4 20 4 Q26 4 26 8 L26 12" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="22" r="3" fill="var(--color-brand)" opacity="0.4" />
      <line x1="20" y1="25" x2="20" y2="28" stroke="var(--color-brand)" strokeWidth="1.5" />
    </svg>
  ),
  RFC: (
    <svg viewBox="0 0 40 40" fill="none" className="size-10">
      <path d="M8 8 L32 8 L32 36 L8 36 Z" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.06" />
      <line x1="12" y1="14" x2="28" y2="14" stroke="var(--color-brand)" strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="19" x2="26" y2="19" stroke="var(--color-brand)" strokeWidth="1" opacity="0.2" />
      <line x1="12" y1="24" x2="24" y2="24" stroke="var(--color-brand)" strokeWidth="1" opacity="0.2" />
      <path d="M22 28 L26 32 L30 26" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════
   ARCHITECTURE STEP ICONS
   ═══════════════════════════════════════════════════════════ */

/** Desktop monitor icon - "Your Application" step */
export function AppStepIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={`size-7 ${className}`}>
      <rect x="4" y="4" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
      <line x1="4" y1="18" x2="28" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="16" cy="26" r="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

/** Terminal icon - "SignSecure SDK" step */
export function SdkStepIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={`size-7 ${className}`}>
      <rect x="2" y="6" width="28" height="20" rx="3" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.08" />
      <path d="M8 13 L12 17 L8 21" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="16" y1="21" x2="24" y2="21" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Crypto crosshair icon - "Crypto Engine" step */
export function CryptoStepIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={`size-7 ${className}`}>
      <circle cx="16" cy="16" r="12" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.08" />
      <path d="M12 12 L20 20 M20 12 L12 20" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}

/** Signed document icon - "Signed Document" step */
export function SignedDocStepIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={`size-7 ${className}`}>
      <rect x="6" y="2" width="20" height="28" rx="3" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.08" />
      <path d="M12 20 L15 23 L22 16" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="10" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="10" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}
