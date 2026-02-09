"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════════
   SIGNBOLT HERO CANVAS — simplified 3-stage flow

   Stage 1: Stack of unsigned documents (folder drop)
   Stage 2: SignBolt engine (gear + shield)
   Stage 3: Signed documents with checkmarks + email

   Big, clear, readable. Crypto terms only. No tech stack.
   ═══════════════════════════════════════════════════════════ */

type RGB = readonly [number, number, number];

function rgba([r, g, b]: RGB, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function pal(dark: boolean) {
  return {
    brand: (dark ? [105, 155, 245] : [18, 52, 165]) as RGB,
    green: (dark ? [75, 195, 115] : [10, 110, 40]) as RGB,
    fg: (dark ? [230, 230, 238] : [10, 10, 18]) as RGB,
    fgMuted: (dark ? [140, 140, 158] : [60, 65, 80]) as RGB,
    docBg: (dark ? [34, 36, 54] : [255, 255, 255]) as RGB,
    docBorder: (dark ? [62, 68, 95] : [150, 158, 180]) as RGB,
    cardBg: (dark ? [30, 32, 48] : [248, 249, 255]) as RGB,
    cardBorder: (dark ? [58, 62, 88] : [140, 148, 170]) as RGB,
    line: (dark ? [75, 85, 125] : [110, 120, 150]) as RGB,
  };
}

/* ── rounded rect ── */
function rrect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | number[],
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/* ─────────────────────────────────────────────────────────
   DRAW: document page (with fold corner & text lines)
   ───────────────────────────────────────────────────────── */
function drawDoc(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
  signed: boolean,
) {
  const ear = w * 0.22;
  const borderColor = signed ? p.green : p.docBorder;

  // Shadow
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.3)" : "rgba(8,15,45,0.14)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = rgba(p.docBg, 1);
  ctx.beginPath();
  ctx.moveTo(x + 4, y);
  ctx.lineTo(x + w - ear, y);
  ctx.lineTo(x + w, y + ear);
  ctx.lineTo(x + w, y + h - 4);
  ctx.quadraticCurveTo(x + w, y + h, x + w - 4, y + h);
  ctx.lineTo(x + 4, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - 4);
  ctx.lineTo(x, y + 4);
  ctx.quadraticCurveTo(x, y, x + 4, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Border
  ctx.strokeStyle = rgba(borderColor, dark ? 0.5 : 0.45);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 4, y);
  ctx.lineTo(x + w - ear, y);
  ctx.lineTo(x + w, y + ear);
  ctx.lineTo(x + w, y + h - 4);
  ctx.quadraticCurveTo(x + w, y + h, x + w - 4, y + h);
  ctx.lineTo(x + 4, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - 4);
  ctx.lineTo(x, y + 4);
  ctx.quadraticCurveTo(x, y, x + 4, y);
  ctx.closePath();
  ctx.stroke();

  // Fold
  ctx.fillStyle = rgba(borderColor, dark ? 0.08 : 0.05);
  ctx.beginPath();
  ctx.moveTo(x + w - ear, y);
  ctx.lineTo(x + w - ear, y + ear);
  ctx.lineTo(x + w, y + ear);
  ctx.closePath();
  ctx.fill();

  // Text lines
  const pad = w * 0.12;
  const lineW = w - pad * 2;
  const startY = y + ear + pad * 0.6;
  const gap = h * 0.065;
  const widths = [1, 0.78, 0.92, 0.5, 0, 0.88, 0.65];
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.1 : 0.18);
  for (let i = 0; i < widths.length; i++) {
    if (widths[i] === 0) continue;
    const ly = startY + i * gap;
    if (ly > y + h * 0.65) break;
    rrect(ctx, x + pad, ly, lineW * widths[i], 3, 1.5);
    ctx.fill();
  }

  // Signed checkmark
  if (signed) {
    const cr = Math.min(w * 0.1, 12);
    const cx = x + w - cr - 8;
    const cy = y + h - cr - 8;
    ctx.fillStyle = rgba(p.green, dark ? 0.15 : 0.1);
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = rgba(p.green, dark ? 0.6 : 0.65);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = rgba(p.green, dark ? 0.9 : 1);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(cx - cr * 0.3, cy + cr * 0.05);
    ctx.lineTo(cx - cr * 0.02, cy + cr * 0.3);
    ctx.lineTo(cx + cr * 0.38, cy - cr * 0.22);
    ctx.stroke();
  }
}

