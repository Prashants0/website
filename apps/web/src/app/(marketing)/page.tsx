"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

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

import { AnimCounter } from "@/components/landing/anim-counter";
import {
  accentBgMap,
  accentBgMutedMap,
  accentBorderMap,
  accentColorMap,
} from "@/components/landing/accent-utils";
import {
  comparisonData,
  marqueeItems,
  products,
  testimonials,
  trustPoints,
} from "@/components/landing/data";
import { useReveal, useRevealStyle } from "@/components/landing/hooks";
import { HeroCanvas } from "@/components/landing/hero-canvas";
import {
  PaperTextureSvg,
  ArchitectureDiagramSvg,
  CryptoShieldSvg,
  BatchDocsSvg,
  BrowserShieldSvg,
  CloudSignSvg,
  WorkflowSvg,
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
  QuoteMarkSvg,
  HorizontalArrowConnector,
  VerticalArrowConnector,
} from "@/components/landing/svg";

/* ═══════════════════════════════════════════════════════════
   FEATURE DATA (user-friendly, benefit-focused)
   ═══════════════════════════════════════════════════════════ */

const coreFeatures = [
  {
    title: "Sign Thousands at Once",
    desc: "Drop an entire folder of documents and sign them all in minutes. Reusable templates mean every signature lands in the right place, every time.",
    svg: <BatchDocsSvg className="size-16" />,
    accent: "brand" as const,
    highlights: ["10,000+ docs/batch", "Templates", "Auto-placement"],
  },
  {
    title: "Sign from Any Browser",
    desc: "A tiny companion app lets you use your digital certificates to sign documents directly from any website. Your private keys never leave your computer.",
    svg: <BrowserShieldSvg className="size-16" />,
    accent: "violet" as const,
    highlights: ["Browser-based", "Keys stay local", "USB tokens"],
  },
  {
    title: "Cloud Signing API",
    desc: "Add document signing to your app with a simple API call. Send a PDF, get a signed PDF back. It also handles form fields, auto-placement, and multi-signer workflows.",
    svg: <CloudSignSvg className="size-16" />,
    accent: "cyan" as const,
    highlights: ["99.99% uptime", "Any language", "Form fields"],
  },
  {
    title: "Complete Signing Platform",
    desc: "Upload documents, add signers, track who's signed and who hasn't. Three signing methods -- electronic, USB certificate, and Aadhaar OTP -- all in one place.",
    svg: <WorkflowSvg className="size-16" />,
    accent: "amber" as const,
    highlights: ["3 sign methods", "Drag & drop", "Audit trail"],
  },
];

