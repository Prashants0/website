"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════════
   SIGNBRIDGE HERO CANVAS — responsive, proportion-based

   Three layout modes based on CSS width:
     >= 820  → DESKTOP   (horizontal 3-column with full labels)
     >= 540  → TABLET    (horizontal but compact, shorter labels)
     <  540  → MOBILE    (vertical stacked)
   ═══════════════════════════════════════════════════════════ */

type RGB = readonly [number, number, number];

function rgba([r, g, b]: RGB, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function pal(dark: boolean) {
  return {
    violet: (dark ? [148, 130, 235] : [82, 50, 168]) as RGB,
    violetBright: (dark ? [175, 155, 255] : [105, 65, 210]) as RGB,
    green: (dark ? [75, 195, 115] : [10, 130, 50]) as RGB,
    fg: (dark ? [230, 230, 238] : [10, 10, 18]) as RGB,
    fgMuted: (dark ? [140, 140, 158] : [80, 85, 100]) as RGB,
    cardBg: (dark ? [30, 32, 48] : [255, 255, 255]) as RGB,
    cardBorder: (dark ? [62, 68, 95] : [180, 185, 200]) as RGB,
    line: (dark ? [85, 92, 135] : [140, 148, 175]) as RGB,
    tokenBody: (dark ? [50, 45, 65] : [235, 230, 245]) as RGB,
    tokenMetal: (dark ? [145, 135, 165] : [160, 150, 175]) as RGB,
  };
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | number[]) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/* ─── Shared drawing helpers ─── */

function drawBrowserCard(
  ctx: CanvasRenderingContext2D, p: ReturnType<typeof pal>,
  x: number, y: number, w: number, h: number,
  dark: boolean, fsPx: (n: number) => number,
) {
  // Shadow + fill
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(20,10,60,0.14)";
  ctx.shadowBlur = 14; ctx.shadowOffsetY = 4;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, x, y, w, h, 10); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.cardBorder, dark ? 0.5 : 0.55);
  ctx.lineWidth = 1.2;
  rrect(ctx, x, y, w, h, 10); ctx.stroke();

  // Title bar
  const tbH = h * 0.16;
  ctx.fillStyle = rgba(p.fg, dark ? 0.03 : 0.025);
  rrect(ctx, x, y, w, tbH, [10, 10, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.fg, dark ? 0.06 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(x, y + tbH); ctx.lineTo(x + w, y + tbH); ctx.stroke();

  // Traffic lights
  const dotR = Math.max(w * 0.018, 2.5);
  const dotCols: RGB[] = [[255, 95, 87], [255, 189, 46], [40, 202, 65]];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = rgba(dotCols[i], dark ? 0.65 : 0.7);
    ctx.beginPath();
    ctx.arc(x + 12 + i * (dotR * 3.5), y + tbH / 2, dotR, 0, Math.PI * 2);
    ctx.fill();
  }

  // URL text
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.45 : 0.5);
  ctx.font = `500 ${fsPx(0.012)}px monospace`;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillText("yourbank.com/sign", x + w * 0.22, y + tbH / 2);

  // Doc lines
  const docY = y + tbH + h * 0.08;
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.08 : 0.14);
  for (const [i, lw] of [0.82, 0.52, 0.68].entries()) {
    rrect(ctx, x + 10, docY + i * h * 0.07, (w - 20) * lw, 3.5, 2); ctx.fill();
  }

  // Sign button
  const btnW = w * 0.55;
  const btnH = h * 0.14;
  const btnX = x + (w - btnW) / 2;
  const btnY = y + h * 0.50;
  ctx.save();
  ctx.shadowColor = rgba(p.violet, dark ? 0.4 : 0.3); ctx.shadowBlur = 12;
  ctx.fillStyle = rgba(p.violet, dark ? 0.88 : 0.92);
  rrect(ctx, btnX, btnY, btnW, btnH, 6); ctx.fill();
  ctx.restore();
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = `700 ${fsPx(0.015)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("Sign Document", btnX + btnW / 2, btnY + btnH / 2);

  // Code snippet
  const cdY = btnY + btnH + h * 0.05;
  ctx.fillStyle = rgba(p.fg, dark ? 0.03 : 0.025);
  rrect(ctx, x + 8, cdY, w - 16, h * 0.1, 4); ctx.fill();
  ctx.fillStyle = rgba(p.violet, dark ? 0.5 : 0.55);
  ctx.font = `500 ${fsPx(0.01)}px monospace`;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillText("signBridge.sign(hash)", x + 14, cdY + h * 0.05);
}

function drawBridgeCard(
  ctx: CanvasRenderingContext2D, p: ReturnType<typeof pal>,
  x: number, y: number, w: number, h: number,
  dark: boolean, fsPx: (n: number) => number, t: number,
) {
  const cx = x + w / 2;

  // Glow
  const glowR = w * 0.8;
  const grad = ctx.createRadialGradient(cx, y + h / 2, 0, cx, y + h / 2, glowR);
  grad.addColorStop(0, rgba(p.violet, dark ? 0.07 : 0.05));
  grad.addColorStop(1, rgba(p.violet, 0));
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.arc(cx, y + h / 2, glowR, 0, Math.PI * 2); ctx.fill();

  // Box
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(20,10,60,0.14)";
  ctx.shadowBlur = 18; ctx.shadowOffsetY = 4;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, x, y, w, h, 12); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.4 : 0.32);
  ctx.lineWidth = 1.8;
  rrect(ctx, x, y, w, h, 12); ctx.stroke();

  // Header bar
  const ahH = h * 0.22;
  ctx.fillStyle = rgba(p.violet, dark ? 0.07 : 0.04);
  rrect(ctx, x, y, w, ahH, [12, 12, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.1 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(x, y + ahH); ctx.lineTo(x + w, y + ahH); ctx.stroke();

  // LED
  const ledP = Math.sin(t * 2) * 0.2 + 0.7;
  ctx.fillStyle = rgba(p.green, ledP);
  ctx.beginPath(); ctx.arc(x + 14, y + ahH / 2, 3.5, 0, Math.PI * 2); ctx.fill();

  // Title
  ctx.fillStyle = rgba(p.violet, dark ? 0.88 : 0.92);
  ctx.font = `800 ${fsPx(0.016)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillText("SignBridge", x + 24, y + ahH / 2);

  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.3 : 0.35);
  ctx.font = `600 ${fsPx(0.009)}px monospace`;
  ctx.textAlign = "right";
  ctx.fillText("TRAY", x + w - 10, y + ahH / 2);

  // Shield + lock
  const shCy = y + ahH + (h - ahH) * 0.38;
  const shR = Math.min(w * 0.14, 20);
  ctx.beginPath();
  ctx.moveTo(cx, shCy - shR);
  ctx.lineTo(cx + shR * 0.85, shCy - shR * 0.45);
  ctx.lineTo(cx + shR * 0.85, shCy + shR * 0.3);
  ctx.quadraticCurveTo(cx + shR * 0.85, shCy + shR * 0.95, cx, shCy + shR * 1.15);
  ctx.quadraticCurveTo(cx - shR * 0.85, shCy + shR * 0.95, cx - shR * 0.85, shCy + shR * 0.3);
  ctx.lineTo(cx - shR * 0.85, shCy - shR * 0.45);
  ctx.closePath();
  ctx.fillStyle = rgba(p.violet, dark ? 0.08 : 0.05); ctx.fill();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.45 : 0.38);
  ctx.lineWidth = 1.5; ctx.stroke();
  const lk = shR * 0.32;
  ctx.fillStyle = rgba(p.violet, dark ? 0.55 : 0.5);
  rrect(ctx, cx - lk, shCy + lk * 0.1, lk * 2, lk * 1.4, 2); ctx.fill();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.6 : 0.55);
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, shCy + lk * 0.1, lk * 0.65, Math.PI, 0, false); ctx.stroke();

  // Crypto labels inside box
  ctx.fillStyle = rgba(p.violet, dark ? 0.55 : 0.6);
  ctx.font = `700 ${fsPx(0.011)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("localhost:53000", cx, shCy + shR * 1.3);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.35 : 0.4);
  ctx.font = `500 ${fsPx(0.009)}px monospace`;
  ctx.fillText("Ed25519 JWT Auth", cx, shCy + shR * 1.3 + fsPx(0.014));
}

function drawTokenCard(
  ctx: CanvasRenderingContext2D, p: ReturnType<typeof pal>,
  cx: number, y: number, w: number, h: number,
  dark: boolean, fsPx: (n: number) => number, t: number,
) {
  const x = cx - w / 2;
  const connH = h * 0.22;
  const connY = y - connH;

  // Connector
  const cW = w * 0.55;
  ctx.fillStyle = rgba(p.tokenMetal, dark ? 0.4 : 0.5);
  rrect(ctx, cx - cW / 2, connY, cW, connH, [4, 4, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.tokenMetal, dark ? 0.55 : 0.65);
  ctx.lineWidth = 1;
  rrect(ctx, cx - cW / 2, connY, cW, connH, [4, 4, 0, 0]); ctx.stroke();
  // Pins
  const pinW = Math.max(2.5, w * 0.05);
  const pinGap = pinW * 2;
  for (let i = 0; i < 2; i++) {
    ctx.fillStyle = rgba(p.tokenMetal, dark ? 0.65 : 0.75);
    rrect(ctx, cx - pinGap / 2 + i * pinGap, connY + 4, pinW, connH - 7, 1); ctx.fill();
  }

  // Body
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.35)" : "rgba(20,10,60,0.12)";
  ctx.shadowBlur = 14; ctx.shadowOffsetY = 3;
  ctx.fillStyle = rgba(p.tokenBody, 1);
  rrect(ctx, x, y, w, h, 8); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.35 : 0.28);
  ctx.lineWidth = 1.5;
  rrect(ctx, x, y, w, h, 8); ctx.stroke();

  // Gold chip
  const chipS = w * 0.42;
  const chipX = cx - chipS / 2;
  const chipY = y + h * 0.22;
  ctx.fillStyle = dark ? "rgba(200,180,100,0.22)" : "rgba(180,160,80,0.16)";
  rrect(ctx, chipX, chipY, chipS, chipS, 2); ctx.fill();
  ctx.strokeStyle = dark ? "rgba(200,180,100,0.45)" : "rgba(180,160,80,0.38)";
  ctx.lineWidth = 0.8;
  rrect(ctx, chipX, chipY, chipS, chipS, 2); ctx.stroke();
  ctx.strokeStyle = dark ? "rgba(200,180,100,0.22)" : "rgba(180,160,80,0.2)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(chipX + 2, chipY + chipS / 2); ctx.lineTo(chipX + chipS - 2, chipY + chipS / 2);
  ctx.moveTo(chipX + chipS / 2, chipY + 2); ctx.lineTo(chipX + chipS / 2, chipY + chipS - 2);
  ctx.stroke();

  // LED
  const tLed = Math.sin(t * 2.5) * 0.3 + 0.6;
  ctx.fillStyle = rgba(p.green, tLed);
  ctx.beginPath(); ctx.arc(cx, y + h - h * 0.12, Math.max(2.5, w * 0.05), 0, Math.PI * 2); ctx.fill();

  // X.509
  ctx.fillStyle = rgba(p.fg, dark ? 0.35 : 0.4);
  ctx.font = `700 ${fsPx(0.011)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("X.509", cx, y + h * 0.62);
}

