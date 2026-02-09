"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════════
   HERO CANVAS — "Document infrastructure at a glance"

   Design rules:
   - EVERYTHING is visible on the very first frame.
   - No fade-in / fade-out cycling. No blank canvas ever.
   - Animations are subtle, ambient, decorative only.
   - LIGHT MODE: strong borders, solid fills, high contrast.
   - Dark mode: softer glows, lifted colors.
   ═══════════════════════════════════════════════════════════ */

type RGB = readonly [number, number, number];

function rgba([r, g, b]: RGB, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function pal(dark: boolean) {
  return {
    brand: (dark ? [105, 155, 245] : [18, 52, 165]) as RGB,
    green: (dark ? [75, 195, 115] : [10, 110, 40]) as RGB,
    violet: (dark ? [120, 185, 220] : [18, 72, 135]) as RGB,
    cyan: (dark ? [100, 195, 200] : [8, 90, 115]) as RGB,
    amber: (dark ? [210, 170, 85] : [130, 85, 5]) as RGB,
    fg: (dark ? [230, 230, 238] : [10, 10, 18]) as RGB,
    fgMuted: (dark ? [140, 140, 158] : [50, 52, 65]) as RGB,
    docBg: (dark ? [34, 36, 54] : [255, 255, 255]) as RGB,
    docBorder: (dark ? [62, 68, 95] : [130, 138, 165]) as RGB,
    cardBg: (dark ? [30, 32, 48] : [248, 249, 255]) as RGB,
    cardBorder: (dark ? [58, 62, 88] : [128, 135, 162]) as RGB,
    shield: (dark ? [105, 155, 245] : [18, 52, 165]) as RGB,
    line: (dark ? [75, 85, 125] : [95, 105, 135]) as RGB,
  };
}

/* ── Signature path ── */
function buildSig(): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80;
    pts.push({
      x: t,
      y:
        0.25 * Math.sin(t * Math.PI * 2.3 + 0.9) +
        0.13 * Math.sin(t * Math.PI * 4.6 + 1.6) +
        0.06 * Math.cos(t * Math.PI * 2.9 + 0.4),
    });
  }
  return pts;
}
const SIG = buildSig();

/* ── Floating crypto labels ── */
const CRYPTO_LABELS = [
  { text: "X.509", x: 0.05, y: 0.14, speed: 0.12 },
  { text: "PAdES", x: 0.88, y: 0.22, speed: -0.09 },
  { text: "SHA-256", x: 0.08, y: 0.78, speed: 0.1 },
  { text: "AES-256", x: 0.85, y: 0.7, speed: -0.14 },
  { text: "LTV", x: 0.5, y: 0.05, speed: 0.08 },
  { text: "RFC 3161", x: 0.48, y: 0.92, speed: -0.11 },
];

/* ── Product cards data ── */
const PRODUCTS = [
  { label: "SignBolt", desc: "Batch signing", color: "brand" as const },
  { label: "SignBridge", desc: "Secure bridge", color: "violet" as const },
  { label: "SignLift", desc: "Cloud API", color: "cyan" as const },
  { label: "SignPad", desc: "Sign anywhere", color: "amber" as const },
];

function getColor(name: string, p: ReturnType<typeof pal>): RGB {
  return (p as Record<string, RGB>)[name] ?? p.brand;
}

