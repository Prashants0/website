"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useReveal, useRevealStyle } from "@/components/landing/hooks";

/* ═══════════════════════════════════════════════════════════
   PRIVACY POLICY
   Unified for all SignSecure products:
   SignBolt, SignBridge, SignLift, SignPad
   ═══════════════════════════════════════════════════════════ */

const EFFECTIVE_DATE = "February 9, 2026";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Effective date: {EFFECTIVE_DATE}
            </p>
            <p className="mt-2 text-sm text-muted-foreground/70">
              This policy applies to all SignSecure products &mdash; SignBolt,
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
            {/* ── 1. Introduction ── */}
            <Section num="1" title="Introduction">
              <p>
                <strong>SignSecure</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
                or &ldquo;Company&rdquo;), headquartered in Mumbai, India,
                operates the website{" "}
                <a
                  href="https://signsecure.in"
                  className="text-brand underline underline-offset-2"
                >
                  signsecure.in
                </a>{" "}
                and provides document signing solutions through SignBolt,
                SignBridge, SignLift, and SignPad (collectively, the
                &ldquo;Services&rdquo;).
              </p>
              <p>
                This Privacy Policy explains what information we collect, how we
                use it, who we share it with, and what choices you have. By using
                any of our Services, you agree to the practices described in
                this policy.
              </p>
            </Section>

            {/* ── 2. Information We Collect ── */}
            <Section num="2" title="Information We Collect">
              <h4 className="mt-4 mb-2 text-[15px] font-bold">
                2.1 Information You Provide
              </h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Account information:</strong> Name, email address,
                  organization name, and password when you create a SignSecure
                  account.
                </li>
                <li>
                  <strong>Billing information:</strong> Payment card details,
                  billing address, and GST identification number (for Indian
                  customers). Payment processing is handled by our third-party
                  payment processor; we do not store full card numbers.
                </li>
                <li>
                  <strong>Documents and content:</strong> Documents you upload,
                  form field data, signatures, and attachments processed through
                  the Services.
                </li>
                <li>
                  <strong>Communications:</strong> Messages you send to us via
                  email, contact forms, or support channels.
                </li>
                <li>
                  <strong>Signer information:</strong> Names and email addresses
                  of individuals you invite to sign documents through SignPad.
                </li>
              </ul>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                2.2 Information Collected Automatically
              </h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Usage data:</strong> Pages visited, features used,
                  actions taken within the Services, timestamps, and session
                  duration.
                </li>
                <li>
                  <strong>Device information:</strong> Browser type and version,
                  operating system, device type, and screen resolution.
                </li>
                <li>
                  <strong>Network information:</strong> IP address, approximate
                  geolocation (city/country level), and referring URL.
                </li>
                <li>
                  <strong>Audit trail data (SignPad):</strong> Signer IP
                  addresses, timestamps, and SHA-256 integrity hashes recorded
                  as part of the tamper-proof audit trail for each signing event.
                </li>
              </ul>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                2.3 Information We Do NOT Collect
              </h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Private keys:</strong> SignBolt and SignBridge perform
                  all cryptographic operations locally on your device. Private
                  keys from USB tokens or certificates are never
                  transmitted to or stored on SignSecure servers.
                </li>
                <li>
                  <strong>Aadhaar numbers:</strong> When a signer uses Aadhaar
                  OTP eSign through SignPad, the authentication is handled by
                  the government eSign gateway. We do not store Aadhaar numbers.
                </li>
                <li>
                  <strong>Self-hosted data (SignLift):</strong> If you deploy
                  SignLift on your own infrastructure, your documents and
                  certificates are processed entirely within your environment.
                  We have no access to that data.
                </li>
              </ul>
            </Section>

            {/* ── 3. How We Use Your Information ── */}
            <Section num="3" title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Provide and operate the Services</strong> &mdash;
                  process your documents, manage signing workflows, deliver
                  signed documents, and maintain audit trails.
                </li>
                <li>
                  <strong>Process payments</strong> &mdash; charge subscription
                  fees, process credit purchases, and generate invoices.
                </li>
                <li>
                  <strong>Communicate with you</strong> &mdash; send
                  transactional emails (signing notifications, receipts, account
                  alerts), respond to support requests, and provide product
                  updates.
                </li>
                <li>
                  <strong>Improve the Services</strong> &mdash; analyze usage
                  patterns to fix bugs, optimize performance, and develop new
                  features.
                </li>
                <li>
                  <strong>Ensure security</strong> &mdash; detect and prevent
                  fraud, abuse, and unauthorized access.
                </li>
                <li>
                  <strong>Comply with legal obligations</strong> &mdash;
                  respond to lawful requests from government authorities and
                  fulfill regulatory requirements.
                </li>
              </ul>
              <p>
                We do not sell your personal information to third parties. We do
                not use your documents to train machine learning models or for
                any purpose other than providing the Services.
              </p>
            </Section>

            {/* ── 4. Product-Specific Privacy Details ── */}
            <Section num="4" title="Product-Specific Privacy Details">
              <h4 className="mt-4 mb-2 text-[15px] font-bold">
                4.1 SignBolt (Desktop Application)
              </h4>
              <p>
                SignBolt processes documents entirely on your local machine.
                Documents are not uploaded to SignSecure servers. The application
                may communicate with our licensing server to validate your
                license key. If you use the Auto Email feature, your Gmail
                credentials are stored locally using OAuth 2.0 tokens and are
                never transmitted to us.
              </p>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                4.2 SignBridge (Desktop Companion)
              </h4>
              <p>
                SignBridge operates as a local service on your machine
                (localhost). All cryptographic operations happen locally. The
                software does not transmit your documents, certificates, or
                private keys to SignSecure servers. Session data between your
                browser and the SignBridge agent is encrypted and isolated per
                connected application.
              </p>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                4.3 SignLift (Self-Hosted API)
              </h4>
              <p>
                SignLift runs entirely within your own infrastructure. We do not
                have access to documents, certificates, or API traffic processed
                by your SignLift deployment. We may collect anonymized usage
                telemetry (version number, deployment type) to improve the
                product, which you can opt out of in the configuration.
              </p>

              <h4 className="mt-6 mb-2 text-[15px] font-bold">
                4.4 SignPad (Web Platform)
              </h4>
              <p>
                SignPad is a cloud-hosted service. Documents you upload are
                stored on our servers using AES-256 encryption at rest and TLS
                1.2+ encryption in transit. Documents are retained for the
                duration of your account plus thirty (30) days after account
                termination, after which they are permanently deleted. Audit
                trail records are retained for seven (7) years to meet
                compliance requirements.
              </p>
            </Section>

            {/* ── 5. Sharing ── */}
            <Section num="5" title="Who We Share Information With">
              <p>
                We share your information only in the following circumstances:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Signing participants:</strong> When you send a
                  document for signing via SignPad, the signers receive your
                  name, email, and the document content. Audit trail information
                  is included in the completed document.
                </li>
                <li>
                  <strong>Service providers:</strong> We use third-party
                  providers for payment processing, email delivery, cloud
                  infrastructure hosting, and analytics. These providers process
                  data only on our behalf and are contractually bound to protect
                  your information.
                </li>
                <li>
                  <strong>Aadhaar eSign gateway:</strong> When a signer uses
                  Aadhaar OTP eSign, authentication is handled by the
                  government-authorized eSign gateway provider. We transmit only
                  the minimum information required to complete the signing.
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose
                  information when required by law, court order, or government
                  request, or when necessary to protect the rights, property, or
                  safety of SignSecure, our users, or the public.
                </li>
                <li>
                  <strong>Business transfers:</strong> In the event of a merger,
                  acquisition, or asset sale, your information may be
                  transferred to the acquiring entity. We will notify you before
                  your information becomes subject to a different privacy
                  policy.
                </li>
              </ul>
            </Section>

            {/* ── 6. Data Security ── */}
            <Section num="6" title="Data Security">
              <p>
                We implement industry-standard security measures to protect your
                information:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Encryption at rest:</strong> AES-256 encryption for
                  stored documents and data.
                </li>
                <li>
                  <strong>Encryption in transit:</strong> TLS 1.2+ for all data
                  transmitted between your device and our servers.
                </li>
                <li>
                  <strong>Access controls:</strong> Role-based access control,
                  multi-factor authentication for internal systems, and
                  principle of least privilege for employee access.
                </li>
                <li>
                  <strong>Audit logging:</strong> All access to customer data is
                  logged and monitored.
                </li>
                <li>
                  <strong>Infrastructure:</strong> Our cloud infrastructure is
                  hosted with providers that maintain SOC 2, ISO 27001, and
                  equivalent certifications.
                </li>
              </ul>
              <p>
                While we take reasonable measures to protect your data, no
                method of electronic storage or transmission is 100% secure. We
                cannot guarantee absolute security.
              </p>
            </Section>

            {/* ── 7. Data Retention ── */}
            <Section num="7" title="Data Retention">
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Account data:</strong> Retained for the duration of
                  your account. Deleted within ninety (90) days of account
                  closure, except as required by law.
                </li>
                <li>
                  <strong>Documents (SignPad):</strong> Retained for the
                  duration of your account plus thirty (30) days after
                  termination for data export purposes.
                </li>
                <li>
                  <strong>Audit trails (SignPad):</strong> Retained for seven
                  (7) years to meet regulatory and legal compliance
                  requirements.
                </li>
                <li>
                  <strong>Billing records:</strong> Retained for seven (7) years
                  as required by Indian tax law.
                </li>
                <li>
                  <strong>Usage analytics:</strong> Aggregated and anonymized
                  data may be retained indefinitely for product improvement
                  purposes.
                </li>
                <li>
                  <strong>Desktop products (SignBolt, SignBridge):</strong> Since
                  these products process data locally, retention is determined by
                  your own device and file management practices.
                </li>
              </ul>
            </Section>

            {/* ── 8. Cookies & Tracking ── */}
            <Section num="8" title="Cookies &amp; Tracking Technologies">
              <p>
                Our website and web-based Services use cookies and similar
                technologies:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Essential cookies:</strong> Required for
                  authentication, security, and basic functionality. These
                  cannot be disabled.
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand how
                  visitors use our website and Services. We use these to improve
                  user experience and product features.
                </li>
                <li>
                  <strong>Preference cookies:</strong> Remember your settings,
                  such as theme preference (light/dark mode) and language
                  selection.
                </li>
              </ul>
              <p>
                We do not use third-party advertising cookies or tracking pixels.
                You can manage cookie preferences through your browser settings.
                Disabling essential cookies may impair the functionality of the
                Services.
              </p>
            </Section>

            {/* ── 9. Your Rights ── */}
            <Section num="9" title="Your Rights &amp; Choices">
              <p>
                Depending on your jurisdiction, you may have the following
                rights regarding your personal information:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of the personal
                  information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete information.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information, subject to legal retention requirements.
                </li>
                <li>
                  <strong>Portability:</strong> Request your data in a
                  structured, commonly used, machine-readable format.
                </li>
                <li>
                  <strong>Objection:</strong> Object to the processing of your
                  personal information in certain circumstances.
                </li>
                <li>
                  <strong>Withdraw consent:</strong> Where processing is based
                  on your consent, you may withdraw that consent at any time.
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:privacy@signsecure.in"
                  className="text-brand underline underline-offset-2"
                >
                  privacy@signsecure.in
                </a>
                . We will respond to your request within thirty (30) days.
              </p>
              <p>
                <strong>Email communications:</strong> You can opt out of
                marketing emails at any time using the unsubscribe link in any
                marketing email. Transactional emails (signing notifications,
                security alerts, billing receipts) cannot be opted out of while
                your account is active.
              </p>
            </Section>

            {/* ── 10. International Data Transfers ── */}
            <Section num="10" title="International Data Transfers">
              <p>
                SignSecure is based in India. If you access the Services from
                outside India, your information may be transferred to and
                processed in India or other countries where our service providers
                operate. By using the Services, you consent to the transfer of
                your information to India and other jurisdictions that may have
                different data protection laws than your country of residence.
              </p>
              <p>
                We take appropriate safeguards to ensure that your data is
                treated securely and in accordance with this Privacy Policy,
                regardless of where it is processed.
              </p>
            </Section>

            {/* ── 11. Children's Privacy ── */}
            <Section num="11" title="Children&rsquo;s Privacy">
              <p>
                The Services are not directed at individuals under the age of 18
                (or the age of majority in your jurisdiction). We do not
                knowingly collect personal information from children. If we
                become aware that we have collected personal information from a
                child, we will take steps to delete that information promptly.
                If you believe a child has provided us with personal
                information, please contact us at{" "}
                <a
                  href="mailto:privacy@signsecure.in"
                  className="text-brand underline underline-offset-2"
                >
                  privacy@signsecure.in
                </a>
                .
              </p>
            </Section>

            {/* ── 12. Changes ── */}
            <Section num="12" title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we
                make material changes, we will:
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
                We encourage you to review this Privacy Policy periodically.
                Your continued use of the Services after the updated policy
                becomes effective constitutes your acceptance of the changes.
              </p>
            </Section>

            {/* ── 13. Contact ── */}
            <Section num="13" title="Contact Us">
              <p>
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-4 rounded-xl border border-border/60 bg-muted/40 p-6">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>SignSecure &mdash; Privacy Team</strong>
                  </p>
                  <p>Mumbai, Maharashtra, India</p>
                  <p>
                    Privacy inquiries:{" "}
                    <a
                      href="mailto:privacy@signsecure.in"
                      className="text-brand underline underline-offset-2"
                    >
                      privacy@signsecure.in
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
              <p className="mt-6">
                Also see our{" "}
                <Link
                  href={"/terms" as any}
                  className="text-brand underline underline-offset-2"
                >
                  Terms of Service
                </Link>{" "}
                for the full agreement governing your use of the Services.
              </p>
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
