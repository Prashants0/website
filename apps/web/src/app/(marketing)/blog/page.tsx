"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";

export default function BlogIndexPage() {
  const posts = useQuery(api.cmsBlog.listPublished);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 sm:mb-10">
        <div className="font-mono text-xs tracking-widest text-brand">{"// blog"}</div>
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 text-muted-foreground">
          Product updates, deep dives, and practical guides.
        </p>
      </div>

      <div className="grid gap-4">
        {posts === undefined ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
            No posts yet.
          </div>
        ) : (
          posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}` as any}
              className="group rounded-2xl border bg-card p-6 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate text-lg font-semibold group-hover:underline">
                    {p.title}
                  </div>
                  {p.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  ) : null}
                </div>
                {p.publishedAt ? (
                  <div className="shrink-0 font-mono text-[11px] text-muted-foreground">
                    {new Date(p.publishedAt).toLocaleDateString()}
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
