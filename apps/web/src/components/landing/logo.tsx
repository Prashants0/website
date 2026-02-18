"use client";

export function Logo({
  size = 52,
  variant = "blue",
  className,
}: {
  size?: number;
  variant?: "blue" | "white" | "auto";
  className?: string;
}) {
  // The original SVG had a viewBox of 0 0 124 174, giving an aspect ratio of ~0.713
  const height = (size * 174) / 124;

  return (
    <img
      src="/logo.png"
      alt="SignSecure logo"
      width={size}
      height={height}
      className={className}
      style={{
        ...(variant === "white"
          ? { filter: "brightness(0) invert(1)" }
          : variant === "auto"
            ? { filter: "none" }
            : {}),
      }}
    />
  );
}
