"use client";

import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Zap, Globe, Cloud, PenTool } from "lucide-react";

import {
  accentBgMap,
  accentBgMutedMap,
  accentBorderMap,
  accentColorMap,
  accentGlowMap,
} from "@/components/landing/accent-utils";
import { products, pricingFaq, signboltAddons } from "@/components/landing/data";
import { useReveal, useRevealStyle } from "@/components/landing/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProductIcon } from "@/components/landing/svg";
import { Separator } from "@/components/ui/separator";

/* ──────────────────────────────────────────
   Product icon mapping
   ────────────────────────────────────────── */
const productIcons = [Zap, Globe, Cloud, PenTool] as const;

/* ──────────────────────────────────────────
   Per-product pricing summary config
   ────────────────────────────────────────── */
const pricingCards = [
  {
    slug: "signbolt",
    headline: "$149",
    period: "/user/year",
    subline: "Per-user license. Free demo available.",
    highlights: [
      "Unlimited PDFs — no caps",
      "Unlimited certificates",
      "Signing templates",
      "Word to PDF conversion",
      "PDF merging",
      "Email support",
    ],
    cta: "Try Demo Free",
    ctaHref: "/products/signbolt",
    note: "Demo mode: full features, watermarked output",
  },
  {
    slug: "signbridge",
    headline: "Custom",
    period: "",
    subline: "Priced for your team, your scale.",
    highlights: [
      "Unlimited PDFs & connected apps",
      "Full JavaScript SDK",
      "Encryption & batch operations",
      "USB token & smart card support",
      "HMAC-SHA256 session isolation",
      "Priority support",
    ],
    cta: "Talk to Us",
    ctaHref: "/contact",
    note: "Free tier available for development",
  },
  {
    slug: "signlift",
    headline: "Custom",
    period: "",
    subline: "Priced for your integration & volume.",
    highlights: [
      "Unlimited API calls",
      "Full REST API access",
      "PKCS#12 certificate management",
      "AcroForm field lifecycle",
      "AWS Lambda or Spring Boot",
      "Custom SLA & deployment",
    ],
    cta: "Talk to Us",
    ctaHref: "/contact",
    note: "Self-hosted — you own the deployment",
  },
  {
    slug: "signpad",
    headline: "$0.20",
    period: "/credit",
    subline: "Pay per document. Volume discounts available.",
    highlights: [
      "All 3 signing methods included",
      "Drag-and-drop editor",
      "Sequential & parallel workflows",
      "SHA-256 audit trail",
      "Webhooks & REST API",
      "Custom branding",
    ],
    cta: "Start Free",
    ctaHref: "/products/signpad",
    note: "5 free credits/month. Credits never expire.",
  },
];

