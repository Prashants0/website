"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { products } from "./data";
import { accentColorMap } from "./accent-utils";
import { Logo } from "./logo";
import { ProductIcon } from "./svg";

export function LandingNav() {
  const { theme, setTheme } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dark = theme === "dark";
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMobileMenu(false);
    },
    []
  );

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl transition-colors">
        <div className="mx-auto flex h-[84px] max-w-[1240px] items-center justify-between px-7">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline"
          >
            <Logo size={38} className="shrink-0" />
            <span className="font-display text-[22px] font-extrabold leading-none tracking-tight text-foreground">
              SignSecure
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 md:flex">
            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                onClick={() => {
                  if (isHome) {
                    scrollTo("products");
                  }
                  setProductsOpen(!productsOpen);
                }}
                className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Products
                <ChevronDown className={`size-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>

              {productsOpen && (
                <div className="absolute left-1/2 top-full pt-2 -translate-x-1/2">
                  <div className="min-w-[240px] rounded-xl border bg-card p-2 shadow-xl">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        onClick={() => {
                          setProductsOpen(false);
                          setMobileMenu(false);
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 no-underline transition-colors hover:bg-muted"
                      >
                        <div className={`flex size-8 items-center justify-center rounded-lg bg-muted ${accentColorMap[p.accent]}`}>
                          <ProductIcon d={p.icon} size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {p.tagline}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-1 border-t pt-1">
                      <Link
                        href="/pricing"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
                      >
                        View all pricing
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scroll-to links (only meaningful on home) */}
            {isHome ? (
              <>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="bg-transparent border-none cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollTo("compare")}
                  className="bg-transparent border-none cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Compare
                </button>
              </>
            ) : null}

            {/* Pricing link - always route-based */}
            <Link
              href="/pricing"
              className={`text-sm font-medium no-underline transition-colors hover:text-foreground ${
                pathname === "/pricing" ? "text-brand" : "text-muted-foreground"
              }`}
            >
              Pricing
            </Link>

            {/* Trust - scroll only on home */}
            {isHome && (
              <button
                onClick={() => scrollTo("trust")}
                className="bg-transparent border-none cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Trust
              </button>
            )}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(dark ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Link
              href="https://signsecure.in"
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground shadow-[0_4px_16px_var(--color-brand-glow)] transition-all hover:opacity-90 no-underline"
            >
              Deploy Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >
            {mobileMenu ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/98 backdrop-blur-xl">
          <button
            onClick={() => setMobileMenu(false)}
            className="absolute top-6 right-6 bg-transparent border-none text-2xl cursor-pointer text-foreground"
          >
            <X className="size-7" />
          </button>

          {/* Products section */}
          <div className="text-center">
            <div className="mb-3 font-mono text-[10px] text-muted-foreground tracking-widest">
              PRODUCTS
            </div>
            <div className="flex flex-col gap-2">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  onClick={() => setMobileMenu(false)}
                  className={`font-display text-lg font-bold no-underline ${accentColorMap[p.accent]}`}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px w-16 bg-border" />

          {/* Navigation links */}
          {isHome && (
            <>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="bg-transparent border-none font-display text-2xl font-bold cursor-pointer text-foreground"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollTo("compare")}
                className="bg-transparent border-none font-display text-2xl font-bold cursor-pointer text-foreground"
              >
                Compare
              </button>
            </>
          )}

          <Link
            href="/pricing"
            onClick={() => setMobileMenu(false)}
            className="font-display text-2xl font-bold no-underline text-foreground"
          >
            Pricing
          </Link>

          {isHome && (
            <button
              onClick={() => scrollTo("trust")}
              className="bg-transparent border-none font-display text-2xl font-bold cursor-pointer text-foreground"
            >
              Trust
            </button>
          )}
        </div>
      )}
    </>
  );
}
