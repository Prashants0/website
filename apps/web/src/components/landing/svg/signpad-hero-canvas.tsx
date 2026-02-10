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

/* ── Official UIDAI Aadhaar logo — loaded from /icons/aadhaar.svg ── */
let _aadhaarImg: HTMLImageElement | null = null;
let _aadhaarLoaded = false;
function getAadhaarImg(): HTMLImageElement | null {
  if (!_aadhaarImg && typeof Image !== "undefined") {
    _aadhaarImg = new Image();
    _aadhaarImg.onload = () => { _aadhaarLoaded = true; };
    _aadhaarImg.src = "/icons/aadhaar.svg";
  }
  return _aadhaarLoaded ? _aadhaarImg : null;
}

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
   MOBILE DRAW — vertical stacked layout for narrow viewports
   ═══════════════════════════════════════════════════════════ */
function drawAllMobile(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dark: boolean) {
  const p = pal(dark);
  ctx.clearRect(0, 0, w, h);

  // Font size scaled for mobile — use width as primary driver
  const f = w;
  const fs = (n: number) => Math.max(Math.round(f * n), 9);
  const cx = w / 2; // center x

  // ── Layout: vertical sections from top to bottom ──
  // [Document] → [Send Hub] → [3 Method Cards] → [Completed Doc] → [Badges]
  let curY = h * 0.03;

  // ────────────────────────────────────────────────────────
  //  1. DOCUMENT (top) — the PDF being prepared
  // ────────────────────────────────────────────────────────
  const dW = w * 0.52;
  const dH = h * 0.16;
  const dx = cx - dW / 2;
  const dy = curY;

  // Shadow
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(140,100,20,0.12)";
  ctx.shadowBlur = 14; ctx.shadowOffsetY = 4;
  ctx.fillStyle = rgba(p.docBg, 1);
  rrect(ctx, dx, dy, dW, dH, 8); ctx.fill();
  ctx.restore();

  // Border
  ctx.strokeStyle = rgba(p.amber, dark ? 0.35 : 0.25);
  ctx.lineWidth = 1.8;
  rrect(ctx, dx, dy, dW, dH, 8); ctx.stroke();

  // Title bar
  const dtH = dH * 0.22;
  ctx.fillStyle = rgba(p.amber, dark ? 0.06 : 0.04);
  rrect(ctx, dx, dy, dW, dtH, [8, 8, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.amber, dark ? 0.1 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(dx, dy + dtH); ctx.lineTo(dx + dW, dy + dtH); ctx.stroke();

  // Doc title
  ctx.fillStyle = rgba(p.amber, dark ? 0.8 : 0.85);
  ctx.font = `700 ${fs(0.028)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("CONTRACT.PDF", cx, dy + dtH / 2);

  // Content lines
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.1 : 0.15);
  const lineStartY = dy + dtH + dH * 0.08;
  for (const [i, lw] of [0.9, 0.65, 0.8, 0.5].entries()) {
    rrect(ctx, dx + 10, lineStartY + i * dH * 0.12, (dW - 20) * lw, 3, 1.5); ctx.fill();
  }

  // Signature field placeholders
  const fieldAlpha = 0.4 + Math.sin(t * 1.5) * 0.1;
  const fieldY = dy + dH * 0.6;
  ctx.strokeStyle = rgba(p.amber, fieldAlpha);
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  rrect(ctx, dx + 10, fieldY, dW * 0.4, dH * 0.22, 4); ctx.stroke();
  rrect(ctx, dx + dW * 0.5 + 5, fieldY, dW * 0.4, dH * 0.22, 4); ctx.stroke();
  ctx.setLineDash([]);

  // Field labels
  ctx.fillStyle = rgba(p.amber, fieldAlpha * 0.8);
  ctx.font = `600 ${fs(0.022)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("Signer A", dx + dW * 0.25, fieldY + dH * 0.11);
  ctx.fillText("Signer B", dx + dW * 0.75, fieldY + dH * 0.11);

  // Label below document
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.038)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("Upload & Design", cx, dy + dH + h * 0.008);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.026)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Drag fields onto your PDF", cx, dy + dH + h * 0.032);

  curY = dy + dH + h * 0.065;

  // ── Arrow down from document to hub ──
  const arrowMidX = cx;
  const arrow1Top = curY;
  const arrow1Bot = curY + h * 0.03;
  ctx.strokeStyle = rgba(p.amber, dark ? 0.22 : 0.25);
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(arrowMidX, arrow1Top); ctx.lineTo(arrowMidX, arrow1Bot); ctx.stroke();
  ctx.setLineDash([]);
  // Arrow head
  ctx.fillStyle = rgba(p.amber, dark ? 0.45 : 0.5);
  ctx.beginPath();
  ctx.moveTo(arrowMidX, arrow1Bot + 2);
  ctx.lineTo(arrowMidX - 5, arrow1Bot - 6);
  ctx.lineTo(arrowMidX + 5, arrow1Bot - 6);
  ctx.closePath(); ctx.fill();
  // Traveling dot
  const dotProg1 = (t * 0.12) % 1;
  const dotY1 = arrow1Top + (arrow1Bot - arrow1Top) * dotProg1;
  ctx.save();
  ctx.shadowColor = rgba(p.amberBright, 0.5); ctx.shadowBlur = 10;
  ctx.fillStyle = rgba(p.amberBright, dark ? 0.75 : 0.85);
  ctx.beginPath(); ctx.arc(arrowMidX, dotY1, 4, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  curY = arrow1Bot + h * 0.015;

  // ────────────────────────────────────────────────────────
  //  2. SEND HUB (centered)
  // ────────────────────────────────────────────────────────
  const hubR = Math.min(w * 0.085, 38);
  const hubCy = curY + hubR;

  // Glow
  const hubGlow = ctx.createRadialGradient(cx, hubCy, 0, cx, hubCy, hubR * 2.5);
  hubGlow.addColorStop(0, rgba(p.amber, dark ? 0.08 : 0.06));
  hubGlow.addColorStop(1, rgba(p.amber, 0));
  ctx.fillStyle = hubGlow;
  ctx.beginPath(); ctx.arc(cx, hubCy, hubR * 2.5, 0, Math.PI * 2); ctx.fill();

  // Ring
  ctx.strokeStyle = rgba(p.amber, dark ? 0.4 : 0.32);
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(cx, hubCy, hubR, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = rgba(p.amber, dark ? 0.06 : 0.04);
  ctx.beginPath(); ctx.arc(cx, hubCy, hubR, 0, Math.PI * 2); ctx.fill();

  // "SEND" text
  ctx.fillStyle = rgba(p.amber, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.038)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("SEND", cx, hubCy - fs(0.008));
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.022)}px monospace`;
  ctx.fillText("1 credit", cx, hubCy + fs(0.022));

  curY = hubCy + hubR + h * 0.015;

  // ────────────────────────────────────────────────────────
  //  3. SIGNING METHODS — stacked vertically
  // ────────────────────────────────────────────────────────
  const methods = [
    { label: "e-Sign", sub: "Draw / Type / Upload", color: p.amberSoft, icon: "pen" as const },
    { label: "DSC via USB", sub: "X.509 Certificate", color: p.blue, icon: "usb" as const },
    { label: "Aadhaar OTP", sub: "IT Act Compliant", color: p.violet, icon: "aadhaar" as const },
  ];

  const methodCardW = w * 0.78;
  const methodCardH = h * 0.058;
  const methodCardX = cx - methodCardW / 2;
  const methodGap = h * 0.012;

  for (let i = 0; i < methods.length; i++) {
    const m = methods[i];

    // Short arrow/line from hub to each card
    const lineTop = curY;
    const lineBot = curY + h * 0.015;
    ctx.strokeStyle = rgba(m.color, dark ? 0.2 : 0.22);
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(cx, lineTop); ctx.lineTo(cx, lineBot); ctx.stroke();
    ctx.setLineDash([]);

    // Traveling dot
    const prog = ((t * 0.1 + i * 0.3) % 1);
    const dotYm = lineTop + (lineBot - lineTop) * prog;
    ctx.save();
    ctx.shadowColor = rgba(m.color, 0.5); ctx.shadowBlur = 8;
    ctx.fillStyle = rgba(m.color, dark ? 0.7 : 0.8);
    ctx.beginPath(); ctx.arc(cx, dotYm, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    curY = lineBot + 2;
    const cardY = curY;

    // Method card
    ctx.save();
    ctx.shadowColor = dark ? "rgba(0,0,0,0.3)" : "rgba(20,10,60,0.1)";
    ctx.shadowBlur = 12; ctx.shadowOffsetY = 3;
    ctx.fillStyle = rgba(p.cardBg, 1);
    rrect(ctx, methodCardX, cardY, methodCardW, methodCardH, 8); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = rgba(m.color, dark ? 0.3 : 0.22);
    ctx.lineWidth = 1.5;
    rrect(ctx, methodCardX, cardY, methodCardW, methodCardH, 8); ctx.stroke();

    // Left accent bar
    ctx.fillStyle = rgba(m.color, dark ? 0.5 : 0.4);
    rrect(ctx, methodCardX, cardY, 3, methodCardH, [8, 0, 0, 8]); ctx.fill();

    // Icon
    const iconCx = methodCardX + methodCardH * 0.5;
    const iconCy = cardY + methodCardH / 2;
    drawMethodIcon(ctx, m.icon, iconCx, iconCy, Math.min(methodCardH * 0.25, 10), m.color, dark);

    // Label
    ctx.fillStyle = rgba(p.fg, dark ? 0.88 : 0.92);
    ctx.font = `700 ${fs(0.032)}px -apple-system, system-ui, sans-serif`;
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(m.label, methodCardX + methodCardH * 0.85, cardY + methodCardH * 0.38);

    // Sub label
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
    ctx.font = `500 ${fs(0.024)}px monospace`;
    ctx.fillText(m.sub, methodCardX + methodCardH * 0.85, cardY + methodCardH * 0.7);

    curY = cardY + methodCardH + methodGap;
  }

  // ── Arrow down to completed doc ──
  const arrow2Top = curY;
  const arrow2Bot = curY + h * 0.025;
  ctx.strokeStyle = rgba(p.green, dark ? 0.18 : 0.22);
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(cx, arrow2Top); ctx.lineTo(cx, arrow2Bot); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = rgba(p.green, dark ? 0.4 : 0.45);
  ctx.beginPath();
  ctx.moveTo(cx, arrow2Bot + 2);
  ctx.lineTo(cx - 5, arrow2Bot - 5);
  ctx.lineTo(cx + 5, arrow2Bot - 5);
  ctx.closePath(); ctx.fill();

  curY = arrow2Bot + h * 0.012;

  // ────────────────────────────────────────────────────────
  //  4. COMPLETED DOCUMENT
  // ────────────────────────────────────────────────────────
  const cW = w * 0.44;
  const cH = h * 0.14;
  const cDocX = cx - cW / 2;
  const cDocY = curY;

  // Shadow
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(10,90,40,0.12)";
  ctx.shadowBlur = 14; ctx.shadowOffsetY = 3;
  ctx.fillStyle = rgba(p.docBg, 1);
  rrect(ctx, cDocX, cDocY, cW, cH, 8); ctx.fill();
  ctx.restore();

  // Green border
  ctx.strokeStyle = rgba(p.green, dark ? 0.45 : 0.35);
  ctx.lineWidth = 2;
  rrect(ctx, cDocX, cDocY, cW, cH, 8); ctx.stroke();

  // Completed badge
  const badgeW = cW * 0.55;
  const badgeH = cH * 0.2;
  const badgeX = cx - badgeW / 2;
  const badgeY = cDocY + cH * 0.1;
  ctx.fillStyle = rgba(p.green, dark ? 0.12 : 0.08);
  rrect(ctx, badgeX, badgeY, badgeW, badgeH, 4); ctx.fill();
  ctx.fillStyle = rgba(p.green, dark ? 0.8 : 0.85);
  ctx.font = `700 ${fs(0.024)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("COMPLETED", cx, badgeY + badgeH / 2);

  // Content lines
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.08 : 0.12);
  const cLineY = badgeY + badgeH + cH * 0.08;
  for (const [i, lw] of [0.85, 0.6, 0.75].entries()) {
    rrect(ctx, cDocX + 8, cLineY + i * cH * 0.12, (cW - 16) * lw, 2.5, 1); ctx.fill();
  }

  // Signature curve
  const sigY = cDocY + cH * 0.6;
  ctx.strokeStyle = rgba(p.amber, dark ? 0.5 : 0.45);
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(cDocX + 10, sigY + 6);
  ctx.quadraticCurveTo(cDocX + cW * 0.3, sigY - 6, cDocX + cW * 0.5, sigY + 2);
  ctx.quadraticCurveTo(cDocX + cW * 0.7, sigY + 10, cDocX + cW - 10, sigY - 2);
  ctx.stroke();

  // Checkmark
  const checkX = cDocX + cW - 18;
  const checkYc = sigY - 6;
  const checkR = 7;
  ctx.fillStyle = rgba(p.green, dark ? 0.2 : 0.15);
  ctx.beginPath(); ctx.arc(checkX, checkYc, checkR, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = rgba(p.green, dark ? 0.8 : 0.85);
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(checkX - 3, checkYc);
  ctx.lineTo(checkX - 0.5, checkYc + 2.5);
  ctx.lineTo(checkX + 3.5, checkYc - 2.5);
  ctx.stroke();

  // SHA-256 hash
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.06 : 0.08);
  rrect(ctx, cDocX + 6, cDocY + cH - cH * 0.22, cW - 12, cH * 0.14, 3); ctx.fill();
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.35 : 0.45);
  ctx.font = `500 ${fs(0.02)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("SHA-256: a3f2c7...", cx, cDocY + cH - cH * 0.15);

  // Label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.038)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("Signed & Sealed", cx, cDocY + cH + h * 0.008);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.026)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Tamper-proof audit trail", cx, cDocY + cH + h * 0.032);

  curY = cDocY + cH + h * 0.065;

  // ────────────────────────────────────────────────────────
  //  BOTTOM STRIP — security badges (2 rows for mobile)
  // ────────────────────────────────────────────────────────
  const labels = [
    { text: "SHA-256", desc: "integrity hashing" },
    { text: "IT Act 2000", desc: "Aadhaar eSign" },
    { text: "X.509 Certs", desc: "DSC signing" },
    { text: "Audit Trail", desc: "non-repudiation" },
    { text: "Webhooks", desc: "real-time events" },
  ];

  // Row 1: first 3, Row 2: last 2
  const row1 = labels.slice(0, 3);
  const row2 = labels.slice(3);
  const badgeGap = w * 0.28;

  // Divider
  ctx.strokeStyle = rgba(p.line, dark ? 0.12 : 0.16);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(w * 0.08, curY); ctx.lineTo(w * 0.92, curY); ctx.stroke();

  // Row 1
  const row1Start = cx - ((row1.length - 1) * badgeGap) / 2;
  for (let i = 0; i < row1.length; i++) {
    const lx = row1Start + i * badgeGap;
    ctx.fillStyle = rgba(p.amber, dark ? 0.45 : 0.5);
    ctx.beginPath(); ctx.arc(lx, curY, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(p.amber, dark ? 0.65 : 0.7);
    ctx.font = `700 ${fs(0.026)}px monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(row1[i].text, lx, curY + 6);
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.4 : 0.5);
    ctx.font = `500 ${fs(0.02)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(row1[i].desc, lx, curY + 6 + fs(0.028));
  }

  // Row 2
  const row2Y = curY + h * 0.06;
  const row2Start = cx - ((row2.length - 1) * badgeGap) / 2;
  for (let i = 0; i < row2.length; i++) {
    const lx = row2Start + i * badgeGap;
    ctx.fillStyle = rgba(p.amber, dark ? 0.45 : 0.5);
    ctx.beginPath(); ctx.arc(lx, row2Y, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(p.amber, dark ? 0.65 : 0.7);
    ctx.font = `700 ${fs(0.026)}px monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(row2[i].text, lx, row2Y + 6);
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.4 : 0.5);
    ctx.font = `500 ${fs(0.02)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(row2[i].desc, lx, row2Y + 6 + fs(0.028));
  }
}

/* ═══════════════════════════════════════════════════════════
   MAIN DRAW
   ═══════════════════════════════════════════════════════════ */
function drawAll(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dark: boolean) {
  // Use vertical mobile layout for narrow viewports
  if (w < 600) {
    drawAllMobile(ctx, w, h, t, dark);
    return;
  }
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

/* ── Helper: draw method icons (detailed, matching homepage quality) ── */
function drawMethodIcon(
  ctx: CanvasRenderingContext2D,
  icon: "pen" | "usb" | "aadhaar",
  cx: number, cy: number, size: number,
  color: RGB, dark: boolean,
) {
  const s = size; // shorthand for scale

  if (icon === "pen") {
    // ── Pen with nib, body, edge line, ink dot & signature flourish ──
    // Matches homepage ElectronicSignIcon

    // Pen body — diagonal from top-right to bottom-left
    const bodyColor = rgba(color, dark ? 0.6 : 0.65);
    const fillColor = rgba(color, dark ? 0.06 : 0.04);
    ctx.save();
    ctx.strokeStyle = bodyColor;
    ctx.lineWidth = Math.max(1.2, s * 0.1);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Main pen body (quadrilateral)
    ctx.beginPath();
    ctx.moveTo(cx + s * 0.55, cy - s * 0.8);   // top-right (eraser end)
    ctx.lineTo(cx - s * 0.35, cy + s * 0.2);    // going down-left
    ctx.lineTo(cx - s * 0.5, cy + s * 0.65);    // nib tip area
    ctx.lineTo(cx + s * 0.05, cy + s * 0.45);   // nib side
    ctx.lineTo(cx + s * 0.85, cy - s * 0.5);    // back to top
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.stroke();

    // Nib triangle (filled slightly more)
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.35, cy + s * 0.2);
    ctx.lineTo(cx - s * 0.5, cy + s * 0.65);
    ctx.lineTo(cx + s * 0.05, cy + s * 0.45);
    ctx.closePath();
    ctx.fillStyle = rgba(color, dark ? 0.1 : 0.08);
    ctx.fill();
    ctx.stroke();

    // Edge line inside pen body
    ctx.strokeStyle = rgba(color, dark ? 0.18 : 0.15);
    ctx.lineWidth = Math.max(0.5, s * 0.04);
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.15, cy + s * 0.1);
    ctx.lineTo(cx + s * 0.65, cy - s * 0.72);
    ctx.stroke();

    // Ink dot at nib
    ctx.fillStyle = rgba(color, dark ? 0.5 : 0.55);
    ctx.beginPath();
    ctx.arc(cx - s * 0.48, cy + s * 0.62, Math.max(1.2, s * 0.08), 0, Math.PI * 2);
    ctx.fill();

    // Signature flourish — bold wavy line below the pen
    ctx.strokeStyle = rgba(color, dark ? 0.35 : 0.4);
    ctx.lineWidth = Math.max(1.5, s * 0.12);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.85, cy + s * 1.0);
    ctx.bezierCurveTo(
      cx - s * 0.45, cy + s * 0.65,
      cx - s * 0.15, cy + s * 0.65,
      cx + s * 0.1, cy + s * 0.85,
    );
    ctx.bezierCurveTo(
      cx + s * 0.3, cy + s * 1.0,
      cx + s * 0.55, cy + s * 1.05,
      cx + s * 0.8, cy + s * 0.85,
    );
    ctx.stroke();

    ctx.restore();

  } else if (icon === "usb") {
    // ── Detailed DSC USB token — connector, body, chip pad, LED, lanyard ──
    // Matches homepage DscTokenIcon

    ctx.save();
    const lw = Math.max(1.2, s * 0.1);
    const bodyW = s * 0.85;
    const bodyH = s * 1.55;
    const bodyX = cx - bodyW / 2;
    const bodyY = cy - bodyH * 0.35;
    const connW = bodyW * 0.62;
    const connH = s * 0.35;
    const connX = cx - connW / 2;
    const connY = bodyY - connH;
    const bodyR = Math.max(2, s * 0.2);

    // USB connector rectangle
    ctx.strokeStyle = rgba(color, dark ? 0.55 : 0.6);
    ctx.lineWidth = lw;
    ctx.fillStyle = rgba(color, dark ? 0.04 : 0.02);
    rrect(ctx, connX, connY, connW, connH, [Math.max(1, s * 0.08), Math.max(1, s * 0.08), 0, 0]);
    ctx.fill(); ctx.stroke();

    // Connector pins (two small rects inside connector)
    const pinW = connW * 0.15;
    const pinH = connH * 0.5;
    const pinY = connY + connH * 0.25;
    ctx.fillStyle = rgba(color, dark ? 0.35 : 0.4);
    rrect(ctx, cx - connW * 0.22, pinY, pinW, pinH, Math.max(0.5, s * 0.03));
    ctx.fill();
    rrect(ctx, cx + connW * 0.08, pinY, pinW, pinH, Math.max(0.5, s * 0.03));
    ctx.fill();

    // Token body (main rectangle)
    ctx.strokeStyle = rgba(color, dark ? 0.55 : 0.6);
    ctx.lineWidth = lw;
    ctx.fillStyle = rgba(color, dark ? 0.05 : 0.03);
    rrect(ctx, bodyX, bodyY, bodyW, bodyH, bodyR);
    ctx.fill(); ctx.stroke();

    // Chip contact pad (gold IC rectangle)
    const chipW = bodyW * 0.55;
    const chipH = bodyH * 0.28;
    const chipX = cx - chipW / 2;
    const chipY = bodyY + bodyH * 0.18;
    ctx.strokeStyle = rgba(color, dark ? 0.45 : 0.5);
    ctx.lineWidth = Math.max(0.8, s * 0.07);
    ctx.fillStyle = rgba(color, dark ? 0.08 : 0.06);
    rrect(ctx, chipX, chipY, chipW, chipH, Math.max(1, s * 0.08));
    ctx.fill(); ctx.stroke();

    // Chip internal grid lines (horizontal + vertical)
    ctx.strokeStyle = rgba(color, dark ? 0.2 : 0.2);
    ctx.lineWidth = Math.max(0.4, s * 0.03);
    // Horizontal lines
    const chipMidY1 = chipY + chipH * 0.35;
    const chipMidY2 = chipY + chipH * 0.65;
    ctx.beginPath();
    ctx.moveTo(chipX, chipMidY1); ctx.lineTo(chipX + chipW, chipMidY1);
    ctx.moveTo(chipX, chipMidY2); ctx.lineTo(chipX + chipW, chipMidY2);
    // Vertical center line
    ctx.moveTo(cx, chipY); ctx.lineTo(cx, chipY + chipH);
    ctx.stroke();

    // LED indicator (two circles — outer glow + inner bright)
    const ledY = bodyY + bodyH * 0.68;
    ctx.fillStyle = rgba(color, dark ? 0.3 : 0.35);
    ctx.beginPath(); ctx.arc(cx, ledY, Math.max(1.8, s * 0.12), 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(color, dark ? 0.6 : 0.65);
    ctx.beginPath(); ctx.arc(cx, ledY, Math.max(0.9, s * 0.06), 0, Math.PI * 2); ctx.fill();

    // Lanyard hole
    const holeY = bodyY + bodyH * 0.85;
    ctx.strokeStyle = rgba(color, dark ? 0.2 : 0.22);
    ctx.lineWidth = Math.max(0.6, s * 0.05);
    ctx.beginPath(); ctx.arc(cx, holeY, Math.max(1, s * 0.07), 0, Math.PI * 2); ctx.stroke();

    ctx.restore();

  } else {
    // ── Aadhaar — render the official traced UIDAI SVG logo ──
    // Same SVG used on the homepage and product page signing-methods section
    const img = getAadhaarImg();
    if (img) {
      ctx.save();
      // SVG viewBox is 353.3 x 248.43 (≈1.42 : 1 aspect ratio)
      const drawH = s * 2.2;
      const drawW = drawH * (353.3 / 248.43);
      ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
      ctx.restore();
    } else {
      // Fallback while image loads: simple placeholder dot
      ctx.fillStyle = rgba(color, dark ? 0.3 : 0.25);
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.5, 0, Math.PI * 2); ctx.fill();
    }
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
    <div ref={containerRef} className={`relative ${className}`} style={{ minHeight: 340 }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
