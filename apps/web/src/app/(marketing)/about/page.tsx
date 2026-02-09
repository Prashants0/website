"use client";

import Link from "next/link";

import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Globe,
  Lock,
  FileCheck,
  Code2,
  Lightbulb,
  Heart,
  Target,
  Scale,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  accentBgMap,
  accentBgMutedMap,
  accentBorderMap,
  accentColorMap,
} from "@/components/landing/accent-utils";
import { products } from "@/components/landing/data";
import { useReveal, useRevealStyle } from "@/components/landing/hooks";
import { ProductIcon } from "@/components/landing/svg";

/* ═══════════════════════════════════════════════════════════
   STATIC DATA
   ═══════════════════════════════════════════════════════════ */

const milestones = [
  {
    year: "2023",
    title: "The Problem",
    desc: "We watched teams across India burn hours manually signing PDFs one by one. Government offices, banks, legal firms -- all stuck in the same loop. We knew there had to be a better way.",
  },
  {
    year: "2024",
    title: "SignBolt Ships",
    desc: "Our first product launched: a desktop app that batch-signs 10,000+ PDFs in minutes. Word got around fast. Within months, government departments and HR teams were processing their entire quarterly output in a single sitting.",
  },
  {
    year: "2024",
    title: "The Platform Grows",
    desc: "SignBridge brought hardware-token signing to the browser. SignLift gave developers a REST API. SignPad completed the suite with a full web-based signing platform supporting e-sign, DSC, and Aadhaar OTP.",
  },
  {
    year: "2025",
    title: "Scaling Up",
    desc: "Four products, one mission. Teams across government, banking, legal, and enterprise now rely on SignSecure for document signing that's fast, compliant, and built for their scale.",
  },
];

const values = [
  {
    icon: Target,
    title: "Solve the Real Problem",
    desc: "We don't build features for spec sheets. Every capability exists because a real team needed it. If it doesn't save time or reduce risk, it doesn't ship.",
  },
  {
    icon: Lock,
    title: "Security Is Not Optional",
    desc: "Private keys never leave hardware tokens. Signatures use PAdES with Long-Term Validation. Audit trails are SHA-256 hashed. We build for the paranoid -- because they're right.",
  },
  {
    icon: Lightbulb,
    title: "Simple Beats Clever",
    desc: "Drop a folder, hit Sign. One API call. Drag and drop. Our products hide enormous complexity behind interfaces that feel obvious. That's the hard part, and we love it.",
  },
  {
    icon: Scale,
    title: "Compliance by Default",
    desc: "IT Act 2000. PAdES. eIDAS. UETA. We don't ask teams to figure out compliance -- our products are compliant out of the box, so you can focus on your actual work.",
  },
  {
    icon: Heart,
    title: "Earn Trust Daily",
    desc: "We handle documents that matter -- employment contracts, legal filings, government certificates. That's a responsibility we take seriously, every single day.",
  },
  {
    icon: Code2,
    title: "Built to Integrate",
    desc: "REST APIs, JavaScript SDKs, webhooks, JWT auth. We build for developers because document signing should slot into your stack, not replace it.",
  },
];

