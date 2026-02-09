"use client";

import type React from "react";
import type { AccentColor } from "../data";

/* ═══════════════════════════════════════════════════════════
   PRODUCT PAGE SVGs
   Architecture diagrams + use-case industry icons
   Extracted from apps/web/src/app/(marketing)/products/[slug]/page.tsx
   ═══════════════════════════════════════════════════════════ */

/** Per-product configurable architecture pipeline diagram */
export function ProductArchSvg({ slug, accent }: { slug: string; accent: AccentColor }) {
  const color = `var(--color-${accent})`;
  const configs: Record<string, { nodes: string[]; labels: string[] }> = {
    signbolt: {
      nodes: ["PDF / DOCX", "Template", "Batch Engine", "X.509 Cert", "PAdES Signed", "Email"],
      labels: ["your files", "sig position", "signs all at once", "USB / Store", "LTV enabled", "auto-deliver"],
    },
    signbridge: {
      nodes: ["Your Website", "JS SDK Call", "SignBridge Agent", "Token Signing", "Certificate Store", "Signed PDF"],
      labels: ["any browser", "signBridge.sign()", "localhost:53000", "PKCS#11 / CAPI", "USB / Smart Card", "PAdES result"],
    },
    signlift: {
      nodes: ["Your App", "HTTP POST", "JWT Auth", "SignLift API", "PKCS#12 Cert", "Signed PDF"],
      labels: ["any language", "REST request", "X-API-Token", "PAdES engine", "file / S3", "LTV response"],
    },
    signpad: {
      nodes: ["Upload PDF", "Form Builder", "Workflow", "Sign Method", "Audit Log", "Complete"],
      labels: ["drag-drop", "fields", "seq/parallel", "3 methods", "SHA-256", "webhook"],
    },
  };
  const c = configs[slug] ?? configs["signbolt"];

  return (
    <svg viewBox="0 0 660 80" fill="none" className="w-full">
      {c.nodes.map((node, i) => (
        <g key={i}>
          <rect
            x={i * 110}
            y="10"
            width="96"
            height="42"
            rx="8"
            stroke={color}
            strokeWidth={i === c.nodes.length - 1 ? "1.5" : "1"}
            fill={color}
            fillOpacity={0.03 + i * 0.015}
          />
          <text
            x={i * 110 + 48}
            y="30"
            textAnchor="middle"
            fill={color}
            fontSize="8"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            opacity={0.7 + i * 0.05}
          >
            {node}
          </text>
          <text
            x={i * 110 + 48}
            y="42"
            textAnchor="middle"
            fill="currentColor"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            opacity="0.55"
          >
            {c.labels[i]}
          </text>
          {i < c.nodes.length - 1 && (
            <g>
              <line
                x1={i * 110 + 98}
                y1="31"
                x2={i * 110 + 108}
                y2="31"
                stroke={color}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.5"
              />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   PER-PRODUCT USE CASE ICONS (unique SVG per use case)
   ═══════════════════════════════════════════════════════════ */

export const useCaseIcons: Record<string, React.ReactNode[]> = {
  signbolt: [
    // Government
    <svg key="gov" viewBox="0 0 32 32" fill="none" className="size-8">
      <path d="M4 28 L4 14 L16 6 L28 14 L28 28" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
      <rect x="12" y="18" width="8" height="10" rx="1" stroke="var(--color-brand)" strokeWidth="1" fill="var(--color-brand)" fillOpacity="0.1" />
      <line x1="8" y1="14" x2="8" y2="28" stroke="var(--color-brand)" strokeWidth="1.5" />
      <line x1="24" y1="14" x2="24" y2="28" stroke="var(--color-brand)" strokeWidth="1.5" />
    </svg>,
    // HR
    <svg key="hr" viewBox="0 0 32 32" fill="none" className="size-8">
      <circle cx="16" cy="10" r="6" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.08" />
      <path d="M6 28 Q6 20 16 20 Q26 20 26 28" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
    </svg>,
    // Legal
    <svg key="legal" viewBox="0 0 32 32" fill="none" className="size-8">
      <line x1="16" y1="4" x2="16" y2="28" stroke="var(--color-brand)" strokeWidth="1.5" />
      <line x1="6" y1="10" x2="26" y2="10" stroke="var(--color-brand)" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="4" stroke="var(--color-brand)" strokeWidth="1" fill="var(--color-brand)" fillOpacity="0.08" />
      <circle cx="26" cy="16" r="4" stroke="var(--color-brand)" strokeWidth="1" fill="var(--color-brand)" fillOpacity="0.08" />
      <rect x="10" y="26" width="12" height="4" rx="1" fill="var(--color-brand)" fillOpacity="0.15" />
    </svg>,
    // Education
    <svg key="edu" viewBox="0 0 32 32" fill="none" className="size-8">
      <path d="M4 14 L16 8 L28 14 L16 20 Z" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.08" />
      <path d="M8 16 L8 24 Q8 28 16 28 Q24 28 24 24 L24 16" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
    </svg>,
  ],
  signbridge: [
    // Bank
    <svg key="bank" viewBox="0 0 32 32" fill="none" className="size-8">
      <rect x="4" y="10" width="24" height="18" rx="2" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.08" />
      <path d="M4 10 L16 4 L28 10" stroke="var(--color-violet)" strokeWidth="1.5" fill="none" />
      <line x1="10" y1="16" x2="10" y2="24" stroke="var(--color-violet)" strokeWidth="1.5" />
      <line x1="16" y1="16" x2="16" y2="24" stroke="var(--color-violet)" strokeWidth="1.5" />
      <line x1="22" y1="16" x2="22" y2="24" stroke="var(--color-violet)" strokeWidth="1.5" />
    </svg>,
    // E-gov
    <svg key="egov" viewBox="0 0 32 32" fill="none" className="size-8">
      <rect x="6" y="4" width="20" height="24" rx="3" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.08" />
      <path d="M12 14 L15 17 L20 12" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="10" y1="22" x2="22" y2="22" stroke="var(--color-violet)" strokeWidth="1" opacity="0.3" />
    </svg>,
    // Enterprise
    <svg key="ent" viewBox="0 0 32 32" fill="none" className="size-8">
      <rect x="4" y="6" width="24" height="20" rx="3" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.08" />
      <line x1="4" y1="14" x2="28" y2="14" stroke="var(--color-violet)" strokeWidth="1" opacity="0.3" />
      <rect x="8" y="18" width="6" height="4" rx="1" fill="var(--color-violet)" fillOpacity="0.15" />
      <rect x="18" y="18" width="6" height="4" rx="1" fill="var(--color-violet)" fillOpacity="0.15" />
    </svg>,
    // SaaS
    <svg key="saas" viewBox="0 0 32 32" fill="none" className="size-8">
      <path d="M8 22 Q2 22 2 16 Q2 10 8 9 Q11 2 18 2 Q24 2 26 8 Q32 7 32 12 Q32 18 26 20" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.08" />
      <path d="M12 20 L16 28 L20 20" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>,
  ],
  signlift: [
    // SaaS platform
    <svg key="saas" viewBox="0 0 32 32" fill="none" className="size-8">
      <rect x="4" y="4" width="24" height="16" rx="3" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.08" />
      <path d="M10 12 L14 16 L10 20" stroke="var(--color-cyan)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="16" y1="20" x2="22" y2="20" stroke="var(--color-cyan)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="24" x2="28" y2="24" stroke="var(--color-cyan)" strokeWidth="1" opacity="0.3" />
    </svg>,
    // Mobile
    <svg key="mobile" viewBox="0 0 32 32" fill="none" className="size-8">
      <rect x="9" y="2" width="14" height="28" rx="3" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.08" />
      <line x1="9" y1="7" x2="23" y2="7" stroke="var(--color-cyan)" strokeWidth="0.8" opacity="0.3" />
      <line x1="9" y1="25" x2="23" y2="25" stroke="var(--color-cyan)" strokeWidth="0.8" opacity="0.3" />
      <circle cx="16" cy="27.5" r="1.5" fill="var(--color-cyan)" opacity="0.3" />
    </svg>,
    // Pipeline
    <svg key="pipe" viewBox="0 0 32 32" fill="none" className="size-8">
      <circle cx="6" cy="16" r="4" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.08" />
      <circle cx="16" cy="16" r="4" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.12" />
      <circle cx="26" cy="16" r="4" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.16" />
      <line x1="10" y1="16" x2="12" y2="16" stroke="var(--color-cyan)" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="16" x2="22" y2="16" stroke="var(--color-cyan)" strokeWidth="1" opacity="0.4" />
    </svg>,
    // Forms
    <svg key="forms" viewBox="0 0 32 32" fill="none" className="size-8">
      <rect x="4" y="4" width="24" height="24" rx="3" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.08" />
      <rect x="8" y="9" width="8" height="3" rx="1" stroke="var(--color-cyan)" strokeWidth="0.8" fill="none" opacity="0.3" />
      <rect x="8" y="15" width="16" height="3" rx="1" stroke="var(--color-cyan)" strokeWidth="0.8" fill="none" opacity="0.3" />
      <rect x="8" y="21" width="12" height="3" rx="1" stroke="var(--color-cyan)" strokeWidth="0.8" fill="none" opacity="0.3" />
    </svg>,
  ],
  signpad: [
    // Company
    <svg key="company" viewBox="0 0 32 32" fill="none" className="size-8">
      <rect x="4" y="8" width="12" height="20" rx="2" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <rect x="16" y="14" width="12" height="14" rx="2" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.12" />
      <rect x="7" y="12" width="3" height="3" rx="0.5" fill="var(--color-amber)" opacity="0.2" />
      <rect x="12" y="12" width="3" height="3" rx="0.5" fill="var(--color-amber)" opacity="0.2" />
      <rect x="7" y="18" width="3" height="3" rx="0.5" fill="var(--color-amber)" opacity="0.2" />
    </svg>,
    // Real estate
    <svg key="realestate" viewBox="0 0 32 32" fill="none" className="size-8">
      <path d="M4 16 L16 6 L28 16 L28 28 L4 28 Z" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <rect x="12" y="20" width="8" height="8" rx="1" stroke="var(--color-amber)" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="18" cy="14" r="2" fill="var(--color-amber)" opacity="0.2" />
    </svg>,
    // Enterprise workflow
    <svg key="workflow" viewBox="0 0 32 32" fill="none" className="size-8">
      <circle cx="8" cy="8" r="4" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <circle cx="24" cy="8" r="4" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <circle cx="16" cy="24" r="4" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.12" />
      <line x1="11" y1="11" x2="14" y2="21" stroke="var(--color-amber)" strokeWidth="1" opacity="0.3" />
      <line x1="21" y1="11" x2="18" y2="21" stroke="var(--color-amber)" strokeWidth="1" opacity="0.3" />
    </svg>,
    // Aadhaar
    <svg key="aadhaar" viewBox="0 0 32 32" fill="none" className="size-8">
      <circle cx="16" cy="12" r="8" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
      <circle cx="16" cy="12" r="3" fill="var(--color-amber)" opacity="0.2" />
      <path d="M8 28 Q8 22 16 22 Q24 22 24 28" stroke="var(--color-amber)" strokeWidth="1.5" fill="none" />
    </svg>,
  ],
};
