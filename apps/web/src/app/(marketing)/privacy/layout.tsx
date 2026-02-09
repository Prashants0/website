import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SignSecure",
  description:
    "Privacy Policy for all SignSecure products including SignBolt, SignBridge, SignLift, and SignPad. Learn how we collect, use, and protect your information.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
