"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════════
   HERO GRAPHIC — "Every way to sign, one platform"

   Three signing methods flow into a signed document.
   DOM-based layout. SVG connectors with animated dots.

   Key: the method cards stack and the document card are the
   SAME total height, so connectors align perfectly.
   ═══════════════════════════════════════════════════════════ */

/* ── Signature SVG path ── */
function buildSigPath(): string {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const x = t * 100;
    const y = 12 + 8 * Math.sin(t * Math.PI * 2.3 + 0.9) + 4 * Math.sin(t * Math.PI * 4.6 + 1.6);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
const SIG_PATH = buildSigPath();

/* ── Data ── */
const METHODS = [
  { id: "dsc", label: "DSC Token", desc: "Hardware certificate", colorVar: "--color-brand" },
  { id: "esign", label: "Electronic", desc: "Draw, type or upload", colorVar: "--color-success" },
  { id: "aadhaar", label: "Aadhaar eSign", desc: "OTP verified identity", colorVar: "--color-amber" },
] as const;

const PRODUCTS = [
  { label: "SignBolt", sub: "Batch signing", c: "--color-brand" },
  { label: "SignBridge", sub: "Web-to-DSC bridge", c: "--color-violet" },
  { label: "SignLift", sub: "Signing API", c: "--color-cyan" },
  { label: "SignPad", sub: "Collect signatures", c: "--color-amber" },
];

/* ═══════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════ */

/* DSC Token — chunky USB hardware token with chip */
function DscTokenIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="size-9" aria-hidden>
      {/* USB connector */}
      <rect x="14" y="2" width="12" height="6" rx="1.5" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="17" y="3.5" width="2" height="3" rx="0.5" fill={color} opacity="0.5" />
      <rect x="21" y="3.5" width="2" height="3" rx="0.5" fill={color} opacity="0.5" />
      {/* Token body */}
      <rect x="11" y="7" width="18" height="28" rx="3.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.04" />
      {/* Chip contact pad — the gold IC */}
      <rect x="15" y="13" width="10" height="8" rx="1.5" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.08" />
      {/* Chip lines */}
      <line x1="15" y1="16" x2="25" y2="16" stroke={color} strokeWidth="0.7" opacity="0.3" />
      <line x1="15" y1="19" x2="25" y2="19" stroke={color} strokeWidth="0.7" opacity="0.3" />
      <line x1="20" y1="13" x2="20" y2="21" stroke={color} strokeWidth="0.7" opacity="0.3" />
      {/* LED */}
      <circle cx="20" cy="27" r="2" fill={color} opacity="0.4" />
      <circle cx="20" cy="27" r="1" fill={color} opacity="0.7" />
      {/* Lanyard hole */}
      <circle cx="20" cy="32" r="1.2" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

/* Electronic — pen with signature flourish */
function ElectronicSignIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="size-9" aria-hidden>
      {/* Pen body */}
      <path d="M26 4 L12.5 17.5 L11.5 24 L18 23 L31.5 9.5 Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.04" />
      {/* Pen nib triangle */}
      <path d="M12.5 17.5 L11.5 24 L18 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.08" />
      {/* Pen edge line */}
      <line x1="15" y1="15.5" x2="24" y2="6.5" stroke={color} strokeWidth="0.6" opacity="0.25" />
      {/* Ink dot */}
      <circle cx="11.8" cy="23.5" r="1.2" fill={color} opacity="0.5" />
      {/* Signature flourish — bold, visible */}
      <path d="M6 32 C9 28, 12.5 28, 15 30.5 C17 32.5, 19.5 33, 22 31 C24.5 29, 27 28.5, 30 31 C32 32.5, 33.5 33, 35 32" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45" />
    </svg>
  );
}

