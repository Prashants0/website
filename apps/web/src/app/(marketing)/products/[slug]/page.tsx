"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  accentBgMap,
  accentBgMutedMap,
  accentBorderMap,
  accentColorMap,
  accentGlowMap,
} from "@/components/landing/accent-utils";
import {
  getProductBySlug,
  products,
  signboltAddons,
} from "@/components/landing/data";
import { useReveal, useRevealStyle } from "@/components/landing/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  productHeroSvgs,
  ProductArchSvg,
  useCaseIcons,
  ProductIcon,
  FeatureCheckSvg,
  PricingCheckSvg,
  IntegrationDotSvg,
  UseCaseFallbackSvg,
  SignBoltHeroCanvas,
  SignBridgeHeroCanvas,
  SignLiftHeroCanvas,
  SignPadHeroCanvas,
} from "@/components/landing/svg";

/* ═══════════════════════════════════════════════════════════
   SIGNBOLT SPECIFIC COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/** File format badges for SignBolt hero */
function FileFormatBadges() {
  const formats = [
    { ext: "PDF", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
    { ext: "DOCX", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {formats.map((f) => (
        <span
          key={f.ext}
          className={`inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold ${f.color}`}
        >
          .{f.ext}
        </span>
      ))}
    </div>
  );
}

/** Visual step-by-step walkthrough for SignBolt */
function SignBoltWalkthrough({
  vis,
  rs,
}: {
  vis: boolean;
  rs: typeof useRevealStyle;
}) {
  const steps = [
    {
      num: "01",
      title: "Drop Your Files",
      desc: "Drag a folder of PDFs or Word documents into SignBolt. It picks up every file in the folder — hundreds or thousands at once.",
      detail: "Supports .pdf and .docx",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="8" y="4" width="32" height="40" rx="4" stroke="var(--color-brand)" strokeWidth="2" fill="var(--color-brand)" fillOpacity="0.06" />
          <path d="M16 20 L24 14 L32 20" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="24" y1="14" x2="24" y2="32" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="36" x2="34" y2="36" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Pick a Template",
      desc: "Choose a signing template that tells SignBolt exactly where to place the signature. Create one template and reuse it across every batch — no setup each time.",
      detail: "Position, size, appearance — all saved",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="6" y="6" width="36" height="36" rx="4" stroke="var(--color-brand)" strokeWidth="2" fill="var(--color-brand)" fillOpacity="0.06" />
          <rect x="12" y="24" width="24" height="12" rx="2" stroke="var(--color-brand)" strokeWidth="1.5" strokeDasharray="3 2" fill="var(--color-brand)" fillOpacity="0.04" />
          <line x1="24" y1="26" x2="24" y2="34" stroke="var(--color-brand)" strokeWidth="1" opacity="0.3" />
          <line x1="18" y1="30" x2="30" y2="30" stroke="var(--color-brand)" strokeWidth="1" opacity="0.3" />
          <circle cx="24" cy="30" r="3" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.4" />
          <line x1="12" y1="12" x2="28" y2="12" stroke="var(--color-brand)" strokeWidth="1.5" opacity="0.3" />
          <line x1="12" y1="17" x2="22" y2="17" stroke="var(--color-brand)" strokeWidth="1.5" opacity="0.2" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Plug In Your Token",
      desc: "Insert your USB DSC token. SignBolt detects all certificates on your machine — hardware tokens or installed .pfx files.",
      detail: "USB token / .pfx",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          {/* USB connector prongs */}
          <rect x="19" y="2" width="10" height="5" rx="1.5" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
          <rect x="21.5" y="3.5" width="2" height="2" rx="0.5" fill="var(--color-brand)" opacity="0.5" />
          <rect x="24.5" y="3.5" width="2" height="2" rx="0.5" fill="var(--color-brand)" opacity="0.5" />
          {/* Token body */}
          <rect x="16" y="6" width="16" height="26" rx="3" stroke="var(--color-brand)" strokeWidth="1.8" fill="var(--color-brand)" fillOpacity="0.05" />
          {/* Chip contact pad with grid */}
          <rect x="19" y="12" width="10" height="7" rx="1.5" stroke="var(--color-brand)" strokeWidth="1.2" fill="var(--color-brand)" fillOpacity="0.08" />
          <line x1="19" y1="15.5" x2="29" y2="15.5" stroke="var(--color-brand)" strokeWidth="0.6" opacity="0.3" />
          <line x1="24" y1="12" x2="24" y2="19" stroke="var(--color-brand)" strokeWidth="0.6" opacity="0.3" />
          {/* LED indicator */}
          <circle cx="24" cy="25" r="1.8" fill="var(--color-success)" opacity="0.6" />
          <circle cx="24" cy="25" r="1" fill="var(--color-success)" opacity="0.9" />
          {/* Shield below token */}
          <path d="M24 34 L31 37 L31 41 Q31 45 24 47 Q17 45 17 41 L17 37 Z" stroke="var(--color-brand)" strokeWidth="1.3" fill="var(--color-brand)" fillOpacity="0.06" />
          <path d="M22 40.5 L23.5 42 L27 39" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Hit Sign — Done",
      desc: "Click Sign and walk away. SignBolt processes every document, applies PAdES cryptographic signatures with Long-Term Validation, and can auto-email the results to recipients.",
      detail: "PAdES + LTV — valid for years",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <circle cx="24" cy="24" r="18" stroke="var(--color-success)" strokeWidth="2" fill="var(--color-success)" fillOpacity="0.08" />
          <path d="M16 24 L21 29 L32 18" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <div
          key={step.num}
          className="group relative"
          style={rs(vis, i * 100)}
        >
          {/* Connector line (desktop only) */}
          {i < steps.length - 1 && (
            <div className="absolute -right-3 top-12 hidden h-[2px] w-6 bg-brand/15 lg:block">
              <div className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand/30" />
            </div>
          )}
          <div className="rounded-2xl border border-transparent p-6 transition-all duration-300 hover:border-brand/15 hover:bg-brand-muted">
            {/* Step number */}
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-muted font-mono text-xs font-bold text-brand">
                {step.num}
              </span>
              <div className="h-px flex-1 bg-brand/10" />
            </div>
            {/* Icon */}
            <div className="mb-4">{step.icon}</div>
            {/* Title */}
            <h3 className="mb-2 text-lg font-bold tracking-tight">
              {step.title}
            </h3>
            {/* Description */}
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {step.desc}
            </p>
            {/* Technical detail */}
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
              {step.detail}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIGNBRIDGE SPECIFIC COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/** Visual step-by-step walkthrough for SignBridge — explains the flow to non-tech users */
function SignBridgeWalkthrough({
  vis,
  rs,
}: {
  vis: boolean;
  rs: typeof useRevealStyle;
}) {
  const steps = [
    {
      num: "01",
      title: "Install SignBridge",
      desc: "Download and install the lightweight desktop app. It sits quietly in your system tray -- no admin rights needed, no complicated setup.",
      detail: "Runs on Windows",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="8" y="4" width="32" height="40" rx="4" stroke="var(--color-violet)" strokeWidth="2" fill="var(--color-violet)" fillOpacity="0.06" />
          <path d="M18 20 L24 26 L30 20" stroke="var(--color-violet)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="24" y1="12" x2="24" y2="26" stroke="var(--color-violet)" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="36" x2="34" y2="36" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Plug In Your Token",
      desc: "Insert your USB token. SignBridge automatically detects your digital certificate from the Windows Certificate Store -- no manual configuration.",
      detail: "USB tokens & certificates",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="17" y="4" width="14" height="10" rx="2" stroke="var(--color-violet)" strokeWidth="1.5" fill="none" opacity="0.3" />
          <rect x="14" y="14" width="20" height="28" rx="4" stroke="var(--color-violet)" strokeWidth="2" fill="var(--color-violet)" fillOpacity="0.06" />
          <rect x="20" y="22" width="8" height="8" rx="1" stroke="var(--color-violet)" strokeWidth="1.2" fill="var(--color-violet)" fillOpacity="0.1" />
          <circle cx="24" cy="36" r="2" fill="var(--color-success)" opacity="0.6" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Click Sign on Any Website",
      desc: "Open your bank portal, government filing site, or any web app that uses SignBridge. Click the \"Sign\" button -- just like you would for any other action.",
      detail: "Works in any browser",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="4" y="6" width="40" height="32" rx="4" stroke="var(--color-violet)" strokeWidth="2" fill="var(--color-violet)" fillOpacity="0.06" />
          <rect x="4" y="6" width="40" height="10" rx="4" fill="var(--color-violet)" fillOpacity="0.04" />
          <circle cx="12" cy="11" r="2" fill="var(--color-violet)" opacity="0.3" />
          <circle cx="18" cy="11" r="2" fill="var(--color-violet)" opacity="0.3" />
          <circle cx="24" cy="11" r="2" fill="var(--color-violet)" opacity="0.3" />
          <rect x="14" y="26" width="20" height="8" rx="3" fill="var(--color-violet)" fillOpacity="0.15" stroke="var(--color-violet)" strokeWidth="1" />
          <text x="24" y="32" textAnchor="middle" fill="var(--color-violet)" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">SIGN</text>
        </svg>
      ),
    },
    {
      num: "04",
      title: "Done -- Signed & Sealed",
      desc: "SignBridge signs the document using your hardware token's private key. The key never leaves the token, and you get a cryptographically valid signed PDF in seconds.",
      detail: "Zero key exposure",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <path d="M24 4 L38 12 L38 26 Q38 38 24 44 Q10 38 10 26 L10 12 Z" stroke="var(--color-success)" strokeWidth="2" fill="var(--color-success)" fillOpacity="0.08" />
          <path d="M18 24 L22 28 L30 20" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <div
          key={step.num}
          className="group relative"
          style={rs(vis, i * 100)}
        >
          {/* Connector line (desktop only) */}
          {i < steps.length - 1 && (
            <div className="absolute -right-3 top-12 hidden h-[2px] w-6 bg-violet/15 lg:block">
              <div className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-violet/30" />
            </div>
          )}
          <div className="rounded-2xl border border-transparent p-6 transition-all duration-300 hover:border-violet/15 hover:bg-violet-muted">
            {/* Step number */}
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-violet-muted font-mono text-xs font-bold text-violet">
                {step.num}
              </span>
              <div className="h-px flex-1 bg-violet/10" />
            </div>
            {/* Icon */}
            <div className="mb-4">{step.icon}</div>
            {/* Title */}
            <h3 className="mb-2 text-lg font-bold tracking-tight">
              {step.title}
            </h3>
            {/* Description */}
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {step.desc}
            </p>
            {/* Technical detail */}
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
              {step.detail}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIGNLIFT SPECIFIC COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/** Visual step-by-step integration journey for SignLift — explains the flow to non-tech users */
function SignLiftWalkthrough({
  vis,
  rs,
}: {
  vis: boolean;
  rs: typeof useRevealStyle;
}) {
  const steps = [
    {
      num: "01",
      title: "Get Your API Token",
      desc: "Generate a JWT token for your application. Include it in the X-API-Token header of every request — the same authentication pattern used by Stripe, Twilio, and every modern API.",
      detail: "JWT via X-API-Token header",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="8" y="10" width="32" height="28" rx="4" stroke="var(--color-cyan)" strokeWidth="2" fill="var(--color-cyan)" fillOpacity="0.06" />
          <rect x="14" y="4" width="20" height="10" rx="3" stroke="var(--color-cyan)" strokeWidth="1.5" fill="none" opacity="0.3" />
          <circle cx="24" cy="28" r="5" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.1" />
          <circle cx="24" cy="28" r="2" fill="var(--color-cyan)" opacity="0.4" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Configure Your Certificate",
      desc: "Point SignLift to your PKCS#12 certificate — a .p12 or .pfx file that contains your signing key. Store it on the file system, bundle it with your app, or keep it in an S3 bucket.",
      detail: "PKCS#12 (.p12/.pfx)",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <path d="M24 4 L38 12 L38 26 Q38 38 24 44 Q10 38 10 26 L10 12 Z" stroke="var(--color-cyan)" strokeWidth="2" fill="var(--color-cyan)" fillOpacity="0.06" />
          <path d="M18 24 L22 28 L30 20" stroke="var(--color-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Send a Signing Request",
      desc: "Make an HTTP POST with your PDF and signature configuration. SignLift signs the document using PAdES — the same cryptographic standard used by European governments and financial institutions.",
      detail: "POST /v1/sign",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="6" y="6" width="36" height="36" rx="6" stroke="var(--color-cyan)" strokeWidth="2" fill="var(--color-cyan)" fillOpacity="0.06" />
          <path d="M16 20 L24 14 L32 20" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="24" y1="14" x2="24" y2="34" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Get Your Signed PDF",
      desc: "SignLift returns the signed PDF in the response. The signature includes Long-Term Validation data, so the document can be verified years from now — even after the certificate expires.",
      detail: "200 OK — signed PDF",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="10" y="4" width="28" height="36" rx="4" stroke="var(--color-success)" strokeWidth="2" fill="var(--color-success)" fillOpacity="0.06" />
          <path d="M18 22 L22 26 L30 18" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="14" y1="32" x2="34" y2="32" stroke="var(--color-success)" strokeWidth="1" opacity="0.2" />
          <line x1="14" y1="10" x2="28" y2="10" stroke="var(--color-success)" strokeWidth="1" opacity="0.2" />
          <line x1="14" y1="14" x2="24" y2="14" stroke="var(--color-success)" strokeWidth="1" opacity="0.15" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "Store or Deliver",
      desc: "Save the signed PDF to your storage, serve it to your users, or feed it into downstream workflows. SignLift handles the cryptography — you control what happens next.",
      detail: "S3 / DB / downstream",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <ellipse cx="24" cy="14" rx="16" ry="6" stroke="var(--color-cyan)" strokeWidth="1.5" fill="var(--color-cyan)" fillOpacity="0.06" />
          <path d="M8 14 L8 34 Q8 40 24 40 Q40 40 40 34 L40 14" stroke="var(--color-cyan)" strokeWidth="1.5" fill="none" />
          <ellipse cx="24" cy="24" rx="16" ry="6" stroke="var(--color-cyan)" strokeWidth="0.8" fill="none" opacity="0.2" />
          <ellipse cx="24" cy="34" rx="16" ry="6" stroke="var(--color-cyan)" strokeWidth="0.8" fill="none" opacity="0.2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <div
          key={step.num}
          className="group relative"
          style={rs(vis, i * 100)}
        >
          {/* Connector line (desktop only) */}
          {i < steps.length - 1 && (
            <div className="absolute -right-3 top-12 hidden h-[2px] w-6 bg-cyan/15 lg:block">
              <div className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-cyan/30" />
            </div>
          )}
          <div className="rounded-2xl border border-transparent p-6 transition-all duration-300 hover:border-cyan/15 hover:bg-cyan-muted">
            {/* Step number */}
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-muted font-mono text-xs font-bold text-cyan">
                {step.num}
              </span>
              <div className="h-px flex-1 bg-cyan/10" />
            </div>
            {/* Icon */}
            <div className="mb-4">{step.icon}</div>
            {/* Title */}
            <h3 className="mb-2 text-lg font-bold tracking-tight">
              {step.title}
            </h3>
            {/* Description */}
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {step.desc}
            </p>
            {/* Technical detail */}
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
              {step.detail}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIGNPAD SPECIFIC COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/** Visual step-by-step walkthrough for SignPad — non-tech friendly with crypto terminology */
function SignPadWalkthrough({
  vis,
  rs,
}: {
  vis: boolean;
  rs: typeof useRevealStyle;
}) {
  const steps = [
    {
      num: "01",
      title: "Upload Your Document",
      desc: "Drop a PDF into SignPad. It opens in the visual editor where you can see exactly what signers will see. No conversions, no surprises.",
      detail: "PDF documents",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="8" y="4" width="32" height="40" rx="4" stroke="var(--color-amber)" strokeWidth="2" fill="var(--color-amber)" fillOpacity="0.06" />
          <path d="M16 20 L24 14 L32 20" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="24" y1="14" x2="24" y2="32" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="36" x2="34" y2="36" stroke="var(--color-amber)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Place Fields & Set Roles",
      desc: "Drag signature boxes, text fields, date pickers, and checkboxes right where they belong. Assign each field to a signer and define the signing order — sequential, parallel, or a mix of both.",
      detail: "Drag-and-drop editor",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <rect x="6" y="6" width="36" height="36" rx="4" stroke="var(--color-amber)" strokeWidth="2" fill="var(--color-amber)" fillOpacity="0.06" />
          <rect x="10" y="14" width="28" height="8" rx="2" stroke="var(--color-amber)" strokeWidth="1" strokeDasharray="3 2" fill="var(--color-amber)" fillOpacity="0.04" />
          <rect x="10" y="26" width="16" height="8" rx="2" stroke="var(--color-amber)" strokeWidth="1" strokeDasharray="3 2" fill="var(--color-amber)" fillOpacity="0.04" />
          <rect x="28" y="26" width="10" height="8" rx="2" stroke="var(--color-amber)" strokeWidth="1" strokeDasharray="3 2" fill="var(--color-amber)" fillOpacity="0.04" />
          <path d="M38 10 L42 6" stroke="var(--color-amber)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <circle cx="42" cy="6" r="2" fill="var(--color-amber)" opacity="0.4" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Send for Signature",
      desc: "Add recipient email addresses and hit Send. Each signer gets a secure link — no account needed. They open it, review the document, and sign using the method you've enabled: e-sign, USB certificate, or Aadhaar OTP.",
      detail: "1 credit per document",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <path d="M6 12 L24 24 L42 12" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="6" y="12" width="36" height="24" rx="4" stroke="var(--color-amber)" strokeWidth="2" fill="var(--color-amber)" fillOpacity="0.06" />
          <path d="M6 36 L20 24" stroke="var(--color-amber)" strokeWidth="1" opacity="0.3" />
          <path d="M42 36 L28 24" stroke="var(--color-amber)" strokeWidth="1" opacity="0.3" />
          <circle cx="38" cy="10" r="6" fill="var(--color-amber)" fillOpacity="0.15" stroke="var(--color-amber)" strokeWidth="1" />
          <text x="38" y="13" textAnchor="middle" fill="var(--color-amber)" fontSize="8" fontWeight="700">1</text>
        </svg>
      ),
    },
    {
      num: "04",
      title: "Track, Download & Integrate",
      desc: "Watch signing progress in real time from your dashboard. When complete, download the signed PDF with its SHA-256 audit certificate. Webhooks push events to your CRM, ERP, or any system that speaks HTTP.",
      detail: "SHA-256 audit trail",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-10">
          <circle cx="24" cy="24" r="18" stroke="var(--color-success)" strokeWidth="2" fill="var(--color-success)" fillOpacity="0.08" />
          <path d="M16 24 L21 29 L32 18" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <div
          key={step.num}
          className="group relative"
          style={rs(vis, i * 100)}
        >
          {/* Connector line (desktop only) */}
          {i < steps.length - 1 && (
            <div className="absolute -right-3 top-12 hidden h-[2px] w-6 bg-amber/15 lg:block">
              <div className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-amber/30" />
            </div>
          )}
          <div className="rounded-2xl border border-transparent p-6 transition-all duration-300 hover:border-amber/15 hover:bg-amber-muted">
            {/* Step number */}
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-amber-muted font-mono text-xs font-bold text-amber">
                {step.num}
              </span>
              <div className="h-px flex-1 bg-amber/10" />
            </div>
            {/* Icon */}
            <div className="mb-4">{step.icon}</div>
            {/* Title */}
            <h3 className="mb-2 text-lg font-bold tracking-tight">
              {step.title}
            </h3>
            {/* Description */}
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {step.desc}
            </p>
            {/* Technical detail */}
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
              {step.detail}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Three signing methods explained for non-technical users */
function SignPadSigningMethods({
  vis,
  rs,
}: {
  vis: boolean;
  rs: typeof useRevealStyle;
}) {
  const methods = [
    {
      name: "Electronic Signature",
      headline: "The quickest way to sign",
      desc: "Signers draw their signature with a mouse or finger, type their name, or upload a signature image. Fast, familiar, and good for everyday business documents like offer letters, NDAs, and vendor agreements.",
      standard: "eSign / UETA compliant",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-12">
          <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--color-amber)" fillOpacity="0.06" stroke="var(--color-amber)" strokeWidth="1.5" />
          <path d="M12 32 Q18 18 24 24 Q30 30 36 16" stroke="var(--color-amber)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="16" r="3" fill="var(--color-amber)" opacity="0.4" />
        </svg>
      ),
    },
    {
      name: "USB Digital Certificate (DSC)",
      headline: "Cryptographically verifiable",
      desc: "Signers use their USB token — the private key never leaves the hardware. The document gets a PAdES-compliant digital signature that any PDF reader can verify. Best for government filings, tenders, and regulated industries.",
      standard: "X.509 / PAdES / IT Act Section 3A",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="size-12">
          <rect x="16" y="2" width="16" height="10" rx="3" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" opacity="0.3" />
          <rect x="12" y="12" width="24" height="34" rx="6" stroke="var(--color-amber)" strokeWidth="1.5" fill="var(--color-amber)" fillOpacity="0.06" />
          <rect x="18" y="20" width="12" height="10" rx="2" stroke="var(--color-amber)" strokeWidth="1" fill="var(--color-amber)" fillOpacity="0.08" />
          <circle cx="21" cy="25" r="2" fill="var(--color-amber)" opacity="0.4" />
          <circle cx="27" cy="25" r="2" fill="var(--color-amber)" opacity="0.4" />
          <circle cx="24" cy="38" r="3" fill="var(--color-success)" opacity="0.5" />
        </svg>
      ),
    },
    {
      name: "Aadhaar OTP eSign",
      headline: "Identity-verified, legally binding",
      desc: "Signers verify their identity through their Aadhaar number and an OTP sent to their registered mobile. This creates a legally binding signature under the Indian IT Act, 2000. Ideal for financial services, insurance, and any process requiring identity verification.",
      standard: "IT Act 2000 / Indian Evidence Act",
      icon: (
        <svg viewBox="0 0 353.3 248.43" className="h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path d="m304.52 102.82-3e-3 2e-3h4e-3c-1.6236 2.454-2.213 5.4084-2.7078 8.4882-0.60669 3.7502-1.2461 7.3503-2.5723 10.879-1.5936 4.2305-4.2696 8.9439-8.9275 12.633a120.97 120.97 0 0 0-20.684-35.668c5.5503-2.2185 10.998-2.1839 15.476-1.4453 3.7202 0.61578 7.1575 1.8619 10.71 3.2117 2.9125 1.1124 5.7667 2.0793 8.7038 1.8992m-54.045-54.044-2e-3 0.0027 4e-3 -9.1e-4c-0.18009 2.9361 0.78679 5.7895 1.8983 8.7038 1.3498 3.5519 2.5959 6.9892 3.2126 10.709 0.73858 4.4824 0.77224 9.9363-1.4517 15.491a121.07 121.07 0 0 0-35.711-20.637c3.6974-4.6962 8.4318-7.3894 12.681-8.9894 3.5292-1.3262 7.1293-1.9656 10.881-2.5732 3.078-0.4939 6.0332-1.0824 8.4873-2.7069m45.529 107.26c5.8741 0.86865 10.548 3.6083 14.041 6.4735 2.9125 2.394 5.2665 5.1919 7.6687 8.138 1.9656 2.4177 3.9539 4.6825 6.5863 5.995h-26.521a121.88 121.88 0 0 0-1.7755-20.607m-193.18-107.26 2e-3 0.0018v-0.0027c2.454 1.6236 5.4093 2.2121 8.4882 2.7078 3.7502 0.60669 7.3503 1.2461 10.879 2.5714 4.2496 1.6 8.9848 4.2941 12.681 8.9903a120.97 120.97 0 0 0-35.711 20.637c-2.2239-5.5548-2.1912-11.009-1.4508-15.492 0.61579-3.7193 1.8619-7.1575 3.2117-10.71 1.1115-2.9125 2.0793-5.7667 1.8992-8.7029m-54.044 54.045 0.0027 9.1e-4 -9.1e-4 -3e-3c2.9361 0.17919 5.7904-0.7877 8.7038-1.8992 3.5519-1.3498 6.9892-2.5959 10.708-3.2126 4.4797-0.73767 9.9272-0.77132 15.477 1.4462a121.07 121.07 0 0 0-20.683 35.668c-4.658-3.6902-7.3339-8.4018-8.9275-12.633-1.3262-3.5292-1.9656-7.1293-2.5723-10.88-0.49481-3.0789-1.0842-6.0342-2.7078-8.4873m-19.779 73.823c2.6323-1.3125 4.6188-3.5765 6.5872-5.995 2.4004-2.9452 4.7544-5.7431 7.6668-8.1362 3.4937-2.8661 8.1644-5.6066 14.04-6.4744a121.88 121.88 0 0 0-1.7737 20.606zm147.65-147.65v0.0027l0.00182-0.0027c1.3125 2.6332 3.5774 4.6207 5.996 6.589 2.9452 2.4004 5.744 4.7544 8.1371 7.6668 2.8834 3.5155 5.6412 8.2235 6.4908 14.151a121.88 121.88 0 0 0-20.625-1.7564c-7.032 0-13.921 0.60578-20.626 1.7564 0.84954-5.9268 3.6074-10.636 6.4908-14.15 2.394-2.9134 5.1919-5.2674 8.1371-7.6687 2.4186-1.9665 4.6834-3.9549 5.9969-6.5881" fill="#fab60f"/>
          <g fill="#d52736">
            <path d="m152.02 176.68 9.114-0.0264c1.197-7.6978-1.1442-13.625-8.9312-12.21-6.5617 1.1916-13.61 7.7105-17.87 12.21l12.016-0.0527c1.3389-0.88048 3.9594-1.8846 5.0354-1.137 0.40294 0.28015 0.61306 0.67764 0.63489 1.2161"/>
            <path d="m193 176.65h11.37c0.5412-13.427-1.6218-27.293-7.8642-39.289-5.6776-10.915-15.063-18.334-27.213-20.127-17.737-2.6169-35.634 4.8917-50.765 15.634-16.474 11.696-30.073 27.581-41.956 43.783l15.02-0.0218c13.522-19.166 44.623-48.262 67.502-48.452 7.2912-0.06 14.704 1.6509 20.185 6.5408 3.9712 3.5437 8.7856 10.425 8.55 16.01-0.14008 3.3118-3.0789 4.3269-5.8968 3.3009-2.1894-0.79679-3.7356-2.7979-5.2674-4.9017-4.9781-6.8346-12.743-10.179-21.261-9.0139-10.158 1.3889-22.75 9.2768-30.872 16.451-7.0038 6.187-13.434 12.958-19.499 20.088h16.149c5.9186-7.1457 12.168-13.239 20.203-18.243 2.5423-1.5836 5.673-3.2581 8.9639-4.3896 8.3017-2.8534 16.563-2.1311 20.232 8.2053 1.4417 4.064 1.6536 7.6286 1.2334 14.161l-9.1e-4 0.26651h10.98l0.0282-0.33563c8e-3 -3.5774-0.07-5.9878 0.25286-9.5333 0.27743-3.0553 1.227-6.2215 4.0649-6.5981 6.0314-1.2634 5.7422 12.155 5.8604 16.467"/>
            <path d="m216.33 176.65h11.464c0.55484-12.458-0.51301-27.216-4.5434-40.103a71.857 71.857 0 0 0-2.7369-7.3658c-2.4404-5.5694-5.724-10.61-9.6388-15.269-4.3514-5.1755-9.536-9.8289-15.381-13.495a58.213 58.213 0 0 0-5.3592-2.9825v-0.0018a54.575 54.575 0 0 0-5.6776-2.3895l-7e-3 -0.0027c-22.326-7.927-44.906-2.2894-63.847 8.0125a128.25 128.25 0 0 0-10.63 6.489 140.08 140.08 0 0 0-9.6324 7.1593h-9.1e-4l-5e-3 6e-3a130.98 130.98 0 0 0-12.547 11.623 111.88 111.88 0 0 0-2.585 2.8306c-2.253 2.5541-5.7249 6.1351-4.6943 9.8371 0.81589 2.9361 4.6043 2.0711 5.9241 1.0597 2.0256-1.087 4.2505-2.8097 6.1542-4.4206 2.5778-2.1821 5.0127-4.5315 7.565-6.7436 10.324-8.9494 21.084-15.851 31.683-20.522a96.415 96.415 0 0 1 6.9283-2.7433 85.501 85.501 0 0 1 6.8464-2.0938l0.0109-3e-3c19.722-5.1209 41.154-1.8037 54.876 14.28 13.219 15.492 15.632 36.23 15.834 56.839m-142.25-17.514c1.2316-1.1497 2.4868-2.6496 3.7948-4.3105 1.8301-2.3212 2.0138-4.5688 1.2907-6.1915a4.2386 4.2386 0 0 0-1.1497-1.5308 4.0022 4.0022 0 0 0-1.6554-0.8259c-1.4917-0.3411-3.2754 0.19283-4.7898 2.0356-1.7127 2.0829-4.0776 5.6467-4.5606 8.7984a6.549 6.549 0 0 0-0.05367 1.7027c0.05912 0.52392 0.1992 1.0224 0.43478 1.4772l0.0018 5e-3 9.1e-4 -9.1e-4c0.38566 0.7404 1.036 1.1306 1.9038 1.1634q0.27196 9e-3 0.58486-0.0246 0.30562-0.0346 0.65672-0.11734l9.1e-4 2e-3 0.01092-3e-3c1.1679-0.28015 2.3358-1.066 3.5292-2.1794"/>
            <path d="m245 176.65 0.0819-2e-3h0.0409c1.1997 0.0655 3.2818-0.48662 4.4824-2.5123a6.1851 6.1851 0 0 0 0.60033-1.3935 8.3681 8.3681 0 0 0 0.31562-1.8228h9.1e-4l8e-3 -0.14008c0.9114-31.841-8.8411-58.199-25.398-76.107a80.953 80.953 0 0 0-10.402-9.4649 78.588 78.588 0 0 0-11.768-7.4185l-9.1e-4 9.09e-4 -0.0655-0.03274-2e-3 -0.0018c-13.917-7.112-29.7-9.8435-45.192-8.531a89.594 89.594 0 0 0-17.827 3.3491l-0.0409 0.01273c-15.932 4.7125-30.758 14.068-42.84 26.342a110.97 110.97 0 0 0-9.8135 11.418c8.4727-7.3103 17.563-13.723 27.071-18.817a122.79 122.79 0 0 1 6.4553-3.2236 113.7 113.7 0 0 1 6.5663-2.796l0.012-0.0054c8.4-3.2645 16.681-5.3465 24.963-6.277 8.2826-0.9305 16.571-0.70947 24.987 0.62852 5.9896 0.95324 11.836 2.5214 17.103 4.7153q1.5336 0.63852 3.0116 1.3553a51.846 51.846 0 0 1 2.8652 1.5008h2e-3l0.0145 0.0073-9.1e-4 9.09e-4c18.543 10.154 31.425 30.988 37.099 54.512a117.34 117.34 0 0 1 3.2618 28.247v2e-3l-3e-3 0.27378c0.0946 2.5477 0.96779 4.6789 2.464 5.6385 0.27833 0.17828 0.58031 0.31744 0.90139 0.40749h2e-3q0.49117 0.1419 1.0433 0.13462"/>
          </g>
          <path d="m211.85 70.537c44.582 14.725 76.801 56.65 76.989 106.12h-22.059c1.4599-43.21-17.398-82.212-54.93-106.12" fill="#fab60f"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {methods.map((method, i) => (
        <div
          key={method.name}
          className="group relative rounded-2xl border border-amber/10 bg-card/60 p-8 transition-all duration-300 hover:border-amber/20 hover:shadow-lg"
          style={rs(vis, i * 120)}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 right-0 left-0 h-[2px] bg-amber"
            style={{ maskImage: "linear-gradient(90deg, transparent, black, transparent)" }}
          />
          {/* Icon */}
          <div className="mb-5">{method.icon}</div>
          {/* Name */}
          <h3 className="mb-1 text-lg font-bold tracking-tight">{method.name}</h3>
          {/* Headline */}
          <p className="mb-3 text-sm font-medium text-amber">{method.headline}</p>
          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{method.desc}</p>
          {/* Standard badge */}
          <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            {method.standard}
          </span>
        </div>
      ))}
    </div>
  );
}

/** SignPad credit-based pricing section — credit-only, no plan tiers */
function SignPadPricing({
  vis,
  rs,
}: {
  vis: boolean;
  rs: typeof useRevealStyle;
}) {
  const creditPacks = [
    { credits: "5", price: "Free", perCredit: "—", total: "$0", note: "every month", tag: "TRY IT", tagColor: "bg-muted text-muted-foreground" },
    { credits: "50", price: "$0.50", perCredit: "$0.50", total: "$25", note: "one-time", tag: null, tagColor: "" },
    { credits: "200", price: "$0.30", perCredit: "$0.30", total: "$60", note: "one-time", tag: "POPULAR", tagColor: "bg-amber text-white" },
    { credits: "500", price: "$0.25", perCredit: "$0.25", total: "$125", note: "one-time", tag: "BEST VALUE", tagColor: "bg-amber text-white" },
    { credits: "1,000", price: "$0.20", perCredit: "$0.20", total: "$200", note: "one-time", tag: null, tagColor: "" },
    { credits: "2,500+", price: "Custom", perCredit: "Custom", total: "Let's Talk", note: "volume", tag: "ENTERPRISE", tagColor: "bg-foreground text-background" },
  ];

  const included = [
    "All 3 signing methods (e-sign, DSC, Aadhaar OTP)",
    "Drag-and-drop document editor",
    "Sequential & parallel workflows",
    "Reusable templates",
    "SHA-256 audit trail with certificate PDF",
    "Webhooks & REST API v1",
    "Team management with roles",
    "Custom branding (200+ credits)",
  ];

  return (
    <div>
      {/* ── How credits work — hero explainer ── */}
      <div className="mx-auto mb-16 max-w-[740px]" style={rs(vis, 60)}>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber/15 bg-card/80 p-6 sm:p-10">
          {/* Accent bar */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-amber" style={{ maskImage: "linear-gradient(90deg, transparent, black 20%, black 80%, transparent)" }} />

          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
            {/* Big credit coin */}
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-amber/20 bg-amber-muted">
              <svg viewBox="0 0 40 40" fill="none" className="size-10 text-amber">
                <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="20" y="25" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="800" fontFamily="var(--font-mono)">1</text>
              </svg>
            </div>
            <div>
              <h3 className="mb-2 font-display text-2xl font-extrabold tracking-tight">
                One credit. One document. Any number of signers.
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Send a document to one person or five — it costs one credit either way. 
                Credits never expire. Buy a pack now and use them whenever you need to.
                The more you buy upfront, the less each document costs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Credit packs — the main pricing grid ── */}
      <div className="mx-auto max-w-[1080px]" style={rs(vis, 140)}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {creditPacks.map((pack, i) => {
            const isBest = pack.tag === "BEST VALUE";
            const isEnterprise = pack.tag === "ENTERPRISE";
            return (
              <div
                key={i}
                className={`group relative flex flex-col items-center rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isBest
                    ? "border-amber/40 bg-amber-muted shadow-lg ring-1 ring-amber/20"
                    : isEnterprise
                      ? "border-foreground/15 bg-foreground/[0.03]"
                      : "border-border/60 bg-card/70 hover:border-amber/20"
                }`}
              >
                {/* Tag */}
                {pack.tag && (
                  <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-0.5 font-mono text-[9px] font-bold tracking-wider ${pack.tagColor}`}>
                    {pack.tag}
                  </div>
                )}

                {/* Credits count */}
                <div className={`mb-0.5 font-mono text-3xl font-black tracking-tighter ${isBest ? "text-amber" : "text-foreground"}`}>
                  {pack.credits}
                </div>
                <div className="mb-4 text-[11px] font-medium tracking-wide text-muted-foreground">
                  CREDITS
                </div>

                {/* Divider */}
                <div className={`mb-4 h-px w-full ${isBest ? "bg-amber/20" : "bg-border/60"}`} />

                {/* Per-credit price */}
                <div className={`mb-1 font-display text-xl font-extrabold ${isBest ? "text-amber" : isEnterprise ? "text-foreground" : "text-foreground/80"}`}>
                  {pack.price}
                </div>
                <div className="mb-3 text-[10px] text-muted-foreground">
                  {pack.credits === "5" ? "free monthly" : pack.credits === "2,500+" ? "per credit" : "per credit"}
                </div>

                {/* Total */}
                <div className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold ${
                  isBest ? "bg-amber/10 text-amber" : isEnterprise ? "bg-foreground/5 text-foreground/70" : "bg-muted text-muted-foreground"
                }`}>
                  {pack.total}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Visual price-per-credit bar chart ── */}
        <div className="mt-12 rounded-2xl border border-border/40 bg-card/50 p-5 sm:p-8" style={rs(vis, 220)}>
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-lg bg-amber-muted px-3 py-1 font-mono text-xs font-semibold text-amber">
              Volume Discount
            </span>
            <span className="text-xs text-muted-foreground">Price per credit drops as you buy more</span>
          </div>

          <div className="flex items-end gap-3">
            {[
              { label: "50", height: "100%", price: "$0.50" },
              { label: "200", height: "60%", price: "$0.30" },
              { label: "500", height: "50%", price: "$0.25" },
              { label: "1K", height: "40%", price: "$0.20" },
              { label: "2.5K+", height: "28%", price: "Custom" },
            ].map((bar, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-amber">{bar.price}</span>
                <div className="relative w-full overflow-hidden rounded-t-lg bg-muted" style={{ height: 120 }}>
                  <div
                    className="absolute right-0 bottom-0 left-0 rounded-t-lg bg-amber transition-all duration-500"
                    style={{
                      height: bar.height,
                      opacity: i === 0 ? 0.3 : i === 1 ? 0.45 : i === 2 ? 0.6 : i === 3 ? 0.75 : 0.9,
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Everything included — feature list ── */}
      <div className="mx-auto mt-14 max-w-[800px]" style={rs(vis, 300)}>
        <div className="mb-6 text-center">
          <span className="rounded-lg bg-amber-muted px-3 py-1 font-mono text-xs font-semibold text-amber">
            Every Credit Includes
          </span>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {included.map((feature, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-amber/10">
                <svg viewBox="0 0 12 12" fill="none" className="size-3">
                  <path d="M3 6 L5 8 L9 4" stroke="var(--color-amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" style={rs(vis, 380)}>
        <Button
          className="h-auto rounded-xl bg-amber px-10 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_oklch(0.666_0.179_58.318/0.12)] hover:opacity-90"
        >
          Start Free — 5 Credits/Month
          <ArrowRight className="ml-2 size-4" />
        </Button>
        <Button
          variant="outline"
          className="h-auto rounded-xl px-8 py-4 text-[15px] font-semibold text-amber"
        >
          Talk to Sales
        </Button>
      </div>

      {/* ── Trust strip ── */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs text-muted-foreground" style={rs(vis, 440)}>
        {[
          "Credits never expire",
          "1 credit = 1 document, any number of signers",
          "All features included at every level",
          "Volume pricing from 2,500+ credits",
        ].map((t2) => (
          <span key={t2} className="flex items-center gap-1.5">
            <svg viewBox="0 0 12 12" fill="none" className="size-3 text-amber">
              <path d="M3 6 L5 8 L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t2}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const rs = useRevealStyle;
  const heroR = useReveal(0.1);
  const walkthroughR = useReveal(0.08);
  const sigMethodsR = useReveal(0.08);
  const archR = useReveal(0.08);
  const featuresR = useReveal(0.08);
  const useCasesR = useReveal(0.08);
  const benefitsR = useReveal(0.08);
  const pricingR = useReveal(0.08);
  const faqR = useReveal(0.08);
  const ctaR = useReveal(0.08);

  const accent = product.accent;
  const icons = useCaseIcons[slug] ?? [];
  const isSignBolt = slug === "signbolt";
  const isSignBridge = slug === "signbridge";
  const isSignLift = slug === "signlift";
  const isSignPad = slug === "signpad";

  // Find other products for navigation
  const currentIndex = products.findIndex((p) => p.slug === slug);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  return (
    <>
      {/* ══════ PRODUCT HERO ══════ */}
      <section
        ref={heroR.ref}
        className="relative overflow-hidden pt-24 sm:pt-[120px] pb-10 sm:pb-[60px]"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-[20%] -left-[10%] h-[55%] w-[55%] rounded-full ${accentBgMutedMap[accent]} blur-[100px]`}
          />
          <div className="absolute -right-[10%] -bottom-[15%] h-[40%] w-[40%] rounded-full bg-muted/50 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(ellipse 70% 50% at 50% 40%, black, transparent)",
            }}
          />
        </div>

        <div
          className="relative z-[2] mx-auto max-w-[1240px] px-4 sm:px-7"
          style={rs(heroR.vis)}
        >
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              href="/"
              className="text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <span>/</span>
            <span className={accentColorMap[accent]}>{product.name}</span>
          </div>

          {isSignLift ? (
            /* ── SignLift: compact header → full-width canvas → detail strip ── */
            <>
              {/* Row 1: Title + tagline + CTAs */}
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border ${accentBgMutedMap[accent]} ${accentBorderMap[accent]}`}
                  >
                    <ProductIcon d={product.icon} size={28} className={accentColorMap[accent]} />
                  </div>
                  <div>
                    <div className={`text-xs font-medium ${accentColorMap[accent]}`}>
                      {product.id}
                    </div>
                    <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight lg:text-5xl">
                      {product.name}
                    </h1>
                    <p className={`mt-1 text-base font-semibold ${accentColorMap[accent]}`}>
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3.5">
                  <Button
                    className={`h-auto rounded-xl ${accentBgMap[accent]} px-8 py-4 text-[15px] font-semibold text-white ${accentGlowMap[accent]} hover:opacity-90`}
                  >
                    Talk to Us
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto rounded-xl px-8 py-4 text-[15px] font-semibold"
                    render={<Link href="/pricing" />}
                  >
                    View Pricing
                  </Button>
                </div>
              </div>

              {/* Row 2: Full-width canvas — REST API flow diagram */}
              <div className="mt-10" style={rs(heroR.vis, 150)}>
                <SignLiftHeroCanvas className="h-[420px] w-full lg:h-[500px]" />
              </div>

              {/* Row 3: Description + highlights strip */}
              <div className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-cyan/10 bg-card/50 p-5 sm:grid-cols-2 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_auto_auto_auto]" style={rs(heroR.vis, 300)}>
                <p className="max-w-[520px] text-sm leading-relaxed text-muted-foreground">
                  {product.longDesc}
                </p>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    PLATFORM
                  </div>
                  <div className="text-sm font-semibold">{product.platform}</div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    BEST FOR
                  </div>
                  <div className="text-sm font-semibold">{product.bestFor}</div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    KEY NUMBER
                  </div>
                  <div className={`text-sm font-semibold ${accentColorMap[accent]}`}>
                    {product.metric}{" "}
                    <span className="font-normal opacity-80">{product.metricLabel}</span>
                  </div>
                </div>
              </div>
            </>
          ) : isSignBridge ? (
            /* ── SignBridge: compact header → full-width graphic → detail strip ── */
            <>
              {/* Row 1: Title + tagline + CTAs — single compact row */}
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border ${accentBgMutedMap[accent]} ${accentBorderMap[accent]}`}
                  >
                    <ProductIcon d={product.icon} size={28} className={accentColorMap[accent]} />
                  </div>
                  <div>
                    <div className={`text-xs font-medium ${accentColorMap[accent]}`}>
                      {product.id}
                    </div>
                    <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight lg:text-5xl">
                      {product.name}
                    </h1>
                    <p className={`mt-1 text-base font-semibold ${accentColorMap[accent]}`}>
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-wrap gap-3 sm:w-auto sm:gap-3.5">
                  <Button
                    className={`h-auto flex-1 rounded-xl ${accentBgMap[accent]} px-6 py-3 text-sm font-semibold text-white sm:flex-none sm:px-8 sm:py-4 sm:text-[15px] ${accentGlowMap[accent]} hover:opacity-90`}
                  >
                    Download Free
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-1 rounded-xl px-6 py-3 text-sm font-semibold sm:flex-none sm:px-8 sm:py-4 sm:text-[15px]"
                    render={<Link href="/pricing" />}
                  >
                    View Pricing
                  </Button>
                </div>
              </div>

              {/* Row 2: Full-width canvas graphic — the star of the show */}
              <div className="mt-8 sm:mt-10" style={rs(heroR.vis, 150)}>
                <SignBridgeHeroCanvas className="h-[560px] w-full sm:h-[380px] md:h-[420px] lg:h-[480px]" />
              </div>

              {/* Row 3: Description + highlights strip */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-violet/10 bg-card/50 p-4 sm:grid-cols-2 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_auto_auto_auto]" style={rs(heroR.vis, 300)}>
                <p className="max-w-[520px] text-sm leading-relaxed text-muted-foreground">
                  {product.longDesc}
                </p>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    PLATFORM
                  </div>
                  <div className="text-sm font-semibold">{product.platform}</div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    BEST FOR
                  </div>
                  <div className="text-sm font-semibold">{product.bestFor}</div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    KEY NUMBER
                  </div>
                  <div className={`text-sm font-semibold ${accentColorMap[accent]}`}>
                    {product.metric}{" "}
                    <span className="font-normal opacity-80">{product.metricLabel}</span>
                  </div>
                </div>
              </div>
            </>
          ) : isSignPad ? (
            /* ── SignPad: compact header → full-width canvas → detail strip ── */
            <>
              {/* Row 1: Title + tagline + CTAs */}
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border ${accentBgMutedMap[accent]} ${accentBorderMap[accent]}`}
                  >
                    <ProductIcon d={product.icon} size={28} className={accentColorMap[accent]} />
                  </div>
                  <div>
                    <div className={`text-xs font-medium ${accentColorMap[accent]}`}>
                      {product.id}
                    </div>
                    <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight lg:text-5xl">
                      {product.name}
                    </h1>
                    <p className={`mt-1 text-base font-semibold ${accentColorMap[accent]}`}>
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3.5">
                  <Button
                    className={`h-auto rounded-xl ${accentBgMap[accent]} px-8 py-4 text-[15px] font-semibold text-white ${accentGlowMap[accent]} hover:opacity-90`}
                  >
                    Start Free
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto rounded-xl px-8 py-4 text-[15px] font-semibold"
                    render={<Link href="/pricing" />}
                  >
                    View Pricing
                  </Button>
                </div>
              </div>

              {/* Row 2: Full-width canvas — signing flow diagram */}
              <div className="mt-10" style={rs(heroR.vis, 150)}>
                <SignPadHeroCanvas className="h-[640px] w-full sm:h-[420px] lg:h-[500px]" />
              </div>

              {/* Row 3: Description + highlights strip */}
              <div className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-amber/10 bg-card/50 p-5 sm:grid-cols-2 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_auto_auto_auto]" style={rs(heroR.vis, 300)}>
                <p className="max-w-[520px] text-sm leading-relaxed text-muted-foreground">
                  {product.longDesc}
                </p>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    PLATFORM
                  </div>
                  <div className="text-sm font-semibold">{product.platform}</div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    BEST FOR
                  </div>
                  <div className="text-sm font-semibold">{product.bestFor}</div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                    KEY NUMBER
                  </div>
                  <div className={`text-sm font-semibold ${accentColorMap[accent]}`}>
                    {product.metric}{" "}
                    <span className="font-normal opacity-80">{product.metricLabel}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ── All other products: standard side-by-side layout ── */
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
              {/* Left - content */}
              <div className="flex-[1_1_50%]">
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className={`flex size-14 items-center justify-center rounded-2xl border ${accentBgMutedMap[accent]} ${accentBorderMap[accent]}`}
                  >
                    <ProductIcon d={product.icon} size={28} className={accentColorMap[accent]} />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-medium ${accentColorMap[accent]}`}
                    >
                      {product.id}
                    </div>
                    <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight lg:text-5xl">
                      {product.name}
                    </h1>
                  </div>
                </div>

                <p
                  className={`mb-4 text-lg font-semibold ${accentColorMap[accent]}`}
                >
                  {product.tagline}
                </p>

                <p className="mb-6 max-w-[560px] text-base leading-relaxed text-muted-foreground">
                  {product.longDesc}
                </p>

                {/* SignBolt: File format badges */}
                {isSignBolt && (
                  <div className="mb-6">
                    <div className="mb-2 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                      SUPPORTED FORMATS
                    </div>
                    <FileFormatBadges />
                  </div>
                )}

                {/* Product highlights */}
                <div className="mb-6 flex flex-wrap gap-6">
                  <div>
                    <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                      PLATFORM
                    </div>
                    <div className="text-sm font-semibold">{product.platform}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                      BEST FOR
                    </div>
                    <div className="text-sm font-semibold">{product.bestFor}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                      KEY NUMBER
                    </div>
                    <div className={`text-sm font-semibold ${accentColorMap[accent]}`}>
                      {product.metric}{" "}
                      <span className="font-normal opacity-80">{product.metricLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3.5">
                  <Button
                    className={`h-auto rounded-xl ${accentBgMap[accent]} px-8 py-4 text-[15px] font-semibold text-white ${accentGlowMap[accent]} hover:opacity-90`}
                  >
                    {isSignBolt ? "Try Demo" : "Get Started Free"}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto rounded-xl px-8 py-4 text-[15px] font-semibold"
                    render={<Link href="/pricing" />}
                  >
                    View Pricing
                  </Button>
                </div>
              </div>

              {/* Right - hero illustration / canvas */}
              <div className="flex-[1_1_50%]" style={rs(heroR.vis, 200)}>
                {isSignBolt ? (
                  <SignBoltHeroCanvas className="h-[340px] w-full lg:h-[400px]" />
                ) : (
                  productHeroSvgs[slug]
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════ SIGNBOLT: HOW YOU USE IT (visual walkthrough) ══════ */}
      {isSignBolt && (
        <section ref={walkthroughR.ref} className="border-y bg-muted/40 py-12 sm:py-[80px]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
            <div className="mb-14 text-center" style={rs(walkthroughR.vis)}>
              <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
                How You Use It
              </Badge>
              <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                Four Steps to Thousands of Signed Documents
              </h2>
              <p className="mx-auto max-w-[560px] text-muted-foreground">
                No training needed. Drop your files, pick a template, and SignBolt handles the rest — 
                cryptographic signatures, delivery, everything.
              </p>
            </div>
            <SignBoltWalkthrough vis={walkthroughR.vis} rs={rs} />
          </div>
        </section>
      )}

      {/* ══════ SIGNBRIDGE: HOW IT WORKS (visual walkthrough) ══════ */}
      {isSignBridge && (
        <section ref={walkthroughR.ref} className="border-y bg-muted/40 py-12 sm:py-[80px]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
            <div className="mb-14 text-center" style={rs(walkthroughR.vis)}>
              <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
                How It Works
              </Badge>
              <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                Four Steps. No Training Needed.
              </h2>
              <p className="mx-auto max-w-[560px] text-muted-foreground">
                Install SignBridge once, plug in your USB token, and every website that supports it can request
                your digital signature. Your private key never leaves the hardware.
              </p>
            </div>
            <SignBridgeWalkthrough vis={walkthroughR.vis} rs={rs} />

            {/* "What's really happening" technical breakdown for devs */}
            <div className="mt-14 rounded-2xl border border-violet/10 bg-card/60 p-5 sm:p-8" style={rs(walkthroughR.vis, 400)}>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-violet-muted px-3 py-1 font-mono text-xs font-semibold text-violet">
                  For Developers
                </span>
                <span className="text-xs text-muted-foreground">What happens under the hood</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    step: "Browser calls SDK",
                    code: "signBridge.sign({ hash, certId })",
                    detail: "Your JS SDK opens an HTTPS connection to localhost:53000 with an Ed25519 JWT token for authentication.",
                  },
                  {
                    step: "SignBridge signs locally",
                    detail: "SignBridge receives the document hash, sends it to the USB token via Windows CAPI/CNG. The token signs the hash internally -- the private key is never extracted.",
                    code: "CAPI → PKCS#11 → token signs",
                  },
                  {
                    step: "Signed hash returned",
                    detail: "The signed hash (RSA/ECDSA) is sent back through the HTTPS tunnel to your web app. You embed it into the PDF to create a PAdES-compliant signature.",
                    code: "→ PAdES embed → done",
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-violet/8 bg-muted/40 p-5">
                    <div className="mb-2 text-sm font-semibold text-foreground/80">{item.step}</div>
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
                    <code className="inline-block max-w-full break-all rounded bg-violet-muted px-2 py-1 font-mono text-[10px] text-violet">
                      {item.code}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════ SIGNLIFT: INTEGRATION JOURNEY (visual walkthrough) ══════ */}
      {isSignLift && (
        <section ref={walkthroughR.ref} className="border-y bg-muted/40 py-12 sm:py-[80px]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
            <div className="mb-14 text-center" style={rs(walkthroughR.vis)}>
              <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
                Integration Journey
              </Badge>
              <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                Add Signing to Your Workflow in Five Steps
              </h2>
              <p className="mx-auto max-w-[560px] text-muted-foreground">
                From API token to signed PDF — the complete integration path. Most teams 
                are signing documents in production within days.
              </p>
            </div>
            <SignLiftWalkthrough vis={walkthroughR.vis} rs={rs} />

            {/* Developer quick-reference: request/response example */}
            <div className="mt-14 rounded-2xl border border-cyan/10 bg-card/60 p-5 sm:p-8" style={rs(walkthroughR.vis, 500)}>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-cyan-muted px-3 py-1 font-mono text-xs font-semibold text-cyan">
                  Quick Reference
                </span>
                <span className="text-xs text-muted-foreground">Request and response at a glance</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-cyan/8 bg-muted/40 p-5">
                  <div className="mb-2 text-sm font-semibold text-foreground/80">Request</div>
                  <pre className="mb-0 overflow-x-auto rounded-lg bg-muted/80 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
{`POST /v1/sign HTTP/1.1
X-API-Token: <your-jwt>
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data;
  name="pdf"; filename="doc.pdf"
--boundary
Content-Disposition: form-data;
  name="config"

{ "certSource": "s3",
  "certBucket": "my-certs",
  "certKey": "signer.p12" }`}
                  </pre>
                </div>
                <div className="rounded-xl border border-cyan/8 bg-muted/40 p-5">
                  <div className="mb-2 text-sm font-semibold text-foreground/80">Response</div>
                  <pre className="mb-0 overflow-x-auto rounded-lg bg-muted/80 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
{`HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment;
  filename="doc-signed.pdf"

<signed PDF bytes>

// Signature details:
// Standard: PAdES-B-LT
// Algorithm: SHA-256 + RSA
// LTV: embedded
// Tamper-proof: yes`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════ SIGNPAD: HOW IT WORKS (visual walkthrough) ══════ */}
      {isSignPad && (
        <section ref={walkthroughR.ref} className="border-y bg-muted/40 py-12 sm:py-[80px]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
            <div className="mb-14 text-center" style={rs(walkthroughR.vis)}>
              <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
                How It Works
              </Badge>
              <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                From Upload to Signed in Four Steps
              </h2>
              <p className="mx-auto max-w-[560px] text-muted-foreground">
                Upload your document, drag fields where they go, send it to signers, and track everything.
                The whole process takes minutes — not days.
              </p>
            </div>
            <SignPadWalkthrough vis={walkthroughR.vis} rs={rs} />

            {/* Webhook integration teaser for developers */}
            <div className="mt-14 rounded-2xl border border-amber/10 bg-card/60 p-5 sm:p-8" style={rs(walkthroughR.vis, 400)}>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-amber-muted px-3 py-1 font-mono text-xs font-semibold text-amber">
                  For Developers
                </span>
                <span className="text-xs text-muted-foreground">Integrate with your existing systems</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    step: "Webhook Events",
                    code: "document.signed → your-api.com/hook",
                    detail: "Receive real-time HTTP POST notifications when documents are sent, viewed, signed, or completed. Configure per-event URLs from your dashboard.",
                  },
                  {
                    step: "REST API v1",
                    code: "POST /api/v1/documents",
                    detail: "Create documents, add recipients, check status, and download signed PDFs programmatically. Authenticate with API keys generated from your organization settings.",
                  },
                  {
                    step: "Audit Certificate",
                    code: "SHA-256 hash chain → PDF",
                    detail: "Every signed document includes a downloadable audit certificate with timestamped actions, IP addresses, and a SHA-256 hash chain for mathematical tamper detection.",
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-amber/8 bg-muted/40 p-5">
                    <div className="mb-2 text-sm font-semibold text-foreground/80">{item.step}</div>
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
                    <code className="rounded bg-amber-muted px-2 py-1 font-mono text-[10px] text-amber">
                      {item.code}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════ SIGNPAD: SIGNING METHODS EXPLAINED ══════ */}
      {isSignPad && (
        <section ref={sigMethodsR.ref} className="py-16 sm:py-[100px]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
            <div className="mb-14 text-center" style={rs(sigMethodsR.vis)}>
              <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
                Three Ways to Sign
              </Badge>
              <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                Choose the Right Signing Method for Every Signer
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Not everyone has a USB token. Not everyone needs Aadhaar. SignPad lets each signer pick the 
                method that works for them — all on the same document, all in one workflow.
              </p>
            </div>
            <SignPadSigningMethods vis={sigMethodsR.vis} rs={rs} />
          </div>
        </section>
      )}

      {/* ══════ ARCHITECTURE FLOW ══════ */}
      <section ref={archR.ref} className={`border-y bg-muted/60 py-12 ${isSignBolt || isSignBridge || isSignLift || isSignPad ? "border-t-0" : ""}`}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-6 text-center" style={rs(archR.vis)}>
            <Badge variant="outline" className={`mb-2 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
              {isSignBolt ? "Technical Pipeline" : isSignBridge ? "Signing Pipeline" : isSignLift ? "API Pipeline" : isSignPad ? "Document Lifecycle" : "How It Works"}
            </Badge>
            <h2 className="font-display text-xl font-extrabold tracking-tight">
              {isSignBridge ? "From Browser Click to Signed Document" : isSignLift ? "From HTTP Request to Signed PDF" : isSignPad ? "Upload to Audit Trail" : `${product.name} Pipeline`}
            </h2>
            {(isSignBolt || isSignBridge || isSignLift || isSignPad) && (
              <p className="mt-2 text-sm text-muted-foreground">
                {isSignBridge
                  ? "The complete journey of a signing request -- from your web app to the hardware token and back"
                  : isSignLift
                    ? "Your app sends a request, SignLift handles the cryptography, and returns a signed PDF"
                    : isSignPad
                      ? "The complete document journey — from upload to tamper-proof signed artifact"
                      : "Under the hood: what happens when you click Sign"}
              </p>
            )}
          </div>
          <div className="overflow-x-auto" style={rs(archR.vis, 100)}>
            <div className="min-w-[660px]">
              <ProductArchSvg slug={slug} accent={accent} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FEATURES ══════ */}
      <section ref={featuresR.ref} className="py-16 sm:py-[100px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-14 text-center" style={rs(featuresR.vis)}>
            <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
              Features
            </Badge>
            <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isSignBolt ? "Everything You Need to Sign at Scale" : isSignBridge ? "Built for Security. Designed for Simplicity." : isSignLift ? "A Signing Engine You Can Build On" : isSignPad ? "Everything You Need. Nothing You Don't." : `What ${product.name} Can Do`}
            </h2>
            <p className="mx-auto max-w-[520px] text-muted-foreground">
              {isSignBolt
                ? "From importing files to delivering signed documents — SignBolt covers the entire workflow."
                : isSignBridge
                  ? "Enterprise-grade cryptographic signing that your end users will find effortless."
                  : isSignLift
                    ? "Certificates, signing, form fields, and deployment — everything an integration team needs."
                    : isSignPad
                      ? "Document editing, three signing methods, workflow management, audit trails, and API access — built into one platform."
                      : `Everything you need to sign documents with confidence, built right into ${product.name}.`}
            </p>
          </div>

          <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${isSignPad ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {product.features.map((feature, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1"
                style={rs(featuresR.vis, i * 60)}
              >
                {/* Accent line */}
                <div
                  className={`absolute top-0 right-0 left-0 h-[2px] ${accentBgMap[accent]}`}
                  style={{
                    maskImage: "linear-gradient(90deg, transparent, black, transparent)",
                  }}
                />
                <CardContent className="p-0">
                  <div
                    className={`mb-4 flex size-10 items-center justify-center rounded-xl border ${accentBgMutedMap[accent]} ${accentBorderMap[accent]}`}
                  >
                    <FeatureCheckSvg accent={accent} />
                  </div>
                  <h3 className="mb-2 text-base font-semibold">{feature}</h3>
                  <div className={`text-[10px] ${accentColorMap[accent]} opacity-80`}>
                    {product.platform}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      <section ref={useCasesR.ref} className="bg-muted/60 py-16 sm:py-[100px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-14 text-center" style={rs(useCasesR.vis)}>
            <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
              Use Cases
            </Badge>
            <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isSignBolt ? "Real Teams, Real Results" : isSignBridge ? "Who Uses SignBridge?" : isSignLift ? "Where Teams Use SignLift" : isSignPad ? "Built for How Teams Actually Work" : "Built For Your Industry"}
            </h2>
            <p className="mx-auto max-w-[520px] text-muted-foreground">
              {isSignBolt
                ? "See how organizations use SignBolt to replace days of manual signing with a single click."
                : isSignBridge
                  ? "Any organization that needs legally-binding digital signatures on their web platform."
                  : isSignLift
                    ? "Engineering and ops teams integrating signing into SaaS apps, portals, pipelines, and internal workflows."
                    : isSignPad
                      ? "HR, legal, procurement, and operations teams replacing paper with a workflow that tracks itself."
                      : `Real-world scenarios where ${product.name} delivers measurable impact.`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {product.useCases.map((uc, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1"
                style={rs(useCasesR.vis, i * 100)}
              >
                <div
                  className={`absolute top-0 left-0 h-full w-[3px] ${accentBgMap[accent]}`}
                  style={{ maskImage: "linear-gradient(transparent, black 30%, black 70%, transparent)" }}
                />
                <CardContent className="flex items-start gap-5 p-0">
                  <div className={`shrink-0 rounded-xl border p-2 ${accentBgMutedMap[accent]} ${accentBorderMap[accent]}`}>
                    {icons[i] ?? (
                      <UseCaseFallbackSvg accent={accent} />
                    )}
                  </div>
                  <div>
                    <div className={`mb-1 text-[11px] font-semibold ${accentColorMap[accent]}`}>
                      USE CASE {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">
                      {uc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ KEY BENEFITS ══════ */}
      <section ref={benefitsR.ref} className="py-16 sm:py-[100px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-14 text-center" style={rs(benefitsR.vis)}>
            <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
              Key Benefits
            </Badge>
            <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why Choose {product.name}
            </h2>
          </div>

          <div
            className="flex flex-wrap justify-center gap-3"
            style={rs(benefitsR.vis, 100)}
          >
            {product.benefits.map((benefit, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 rounded-xl border px-5 py-3 ${accentBorderMap[accent]} ${accentBgMutedMap[accent]}`}
              >
                <IntegrationDotSvg accent={accent} />
                <span className="text-sm font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING ══════ */}
      <section ref={pricingR.ref} className="relative overflow-hidden bg-muted/60 py-16 sm:py-[100px]">
        {/* Subtle radial glow behind pricing for depth */}
        {(isSignBolt || isSignBridge || isSignLift || isSignPad) && (
          <div className="pointer-events-none absolute inset-0">
            <div className={`absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full ${isSignBridge ? "bg-violet-muted" : isSignLift ? "bg-cyan-muted" : isSignPad ? "bg-amber-muted" : "bg-brand-muted"} blur-[160px]`} />
          </div>
        )}

        <div className="relative z-[1] mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-14 text-center" style={rs(pricingR.vis)}>
            <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
              Pricing
            </Badge>
            <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              {product.name} Pricing
            </h2>
            <p className="mx-auto max-w-[480px] text-muted-foreground">
              {isSignBolt
                ? "One license per user, billed annually. Try the full app in demo mode first — no credit card needed."
                : isSignBridge
                  ? "Start with the free tier for development and testing. Upgrade when you go to production."
                  : isSignLift
                    ? "Every integration is different. We work with you to build a plan that fits your volume, deployment, and support needs."
                    : isSignPad
                      ? "Pay per document, not per user. Buy credits in bulk for lower per-document costs. High volume? Let's talk."
                      : "Start free. Scale as you grow. No hidden fees."}
            </p>
          </div>

          {isSignBolt ? (
            /* ══ SignBolt: asymmetric hero layout ══ */
            <div style={rs(pricingR.vis, 120)}>

              {/* ── Main pricing row: License (hero) + Demo (secondary) ── */}
              <div className="mx-auto grid max-w-[820px] grid-cols-1 items-stretch gap-6 lg:grid-cols-5">

                {/* License card — takes 3/5 columns, the hero */}
                <Card className="relative col-span-1 flex flex-col overflow-hidden rounded-3xl border-2 border-brand/25 p-0 shadow-xl lg:col-span-3">
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-brand" />

                  <div className="flex flex-1 flex-col p-5 sm:p-9">
                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <span className="mb-1 block text-xs font-semibold tracking-widest text-brand">
                          SIGNBOLT LICENSE
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-[52px] font-black leading-none tracking-tight">
                            $149
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground">/user</span>
                            <span className="text-sm font-medium text-muted-foreground">/year</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-muted">
                        <ProductIcon d={product.icon} size={24} className="text-brand" />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mb-6 h-px w-full bg-border" />

                    {/* Features in 2-column layout */}
                    <div className="mb-8 grid flex-1 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                      {product.pricing[1]?.features.map((f, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-2.5"
                        >
                          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                            <svg viewBox="0 0 12 12" fill="none" className="size-3">
                              <path d="M3 6 L5 8 L9 4" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-[13px] font-medium text-foreground/80">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      className={`h-auto w-full rounded-xl bg-brand px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_var(--color-brand-glow)] hover:opacity-90`}
                    >
                      Buy Now
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </Card>

                {/* Demo card — takes 2/5 columns, minimal/secondary */}
                <Card className="relative col-span-1 flex flex-col overflow-hidden rounded-3xl border border-dashed border-border/60 bg-card/60 p-0 backdrop-blur-sm lg:col-span-2">
                  <div className="flex flex-1 flex-col p-8">
                    {/* Header */}
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                        DEMO MODE
                      </span>
                      <span className="rounded-md border border-dashed border-muted-foreground/30 px-1.5 py-0.5 font-mono text-[9px] font-medium text-muted-foreground">
                        WATERMARK
                      </span>
                    </div>

                    <div className="mb-5 flex items-baseline gap-1">
                      <span className="font-display text-[42px] font-black leading-none tracking-tight text-muted-foreground/70">
                        $0
                      </span>
                    </div>

                    <p className="mb-6 text-[13px] leading-relaxed text-muted-foreground/70">
                      Full access to every feature. Signed documents include a demo watermark. No credit card, no time limit.
                    </p>

                    {/* Divider */}
                    <div className="mb-5 h-px w-full bg-border/50" />

                    {/* Features */}
                    <ul className="mb-8 flex-1 list-none space-y-3">
                      {product.pricing[0]?.features.map((f, fi) => (
                        <li
                          key={fi}
                          className="flex items-center gap-2.5 text-[13px] text-muted-foreground/70"
                        >
                          <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-muted">
                            <svg viewBox="0 0 12 12" fill="none" className="size-2.5">
                              <path d="M3 6 L5 8 L9 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-dashed py-3 text-sm font-semibold text-muted-foreground hover:border-brand/30 hover:text-brand"
                    >
                      Try Demo
                    </Button>
                  </div>
                </Card>
              </div>

              {/* ── Add-ons strip ── */}
              <div className="mt-14">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border/60" />
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                    OPTIONAL ADD-ONS
                  </span>
                  <div className="h-px flex-1 bg-border/60" />
                </div>

                <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-3">
                  {signboltAddons.map((addon, i) => (
                    <div
                      key={i}
                      className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-md"
                      style={rs(pricingR.vis, 200 + i * 80)}
                    >
                      {/* Price tag — top right corner */}
                      <div className="absolute top-5 right-5">
                        <span className="rounded-lg bg-brand-muted px-2.5 py-1 font-mono text-xs font-bold text-brand">
                          {addon.price}
                          <span className="ml-0.5 font-sans text-[9px] font-normal text-brand/60">
                            {addon.period}
                          </span>
                        </span>
                      </div>

                      {/* Name */}
                      <h4 className="mb-2 pr-20 text-[15px] font-bold tracking-tight">
                        {addon.name}
                      </h4>

                      {/* Description */}
                      <p className="text-[12px] leading-relaxed text-muted-foreground">
                        {addon.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : isSignBridge ? (
            /* ══ SignBridge: single custom pricing — we decide per customer ══ */
            <div style={rs(pricingR.vis, 120)}>
              <Card className="relative mx-auto max-w-[780px] overflow-hidden rounded-3xl border-2 border-violet/20 p-0 shadow-xl">
                {/* Accent bar */}
                <div className="h-1.5 w-full bg-violet" />

                <div className="p-6 sm:p-10 lg:p-12">
                  {/* Header */}
                  <div className="mb-8 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-violet-muted">
                      <ProductIcon d={product.icon} size={28} className="text-violet" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-display text-2xl font-extrabold tracking-tight">
                        Custom Pricing for Every Team
                      </h3>
                      <p className="max-w-[480px] text-sm leading-relaxed text-muted-foreground">
                        Every organization is different. We work with you to build a plan that fits your team size, signing volume, and integration needs. No fixed tiers -- just the right price.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 h-px w-full bg-border" />

                  {/* Everything included — 3 columns */}
                  <div className="mb-3 text-xs font-semibold tracking-widest text-violet">
                    EVERYTHING INCLUDED
                  </div>
                  <div className="mb-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                    {product.pricing[0]?.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2.5">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-violet/10">
                          <svg viewBox="0 0 12 12" fill="none" className="size-3">
                            <path d="M3 6 L5 8 L9 4" stroke="var(--color-violet)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[13px] font-medium text-foreground/80">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <Button
                      className="h-auto w-full rounded-xl bg-violet px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_oklch(0.541_0.281_293.009/0.12)] hover:opacity-90 sm:w-auto sm:px-10 sm:py-4 sm:text-[15px]"
                    >
                      Talk to Us
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      We&apos;ll get back to you within 24 hours
                    </span>
                  </div>
                </div>
              </Card>

              {/* Trust strip */}
              <div className="mx-auto mt-8 flex max-w-[600px] flex-col items-center justify-center gap-3 text-center text-xs text-muted-foreground sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3" style={rs(pricingR.vis, 250)}>
                {[
                  "No fixed tiers",
                  "Tailored to your scale",
                  "Private key never leaves your token",
                ].map((t2) => (
                  <span key={t2} className="flex items-center gap-1.5">
                    <svg viewBox="0 0 12 12" fill="none" className="size-3 shrink-0 text-violet">
                      <path d="M3 6 L5 8 L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t2}
                  </span>
                ))}
              </div>
            </div>

          ) : isSignLift ? (
            /* ══ SignLift: single custom pricing card ══ */
            <div style={rs(pricingR.vis, 120)}>
              <Card className="relative mx-auto max-w-[780px] overflow-hidden rounded-3xl border-2 border-cyan/20 p-0 shadow-xl">
                {/* Accent bar */}
                <div className="h-1.5 w-full bg-cyan" />

                <div className="p-6 sm:p-10 lg:p-12">
                  {/* Header */}
                  <div className="mb-8 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-muted">
                      <ProductIcon d={product.icon} size={28} className="text-cyan" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-display text-2xl font-extrabold tracking-tight">
                        Custom Pricing for Every Integration
                      </h3>
                      <p className="max-w-[480px] text-sm leading-relaxed text-muted-foreground">
                        Every integration is different. We work with you to build a plan that matches your 
                        API volume, deployment model, and support requirements. No fixed tiers — just the right fit.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 h-px w-full bg-border" />

                  {/* Everything included — 3 columns */}
                  <div className="mb-3 text-xs font-semibold tracking-widest text-cyan">
                    EVERYTHING INCLUDED
                  </div>
                  <div className="mb-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                    {product.pricing[0]?.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-2.5">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan/10">
                          <svg viewBox="0 0 12 12" fill="none" className="size-3">
                            <path d="M3 6 L5 8 L9 4" stroke="var(--color-cyan)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[13px] font-medium text-foreground/80">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <Button
                      className={`h-auto rounded-xl bg-cyan px-10 py-4 text-[15px] font-semibold text-white ${accentGlowMap[accent]} hover:opacity-90`}
                    >
                      Talk to Us
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      We&apos;ll get back to you within 24 hours
                    </span>
                  </div>
                </div>
              </Card>

              {/* Trust strip */}
              <div className="mx-auto mt-10 flex max-w-[600px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs text-muted-foreground" style={rs(pricingR.vis, 250)}>
                {[
                  "No fixed tiers",
                  "Self-hosted — your infrastructure",
                  "PAdES + LTV signatures",
                ].map((t2) => (
                  <span key={t2} className="flex items-center gap-1.5">
                    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-cyan">
                      <path d="M3 6 L5 8 L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t2}
                  </span>
                ))}
              </div>
            </div>

          ) : isSignPad ? (
            /* ══ SignPad: credit-based pricing ══ */
            <SignPadPricing vis={pricingR.vis} rs={rs} />

          ) : (
            /* ══ Other products: standard tier grid ══ */
            <>
              <div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                style={rs(pricingR.vis, 120)}
              >
                {product.pricing.map((plan, i) => (
                  <Card
                    key={i}
                    className={`relative flex flex-col overflow-hidden rounded-2xl p-7 shadow-md transition-all duration-300 hover:-translate-y-1 ${
                      plan.popular ? `${accentBorderMap[accent]} border shadow-lg` : ""
                    }`}
                  >
                    {plan.popular && (
                      <div
                        className={`absolute top-0 right-0 left-0 h-[3px] ${accentBgMap[accent]}`}
                      />
                    )}
                    <CardHeader className="p-0">
                      <CardDescription
                        className={`text-sm font-semibold ${accentColorMap[accent]}`}
                      >
                        {plan.tier}
                      </CardDescription>
                      <CardTitle className="mt-2">
                        <span className="font-display text-[34px] font-extrabold">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-sm text-muted-foreground">
                            {plan.period}
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 pt-4">
                      <ul className="list-none space-y-2.5">
                        {plan.features.map((f, fi) => (
                          <li
                            key={fi}
                            className="flex items-center gap-2 text-[13px] text-muted-foreground"
                          >
                            <PricingCheckSvg accent={accent} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="border-0 p-0 pt-6">
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        className={`w-full rounded-lg text-sm font-semibold ${
                          plan.popular
                            ? `${accentBgMap[accent]} text-white hover:opacity-90`
                            : `${accentColorMap[accent]}`
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}

          <div className="mt-10 text-center">
            <Button
              variant="ghost"
              className={`${accentColorMap[accent]}`}
              render={<Link href="/pricing" />}
            >
              Compare all product pricing
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section ref={faqR.ref} className="py-16 sm:py-[100px]">
        <div className="mx-auto max-w-[800px] px-4 sm:px-7">
          <div className="mb-14 text-center" style={rs(faqR.vis)}>
            <Badge variant="outline" className={`mb-4 rounded-full ${accentBorderMap[accent]} ${accentBgMutedMap[accent]} px-3 py-1 text-xs ${accentColorMap[accent]}`}>
              FAQ
            </Badge>
            <h2 className="mb-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isSignBolt ? "Questions About SignBolt" : isSignBridge ? "Questions About SignBridge" : isSignLift ? "Questions About SignLift" : isSignPad ? "Questions About SignPad" : "Common Questions"}
            </h2>
            {(isSignBolt || isSignBridge || isSignLift || isSignPad) && (
              <p className="text-muted-foreground">
                {isSignBridge
                  ? "Everything you need to know about connecting your USB token to websites."
                  : isSignLift
                    ? "Certificates, deployment, speed, and everything else about integrating the SignLift API."
                    : isSignPad
                      ? "Signing methods, credits, workflows, audit trails, and everything else about the platform."
                      : "Everything you need to know about batch signing, templates, and certificates."}
              </p>
            )}
          </div>

          <div style={rs(faqR.vis, 100)}>
            <Accordion>
              {product.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-[15px] font-semibold">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ══════ PRODUCT NAVIGATION ══════ */}
      <section ref={ctaR.ref} className="bg-muted/60 py-12 sm:py-[80px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <Separator className="mb-12" />
          <div
            className="flex items-center justify-between"
            style={rs(ctaR.vis)}
          >
            {prevProduct ? (
              <Link
                href={`/products/${prevProduct.slug}`}
                className="group flex items-center gap-3 text-foreground no-underline"
              >
                <ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-semibold">{prevProduct.name}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Button
              variant="outline"
              className="rounded-xl"
              render={<Link href="/pricing" />}
            >
              View All Pricing
            </Button>

            {nextProduct ? (
              <Link
                href={`/products/${nextProduct.slug}`}
                className="group flex items-center gap-3 text-right text-foreground no-underline"
              >
                <div>
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-semibold">{nextProduct.name}</div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
