"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════════
   SIGNPAD HERO CANVAS — interactive animated illustration

   Shows the full SignPad flow:
     Upload PDF → Place Fields → Send → [3 signing methods] → Audit Trail

   All layout proportional to canvas size. Uses amber accent
   palette consistent with SignPad's brand color.
   ═══════════════════════════════════════════════════════════ */

type RGB = readonly [number, number, number];

function rgba([r, g, b]: RGB, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function pal(dark: boolean) {
  return {
    amber: (dark ? [215, 175, 55] : [165, 115, 15]) as RGB,
    amberBright: (dark ? [245, 205, 75] : [195, 140, 25]) as RGB,
    amberSoft: (dark ? [215, 175, 55] : [180, 130, 20]) as RGB,
    green: (dark ? [75, 195, 115] : [10, 130, 50]) as RGB,
    blue: (dark ? [100, 160, 235] : [45, 100, 190]) as RGB,
    violet: (dark ? [148, 130, 235] : [90, 60, 175]) as RGB,
    fg: (dark ? [230, 230, 238] : [10, 10, 18]) as RGB,
    fgMuted: (dark ? [140, 140, 158] : [80, 85, 100]) as RGB,
    cardBg: (dark ? [30, 32, 48] : [255, 255, 255]) as RGB,
    cardBorder: (dark ? [62, 68, 95] : [180, 185, 200]) as RGB,
    line: (dark ? [85, 92, 135] : [140, 148, 175]) as RGB,
    docBg: (dark ? [38, 40, 56] : [250, 248, 245]) as RGB,
  };
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | number[]) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/* ═══════════════════════════════════════════════════════════
   MAIN DRAW
   ═══════════════════════════════════════════════════════════ */
function drawAll(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dark: boolean) {
  const p = pal(dark);
  ctx.clearRect(0, 0, w, h);

  // Font size proportional to canvas
  const f = Math.min(w, h * 1.8);
  const fs = (n: number) => Math.max(Math.round(f * n), 8);

  // ── Layout columns ──
  // Left: document preview, Center: signing methods hub, Right: completed doc + audit
  const colL = w * 0.18;       // Upload + edit
  const colC = w * 0.50;       // Signing methods (center hub)
  const colR = w * 0.82;       // Completed + audit

  const topRow = h * 0.15;     // Top area for labels
  const midRow = h * 0.46;     // Main element row
  const botRow = h * 0.88;     // Bottom strip

  // ────────────────────────────────────────────────────────
  //  1. DOCUMENT (left) — the PDF being prepared
  // ────────────────────────────────────────────────────────
  const dW = w * 0.2;
  const dH = h * 0.52;
  const dx = colL - dW / 2;
  const dy = midRow - dH / 2;

  // Shadow
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(140,100,20,0.12)";
  ctx.shadowBlur = 20; ctx.shadowOffsetY = 5;
  ctx.fillStyle = rgba(p.docBg, 1);
  rrect(ctx, dx, dy, dW, dH, 8); ctx.fill();
  ctx.restore();

  // Border
  ctx.strokeStyle = rgba(p.amber, dark ? 0.35 : 0.25);
  ctx.lineWidth = 1.8;
  rrect(ctx, dx, dy, dW, dH, 8); ctx.stroke();

  // Title bar inside doc
  const dtH = dH * 0.12;
  ctx.fillStyle = rgba(p.amber, dark ? 0.06 : 0.04);
  rrect(ctx, dx, dy, dW, dtH, [8, 8, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.amber, dark ? 0.1 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(dx, dy + dtH); ctx.lineTo(dx + dW, dy + dtH); ctx.stroke();

  // Doc title
  ctx.fillStyle = rgba(p.amber, dark ? 0.8 : 0.85);
  ctx.font = `700 ${fs(0.013)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("CONTRACT.PDF", colL, dy + dtH / 2);

  // Content lines (simulated document text)
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.1 : 0.15);
  const lineStartY = dy + dtH + dH * 0.06;
  for (const [i, lw] of [0.9, 0.65, 0.8, 0.5, 0.75, 0.6].entries()) {
    rrect(ctx, dx + 10, lineStartY + i * dH * 0.06, (dW - 20) * lw, 3, 1.5); ctx.fill();
  }

  // Signature field placeholders (animated gentle pulse)
  const fieldAlpha = 0.4 + Math.sin(t * 1.5) * 0.1;
  const fieldY = dy + dH * 0.56;
  for (let i = 0; i < 2; i++) {
    ctx.strokeStyle = rgba(p.amber, fieldAlpha);
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    rrect(ctx, dx + 10, fieldY + i * dH * 0.17, dW - 20, dH * 0.12, 4); ctx.stroke();
    ctx.setLineDash([]);

    // Field label
    ctx.fillStyle = rgba(p.amber, fieldAlpha * 0.8);
    ctx.font = `600 ${fs(0.009)}px -apple-system, system-ui, sans-serif`;
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(i === 0 ? "Signer A" : "Signer B", dx + 16, fieldY + i * dH * 0.17 + dH * 0.06);

    // Pen icon
    const penX = dx + dW - 22;
    const penY = fieldY + i * dH * 0.17 + dH * 0.06;
    ctx.strokeStyle = rgba(p.amber, fieldAlpha * 0.6);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(penX - 4, penY + 4);
    ctx.lineTo(penX + 4, penY - 4);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(penX - 4, penY + 4, 1, 0, Math.PI * 2); ctx.fill();
  }

  // Label below document
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.018)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("Upload & Design", colL, dy + dH + h * 0.02);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.012)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Drag fields onto your PDF", colL, dy + dH + h * 0.055);

  // ────────────────────────────────────────────────────────
  //  2. SIGNING METHODS HUB (center) — three options
  // ────────────────────────────────────────────────────────
  // Hub circle
  const hubR = Math.min(w * 0.058, h * 0.09);
  const hubGlow = ctx.createRadialGradient(colC, midRow, 0, colC, midRow, hubR * 2.5);
  hubGlow.addColorStop(0, rgba(p.amber, dark ? 0.08 : 0.06));
  hubGlow.addColorStop(1, rgba(p.amber, 0));
  ctx.fillStyle = hubGlow;
  ctx.beginPath(); ctx.arc(colC, midRow, hubR * 2.5, 0, Math.PI * 2); ctx.fill();

  // Hub ring
  ctx.strokeStyle = rgba(p.amber, dark ? 0.4 : 0.32);
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(colC, midRow, hubR, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = rgba(p.amber, dark ? 0.06 : 0.04);
  ctx.beginPath(); ctx.arc(colC, midRow, hubR, 0, Math.PI * 2); ctx.fill();

  // "SEND" text in hub
  ctx.fillStyle = rgba(p.amber, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.018)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("SEND", colC, midRow - fs(0.006));
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.009)}px monospace`;
  ctx.fillText("1 credit", colC, midRow + fs(0.014));

  // ── Arrow from document to hub ──
  const arrowStartX = dx + dW + 4;
  const arrowEndX = colC - hubR - 8;
  drawFlowArrow(ctx, arrowStartX, midRow, arrowEndX, midRow, t, p.amber, p.amberBright, dark, fs);

  // ── Three signing methods branching from hub ──
  const methods = [
    { label: "e-Sign", sub: "Draw / Type / Upload", color: p.amberSoft, y: midRow - h * 0.22, icon: "pen" as const },
    { label: "DSC via USB", sub: "X.509 Certificate", color: p.blue, y: midRow, icon: "usb" as const },
    { label: "Aadhaar OTP", sub: "IT Act Compliant", color: p.violet, y: midRow + h * 0.22, icon: "aadhaar" as const },
  ];

  const methodStartX = colC + hubR + 8;
  const methodCardW = w * 0.16;
  const methodCardH = h * 0.13;
  const methodCardX = methodStartX + w * 0.04;

  for (let i = 0; i < methods.length; i++) {
    const m = methods[i];

    // Curved arrow from hub to method card
    const fromY = midRow;
    const toX = methodCardX;
    const toY = m.y;

    ctx.strokeStyle = rgba(m.color, dark ? 0.2 : 0.22);
    ctx.lineWidth = 1.8;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(methodStartX, fromY);
    ctx.quadraticCurveTo(methodStartX + w * 0.02, toY, toX, toY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Traveling dot
    const prog = ((t * 0.1 + i * 0.3) % 1);
    const dotT = prog;
    const dotX = (1 - dotT) * (1 - dotT) * methodStartX + 2 * (1 - dotT) * dotT * (methodStartX + w * 0.02) + dotT * dotT * toX;
    const dotY = (1 - dotT) * (1 - dotT) * fromY + 2 * (1 - dotT) * dotT * toY + dotT * dotT * toY;
    ctx.save();
    ctx.shadowColor = rgba(m.color, 0.5); ctx.shadowBlur = 8;
    ctx.fillStyle = rgba(m.color, dark ? 0.7 : 0.8);
    ctx.beginPath(); ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Method card
    const cardY = m.y - methodCardH / 2;
    ctx.save();
    ctx.shadowColor = dark ? "rgba(0,0,0,0.3)" : "rgba(20,10,60,0.1)";
    ctx.shadowBlur = 14; ctx.shadowOffsetY = 3;
    ctx.fillStyle = rgba(p.cardBg, 1);
    rrect(ctx, methodCardX, cardY, methodCardW, methodCardH, 8); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = rgba(m.color, dark ? 0.3 : 0.22);
    ctx.lineWidth = 1.5;
    rrect(ctx, methodCardX, cardY, methodCardW, methodCardH, 8); ctx.stroke();

    // Left accent bar on card
    ctx.fillStyle = rgba(m.color, dark ? 0.5 : 0.4);
    rrect(ctx, methodCardX, cardY, 3, methodCardH, [8, 0, 0, 8]); ctx.fill();

    // Icon area
    const iconCx = methodCardX + methodCardW * 0.15;
    const iconCy = m.y;
    drawMethodIcon(ctx, m.icon, iconCx, iconCy, Math.min(methodCardH * 0.25, 12), m.color, dark);

    // Label
    ctx.fillStyle = rgba(p.fg, dark ? 0.88 : 0.92);
    ctx.font = `700 ${fs(0.014)}px -apple-system, system-ui, sans-serif`;
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(m.label, methodCardX + methodCardW * 0.28, m.y - methodCardH * 0.14);

    // Sub label
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
    ctx.font = `500 ${fs(0.01)}px monospace`;
    ctx.fillText(m.sub, methodCardX + methodCardW * 0.28, m.y + methodCardH * 0.18);
  }

  // ── Arrows from method cards to completed doc ──
  const completedX = colR - w * 0.09;
  for (let i = 0; i < methods.length; i++) {
    const m = methods[i];
    const fromX = methodCardX + methodCardW + 4;
    const fromY = m.y;
    const toX2 = completedX - 4;
    const toY2 = midRow;

    ctx.strokeStyle = rgba(p.green, dark ? 0.15 : 0.18);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.quadraticCurveTo(fromX + w * 0.03, toY2, toX2, toY2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // ────────────────────────────────────────────────────────
  //  3. COMPLETED DOCUMENT (right)
  // ────────────────────────────────────────────────────────
  const cW = w * 0.14;
  const cH = h * 0.38;
  const cx = colR - cW / 2;
  const cy = midRow - cH / 2;

  // Shadow
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(10,90,40,0.12)";
  ctx.shadowBlur = 18; ctx.shadowOffsetY = 4;
  ctx.fillStyle = rgba(p.docBg, 1);
  rrect(ctx, cx, cy, cW, cH, 8); ctx.fill();
  ctx.restore();

  // Green border = completed
  ctx.strokeStyle = rgba(p.green, dark ? 0.45 : 0.35);
  ctx.lineWidth = 2;
  rrect(ctx, cx, cy, cW, cH, 8); ctx.stroke();

  // Completed badge
  const badgeW = cW * 0.7;
  const badgeH = cH * 0.09;
  const badgeX = colR - badgeW / 2;
  const badgeY = cy + cH * 0.08;
  ctx.fillStyle = rgba(p.green, dark ? 0.12 : 0.08);
  rrect(ctx, badgeX, badgeY, badgeW, badgeH, 4); ctx.fill();
  ctx.fillStyle = rgba(p.green, dark ? 0.8 : 0.85);
  ctx.font = `700 ${fs(0.01)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("COMPLETED", colR, badgeY + badgeH / 2);

  // Content lines
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.08 : 0.12);
  const cLineY = badgeY + badgeH + cH * 0.06;
  for (const [i, lw] of [0.85, 0.6, 0.75, 0.5].entries()) {
    rrect(ctx, cx + 8, cLineY + i * cH * 0.06, (cW - 16) * lw, 2.5, 1); ctx.fill();
  }

  // Signature rendered
  const sigY = cy + cH * 0.55;
  ctx.strokeStyle = rgba(p.amber, dark ? 0.5 : 0.45);
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(cx + 10, sigY + 8);
  ctx.quadraticCurveTo(cx + cW * 0.3, sigY - 8, cx + cW * 0.5, sigY + 2);
  ctx.quadraticCurveTo(cx + cW * 0.7, sigY + 12, cx + cW - 10, sigY - 2);
  ctx.stroke();

  // Checkmark circle
  const checkX = cx + cW - 18;
  const checkY2 = sigY - 8;
  const checkR = 8;
  ctx.fillStyle = rgba(p.green, dark ? 0.2 : 0.15);
  ctx.beginPath(); ctx.arc(checkX, checkY2, checkR, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = rgba(p.green, dark ? 0.8 : 0.85);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(checkX - 4, checkY2);
  ctx.lineTo(checkX - 1, checkY2 + 3);
  ctx.lineTo(checkX + 4, checkY2 - 3);
  ctx.stroke();

  // SHA-256 hash at bottom of doc
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.06 : 0.08);
  rrect(ctx, cx + 6, cy + cH - cH * 0.16, cW - 12, cH * 0.1, 3); ctx.fill();
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.35 : 0.45);
  ctx.font = `500 ${fs(0.007)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("SHA-256: a3f2c7...", colR, cy + cH - cH * 0.11);

  // Label below
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.018)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("Signed & Sealed", colR, cy + cH + h * 0.02);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.012)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Tamper-proof audit trail", colR, cy + cH + h * 0.055);

  // ────────────────────────────────────────────────────────
  //  BOTTOM STRIP — security & compliance badges
  // ────────────────────────────────────────────────────────
  const labels = [
    { text: "SHA-256", desc: "integrity hashing" },
    { text: "IT Act 2000", desc: "Aadhaar eSign" },
    { text: "X.509 Certs", desc: "DSC signing" },
    { text: "Audit Trail", desc: "non-repudiation" },
    { text: "Webhooks", desc: "real-time events" },
  ];
  const gap = Math.min(w * 0.18, 130);
  const totalWidth = (labels.length - 1) * gap;
  const startX = w / 2 - totalWidth / 2;

  // Divider line
  ctx.strokeStyle = rgba(p.line, dark ? 0.12 : 0.16);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(startX - 20, botRow); ctx.lineTo(startX + totalWidth + 20, botRow); ctx.stroke();

  for (let i = 0; i < labels.length; i++) {
    const lx = startX + i * gap;
    // Dot
    ctx.fillStyle = rgba(p.amber, dark ? 0.45 : 0.5);
    ctx.beginPath(); ctx.arc(lx, botRow, 3.5, 0, Math.PI * 2); ctx.fill();
    // Label
    ctx.fillStyle = rgba(p.amber, dark ? 0.65 : 0.7);
    ctx.font = `700 ${fs(0.012)}px monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(labels[i].text, lx, botRow + 7);
    // Sub
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.4 : 0.5);
    ctx.font = `500 ${fs(0.009)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(labels[i].desc, lx, botRow + 7 + fs(0.014));
  }
}

/* ── Helper: flow arrow with traveling dot ── */
function drawFlowArrow(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  t: number, color: RGB, dot: RGB, dark: boolean,
  fs: (n: number) => number,
) {
  // Dashed line
  ctx.strokeStyle = rgba(color, dark ? 0.22 : 0.25);
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.setLineDash([]);

  // Arrow head
  ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10, y2 - 5);
  ctx.lineTo(x2 - 10, y2 + 5);
  ctx.closePath(); ctx.fill();

  // Traveling dot
  const prog = (t * 0.12) % 1;
  const px = x1 + (x2 - x1) * prog;
  const py = y1 + (y2 - y1) * prog;
  ctx.save();
  ctx.shadowColor = rgba(dot, 0.5); ctx.shadowBlur = 10;
  ctx.fillStyle = rgba(dot, dark ? 0.75 : 0.85);
  ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.fillStyle = rgba(dot, dark ? 0.95 : 1);
  ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
}

/* ── Helper: draw method icons ── */
function drawMethodIcon(
  ctx: CanvasRenderingContext2D,
  icon: "pen" | "usb" | "aadhaar",
  cx: number, cy: number, size: number,
  color: RGB, dark: boolean,
) {
  ctx.strokeStyle = rgba(color, dark ? 0.6 : 0.65);
  ctx.fillStyle = rgba(color, dark ? 0.12 : 0.08);
  ctx.lineWidth = 1.5;

  if (icon === "pen") {
    // Pen / draw icon
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.6, cy + size * 0.6);
    ctx.lineTo(cx + size * 0.3, cy - size * 0.5);
    ctx.lineTo(cx + size * 0.6, cy - size * 0.2);
    ctx.lineTo(cx - size * 0.3, cy + size * 0.9);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  } else if (icon === "usb") {
    // USB token
    const hw = size * 0.4;
    const hh = size * 0.8;
    rrect(ctx, cx - hw, cy - hh, hw * 2, hh * 2, 3); ctx.fill(); ctx.stroke();
    // Connector
    ctx.fillStyle = rgba(color, dark ? 0.3 : 0.25);
    rrect(ctx, cx - hw * 0.5, cy - hh - size * 0.35, hw, size * 0.35, [2, 2, 0, 0]); ctx.fill();
  } else {
    // Aadhaar logo — sun with rounded petals + red swoosh
    const r = size * 0.85;
    // Petal colors: yellow/amber petals like the real Aadhaar logo
    const petalColor: RGB = dark ? [250, 182, 15] : [220, 160, 10];
    const swooshColor: RGB = dark ? [213, 39, 54] : [180, 30, 45];

    // Draw 8 rounded petals radiating from center (the Aadhaar sun)
    const petalCount = 8;
    const innerR = r * 0.22;
    const petalLen = r * 0.6;
    const petalW = r * 0.22;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2 - Math.PI / 2;
      const tipX = cx + Math.cos(angle) * (innerR + petalLen);
      const tipY = cy + Math.sin(angle) * (innerR + petalLen);
      const baseX = cx + Math.cos(angle) * innerR;
      const baseY = cy + Math.sin(angle) * innerR;
      // Perpendicular offset for petal width
      const perpX = -Math.sin(angle) * petalW;
      const perpY = Math.cos(angle) * petalW;

      ctx.fillStyle = rgba(petalColor, dark ? 0.65 : 0.7);
      ctx.beginPath();
      ctx.moveTo(baseX + perpX, baseY + perpY);
      ctx.quadraticCurveTo(tipX + perpX * 0.3, tipY + perpY * 0.3, tipX, tipY);
      ctx.quadraticCurveTo(tipX - perpX * 0.3, tipY - perpY * 0.3, baseX - perpX, baseY - perpY);
      ctx.closePath();
      ctx.fill();
    }

    // Center dot
    ctx.fillStyle = rgba(petalColor, dark ? 0.8 : 0.85);
    ctx.beginPath(); ctx.arc(cx, cy, innerR * 0.8, 0, Math.PI * 2); ctx.fill();

    // Red swoosh — the distinctive Aadhaar fingerprint curve
    ctx.strokeStyle = rgba(swooshColor, dark ? 0.7 : 0.75);
    ctx.lineWidth = Math.max(1.5, size * 0.12);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.15, r * 0.75, Math.PI * 1.15, Math.PI * 0.25, true);
    ctx.stroke();
    ctx.lineCap = "butt";
  }
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function SignPadHeroCanvas({ className = "" }: { className?: string }) {
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
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      drawAll(ctx, cw, ch, (now - t0Ref.current) / 1000, isDark);
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [isDark]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ minHeight: 380 }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
