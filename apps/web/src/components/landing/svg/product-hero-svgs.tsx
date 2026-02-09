"use client";

/* ═══════════════════════════════════════════════════════════
   PER-PRODUCT SVG HERO ILLUSTRATIONS
   Each product gets a completely unique illustration.
   Extracted from apps/web/src/app/(marketing)/products/[slug]/page.tsx
   ═══════════════════════════════════════════════════════════ */

/** SignBolt: Batch document processing factory */
export function SignBoltHeroSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="winGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Conveyor belt base */}
      <rect x="40" y="240" width="400" height="12" rx="6" fill="url(#winGrad)" stroke="var(--color-brand)" strokeWidth="1" opacity="0.4" />
      <line x1="40" y1="246" x2="440" y2="246" stroke="var(--color-brand)" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.3">
        <animate attributeName="stroke-dashoffset" from="48" to="0" dur="2s" repeatCount="indefinite" />
      </line>

      {/* Input stack: unsigned documents */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`in-${i}`} opacity={0.3 + i * 0.15}>
          <rect x={50 + i * 3} y={180 - i * 12} width="60" height="50" rx="4" stroke="currentColor" strokeWidth="1" fill="var(--color-card)" />
          <line x1={58 + i * 3} y1={192 - i * 12} x2={98 + i * 3} y2={192 - i * 12} stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
          <line x1={58 + i * 3} y1={198 - i * 12} x2={90 + i * 3} y2={198 - i * 12} stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
          <line x1={58 + i * 3} y1={204 - i * 12} x2={94 + i * 3} y2={204 - i * 12} stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
        </g>
      ))}
      <text x="80" y="270" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="var(--font-mono)" opacity="0.6">UNSIGNED</text>
      <text x="80" y="280" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">10,247 PDFs</text>

      {/* Processing engine */}
      <rect x="175" y="150" width="130" height="90" rx="12" stroke="var(--color-brand)" strokeWidth="2" fill="var(--color-brand)" fillOpacity="0.06" />
      <rect x="185" y="160" width="110" height="70" rx="8" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.2" />

      {/* Gear icon inside engine */}
      <g transform="translate(240, 185)">
        <circle r="18" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
        </circle>
        <circle r="8" stroke="var(--color-brand)" strokeWidth="1.5" fill="var(--color-brand)" fillOpacity="0.1" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1="0" y1="-12" x2="0" y2="-18"
            stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round"
            transform={`rotate(${angle})`} opacity="0.4"
          />
        ))}
        <circle r="3" fill="var(--color-brand)" opacity="0.6" />
      </g>

      <text x="240" y="225" textAnchor="middle" fill="var(--color-brand)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">BATCH ENGINE</text>
      <text x="240" y="235" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">BouncyCastle + PAdES</text>

      {/* Windows cert store icon */}
      <g transform="translate(240, 110)">
        <rect x="-30" y="-22" width="60" height="44" rx="6" stroke="var(--color-brand)" strokeWidth="1" fill="var(--color-brand)" fillOpacity="0.04" />
        <path d="M-12 -10 L0 -16 L12 -10 L12 6 Q12 14 0 18 Q-12 14 -12 6 Z" stroke="var(--color-brand)" strokeWidth="1.2" fill="var(--color-brand)" fillOpacity="0.08" />
        <path d="M-4 2 L-1 5 L6 -2" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="0" y="-24" textAnchor="middle" fill="var(--color-brand)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.7">WIN CERT STORE</text>
      </g>
      <line x1="240" y1="132" x2="240" y2="150" stroke="var(--color-brand)" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />

      {/* Arrow from input to engine */}
      <g>
        <line x1="125" y1="200" x2="170" y2="195" stroke="var(--color-brand)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
        <path d="M166 190 L175 195 L166 200" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle r="2.5" fill="var(--color-brand)" opacity="0.5">
          <animate attributeName="cx" values="125;170" dur="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="200;195" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Arrow from engine to output */}
      <g>
        <line x1="310" y1="195" x2="350" y2="200" stroke="var(--color-brand)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
        <path d="M346 195 L355 200 L346 205" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle r="2.5" fill="var(--color-success)" opacity="0.5">
          <animate attributeName="cx" values="310;350" dur="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="195;200" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Output stack: signed documents */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`out-${i}`} opacity={0.3 + i * 0.15}>
          <rect x={365 + i * 3} y={180 - i * 12} width="60" height="50" rx="4" stroke="var(--color-success)" strokeWidth="1" fill="var(--color-card)" />
          <line x1={373 + i * 3} y1={192 - i * 12} x2={413 + i * 3} y2={192 - i * 12} stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
          <line x1={373 + i * 3} y1={198 - i * 12} x2={405 + i * 3} y2={198 - i * 12} stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
          <path d={`M${395 + i * 3} ${208 - i * 12} l3 3 6-6`} stroke="var(--color-success)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ))}
      <text x="400" y="270" textAnchor="middle" fill="var(--color-success)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.7">SIGNED</text>
      <text x="400" y="280" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55">PAdES + LTV</text>

      {/* Gmail delivery arrow */}
      <g transform="translate(400, 300)">
        <path d="M0 0 L0 20" stroke="var(--color-brand)" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
        <rect x="-20" y="22" width="40" height="24" rx="4" stroke="var(--color-brand)" strokeWidth="1" fill="var(--color-brand)" fillOpacity="0.04" />
        <path d="M-14 28 L0 38 L14 28" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.4" />
        <text x="0" y="56" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.55">GMAIL OAuth2</text>
      </g>
    </svg>
  );
}

