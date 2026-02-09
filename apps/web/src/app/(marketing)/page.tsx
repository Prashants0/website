"use client";

import { useCallback, useState } from "react";

import { ArrowRight, Check, ChevronDown } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AnimCounter } from "@/components/landing/anim-counter";
import {
  accentBgMap,
  accentBgMutedMap,
  accentBorderMap,
  accentColorMap,
} from "@/components/landing/accent-utils";
import {
  comparisonData,
  howItWorks,
  marqueeItems,
  products,
  testimonials,
  trustBadges,
} from "@/components/landing/data";
import { useReveal, useRevealStyle } from "@/components/landing/hooks";
import {
  CircuitBoardSvg,
  ArchitectureDiagramSvg,
  CryptoShieldSvg,
  KeySvg,
  ServerlessSvg,
  WorkflowSvg,
  BatchProcessSvg,
  CertificateSvg,
  DataFlowDivider,
  trustSvgIcons,
  AppStepIcon,
  SdkStepIcon,
  CryptoStepIcon,
  SignedDocStepIcon,
  ProductIcon,
  TableCheckmarkSvg,
  TableDashSvg,
  ProtocolDotSvg,
  QuoteMarkSvg,
  HorizontalArrowConnector,
  VerticalArrowConnector,
  MiniArchDiagramSvg,
} from "@/components/landing/svg";

/* ═══════════════════════════════════════════════════════════
   FEATURE DATA
   ═══════════════════════════════════════════════════════════ */

const techFeatures = [
  {
    title: "Batch Cryptographic Signing",
    desc: "Process 10,000+ PDFs in a single operation with PAdES-compliant signatures. Reusable JSON templates define signature position, appearance, and cert selection for fully automated batch workflows.",
    svg: <BatchProcessSvg className="size-16" />,
    accent: "brand" as const,
    stats: ["10K+ PDFs/batch", "JavaFX 22", "BouncyCastle"],
  },
  {
    title: "Zero Key Exposure Bridge",
    desc: "A localhost HTTPS agent bridges web applications to hardware-bound certificates. Ed25519 JWT auth and HMAC cryptographic isolation ensure private keys never leave the machine -- ever.",
    svg: <KeySvg className="size-16" />,
    accent: "violet" as const,
    stats: ["0ms exposure", "Ed25519 JWT", "localhost:53000"],
  },
  {
    title: "Serverless Signing API",
    desc: "Deploy document signing as a stateless HTTP call on AWS Lambda with SnapStart. Full AcroForm lifecycle management -- create, fill, flatten, and lock form fields programmatically.",
    svg: <ServerlessSvg className="size-16" />,
    accent: "cyan" as const,
    stats: ["99.99% SLA", "Sub-200ms", "Micronaut 4.10"],
  },
  {
    title: "Multi-Method Workflows",
    desc: "Electronic, DSC USB, and Aadhaar OTP signing methods in one platform. Define sequential or parallel workflows with drag-and-drop form builders and SHA-256 audit trails.",
    svg: <WorkflowSvg className="size-16" />,
    accent: "amber" as const,
    stats: ["3 methods", "Drag & drop", "Audit trail"],
  },
];

