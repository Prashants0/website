import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { Logo } from "./logo";

type FooterLink =
  | { label: string; href: string; external?: false }
  | { label: string; href: string; external: true };

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "SignSecure Win", href: "/products/signsecure-win" },
      { label: "SignBridge", href: "/products/signbridge" },
      { label: "Signly API", href: "/products/signly-api" },
      { label: "Moonlight", href: "/products/moonlight" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Documentation", href: "#", external: true },
      { label: "API Reference", href: "#", external: true },
      { label: "Changelog", href: "#", external: true },
      { label: "System Status", href: "#", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#", external: true },
      { label: "Blog", href: "#", external: true },
      { label: "Careers", href: "#", external: true },
      { label: "Contact", href: "#", external: true },
      { label: "Privacy Policy", href: "#", external: true },
      { label: "Terms of Service", href: "#", external: true },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t-[3px] border-brand bg-gradient-to-b from-[oklch(0.18_0.01_240)] to-[oklch(0.12_0.01_240)] pt-[72px] pb-9 text-[#94A3B8]">
      <div className="mx-auto max-w-[1240px] px-7">
        <div className="mb-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2.5 no-underline">
              <Logo size={34} variant="white" className="shrink-0" />
              <span className="font-display text-xl font-extrabold text-[#E4E7EC]">
                SignSecure
              </span>
            </Link>
            <p className="max-w-[300px] text-sm leading-relaxed text-[#8294AA]">
              Enterprise document signing infrastructure. From desktop batch
              signing to serverless cloud APIs.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="size-2 rounded-full bg-success" />
              <span className="font-mono text-[11px] text-[#8294AA]">
                All systems operational
              </span>
            </div>
          </div>

          {footerColumns.map((col, i) => (
            <div key={i}>
              <h4 className="mb-5 text-sm font-semibold text-[#E4E7EC]">
                {col.title}
              </h4>
              <ul className="flex list-none flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-[#8294AA] no-underline transition-colors hover:text-[#E4E7EC]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href as "/pricing" | `/products/${string}`}
                        className="text-sm text-[#8294AA] no-underline transition-colors hover:text-[#E4E7EC]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/6" />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7">
          <p className="font-mono text-[11px] text-[#6B7D8F]">
            &copy; 2026 SignSecure &middot; signsecure.in &middot; Mumbai,
            India
          </p>
          <div className="flex gap-2">
            <a
              href="mailto:sales@signsecure.in"
              className="font-mono text-[11px] text-[#6B7D8F] no-underline"
            >
              sales@signsecure.in
            </a>
            <span className="text-[#6B7D8F]">&middot;</span>
            <a
              href="mailto:support@signsecure.in"
              className="font-mono text-[11px] text-[#6B7D8F] no-underline"
            >
              support@signsecure.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