/* ═══════════════════════════════════════════════════════════
   HORIZONTAL LAYOUT — used for both desktop (full) and
   tablet (compact). Controlled by `compact` flag.
   ═══════════════════════════════════════════════════════════ */
function drawHorizontal(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dark: boolean, compact: boolean) {
  const p = pal(dark);
  ctx.clearRect(0, 0, w, h);

  // Reference dimension for font sizing
  const f = Math.min(w, h * 1.6);
  const fsPx = (n: number) => Math.max(Math.round(f * n), 8);

  // ── Layout grid ──
  const col1 = w * 0.17;
  const col2 = w * 0.50;
  const col3 = w * 0.83;
  const rowY = h * 0.38;

  // ── BROWSER (left) ──
  const bW = w * 0.22;
  const bH = h * 0.38;
  const bx = col1 - bW / 2;
  const by = rowY - bH / 2;
  drawBrowserCard(ctx, p, bx, by, bW, bH, dark, fsPx);

  // Browser label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fsPx(0.019)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("Your Website", col1, by + bH + 8);
  if (!compact) {
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
    ctx.font = `500 ${fsPx(0.012)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText("Any browser, any web app", col1, by + bH + 8 + fsPx(0.022));
  }

  // ── BRIDGE (center) ──
  const aW = w * 0.18;
  const aH = h * 0.34;
  const ax = col2 - aW / 2;
  const ay = rowY - aH / 2;
  drawBridgeCard(ctx, p, ax, ay, aW, aH, dark, fsPx, t);

  // Bridge label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fsPx(0.019)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("SignBridge Agent", col2, ay + aH + 8);
  if (!compact) {
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
    ctx.font = `500 ${fsPx(0.012)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText("Runs in your system tray", col2, ay + aH + 8 + fsPx(0.022));
  }

  // ── USB TOKEN (right) ──
  const tW = Math.max(w * 0.055, 36);
  const tH = h * 0.26;
  const ty = rowY - tH / 2;
  drawTokenCard(ctx, p, col3, ty, tW, tH, dark, fsPx, t);

  // Token label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fsPx(0.019)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("USB Token", col3, ty + tH + 8);
  if (!compact) {
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
    ctx.font = `500 ${fsPx(0.012)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText("Private key stays here", col3, ty + tH + 8 + fsPx(0.022));
  }

  // ── ARROWS ──
  const arrowGap = compact ? h * 0.03 : h * 0.04;
  const fwdY = rowY - arrowGap;
  const retY = rowY + arrowGap;

  const leftEdge = bx + bW + 4;
  const bridgeL = ax - 4;
  const bridgeR = ax + aW + 4;
  const rightEdge = col3 - tW / 2 - 4;

  // On compact, only show the label (no sub-label) to avoid overlapping
  function drawHArrow(
    x1: number, y0: number, x2: number, t0: number,
    label: string, sub: string,
    color: RGB, dot: RGB,
    right: boolean, labelsAbove: boolean,
  ) {
    // Dashed line
    ctx.strokeStyle = rgba(color, dark ? 0.25 : 0.28);
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x1, y0); ctx.lineTo(x2, y0); ctx.stroke();
    ctx.setLineDash([]);

    // Arrow head
    const tip = right ? x2 : x1;
    const dir = right ? 0 : Math.PI;
    const hl = 8;
    ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
    ctx.beginPath();
    ctx.moveTo(tip, y0);
    ctx.lineTo(tip - hl * Math.cos(dir - 0.4), y0 - hl * Math.sin(dir - 0.4));
    ctx.lineTo(tip - hl * Math.cos(dir + 0.4), y0 - hl * Math.sin(dir + 0.4));
    ctx.closePath(); ctx.fill();

    // Traveling packet
    const prog = right ? (t0 * 0.12) % 1 : 1 - (t0 * 0.12) % 1;
    const px = x1 + (x2 - x1) * prog;
    ctx.save();
    ctx.shadowColor = rgba(dot, 0.5); ctx.shadowBlur = 8;
    ctx.fillStyle = rgba(dot, dark ? 0.75 : 0.85);
    ctx.beginPath(); ctx.arc(px, y0, 4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = rgba(dot, dark ? 0.95 : 1);
    ctx.beginPath(); ctx.arc(px, y0, 2, 0, Math.PI * 2); ctx.fill();

    // Label
    const midX = (x1 + x2) / 2;
    const labelFont = compact ? fsPx(0.013) : fsPx(0.014);
    const subFont = fsPx(0.01);
    if (labelsAbove) {
      ctx.fillStyle = rgba(color, dark ? 0.75 : 0.8);
      ctx.font = `700 ${labelFont}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "bottom";
      ctx.fillText(label, midX, y0 - 6);
      if (!compact) {
        ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
        ctx.font = `500 ${subFont}px -apple-system, system-ui, sans-serif`;
        ctx.fillText(sub, midX, y0 - 6 - labelFont - 1);
      }
    } else {
      ctx.fillStyle = rgba(color, dark ? 0.75 : 0.8);
      ctx.font = `700 ${labelFont}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(label, midX, y0 + 6);
      if (!compact) {
        ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
        ctx.font = `500 ${subFont}px -apple-system, system-ui, sans-serif`;
        ctx.fillText(sub, midX, y0 + 6 + labelFont + 1);
      }
    }
  }

  drawHArrow(leftEdge, fwdY, bridgeL, t, "doc hash", "SHA-256 digest", p.violet, p.violetBright, true, true);
  drawHArrow(bridgeR, fwdY, rightEdge, t + 1.8, "sign request", "PKCS#11 call", p.violet, p.violetBright, true, true);
  drawHArrow(bridgeR, retY, rightEdge, t + 0.9, "signed hash", "RSA / ECDSA", p.green, p.green, false, false);
  drawHArrow(leftEdge, retY, bridgeL, t + 2.5, "signed PDF", "PAdES embed", p.green, p.green, false, false);

  // ── SECURITY STRIP (bottom) ──
  const stripY = h * 0.88;
  const labels = compact
    ? [
        { text: "TLS 1.3" },
        { text: "Ed25519 JWT" },
        { text: "HMAC-SHA256" },
        { text: "0ms exposure" },
      ]
    : [
        { text: "HTTPS TLS 1.3", desc: "encrypted tunnel" },
        { text: "Ed25519 JWT", desc: "authentication" },
        { text: "HMAC-SHA256", desc: "session isolation" },
        { text: "CAPI / CNG", desc: "certificate store" },
        { text: "0ms exposure", desc: "key never extracted" },
      ];
  const gap = Math.min(w / (labels.length + 1), compact ? 120 : 140);
  const totalStripW = (labels.length - 1) * gap;
  const startX = w / 2 - totalStripW / 2;

  ctx.strokeStyle = rgba(p.line, dark ? 0.12 : 0.16);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(startX - 16, stripY); ctx.lineTo(startX + totalStripW + 16, stripY); ctx.stroke();

  const stripLabelFS = compact ? fsPx(0.011) : fsPx(0.012);
  const stripDescFS = fsPx(0.009);
  for (let i = 0; i < labels.length; i++) {
    const lx = startX + i * gap;
    ctx.fillStyle = rgba(p.violet, dark ? 0.45 : 0.5);
    ctx.beginPath(); ctx.arc(lx, stripY, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(p.violet, dark ? 0.65 : 0.7);
    ctx.font = `700 ${stripLabelFS}px monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(labels[i].text, lx, stripY + 6);
    if (!compact && "desc" in labels[i]) {
      ctx.fillStyle = rgba(p.fgMuted, dark ? 0.4 : 0.5);
      ctx.font = `500 ${stripDescFS}px -apple-system, system-ui, sans-serif`;
      ctx.fillText((labels[i] as { text: string; desc: string }).desc, lx, stripY + 6 + stripLabelFS + 2);
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   MOBILE DRAW — vertical stacked layout
   ═══════════════════════════════════════════════════════════ */
function drawMobile(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dark: boolean) {
  const p = pal(dark);
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const pad = 20;
  // Use w as primary reference for mobile fonts so they don't get too small
  const fsPx = (n: number) => Math.max(Math.round(w * n * 1.8), 10);

  // ── BROWSER (top, ~0%–23%) ──
  const bW = Math.min(w - pad * 2, 320);
  const bH = h * 0.19;
  const bx = cx - bW / 2;
  const by = h * 0.02;
  drawBrowserCard(ctx, p, bx, by, bW, bH, dark, fsPx);

  // Browser label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fsPx(0.024)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("Your Website", cx, by + bH + 6);

  // ── Arrow 1: Browser → Bridge ──
  const arr1Top = by + bH + fsPx(0.024) + 12;
  const arr1Bot = h * 0.33;
  drawVerticalArrow(ctx, cx, arr1Top, arr1Bot, t, "doc hash", "SHA-256", p.violet, p.violetBright, true, dark, fsPx, w);

  // ── BRIDGE (middle, ~35%–55%) ──
  const aW = Math.min(w - pad * 2, 280);
  const aH = h * 0.19;
  const ax = cx - aW / 2;
  const ay = h * 0.35;
  drawBridgeCard(ctx, p, ax, ay, aW, aH, dark, fsPx, t);

  // Bridge label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fsPx(0.024)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("SignBridge Agent", cx, ay + aH + 6);

  // ── Arrow 2: Bridge → Token ──
  const arr2Top = ay + aH + fsPx(0.024) + 12;
  const arr2Bot = h * 0.68;
  drawVerticalArrow(ctx, cx, arr2Top, arr2Bot, t + 1.8, "sign req", "PKCS#11", p.violet, p.violetBright, true, dark, fsPx, w);

  // ── USB TOKEN (bottom, ~70%–84%) ──
  const tW = Math.max(w * 0.16, 52);
  const tH = h * 0.13;
  const ty = h * 0.70;
  drawTokenCard(ctx, p, cx, ty, tW, tH, dark, fsPx, t);

  // Token label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fsPx(0.024)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("USB Token", cx, ty + tH + 6);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fsPx(0.015)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Private key stays here", cx, ty + tH + 6 + fsPx(0.026));

  // ── SECURITY STRIP (bottom) ──
  const stripY = h * 0.92;
  const badges = ["TLS 1.3", "Ed25519", "HMAC", "CAPI/CNG", "0ms"];
  const badgeFS = fsPx(0.014);
  // Single row, evenly spaced
  const badgeGap = (w - pad * 2) / (badges.length - 1);
  const badgeStart = pad;
  for (let i = 0; i < badges.length; i++) {
    const lx = badgeStart + i * badgeGap;
    ctx.fillStyle = rgba(p.violet, dark ? 0.4 : 0.45);
    ctx.beginPath(); ctx.arc(lx, stripY, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(p.violet, dark ? 0.6 : 0.65);
    ctx.font = `600 ${badgeFS}px monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(badges[i], lx, stripY + 5);
  }
}

/** Vertical arrow with traveling packet — for mobile layout */
function drawVerticalArrow(
  ctx: CanvasRenderingContext2D,
  x: number, y1: number, y2: number,
  t: number,
  label: string, sub: string,
  color: RGB, dot: RGB,
  down: boolean,
  dark: boolean,
  fsPx: (n: number) => number,
  canvasW: number,
) {
  // Dashed line
  ctx.strokeStyle = rgba(color, dark ? 0.25 : 0.28);
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
  ctx.setLineDash([]);

  // Arrow head
  const tip = down ? y2 : y1;
  const hl = 7;
  ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
  ctx.beginPath();
  if (down) {
    ctx.moveTo(x, tip); ctx.lineTo(x - hl * 0.5, tip - hl); ctx.lineTo(x + hl * 0.5, tip - hl);
  } else {
    ctx.moveTo(x, tip); ctx.lineTo(x - hl * 0.5, tip + hl); ctx.lineTo(x + hl * 0.5, tip + hl);
  }
  ctx.closePath(); ctx.fill();

  // Traveling packet
  const prog = down ? (t * 0.12) % 1 : 1 - (t * 0.12) % 1;
  const py = y1 + (y2 - y1) * prog;
  ctx.save();
  ctx.shadowColor = rgba(dot, 0.5); ctx.shadowBlur = 6;
  ctx.fillStyle = rgba(dot, dark ? 0.75 : 0.85);
  ctx.beginPath(); ctx.arc(x, py, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.fillStyle = rgba(dot, dark ? 0.95 : 1);
  ctx.beginPath(); ctx.arc(x, py, 1.8, 0, Math.PI * 2); ctx.fill();

  // Labels to the right
  const midY = (y1 + y2) / 2;
  const labelFS = fsPx(0.016);
  ctx.fillStyle = rgba(color, dark ? 0.75 : 0.8);
  ctx.font = `700 ${labelFS}px monospace`;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillText(label, x + 10, midY - 5);
  ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
  ctx.font = `500 ${fsPx(0.012)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText(sub, x + 10, midY + labelFS * 0.6);
}

/* ═══════════════════════════════════════════════════════════
   MAIN DISPATCH
   ═══════════════════════════════════════════════════════════ */
function drawAll(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dark: boolean) {
  if (w < 540) {
    drawMobile(ctx, w, h, t, dark);
  } else if (w < 820) {
    drawHorizontal(ctx, w, h, t, dark, true);   // tablet compact
  } else {
    drawHorizontal(ctx, w, h, t, dark, false);  // desktop full
  }
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function SignBridgeHeroCanvas({ className = "" }: { className?: string }) {
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
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