export default function PricingPage() {
  const rs = useRevealStyle;
  const heroR = useReveal(0.1);
  const cardsR = useReveal(0.08);
  const addonsR = useReveal(0.08);
  const faqR = useReveal(0.08);
  const ctaR = useReveal(0.08);

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section
        ref={heroR.ref}
        className="relative overflow-hidden pt-[140px] pb-[80px]"
      >
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[25%] -left-[15%] h-[60%] w-[60%] rounded-full bg-brand-glow blur-[120px]" />
          <div className="absolute -right-[12%] -bottom-[20%] h-[45%] w-[45%] rounded-full bg-amber-muted blur-[120px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse 70% 50% at 50% 40%, black, transparent)",
            }}
          />
        </div>

        <div
          className="relative z-[2] mx-auto max-w-[1240px] px-4 text-center sm:px-7"
          style={rs(heroR.vis)}
        >
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
            <Link
              href="/"
              className="text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-brand">Pricing</span>
          </div>

          <Badge
            variant="outline"
            className="mb-7 rounded-full border-brand/30 bg-brand-muted px-4 py-2 font-mono text-xs font-medium text-brand"
          >
            <span className="mr-2 inline-block size-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-brand" />
            Four Products. One Account.
          </Badge>

          <h1 className="mb-6 font-display text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
            Simple, Transparent
            <br />
            <span className="text-brand">Pricing</span>
          </h1>

          <p className="mx-auto mb-10 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
            Each product has its own pricing model that matches how it works.
            Every product starts free. No credit card required.
          </p>

          <div className="flex flex-wrap justify-center gap-5 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="size-3.5 text-success" />
              Free tier on every product
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-3.5 text-success" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-3.5 text-success" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4 PRODUCT PRICING CARDS
          ═══════════════════════════════════════ */}
      <section ref={cardsR.ref} className="py-[80px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {pricingCards.map((card, i) => {
              const product = products[i];
              const Icon = productIcons[i];
              const accent = product.accent;

              return (
                <div
                  key={card.slug}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accentBorderMap[accent]}`}
                  style={rs(cardsR.vis, i * 80)}
                >
                  {/* Accent top bar */}
                  <div className={`h-[3px] w-full ${accentBgMap[accent]}`} />

                  <div className="flex flex-1 flex-col p-7">
                    {/* Product identity */}
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className={`flex size-10 items-center justify-center rounded-xl border ${accentBgMutedMap[accent]} ${accentBorderMap[accent]}`}
                      >
                        <ProductIcon
                          d={product.icon}
                          size={20}
                          className={accentColorMap[accent]}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold tracking-tight">
                          {product.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {product.platform}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-1">
                      <span
                        className={`font-display text-[40px] font-extrabold leading-none tracking-tight ${accentColorMap[accent]}`}
                      >
                        {card.headline}
                      </span>
                      {card.period && (
                        <span className="ml-1 text-sm text-muted-foreground">
                          {card.period}
                        </span>
                      )}
                    </div>
                    <p className="mb-5 text-xs text-muted-foreground">
                      {card.subline}
                    </p>

                    {/* Divider */}
                    <div
                      className={`mb-5 h-px ${accentBgMutedMap[accent]}`}
                    />

                    {/* Features */}
                    <ul className="mb-6 flex-1 list-none space-y-2.5">
                      {card.highlights.map((feat, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2 text-[12px] leading-snug text-muted-foreground"
                        >
                          <div
                            className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${accentBgMutedMap[accent]}`}
                          >
                            <svg
                              viewBox="0 0 12 12"
                              fill="none"
                              className="size-2.5"
                            >
                              <path
                                d="M3 6 L5 8 L9 4"
                                stroke={`var(--color-${accent})`}
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      className={`w-full rounded-xl py-3 text-sm font-semibold ${accentBgMap[accent]} text-white ${accentGlowMap[accent]} hover:opacity-90`}
                      render={
                        card.ctaHref.startsWith("/contact") ? (
                          <Link href={card.ctaHref as any} />
                        ) : (
                          <Link href={card.ctaHref as any} />
                        )
                      }
                    >
                      {card.cta}
                      <ArrowRight className="ml-1.5 size-3.5" />
                    </Button>

                    {/* Footnote */}
                    <p className="mt-3 text-center text-[10px] text-muted-foreground/60">
                      {card.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* "View full details" links */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
            style={rs(cardsR.vis, 400)}
          >
            {products.map((p, i) => {
              const Icon = productIcons[i];
              return (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className={`flex items-center gap-2 text-xs font-semibold no-underline transition-colors hover:text-foreground ${accentColorMap[p.accent]}`}
                >
                  <Icon className="size-3.5" />
                  {p.name} details
                  <ArrowRight className="size-3" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SIGNBOLT ADD-ONS STRIP
          ═══════════════════════════════════════ */}
      <section
        ref={addonsR.ref}
        className="border-y border-border/50 bg-muted/30 py-[60px]"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="mb-8 flex items-center gap-4"
            style={rs(addonsR.vis)}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-brand-muted">
              <Zap className="size-4 text-brand" />
            </div>
            <div>
              <h3 className="text-sm font-bold">SignBolt Add-ons</h3>
              <p className="text-xs text-muted-foreground">
                Optional features available with any SignBolt license
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            style={rs(addonsR.vis, 80)}
          >
            {signboltAddons.map((addon, i) => (
              <div
                key={i}
                className="group rounded-xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-md"
              >
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm font-semibold">{addon.name}</span>
                  <span className="rounded-lg bg-brand-muted px-2 py-0.5 font-mono text-xs font-bold text-brand">
                    {addon.price}
                    <span className="ml-0.5 text-[9px] font-normal text-brand/60">
                      {addon.period}
                    </span>
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {addon.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section ref={faqR.ref} className="py-[100px]">
        <div className="mx-auto max-w-[800px] px-4 sm:px-7">
          <div className="mb-14 text-center" style={rs(faqR.vis)}>
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
            >
              Common Questions
            </Badge>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[480px] text-muted-foreground">
              Everything you need to know about pricing, billing, and plans
              across all SignSecure products.
            </p>
          </div>

          <div style={rs(faqR.vis, 100)}>
            <Accordion>
              {pricingFaq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-[15px] font-semibold">
                    <HelpCircle className="mr-2 size-4 shrink-0 text-brand opacity-50" />
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

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <section ref={ctaR.ref} className="bg-muted/50 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-muted to-amber-muted p-8 text-center sm:rounded-3xl sm:p-16 lg:p-20"
            style={rs(ctaR.vis)}
          >
            {/* Grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="relative z-[2]">
              <Badge
                variant="outline"
                className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
              >
                Get Started
              </Badge>
              <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[42px]">
                Ready to Start Signing?
              </h2>
              <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">
                Every product starts with a generous free tier. No credit card
                needed. Start signing documents in minutes.
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
                  render={<Link href={"/contact" as any} />}
                >
                  Talk to Us
                </Button>
              </div>
              <p className="mt-5 font-mono text-xs text-muted-foreground/70">
                Free tier available on all products &middot; Upgrade or
                downgrade anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
