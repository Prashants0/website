"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/cms", label: "CMS" },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5">
        {/* Desktop nav */}
        <nav className="hidden gap-1 sm:flex">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              href={to as any}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-muted sm:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <nav className="flex flex-col border-t px-3 pb-3 pt-1 sm:hidden">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              href={to as any}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      <hr className="border-border" />
    </div>
  );
}