/* Aadhaar — official traced UIDAI logo SVG */
function AadhaarIcon() {
  return (
    <svg viewBox="0 0 353.3 248.43" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="m304.52 102.82-3e-3 2e-3h4e-3c-1.6236 2.454-2.213 5.4084-2.7078 8.4882-0.60669 3.7502-1.2461 7.3503-2.5723 10.879-1.5936 4.2305-4.2696 8.9439-8.9275 12.633a120.97 120.97 0 0 0-20.684-35.668c5.5503-2.2185 10.998-2.1839 15.476-1.4453 3.7202 0.61578 7.1575 1.8619 10.71 3.2117 2.9125 1.1124 5.7667 2.0793 8.7038 1.8992m-54.045-54.044-2e-3 0.0027 4e-3 -9.1e-4c-0.18009 2.9361 0.78679 5.7895 1.8983 8.7038 1.3498 3.5519 2.5959 6.9892 3.2126 10.709 0.73858 4.4824 0.77224 9.9363-1.4517 15.491a121.07 121.07 0 0 0-35.711-20.637c3.6974-4.6962 8.4318-7.3894 12.681-8.9894 3.5292-1.3262 7.1293-1.9656 10.881-2.5732 3.078-0.4939 6.0332-1.0824 8.4873-2.7069m45.529 107.26c5.8741 0.86865 10.548 3.6083 14.041 6.4735 2.9125 2.394 5.2665 5.1919 7.6687 8.138 1.9656 2.4177 3.9539 4.6825 6.5863 5.995h-26.521a121.88 121.88 0 0 0-1.7755-20.607m-193.18-107.26 2e-3 0.0018v-0.0027c2.454 1.6236 5.4093 2.2121 8.4882 2.7078 3.7502 0.60669 7.3503 1.2461 10.879 2.5714 4.2496 1.6 8.9848 4.2941 12.681 8.9903a120.97 120.97 0 0 0-35.711 20.637c-2.2239-5.5548-2.1912-11.009-1.4508-15.492 0.61579-3.7193 1.8619-7.1575 3.2117-10.71 1.1115-2.9125 2.0793-5.7667 1.8992-8.7029m-54.044 54.045 0.0027 9.1e-4 -9.1e-4 -3e-3c2.9361 0.17919 5.7904-0.7877 8.7038-1.8992 3.5519-1.3498 6.9892-2.5959 10.708-3.2126 4.4797-0.73767 9.9272-0.77132 15.477 1.4462a121.07 121.07 0 0 0-20.683 35.668c-4.658-3.6902-7.3339-8.4018-8.9275-12.633-1.3262-3.5292-1.9656-7.1293-2.5723-10.88-0.49481-3.0789-1.0842-6.0342-2.7078-8.4873m-19.779 73.823c2.6323-1.3125 4.6188-3.5765 6.5872-5.995 2.4004-2.9452 4.7544-5.7431 7.6668-8.1362 3.4937-2.8661 8.1644-5.6066 14.04-6.4744a121.88 121.88 0 0 0-1.7737 20.606zm147.65-147.65v0.0027l0.00182-0.0027c1.3125 2.6332 3.5774 4.6207 5.996 6.589 2.9452 2.4004 5.744 4.7544 8.1371 7.6668 2.8834 3.5155 5.6412 8.2235 6.4908 14.151a121.88 121.88 0 0 0-20.625-1.7564c-7.032 0-13.921 0.60578-20.626 1.7564 0.84954-5.9268 3.6074-10.636 6.4908-14.15 2.394-2.9134 5.1919-5.2674 8.1371-7.6687 2.4186-1.9665 4.6834-3.8613 5.995-6.5881" fill="#f26522"/>
      <g fill="#d52736">
        <path d="m152.02 176.68 9.114-0.0264c1.197-7.6978-1.1442-13.625-8.9312-12.21-6.5617 1.1916-13.61 7.7105-17.87 12.21l12.016-0.0527c1.3389-0.88048 3.9594-1.8846 5.0354-1.137 0.40294 0.28015 0.61306 0.67764 0.63489 1.2161"/>
        <path d="m193 176.65h11.37c0.5412-13.427-1.6218-27.293-7.8642-39.289-5.6776-10.915-15.063-18.334-27.213-20.127-17.737-2.6169-35.634 4.8917-50.765 15.634-16.474 11.696-30.073 27.581-41.956 43.783l15.02-0.0218c13.522-19.166 44.623-48.262 67.502-48.452 7.2912-0.06 14.704 1.6509 20.185 6.5408 3.9712 3.5437 8.7856 10.425 8.55 16.01-0.14008 3.3118-3.0789 4.3269-5.8968 3.3009-2.1894-0.79679-3.7356-2.7979-5.2674-4.9017-4.9781-6.8346-12.743-10.179-21.261-9.0139-10.158 1.3889-22.75 9.2768-30.872 16.451-7.0038 6.187-13.434 12.958-19.499 20.088h16.149c5.9186-7.1457 12.168-13.239 20.203-18.243 2.5423-1.5836 5.673-3.2581 8.9639-4.3896 8.3017-2.8534 16.563-2.1311 20.232 8.2053 1.4417 4.064 1.6536 7.6286 1.2334 14.161l-9.1e-4 0.26651h10.98l0.0282-0.33563c8e-3 -3.5774-0.07-5.9878 0.25286-9.5333 0.27743-3.0553 1.227-6.2215 4.0649-6.5981 6.0314-1.2634 5.7422 12.155 5.8604 16.467"/>
        <path d="m216.33 176.65h11.464c0.55484-12.458-0.51301-27.216-4.5434-40.103a71.857 71.857 0 0 0-2.7369-7.3658c-2.4404-5.5694-5.724-10.61-9.6388-15.269-4.3514-5.1755-9.536-9.8289-15.381-13.495a58.213 58.213 0 0 0-5.3592-2.9825v-0.0018a54.575 54.575 0 0 0-5.6776-2.3895l-7e-3 -0.0027c-22.326-7.927-44.906-2.2894-63.847 8.0125a128.25 128.25 0 0 0-10.63 6.489 140.08 140.08 0 0 0-9.6324 7.1593h-9.1e-4l-5e-3 6e-3a130.98 130.98 0 0 0-12.547 11.623 111.88 111.88 0 0 0-2.585 2.8306c-2.253 2.5541-5.7249 6.1351-4.6943 9.8371 0.81589 2.9361 4.6043 2.0711 5.9241 1.0597 2.0256-1.087 4.2505-2.8097 6.1542-4.4206 2.5778-2.1821 5.012-4.5315 7.565-6.7436 10.324-8.9494 21.084-15.851 31.683-20.522a96.415 96.415 0 0 1 6.9283-2.7433 85.501 85.501 0 0 1 6.8464-2.0938l0.0109-3e-3c19.722-5.1209 41.154-1.8037 54.876 14.28 13.219 15.492 15.632 36.23 15.834 56.839m-142.25-17.514c1.2316-1.1497 2.4868-2.6496 3.7948-4.3105 1.8301-2.3212 2.0138-4.5688 1.2907-6.1915a4.2386 4.2386 0 0 0-1.1497-1.5308 4.0022 4.0022 0 0 0-1.6554-0.8259c-1.4917-0.3411-3.2754 0.19283-4.7898 2.0356-1.7127 2.0829-4.0776 5.6467-4.5606 8.7984a6.549 6.549 0 0 0-0.05367 1.7027c0.05912 0.52392 0.1992 1.0224 0.43478 1.4772l0.0018 5e-3 9.1e-4 -9.1e-4c0.38566 0.7404 1.036 1.1306 1.9038 1.1634q0.27196 9e-3 0.58486-0.0246 0.30562-0.0346 0.65672-0.11734l9.1e-4 2e-3 0.01092-3e-3c1.1679-0.28015 2.3358-1.066 3.5292-2.1794"/>
        <path d="m245 176.65 0.0819-2e-3h0.0409c1.1997 0.0655 3.2818-0.48662 4.4824-2.5123a6.1851 6.1851 0 0 0 0.60033-1.3935 8.3681 8.3681 0 0 0 0.31562-1.8228h9.1e-4l8e-3 -0.14008c0.9114-31.841-8.8411-58.199-25.398-76.107a80.953 80.953 0 0 0-10.402-9.4649 78.588 78.588 0 0 0-11.768-7.4185l-9.1e-4 9.09e-4 -0.0655-0.03274-2e-3 -0.0018c-13.917-7.112-29.7-9.8435-45.192-8.531a89.594 89.594 0 0 0-17.827 3.3491l-0.0409 0.01273c-15.932 4.7125-30.758 14.068-42.84 26.342a110.97 110.97 0 0 0-9.8135 11.418c8.4727-7.3103 17.563-13.723 27.071-18.817a122.79 122.79 0 0 1 6.4553-3.2236 113.7 113.7 0 0 1 6.5663-2.796l0.012-0.0054c8.4-3.2645 16.681-5.3465 24.963-6.277 8.2826-0.9305 16.571-0.70947 24.987 0.62852 5.9896 0.95324 11.836 2.5214 17.103 4.7153q1.5336 0.63852 3.0116 1.3553a51.846 51.846 0 0 1 2.8652 1.5008h2e-3l0.0145 0.0073-9.1e-4 9.09e-4c18.543 10.154 31.425 30.988 37.099 54.512a117.34 117.34 0 0 1 3.2618 28.247v2e-3l-3e-3 0.27378c0.0946 2.5477 0.96779 4.6789 2.464 5.6385 0.27833 0.17828 0.58031 0.31744 0.90139 0.40749h2e-3q0.49117 0.1419 1.0433 0.13462"/>
      </g>
      <path d="m211.85 70.537c44.582 14.725 76.801 56.65 76.989 106.12h-22.059c1.4599-43.21-17.398-82.212-54.93-106.12" fill="#fab60f"/>
    </svg>
  );
}

