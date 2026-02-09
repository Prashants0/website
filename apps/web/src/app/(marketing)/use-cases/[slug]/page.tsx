"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { Render } from "@puckeditor/core";
import { api } from "@website-convex/backend/convex/_generated/api";

import { cmsPuckConfigClient } from "@/cms/puck/config.client";

export default function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const useCase = useQuery(api.cmsUseCases.getPublishedBySlug, { slug });

  if (useCase === undefined) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </main>
    );
  }

  if (!useCase) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-sm text-muted-foreground">Use case not found.</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <div className="font-mono text-xs tracking-widest text-brand">{"// use_case"}</div>
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">{useCase.title}</h1>
        {useCase.summary ? (
          <p className="mt-3 text-lg text-muted-foreground">{useCase.summary}</p>
        ) : null}
        {(useCase.industry || useCase.product) ? (
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
            {useCase.industry ? <span className="rounded-full border px-2 py-1">{useCase.industry}</span> : null}
            {useCase.product ? <span className="rounded-full border px-2 py-1">{useCase.product}</span> : null}
          </div>
        ) : null}
        {useCase.publishedAt ? (
          <div className="mt-4 font-mono text-[11px] text-muted-foreground">
            {new Date(useCase.publishedAt).toLocaleDateString()}
          </div>
        ) : null}
      </header>

      <Render config={cmsPuckConfigClient} data={useCase.publishedData as any} />
    </main>
  );
}
