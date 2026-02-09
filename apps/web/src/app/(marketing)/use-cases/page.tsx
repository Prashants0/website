"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";

export default function UseCasesIndexPage() {
  const items = useQuery(api.cmsUseCases.listPublished);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 sm:mb-10">
        <div className="font-mono text-xs tracking-widest text-brand">{"// use_cases"}</div>
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">Use cases</h1>
        <p className="mt-3 text-muted-foreground">
          Real-world signing flows and deployments.
        </p>
      </div>

      <div className="grid gap-4">
        {items === undefined ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
            No use cases yet.
          </div>
        ) : (
          items.map((u) => (
            <Link
              key={u.slug}
              href={`/use-cases/${u.slug}` as any}
              className="group rounded-2xl border bg-card p-6 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate text-lg font-semibold group-hover:underline">
                    {u.title}
                  </div>
                  {u.summary ? (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{u.summary}</p>
                  ) : null}
                  {(u.industry || u.product) ? (
                    <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
                      {u.industry ? <span className="rounded-full border px-2 py-1">{u.industry}</span> : null}
                      {u.product ? <span className="rounded-full border px-2 py-1">{u.product}</span> : null}
                    </div>
                  ) : null}
                </div>
                {u.publishedAt ? (
                  <div className="shrink-0 font-mono text-[11px] text-muted-foreground">
                    {new Date(u.publishedAt).toLocaleDateString()}
                  </div>
                ) : null}
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