const ICON_MAP: Record<string, (p: { color: string }) => React.ReactNode> = {
  dsc: DscTokenIcon,
  esign: ElectronicSignIcon,
  aadhaar: () => <AadhaarIcon />,
};

/* ═══════════════════════════════════════════════════════════
   DOCUMENT CARD — compact, same height as method stack
   ═══════════════════════════════════════════════════════════ */

function DocumentCard({ dark }: { dark: boolean }) {
  return (
    <div className="hero-doc relative select-none">
      {/* Glow */}
      <div className="absolute -inset-4 rounded-xl blur-[28px]" style={{ background: "var(--color-brand)", opacity: dark ? 0.06 : 0.08 }} />

      <div className={`relative w-[150px] overflow-hidden rounded-lg border sm:w-[166px] ${dark ? "border-white/10 bg-[oklch(0.2_0.01_250)] shadow-[0_6px_24px_rgba(0,0,0,0.3)]" : "border-black/[0.07] bg-white shadow-[0_6px_24px_rgba(8,15,45,0.08)]"}`}>
        {/* Header */}
        <div className={`flex items-center border-b px-2.5 py-1.5 ${dark ? "border-white/5 bg-white/[0.02]" : "border-black/[0.03] bg-brand-muted/25"}`}>
          <div className="h-1 w-[28%] rounded-full bg-brand/35" />
          <div className="ml-auto size-1.5 rounded-full bg-success/25" />
        </div>

        {/* Text lines — fewer, cleaner */}
        <div className="space-y-[3px] px-2.5 pt-2 pb-1">
          {[1, 0.72, 0.85, 0.4, 0.9, 0.6].map((w, i) => (
            <div key={i} className={`h-[2px] rounded-full ${dark ? "bg-white/[0.05]" : "bg-foreground/[0.06]"}`} style={{ width: `${w * 100}%` }} />
          ))}
        </div>

        {/* Divider */}
        <div className={`mx-2.5 my-1 h-px ${dark ? "bg-white/[0.04]" : "bg-foreground/[0.04]"}`} />

        {/* Signature area */}
        <div className="px-2.5 pb-2">
          <div className={`mb-0.5 text-[6px] font-medium tracking-wide ${dark ? "text-white/20" : "text-foreground/30"}`}>Sign here</div>
          <svg viewBox="0 0 100 24" className="h-3.5 w-[65%]" aria-hidden>
            <path d={SIG_PATH} fill="none" stroke="var(--color-brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="200" className="hero-sig-draw" />
          </svg>
          <div className={`mt-0.5 h-px w-[55%] border-t border-dashed ${dark ? "border-white/8" : "border-foreground/10"}`} />
        </div>
      </div>

      {/* Checkmark */}
      <div className={`absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border shadow-sm ${dark ? "border-success/20 bg-[oklch(0.2_0.04_150)]" : "border-success/25 bg-success-muted"}`}>
        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
          <path d="M2.5 6 L5 8.5 L9.5 3.5" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   METHOD CARD
   ═══════════════════════════════════════════════════════════ */

function MethodCard({ method, idx, dark, compact }: { method: (typeof METHODS)[number]; idx: number; dark: boolean; compact?: boolean }) {
  const Icon = ICON_MAP[method.id];
  const color = `var(${method.colorVar})`;

  /* Compact mode: small card for mobile row layout — icon + short label, no description */
  if (compact) {
    return (
      <div
        className="hero-method-card flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-1.5 select-none"
        style={{
          animationDelay: `${idx * 0.12}s`,
          borderColor: `color-mix(in oklch, ${color}, transparent ${dark ? "72%" : "66%"})`,
          background: `color-mix(in oklch, ${color}, ${dark ? "oklch(0.17 0.01 250)" : "white"} 94%)`,
          boxShadow: `0 1px 8px color-mix(in oklch, ${color}, transparent ${dark ? "90%" : "87%"})`,
        }}
      >
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-md"
          style={{ background: `color-mix(in oklch, ${color}, transparent ${dark ? "85%" : "88%"})` }}
        >
          <Icon color={color} />
        </div>
        <div className="text-[9px] font-semibold leading-tight text-foreground">{method.label}</div>
      </div>
    );
  }

  return (
    <div
      className="hero-method-card flex items-center gap-2.5 rounded-xl border px-2.5 py-2 select-none sm:px-3 sm:py-2.5"
      style={{
        animationDelay: `${idx * 0.12}s`,
        borderColor: `color-mix(in oklch, ${color}, transparent ${dark ? "72%" : "66%"})`,
        background: `color-mix(in oklch, ${color}, ${dark ? "oklch(0.17 0.01 250)" : "white"} 94%)`,
        boxShadow: `0 1px 10px color-mix(in oklch, ${color}, transparent ${dark ? "90%" : "87%"})`,
      }}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg sm:size-11"
        style={{ background: `color-mix(in oklch, ${color}, transparent ${dark ? "85%" : "88%"})` }}
      >
        <Icon color={color} />
      </div>
      <div className="min-w-0 pr-1">
        <div className="text-[12px] font-semibold leading-tight text-foreground sm:text-[13px]">{method.label}</div>
        <div className="mt-0.5 text-[9.5px] leading-tight text-muted-foreground sm:text-[10.5px]">{method.desc}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SVG CONNECTORS — fan from each card to document center
   ═══════════════════════════════════════════════════════════ */

/* Horizontal connector — used on sm+ (cards left → doc right) */
function ConnectorSvgH({ dark, mounted }: { dark: boolean; mounted: boolean }) {
  const op = dark ? "0.15" : "0.25";
  // Card centers at roughly y=26, y=80, y=134 of a 160-tall box.
  // Doc center at y=80.
  return (
    <svg className="h-[160px] w-[48px] shrink-0 sm:w-[64px]" viewBox="0 0 64 160" fill="none" aria-hidden>
      <path id="hc-a" d="M0,26 C24,26 40,80 64,80" stroke="var(--color-brand)" strokeWidth="1" strokeDasharray="3 4" opacity={op} />
      <path id="hc-b" d="M0,80 L64,80" stroke="var(--color-success)" strokeWidth="1" strokeDasharray="3 4" opacity={op} />
      <path id="hc-c" d="M0,134 C24,134 40,80 64,80" stroke="var(--color-amber)" strokeWidth="1" strokeDasharray="3 4" opacity={op} />

      {mounted && (
        <>
          <circle r="2.5" fill="var(--color-brand)" opacity="0.6"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0s"><mpath href="#hc-a" /></animateMotion></circle>
          <circle r="2.5" fill="var(--color-success)" opacity="0.6"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0.5s"><mpath href="#hc-b" /></animateMotion></circle>
          <circle r="2.5" fill="var(--color-amber)" opacity="0.6"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1s"><mpath href="#hc-c" /></animateMotion></circle>
          <circle r="1.5" fill="var(--color-brand)" opacity="0.2"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s"><mpath href="#hc-a" /></animateMotion></circle>
          <circle r="1.5" fill="var(--color-success)" opacity="0.2"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.9s"><mpath href="#hc-b" /></animateMotion></circle>
          <circle r="1.5" fill="var(--color-amber)" opacity="0.2"><animateMotion dur="2.8s" repeatCount="indefinite" begin="2.4s"><mpath href="#hc-c" /></animateMotion></circle>
        </>
      )}
    </svg>
  );
}

/* Vertical connector — used on < sm (cards above → doc below)
   Uses percentage-based x-positions: 1/6, 1/2, 5/6 of a 120-unit
   viewBox to align with 3 equally-spaced cards. SVG stretches to
   match the card row via w-full. */
function ConnectorSvgV({ dark, mounted }: { dark: boolean; mounted: boolean }) {
  const op = dark ? "0.15" : "0.25";
  // viewBox 120×40. Card centers at x=20, x=60, x=100. Doc center at x=60.
  return (
    <svg className="h-[36px] w-full max-w-[280px] shrink-0" viewBox="0 0 120 40" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <path id="vc-a" d="M20,0 C20,16 60,24 60,40" stroke="var(--color-brand)" strokeWidth="1" strokeDasharray="3 4" opacity={op} />
      <path id="vc-b" d="M60,0 L60,40" stroke="var(--color-success)" strokeWidth="1" strokeDasharray="3 4" opacity={op} />
      <path id="vc-c" d="M100,0 C100,16 60,24 60,40" stroke="var(--color-amber)" strokeWidth="1" strokeDasharray="3 4" opacity={op} />

      {mounted && (
        <>
          <circle r="2.5" fill="var(--color-brand)" opacity="0.6"><animateMotion dur="2.2s" repeatCount="indefinite" begin="0s"><mpath href="#vc-a" /></animateMotion></circle>
          <circle r="2.5" fill="var(--color-success)" opacity="0.6"><animateMotion dur="2.2s" repeatCount="indefinite" begin="0.4s"><mpath href="#vc-b" /></animateMotion></circle>
          <circle r="2.5" fill="var(--color-amber)" opacity="0.6"><animateMotion dur="2.2s" repeatCount="indefinite" begin="0.8s"><mpath href="#vc-c" /></animateMotion></circle>
          <circle r="1.5" fill="var(--color-brand)" opacity="0.2"><animateMotion dur="2.2s" repeatCount="indefinite" begin="1.1s"><mpath href="#vc-a" /></animateMotion></circle>
          <circle r="1.5" fill="var(--color-success)" opacity="0.2"><animateMotion dur="2.2s" repeatCount="indefinite" begin="1.5s"><mpath href="#vc-b" /></animateMotion></circle>
          <circle r="1.5" fill="var(--color-amber)" opacity="0.2"><animateMotion dur="2.2s" repeatCount="indefinite" begin="1.9s"><mpath href="#vc-c" /></animateMotion></circle>
        </>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════ */

export function HeroCanvas({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);

  return (
    <div className={`relative flex flex-col items-center justify-center gap-3 sm:gap-4 ${className}`} style={{ minHeight: 260 }}>

      {/* ── Crypto labels (faint background) ── */}
      <div className="pointer-events-none absolute inset-0 hidden select-none overflow-hidden sm:block" aria-hidden>
        {["X.509", "PAdES", "SHA-256", "AES-256", "LTV"].map((label, i) => {
          const pos = [{ left: "2%", top: "4%" }, { right: "3%", top: "8%" }, { left: "3%", bottom: "26%" }, { right: "2%", bottom: "32%" }, { left: "40%", top: "0%" }];
          return (
            <span key={label} className={`absolute font-mono text-[8px] font-medium tracking-wider ${dark ? "text-white/[0.05]" : "text-foreground/[0.06]"}`} style={{ ...pos[i], animation: `float${(i % 2) + 1} ${5 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}>
              {label}
            </span>
          );
        })}
      </div>

      {/* ── Main: methods → connectors → document ── */}

      {/* Desktop / tablet: horizontal row (sm+) */}
      <div className="relative hidden items-center sm:flex">
        <div className="flex flex-col gap-2">
          {METHODS.map((m, i) => <MethodCard key={m.id} method={m} idx={i} dark={dark} />)}
        </div>
        <ConnectorSvgH dark={dark} mounted={mounted} />
        <DocumentCard dark={dark} />
      </div>

      {/* Mobile: vertical column (< sm) */}
      <div className="relative flex w-full max-w-[320px] flex-col items-center gap-0 sm:hidden">
        <div className="flex w-full max-w-[280px] flex-row justify-center gap-2">
          {METHODS.map((m, i) => <MethodCard key={m.id} method={m} idx={i} dark={dark} compact />)}
        </div>
        <ConnectorSvgV dark={dark} mounted={mounted} />
        <DocumentCard dark={dark} />
      </div>

      {/* ── Products ── */}
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex flex-wrap justify-center gap-2">
          {PRODUCTS.map((p) => {
            const color = `var(${p.c})`;
            return (
              <div
                key={p.label}
                className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 select-none sm:px-3 sm:py-2"
                style={{
                  borderColor: `color-mix(in oklch, ${color}, transparent ${dark ? "70%" : "60%"})`,
                  background: `color-mix(in oklch, ${color}, ${dark ? "oklch(0.17 0.01 250)" : "white"} 94%)`,
                }}
              >
                <span className="inline-block size-2 rounded-full shrink-0" style={{ background: color, opacity: 0.7 }} />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold leading-tight text-foreground sm:text-[12px]">{p.label}</div>
                  <div className={`text-[8.5px] leading-tight sm:text-[9.5px] ${dark ? "text-white/35" : "text-muted-foreground"}`}>{p.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {["Legally Valid", "Tamper-Proof", "Encrypted"].map((l, i) => (
            <span key={l} className="flex items-center gap-1.5">
              {i > 0 && <span className={`inline-block h-px w-2 ${dark ? "bg-white/[0.05]" : "bg-foreground/[0.06]"}`} />}
              <span className="inline-block size-1 rounded-full bg-brand/35" />
              <span className={`text-[8px] font-medium ${dark ? "text-white/20" : "text-foreground/30"}`}>{l}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
