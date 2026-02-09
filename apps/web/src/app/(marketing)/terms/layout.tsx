import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - SignSecure",
  description:
    "Terms of Service for all SignSecure products including SignBolt, SignBridge, SignLift, and SignPad. Read our unified terms governing document signing services.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
