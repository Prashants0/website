"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useReveal, useRevealStyle } from "@/components/landing/hooks";

/* ═══════════════════════════════════════════════════════════
   TERMS OF SERVICE
   Unified for all SignSecure products:
   SignBolt, SignBridge, SignLift, SignPad
   ═══════════════════════════════════════════════════════════ */

const EFFECTIVE_DATE = "February 9, 2026";

export default function TermsOfServicePage() {
  const heroR = useReveal(0.08);
  const contentR = useReveal(0.08);
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
      </div>

      {/* ═══════════════════════════════════════
           HERO
         ═══════════════════════════════════════ */}
      <section className="relative pt-[140px] pb-[60px]">
        <div ref={heroR.ref} className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="max-w-3xl" style={rs(heroR.vis)}>
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-brand/30 bg-brand-muted px-3 py-1 text-xs text-brand"
            >
              Legal
            </Badge>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Effective date: {EFFECTIVE_DATE}
            </p>
            <p className="mt-2 text-sm text-muted-foreground/70">
              These terms apply to all SignSecure products &mdash; SignBolt,
              SignBridge, SignLift, and SignPad.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           CONTENT
         ═══════════════════════════════════════ */}
      <section ref={contentR.ref} className="pb-[100px] lg:pb-[120px]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="mx-auto max-w-3xl space-y-12"
            style={rs(contentR.vis)}
          >
            {/* ── 1. Agreement to Terms ── */}
            <Section num="1" title="Agreement to Terms">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a
                legally binding agreement between you (&ldquo;you&rdquo; or
                &ldquo;Customer&rdquo;) and{" "}
                <strong>SignSecure</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
                or &ldquo;Company&rdquo;), a company headquartered in Mumbai,
                India, operating the website{" "}
                <a
                  href="https://signsecure.in"
                  className="text-brand underline underline-offset-2"
                >
                  signsecure.in
                </a>{" "}
                and all related products and services.
              </p>
              <p>
                By accessing or using any SignSecure product &mdash; including
                SignBolt, SignBridge, SignLift, and SignPad (collectively, the
                &ldquo;Services&rdquo;) &mdash; you agree to be bound by these
                Terms. If you do not agree, do not use the Services.
              </p>
              <p>
                If you are using the Services on behalf of an organization, you
                represent and warrant that you have the authority to bind that
                organization to these Terms.
              </p>
            </Section>

            {/* ── 2. Description of Services ── */}
            <Section num="2" title="Description of Services">
              <p>
                SignSecure provides document signing solutions through four
                products:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>SignBolt</strong> &mdash; A Windows desktop application
                  for batch signing PDFs using digital certificates (USB tokens,
                  smart cards, or .pfx files).
                </li>
                <li>
                  <strong>SignBridge</strong> &mdash; A Windows desktop companion
                  and browser SDK that enables hardware-token digital signing
                  from any website.
                </li>
                <li>
                  <strong>SignLift</strong> &mdash; A self-hosted REST API for
                  server-side PDF signing with PKCS#12 certificates.
                </li>
                <li>
                  <strong>SignPad</strong> &mdash; A web-based document signing
                  platform supporting electronic signatures, USB digital
                  certificate (DSC) signing, and Aadhaar OTP eSign.
                </li>
              </ul>
              <p>
                We may update, modify, or discontinue any feature of the
                Services at any time. Material changes will be communicated via
                email or through the relevant product interface with reasonable
                advance notice.
              </p>
            </Section>

            {/* ── 3. Account Registration ── */}
            <Section num="3" title="Account Registration &amp; Eligibility">
              <p>
                Certain Services require you to create a SignSecure account. When
                registering, you agree to:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Provide accurate, current, and complete registration
                  information.
                </li>
                <li>
                  Maintain and promptly update your information to keep it
                  accurate.
                </li>
                <li>
                  Maintain the security and confidentiality of your login
                  credentials.
                </li>
                <li>
                  Accept responsibility for all activity that occurs under your
                  account.
                </li>
              </ul>
              <p>
                You must be at least 18 years of age (or the age of majority in
                your jurisdiction) to use the Services. By using the Services,
                you represent that you meet this requirement.
              </p>
            </Section>

            {/* ── 4. Permitted Use ── */}
            <Section num="4" title="Permitted Use">
              <p>You agree to use the Services only for lawful purposes. You shall not:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Use the Services to sign, transmit, or store any document or
                  content that is unlawful, fraudulent, defamatory, obscene, or
                  otherwise objectionable.
                </li>
                <li>
                  Attempt to reverse-engineer, decompile, or disassemble any
                  component of the Services.
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Services or the data contained therein.
                </li>
                <li>
                  Access or attempt to access the Services through automated
                  means (bots, scrapers, etc.) except through our published
                  APIs.
                </li>
                <li>
                  Resell, sublicense, or redistribute any part of the Services
                  without our prior written consent.
                </li>
                <li>
                  Use the Services in violation of any applicable law,
                  regulation, or third-party right.
                </li>
              </ul>
            </Section>

            {/* ── 5. Product-Specific Terms ── */}
            <Section num="5" title="Product-Specific Terms">
              <h4 className="mt-4 mb-2 text-[15px] font-bold">
                5.1 SignBolt
              </h4>
              <p>
                SignBolt is licensed on a per-user, per-year basis. Each license
                is for a single named user and may not be shared or transferred.
                The Demo Mode is free and includes all features but applies a
                watermark to signed PDFs. Add-on features (Auto Email Delivery,
                Word to PDF Signing, Multi-Folder Merge) are available as
                separate annual subscriptions.
              </p>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                5.2 SignBridge
              </h4>
              <p>
                SignBridge pricing is determined on a per-organization basis. By
                using SignBridge, you acknowledge that the software creates a
                local connection between your browser and your hardware signing
                device. Private keys never leave your hardware token. SignSecure
                does not have access to your private keys at any time.
              </p>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                5.3 SignLift
              </h4>
              <p>
                SignLift is a self-hosted signing engine. You are responsible for
                deploying and maintaining your own SignLift instance (Spring Boot
                or AWS Lambda). SignSecure provides the software and
                documentation; you are responsible for your infrastructure,
                certificate management, and data security in your deployment
                environment.
              </p>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                5.4 SignPad
              </h4>
              <p>
                SignPad uses credit-based pricing. One credit equals one document
                sent for signing, regardless of the number of signers. Credits
                do not expire. Your account may include free monthly credits as
                described in the applicable plan. Volume discounts apply as
                published on our pricing page. Aadhaar OTP eSign is subject to
                the availability and terms of the Aadhaar eSign gateway provider
                and requires valid Aadhaar credentials from each signer.
              </p>
            </Section>

            {/* ── 6. Fees & Payment ── */}
            <Section num="6" title="Fees &amp; Payment">
              <p>
                Fees for the Services are as published on our{" "}
                <Link
                  href="/pricing"
                  className="text-brand underline underline-offset-2"
                >
                  pricing page
                </Link>{" "}
                or as agreed in a separate order form or enterprise agreement.
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  All fees are quoted in US Dollars (USD) unless otherwise
                  stated. Applicable taxes (including GST for Indian customers)
                  will be added where required by law.
                </li>
                <li>
                  Subscription fees (SignBolt, add-ons) are billed annually in
                  advance. Credit purchases (SignPad) are billed at the time of
                  purchase.
                </li>
                <li>
                  We accept major credit cards (Visa, Mastercard, Amex), wire
                  transfers, and UPI/NetBanking for Indian customers.
                </li>
                <li>
                  If you fail to pay any amount when due, we may suspend or
                  terminate your access to the Services after providing
                  reasonable notice and an opportunity to cure.
                </li>
              </ul>
            </Section>

            {/* ── 7. Intellectual Property ── */}
            <Section num="7" title="Intellectual Property">
              <p>
                All intellectual property rights in the Services &mdash;
                including software, APIs, SDKs, documentation, branding, and
                user interface designs &mdash; are and remain the exclusive
                property of SignSecure.
              </p>
              <p>
                Subject to these Terms, we grant you a limited, non-exclusive,
                non-transferable, revocable license to use the Services for your
                internal business purposes during the term of your subscription
                or account.
              </p>
              <p>
                You retain all rights to the documents and content you upload,
                sign, or process through the Services. We do not claim ownership
                over your documents.
              </p>
            </Section>

            {/* ── 8. Your Documents & Data ── */}
            <Section num="8" title="Your Documents &amp; Data">
              <p>
                You retain full ownership of all documents, data, and content
                you upload to or process through the Services. We access your
                documents only as necessary to provide the Services.
              </p>
              <p>
                For SignPad and other cloud-hosted Services, we store your
                documents using industry-standard encryption (AES-256 at rest,
                TLS 1.2+ in transit). For self-hosted products (SignLift), you
                are solely responsible for the security of your deployment
                environment and stored data.
              </p>
              <p>
                For SignBolt and SignBridge (desktop applications), your
                documents are processed locally on your machine and are not
                transmitted to SignSecure servers unless you explicitly use a
                cloud feature.
              </p>
            </Section>

            {/* ── 9. Digital Signatures & Legal Validity ── */}
            <Section num="9" title="Digital Signatures &amp; Legal Validity">
              <p>
                SignSecure provides tools that facilitate digital and electronic
                signing. However:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  We do not provide legal advice. You are responsible for
                  ensuring that the signatures you collect meet the legal
                  requirements of your jurisdiction and use case.
                </li>
                <li>
                  Our products support standards including PAdES, IT Act 2000
                  (India), eIDAS, and UETA. Compliance with these standards
                  depends on your correct configuration and use of the
                  appropriate signing method.
                </li>
                <li>
                  Aadhaar OTP eSign (available in SignPad) is legally valid under
                  the Indian IT Act, 2000 and the Indian Evidence Act, subject
                  to the terms and availability of the government eSign gateway.
                </li>
                <li>
                  DSC/hardware-token signatures (via SignBolt and SignBridge)
                  comply with Section 3A of the IT Act, 2000 when used with a
                  valid digital certificate issued by a licensed Certifying
                  Authority.
                </li>
              </ul>
            </Section>

            {/* ── 10. Uptime & Support ── */}
            <Section num="10" title="Uptime &amp; Support">
              <p>
                For cloud-hosted Services (SignPad, SignLift on managed
                infrastructure), we target 99.9% uptime on a monthly basis,
                excluding scheduled maintenance. Specific uptime commitments for
                enterprise customers are defined in the applicable Service Level
                Agreement (SLA).
              </p>
              <p>
                Support is provided via email at{" "}
                <a
                  href="mailto:support@signsecure.in"
                  className="text-brand underline underline-offset-2"
                >
                  support@signsecure.in
                </a>
                . Response times depend on your plan and the severity of the
                issue. Enterprise customers receive priority support with
                dedicated engineering contacts.
              </p>
            </Section>

            {/* ── 11. Limitation of Liability ── */}
            <Section num="11" title="Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  The Services are provided &ldquo;as is&rdquo; and &ldquo;as
                  available&rdquo; without warranties of any kind, whether
                  express, implied, or statutory.
                </li>
                <li>
                  We do not warrant that the Services will be uninterrupted,
                  error-free, or free of harmful components.
                </li>
                <li>
                  In no event shall SignSecure&rsquo;s total aggregate liability
                  exceed the greater of (a) the amount you paid to us in the
                  twelve (12) months preceding the claim, or (b) USD $100.
                </li>
                <li>
                  In no event shall SignSecure be liable for any indirect,
                  incidental, special, consequential, or punitive damages,
                  including loss of profits, data, business opportunities, or
                  goodwill.
                </li>
              </ul>
            </Section>

            {/* ── 12. Indemnification ── */}
            <Section num="12" title="Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless SignSecure and
                its officers, directors, employees, and agents from and against
                any claims, liabilities, damages, losses, and expenses
                (including reasonable attorneys&rsquo; fees) arising out of or
                related to:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Your use of the Services.</li>
                <li>Your violation of these Terms.</li>
                <li>
                  Your violation of any applicable law or the rights of any
                  third party.
                </li>
                <li>
                  The documents, data, or content you upload, sign, or transmit
                  through the Services.
                </li>
              </ul>
            </Section>

            {/* ── 13. Termination ── */}
            <Section num="13" title="Termination">
              <p>
                You may stop using the Services at any time. For subscription
                products, cancellation takes effect at the end of the current
                billing period. No refunds are provided for partial billing
                periods unless required by applicable law.
              </p>
              <p>
                We may suspend or terminate your access to the Services if:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>You breach these Terms.</li>
                <li>
                  You fail to pay applicable fees after notice and a reasonable
                  cure period.
                </li>
                <li>
                  We are required to do so by law or a governmental authority.
                </li>
                <li>
                  We reasonably believe continued use poses a security risk or
                  could harm other users.
                </li>
              </ul>
              <p>
                Upon termination, your right to use the Services ceases
                immediately. For cloud-hosted Services, we will make your data
                available for export for thirty (30) days following termination,
                after which it may be permanently deleted.
              </p>
            </Section>

            {/* ── 14. Governing Law & Disputes ── */}
            <Section num="14" title="Governing Law &amp; Dispute Resolution">
              <p>
                These Terms are governed by and construed in accordance with the
                laws of India. Any disputes arising out of or in connection with
                these Terms shall be subject to the exclusive jurisdiction of
                the courts of Mumbai, Maharashtra, India.
              </p>
              <p>
                Before filing a formal dispute, both parties agree to attempt to
                resolve the matter informally by contacting us at{" "}
                <a
                  href="mailto:legal@signsecure.in"
                  className="text-brand underline underline-offset-2"
                >
                  legal@signsecure.in
                </a>
                . If the matter is not resolved within thirty (30) days, either
                party may pursue formal remedies.
              </p>
            </Section>

            {/* ── 15. Changes to Terms ── */}
            <Section num="15" title="Changes to These Terms">
              <p>
                We may update these Terms from time to time. When we make
                material changes, we will:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Update the &ldquo;Effective date&rdquo; at the top of this
                  page.
                </li>
                <li>
                  Notify you by email (if you have an account) or by a
                  prominent notice on our website at least fourteen (14) days
                  before the changes take effect.
                </li>
              </ul>
              <p>
                Your continued use of the Services after the updated Terms
                become effective constitutes your acceptance of the changes.
              </p>
            </Section>

            {/* ── 16. Miscellaneous ── */}
            <Section num="16" title="Miscellaneous">
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Entire Agreement.</strong> These Terms, together with
                  our{" "}
                  <Link
                    href={"/privacy" as any}
                    className="text-brand underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  , constitute the entire agreement between you and SignSecure
                  regarding the Services, unless superseded by a separate
                  written agreement.
                </li>
                <li>
                  <strong>Severability.</strong> If any provision of these Terms
                  is held to be unenforceable, the remaining provisions shall
                  continue in full force and effect.
                </li>
                <li>
                  <strong>Waiver.</strong> Our failure to enforce any right or
                  provision of these Terms shall not constitute a waiver of that
                  right or provision.
                </li>
                <li>
                  <strong>Assignment.</strong> You may not assign your rights
                  under these Terms without our prior written consent. We may
                  assign our rights and obligations to an affiliate or successor
                  entity.
                </li>
                <li>
                  <strong>Force Majeure.</strong> We shall not be liable for
                  delays or failures in performance resulting from circumstances
                  beyond our reasonable control, including natural disasters,
                  government actions, internet disruptions, or third-party
                  service failures.
                </li>
              </ul>
            </Section>

            {/* ── 17. Contact ── */}
            <Section num="17" title="Contact Us">
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="mt-4 rounded-xl border border-border/60 bg-muted/40 p-6">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>SignSecure</strong>
                  </p>
                  <p>Mumbai, Maharashtra, India</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:legal@signsecure.in"
                      className="text-brand underline underline-offset-2"
                    >
                      legal@signsecure.in
                    </a>
                  </p>
                  <p>
                    General inquiries:{" "}
                    <a
                      href="mailto:hello@signsecure.in"
                      className="text-brand underline underline-offset-2"
                    >
                      hello@signsecure.in
                    </a>
                  </p>
                  <p>
                    Support:{" "}
                    <a
                      href="mailto:support@signsecure.in"
                      className="text-brand underline underline-offset-2"
                    >
                      support@signsecure.in
                    </a>
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION COMPONENT
   ═══════════════════════════════════════════════════════════ */

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Separator className="mb-8 bg-border/40" />
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs font-semibold text-brand">{num}.</span>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[15px] leading-[1.85] text-foreground/80">
        {children}
      </div>
    </div>
  );
}
