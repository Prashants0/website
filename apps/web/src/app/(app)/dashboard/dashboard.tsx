"use client";

import { useQuery } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";

export default function Dashboard() {
  const privateData = useQuery(api.privateData.get);

  return (
    <>
      <p className="mt-2 text-sm">API: {privateData?.message ?? "Loading..."}</p>
    </>
  );
}
