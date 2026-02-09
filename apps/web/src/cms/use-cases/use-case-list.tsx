"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery, useMutation } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CmsUseCaseList() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const items = useQuery(api.cmsUseCases.list);
  const createUseCase = useMutation(api.cmsUseCases.create);

  const data = items ?? [];
  const isLoading = items === undefined;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Use Cases</h1>
          <p className="mt-2 text-sm text-muted-foreground">Draft and publish use cases.</p>
        </div>

        <div className="w-full max-w-md rounded-2xl border bg-card p-4">
          <Label className="text-xs">New use case title</Label>
          <div className="mt-2 flex gap-2">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Banking DSC Integration" />
            <Button
              onClick={async () => {
                const t = title.trim();
                if (!t) {
                  toast.error("Title is required");
                  return;
                }
                try {
                  const created = await createUseCase({ title: t });
                  setTitle("");
                  router.push(`/cms/use-cases/${created.id}` as any);
                } catch (error: any) {
                  toast.error(error.message ?? "Failed to create use case");
                }
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border">
          <div className="grid grid-cols-[1fr_auto] gap-2 border-b bg-muted/30 px-4 py-3 text-xs font-semibold">
            <div>Title</div>
            <div>Status</div>
          </div>
          <div className="divide-y">
            {data.length === 0 ? (
              <div className="px-4 py-6 text-sm text-muted-foreground">No use cases yet.</div>
            ) : (
              data.map((u) => (
                <Link
                  key={String(u.id)}
                  href={`/cms/use-cases/${String(u.id)}` as any}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 px-4 py-3 hover:bg-muted/20"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{u.title}</div>
                    <div className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">/{u.slug}</div>
                  </div>
                  <div className="text-[11px] font-medium">
                    <span
                      className={`rounded-full border px-2 py-1 ${
                        u.status === "published"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