/* ═══════════════════════════════════════════════════════════
   DRAW FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

/* ── Document with signature ── */
function drawDocument(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  sigDrawCount: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const docW = scale * 165;
  const docH = docW * 1.32;
  const dx = cx - docW / 2;
  const dy = cy - docH / 2;

  // Strong shadow
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.5)" : "rgba(8,15,45,0.32)";
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = rgba(p.docBg, 1);
  ctx.beginPath();
  ctx.roundRect(dx, dy, docW, docH, 7);
  ctx.fill();
  ctx.restore();

  // Solid border
  ctx.strokeStyle = rgba(p.docBorder, 1);
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(dx, dy, docW, docH, 7);
  ctx.stroke();

  // Header bar
  const hH = docH * 0.1;
  ctx.fillStyle = rgba(p.brand, dark ? 0.12 : 0.1);
  ctx.beginPath();
  ctx.roundRect(dx, dy, docW, hH, [7, 7, 0, 0]);
  ctx.fill();
  // Header divider line
  ctx.strokeStyle = rgba(p.docBorder, 1);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(dx, dy + hH);
  ctx.lineTo(dx + docW, dy + hH);
  ctx.stroke();
  // Header title bar placeholder
  ctx.fillStyle = rgba(p.brand, dark ? 0.5 : 0.55);
  ctx.beginPath();
  ctx.roundRect(dx + docW * 0.06, dy + hH * 0.28, docW * 0.32, hH * 0.44, 2.5);
  ctx.fill();
  // Header icon
  ctx.fillStyle = rgba(p.brand, dark ? 0.35 : 0.35);
  ctx.beginPath();
  ctx.arc(dx + docW * 0.9, dy + hH * 0.5, hH * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Text lines — clearly visible
  const lx = dx + docW * 0.08;
  const lw = docW * 0.84;
  const lh = 5;
  const lg = docH * 0.042;
  const sy = dy + hH + docH * 0.055;
  const lens = [1, 0.8, 0.92, 0.55, 0, 0.96, 0.72, 0.85, 0, 0.62, 0.78];
  for (let i = 0; i < lens.length; i++) {
    if (lens[i] === 0) continue;
    const ly = sy + i * lg;
    if (ly > dy + docH * 0.55) break;
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.2 : 0.35);
    ctx.beginPath();
    ctx.roundRect(lx, ly, lw * lens[i], lh, 2);
    ctx.fill();
  }

  // Divider before signature
  const divY = dy + docH * 0.6;
  ctx.strokeStyle = rgba(p.docBorder, 1);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(lx, divY);
  ctx.lineTo(lx + lw, divY);
  ctx.stroke();

  // "Sign here" label
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.6 : 0.75);
  ctx.font = `500 ${Math.max(9, docW * 0.05)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Sign here", lx, divY + docH * 0.02);

  // Dashed sign line
  const slY = divY + docH * 0.1;
  ctx.strokeStyle = rgba(p.fgMuted, dark ? 0.25 : 0.45);
  ctx.lineWidth = 1;
  ctx.setLineDash([2.5, 2.5]);
  ctx.beginPath();
  ctx.moveTo(lx, slY);
  ctx.lineTo(lx + lw * 0.65, slY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Animated signature
  const sigBaseY = divY + docH * 0.06;
  const sigW = lw * 0.55;
  const sigH = docH * 0.1;
  const count = Math.min(sigDrawCount, SIG.length);
  if (count > 1) {
    ctx.strokeStyle = rgba(p.brand, dark ? 0.85 : 1);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const pt = SIG[i];
      const sx = lx + pt.x * sigW;
      const ssy = sigBaseY + pt.y * sigH;
      if (i === 0) ctx.moveTo(sx, ssy);
      else ctx.lineTo(sx, ssy);
    }
    ctx.stroke();

    // Pen tip when still drawing
    if (count < SIG.length) {
      const tip = SIG[count - 1];
      const tx = lx + tip.x * sigW;
      const ty = sigBaseY + tip.y * sigH;
      ctx.fillStyle = rgba(p.brand, dark ? 0.65 : 0.8);
      ctx.beginPath();
      ctx.arc(tx, ty, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Bottom: date / name fields
  const bY = dy + docH * 0.84;
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.18 : 0.28);
  ctx.beginPath();
  ctx.roundRect(lx, bY, docW * 0.28, 4.5, 2);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(lx + docW * 0.48, bY, docW * 0.26, 4.5, 2);
  ctx.fill();
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.4 : 0.6);
  ctx.font = `400 ${Math.max(7, docW * 0.035)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Date", lx, bY + 9);
  ctx.fillText("Name", lx + docW * 0.48, bY + 9);
}

