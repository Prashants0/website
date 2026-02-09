"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";
import type { Id } from "@website-convex/backend/convex/_generated/dataModel";
import type { Data } from "@puckeditor/core";

import CmsBlogEditor from "@/cms/blog/blog-editor";

export default function CmsBlogEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const post = useQuery(api.cmsBlog.getById, { id: id as Id<"cmsBlogPosts"> });

  if (post === undefined) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-muted-foreground">
        Blog post not found.
      </div>
    );
  }

  return (
    <CmsBlogEditor
      initial={{
        id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? "",
        coverImageUrl: post.coverImageUrl ?? "",
        status: post.status,
        draftData: post.draftData as unknown as Data,
        publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
      }}
    />
  );
}
