import { LandingFooter } from "@/components/landing/footer";
import { LandingNav } from "@/components/landing/landing-nav";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors">
      <LandingNav />
      {children}
      <LandingFooter />
    </div>
  );
}
