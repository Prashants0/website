"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Shield,
  Globe,
  FileSignature,
  Lock,
  Workflow,
  Layers,
  BarChart3,
  Fingerprint,
  Cloud,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { AnimCounter } from "@/components/landing/anim-counter";
import {
  accentBgMutedMap,
  accentBorderMap,
  accentColorMap,
} from "@/components/landing/accent-utils";
import {
  products,
  testimonials,
} from "@/components/landing/data";
import { useReveal, useRevealStyle } from "@/components/landing/hooks";
import { ProductIcon } from "@/components/landing/svg";
import { SignPadHeroSvg } from "@/components/landing/svg/product-hero-svgs";

/* ═══════════════════════════════════════════════════════════
   /1 — ALL PRODUCTS, MOONLIGHT-FOCUSED SHOWCASE
   Design inspired by: DocuSign (trust + stats), PandaDoc (tabs),
   SignNow (comparison), Dropbox Sign (clean hero), BoldSign (pricing)
   ═══════════════════════════════════════════════════════════ */

const moonlight = products.find((p) => p.slug === "signpad")!;
const otherProducts = products.filter((p) => p.slug !== "signpad");

/* ── Signature methods data ── */
const sigMethods = [
  {
    title: "Electronic Signature",
    desc: "Draw, type, or upload your signature. Works on any device, any browser. No plugins, no downloads.",
    icon: <FileSignature className="size-7" />,
    details: ["Draw with mouse or touch", "Type your name", "Upload signature image", "Mobile-first responsive"],
  },
  {
    title: "DSC USB Token",
    desc: "Sign with government-issued Digital Signature Certificates via hardware USB tokens. Zero key exposure through SignBridge.",
    icon: <Lock className="size-7" />,
    details: ["Hardware-bound private keys", "SignBridge localhost bridge", "Ed25519 JWT authenticated", "Supports ePass & WatchData"],
  },
  {
    title: "Aadhaar OTP eSign",
    desc: "Legally binding signatures under the Indian IT Act via Aadhaar-based OTP authentication. Recognized by courts.",
    icon: <Fingerprint className="size-7" />,
    details: ["IT Act 2000 compliant", "OTP via registered mobile", "Licensed ASP gateway", "Indian Evidence Act valid"],
  },
];

/* ── Workflow steps ── */
const workflowSteps = [
  { num: "01", title: "Upload PDF", desc: "Drag and drop your document or pull from cloud storage.", icon: <Cloud className="size-5" /> },
  { num: "02", title: "Design Form", desc: "Add signature fields, text inputs, dates with the visual builder.", icon: <Layers className="size-5" /> },
  { num: "03", title: "Define Workflow", desc: "Set sequential or parallel signing order for all parties.", icon: <Workflow className="size-5" /> },
  { num: "04", title: "Send & Track", desc: "Recipients sign via their preferred method. Track in real-time.", icon: <BarChart3 className="size-5" /> },
];

