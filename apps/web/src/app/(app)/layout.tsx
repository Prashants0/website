"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";

import Header from "@/components/header";
import { authClient } from "@/lib/auth-client";

/**
 * Ensures the authenticated user has a row in the `users` table.
 * Runs once after login. Safe to call multiple times (idempotent).
 */
function EnsureUser() {
  const session = authClient.useSession();
  const ensureUser = useMutation(api.auth.ensureUser);
  const called = useRef(false);

  useEffect(() => {
    if (session.data?.user && !called.current) {
      called.current = true;
      ensureUser().catch(() => {
        // Silently ignore — user may not have a valid Convex auth token yet
        called.current = false;
      });
    }
  }, [session.data?.user, ensureUser]);

  return null;
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <Header />
      <EnsureUser />
      {children}
    </div>
  );
}
