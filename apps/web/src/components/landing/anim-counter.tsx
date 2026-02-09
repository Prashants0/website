"use client";

import { useEffect, useState } from "react";

import { useReveal } from "./hooks";

export function AnimCounter({
  to,
  suffix = "",
  dur = 2000,
}: {
  to: number;
  suffix?: string;
  dur?: number;
}) {
  const [v, setV] = useState(0);
  const { ref, vis } = useReveal(0.3);

  useEffect(() => {
    if (!vis) return;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [vis, to, dur]);

  return (
    <span ref={ref}>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}
