import type { Metadata } from "next";

import { DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";
import { getToken } from "@/lib/auth-server";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SignSecure - Document Signing Built for Engineers",
  description:
    "Enterprise document signing infrastructure. From desktop batch signing to serverless cloud APIs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers initialToken={token}>{children}</Providers>
      </body>
    </html>
  );
}
