"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  MessageSquare,
  Building2,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useReveal, useRevealStyle } from "@/components/landing/hooks";

/* ═══════════════════════════════════════════════════════════
   CONTACT REASONS
   ═══════════════════════════════════════════════════════════ */

const contactReasons = [
  {
    icon: Building2,
    label: "Enterprise Sales",
    value: "enterprise",
    desc: "Custom pricing, dedicated support, SLA agreements",
  },
  {
    icon: Headphones,
    label: "Technical Support",
    value: "support",
    desc: "Help with setup, integration, or troubleshooting",
  },
  {
    icon: MessageSquare,
    label: "Partnership",
    value: "partnership",
    desc: "Reseller, integration, or technology partnerships",
  },
  {
    icon: Mail,
    label: "General Inquiry",
    value: "general",
    desc: "Anything else — we're happy to help",
  },
] as const;

const officeInfo = [
  {
    icon: MapPin,
    label: "Office",
    value: "Mumbai, Maharashtra, India",
    detail: null,
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@signsecure.in",
    detail: "support@signsecure.in",
    href: "mailto:hello@signsecure.in",
    detailHref: "mailto:support@signsecure.in",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    detail: "Enterprise: Under 4 hours",
  },
] as const;

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function ContactPage() {
  const [selectedReason, setSelectedReason] = useState("enterprise");
  const [submitted, setSubmitted] = useState(false);

  const heroReveal = useReveal(0.08);
  const formReveal = useReveal(0.08);
  const infoReveal = useReveal(0.08);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      reason: "enterprise",
      message: "",
    },
    onSubmit: async ({ value }) => {
      // Simulate form submission
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you shortly.");
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.email("Please enter a valid email address"),
        company: z.string(),
        reason: z.string(),
        message: z.string().min(10, "Please tell us a bit more (at least 10 characters)"),
      }),
    },
  });

  return (
    <main className="relative overflow-hidden">
      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[200px] -right-[200px] size-[600px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[300px] -left-[200px] size-[500px] rounded-full opacity-[0.03] dark:opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, var(--color-violet) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════
           HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative pt-[140px] pb-[60px] lg:pb-[80px]">
        <div
          ref={heroReveal.ref}
          className="mx-auto max-w-[1240px] px-4 sm:px-7"
        >
          <div className="max-w-2xl" style={useRevealStyle(heroReveal.vis)}>
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
            >
              Contact Us
            </Badge>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
              Let&rsquo;s Talk
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Whether you need enterprise pricing, technical help, or want to
              explore a partnership — we&rsquo;re here and we respond fast.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           FORM + INFO SPLIT
         ═══════════════════════════════════════ */}
      <section className="relative pb-[100px] lg:pb-[120px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-20">
            {/* ── Left: Contact Form ── */}
            <div ref={formReveal.ref} style={useRevealStyle(formReveal.vis)}>
              {submitted ? (
                <SuccessState onReset={() => setSubmitted(false)} />
              ) : (
                <div className="rounded-2xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur-sm lg:p-10">
                  {/* Reason selector */}
                  <div className="mb-8">
                    <h2 className="mb-4 font-display text-xl font-bold tracking-tight">
                      What can we help you with?
                    </h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {contactReasons.map((reason) => {
                        const Icon = reason.icon;
                        const isSelected = selectedReason === reason.value;
                        return (
                          <button
                            key={reason.value}
                            type="button"
                            onClick={() => {
                              setSelectedReason(reason.value);
                              form.setFieldValue("reason", reason.value);
                            }}
                            className={`group flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                              isSelected
                                ? "border-brand/40 bg-brand-muted shadow-[0_0_0_1px_var(--color-brand-glow)]"
                                : "border-border/50 bg-transparent hover:border-border hover:bg-muted/40"
                            }`}
                          >
                            <div
                              className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isSelected
                                  ? "bg-brand text-brand-foreground"
                                  : "bg-muted text-muted-foreground group-hover:text-foreground"
                              }`}
                            >
                              <Icon className="size-4" />
                            </div>
                            <div>
                              <div
                                className={`text-sm font-semibold transition-colors ${
                                  isSelected
                                    ? "text-brand"
                                    : "text-foreground"
                                }`}
                              >
                                {reason.label}
                              </div>
                              <div className="mt-0.5 text-xs text-muted-foreground">
                                {reason.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  {/* Form fields */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <form.Field name="name">
                        {(field) => (
                          <div className="space-y-2">
                            <Label
                              htmlFor={field.name}
                              className="text-xs font-medium text-muted-foreground"
                            >
                              Full Name <span className="text-brand">*</span>
                            </Label>
                            <Input
                              id={field.name}
                              name={field.name}
                              placeholder="Jane Doe"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="h-10 rounded-lg bg-background px-3 text-sm"
                            />
                            {field.state.meta.errors.map((error) => (
                              <p
                                key={error?.message}
                                className="text-xs text-destructive"
                              >
                                {error?.message}
                              </p>
                            ))}
                          </div>
                        )}
                      </form.Field>

                      {/* Email */}
                      <form.Field name="email">
                        {(field) => (
                          <div className="space-y-2">
                            <Label
                              htmlFor={field.name}
                              className="text-xs font-medium text-muted-foreground"
                            >
                              Work Email <span className="text-brand">*</span>
                            </Label>
                            <Input
                              id={field.name}
                              name={field.name}
                              type="email"
                              placeholder="jane@company.com"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="h-10 rounded-lg bg-background px-3 text-sm"
                            />
                            {field.state.meta.errors.map((error) => (
                              <p
                                key={error?.message}
                                className="text-xs text-destructive"
                              >
                                {error?.message}
                              </p>
                            ))}
                          </div>
                        )}
                      </form.Field>
                    </div>

                    {/* Company */}
                    <form.Field name="company">
                      {(field) => (
                        <div className="space-y-2">
                          <Label
                            htmlFor={field.name}
                            className="text-xs font-medium text-muted-foreground"
                          >
                            Company
                          </Label>
                          <Input
                            id={field.name}
                            name={field.name}
                            placeholder="Your organization (optional)"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            className="h-10 rounded-lg bg-background px-3 text-sm"
                          />
                        </div>
                      )}
                    </form.Field>

                    {/* Message */}
                    <form.Field name="message">
                      {(field) => (
                        <div className="space-y-2">
                          <Label
                            htmlFor={field.name}
                            className="text-xs font-medium text-muted-foreground"
                          >
                            How can we help?{" "}
                            <span className="text-brand">*</span>
                          </Label>
                          <textarea
                            id={field.name}
                            name={field.name}
                            rows={5}
                            placeholder="Tell us about your use case, team size, questions, or anything else..."
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:outline-none"
                          />
                          {field.state.meta.errors.map((error) => (
                            <p
                              key={error?.message}
                              className="text-xs text-destructive"
                            >
                              {error?.message}
                            </p>
                          ))}
                        </div>
                      )}
                    </form.Field>

                    {/* Submit */}
                    <form.Subscribe>
                      {(state) => (
                        <button
                          type="submit"
                          disabled={
                            !state.canSubmit || state.isSubmitting
                          }
                          className="group inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-brand-foreground shadow-[0_4px_16px_var(--color-brand-glow)] transition-all hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                        >
                          {state.isSubmitting ? (
                            <>
                              <span className="size-4 animate-spin rounded-full border-2 border-brand-foreground/30 border-t-brand-foreground" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
                      )}
                    </form.Subscribe>

                    <p className="text-[11px] text-muted-foreground/70">
                      We typically respond within 24 hours. Enterprise inquiries
                      get priority.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* ── Right: Contact Info Sidebar ── */}
            <div
              ref={infoReveal.ref}
              style={useRevealStyle(infoReveal.vis, 150)}
              className="flex flex-col gap-8"
            >
              {/* Direct channels */}
              <div className="rounded-2xl border border-border/60 bg-card/60 p-7 shadow-sm backdrop-blur-sm">
                <h3 className="mb-5 font-display text-lg font-bold tracking-tight">
                  Reach us directly
                </h3>
                <div className="flex flex-col gap-5">
                  {officeInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Icon className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            {item.label}
                          </div>
                          {"href" in item && item.href ? (
                            <a
                              href={item.href}
                              className="text-sm font-medium text-foreground no-underline transition-colors hover:text-brand"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-sm font-medium text-foreground">
                              {item.value}
                            </div>
                          )}
                          {item.detail && (
                            <>
                              {"detailHref" in item && item.detailHref ? (
                                <a
                                  href={item.detailHref}
                                  className="text-xs text-muted-foreground no-underline transition-colors hover:text-brand"
                                >
                                  {item.detail}
                                </a>
                              ) : (
                                <div className="text-xs text-muted-foreground">
                                  {item.detail}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FAQ-style quick answers */}
              <div className="rounded-2xl border border-border/60 bg-card/60 p-7 shadow-sm backdrop-blur-sm">
                <h3 className="mb-4 font-display text-lg font-bold tracking-tight">
                  Quick answers
                </h3>
                <div className="flex flex-col gap-4">
                  <QuickAnswer
                    q="Do you offer a free trial?"
                    a="Every product has a free tier or demo mode. No credit card needed."
                  />
                  <QuickAnswer
                    q="How fast is onboarding?"
                    a="Most teams are up and running in under a day. Enterprise setups take 1-2 weeks."
                  />
                  <QuickAnswer
                    q="Can I switch products later?"
                    a="Absolutely. Your SignSecure account works across all four products."
                  />
                </div>
              </div>

              {/* Trust strip */}
              <div className="rounded-2xl border border-brand/15 bg-brand-muted/50 p-7">
                <div className="flex items-center gap-3 text-sm font-medium text-brand">
                  <div className="flex size-8 items-center justify-center rounded-full bg-brand/10">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      Trusted by teams across India
                    </div>
                    <div className="text-xs font-normal text-brand/70">
                      Government, banking, legal, and enterprise clients
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           BOTTOM CTA STRIP
         ═══════════════════════════════════════ */}
      <section className="border-t border-border/50 bg-muted/30 py-16">
        <div className="mx-auto max-w-[1240px] px-4 text-center sm:px-7">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Prefer email?
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight lg:text-3xl">
            Drop us a line anytime
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@signsecure.in"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-medium text-foreground no-underline transition-all hover:border-brand/30 hover:bg-brand-muted"
            >
              <Mail className="size-3.5 text-brand" />
              hello@signsecure.in
            </a>
            <a
              href="mailto:support@signsecure.in"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-medium text-foreground no-underline transition-all hover:border-brand/30 hover:bg-brand-muted"
            >
              <Headphones className="size-3.5 text-brand" />
              support@signsecure.in
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-success/20 bg-success-muted/30 px-8 py-20 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 className="size-8 text-success" />
      </div>
      <h2 className="font-display text-2xl font-bold tracking-tight">
        Message received
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Thanks for reaching out. Our team will review your message and get back
        to you within 24 hours. Enterprise inquiries are prioritized.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
      >
        Send another message
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

function QuickAnswer({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-foreground">{q}</div>
      <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
        {a}
      </div>
    </div>
  );
}