const stats = [
  { value: "4", label: "Products", suffix: "" },
  { value: "10K+", label: "PDFs per Batch", suffix: "" },
  { value: "3", label: "Signature Methods", suffix: "" },
  { value: "99.99%", label: "Uptime SLA", suffix: "" },
];

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function AboutPage() {
  const heroR = useReveal(0.08);
  const storyR = useReveal(0.08);
  const timelineR = useReveal(0.08);
  const productsR = useReveal(0.08);
  const valuesR = useReveal(0.08);
  const statsR = useReveal(0.08);
  const ctaR = useReveal(0.08);

  const rs = useRevealStyle;

  return (
    <main className="relative overflow-hidden">
      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[300px] right-[10%] size-[700px] rounded-full opacity-[0.035] dark:opacity-[0.055]"
          style={{
            background:
              "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[40%] -left-[200px] size-[500px] rounded-full opacity-[0.025] dark:opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--color-amber) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[200px] right-[20%] size-[400px] rounded-full opacity-[0.03] dark:opacity-[0.045]"
          style={{
            background:
              "radial-gradient(circle, var(--color-violet) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════
           HERO
         ═══════════════════════════════════════ */}
      <section className="relative pt-[140px] pb-[80px] lg:pb-[100px]">
        <div ref={heroR.ref} className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-20"
            style={rs(heroR.vis)}
          >
            {/* Left: headline */}
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
              >
                About SignSecure
              </Badge>
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
                We Make Signing
                <br />
                <span className="text-brand">Disappear</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Not the signature -- the friction. The hours spent signing
                documents one by one, the plugins that don&rsquo;t work, the
                compliance headaches. We build tools that make all of that go
                away, so you can focus on the work that matters.
              </p>
            </div>

            {/* Right: pull-quote */}
            <div
              className="shrink-0 lg:max-w-[340px]"
              style={rs(heroR.vis, 200)}
            >
              <div className="relative rounded-2xl border border-brand/15 bg-brand-muted/40 p-7">
                <div className="absolute -top-3 left-6 font-display text-5xl font-black text-brand/20">
                  &ldquo;
                </div>
                <p className="relative z-[1] text-[15px] leading-relaxed text-foreground/80">
                  Document signing should be invisible infrastructure -- fast,
                  compliant, and completely out of your way.
                </p>
                <div className="mt-4 text-xs font-semibold text-brand">
                  The SignSecure Team
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           STATS BAR
         ═══════════════════════════════════════ */}
      <section
        ref={statsR.ref}
        className="border-y border-border/50 bg-muted/40 py-12"
      >
        <div
          className="mx-auto grid max-w-[1240px] grid-cols-2 gap-4 px-4 sm:gap-8 sm:px-7 md:grid-cols-4"
          style={rs(statsR.vis)}
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl font-extrabold tracking-tight text-brand">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
           THE STORY
         ═══════════════════════════════════════ */}
      <section className="py-[100px] lg:py-[120px]">
        <div
          ref={storyR.ref}
          className="mx-auto max-w-[1240px] px-4 sm:px-7"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            {/* Left: section label + intro */}
            <div style={rs(storyR.vis)}>
              <Badge
                variant="outline"
                className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
              >
                Our Story
              </Badge>
              <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
                Born From
                <br />a Simple Frustration
              </h2>
              <p className="text-[16px] leading-[1.85] text-muted-foreground">
                We started SignSecure because we sat in the same offices where
                people were manually opening, signing, and saving PDFs one at a
                time -- thousands of them. Government departments spending entire
                weeks on what should take minutes. Banks waiting days for
                hardware-token signatures that could happen in seconds. 
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-muted-foreground">
                We didn&rsquo;t set out to build four products. We set out to
                solve one problem: make document signing fast, compliant, and
                painless. The four products are just the four shapes that
                solution took, depending on who&rsquo;s signing and how.
              </p>
            </div>

            {/* Right: timeline */}
            <div ref={timelineR.ref} className="relative">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-[18px] w-px bg-border lg:left-[22px]" />

              <div className="flex flex-col gap-10">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className="relative flex gap-5 lg:gap-7"
                    style={rs(timelineR.vis, i * 120)}
                  >
                    {/* Dot */}
                    <div className="relative z-[1] flex size-[38px] shrink-0 items-center justify-center rounded-full border-2 border-brand/30 bg-background lg:size-[46px]">
                      <div className="size-2.5 rounded-full bg-brand" />
                    </div>
                    {/* Content */}
                    <div className="pb-2 pt-1">
                      <div className="mb-1 font-mono text-[11px] font-medium tracking-wider text-brand">
                        {m.year}
                      </div>
                      <h3 className="mb-2 text-lg font-bold tracking-tight">
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           WHAT WE BUILD (4 PRODUCTS)
         ═══════════════════════════════════════ */}
      <section
        ref={productsR.ref}
        className="bg-muted/40 py-[100px] lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-10 max-w-xl sm:mb-14" style={rs(productsR.vis)}>
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
            >
              What We Build
            </Badge>
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
              Four Products. One Mission.
            </h2>
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              Each product exists because a different team had a different
              signing problem. Desktop batches, browser tokens, cloud APIs,
              complete web workflows -- pick the one that fits.
            </p>
          </div>

          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            style={rs(productsR.vis, 100)}
          >
            {products.map((product, i) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group no-underline"
                style={rs(productsR.vis, 100 + i * 80)}
              >
                <Card className="relative overflow-hidden rounded-2xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8">
                  {/* Accent top edge */}
                  <div
                    className={`absolute top-0 right-0 left-0 h-[2px] ${accentBgMap[product.accent]}`}
                    style={{
                      maskImage:
                        "linear-gradient(90deg, transparent, black, transparent)",
                    }}
                  />
                  <CardContent className="p-0">
                    <div className="mb-5 flex items-start gap-4">
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-xl border ${accentBgMutedMap[product.accent]} ${accentBorderMap[product.accent]}`}
                      >
                        <ProductIcon
                          d={product.icon}
                          size={22}
                          className={accentColorMap[product.accent]}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg font-bold tracking-tight">
                            {product.name}
                          </h3>
                          <span
                            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold ${accentBorderMap[product.accent]} ${accentColorMap[product.accent]} ${accentBgMutedMap[product.accent]}`}
                          >
                            {product.id}
                          </span>
                        </div>
                        <div
                          className={`mt-0.5 text-sm font-medium ${accentColorMap[product.accent]}`}
                        >
                          {product.tagline}
                        </div>
                      </div>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                      {product.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                            Platform
                          </div>
                          <div className="text-xs font-semibold">
                            {product.platform}
                          </div>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-8"
                        />
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                            Key Metric
                          </div>
                          <div
                            className={`text-sm font-extrabold ${accentColorMap[product.accent]}`}
                          >
                            {product.metric}{" "}
                            <span className="text-[10px] font-normal text-muted-foreground">
                              {product.metricLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           VALUES
         ═══════════════════════════════════════ */}
      <section
        ref={valuesR.ref}
        className="py-[100px] lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mb-10 text-center sm:mb-14" style={rs(valuesR.vis)}>
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
            >
              How We Work
            </Badge>
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
              What We Believe In
            </h2>
            <p className="mx-auto max-w-[560px] text-[16px] leading-relaxed text-muted-foreground">
              These aren&rsquo;t aspirational posters on a wall. They&rsquo;re
              the decisions we make every day when building products that
              handle documents people&rsquo;s livelihoods depend on.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="group rounded-2xl border border-border/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-lg"
                  style={rs(valuesR.vis, 80 + i * 70)}
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-brand-muted">
                    <Icon className="size-5 text-brand" />
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           WHO WE SERVE
         ═══════════════════════════════════════ */}
      <section className="border-y border-border/50 bg-muted/40 py-[80px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Badge
                variant="outline"
                className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
              >
                Who We Serve
              </Badge>
              <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[38px]">
                Built for Teams That
                <br />
                Can&rsquo;t Afford to Get It Wrong
              </h2>
              <p className="text-[16px] leading-[1.85] text-muted-foreground">
                Our customers don&rsquo;t sign documents for fun. They sign
                employment contracts, government certificates, legal filings,
                and financial agreements. The stakes are high, the volumes are
                large, and compliance isn&rsquo;t optional.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  label: "Government",
                  desc: "Certificates, filings, and inter-departmental approvals",
                },
                {
                  icon: Globe,
                  label: "Banking & Finance",
                  desc: "Loan documents, KYC forms, and compliance paperwork",
                },
                {
                  icon: FileCheck,
                  label: "Legal",
                  desc: "Contracts, NDAs, settlements, and court filings",
                },
                {
                  icon: Users,
                  label: "Enterprise HR",
                  desc: "Offer letters, onboarding docs, and policy acknowledgments",
                },
              ].map((sector, i) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-border/60 bg-background p-5 transition-all duration-300 hover:border-brand/20 hover:shadow-md"
                  >
                    <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-brand-muted">
                      <Icon className="size-4 text-brand" />
                    </div>
                    <div className="mb-1 text-sm font-bold">{sector.label}</div>
                    <div className="text-xs leading-relaxed text-muted-foreground">
                      {sector.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           LOCATION / BASED IN INDIA
         ═══════════════════════════════════════ */}
      <section className="py-[80px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Based in Mumbai, India
            </div>
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[38px]">
              Built in India. Built for Everyone.
            </h2>
            <p className="text-[16px] leading-[1.85] text-muted-foreground">
              SignSecure is headquartered in Mumbai. We build products that meet
              Indian compliance standards (IT Act 2000, Aadhaar eSign) while
              following global standards (PAdES, eIDAS, UETA) that make our
              signatures valid worldwide.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "IT Act 2000",
                "PAdES",
                "eIDAS Compatible",
                "UETA",
                "Aadhaar eSign",
                "SHA-256 Audit",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand/20 bg-brand-muted/50 px-3 py-1 text-xs font-medium text-brand"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           CTA
         ═══════════════════════════════════════ */}
      <section ref={ctaR.ref} className="pb-[100px] lg:pb-[120px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-muted/80 to-amber-muted/40 p-8 text-center sm:rounded-3xl sm:p-14 lg:p-20"
            style={rs(ctaR.vis)}
          >
            {/* Decorative grid lines */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="about-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#about-grid)" />
              </svg>
            </div>

            <div className="relative z-[1]">
              <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[42px]">
                Ready to See It in Action?
              </h2>
              <p className="mx-auto mb-8 max-w-[520px] text-[16px] leading-relaxed text-muted-foreground">
                Every product starts free. No credit card, no sales call
                required. Or if you want to talk first, we&rsquo;re here.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Link
                  href="https://app.signsecure.in"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-8 text-[15px] font-semibold text-brand-foreground shadow-[0_4px_20px_var(--color-brand-glow)] no-underline transition-all hover:opacity-90"
                >
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={"/contact" as any}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-8 text-[15px] font-semibold text-foreground no-underline transition-all hover:border-brand/30 hover:bg-brand-muted"
                >
                  Talk to Us
                </Link>
              </div>
              <p className="mt-5 text-xs text-muted-foreground/70">
                Free tier on all products &middot; No credit card needed
                &middot; Set up in under 5 minutes
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
