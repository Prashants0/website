"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function CmsAccessDeniedPage() {
  const session = authClient.useSession();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <div className="rounded-2xl border bg-card p-7">
        <div className="font-mono text-xs tracking-widest text-muted-foreground">{"// cms"}</div>
        <h1 className="mt-3 text-2xl font-bold">Access denied</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your account is signed in, but it is not marked as an admin.
        </p>

        <div className="mt-6 rounded-xl border bg-muted/30 p-4">
          <div className="text-xs font-semibold">Signed in as</div>
          <div className="mt-1 font-mono text-[11px] text-muted-foreground">
            {session.data?.user?.email ?? "(unknown)"}
          </div>
        </div>

        <div className="mt-6 text-sm">
          To enable CMS access, add yourself as an admin in the Convex dashboard users table (set <span className="font-mono text-[13px]">isAdmin = true</span>).
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={"/" as any} className="rounded-none border px-3 py-2 text-xs hover:bg-muted">
            Home
          </Link>
          <Link
            href={"/dashboard" as any}
            className="rounded-none border px-3 py-2 text-xs hover:bg-muted"
          >
            Dashboard
          </Link>
          <Link href={"/cms" as any} className="rounded-none border px-3 py-2 text-xs hover:bg-muted">
            Try again
          </Link>
        </div>
      </div>
    </main>
  );
}
