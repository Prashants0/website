"use client";

import { useState } from "react";

import Link from "next/link";
import { ArrowRight, Check, HelpCircle } from "lucide-react";

import {
  accentBgMap,
  accentBgMutedMap,
  accentBorderMap,
  accentColorMap,
  accentGlowMap,
} from "@/components/landing/accent-utils";
import { products, pricingFaq } from "@/components/landing/data";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductIcon } from "@/components/landing/svg";

export default function PricingPage() {
  const [activeProduct, setActiveProduct] = useState(0);

  const rs = useRevealStyle;
  const heroR = useReveal(0.1);
  const tabsR = useReveal(0.08);
  const compareR = useReveal(0.08);
  const faqR = useReveal(0.08);
  const ctaR = useReveal(0.08);

  const ap = products[activeProduct];

  return (
    <>
      {/* ══════ PRICING HERO ══════ */}
      <section
        ref={heroR.ref}
        className="relative overflow-hidden pt-[120px] pb-[60px]"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] h-[55%] w-[55%] rounded-full bg-brand-glow blur-[100px]" />
          <div className="absolute -right-[10%] -bottom-[15%] h-[40%] w-[40%] rounded-full bg-violet-muted blur-[100px]" />
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
          className="relative z-[2] mx-auto max-w-[1240px] px-7 text-center"
          style={rs(heroR.vis)}
        >
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
            <Link
              href="/"
              className="transition-colors hover:text-foreground no-underline text-muted-foreground"
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
            Transparent Pricing for Every Scale
          </Badge>

          <h1 className="mb-5 font-display text-5xl font-black leading-[1.05] tracking-tight lg:text-[60px]">
            Simple, Predictable
            <br />
            <span className="text-brand">Pricing</span>
          </h1>

          <p className="mx-auto mb-8 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
            Start free on every product. Scale as your signing needs grow. No
            hidden fees, no surprises -- just straightforward plans that grow
            with you.
          </p>

          <div className="flex flex-wrap justify-center gap-4 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="size-3.5 text-success" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-3.5 text-success" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-3.5 text-success" />
              20% off annual billing
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PRODUCT PRICING TABS ══════ */}
      <section ref={tabsR.ref} className="py-[80px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-14 text-center" style={rs(tabsR.vis)}>
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// select_product"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              Choose Your Product
            </h2>
            <p className="mx-auto max-w-[480px] text-muted-foreground">
              Each product has its own pricing tiers. Select a product to see
              detailed plans and features.
            </p>
          </div>

          <Tabs
            value={String(activeProduct)}
            onValueChange={(v) => setActiveProduct(Number(v))}
            className="w-full"
          >
            <div
              className="mb-12 flex justify-center"
              style={rs(tabsR.vis, 100)}
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
                    <ProductIcon d={p.icon} size={16} className={`mr-2 ${accentColorMap[p.accent]}`} />
                    {p.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {products.map((product, pi) => (
              <TabsContent key={pi} value={String(pi)}>
                {/* Product summary */}
                <div
                  className="mb-10 text-center"
                  style={rs(tabsR.vis, 150)}
                >
                  <h3
                    className={`mb-2 font-display text-2xl font-extrabold ${accentColorMap[product.accent]}`}
                  >
                    {product.name}
                  </h3>
                  <p className="mx-auto max-w-[500px] text-sm text-muted-foreground">
                    {product.tagline} -- {product.desc.split(".")[0]}.
                  </p>
                  <div className="mt-4 flex justify-center gap-6">
                    <div>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        PLATFORM
                      </span>
                      <div className="text-sm font-semibold">
                        {product.platform}
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        KEY METRIC
                      </span>
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
                </div>

                {/* Pricing cards */}
                <div
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                  style={rs(tabsR.vis, 200)}
                >
                  {product.pricing.map((plan, i) => (
                    <Card
                      key={i}
                      className={`relative flex flex-col overflow-hidden rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        plan.popular
                          ? `${accentBorderMap[product.accent]} border-2 shadow-lg`
                          : ""
                      }`}
                    >
                      {plan.popular && (
                        <>
                          <div
                            className={`absolute top-0 right-0 left-0 h-[3px] ${accentBgMap[product.accent]}`}
                          />
                          <Badge
                            className={`absolute top-4 right-4 rounded-full ${accentBgMap[product.accent]} px-2.5 py-0.5 text-[10px] font-semibold text-white`}
                          >
                            Most Popular
                          </Badge>
                        </>
                      )}
                      <CardHeader className="p-0">
                        <CardDescription
                          className={`text-sm font-semibold ${accentColorMap[product.accent]}`}
                        >
                          {plan.tier}
                        </CardDescription>
                        <CardTitle className="mt-3">
                          <span className="font-display text-[42px] font-extrabold leading-none">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="ml-1 text-sm text-muted-foreground">
                              {plan.period}
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 p-0 pt-6">
                        <Separator className="mb-6" />
                        <ul className="list-none space-y-3">
                          {plan.features.map((f, fi) => (
                            <li
                              key={fi}
                              className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                            >
                              <Check
                                className={`mt-0.5 size-3.5 shrink-0 ${accentColorMap[product.accent]}`}
                              />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="border-0 p-0 pt-8">
                        <Button
                          variant={plan.popular ? "default" : "outline"}
                          className={`w-full rounded-xl py-3 text-sm font-semibold ${
                            plan.popular
                              ? `${accentBgMap[product.accent]} text-white ${accentGlowMap[product.accent]} hover:opacity-90`
                              : `${accentColorMap[product.accent]}`
                          }`}
                        >
                          {plan.cta}
                          {plan.popular && (
                            <ArrowRight className="ml-1.5 size-3.5" />
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Product-specific link */}
                <div className="mt-8 text-center" style={rs(tabsR.vis, 250)}>
                  <Button
                    variant="ghost"
                    className={`${accentColorMap[product.accent]}`}
                    render={
                      <Link href={`/products/${product.slug}`} />
                    }
                  >
                    Learn more about {product.name}
                    <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ══════ COMPARE ALL PRODUCTS ══════ */}
      <section ref={compareR.ref} className="bg-muted/60 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="mb-14 text-center" style={rs(compareR.vis)}>
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// compare_plans"}
            </div>
            <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight">
              Compare All Products
            </h2>
            <p className="mx-auto max-w-[520px] text-muted-foreground">
              See how our products stack up side by side. Pick the one that
              fits your architecture and signing needs.
            </p>
          </div>

          {/* Side-by-side pricing comparison */}
          <div
            className="overflow-x-auto"
            style={rs(compareR.vis, 120)}
          >
            <table className="w-full overflow-hidden rounded-2xl border text-sm shadow-md">
              <thead>
                <tr>
                  <th className="border-b border-r bg-brand px-5 py-4 text-left text-[13px] font-semibold text-brand-foreground">
                    Plan
                  </th>
                  {products.map((p, i) => (
                    <th
                      key={i}
                      className="border-b border-r last:border-r-0 bg-muted px-5 py-4 text-center"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <ProductIcon d={p.icon} size={18} className={accentColorMap[p.accent]} />
                        <span className="text-[13px] font-semibold">
                          {p.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Free", "Starter", "Pro", "Enterprise"].map(
                  (tierName, ri) => (
                    <tr key={tierName}>
                      <td
                        className={`border-b border-r px-5 py-4 font-semibold ${
                          ri % 2 === 0 ? "bg-muted/50" : "bg-background"
                        }`}
                      >
                        {tierName}
                      </td>
                      {products.map((p, pi) => {
                        const tier = p.pricing.find(
                          (t) => t.tier === tierName
                        );
                        return (
                          <td
                            key={pi}
                            className={`border-b border-r last:border-r-0 px-5 py-4 text-center ${
                              ri % 2 === 0 ? "bg-muted/50" : "bg-background"
                            }`}
                          >
                            <div
                              className={`font-display text-xl font-extrabold ${accentColorMap[p.accent]}`}
                            >
                              {tier?.price ?? "--"}
                            </div>
                            {tier?.period && (
                              <div className="text-[11px] text-muted-foreground">
                                {tier.period}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Feature highlights per tier */}
          <div
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            style={rs(compareR.vis, 200)}
          >
            {products.map((p, i) => (
              <Card
                key={i}
                className={`rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  activeProduct === i
                    ? `${accentBorderMap[p.accent]} border shadow-lg`
                    : ""
                }`}
              >
                <CardHeader className="p-0">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl border ${accentBgMutedMap[p.accent]} ${accentBorderMap[p.accent]}`}
                    >
                      <ProductIcon d={p.icon} size={20} className={accentColorMap[p.accent]} />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold">
                        {p.name}
                      </CardTitle>
                      <CardDescription
                        className={`text-xs font-medium ${accentColorMap[p.accent]}`}
                      >
                        {p.tagline}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-3">
                  <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">
                    {p.desc.split(".")[0]}.
                  </p>
                  <div className="mb-4 text-xs text-muted-foreground">
                    Starting at{" "}
                    <span
                      className={`font-display text-lg font-extrabold ${accentColorMap[p.accent]}`}
                    >
                      {p.pricing[0].price}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full rounded-lg text-xs font-semibold ${accentColorMap[p.accent]}`}
                    render={
                      <Link href={`/products/${p.slug}`} />
                    }
                  >
                    View Details
                    <ArrowRight className="ml-1 size-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section ref={faqR.ref} className="py-[100px]">
        <div className="mx-auto max-w-[800px] px-7">
          <div className="mb-14 text-center" style={rs(faqR.vis)}>
            <div className="mb-3.5 font-mono text-xs tracking-widest text-brand">
              {"// pricing_faq"}
            </div>
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

      {/* ══════ CTA ══════ */}
      <section ref={ctaR.ref} className="bg-muted/60 py-[100px]">
        <div className="mx-auto max-w-[1240px] px-7">
          <div
            className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand-muted to-violet-muted p-20 text-center"
            style={rs(ctaR.vis)}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="relative z-[2]">
              <div className="mb-5 font-mono text-xs tracking-widest text-brand">
                {"// get_started"}
              </div>
              <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight lg:text-[42px]">
                Ready to Start Signing?
              </h2>
              <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">
                Every product starts with a generous free tier. No credit card
                needed. Deploy enterprise signing infrastructure in minutes.
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
                  Talk to Sales
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