/* ── Trust & compliance ── */
const complianceBadges = [
  { label: "IT Act 2000", desc: "Indian Electronic Signature" },
  { label: "X.509 v3", desc: "Certificate Standard" },
  { label: "PAdES B-LT", desc: "PDF Advanced Signatures" },
  { label: "SHA-256", desc: "Cryptographic Hash" },
  { label: "AES-256", desc: "Encryption Standard" },
  { label: "SOC 2", desc: "Security Compliance" },
  { label: "GDPR", desc: "Data Protection" },
  { label: "eIDAS", desc: "EU Regulation" },
];

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const { ref, vis } = useReveal(0.05);
  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Ambient background glow — animated pulse */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-brand/5 blur-[120px] animate-glow-pulse" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[400px] rounded-full bg-brand/4 blur-[100px] animate-glow-pulse [animation-delay:1.5s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-[112px] pb-[60px] sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Copy */}
          <div style={useRevealStyle(vis, 0)}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-muted px-4 py-1.5">
              <span className="inline-block size-2 rounded-full bg-brand animate-pulse-dot" />
              <span className="font-mono text-xs font-medium tracking-wide text-brand">
                THE COMPLETE PLATFORM
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              One platform.{" "}
              <span className="text-brand">Three signing</span>{" "}
              methods.{" "}
              <span className="text-muted-foreground">Zero compromise.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              SignPad unifies electronic, DSC USB token, and Aadhaar OTP signatures
              into a single workflow platform. Upload. Design. Send. Track. Done.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="h-12 rounded-lg bg-brand px-8 text-sm font-semibold text-brand-foreground hover:bg-brand/90">
                Start Free Trial
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-lg border-border/60 px-8 text-sm font-semibold hover:border-brand/40"
              >
                Watch Demo
              </Button>
            </div>

            {/* Mini stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: 3, suffix: "", label: "Signature Methods" },
                { value: 99.99, suffix: "%", label: "Uptime SLA" },
                { value: 500, suffix: "+", label: "Docs/Month (Pro)" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-2xl font-bold text-foreground">
                    <AnimCounter to={s.value} />
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Moonlight Hero SVG */}
          <div style={useRevealStyle(vis, 200)} className="relative">
            <div className="rounded-2xl border border-brand/15 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand/30 hover:shadow-[0_16px_60px_var(--color-brand-glow)]">
              <SignPadHeroSvg className="w-full" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-brand/20 bg-card px-4 py-3 shadow-lg animate-float-badge">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-brand-muted">
                  <Shield className="size-4 text-brand" />
                </div>
                <div>
                  <div className="text-xs font-semibold">SHA-256 Verified</div>
                  <div className="text-[10px] text-muted-foreground">Every action logged</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center animate-[scroll-hint_2.5s_ease-in-out_infinite] sm:mt-[48px]">
            <ChevronDown className="mx-auto size-4 text-muted-foreground/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST MARQUEE (DocuSign-inspired)
   ═══════════════════════════════════════════════════════════ */