/** SignBridge: Localhost bridge architecture (unchanged) */
export function BridgeHeroSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bridgeShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-violet)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--color-violet)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Browser window - left side */}
      <g transform="translate(30, 60)">
        <rect width="160" height="130" rx="10" stroke="currentColor" strokeWidth="1.5" fill="var(--color-card)" />
        <rect width="160" height="24" rx="10" fill="currentColor" fillOpacity="0.05" />
        <rect y="22" width="160" height="2" fill="currentColor" fillOpacity="0.08" />
        <circle cx="14" cy="12" r="3.5" fill="#FF5F57" opacity="0.7" />
        <circle cx="26" cy="12" r="3.5" fill="#FFBD2E" opacity="0.7" />
        <circle cx="38" cy="12" r="3.5" fill="#28CA41" opacity="0.7" />
        <rect x="54" y="7" width="70" height="10" rx="5" fill="currentColor" fillOpacity="0.06" />
        <rect x="12" y="36" width="136" height="14" rx="3" stroke="var(--color-violet)" strokeWidth="0.8" fill="var(--color-violet)" fillOpacity="0.06" />
        <text x="80" y="46" textAnchor="middle" fill="var(--color-violet)" fontSize="7" fontFamily="var(--font-mono)">Sign Document</text>
        <rect x="12" y="58" width="136" height="50" rx="4" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.02" />
        <line x1="20" y1="68" x2="100" y2="68" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="20" y1="76" x2="86" y2="76" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
        <line x1="20" y1="84" x2="92" y2="84" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
        <rect x="20" y="92" width="50" height="10" rx="3" fill="var(--color-violet)" fillOpacity="0.15" stroke="var(--color-violet)" strokeWidth="0.8" />
        <text x="45" y="99.5" textAnchor="middle" fill="var(--color-violet)" fontSize="6" fontFamily="var(--font-mono)">signBridge.sign()</text>
        <text x="80" y="150" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="var(--font-mono)" opacity="0.6">WEB APPLICATION</text>
      </g>

      {/* HTTPS tunnel - center */}
      <g>
        <line x1="200" y1="130" x2="280" y2="130" stroke="var(--color-violet)" strokeWidth="2" strokeDasharray="6 4" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="30" to="0" dur="2s" repeatCount="indefinite" />
        </line>
        <g transform="translate(240, 130)">
          <circle r="22" fill="url(#bridgeShield)" />
          <path d="M0 -14 L12 -8 L12 4 Q12 12 0 16 Q-12 12 -12 4 L-12 -8 Z" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.08" />
          <path d="M-4 1 L-1 4 L6 -3" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <text x="240" y="162" textAnchor="middle" fill="var(--color-violet)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">HTTPS :53000</text>
        <text x="240" y="174" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.55">Ed25519 JWT</text>
        <circle r="3" fill="var(--color-violet)" opacity="0.6">
          <animate attributeName="cx" values="200;280" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="125;125" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle r="2.5" fill="var(--color-violet)" opacity="0.4">
          <animate attributeName="cx" values="280;200" dur="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="135;135" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* SignBridge agent - right side */}
      <g transform="translate(290, 60)">
        <rect width="160" height="130" rx="10" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.04" />
        <rect width="160" height="24" rx="10" fill="var(--color-violet)" fillOpacity="0.06" />
        <rect y="22" width="160" height="2" fill="var(--color-violet)" fillOpacity="0.1" />
        <circle cx="14" cy="12" r="4" fill="var(--color-violet)" fillOpacity="0.3" />
        <text x="28" y="14.5" fill="var(--color-violet)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600">SignBridge Agent</text>
        <circle cx="140" cy="12" r="3" fill="var(--color-success)" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(12, ${38 + i * 28})`}>
            <rect width="136" height="22" rx="4" stroke="var(--color-violet)" strokeWidth="0.8" fill="var(--color-violet)" fillOpacity={0.02 + i * 0.02} />
            <circle cx="14" cy="11" r="6" stroke="var(--color-violet)" strokeWidth="0.8" fill="none" opacity="0.3" />
            <path d={`M11 11 L13 13 L17 9`} stroke="var(--color-violet)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
            <text x="28" y="9" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.7">{["RSA-2048 Cert", "ECDSA P-256", "USB Token (ePass)"][i]}</text>
            <text x="28" y="17" fill="currentColor" fontSize="5.5" fontFamily="var(--font-mono)" opacity="0.5">{["Windows Store", "Smart Card", "Hardware"][i]}</text>
          </g>
        ))}
        <text x="80" y="150" textAnchor="middle" fill="var(--color-violet)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.6">SIGNBRIDGE</text>
      </g>

      {/* Bottom: HMAC isolation indicator */}
      <g transform="translate(240, 240)">
        <rect x="-100" y="0" width="200" height="36" rx="8" stroke="var(--color-violet)" strokeWidth="1" fill="var(--color-violet)" fillOpacity="0.04" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={-80 + i * 60} y="8" width="44" height="20" rx="4" stroke="var(--color-violet)" strokeWidth="0.8" fill="none" opacity="0.2" />
            <text x={-58 + i * 60} y="21" textAnchor="middle" fill="var(--color-violet)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.5">{["Session A", "Session B", "Session C"][i]}</text>
          </g>
        ))}
        <text x="0" y="50" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55">HMAC Cryptographic Isolation</text>
      </g>

      {/* "0ms key exposure" badge */}
      <g transform="translate(240, 310)">
        <rect x="-40" y="0" width="80" height="24" rx="12" stroke="var(--color-violet)" strokeWidth="1.5" fill="var(--color-violet)" fillOpacity="0.08" />
        <text x="0" y="15" textAnchor="middle" fill="var(--color-violet)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">0ms exposure</text>
      </g>
    </svg>
  );
}

/** SignLift: Serverless cloud architecture */
export function SignLiftHeroSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* API request - left */}
      <g transform="translate(30, 100)">
        <rect width="130" height="100" rx="8" stroke="currentColor" strokeWidth="1" fill="var(--color-card)" />
        <rect width="130" height="20" rx="8" fill="currentColor" fillOpacity="0.04" />
        <text x="10" y="14" fill="var(--color-cyan)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600">POST /v1/sign</text>
        <rect x="8" y="28" width="114" height="60" rx="4" fill="currentColor" fillOpacity="0.03" />
        <text x="14" y="40" fill="var(--color-cyan)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.75">{"{"}</text>
        <text x="20" y="50" fill="currentColor" fontSize="6" fontFamily="var(--font-mono)" opacity="0.6">{'"pdf": "s3://...",\u00A0\u00A0'}</text>
        <text x="20" y="60" fill="currentColor" fontSize="6" fontFamily="var(--font-mono)" opacity="0.6">{'"cert": "pkcs12",\u00A0'}</text>
        <text x="20" y="70" fill="currentColor" fontSize="6" fontFamily="var(--font-mono)" opacity="0.6">{'"fields": [...]\u00A0\u00A0\u00A0'}</text>
        <text x="14" y="80" fill="var(--color-cyan)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.75">{"}"}</text>
        <text x="65" y="118" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">HTTP REQUEST</text>
      </g>

      {/* Arrow to API Gateway */}
      <line x1="168" y1="150" x2="196" y2="150" stroke="var(--color-cyan)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
      <circle r="2.5" fill="var(--color-cyan)" opacity="0.5">
        <animate attributeName="cx" values="168;196" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="150" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* API Gateway */}
      <g transform="translate(200, 120)">
        <rect width="80" height="60" rx="8" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.06" />
        <text x="40" y="25" textAnchor="middle" fill="var(--color-cyan)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">API</text>
        <text x="40" y="35" textAnchor="middle" fill="var(--color-cyan)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">GATEWAY</text>
        <rect x="10" y="42" width="60" height="10" rx="3" fill="var(--color-cyan)" fillOpacity="0.1" />
        <text x="40" y="50" textAnchor="middle" fill="var(--color-cyan)" fontSize="5.5" fontFamily="var(--font-mono)" opacity="0.5">JWT VERIFIED</text>
      </g>

      {/* Arrow to Lambda */}
      <line x1="284" y1="150" x2="310" y2="150" stroke="var(--color-cyan)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />

      {/* Lambda function */}
      <g transform="translate(314, 96)">
        <rect width="130" height="108" rx="10" stroke="var(--color-cyan)" strokeWidth="2" fill="url(#cloudFill)" />
        <g transform="translate(65, 30)">
          <path d="M-16 -16 L0 16 L16 -16" stroke="var(--color-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
          <circle r="4" fill="var(--color-cyan)" opacity="0.3" cy="-16" />
        </g>
        <text x="65" y="58" textAnchor="middle" fill="var(--color-cyan)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">AWS LAMBDA</text>
        <text x="65" y="70" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.6">Micronaut 4.10</text>
        <text x="65" y="80" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.6">Java 25 + SnapStart</text>
        <rect x="15" y="88" width="100" height="10" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="15" y="88" width="70" height="10" rx="5" fill="var(--color-cyan)" fillOpacity="0.15" />
        <text x="65" y="96" textAnchor="middle" fill="var(--color-cyan)" fontSize="5.5" fontFamily="var(--font-mono)">{"< 200ms cold start"}</text>
      </g>

      {/* S3 bucket - top right */}
      <g transform="translate(380, 40)">
        <ellipse cx="30" cy="10" rx="30" ry="10" stroke="var(--color-cyan)" strokeWidth="1" fill="var(--color-cyan)" fillOpacity="0.06" />
        <path d="M0 10 L0 35 Q0 45 30 45 Q60 45 60 35 L60 10" stroke="var(--color-cyan)" strokeWidth="1" fill="none" opacity="0.3" />
        <ellipse cx="30" cy="35" rx="30" ry="10" stroke="var(--color-cyan)" strokeWidth="1" fill="none" opacity="0.2" />
        <text x="30" y="60" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55">S3 BUCKET</text>
      </g>
      <line x1="394" y1="75" x2="380" y2="96" stroke="var(--color-cyan)" strokeWidth="1" strokeDasharray="3 2" opacity="0.25" />

      {/* AcroForm lifecycle - bottom */}
      <g transform="translate(140, 260)">
        <text x="100" y="0" textAnchor="middle" fill="var(--color-cyan)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.6">ACROFORM LIFECYCLE</text>
        {["CREATE", "FILL", "FLATTEN", "LOCK"].map((step, i) => (
          <g key={step} transform={`translate(${i * 56}, 14)`}>
            <rect width="44" height="28" rx="6" stroke="var(--color-cyan)" strokeWidth={i === 3 ? "1.5" : "1"} fill="var(--color-cyan)" fillOpacity={0.03 + i * 0.02} />
            <text x="22" y="18" textAnchor="middle" fill="var(--color-cyan)" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="600" opacity={0.4 + i * 0.15}>{step}</text>
            {i < 3 && (
              <line x1="46" y1="14" x2="54" y2="14" stroke="var(--color-cyan)" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
            )}
          </g>
        ))}
      </g>

      {/* Response output */}
      <g transform="translate(314, 220)">
        <line x1="65" y1="0" x2="65" y2="16" stroke="var(--color-success)" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
        <rect x="15" y="18" width="100" height="30" rx="6" stroke="var(--color-success)" strokeWidth="1" fill="var(--color-success)" fillOpacity="0.06" />
        <text x="65" y="33" textAnchor="middle" fill="var(--color-success)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.7">200 OK</text>
        <text x="65" y="43" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="var(--font-mono)" opacity="0.55">signed_doc.pdf</text>
      </g>
    </svg>
  );
}

/** SignPad: Multi-method signing platform */
export function SignPadHeroSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Central document */}
      <g transform="translate(190, 40)">
        <rect width="100" height="130" rx="8" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-card)" />
        <rect width="100" height="22" rx="8" fill="var(--color-amber)" fillOpacity="0.06" />
        <text x="50" y="15" textAnchor="middle" fill="var(--color-amber)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600">CONTRACT.PDF</text>
        <rect x="10" y="30" width="80" height="10" rx="3" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.03" />
        <text x="14" y="38" fill="currentColor" fontSize="5.5" fontFamily="var(--font-mono)" opacity="0.5">Name: __________</text>
        <rect x="10" y="46" width="80" height="10" rx="3" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.03" />
        <text x="14" y="54" fill="currentColor" fontSize="5.5" fontFamily="var(--font-mono)" opacity="0.5">Date: __________</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="10" y={68 + i * 20} width="80" height="16" rx="4" stroke="var(--color-amber)" strokeWidth="0.8" fill="var(--color-amber)" fillOpacity={0.03 + i * 0.02} strokeDasharray={i === 2 ? "none" : "3 2"} />
            <text x="50" y={78 + i * 20} textAnchor="middle" fill="var(--color-amber)" fontSize="5.5" fontFamily="var(--font-mono)" opacity={0.5 + i * 0.1}>
              {["Signer A", "Signer B", "Signer C"][i]}
            </text>
          </g>
        ))}
      </g>

      {/* Left: Electronic */}
      <g>
        <path d="M190 120 Q140 140 80 180" stroke="var(--color-amber)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3s" repeatCount="indefinite" />
        </path>
        <g transform="translate(20, 180)">
          <rect width="120" height="80" rx="10" stroke="var(--color-amber)" strokeWidth="1.5" fill="url(#moonGrad)" />
          <g transform="translate(60, 30)">
            <path d="M-18 8 Q-10 -10 0 0 Q10 10 18 -4" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="18" cy="-4" r="3" fill="var(--color-amber)" opacity="0.4" />
          </g>
          <text x="60" y="55" textAnchor="middle" fill="var(--color-amber)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">ELECTRONIC</text>
          <text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.55">Draw / Type / Upload</text>
        </g>
      </g>

      {/* Center: DSC USB */}
      <g>
        <line x1="240" y1="170" x2="240" y2="200" stroke="var(--color-amber)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3.5s" repeatCount="indefinite" />
        </line>
        <g transform="translate(180, 200)">
          <rect width="120" height="80" rx="10" stroke="var(--color-amber)" strokeWidth="1.5" fill="url(#moonGrad)" />
          <g transform="translate(60, 28)">
            <rect x="-10" y="-12" width="20" height="24" rx="4" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.08" />
            <rect x="-6" y="-18" width="12" height="8" rx="2" stroke="var(--color-amber)" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="-3" cy="0" r="2" fill="var(--color-amber)" opacity="0.4" />
            <circle cx="3" cy="0" r="2" fill="var(--color-amber)" opacity="0.4" />
          </g>
          <text x="60" y="55" textAnchor="middle" fill="var(--color-amber)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">DSC USB</text>
          <text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.55">via SignBridge</text>
        </g>
      </g>

      {/* Right: Aadhaar OTP */}
      <g>
        <path d="M290 120 Q340 140 400 180" stroke="var(--color-amber)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="4s" repeatCount="indefinite" />
        </path>
        <g transform="translate(340, 180)">
          <rect width="120" height="80" rx="10" stroke="var(--color-amber)" strokeWidth="1.5" fill="url(#moonGrad)" />
          <g transform="translate(60, 28)">
            <circle r="14" stroke="var(--color-amber)" strokeWidth="1" fill="none" opacity="0.2" />
            <circle r="10" stroke="var(--color-amber)" strokeWidth="1" fill="none" opacity="0.15" />
            <circle r="6" stroke="var(--color-amber)" strokeWidth="1" fill="none" opacity="0.1" />
            <circle r="3" fill="var(--color-amber)" opacity="0.3" />
          </g>
          <text x="60" y="55" textAnchor="middle" fill="var(--color-amber)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">AADHAAR OTP</text>
          <text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-mono)" opacity="0.55">IT Act Compliant</text>
        </g>
      </g>

      {/* Bottom: Audit trail */}
      <g transform="translate(100, 310)">
        <rect width="280" height="30" rx="8" stroke="var(--color-amber)" strokeWidth="1" fill="var(--color-amber)" fillOpacity="0.04" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={10 + i * 54} y="6" width="44" height="18" rx="4" stroke="var(--color-amber)" strokeWidth="0.8" fill="none" opacity={0.15 + i * 0.05} />
            <text x={32 + i * 54} y="18" textAnchor="middle" fill="var(--color-amber)" fontSize="5" fontFamily="var(--font-mono)" opacity={0.5 + i * 0.1}>
              {["a3f2...", "b7c1...", "d4e5...", "f8a9...", "1b2c..."][i]}
            </text>
            {i < 4 && <line x1={56 + i * 54} y1="15" x2={62 + i * 54} y2="15" stroke="var(--color-amber)" strokeWidth="0.8" opacity="0.2" />}
          </g>
        ))}
        <text x="140" y="48" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55">SHA-256 AUDIT TRAIL</text>
      </g>
    </svg>
  );
}

/** Map slug to hero SVG component */
export const productHeroSvgs: Record<string, React.ReactNode> = {
  signbolt: <SignBoltHeroSvg className="w-full" />,
  signbridge: <BridgeHeroSvg className="w-full" />,
  signlift: <SignLiftHeroSvg className="w-full" />,
  signpad: <SignPadHeroSvg className="w-full" />,
};
