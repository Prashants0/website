"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Puck, type Data } from "@puckeditor/core";
import { useMutation } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";
import type { Id } from "@website-convex/backend/convex/_generated/dataModel";
import { toast } from "sonner";

import { cmsPuckConfigClient } from "@/cms/puck/config.client";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type BlogEditorInitial = {
  id: Id<"cmsBlogPosts">;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  status: "draft" | "published";
  draftData: Data;
  publishedAt: string | null;
};

export default function CmsBlogEditor({ initial }: { initial: BlogEditorInitial }) {
  const router = useRouter();

  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [coverImageUrl, setCoverImageUrl] = useState(initial.coverImageUrl);

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const dataRef = useRef<Data>(initial.draftData);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveDraftMutation = useMutation(api.cmsBlog.saveDraft);
  const publishMutation = useMutation(api.cmsBlog.publish);
  const unpublishMutation = useMutation(api.cmsBlog.unpublish);
  const deleteMutation = useMutation(api.cmsBlog.deleteBlogPost);

  function scheduleSave() {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(async () => {
      setSaving(true);
      try {
        await saveDraftMutation({
          id: initial.id,
          title: title.trim() || "Untitled",
          slug: slug.trim(),
          excerpt: excerpt.trim() || undefined,
          coverImageUrl: coverImageUrl.trim() || undefined,
          draftData: dataRef.current,
        });
        setLastSaved(new Date());
      } catch (error: any) {
        toast.error(error.message ?? "Failed to save");
      } finally {
        setSaving(false);
      }
    }, 800);
  }

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const publicUrl = useMemo(() => `/blog/${slug}`, [slug]);

  return (
    <div className="min-h-[calc(100svh-52px)]">
      <div className="border-b bg-background/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-mono text-muted-foreground">cms/blog</div>
              <h1 className="mt-1 text-xl font-semibold">Edit post</h1>
              <div className="mt-1 text-xs text-muted-foreground">
                {initial.status === "published" ? "Published" : "Draft"}
                {lastSaved ? ` • Saved ${lastSaved.toLocaleTimeString()}` : ""}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={publicUrl as any}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Open public
              </Link>
              {initial.status === "published" ? (
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await unpublishMutation({ id: initial.id });
                      toast.success("Unpublished");
                      router.refresh();
                    } catch (error: any) {
                      toast.error(error.message);
                    }
                  }}
                >
                  Unpublish
                </Button>
              ) : null}
              <Button
                variant="destructive"
                onClick={async () => {
                  const ok = window.confirm("Delete this blog post? This cannot be undone.");
                  if (!ok) return;
                  try {
                    await deleteMutation({ id: initial.id });
                    toast.success("Deleted");
                    router.push("/cms/blog" as any);
                  } catch (error: any) {
                    toast.error(error.message);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  scheduleSave();
                }}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Slug</Label>
              <Input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  scheduleSave();
                }}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs">Excerpt</Label>
              <Input
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  scheduleSave();
                }}
                placeholder="Optional summary for the /blog listing"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs">Cover image URL</Label>
              <Input
                value={coverImageUrl}
                onChange={(e) => {
                  setCoverImageUrl(e.target.value);
                  scheduleSave();
                }}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        <Puck
          key={String(initial.id)}
          config={cmsPuckConfigClient}
          data={initial.draftData}
          onChange={(data) => {
            dataRef.current = data;
            scheduleSave();
          }}
          onPublish={async (data) => {
            setPublishing(true);
            try {
              await publishMutation({
                id: initial.id,
                title: title.trim() || "Untitled",
                slug: slug.trim(),
                excerpt: excerpt.trim() || undefined,
                coverImageUrl: coverImageUrl.trim() || undefined,
                publishedData: data,
              });
              toast.success("Published");
              router.refresh();
            } catch (error: any) {
              toast.error(error.message ?? "Failed to publish");
            } finally {
              setPublishing(false);
            }
          }}
          headerTitle={title.trim() || "Untitled"}
          headerPath={`/blog/${slug.trim()}`}
        />
      </div>
    </div>
  );
}
