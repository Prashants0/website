"use client";

import { useQuery } from "convex/react";
import { api } from "@website-convex/backend/convex/_generated/api";

import { authClient } from "@/lib/auth-client";
import Dashboard from "./dashboard";

export default function DashboardPage() {
  const session = authClient.useSession();

  if (session.isPending) {
    return <div className="p-6 text-sm text-muted-foreground">Loading...</div>;
  }

  if (!session.data?.user) {
    // Redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome {session.data.user.name}</p>
      <Dashboard />
    </div>
  );
}