/* ─────────────────────────────────────────────────────────
   DRAW: unsigned document stack (stage 1)
   ───────────────────────────────────────────────────────── */
function drawUnsignedStack(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  t: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const docW = 80 * scale;
  const docH = docW * 1.3;
  const stackCount = 5;
  const off = 4 * scale;

  for (let i = 0; i < stackCount; i++) {
    const dx = cx - docW / 2 + i * off;
    const dy = cy - docH / 2 - i * (off + 1);
    const float = Math.sin(t * 0.25 + i * 0.8) * 1.5;
    drawDoc(ctx, dx, dy + float, docW, docH, p, dark, false);
  }

  // "Your Documents" label
  ctx.fillStyle = rgba(p.fg, dark ? 0.7 : 0.8);
  ctx.font = `700 ${Math.round(12 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Your Documents", cx + (stackCount * off) / 2, cy + docH / 2 + 14 * scale);

  // Subtitle
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.45 : 0.55);
  ctx.font = `500 ${Math.round(9 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Drop a folder of PDFs", cx + (stackCount * off) / 2, cy + docH / 2 + 30 * scale);
}

/* ─────────────────────────────────────────────────────────
   DRAW: SignBolt engine (stage 2) — gear + shield
   ───────────────────────────────────────────────────────── */
function drawEngine(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  t: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const boxW = 140 * scale;
  const boxH = 130 * scale;
  const bx = cx - boxW / 2;
  const by = cy - boxH / 2;

  // Box background
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.35)" : "rgba(8,15,45,0.16)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, bx, by, boxW, boxH, 12);
  ctx.fill();
  ctx.restore();

  // Border
  ctx.strokeStyle = rgba(p.brand, dark ? 0.35 : 0.3);
  ctx.lineWidth = 2;
  rrect(ctx, bx, by, boxW, boxH, 12);
  ctx.stroke();

  // Header bar
  const hH = 28 * scale;
  ctx.fillStyle = rgba(p.brand, dark ? 0.08 : 0.05);
  rrect(ctx, bx, by, boxW, hH, [12, 12, 0, 0]);
  ctx.fill();
  ctx.strokeStyle = rgba(p.brand, dark ? 0.12 : 0.08);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bx, by + hH);
  ctx.lineTo(bx + boxW, by + hH);
  ctx.stroke();

  // Title
  ctx.fillStyle = rgba(p.brand, dark ? 0.85 : 0.9);
  ctx.font = `800 ${Math.round(11 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SignBolt", cx, by + hH / 2);

  // Rotating gear
  const gearCy = by + hH + (boxH - hH) * 0.4;
  const gearR = 22 * scale;

  ctx.save();
  ctx.translate(cx, gearCy);
  ctx.rotate(t * 0.35);

  // Gear teeth
  const teeth = 8;
  ctx.strokeStyle = rgba(p.brand, dark ? 0.25 : 0.2);
  ctx.lineWidth = 4 * scale;
  ctx.lineCap = "round";
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * gearR * 0.55, Math.sin(a) * gearR * 0.55);
    ctx.lineTo(Math.cos(a) * gearR, Math.sin(a) * gearR);
    ctx.stroke();
  }

  // Outer ring
  ctx.strokeStyle = rgba(p.brand, dark ? 0.2 : 0.15);
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.arc(0, 0, gearR * 0.55, 0, Math.PI * 2);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = rgba(p.brand, dark ? 0.25 : 0.18);
  ctx.beginPath();
  ctx.arc(0, 0, gearR * 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Shield icon below gear
  const shY = gearCy + gearR + 10 * scale;
  const shS = 12 * scale;
  ctx.strokeStyle = rgba(p.brand, dark ? 0.4 : 0.35);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, shY - shS);
  ctx.lineTo(cx + shS, shY - shS * 0.5);
  ctx.lineTo(cx + shS, shY + shS * 0.3);
  ctx.quadraticCurveTo(cx + shS, shY + shS, cx, shY + shS * 1.2);
  ctx.quadraticCurveTo(cx - shS, shY + shS, cx - shS, shY + shS * 0.3);
  ctx.lineTo(cx - shS, shY - shS * 0.5);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = rgba(p.brand, dark ? 0.06 : 0.04);
  ctx.fill();

  // Checkmark inside shield
  ctx.strokeStyle = rgba(p.brand, dark ? 0.6 : 0.55);
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(cx - shS * 0.3, shY + shS * 0.15);
  ctx.lineTo(cx - shS * 0.05, shY + shS * 0.4);
  ctx.lineTo(cx + shS * 0.35, shY - shS * 0.1);
  ctx.stroke();

  // Progress bar
  const barW = boxW * 0.7;
  const barH = 5 * scale;
  const barX = cx - barW / 2;
  const barY = by + boxH - 14 * scale;
  ctx.fillStyle = rgba(p.brand, dark ? 0.06 : 0.05);
  rrect(ctx, barX, barY, barW, barH, 3);
  ctx.fill();
  const progress = Math.sin(t * 0.45) * 0.25 + 0.75;
  ctx.fillStyle = rgba(p.brand, dark ? 0.25 : 0.18);
  rrect(ctx, barX, barY, barW * progress, barH, 3);
  ctx.fill();

  // Label below box
  ctx.fillStyle = rgba(p.fg, dark ? 0.7 : 0.8);
  ctx.font = `700 ${Math.round(12 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Batch Signing", cx, by + boxH + 14 * scale);

  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.45 : 0.55);
  ctx.font = `500 ${Math.round(9 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("PAdES + LTV Signatures", cx, by + boxH + 30 * scale);
}

/* ─────────────────────────────────────────────────────────
   DRAW: signed output stack + email (stage 3)
   ───────────────────────────────────────────────────────── */
function drawSignedOutput(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  t: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const docW = 80 * scale;
  const docH = docW * 1.3;
  const stackCount = 5;
  const off = 4 * scale;

  for (let i = 0; i < stackCount; i++) {
    const dx = cx - docW / 2 + i * off;
    const dy = cy - docH / 2 - i * (off + 1);
    const float = Math.sin(t * 0.25 + i * 0.8 + 2) * 1.5;
    drawDoc(ctx, dx, dy + float, docW, docH, p, dark, true);
  }

  // Label
  ctx.fillStyle = rgba(p.green, dark ? 0.7 : 0.75);
  ctx.font = `700 ${Math.round(12 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Signed & Delivered", cx + (stackCount * off) / 2, cy + docH / 2 + 14 * scale);

  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.45 : 0.55);
  ctx.font = `500 ${Math.round(9 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Auto-emailed to recipients", cx + (stackCount * off) / 2, cy + docH / 2 + 30 * scale);

  // Small envelope icon next to label
  const envX = cx + (stackCount * off) / 2 + 68 * scale;
  const envY = cy + docH / 2 + 26 * scale;
  const envW = 16 * scale;
  const envH = 11 * scale;
  ctx.strokeStyle = rgba(p.brand, dark ? 0.3 : 0.3);
  ctx.lineWidth = 1.2;
  rrect(ctx, envX, envY, envW, envH, 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(envX + 1, envY + 1);
  ctx.lineTo(envX + envW / 2, envY + envH * 0.6);
  ctx.lineTo(envX + envW - 1, envY + 1);
  ctx.stroke();
}

/* ─────────────────────────────────────────────────────────
   DRAW: flow arrow with animated dot
   ───────────────────────────────────────────────────────── */
function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
  color: RGB,
  dotColor: RGB,
  dark: boolean,
  scale: number,
) {
  // Dashed line
  ctx.strokeStyle = rgba(color, dark ? 0.2 : 0.25);
  ctx.lineWidth = 1.5 * scale;
  ctx.setLineDash([6 * scale, 4 * scale]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow head
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const hl = 8 * scale;
  ctx.fillStyle = rgba(color, dark ? 0.35 : 0.4);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hl * Math.cos(angle - 0.45), y2 - hl * Math.sin(angle - 0.45));
  ctx.lineTo(x2 - hl * Math.cos(angle + 0.45), y2 - hl * Math.sin(angle + 0.45));
  ctx.closePath();
  ctx.fill();

  // Traveling dot
  const prog = (t * 0.12) % 1;
  const dx = x1 + (x2 - x1) * prog;
  const dy = y1 + (y2 - y1) * prog;
  ctx.fillStyle = rgba(dotColor, dark ? 0.55 : 0.65);
  ctx.beginPath();
  ctx.arc(dx, dy, 3.5 * scale, 0, Math.PI * 2);
  ctx.fill();
}

/* ─────────────────────────────────────────────────────────
   DRAW: step number badge
   ───────────────────────────────────────────────────────── */
function drawStepBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  step: string,
  scale: number,
  p: ReturnType<typeof pal>,
  dark: boolean,
) {
  const r = 12 * scale;
  ctx.fillStyle = rgba(p.brand, dark ? 0.1 : 0.07);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = rgba(p.brand, dark ? 0.25 : 0.2);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = rgba(p.brand, dark ? 0.75 : 0.85);
  ctx.font = `800 ${Math.round(10 * scale)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(step, x, y);
}

/* ═══════════════════════════════════════════════════════════
   MAIN DRAW
   ═══════════════════════════════════════════════════════════ */
function drawAll(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  dark: boolean,
) {
  const p = pal(dark);
  ctx.clearRect(0, 0, w, h);

  // Scale based on canvas size. The design assumes ~580×380.
  const scale = Math.min(w / 580, h / 380, 1.4);

  // Three column centers
  const col1 = w * 0.17;
  const col2 = w * 0.50;
  const col3 = w * 0.83;
  const midY = h * 0.44;

  // ── Step badges at top ──
  const badgeY = h * 0.08;
  drawStepBadge(ctx, col1, badgeY, "1", scale, p, dark);
  drawStepBadge(ctx, col2, badgeY, "2", scale, p, dark);
  drawStepBadge(ctx, col3, badgeY, "3", scale, p, dark);

  // ── Stage 1: Unsigned documents ──
  drawUnsignedStack(ctx, col1, midY, scale, t, p, dark);

  // ── Stage 2: Engine ──
  drawEngine(ctx, col2, midY, scale, t, p, dark);

  // ── Stage 3: Signed output ──
  drawSignedOutput(ctx, col3, midY, scale, t, p, dark);

  // ── Arrows ──
  const arrowY = midY;
  const gap = 20 * scale;

  // Arrow 1 → 2
  drawArrow(
    ctx,
    col1 + 60 * scale,
    arrowY,
    col2 - 76 * scale,
    arrowY,
    t,
    p.line,
    p.brand,
    dark,
    scale,
  );

  // Arrow 2 → 3
  drawArrow(
    ctx,
    col2 + 76 * scale,
    arrowY,
    col3 - 60 * scale,
    arrowY,
    t + 2,
    p.line,
    p.green,
    dark,
    scale,
  );

  // ── Bottom crypto strip ──
  const stripY = h * 0.92;
  const labels = ["SHA-256", "X.509", "PAdES", "LTV", "Tamper-Proof"];
  const stripGap = Math.min(w * 0.17, 95);
  const stripW = (labels.length - 1) * stripGap;
  const stripX = w / 2 - stripW / 2;

  // Line
  ctx.strokeStyle = rgba(p.line, dark ? 0.1 : 0.16);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(stripX - 8, stripY);
  ctx.lineTo(stripX + stripW + 8, stripY);
  ctx.stroke();

  for (let i = 0; i < labels.length; i++) {
    const lx = stripX + i * stripGap;
    ctx.fillStyle = rgba(p.brand, dark ? 0.25 : 0.35);
    ctx.beginPath();
    ctx.arc(lx, stripY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.35 : 0.5);
    ctx.font = `600 ${Math.round(8 * scale)}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(labels[i], lx, stripY + 7);
  }
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function SignBoltHeroCanvas({ className = "" }: { className?: string }) {
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

      drawAll(ctx, w, h, t, isDark);
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ minHeight: 340 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