const howItWorksSteps = [
  {
    label: "Pick Your Product",
    desc: "Desktop, browser, API, or web platform",
    icon: <AppStepIcon />,
  },
  {
    label: "Set Up in Minutes",
    desc: "Install, get an API key, or sign up free",
    icon: <SdkStepIcon />,
  },
  {
    label: "Sign Documents",
    desc: "One document or ten thousand",
    icon: <CryptoStepIcon />,
  },
  {
    label: "Track & Deliver",
    desc: "Audit trail, email, and notifications",
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
  const howR = useReveal(0.08);
  const productsR = useReveal(0.08);
  const compareR = useReveal(0.08);
  const trustR = useReveal(0.08);
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
        {/* Background: soft paper texture */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <PaperTextureSvg className="absolute inset-0 h-full w-full text-foreground" />
          <div className="absolute -top-[20%] -left-[10%] h-[55%] w-[55%] rounded-full bg-brand-glow blur-[120px]" />
          <div className="absolute -right-[10%] -bottom-[15%] h-[40%] w-[40%] rounded-full bg-amber-muted blur-[120px]" />
        </div>

        <div className="relative z-[2] mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16 lg:text-left">
            {/* Left content */}
            <div className="flex-[1_1_50%]" style={rs(heroR.vis)}>
              <Badge
                variant="outline"
                className="mb-7 rounded-full border-brand/30 bg-brand-muted px-4 py-2 text-xs font-medium text-brand"
              >
                <span className="mr-2 inline-block size-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-brand" />
                Trusted by thousands of businesses
              </Badge>

              <h1 className="mb-6 font-display text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
                Document Signing
                <br />
                <span className="text-brand">Made Simple</span>
              </h1>

              <p className="mb-8 max-w-[520px] text-base leading-relaxed text-muted-foreground sm:text-lg">
                Four powerful tools to sign, send, and manage documents.
                Whether you need to sign one contract or ten thousand
                certificates -- we have the right solution for you.
              </p>

              <div className="flex flex-wrap gap-3.5">
                <Button
                  onClick={() => scrollTo("products")}
                  className="h-auto rounded-xl bg-brand px-8 py-4 text-[15px] font-semibold text-brand-foreground shadow-[0_4px_20px_var(--color-brand-glow)] hover:bg-brand/90"
                >
                  See Our Products
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-auto rounded-xl px-8 py-4 text-[15px] font-semibold"
                  render={<a href="mailto:hello@signsecure.in" />}
                >
                  Talk to Us
                </Button>
              </div>

              {/* Trust points */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" />
                  Free tier on every product
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" />
                  Legally valid signatures
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" />
                  No credit card required
                </div>
              </div>
            </div>

            {/* Hero visual — interactive canvas */}
            <div className="flex-[1_1_50%]" style={rs(heroR.vis, 250)}>
              <HeroCanvas className="w-full max-w-[560px] aspect-[4/3]" />
            </div>
          </div>

          <div className="mt-8 text-center animate-[scroll-hint_2.5s_ease-in-out_infinite] sm:mt-[48px]">
            <ChevronDown className="mx-auto size-4 text-muted-foreground/60" />
          </div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="border-y bg-brand-muted/50 py-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-7 md:grid-cols-4">
          {[
            { v: 4, s: "", l: "Products to Choose From" },
            { v: 10000, s: "+", l: "Documents per Batch" },
            { v: 99, s: ".99%", l: "Uptime Guarantee" },
            { v: 3, s: "", l: "Ways to Sign" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl font-extrabold text-brand">
                <AnimCounter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ DIVIDER ══════ */}
      <DataFlowDivider className="w-full" />

      {/* ══════ CORE FEATURES ══════ */}
      <section
        id="features"
        ref={featR.ref}
        className="relative py-[100px]"
      >
          <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-12 text-center sm:mb-16" style={rs(featR.vis)}>
            <Badge variant="outline" className="mb-4 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand">
              What We Offer
            </Badge>
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
              Everything You Need to Go Paperless
            </h2>
            <p className="mx-auto max-w-[600px] text-[17px] text-muted-foreground">
              From signing a single contract to processing thousands of
              documents automatically -- pick the tool that fits your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {coreFeatures.map((feat, i) => (
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
                    {feat.highlights.map((hl, hi) => (
                      <span
                        key={hi}
                        className={`rounded-md border px-2.5 py-1 text-[11px] font-medium ${accentBorderMap[feat.accent]} ${accentColorMap[feat.accent]} ${accentBgMutedMap[feat.accent]}`}
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section
        id="how-it-works"
        ref={howR.ref}
        className="bg-muted/60 py-[100px]"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-12 text-center sm:mb-16" style={rs(howR.vis)}>
            <Badge variant="outline" className="mb-4 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand">
              How It Works
            </Badge>
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
              Up and Running in Minutes
            </h2>
            <p className="mx-auto max-w-[560px] text-[17px] text-muted-foreground">
              Getting started is simple. Every product comes with a free
              tier -- no credit card needed.
            </p>
          </div>

          {/* Pipeline flow */}
          <div
            className="relative flex flex-col items-center gap-0 lg:flex-row lg:gap-0"
            style={rs(howR.vis, 100)}
          >
            {howItWorksSteps.map((step, i) => (
              <div key={i} className="flex flex-1 flex-col items-center lg:flex-row">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border bg-card shadow-md">
                    {step.icon}
                  </div>
                  <div className="mb-1 text-sm font-bold">{step.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {step.desc}
                  </div>
                </div>
                {i < howItWorksSteps.length - 1 && (
                  <HorizontalArrowConnector animDur={`${2 + i * 0.5}s`} />
                )}
                {i < howItWorksSteps.length - 1 && (
                  <VerticalArrowConnector />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <section className="overflow-hidden border-b py-5">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-12 hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[11px] font-medium tracking-widest text-muted-foreground/60"
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
        className="relative overflow-hidden py-[120px]"
      >
        {/* Background orb that shifts color based on active product */}
        <div
          className="product-orb size-[500px] lg:size-[700px]"
          style={{
            background: `var(--color-${ap.accent})`,
            opacity: 0.06,
            top: "10%",
            right: "-10%",
            transition: "background 0.8s ease",
          }}
        />
        <div
          className="product-orb size-[300px] lg:size-[400px]"
          style={{
            background: `var(--color-${ap.accent})`,
            opacity: 0.04,
            bottom: "5%",
            left: "-5%",
            animationDelay: "-3s",
            transition: "background 0.8s ease",
          }}
        />

        <div className="relative z-[2] mx-auto max-w-[1240px] px-4 sm:px-7">
          {/* Section header */}
          <div
            className="mb-12 text-center sm:mb-16"
            style={rs(productsR.vis)}
          >
            <Badge variant="outline" className="mb-4 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand">
              Our Products
            </Badge>
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[50px]">
              Four Tools.<br className="hidden sm:block" />
              <span className="text-brand">One Mission.</span>
            </h2>
            <p className="mx-auto max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">
              Whether you&apos;re signing documents yourself or building signing
              into your software -- pick the product that fits.
            </p>
          </div>

          {/* Product selector tabs + featured content */}
          <div
            className="flex flex-col gap-8 lg:flex-row lg:gap-0"
            style={rs(productsR.vis, 100)}
          >
            {/* Left: vertical tab strip */}
            <div className="flex shrink-0 gap-2 overflow-x-auto pb-2 lg:w-[280px] lg:flex-col lg:gap-1 lg:overflow-x-visible lg:border-r lg:pr-8 lg:pb-0">
              {products.map((product, i) => (
                <button
                  key={product.slug}
                  onClick={() => setActiveProduct(i)}
                  data-active={activeProduct === i}
                  className="product-tab flex min-w-[200px] items-center gap-3.5 rounded-xl px-4 py-4 text-left transition-all lg:min-w-0"
                  style={{
                    // Color the left indicator bar per product
                    ...({ "--tw-product-accent": `var(--color-${product.accent})` } as React.CSSProperties),
                  }}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg border transition-all duration-300 ${
                      activeProduct === i
                        ? `${accentBgMutedMap[product.accent]} ${accentBorderMap[product.accent]}`
                        : "border-border bg-muted/50"
                    }`}
                  >
                    <ProductIcon
                      d={product.icon}
                      size={20}
                      className={`transition-colors duration-300 ${
                        activeProduct === i ? accentColorMap[product.accent] : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold transition-colors duration-300 ${
                      activeProduct === i ? "" : "text-muted-foreground"
                    }`}>
                      {product.name}
                    </div>
                    <div className={`truncate text-xs transition-colors duration-300 ${
                      activeProduct === i ? accentColorMap[product.accent] : "text-muted-foreground/60"
                    }`}>
                      {product.tagline}
                    </div>
                  </div>
                  {/* Active indicator on mobile (bottom) */}
                  {activeProduct === i && (
                    <div className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full lg:bottom-auto lg:left-0 lg:top-2 lg:right-auto lg:h-auto lg:w-[3px] lg:self-stretch ${accentBgMap[product.accent]} tab-indicator`} />
                  )}
                </button>
              ))}
            </div>

            {/* Right: featured product showcase */}
            <div className="flex-1 lg:pl-10" key={ap.slug}>
              <div className="product-card-enter">
                {/* Product identity row */}
                <div className="mb-8 flex items-start gap-5">
                  <div
                    className={`relative flex size-16 items-center justify-center rounded-2xl border-2 ${accentBorderMap[ap.accent]} ${accentBgMutedMap[ap.accent]} product-icon-active`}
                  >
                    <ProductIcon d={ap.icon} size={32} className={accentColorMap[ap.accent]} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[36px]">
                        {ap.name}
                      </h3>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${accentBorderMap[ap.accent]} ${accentColorMap[ap.accent]} ${accentBgMutedMap[ap.accent]}`}
                      >
                        {ap.id}
                      </span>
                    </div>
                    <div className={`mt-1 text-sm font-medium ${accentColorMap[ap.accent]}`}>
                      {ap.tagline}
                    </div>
                  </div>
                </div>

                {/* Accent line */}
                <div className="mb-8 h-[2px] accent-line-draw" style={{ background: `linear-gradient(90deg, var(--color-${ap.accent}), transparent)` }} />

                {/* Description */}
                <p className="mb-8 max-w-[600px] text-[16px] leading-[1.8] text-muted-foreground">
                  {ap.desc}
                </p>

                {/* Metrics bar */}
                <div className="mb-8 flex flex-wrap gap-8">
                  <div className="metric-count" style={{ animationDelay: "0.1s" }}>
                    <div className="mb-1 font-mono text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
                      Platform
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`size-1.5 rounded-full ${accentBgMap[ap.accent]}`} />
                      <span className="text-sm font-bold">{ap.platform}</span>
                    </div>
                  </div>
                  <div className="metric-count" style={{ animationDelay: "0.2s" }}>
                    <div className="mb-1 font-mono text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
                      Best For
                    </div>
                    <div className="text-sm font-bold">{ap.bestFor}</div>
                  </div>
                  <div className="metric-count" style={{ animationDelay: "0.3s" }}>
                    <div className="mb-1 font-mono text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
                      Key Metric
                    </div>
                    <div className={`text-lg font-extrabold ${accentColorMap[ap.accent]}`}>
                      {ap.metric}{" "}
                      <span className="text-sm font-normal opacity-70">{ap.metricLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Features grid with staggered animation */}
                <div className="mb-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {ap.features.map((f, fi) => (
                    <div
                      key={fi}
                      className="feature-stagger flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:border-border hover:bg-muted/50"
                      style={{ animationDelay: `${0.15 + fi * 0.06}s` }}
                    >
                      <div className={`flex size-5 shrink-0 items-center justify-center rounded-full ${accentBgMutedMap[ap.accent]}`}>
                        <Check className={`size-3 ${accentColorMap[ap.accent]}`} />
                      </div>
                      <span className="text-[14px] font-medium text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    className={`h-auto ${accentBgMap[ap.accent]} rounded-xl px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-all hover:opacity-90`}
                    style={{ boxShadow: `0 8px 32px var(--color-${ap.accent}-muted)` }}
                    render={<Link href={`/products/${ap.slug}`} />}
                  >
                    Explore {ap.name}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className={`h-auto rounded-xl px-6 py-3.5 text-[14px] font-semibold ${accentColorMap[ap.accent]} border-current/20 hover:${accentBgMutedMap[ap.accent]}`}
                    render={<Link href="/pricing" />}
                  >
                    See Pricing
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: compact product cards for quick overview on mobile */}
          <div
            className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4"
            style={rs(productsR.vis, 250)}
          >
            {products.map((product, i) => (
              <button
                key={product.slug}
                onClick={() => {
                  setActiveProduct(i);
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  activeProduct === i
                    ? `${accentBorderMap[product.accent]} shadow-md`
                    : "border-border"
                }`}
              >
                {/* Diagonal accent stripe */}
                <div className={`accent-stripe ${accentBgMap[product.accent]}`} />
                <div className="relative z-[1]">
                  <div className={`mb-3 flex size-9 items-center justify-center rounded-lg ${accentBgMutedMap[product.accent]}`}>
                    <ProductIcon d={product.icon} size={18} className={accentColorMap[product.accent]} />
                  </div>
                  <div className="mb-0.5 text-sm font-bold">{product.name}</div>
                  <div className="text-[11px] leading-snug text-muted-foreground">
                    {product.tagline}
                  </div>
                  <div className={`mt-3 font-mono text-lg font-extrabold ${accentColorMap[product.accent]}`}>
                    {product.metric}
                    <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                      {product.metricLabel}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ COMPARISON ══════ */}
      <section id="compare" ref={compareR.ref} className="bg-muted/60 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="mb-10 text-center sm:mb-14"
            style={rs(compareR.vis)}
          >
            <Badge variant="outline" className="mb-4 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand">
              Compare Products
            </Badge>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
              Which Product Is Right for You?
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
                    "SignBolt",
                    "SignBridge",
                    "SignLift",
                    "SignPad",
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
                          <span className="text-muted-foreground/40">--</span>
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

      {/* ══════ TRUST & SECURITY ══════ */}
      <section
        id="trust"
        ref={trustR.ref}
        className="py-[100px]"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="mb-10 text-center sm:mb-14"
            style={rs(trustR.vis)}
          >
            <Badge variant="outline" className="mb-4 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand">
              Trust & Security
            </Badge>
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
              Signatures You Can Trust
            </h2>
            <p className="mx-auto max-w-[560px] text-[17px] text-muted-foreground">
              Every signature we create is legally valid, tamper-proof, and
              verifiable in any standard PDF reader like Adobe Acrobat.
            </p>
          </div>

          <div className="mb-12 flex justify-center" style={rs(trustR.vis, 80)}>
            <CryptoShieldSvg className="size-24 opacity-50" />
          </div>

          <div
            className="flex flex-wrap justify-center gap-5"
            style={rs(trustR.vis, 150)}
          >
            {trustPoints.map((b, i) => (
              <Card
                key={i}
                className="flex min-w-[140px] flex-col items-center rounded-2xl p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1 sm:min-w-[160px] sm:p-7 sm:px-9"
              >
                <CardContent className="p-0">
                  <div className="mb-3">
                    {trustSvgIcons[b.label]}
                  </div>
                  <div className="mb-1 text-base font-bold text-brand">
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

      {/* ══════ TESTIMONIALS ══════ */}
      <section
        ref={testimonialsR.ref}
        className="overflow-hidden bg-muted/60 py-[100px]"
      >
        <div className="mx-auto mb-10 max-w-[1240px] px-4 sm:mb-12 sm:px-7">
          <div className="text-center" style={rs(testimonialsR.vis)}>
            <Badge variant="outline" className="mb-4 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand">
              Customer Stories
            </Badge>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
              Trusted by Teams Everywhere
            </h2>
          </div>
        </div>

        <div
          className="mx-auto grid max-w-[1240px] grid-cols-1 gap-4 px-4 sm:gap-6 sm:px-7 md:grid-cols-3"
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
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-amber text-base font-bold text-white">
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
      <section id="cta" ref={ctaR.ref} className="py-16 sm:py-[100px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="relative overflow-hidden rounded-2xl border border-brand/50 bg-gradient-to-br from-brand-muted to-amber-muted p-8 text-center sm:rounded-3xl sm:p-14 lg:p-20"
            style={rs(ctaR.vis)}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
              <PaperTextureSvg className="h-full w-full text-foreground" />
            </div>
            <div className="relative z-[2]">
              <div className="mb-4 flex justify-center">
                <CertificateSvg className="size-16 opacity-60" />
              </div>
              <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[42px]">
                Ready to Go Paperless?
              </h2>
              <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">
                Every product starts free. No credit card needed. Start signing
                documents in minutes -- whether it&apos;s one contract or ten
                thousand certificates.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Button
                  className="h-auto rounded-xl bg-brand px-9 py-4 text-[15px] font-semibold text-brand-foreground shadow-[0_4px_20px_var(--color-brand-glow)] hover:bg-brand/90"
                  render={<a href="https://app.signsecure.in" />}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-auto rounded-xl px-9 py-4 text-[15px] font-semibold"
                  render={<a href="mailto:hello@signsecure.in" />}
                >
                  Talk to Us
                </Button>
              </div>
              <p className="mt-5 text-xs text-muted-foreground/85">
                No credit card required &middot; Free tier on all products
                &middot; Set up in under 5 minutes
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
