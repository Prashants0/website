import type { AccentColor } from "./data";

export const accentColorMap: Record<AccentColor, string> = {
  brand: "text-brand",
  violet: "text-violet",
  cyan: "text-cyan",
  amber: "text-amber",
};

export const accentBgMap: Record<AccentColor, string> = {
  brand: "bg-brand",
  violet: "bg-violet",
  cyan: "bg-cyan",
  amber: "bg-amber",
};

export const accentBgMutedMap: Record<AccentColor, string> = {
  brand: "bg-brand-muted",
  violet: "bg-violet-muted",
  cyan: "bg-cyan-muted",
  amber: "bg-amber-muted",
};

export const accentBorderMap: Record<AccentColor, string> = {
  brand: "border-brand/30",
  violet: "border-violet/30",
  cyan: "border-cyan/30",
  amber: "border-amber/30",
};

export const accentGlowMap: Record<AccentColor, string> = {
  brand: "shadow-[0_4px_20px_var(--color-brand-glow)]",
  violet: "shadow-[0_4px_20px_oklch(0.541_0.281_293.009/0.12)]",
  cyan: "shadow-[0_4px_20px_oklch(0.609_0.126_197.874/0.12)]",
  amber: "shadow-[0_4px_20px_oklch(0.666_0.179_58.318/0.12)]",
};
