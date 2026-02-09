"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════════
   SIGNLIFT HERO CANVAS — REST API integration flow

   Flow (left → right):
     Your App  ──POST──→  SignLift API  ──→  Signed PDF
                              ↑
                         Certificate
                        (PKCS#12 / S3)

   Shows the complete signing pipeline as an animated diagram
   that non-tech and dev audiences both understand.
   ═══════════════════════════════════════════════════════════ */

type RGB = readonly [number, number, number];

function rgba([r, g, b]: RGB, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function pal(dark: boolean) {
  return {
    cyan: (dark ? [95, 190, 210] : [12, 100, 120]) as RGB,
    cyanBright: (dark ? [130, 215, 235] : [20, 140, 165]) as RGB,
    green: (dark ? [75, 195, 115] : [10, 130, 50]) as RGB,
    fg: (dark ? [230, 230, 238] : [10, 10, 18]) as RGB,
    fgMuted: (dark ? [140, 140, 158] : [80, 85, 100]) as RGB,
    cardBg: (dark ? [30, 32, 48] : [255, 255, 255]) as RGB,
    cardBorder: (dark ? [62, 68, 95] : [180, 185, 200]) as RGB,
    line: (dark ? [85, 92, 135] : [140, 148, 175]) as RGB,
    codeBg: (dark ? [22, 24, 38] : [245, 246, 252]) as RGB,
  };
}

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
   DRAW: Your App (left column)
   Shows a code snippet making a POST request
   ───────────────────────────────────────────────────────── */
function drawYourApp(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  f: (n: number) => number,
  p: ReturnType<typeof pal>,
  dark: boolean,
  t: number,
) {
  const bW = w * 0.24;
  const bH = h * 0.48;
  const bx = cx - bW / 2;
  const by = cy - bH / 2;

  // Shadow + fill
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(12,50,60,0.14)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, bx, by, bW, bH, 10);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.cardBorder, dark ? 0.5 : 0.55);
  ctx.lineWidth = 1.5;
  rrect(ctx, bx, by, bW, bH, 10);
  ctx.stroke();

  // Title bar
  const tbH = bH * 0.14;
  ctx.fillStyle = rgba(p.fg, dark ? 0.03 : 0.025);
  rrect(ctx, bx, by, bW, tbH, [10, 10, 0, 0]);
  ctx.fill();
  ctx.strokeStyle = rgba(p.fg, dark ? 0.06 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(bx, by + tbH);
  ctx.lineTo(bx + bW, by + tbH);
  ctx.stroke();

  // Traffic lights
  const dotR = Math.max(bW * 0.02, 3);
  const cols: RGB[] = [
    [255, 95, 87],
    [255, 189, 46],
    [40, 202, 65],
  ];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = rgba(cols[i], dark ? 0.65 : 0.7);
    ctx.beginPath();
    ctx.arc(bx + 14 + i * dotR * 3.5, by + tbH / 2, dotR, 0, Math.PI * 2);
    ctx.fill();
  }

  // "your-app.ts" tab
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.45 : 0.5);
  ctx.font = `500 ${f(0.011)}px monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("your-app.ts", bx + bW * 0.2, by + tbH / 2);

  // Code block
  const codeY = by + tbH + 10;
  const lineH = f(0.018);
  const pad = 12;
  const codeLines = [
    { text: "const res = await fetch(", color: p.fg },
    { text: '  "https://api/v1/sign",', color: p.cyan },
    { text: "  {", color: p.fg },
    { text: '    method: "POST",', color: p.fgMuted },
    { text: "    headers: {", color: p.fgMuted },
    { text: '      "X-API-Token": jwt', color: p.cyan },
    { text: "    },", color: p.fgMuted },
    { text: "    body: formData", color: p.fgMuted },
    { text: "  }", color: p.fg },
    { text: ");", color: p.fg },
  ];

  ctx.font = `500 ${f(0.0098)}px monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  for (let i = 0; i < codeLines.length; i++) {
    const ly = codeY + i * lineH;
    if (ly + lineH > by + bH - 10) break;
    const line = codeLines[i];
    ctx.fillStyle = rgba(line.color, dark ? 0.65 : 0.75);
    ctx.fillText(line.text, bx + pad, ly);
  }

  // Label below
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${f(0.02)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Your Application", cx, by + bH + h * 0.025);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${f(0.013)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Any language, any framework", cx, by + bH + h * 0.06);
}

