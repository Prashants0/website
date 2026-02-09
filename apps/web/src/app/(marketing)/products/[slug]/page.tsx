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
import { AnimCounter } from "@/components/landing/anim-counter";
import {
  getProductBySlug,
  products,
  type AccentColor,
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
} from "@/components/landing/svg";

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
  const archR = useReveal(0.08);
  const featuresR = useReveal(0.08);
  const useCasesR = useReveal(0.08);
  const integrationsR = useReveal(0.08);
  const pricingR = useReveal(0.08);
  const faqR = useReveal(0.08);
  const ctaR = useReveal(0.08);

  const accent = product.accent;
  const icons = useCaseIcons[slug] ?? [];

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
        className="relative overflow-hidden pt-[120px] pb-[60px]"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-[20%] -left-[10%] h-[55%] w-[55%] rounded-full ${accentBgMutedMap[accent]} blur-[100px]`}
          />
          <div className="absolute -right-[10%] -bottom-[15%] h-[40%] w-[40%] rounded-full bg-muted/50 blur-[100px]" />
          {/* Grid pattern */}
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
          className="relative z-[2] mx-auto max-w-[1240px] px-7"
          style={rs(heroR.vis)}
        >
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link
              href="/"
              className="text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <span>/</span>
            <span className={accentColorMap[accent]}>{product.name}</span>
          </div>

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
                    className={`font-mono text-xs ${accentColorMap[accent]}`}
                  >
                    {product.id}
                  </div>
                  <h1 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
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

              {/* Tech stack badges */}
              <div className="mb-6 flex flex-wrap gap-6">
                <div>
                  <div className="mb-1 font-mono text-[10px] text-muted-foreground">
                    PLATFORM
                  </div>
                  <div className="text-sm font-semibold">{product.platform}</div>
                </div>
                <div>
                  <div className="mb-1 font-mono text-[10px] text-muted-foreground">
                    TECH STACK
                  </div>
                  <div className="text-sm font-semibold">{product.tech}</div>
                </div>
                <div>
                  <div className="mb-1 font-mono text-[10px] text-muted-foreground">
                    KEY METRIC
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
                  Get Started Free
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

            {/* Right - unique SVG hero illustration */}
            <div className="flex-[1_1_50%]" style={rs(heroR.vis, 200)}>
              {productHeroSvgs[slug]}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ ARCHITECTURE FLOW ══════ */}
      <section ref={archR.ref} className="border-y bg-muted/60 py-12">
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-6 text-center" style={rs(archR.vis)}>
            <div className={`mb-2 font-mono text-xs tracking-widest ${accentColorMap[accent]}`}>
              {"// architecture"}
            </div>
            <h2 className="font-display text-xl font-extrabold tracking-tight">
              {product.name} Pipeline
            </h2>
          </div>
          <div className="overflow-x-auto" style={rs(archR.vis, 100)}>
            <div className="min-w-[660px]">
              <ProductArchSvg slug={slug} accent={accent} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FEATURES ══════ */}
      <section ref={featuresR.ref} className="py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-14 text-center" style={rs(featuresR.vis)}>
            <div
              className={`mb-3.5 font-mono text-xs tracking-widest ${accentColorMap[accent]}`}
            >
              {"// technical_features"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              Engineering-Grade Capabilities
            </h2>
            <p className="mx-auto max-w-[520px] text-muted-foreground">
              {product.name} is purpose-built for production signing workloads
              with zero compromises on security or performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1"
                style={rs(featuresR.vis, i * 80)}
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
                  <div className={`font-mono text-[10px] ${accentColorMap[accent]} opacity-80`}>
                    {product.tech.split(" / ")[0]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      <section ref={useCasesR.ref} className="bg-muted/60 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-14 text-center" style={rs(useCasesR.vis)}>
            <div
              className={`mb-3.5 font-mono text-xs tracking-widest ${accentColorMap[accent]}`}
            >
              {"// use_cases"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              Built For Your Industry
            </h2>
            <p className="mx-auto max-w-[480px] text-muted-foreground">
              Real-world deployment scenarios where {product.name} delivers
              measurable impact.
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
                    <div className={`mb-1 font-mono text-[11px] font-semibold ${accentColorMap[accent]}`}>
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

      {/* ══════ INTEGRATIONS ══════ */}
      <section ref={integrationsR.ref} className="py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-14 text-center" style={rs(integrationsR.vis)}>
            <div
              className={`mb-3.5 font-mono text-xs tracking-widest ${accentColorMap[accent]}`}
            >
              {"// integrations"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              Works With Your Stack
            </h2>
          </div>

          <div
            className="flex flex-wrap justify-center gap-3"
            style={rs(integrationsR.vis, 100)}
          >
            {product.integrations.map((integ, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 rounded-xl border px-5 py-3 ${accentBorderMap[accent]} ${accentBgMutedMap[accent]}`}
              >
                <IntegrationDotSvg accent={accent} />
                <span className="font-mono text-xs font-medium">
                  {integ}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING ══════ */}
      <section ref={pricingR.ref} className="bg-muted/60 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-14 text-center" style={rs(pricingR.vis)}>
            <div
              className={`mb-3.5 font-mono text-xs tracking-widest ${accentColorMap[accent]}`}
            >
              {"// pricing"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              {product.name} Pricing
            </h2>
            <p className="text-muted-foreground">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

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

          <div className="mt-8 text-center">
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
      <section ref={faqR.ref} className="py-[100px]">
        <div className="mx-auto max-w-[800px] px-7">
          <div className="mb-14 text-center" style={rs(faqR.vis)}>
            <div
              className={`mb-3.5 font-mono text-xs tracking-widest ${accentColorMap[accent]}`}
            >
              {"// faq"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              Technical Questions
            </h2>
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
      <section ref={ctaR.ref} className="bg-muted/60 py-[80px]">
        <div className="mx-auto max-w-[1240px] px-7">
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