/* ── Shield overlay ── */
function drawShield(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  pulse: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const sw = scale * 115;
  const sh = sw * 1.18;
  const sy = cy - sh * 0.52;

  // Glow behind shield
  const glowR = sw * 0.7;
  const glow = ctx.createRadialGradient(cx, cy, glowR * 0.05, cx, cy, glowR);
  const glowAlpha = dark ? 0.08 + pulse * 0.05 : 0.1 + pulse * 0.06;
  glow.addColorStop(0, rgba(p.shield, glowAlpha));
  glow.addColorStop(1, rgba(p.shield, 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fill();

  // Shield shape
  ctx.beginPath();
  ctx.moveTo(cx, sy);
  ctx.quadraticCurveTo(cx + sw * 0.56, sy + sh * 0.07, cx + sw * 0.5, sy + sh * 0.44);
  ctx.quadraticCurveTo(cx + sw * 0.38, sy + sh * 0.86, cx, sy + sh);
  ctx.quadraticCurveTo(cx - sw * 0.38, sy + sh * 0.86, cx - sw * 0.5, sy + sh * 0.44);
  ctx.quadraticCurveTo(cx - sw * 0.56, sy + sh * 0.07, cx, sy);
  ctx.closePath();

  // Shield fill — visible
  ctx.fillStyle = rgba(p.shield, dark ? 0.08 : 0.09);
  ctx.fill();
  // Shield stroke — solid, visible
  ctx.strokeStyle = rgba(p.shield, dark ? 0.35 + pulse * 0.1 : 0.45 + pulse * 0.1);
  ctx.lineWidth = 2;
  ctx.stroke();

  // Lock icon in shield center
  const lcy = sy + sh * 0.4;
  const ls = sw * 0.13;
  ctx.strokeStyle = rgba(p.brand, dark ? 0.55 : 0.65);
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.roundRect(cx - ls, lcy, ls * 2, ls * 1.5, 2.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, lcy, ls * 0.7, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = rgba(p.brand, dark ? 0.45 : 0.55);
  ctx.beginPath();
  ctx.arc(cx, lcy + ls * 0.55, ls * 0.2, 0, Math.PI * 2);
  ctx.fill();
}

/* ── Checkmark badge ── */
function drawCheck(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const r = scale * 14;

  // Circle
  ctx.fillStyle = rgba(p.green, dark ? 0.18 : 0.2);
  ctx.strokeStyle = rgba(p.green, dark ? 0.7 : 0.85);
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Check mark
  ctx.strokeStyle = rgba(p.green, dark ? 0.9 : 1);
  ctx.lineWidth = 2.8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x - r * 0.32, y + r * 0.05);
  ctx.lineTo(x - r * 0.04, y + r * 0.33);
  ctx.lineTo(x + r * 0.38, y - r * 0.24);
  ctx.stroke();
}

/* ── Product cards ── */
function drawCards(
  ctx: CanvasRenderingContext2D,
  baseX: number,
  cy: number,
  scale: number,
  t: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const cw = scale * 92;
  const ch = cw * 0.52;
  const gap = ch + scale * 10;
  const totalH = PRODUCTS.length * gap - scale * 10;
  const startY = cy - totalH / 2;

  for (let i = 0; i < PRODUCTS.length; i++) {
    const pr = PRODUCTS[i];
    const col = getColor(pr.color, p);
    const float = Math.sin(t * 0.4 + i * 1.7) * 2.5;
    const cx = baseX;
    const cardY = startY + i * gap + float;

    // Shadow — clearly visible
    ctx.save();
    ctx.shadowColor = dark ? "rgba(0,0,0,0.35)" : "rgba(8,15,45,0.22)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = rgba(p.cardBg, 1);
    ctx.beginPath();
    ctx.roundRect(cx, cardY, cw, ch, 6);
    ctx.fill();
    ctx.restore();

    // Solid border
    ctx.strokeStyle = rgba(p.cardBorder, 1);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx, cardY, cw, ch, 6);
    ctx.stroke();

    // Left accent bar — bold
    ctx.fillStyle = rgba(col, dark ? 0.75 : 0.9);
    ctx.beginPath();
    ctx.roundRect(cx, cardY, 3, ch, [6, 0, 0, 6]);
    ctx.fill();

    // Product name — strong
    ctx.fillStyle = rgba(p.fg, dark ? 0.92 : 1);
    ctx.font = `600 ${Math.max(9, cw * 0.11)}px -apple-system, system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(pr.label, cx + 12, cardY + ch * 0.35);

    // Description — readable
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.6 : 0.8);
    ctx.font = `400 ${Math.max(7.5, cw * 0.085)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(pr.desc, cx + 12, cardY + ch * 0.7);
  }
}

/* ── Connection lines from doc to cards ── */
function drawLines(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  cy: number,
  scale: number,
  t: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const cw = scale * 92;
  const ch = cw * 0.52;
  const gap = ch + scale * 10;
  const totalH = PRODUCTS.length * gap - scale * 10;
  const startY = cy - totalH / 2;

  ctx.save();
  for (let i = 0; i < PRODUCTS.length; i++) {
    const float = Math.sin(t * 0.4 + i * 1.7) * 2.5;
    const endY = startY + i * gap + ch / 2 + float;
    const midX = (fromX + toX) / 2;

    // Dashed line — visible
    ctx.strokeStyle = rgba(p.line, dark ? 0.35 : 0.55);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3.5]);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.quadraticCurveTo(midX, endY, toX, endY);
    ctx.stroke();

    // Traveling dot — slow, visible
    const dotT = ((t * 0.06 + i * 0.25) % 1);
    const u = dotT;
    const dotX = (1 - u) * (1 - u) * fromX + 2 * (1 - u) * u * midX + u * u * toX;
    const dotY = (1 - u) * (1 - u) * fromY + 2 * (1 - u) * u * endY + u * u * endY;
    const col = getColor(PRODUCTS[i].color, p);
    ctx.setLineDash([]);
    ctx.fillStyle = rgba(col, dark ? 0.6 : 0.8);
    ctx.beginPath();
    ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.setLineDash([]);
  ctx.restore();
}

/* ── Floating crypto labels ── */
function drawCryptoLabels(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  ctx.save();
  const fontSize = Math.max(8.5, Math.min(w * 0.021, 11));
  ctx.font = `500 ${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const lbl of CRYPTO_LABELS) {
    const drift = Math.sin(t * lbl.speed) * 5;
    const x = lbl.x * w;
    const y = lbl.y * h + drift;
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.22 : 0.4);
    ctx.fillText(lbl.text, x, y);
  }
  ctx.restore();
}

/* ── Trust footer labels ── */
function drawTrust(
  ctx: CanvasRenderingContext2D,
  cx: number,
  y: number,
  w: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const labels = ["Legally Valid", "Tamper-Proof", "Encrypted"];
  const gap = Math.min(w * 0.2, 105);
  const total = (labels.length - 1) * gap;
  const sx = cx - total / 2;
  const fs = Math.max(8.5, Math.min(w * 0.023, 11));

  // Connecting line
  ctx.strokeStyle = rgba(p.line, dark ? 0.2 : 0.4);
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(sx - 10, y);
  ctx.lineTo(sx + total + 10, y);
  ctx.stroke();

  for (let i = 0; i < labels.length; i++) {
    const lx = sx + i * gap;

    // Dot
    ctx.fillStyle = rgba(p.brand, dark ? 0.45 : 0.6);
    ctx.beginPath();
    ctx.arc(lx, y, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Label — readable
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.58 : 0.82);
    ctx.font = `500 ${fs}px -apple-system, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(labels[i], lx, y + 8);
  }
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function HeroCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  const t0Ref = useRef(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas || !container) return;
      dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);
    t0Ref.current = performance.now();

    function draw(now: number) {
      if (!canvas || !container) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const t = (now - t0Ref.current) / 1000;
      const p = pal(isDark);
      const scale = Math.min(w / 520, h / 400, 1.3);

      ctx.clearRect(0, 0, w, h);

      const docCx = w * 0.36;
      const docCy = h * 0.46;
      const cardBaseX = w * 0.64;

      // Signature: 8s draw, 3s hold = 11s cycle
      const sigCycle = 11;
      const sigT = t % sigCycle;
      let sigCount: number;
      if (sigT < 8) {
        const progress = sigT / 8;
        const eased = 1 - Math.pow(1 - progress, 2.5);
        sigCount = Math.floor(eased * SIG.length);
      } else {
        sigCount = SIG.length;
      }

      const pulse = 0.5 + 0.5 * Math.sin(t * 0.35);

      // Layer 0: Floating crypto labels
      drawCryptoLabels(ctx, w, h, t, p, isDark);

      // Layer 1: Connection lines
      const docW = scale * 165;
      const docRight = docCx + docW / 2 + 5;
      drawLines(ctx, docRight, docCy, cardBaseX, docCy, scale, t, p, isDark);

      // Layer 2: Shield
      drawShield(ctx, docCx, docCy, scale, pulse, p, isDark);

      // Layer 3: Document
      drawDocument(ctx, docCx, docCy, scale, sigCount, p, isDark);

      // Layer 4: Checkmark
      drawCheck(ctx, docCx + docW * 0.42, docCy - docW * 1.32 * 0.46, scale, p, isDark);

      // Layer 5: Product cards
      drawCards(ctx, cardBaseX, docCy, scale, t, p, isDark);

      // Layer 6: Trust labels
      drawTrust(ctx, w * 0.5, h * 0.92, w, p, isDark);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ minHeight: 400 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
