"use client";

import Link from "next/link";

export default function CmsHomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">CMS</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage blogs and use cases.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href={"/cms/blog" as any}
          className="rounded-2xl border bg-card p-6 hover:bg-muted/30"
        >
          <div className="text-sm font-semibold">Blog</div>
          <div className="mt-1 text-xs text-muted-foreground">Draft, edit, publish posts</div>
        </Link>

        <Link
          href={"/cms/use-cases" as any}
          className="rounded-2xl border bg-card p-6 hover:bg-muted/30"
        >
          <div className="text-sm font-semibold">Use cases</div>
          <div className="mt-1 text-xs text-muted-foreground">Case studies and solutions</div>
        </Link>
      </div>
    </main>
  );
}