function TrustMarquee() {
  const { ref, vis } = useReveal();
  const keywords = [
    "ELECTRONIC SIGNATURES", "DSC USB TOKENS", "AADHAAR OTP", "SHA-256 AUDIT",
    "MULTI-TENANT", "WORKFLOW ENGINE", "DRAG & DROP BUILDER", "WEBHOOK API",
    "SEQUENTIAL SIGNING", "PARALLEL SIGNING", "REAL-TIME TRACKING", "CUSTOM BRANDING",
  ];
  return (
    <section ref={ref} style={useRevealStyle(vis)} className="relative overflow-hidden border-y border-border/50 bg-muted/30 py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...keywords, ...keywords].map((item, i) => (
          <span key={i} className="mx-6 font-mono text-xs font-medium tracking-widest text-muted-foreground/60">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ALL PRODUCTS GRID — Moonlight Featured
   (DocuSign-style product bento + BoldSign simplicity)
   ═══════════════════════════════════════════════════════════ */
function ProductsGrid() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center" style={useRevealStyle(vis)}>
        <Badge variant="outline" className="mb-4 border-border/60 font-mono text-xs">
          04 PRODUCTS
        </Badge>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
          The complete document signing{" "}
          <span className="text-brand">ecosystem</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          From desktop batch processing to cloud APIs to full SaaS workflows.
          Pick what fits your architecture -- or use them all together.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-12">
        {/* Moonlight — Featured, spans 7 columns */}
        <div
          style={useRevealStyle(vis, 100)}
          className="group relative col-span-full lg:col-span-7 rounded-2xl border-2 border-brand/25 bg-gradient-to-br from-brand-muted/50 to-transparent p-8 hover-lift hover-glow-brand hover:border-brand/40"
        >
          <div className="absolute right-6 top-6">
            <Badge className="bg-brand text-brand-foreground font-mono text-[10px] font-bold px-2.5 py-0.5">
              FEATURED
            </Badge>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-muted border border-brand/20">
                    <ProductIcon d={moonlight.icon} className="size-6 text-brand" />
            </div>
            <div>
              <div className="font-mono text-xs text-brand mb-1">{moonlight.id}</div>
              <h3 className="text-2xl font-bold">{moonlight.name}</h3>
              <div className="text-sm text-brand font-medium">{moonlight.tagline}</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xl">
            {moonlight.desc}
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {moonlight.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <Check className="size-3.5 shrink-0 text-brand" />
                <span className="text-muted-foreground">{f}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-brand/20 text-brand font-mono text-[10px]">
              {moonlight.platform}
            </Badge>
            <Badge variant="outline" className="border-brand/20 text-brand font-mono text-[10px]">
              {moonlight.bestFor}
            </Badge>
            <Badge variant="outline" className="border-brand/20 text-brand font-mono text-[10px]">
              {moonlight.metric} {moonlight.metricLabel}
            </Badge>
          </div>
          <div className="mt-6">
            <Link href="/products/signpad">
              <Button className="h-10 bg-brand text-brand-foreground hover:bg-brand/90 hover:scale-[1.03] active:scale-[0.98] rounded-lg px-6 text-sm font-semibold transition-transform duration-200">
                Explore SignPad
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Other 3 products — stacked in 5 columns */}
        <div className="col-span-full lg:col-span-5 flex flex-col gap-4">
          {otherProducts.map((p, i) => (
            <Link key={p.slug} href={`/products/${p.slug}`}>
              <div
                style={useRevealStyle(vis, 200 + i * 100)}
                className={`group rounded-xl border ${accentBorderMap[p.accent]} bg-card/50 p-5 hover-lift hover:border-opacity-60 hover:bg-card/80`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${accentBgMutedMap[p.accent]}`}>
                    <ProductIcon d={p.icon} className={`size-4 ${accentColorMap[p.accent]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10px] ${accentColorMap[p.accent]}`}>{p.id}</span>
                      <h4 className="font-bold text-sm">{p.name}</h4>
                    </div>
                    <div className={`text-xs font-medium ${accentColorMap[p.accent]}`}>{p.tagline}</div>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{p.desc}</p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground/40 group-hover:text-foreground transition-colors shrink-0 mt-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   THREE SIGNATURE METHODS — Moonlight's USP
   (PandaDoc tabbed feature showcase pattern)
   ═══════════════════════════════════════════════════════════ */
function SignatureMethodsSection() {
  const { ref, vis } = useReveal();
  const [activeMethod, setActiveMethod] = useState(0);

  return (
    <section ref={ref} className="relative overflow-hidden bg-muted/20 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-brand/4 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" style={useRevealStyle(vis)}>
          <Badge variant="outline" className="mb-4 border-brand/20 text-brand font-mono text-xs">
            3 SIGNING METHODS
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Every signing method.{" "}
            <span className="text-brand">One platform.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether your signers prefer drawing a signature, plugging in a USB token,
            or authenticating via Aadhaar OTP -- SignPad handles it all.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Method selector tabs */}
          <div className="lg:col-span-2 flex flex-col gap-3" style={useRevealStyle(vis, 100)}>
            {sigMethods.map((m, i) => (
              <button
                key={m.title}
                onClick={() => setActiveMethod(i)}
                className={`group flex items-start gap-4 rounded-xl border p-5 text-left transition-all ${
                  activeMethod === i
                    ? "border-brand/30 bg-brand-muted/50 shadow-sm"
                    : "border-border/50 bg-card/30 hover:border-border hover:bg-card/60"
                }`}
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    activeMethod === i ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {m.icon}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeMethod === i ? "text-foreground" : "text-muted-foreground"}`}>
                    {m.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Active method details */}
          <div className="lg:col-span-3" style={useRevealStyle(vis, 200)}>
            <div key={activeMethod} className="tab-content-enter rounded-2xl border border-brand/15 bg-card/60 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-brand text-brand-foreground transition-transform duration-300 hover:rotate-6">
                  {sigMethods[activeMethod].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{sigMethods[activeMethod].title}</h3>
                  <p className="text-sm text-muted-foreground">{sigMethods[activeMethod].desc}</p>
                </div>
              </div>

              <Separator className="my-6 bg-border/50" />

              <div className="grid gap-4 sm:grid-cols-2">
                {sigMethods[activeMethod].details.map((detail, di) => (
                  <div
                    key={detail}
                    className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 px-4 py-3 hover-lift"
                    style={{ animationDelay: `${di * 60}ms` }}
                  >
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-muted">
                      <Check className="size-3 text-brand" />
                    </div>
                    <span className="text-sm">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Visual indicator */}
              <div className="mt-8 rounded-xl border border-brand/10 bg-brand-muted/30 p-6 transition-colors duration-300">
                <div className="flex items-center gap-3 text-brand">
                  <Shield className="size-5 transition-transform duration-300 hover:scale-110" />
                  <span className="font-mono text-xs font-semibold tracking-wide">
                    {activeMethod === 0
                      ? "ESIGN ACT & UETA COMPLIANT"
                      : activeMethod === 1
                        ? "IT ACT SECTION 3A COMPLIANT"
                        : "AADHAAR eSIGN - LEGALLY BINDING"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   WORKFLOW SECTION — How Moonlight Works
   (Dropbox Sign step-by-step pattern)
   ═══════════════════════════════════════════════════════════ */
function WorkflowSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center" style={useRevealStyle(vis)}>
        <Badge variant="outline" className="mb-4 border-border/60 font-mono text-xs">
          HOW IT WORKS
        </Badge>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          From PDF to signed in{" "}
           <span className="text-brand">four steps</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          No downloads. No plugins. Upload a PDF, design your form, set the signing order, and send.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {workflowSteps.map((step, i) => (
          <div
            key={step.num}
            style={useRevealStyle(vis, 100 + i * 100)}
            className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 hover-lift hover:border-brand/25 hover:bg-card/80"
          >
            {/* Step connector line — animated dash */}
            {i < 3 && (
              <div className="hidden lg:block absolute right-0 top-1/2 w-6 -translate-y-1/2 translate-x-full">
                <div className="h-px bg-gradient-to-r from-border via-brand/30 to-border" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 size-1.5 rounded-full bg-brand/40 animate-pulse-dot" />
              </div>
            )}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-muted text-brand border border-brand/15 transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                {step.icon}
              </div>
              <span className="font-mono text-lg font-bold text-brand/50">{step.num}</span>
            </div>
            <h4 className="text-lg font-bold">{step.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPETITOR COMPARISON TABLE
   Moonlight vs real competitors — brand color as complement
   (SignNow competitive comparison pattern)
   ═══════════════════════════════════════════════════════════ */

const competitors = [
  { key: "moonlight" as const, name: "SignPad", isSelf: true },
  { key: "docusign" as const, name: "DocuSign", isSelf: false },
  { key: "pandadoc" as const, name: "PandaDoc", isSelf: false },
  { key: "signnow" as const, name: "SignNow", isSelf: false },
  { key: "dropboxsign" as const, name: "Dropbox Sign", isSelf: false },
  { key: "boldsign" as const, name: "BoldSign", isSelf: false },
];

type CompKey = "moonlight" | "docusign" | "pandadoc" | "signnow" | "dropboxsign" | "boldsign";

const competitorComparison: { feature: string; values: Record<CompKey, boolean | string> }[] = [
  {
    feature: "Electronic Signatures",
    values: { moonlight: true, docusign: true, pandadoc: true, signnow: true, dropboxsign: true, boldsign: true },
  },
  {
    feature: "DSC USB Token Signing",
    values: { moonlight: true, docusign: false, pandadoc: false, signnow: false, dropboxsign: false, boldsign: false },
  },
  {
    feature: "Aadhaar OTP eSign",
    values: { moonlight: true, docusign: false, pandadoc: false, signnow: false, dropboxsign: false, boldsign: false },
  },
  {
    feature: "Drag & Drop Form Builder",
    values: { moonlight: true, docusign: true, pandadoc: true, signnow: "Limited", dropboxsign: "Limited", boldsign: true },
  },
  {
    feature: "Sequential + Parallel Workflows",
    values: { moonlight: true, docusign: true, pandadoc: true, signnow: true, dropboxsign: "Sequential only", boldsign: "Sequential only" },
  },
  {
    feature: "Multi-Tenant Org Management",
    values: { moonlight: true, docusign: "Enterprise only", pandadoc: "Enterprise only", signnow: false, dropboxsign: false, boldsign: false },
  },
  {
    feature: "SHA-256 Audit Trail",
    values: { moonlight: true, docusign: true, pandadoc: true, signnow: true, dropboxsign: true, boldsign: true },
  },
  {
    feature: "Webhook API",
    values: { moonlight: true, docusign: true, pandadoc: true, signnow: true, dropboxsign: true, boldsign: true },
  },
  {
    feature: "Custom Branding / White-Label",
    values: { moonlight: "Pro+", docusign: "Enterprise", pandadoc: "Business+", signnow: "Enterprise", dropboxsign: "API only", boldsign: "Business+" },
  },
  {
    feature: "Indian IT Act Compliance",
    values: { moonlight: true, docusign: false, pandadoc: false, signnow: false, dropboxsign: false, boldsign: false },
  },
  {
    feature: "Free Tier",
    values: { moonlight: "5 docs/mo", docusign: "3 sends", pandadoc: "eSign only", signnow: "7-day trial", dropboxsign: "30-day trial", boldsign: "30-day trial" },
  },
  {
    feature: "Starting Price",
    values: { moonlight: "$19/mo", docusign: "$10/mo", pandadoc: "$35/mo", signnow: "$8/mo", dropboxsign: "$15/mo", boldsign: "$15/mo" },
  },
];

function ComparisonSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" style={useRevealStyle(vis)}>
          <Badge variant="outline" className="mb-4 border-brand/20 text-brand font-mono text-xs">
            VS COMPETITORS
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            See how SignPad{" "}
            <span className="text-brand">stacks up</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            The only platform that combines electronic, DSC, and Aadhaar OTP signing
            with enterprise workflow management.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-xl border border-border/50" style={useRevealStyle(vis, 100)}>
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="py-4 pl-5 text-left font-mono text-[11px] text-muted-foreground tracking-widest uppercase">
                  Feature
                </th>
                {competitors.map((c) => (
                  <th
                    key={c.key}
                    className={`py-4 px-3 text-center font-mono text-[11px] tracking-wide ${
                      c.isSelf
                        ? "text-brand font-bold bg-brand-muted/40"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                       {c.isSelf && (
                        <span className="inline-block rounded-full bg-brand px-2.5 py-0.5 text-[9px] font-bold text-brand-foreground tracking-wider animate-pulse-dot">
                          OURS
                        </span>
                      )}
                      <span>{c.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitorComparison.map((row) => (
                <tr key={row.feature} className="comparison-row border-b border-border/20">
                  <td className="py-3.5 pl-5 text-sm font-medium">{row.feature}</td>
                  {competitors.map((c) => {
                    const val = row.values[c.key];
                    const isSelf = !!c.isSelf;
                    return (
                      <td
                        key={c.key}
                        className={`py-3.5 px-3 text-center text-sm ${
                          isSelf ? "bg-brand-muted/20" : ""
                        }`}
                      >
                        {val === true ? (
                          <div className="flex justify-center">
                            <div className={`flex size-5 items-center justify-center rounded-full ${isSelf ? "bg-brand/15" : "bg-success-muted"}`}>
                              <Check className={`size-3 ${isSelf ? "text-brand" : "text-success"}`} />
                            </div>
                          </div>
                        ) : val === false ? (
                          <span className="inline-block size-4 leading-4 text-muted-foreground/30 font-mono">--</span>
                        ) : (
                          <span className={`text-xs font-medium ${isSelf ? "text-brand" : "text-muted-foreground"}`}>
                            {val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Comparison based on publicly available information as of 2025. Features and pricing are subject to change.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECURITY & COMPLIANCE BADGES
   (DocuSign trust center pattern + BoldSign badge grid)
   ═══════════════════════════════════════════════════════════ */
function SecuritySection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div style={useRevealStyle(vis)}>
          <Badge variant="outline" className="mb-4 border-brand/20 text-brand font-mono text-xs">
            TRUST & SECURITY
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Enterprise-grade security.{" "}
            <span className="text-brand">Global compliance.</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Every document is encrypted at rest and in transit with AES-256.
            Every signature includes a SHA-256 cryptographic audit trail.
            SignPad meets the most stringent global security and legal standards.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: <Lock className="size-4" />, text: "End-to-end AES-256 encryption for documents and credentials" },
              { icon: <Shield className="size-4" />, text: "SHA-256 tamper-evident audit trail for every signer action" },
              { icon: <Globe className="size-4" />, text: "Legally binding under IT Act, ESIGN Act, eIDAS, and UETA" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand">
                  {item.icon}
                </div>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" style={useRevealStyle(vis, 150)}>
          {complianceBadges.map((badge, i) => (
            <div
              key={badge.label}
              className="group flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card/50 p-4 text-center hover-lift hover:border-brand/20 hover:bg-card/80"
              style={useRevealStyle(vis, 200 + i * 50)}
            >
              <div className="font-mono text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                {badge.label}
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                {badge.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS
   (DocuSign customer metrics pattern)
   ═══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" style={useRevealStyle(vis)}>
          <Badge variant="outline" className="mb-4 border-border/60 font-mono text-xs">
            CUSTOMER STORIES
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by engineering teams{" "}
            <span className="text-brand">worldwide</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className="border-border/50 bg-card/60 backdrop-blur-sm hover-lift"
              style={useRevealStyle(vis, 100 + i * 100)}
            >
              <CardContent className="pt-6">
                {/* Star rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="size-3.5 fill-brand text-brand" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </CardContent>
              <CardFooter className="border-t border-border/30 pt-4">
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOONLIGHT PRICING — Featured Product
   (BoldSign clean pricing cards + PandaDoc popular highlight)
   ═══════════════════════════════════════════════════════════ */
function MoonlightPricingSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center" style={useRevealStyle(vis)}>
        <Badge variant="outline" className="mb-4 border-brand/20 text-brand font-mono text-xs">
          SIGNPAD PRICING
        </Badge>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Start free.{" "}
          <span className="text-brand">Scale infinitely.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          No credit card required. All plans include a 14-day free trial with full access.
        </p>
      </div>

      <div className={`mt-12 grid gap-6 ${
        moonlight.pricing.length === 1
          ? "mx-auto max-w-md grid-cols-1"
          : moonlight.pricing.length === 2
            ? "mx-auto max-w-2xl grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      }`}>
        {moonlight.pricing.map((tier, i) => (
          <Card
            key={tier.tier}
            className={`relative hover-lift ${
              tier.popular
                ? "border-2 border-brand/40 shadow-[0_8px_40px_var(--color-brand-glow)] scale-[1.02] hover-glow-brand"
                : "border-border/50 hover:border-brand/15"
            }`}
            style={useRevealStyle(vis, 100 + i * 80)}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge className="bg-brand text-brand-foreground font-mono text-[10px] font-bold px-3 py-1">
                  MOST POPULAR
                </Badge>
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{tier.tier}</CardTitle>
              <div className="mt-2">
                <span className={`text-3xl font-bold ${tier.popular ? "text-brand" : ""}`}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`mt-0.5 size-3.5 shrink-0 ${tier.popular ? "text-brand" : "text-success"}`} />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full rounded-lg h-10 text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ${
                  tier.popular
                    ? "bg-brand text-brand-foreground hover:bg-brand/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          View pricing for all products <ArrowRight className="inline size-3 ml-1" />
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   INTEGRATIONS GRID
   ═══════════════════════════════════════════════════════════ */
function IntegrationsSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="bg-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" style={useRevealStyle(vis)}>
          <Badge variant="outline" className="mb-4 border-border/60 font-mono text-xs">
            INTEGRATIONS
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Connects with your{" "}
            <span className="text-brand">existing stack</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5" style={useRevealStyle(vis, 100)}>
          {moonlight.benefits.map((integration, i) => (
            <div
              key={integration}
              className="flex items-center justify-center rounded-xl border border-border/50 bg-card/50 px-4 py-5 text-center font-mono text-xs text-muted-foreground hover-lift hover:border-brand/20 hover:text-foreground"
              style={useRevealStyle(vis, 150 + i * 50)}
            >
              {integration}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ SECTION — Moonlight
   ═══════════════════════════════════════════════════════════ */
function FaqSection() {
  const { ref, vis } = useReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section ref={ref} className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center" style={useRevealStyle(vis)}>
        <Badge variant="outline" className="mb-4 border-border/60 font-mono text-xs">
          FAQ
        </Badge>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked{" "}
          <span className="text-brand">questions</span>
        </h2>
      </div>

      <div className="mt-12 space-y-3" style={useRevealStyle(vis, 100)}>
        {moonlight.faq.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border bg-card/50 overflow-hidden transition-all duration-300 ${
              openIdx === i
                ? "border-brand/20 bg-card/70 shadow-sm"
                : "border-border/50 hover:border-border/80"
            }`}
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="flex w-full items-center justify-between p-5 text-left group"
            >
              <span className={`text-sm font-semibold pr-4 transition-colors duration-200 ${
                openIdx === i ? "text-brand" : "group-hover:text-foreground"
              }`}>{item.q}</span>
              <ChevronDown
                className={`size-4 shrink-0 text-muted-foreground transition-all duration-300 ${
                  openIdx === i ? "rotate-180 text-brand" : "group-hover:text-foreground"
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-400 ease-in-out ${
                openIdx === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className={`px-5 pb-5 text-sm text-muted-foreground leading-relaxed transition-opacity duration-300 ${
                  openIdx === i ? "opacity-100" : "opacity-0"
                }`}>
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA SECTION — Final
   ═══════════════════════════════════════════════════════════ */
function CtaSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-brand/6 blur-[100px] animate-glow-pulse" />
        <div className="absolute left-1/4 top-1/3 h-[200px] w-[300px] rounded-full bg-brand/4 blur-[80px] animate-glow-pulse [animation-delay:1s]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6" style={useRevealStyle(vis)}>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to modernize{" "}
          <span className="text-brand">document signing?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Join thousands of teams using SignPad to replace wet signatures,
          streamline workflows, and stay compliant.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button className="h-12 rounded-lg bg-brand px-8 text-sm font-semibold text-brand-foreground hover:bg-brand/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200">
            Start Free -- No Card Required
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-lg border-border/60 px-8 text-sm font-semibold hover:border-brand/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            Talk to Sales
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Free tier includes 5 documents/month. No credit card required. Upgrade anytime.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function ProductShowcasePage() {
  return (
    <main>
      <HeroSection />
      <TrustMarquee />
      <ProductsGrid />
      <SignatureMethodsSection />
      <WorkflowSection />
      <ComparisonSection />
      <SecuritySection />
      <TestimonialsSection />
      <IntegrationsSection />
      <MoonlightPricingSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