/* ─────────────────────────────────────────────────────────
   DRAW: SignLift API (center)
   Shows the signing engine with cert source branching
   ───────────────────────────────────────────────────────── */
function drawSignLiftAPI(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  f: (n: number) => number,
  p: ReturnType<typeof pal>,
  dark: boolean,
  t: number,
) {
  const aW = w * 0.2;
  const aH = h * 0.42;
  const ax = cx - aW / 2;
  const ay = cy - aH / 2;

  // Glow
  const glowR = aW * 0.95;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
  grad.addColorStop(0, rgba(p.cyan, dark ? 0.08 : 0.06));
  grad.addColorStop(1, rgba(p.cyan, 0));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fill();

  // Box
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(12,50,60,0.14)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, ax, ay, aW, aH, 12);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.cyan, dark ? 0.4 : 0.32);
  ctx.lineWidth = 2;
  rrect(ctx, ax, ay, aW, aH, 12);
  ctx.stroke();

  // Header bar
  const ahH = aH * 0.18;
  ctx.fillStyle = rgba(p.cyan, dark ? 0.07 : 0.04);
  rrect(ctx, ax, ay, aW, ahH, [12, 12, 0, 0]);
  ctx.fill();
  ctx.strokeStyle = rgba(p.cyan, dark ? 0.1 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(ax, ay + ahH);
  ctx.lineTo(ax + aW, ay + ahH);
  ctx.stroke();

  // Status LED
  const ledP = Math.sin(t * 2) * 0.2 + 0.7;
  ctx.fillStyle = rgba(p.green, ledP);
  ctx.beginPath();
  ctx.arc(ax + 14, ay + ahH / 2, 4, 0, Math.PI * 2);
  ctx.fill();

  // Title
  ctx.fillStyle = rgba(p.cyan, dark ? 0.88 : 0.92);
  ctx.font = `800 ${f(0.016)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("SignLift", ax + 26, ay + ahH / 2);

  // Deployment badge
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.3 : 0.35);
  ctx.font = `600 ${f(0.009)}px monospace`;
  ctx.textAlign = "right";
  ctx.fillText("API", ax + aW - 10, ay + ahH / 2);

  // Inner content — shield + signing visualization
  const contentY = ay + ahH + 8;
  const contentH = aH - ahH - 16;

  // Shield icon (representing signing)
  const shCy = contentY + contentH * 0.32;
  const shR = aW * 0.16;
  ctx.beginPath();
  ctx.moveTo(cx, shCy - shR);
  ctx.lineTo(cx + shR * 0.85, shCy - shR * 0.45);
  ctx.lineTo(cx + shR * 0.85, shCy + shR * 0.3);
  ctx.quadraticCurveTo(cx + shR * 0.85, shCy + shR * 0.95, cx, shCy + shR * 1.15);
  ctx.quadraticCurveTo(cx - shR * 0.85, shCy + shR * 0.95, cx - shR * 0.85, shCy + shR * 0.3);
  ctx.lineTo(cx - shR * 0.85, shCy - shR * 0.45);
  ctx.closePath();
  ctx.fillStyle = rgba(p.cyan, dark ? 0.08 : 0.05);
  ctx.fill();
  ctx.strokeStyle = rgba(p.cyan, dark ? 0.45 : 0.38);
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Checkmark inside shield
  ctx.strokeStyle = rgba(p.cyan, dark ? 0.75 : 0.7);
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(cx - shR * 0.28, shCy + shR * 0.1);
  ctx.lineTo(cx - shR * 0.02, shCy + shR * 0.35);
  ctx.lineTo(cx + shR * 0.35, shCy - shR * 0.15);
  ctx.stroke();

  // Labels inside box
  ctx.fillStyle = rgba(p.cyan, dark ? 0.6 : 0.65);
  ctx.font = `700 ${f(0.011)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("PAdES Signing", cx, shCy + shR * 1.3);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.35 : 0.4);
  ctx.font = `500 ${f(0.009)}px monospace`;
  ctx.fillText("Long-Term Validation", cx, shCy + shR * 1.3 + f(0.015));

  // Progress bar (animated)
  const barW = aW * 0.7;
  const barH2 = 4;
  const barX = cx - barW / 2;
  const barY = ay + aH - 12;
  ctx.fillStyle = rgba(p.cyan, dark ? 0.06 : 0.05);
  rrect(ctx, barX, barY, barW, barH2, 2);
  ctx.fill();
  const progress = Math.sin(t * 0.5) * 0.2 + 0.8;
  ctx.fillStyle = rgba(p.cyan, dark ? 0.25 : 0.18);
  rrect(ctx, barX, barY, barW * progress, barH2, 2);
  ctx.fill();

  // Label below box
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${f(0.02)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("SignLift API", cx, ay + aH + h * 0.025);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${f(0.013)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Spring Boot or AWS Lambda", cx, ay + aH + h * 0.06);

  // ── Certificate source (below the API box) ──
  const certY = ay + aH + h * 0.12;
  const certW = aW * 1.1;
  const certH2 = h * 0.11;
  const certX = cx - certW / 2;

  // Connector line from API box
  ctx.strokeStyle = rgba(p.cyan, dark ? 0.2 : 0.22);
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(cx, ay + aH);
  ctx.lineTo(cx, certY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Cert box
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.25)" : "rgba(12,50,60,0.08)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, certX, certY, certW, certH2, 8);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.cyan, dark ? 0.25 : 0.2);
  ctx.lineWidth = 1.2;
  rrect(ctx, certX, certY, certW, certH2, 8);
  ctx.stroke();

  // Shield mini icon
  const miniS = certH2 * 0.28;
  const miniCx = certX + 14;
  const miniCy = certY + certH2 / 2;
  ctx.beginPath();
  ctx.moveTo(miniCx, miniCy - miniS);
  ctx.lineTo(miniCx + miniS * 0.8, miniCy - miniS * 0.4);
  ctx.lineTo(miniCx + miniS * 0.8, miniCy + miniS * 0.3);
  ctx.quadraticCurveTo(miniCx + miniS * 0.8, miniCy + miniS * 0.9, miniCx, miniCy + miniS * 1.1);
  ctx.quadraticCurveTo(miniCx - miniS * 0.8, miniCy + miniS * 0.9, miniCx - miniS * 0.8, miniCy + miniS * 0.3);
  ctx.lineTo(miniCx - miniS * 0.8, miniCy - miniS * 0.4);
  ctx.closePath();
  ctx.fillStyle = rgba(p.cyan, dark ? 0.12 : 0.08);
  ctx.fill();
  ctx.strokeStyle = rgba(p.cyan, dark ? 0.35 : 0.3);
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Cert text
  ctx.fillStyle = rgba(p.cyan, dark ? 0.75 : 0.8);
  ctx.font = `700 ${f(0.012)}px monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("PKCS#12", miniCx + miniS + 6, miniCy - f(0.008));
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.45 : 0.55);
  ctx.font = `500 ${f(0.009)}px monospace`;
  ctx.fillText("File / Resources / S3", miniCx + miniS + 6, miniCy + f(0.01));
}

/* ─────────────────────────────────────────────────────────
   DRAW: Signed PDF output (right column)
   ───────────────────────────────────────────────────────── */
function drawSignedOutput(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  f: (n: number) => number,
  p: ReturnType<typeof pal>,
  dark: boolean,
  t: number,
) {
  // PDF document
  const docW = w * 0.14;
  const docH = docW * 1.35;
  const dx = cx - docW / 2;
  const dy = cy - docH / 2;
  const ear = docW * 0.2;

  // Shadow
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.3)" : "rgba(8,15,45,0.14)";
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = rgba(p.cardBg, 1);
  ctx.beginPath();
  ctx.moveTo(dx + 4, dy);
  ctx.lineTo(dx + docW - ear, dy);
  ctx.lineTo(dx + docW, dy + ear);
  ctx.lineTo(dx + docW, dy + docH - 4);
  ctx.quadraticCurveTo(dx + docW, dy + docH, dx + docW - 4, dy + docH);
  ctx.lineTo(dx + 4, dy + docH);
  ctx.quadraticCurveTo(dx, dy + docH, dx, dy + docH - 4);
  ctx.lineTo(dx, dy + 4);
  ctx.quadraticCurveTo(dx, dy, dx + 4, dy);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Border
  ctx.strokeStyle = rgba(p.green, dark ? 0.5 : 0.45);
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(dx + 4, dy);
  ctx.lineTo(dx + docW - ear, dy);
  ctx.lineTo(dx + docW, dy + ear);
  ctx.lineTo(dx + docW, dy + docH - 4);
  ctx.quadraticCurveTo(dx + docW, dy + docH, dx + docW - 4, dy + docH);
  ctx.lineTo(dx + 4, dy + docH);
  ctx.quadraticCurveTo(dx, dy + docH, dx, dy + docH - 4);
  ctx.lineTo(dx, dy + 4);
  ctx.quadraticCurveTo(dx, dy, dx + 4, dy);
  ctx.closePath();
  ctx.stroke();

  // Fold
  ctx.fillStyle = rgba(p.green, dark ? 0.08 : 0.05);
  ctx.beginPath();
  ctx.moveTo(dx + docW - ear, dy);
  ctx.lineTo(dx + docW - ear, dy + ear);
  ctx.lineTo(dx + docW, dy + ear);
  ctx.closePath();
  ctx.fill();

  // Text lines
  const pad = docW * 0.12;
  const lineW2 = docW - pad * 2;
  const startY2 = dy + ear + pad * 0.6;
  const gap2 = docH * 0.06;
  const widths = [1, 0.75, 0.9, 0.5, 0, 0.85, 0.6];
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.1 : 0.18);
  for (let i = 0; i < widths.length; i++) {
    if (widths[i] === 0) continue;
    const ly = startY2 + i * gap2;
    if (ly > dy + docH * 0.55) break;
    rrect(ctx, dx + pad, ly, lineW2 * widths[i], 3, 1.5);
    ctx.fill();
  }

  // Signature area at bottom of doc
  const sigY = dy + docH * 0.6;
  const sigH = docH * 0.2;
  const sigW = docW - pad * 2;
  ctx.strokeStyle = rgba(p.green, dark ? 0.25 : 0.2);
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 2]);
  rrect(ctx, dx + pad, sigY, sigW, sigH, 4);
  ctx.stroke();
  ctx.setLineDash([]);

  // Signature text
  ctx.fillStyle = rgba(p.green, dark ? 0.5 : 0.5);
  ctx.font = `600 ${f(0.009)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("DIGITALLY", cx, sigY + sigH * 0.35);
  ctx.fillText("SIGNED", cx, sigY + sigH * 0.65);

  // Green checkmark badge
  const cr = docW * 0.1;
  const badgeCx = dx + docW - cr - 4;
  const badgeCy = dy + docH - cr - 4;
  ctx.fillStyle = rgba(p.green, dark ? 0.15 : 0.1);
  ctx.beginPath();
  ctx.arc(badgeCx, badgeCy, cr, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = rgba(p.green, dark ? 0.6 : 0.65);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.strokeStyle = rgba(p.green, dark ? 0.9 : 1);
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(badgeCx - cr * 0.3, badgeCy + cr * 0.05);
  ctx.lineTo(badgeCx - cr * 0.02, badgeCy + cr * 0.3);
  ctx.lineTo(badgeCx + cr * 0.38, badgeCy - cr * 0.22);
  ctx.stroke();

  // "200 OK" response badge
  const respY = dy + docH + 14;
  const respW = docW * 0.7;
  const respH2 = h * 0.045;
  const respX = cx - respW / 2;
  ctx.fillStyle = rgba(p.green, dark ? 0.08 : 0.05);
  rrect(ctx, respX, respY, respW, respH2, 6);
  ctx.fill();
  ctx.strokeStyle = rgba(p.green, dark ? 0.3 : 0.25);
  ctx.lineWidth = 1;
  rrect(ctx, respX, respY, respW, respH2, 6);
  ctx.stroke();
  ctx.fillStyle = rgba(p.green, dark ? 0.8 : 0.85);
  ctx.font = `700 ${f(0.012)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("200 OK", cx, respY + respH2 / 2);

  // Labels below
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${f(0.02)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Signed PDF", cx, respY + respH2 + h * 0.02);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${f(0.013)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("PAdES + LTV compliant", cx, respY + respH2 + h * 0.055);
}

/* ─────────────────────────────────────────────────────────
   DRAW: flow arrow with animated packet dot
   ───────────────────────────────────────────────────────── */
function drawFlowArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y0: number,
  x2: number,
  t: number,
  label: string,
  sub: string,
  color: RGB,
  dot: RGB,
  dark: boolean,
  f: (n: number) => number,
  above: boolean,
) {
  // Line
  ctx.strokeStyle = rgba(color, dark ? 0.25 : 0.28);
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  ctx.moveTo(x1, y0);
  ctx.lineTo(x2, y0);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow head
  const hl = 10;
  ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
  ctx.beginPath();
  ctx.moveTo(x2, y0);
  ctx.lineTo(x2 - hl, y0 - hl * 0.4);
  ctx.lineTo(x2 - hl, y0 + hl * 0.4);
  ctx.closePath();
  ctx.fill();

  // Traveling packet
  const prog = (t * 0.12) % 1;
  const px = x1 + (x2 - x1) * prog;
  ctx.save();
  ctx.shadowColor = rgba(dot, 0.5);
  ctx.shadowBlur = 10;
  ctx.fillStyle = rgba(dot, dark ? 0.75 : 0.85);
  ctx.beginPath();
  ctx.arc(px, y0, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = rgba(dot, dark ? 0.95 : 1);
  ctx.beginPath();
  ctx.arc(px, y0, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Labels
  const midX = (x1 + x2) / 2;
  const labelFont = f(0.014);
  const subFont = f(0.01);
  if (above) {
    ctx.fillStyle = rgba(color, dark ? 0.75 : 0.8);
    ctx.font = `700 ${labelFont}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(label, midX, y0 - 10);
    ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
    ctx.font = `500 ${subFont}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(sub, midX, y0 - 10 - labelFont - 2);
  } else {
    ctx.fillStyle = rgba(color, dark ? 0.75 : 0.8);
    ctx.font = `700 ${labelFont}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(label, midX, y0 + 10);
    ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
    ctx.font = `500 ${subFont}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(sub, midX, y0 + 10 + labelFont + 2);
  }
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

  const fRef = Math.min(w, h * 1.6);
  const f = (n: number) => Math.max(Math.round(fRef * n), 8);

  // Three-column layout
  const col1 = w * 0.17;
  const col2 = w * 0.50;
  const col3 = w * 0.83;
  const rowY = h * 0.38;

  // Draw elements
  drawYourApp(ctx, col1, rowY, w, h, f, p, dark, t);
  drawSignLiftAPI(ctx, col2, rowY, w, h, f, p, dark, t);
  drawSignedOutput(ctx, col3, rowY, w, h, f, p, dark, t);

  // Arrows
  const arrowGap = h * 0.035;
  const fwdY = rowY - arrowGap;
  const retY = rowY + arrowGap;

  // Your App edges
  const appRight = col1 + w * 0.12 + 4;
  const apiLeft = col2 - w * 0.1 - 4;
  const apiRight = col2 + w * 0.1 + 4;
  const outLeft = col3 - w * 0.07 - 4;

  // Forward: App → API (above)
  drawFlowArrow(ctx, appRight, fwdY, apiLeft, t, "POST /v1/sign", "PDF + JWT token", p.cyan, p.cyanBright, dark, f, true);

  // Forward: API → Signed PDF (above)
  drawFlowArrow(ctx, apiRight, fwdY, outLeft, t + 2, "signed.pdf", "PAdES response", p.green, p.green, dark, f, true);

  // Security strip at bottom
  const stripY = h * 0.93;
  const labels = [
    { text: "JWT Auth", desc: "X-API-Token header" },
    { text: "PKCS#12", desc: "certificate format" },
    { text: "PAdES", desc: "signature standard" },
    { text: "LTV", desc: "long-term validation" },
    { text: "AcroForm", desc: "field management" },
  ];
  const gap = Math.min(w * 0.18, 130);
  const totalW = (labels.length - 1) * gap;
  const startX = w / 2 - totalW / 2;

  ctx.strokeStyle = rgba(p.line, dark ? 0.12 : 0.16);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(startX - 20, stripY);
  ctx.lineTo(startX + totalW + 20, stripY);
  ctx.stroke();

  for (let i = 0; i < labels.length; i++) {
    const lx = startX + i * gap;
    ctx.fillStyle = rgba(p.cyan, dark ? 0.45 : 0.5);
    ctx.beginPath();
    ctx.arc(lx, stripY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = rgba(p.cyan, dark ? 0.65 : 0.7);
    ctx.font = `700 ${f(0.013)}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(labels[i].text, lx, stripY + 8);
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.4 : 0.5);
    ctx.font = `500 ${f(0.01)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(labels[i].desc, lx, stripY + 8 + f(0.015));
  }
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function SignLiftHeroCanvas({
  className = "",
}: {
  className?: string;
}) {
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

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: 380 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
