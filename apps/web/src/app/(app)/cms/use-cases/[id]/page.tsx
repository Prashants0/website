"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";
import type { Id } from "@website-convex/backend/convex/_generated/dataModel";
import type { Data } from "@puckeditor/core";

import CmsUseCaseEditor from "@/cms/use-cases/use-case-editor";

export default function CmsUseCaseEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const useCase = useQuery(api.cmsUseCases.getById, { id: id as Id<"cmsUseCases"> });

  if (useCase === undefined) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!useCase) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-muted-foreground">
        Use case not found.
      </div>
    );
  }

  return (
    <CmsUseCaseEditor
      initial={{
        id: useCase._id,
        title: useCase.title,
        slug: useCase.slug,
        summary: useCase.summary ?? "",
        industry: useCase.industry ?? "",
        product: useCase.product ?? "",
        status: useCase.status,
        draftData: useCase.draftData as unknown as Data,
        publishedAt: useCase.publishedAt ? new Date(useCase.publishedAt).toISOString() : null,
      }}
    />
  );
}