const architectureSteps = [
  {
    label: "Your Application",
    desc: "Web app, mobile, or desktop",
    icon: <AppStepIcon />,
  },
  {
    label: "SignSecure SDK",
    desc: "TypeScript / REST / CLI",
    icon: <SdkStepIcon />,
  },
  {
    label: "Crypto Engine",
    desc: "X.509 / PAdES / AES-256",
    icon: <CryptoStepIcon />,
  },
  {
    label: "Signed Document",
    desc: "LTV-enabled, verifiable",
    icon: <SignedDocStepIcon />,
  },
];

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function SignSecureLanding() {
  const [activeProduct, setActiveProduct] = useState(0);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Section reveals
  const heroR = useReveal(0.1);
  const featR = useReveal(0.08);
  const archR = useReveal(0.08);
  const productsR = useReveal(0.08);
  const detailR = useReveal(0.08);
  const compareR = useReveal(0.08);
  const trustR = useReveal(0.08);
  const pricingR = useReveal(0.08);
  const testimonialsR = useReveal(0.08);
  const ctaR = useReveal(0.08);

  const rs = useRevealStyle;
  const ap = products[activeProduct];

  return (
    <>
      {/* ══════ HERO ══════ */}
      <section
        id="hero"
        ref={heroR.ref}
        className="relative flex min-h-screen items-center pt-[112px] pb-[60px]"
      >
        {/* Background: circuit board pattern */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <CircuitBoardSvg className="absolute inset-0 h-full w-full text-foreground" />
          <div className="absolute -top-[20%] -left-[10%] h-[55%] w-[55%] rounded-full bg-brand-glow blur-[100px]" />
          <div className="absolute -right-[10%] -bottom-[15%] h-[40%] w-[40%] rounded-full bg-violet-muted blur-[100px]" />
        </div>

        <div className="relative z-[2] mx-auto max-w-[1240px] px-7">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:text-left">
            {/* Left content */}
            <div className="flex-[1_1_50%]" style={rs(heroR.vis)}>
              <Badge
                variant="outline"
                className="mb-7 rounded-full border-brand/30 bg-brand-muted px-4 py-2 font-mono text-xs font-medium text-brand"
              >
                <span className="mr-2 inline-block size-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-brand" />
                Cryptographic Signing Infrastructure
              </Badge>

              <h1 className="mb-6 font-display text-5xl font-black leading-[1.05] tracking-tight lg:text-[56px]">
                Document Signing
                <br />
                <span className="text-brand">Built for Engineers</span>
              </h1>

              <p className="mb-5 max-w-[520px] text-lg leading-relaxed text-muted-foreground">
                Four specialized tools spanning desktop batch signing, localhost
                certificate bridges, serverless REST APIs, and full-stack SaaS
                workflows. Every signature is X.509 compliant, PAdES-sealed, and
                LTV-enabled.
              </p>

              {/* Tech stack badges */}
              <div className="mb-8 flex flex-wrap gap-2">
                {["Java 25", "AWS Lambda", "Electron", "React 19", "BouncyCastle", "Micronaut"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-md border border-brand/30 bg-brand-muted px-2.5 py-1 font-mono text-[10px] font-medium text-brand"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>

              <div className="flex flex-wrap gap-3.5">
                <Button
                  onClick={() => scrollTo("features")}
                  className="h-auto rounded-xl bg-brand px-8 py-4 text-[15px] font-semibold text-brand-foreground shadow-[0_4px_20px_var(--color-brand-glow)] hover:bg-brand/90"
                >
                  Explore the Stack
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-auto rounded-xl px-8 py-4 text-[15px] font-semibold"
                  render={<a href="mailto:sales@signsecure.in" />}
                >
                  Talk to Engineers
                </Button>
              </div>
            </div>

            {/* Hero visual: Architecture diagram SVG */}
            <div className="flex-[1_1_50%]" style={rs(heroR.vis, 250)}>
              <ArchitectureDiagramSvg className="w-full max-w-[520px]" />
            </div>
          </div>

          <div className="mt-[48px] text-center animate-[scroll-hint_2.5s_ease-in-out_infinite]">
            <ChevronDown className="mx-auto size-4 text-muted-foreground/60" />
          </div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="border-y bg-brand-muted/50 py-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6 px-7 md:grid-cols-4">
          {[
            { v: 4, s: "", l: "Signing Products" },
            { v: 10000, s: "+", l: "PDFs / Batch" },
            { v: 99, s: ".99%", l: "Uptime SLA" },
            { v: 0, s: "ms", l: "Key Exposure" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl font-extrabold text-brand">
                {s.v === 0 ? (
                  "0ms"
                ) : (
                  <AnimCounter to={s.v} suffix={s.s} />
                )}
              </div>
              <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ DATA FLOW DIVIDER ══════ */}
      <DataFlowDivider className="w-full" />

      {/* ══════ TECH FEATURES ══════ */}
      <section
        id="features"
        ref={featR.ref}
        className="relative py-[100px]"
      >
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-16 text-center" style={rs(featR.vis)}>
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// core_capabilities"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight lg:text-[44px]">
              Engineering-Grade Features
            </h2>
            <p className="mx-auto max-w-[600px] text-[17px] text-muted-foreground">
              Purpose-built cryptographic infrastructure. Not another e-signature
              wrapper -- real signing engines with real certificate management.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {techFeatures.map((feat, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-2xl border p-8 shadow-md transition-all duration-300 hover:-translate-y-1"
                style={rs(featR.vis, i * 120)}
              >
                {/* Accent top line */}
                <div
                  className={`absolute top-0 right-0 left-0 h-[2px] ${accentBgMap[feat.accent]}`}
                  style={{
                    maskImage:
                      "linear-gradient(90deg, transparent, black, transparent)",
                  }}
                />
                <CardContent className="p-0">
                  <div className="mb-5 flex items-start gap-5">
                    <div
                      className={`shrink-0 rounded-xl border p-3 ${accentBgMutedMap[feat.accent]} ${accentBorderMap[feat.accent]}`}
                    >
                      {feat.svg}
                    </div>
                    <div>
                      <h3
                        className={`mb-2 text-xl font-bold ${accentColorMap[feat.accent]}`}
                      >
                        {feat.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-muted-foreground">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {feat.stats.map((stat, si) => (
                      <span
                        key={si}
                        className={`rounded-md border px-2.5 py-1 font-mono text-[10px] font-semibold ${accentBorderMap[feat.accent]} ${accentColorMap[feat.accent]} ${accentBgMutedMap[feat.accent]}`}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ARCHITECTURE FLOW ══════ */}
      <section
        id="architecture"
        ref={archR.ref}
        className="bg-muted/60 py-[100px]"
      >
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-16 text-center" style={rs(archR.vis)}>
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// signing_pipeline"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight lg:text-[44px]">
              How Signing Works
            </h2>
            <p className="mx-auto max-w-[560px] text-[17px] text-muted-foreground">
              From your application to a cryptographically signed, LTV-enabled
              document in four deterministic steps.
            </p>
          </div>

          {/* Pipeline flow with SVG connectors */}
          <div
            className="relative flex flex-col items-center gap-0 lg:flex-row lg:gap-0"
            style={rs(archR.vis, 100)}
          >
            {architectureSteps.map((step, i) => (
              <div key={i} className="flex flex-1 flex-col items-center lg:flex-row">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex size-16 items-center justify-center rounded-2xl border bg-card shadow-md">
                    {step.icon}
                  </div>
                  <div className="text-sm font-bold">{step.label}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {step.desc}
                  </div>
                </div>
                {/* Arrow connector between steps */}
                {i < architectureSteps.length - 1 && (
                  <HorizontalArrowConnector animDur={`${2 + i * 0.5}s`} />
                )}
                {/* Vertical arrow for mobile */}
                {i < architectureSteps.length - 1 && (
                  <VerticalArrowConnector />
                )}
              </div>
            ))}
          </div>

          {/* Protocol bar below */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {["X.509 Certificates", "PAdES Signatures", "SHA-256 Hashing", "AES-256 Encryption", "LTV Validation", "JWT Auth"].map(
              (proto) => (
                <div key={proto} className="flex items-center gap-2">
                  <ProtocolDotSvg />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {proto}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <section className="overflow-hidden border-b py-5">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-12 hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-mono text-[11px] font-medium tracking-widest text-muted-foreground/50"
            >
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* ══════ PRODUCTS ══════ */}
      <section
        id="products"
        ref={productsR.ref}
        className="relative py-[100px]"
      >
        <div className="mx-auto max-w-[1240px] px-7">
          <div
            className="mb-14 text-center"
            style={rs(productsR.vis)}
          >
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// product_suite"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight lg:text-[44px]">
              Four Products, One Mission
            </h2>
            <p className="mx-auto max-w-[560px] text-[17px] text-muted-foreground">
              Each product is a standalone signing engine optimized for a
              specific deployment model and use case.
            </p>
          </div>

          {/* Product tabs */}
          <Tabs
            value={String(activeProduct)}
            onValueChange={(v) => setActiveProduct(Number(v))}
            className="w-full"
          >
            <div
              className="mb-12 flex justify-center"
              style={rs(productsR.vis, 100)}
            >
              <TabsList
                variant="line"
                className="h-auto flex-wrap gap-3 bg-transparent p-0"
              >
                {products.map((p, i) => (
                  <TabsTrigger
                    key={i}
                    value={String(i)}
                    className="h-auto rounded-xl border px-6 py-3 text-sm font-semibold data-active:border-border data-active:bg-card data-active:shadow-md after:hidden"
                  >
                    <ProductIcon d={p.icon} size={16} className="mr-2" />
                    {p.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {products.map((product, pi) => (
              <TabsContent key={pi} value={String(pi)}>
                <div
                  ref={pi === activeProduct ? detailR.ref : undefined}
                  className="flex flex-col gap-10 lg:flex-row"
                  style={rs(detailR.vis, 150)}
                >
                  {/* Left card */}
                  <Card className="flex-[1_1_50%] rounded-3xl p-10 shadow-lg">
                    <CardHeader className="p-0">
                      <div className="mb-2 flex items-center gap-3.5">
                        <div
                          className={`flex size-12 items-center justify-center rounded-xl border ${accentBgMutedMap[product.accent]} ${accentBorderMap[product.accent]}`}
                        >
                          <ProductIcon d={product.icon} size={24} className={accentColorMap[product.accent]} />
                        </div>
                        <div>
                          <div
                            className={`font-mono text-[11px] ${accentColorMap[product.accent]}`}
                          >
                            {product.id}
                          </div>
                          <CardTitle className="font-display text-2xl font-extrabold">
                            {product.name}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription
                        className={`text-sm font-semibold ${accentColorMap[product.accent]}`}
                      >
                        {product.tagline}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 pt-4">
                      <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">
                        {product.desc}
                      </p>

                      <div className="mb-6 flex flex-wrap gap-6">
                        <div>
                          <div className="mb-1 font-mono text-[10px] text-muted-foreground">
                            PLATFORM
                          </div>
                          <div className="text-sm font-semibold">
                            {product.platform}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 font-mono text-[10px] text-muted-foreground">
                            TECH STACK
                          </div>
                          <div className="text-sm font-semibold">
                            {product.tech}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 font-mono text-[10px] text-muted-foreground">
                            KEY METRIC
                          </div>
                          <div
                            className={`text-sm font-semibold ${accentColorMap[product.accent]}`}
                          >
                            {product.metric}{" "}
                            <span className="font-normal opacity-80">
                              {product.metricLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <h4 className="mb-3 text-sm font-semibold">
                        Technical Features
                      </h4>
                      <ul className="grid list-none grid-cols-1 gap-2 sm:grid-cols-2">
                        {product.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Check
                              className={`size-3.5 shrink-0 ${accentColorMap[product.accent]}`}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Right side */}
                  <div className="flex flex-[1_1_50%] flex-col gap-6">
                    {/* Use Cases */}
                    <Card className="rounded-2xl p-8">
                      <CardHeader className="p-0">
                        <CardTitle className="text-[15px] font-semibold">
                          Use Cases
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 pt-4">
                        {product.useCases.map((uc, i) => (
                          <div
                            key={i}
                            className="mb-3 flex gap-2.5 text-sm text-muted-foreground"
                          >
                            <span
                              className={`font-semibold ${accentColorMap[product.accent]}`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {uc}
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Integrations */}
                    <Card className="rounded-2xl p-8">
                      <CardHeader className="p-0">
                        <CardTitle className="text-[15px] font-semibold">
                          Integrations & SDKs
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 pt-4">
                        <div className="flex flex-wrap gap-2">
                          {product.integrations.map((integ, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="rounded-lg font-mono text-[11px] font-medium"
                            >
                              {integ}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Architecture mini-diagram per product */}
                    <Card className="rounded-2xl p-8">
                      <CardHeader className="p-0">
                        <CardTitle className="text-[15px] font-semibold">
                          Architecture
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 pt-4">
                        <MiniArchDiagramSvg
                          inputLabel={
                            product.platform === "Windows"
                              ? "PDF Input"
                              : product.platform === "Electron + Java"
                                ? "Web App"
                                : product.platform === "AWS Lambda"
                                  ? "HTTP Request"
                                  : "Upload PDF"
                          }
                          engineName={product.name}
                          engineTech={product.tech.split(" / ")[0]}
                          accent={product.accent}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ══════ COMPARISON ══════ */}
      <section id="compare" ref={compareR.ref} className="bg-muted/60 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div
            className="mb-14 text-center"
            style={rs(compareR.vis)}
          >
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// comparison_matrix"}
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight lg:text-[44px]">
              Technical Comparison
            </h2>
          </div>

          <div
            className="overflow-x-auto"
            style={rs(compareR.vis, 120)}
          >
            <table className="w-full overflow-hidden rounded-2xl border text-sm shadow-md">
              <thead>
                <tr>
                  {[
                    "Feature",
                    "SignSecure Win",
                    "SignBridge",
                    "Signly API",
                    "Moonlight",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`border-b border-r px-5 py-4 text-[13px] font-semibold last:border-r-0 ${
                        i === 0
                          ? "bg-brand text-left text-brand-foreground"
                          : "bg-muted text-center"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, ri) => (
                  <tr key={ri}>
                    {(
                      [
                        row.feature,
                        row.win,
                        row.bridge,
                        row.api,
                        row.moon,
                      ] as (string | boolean)[]
                    ).map((cell, ci) => (
                      <td
                        key={ci}
                        className={`border-b border-r px-5 py-3.5 last:border-r-0 ${
                          ci === 0 ? "text-left font-semibold" : "text-center"
                        } ${ri % 2 === 0 ? "bg-muted/50" : "bg-background"}`}
                      >
                        {cell === true ? (
                          <TableCheckmarkSvg />
                        ) : cell === false ? (
                          <TableDashSvg />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════ TRUST & STANDARDS ══════ */}
      <section
        id="trust"
        ref={trustR.ref}
        className="py-[100px]"
      >
        <div className="mx-auto max-w-[1240px] px-7">
          <div
            className="mb-14 text-center"
            style={rs(trustR.vis)}
          >
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// trust_framework"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight lg:text-[44px]">
              Cryptographic Standards
            </h2>
            <p className="mx-auto max-w-[560px] text-[17px] text-muted-foreground">
              Every signature is built on industry-standard protocols. Legally
              binding, independently verifiable, tamper-evident.
            </p>
          </div>

          {/* Certificate SVG + Trust badges with SVG icons */}
          <div className="mb-12 flex justify-center" style={rs(trustR.vis, 80)}>
            <CryptoShieldSvg className="size-24 opacity-50" />
          </div>

          <div
            className="flex flex-wrap justify-center gap-5"
            style={rs(trustR.vis, 150)}
          >
            {trustBadges.map((b, i) => (
              <Card
                key={i}
                className="flex min-w-[160px] flex-col items-center rounded-2xl p-7 px-9 text-center shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="mb-3">
                    {trustSvgIcons[b.label]}
                  </div>
                  <div className="mb-1 font-mono text-base font-bold text-brand">
                    {b.label}
                  </div>
                  <div className="text-[13px] text-muted-foreground">
                    {b.desc}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING ══════ */}
      <section id="pricing" ref={pricingR.ref} className="bg-muted/60 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div
            className="mb-14 text-center"
            style={rs(pricingR.vis)}
          >
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// pricing_tiers"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight lg:text-[44px]">
              Transparent Pricing
            </h2>
            <p className="text-[17px] text-muted-foreground">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

          {/* Product switcher for pricing */}
          <div
            className="mb-10 flex flex-wrap justify-center gap-2.5"
            style={rs(pricingR.vis, 80)}
          >
            {products.map((p, i) => (
              <Button
                key={i}
                variant={activeProduct === i ? "outline" : "ghost"}
                className={`rounded-lg text-[13px] font-semibold ${
                  activeProduct === i
                    ? `border-${p.accent}/40 ${accentColorMap[p.accent]} ${accentBgMutedMap[p.accent]}`
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveProduct(i)}
              >
                {p.name}
              </Button>
            ))}
          </div>

          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            style={rs(pricingR.vis, 160)}
          >
            {ap.pricing.map((plan, i) => (
              <Card
                key={i}
                className={`relative flex flex-col overflow-hidden rounded-2xl p-7 shadow-md transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? `border-${ap.accent}/50 shadow-lg`
                    : ""
                }`}
              >
                {plan.popular && (
                  <div
                    className={`absolute top-0 right-0 left-0 h-[3px] ${accentBgMap[ap.accent]}`}
                  />
                )}
                <CardHeader className="p-0">
                  <CardDescription
                    className={`text-sm font-semibold ${accentColorMap[ap.accent]}`}
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
                        <Check
                          className={`size-3.5 shrink-0 ${accentColorMap[ap.accent]}`}
                        />
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
                        ? `${accentBgMap[ap.accent]} text-white hover:opacity-90`
                        : `${accentColorMap[ap.accent]} border-${ap.accent}/40`
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section
        ref={testimonialsR.ref}
        className="overflow-hidden py-[100px]"
      >
        <div className="mx-auto mb-12 max-w-[1240px] px-7">
          <div className="text-center" style={rs(testimonialsR.vis)}>
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// testimonials"}
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight lg:text-[44px]">
              Trusted by Engineers
            </h2>
          </div>
        </div>

        <div
          className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 px-7 md:grid-cols-3"
          style={rs(testimonialsR.vis, 150)}
        >
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <QuoteMarkSvg />
                <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <Separator className="mb-6" />
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-violet text-base font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section id="cta" ref={ctaR.ref} className="py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div
            className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand-muted to-violet-muted p-20 text-center"
            style={rs(ctaR.vis)}
          >
            {/* Circuit board background in CTA */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
              <CircuitBoardSvg className="h-full w-full text-foreground" />
            </div>
            <div className="relative z-[2]">
              <div className="mb-4 flex justify-center">
                <CertificateSvg className="size-16 opacity-40" />
              </div>
              <div className="mb-5 font-mono text-xs tracking-widest text-brand">
                {"// initialize"}
              </div>
              <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight lg:text-[42px]">
                Deploy Signing Infrastructure
                <br />
                That Engineers Trust
              </h2>
              <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">
                From batch desktop signing to serverless cloud APIs. X.509
                certificates, PAdES signatures, and LTV validation -- start free,
                scale to millions.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Button
                  className="h-auto rounded-xl bg-brand px-9 py-4 text-[15px] font-semibold text-brand-foreground shadow-[0_4px_20px_var(--color-brand-glow)] hover:bg-brand/90"
                  render={<a href="https://signsecure.in" />}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-auto rounded-xl px-9 py-4 text-[15px] font-semibold"
                  render={<a href="mailto:sales@signsecure.in" />}
                >
                  Talk to Engineers
                </Button>
              </div>
              <p className="mt-5 font-mono text-xs text-muted-foreground/70">
                No credit card required &middot; Free tier on all products
                &middot; OpenAPI 3.0 docs included
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
