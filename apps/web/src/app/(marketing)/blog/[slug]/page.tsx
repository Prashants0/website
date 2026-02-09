"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { Render } from "@puckeditor/core";
import { api } from "@website-convex/backend/convex/_generated/api";

import { cmsPuckConfigClient } from "@/cms/puck/config.client";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = useQuery(api.cmsBlog.getPublishedBySlug, { slug });

  if (post === undefined) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-sm text-muted-foreground">Blog post not found.</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <div className="font-mono text-xs tracking-widest text-brand">{"// blog_post"}</div>
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>
        {post.excerpt ? (
          <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
        ) : null}
        {post.publishedAt ? (
          <div className="mt-4 font-mono text-[11px] text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
        ) : null}
      </header>

      <Render config={cmsPuckConfigClient} data={post.publishedData as any} />
    </main>
  );
}
