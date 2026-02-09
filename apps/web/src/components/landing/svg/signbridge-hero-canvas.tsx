"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════════
   SIGNBRIDGE HERO CANVAS — proportion-based layout

   Everything is sized as a fraction of canvas w/h so it
   fills the space regardless of viewport. No fixed px scale.

   Flow:
     Forward  →  Browser ──→ SignBridge ──→ USB Token
     Return   ←  Browser ←── SignBridge ←── USB Token
                                 ↓
                        [Embeds into PDF]
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

/* ═══════════════════════════════════════════════════════════
   MAIN DRAW — everything sized relative to canvas w/h
   ═══════════════════════════════════════════════════════════ */
function drawAll(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dark: boolean) {
  const p = pal(dark);
  ctx.clearRect(0, 0, w, h);

  // ── Layout grid ──
  const col1 = w * 0.16;   // browser center
  const col2 = w * 0.50;   // bridge center
  const col3 = w * 0.84;   // token center
  const rowY = h * 0.40;   // vertical center of all 3 elements

  // Font size helpers — proportional to canvas
  const f = Math.min(w, h * 1.6);  // reference dimension
  const fs = (n: number) => Math.max(Math.round(f * n), 8); // font size from fraction

  // ────────────────────────────────────────────────────────
  //  BROWSER WINDOW (left)
  // ────────────────────────────────────────────────────────
  const bW = w * 0.22;
  const bH = h * 0.40;
  const bx = col1 - bW / 2;
  const by = rowY - bH / 2;

  // Shadow + fill
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(20,10,60,0.14)";
  ctx.shadowBlur = 18; ctx.shadowOffsetY = 5;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, bx, by, bW, bH, 10); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.cardBorder, dark ? 0.5 : 0.55);
  ctx.lineWidth = 1.5;
  rrect(ctx, bx, by, bW, bH, 10); ctx.stroke();

  // Title bar
  const tbH = bH * 0.15;
  ctx.fillStyle = rgba(p.fg, dark ? 0.03 : 0.025);
  rrect(ctx, bx, by, bW, tbH, [10, 10, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.fg, dark ? 0.06 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(bx, by + tbH); ctx.lineTo(bx + bW, by + tbH); ctx.stroke();

  // Traffic lights
  const dotR = Math.max(bW * 0.02, 3);
  const cols: RGB[] = [[255, 95, 87], [255, 189, 46], [40, 202, 65]];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = rgba(cols[i], dark ? 0.65 : 0.7);
    ctx.beginPath(); ctx.arc(bx + 14 + i * (dotR * 3.5), by + tbH / 2, dotR, 0, Math.PI * 2); ctx.fill();
  }

  // URL text
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.45 : 0.5);
  ctx.font = `500 ${fs(0.012)}px monospace`;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillText("yourbank.com/sign", bx + bW * 0.25, by + tbH / 2);

  // Doc lines
  const docY = by + tbH + bH * 0.08;
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.08 : 0.14);
  for (const [i, lw] of [0.85, 0.55, 0.7].entries()) {
    rrect(ctx, bx + 12, docY + i * bH * 0.08, (bW - 24) * lw, 4, 2); ctx.fill();
  }

  // Sign button
  const btnW = bW * 0.6;
  const btnH2 = bH * 0.13;
  const btnX = bx + (bW - btnW) / 2;
  const btnY = by + bH * 0.52;
  ctx.save();
  ctx.shadowColor = rgba(p.violet, dark ? 0.4 : 0.3); ctx.shadowBlur = 14;
  ctx.fillStyle = rgba(p.violet, dark ? 0.88 : 0.92);
  rrect(ctx, btnX, btnY, btnW, btnH2, 7); ctx.fill();
  ctx.restore();
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = `700 ${fs(0.015)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("Sign Document", btnX + btnW / 2, btnY + btnH2 / 2);

  // Code snippet
  const cdY = btnY + btnH2 + bH * 0.06;
  ctx.fillStyle = rgba(p.fg, dark ? 0.03 : 0.025);
  rrect(ctx, bx + 10, cdY, bW - 20, bH * 0.1, 5); ctx.fill();
  ctx.fillStyle = rgba(p.violet, dark ? 0.5 : 0.55);
  ctx.font = `500 ${fs(0.01)}px monospace`;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillText("signBridge.sign(hash)", bx + 18, cdY + bH * 0.05);

  // Browser label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.02)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("Your Website", col1, by + bH + h * 0.025);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.013)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Any browser, any web app", col1, by + bH + h * 0.06);

  // ────────────────────────────────────────────────────────
  //  SIGNBRIDGE AGENT (center)
  // ────────────────────────────────────────────────────────
  const aW = w * 0.18;
  const aH = h * 0.34;
  const ax = col2 - aW / 2;
  const ay = rowY - aH / 2;

  // Glow
  const glowR = aW * 0.9;
  const grad = ctx.createRadialGradient(col2, rowY, 0, col2, rowY, glowR);
  grad.addColorStop(0, rgba(p.violet, dark ? 0.07 : 0.05));
  grad.addColorStop(1, rgba(p.violet, 0));
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.arc(col2, rowY, glowR, 0, Math.PI * 2); ctx.fill();

  // Box
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(20,10,60,0.14)";
  ctx.shadowBlur = 22; ctx.shadowOffsetY = 5;
  ctx.fillStyle = rgba(p.cardBg, 1);
  rrect(ctx, ax, ay, aW, aH, 12); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.4 : 0.32);
  ctx.lineWidth = 2;
  rrect(ctx, ax, ay, aW, aH, 12); ctx.stroke();

  // Header bar
  const ahH = aH * 0.2;
  ctx.fillStyle = rgba(p.violet, dark ? 0.07 : 0.04);
  rrect(ctx, ax, ay, aW, ahH, [12, 12, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.1 : 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(ax, ay + ahH); ctx.lineTo(ax + aW, ay + ahH); ctx.stroke();

  // LED
  const ledP = Math.sin(t * 2) * 0.2 + 0.7;
  ctx.fillStyle = rgba(p.green, ledP);
  ctx.beginPath(); ctx.arc(ax + 14, ay + ahH / 2, 4, 0, Math.PI * 2); ctx.fill();

  // Title
  ctx.fillStyle = rgba(p.violet, dark ? 0.88 : 0.92);
  ctx.font = `800 ${fs(0.016)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillText("SignBridge", ax + 26, ay + ahH / 2);

  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.3 : 0.35);
  ctx.font = `600 ${fs(0.009)}px monospace`;
  ctx.textAlign = "right";
  ctx.fillText("TRAY", ax + aW - 10, ay + ahH / 2);

  // Shield
  const shCy = ay + ahH + (aH - ahH) * 0.38;
  const shR = aW * 0.18;
  ctx.beginPath();
  ctx.moveTo(col2, shCy - shR);
  ctx.lineTo(col2 + shR * 0.85, shCy - shR * 0.45);
  ctx.lineTo(col2 + shR * 0.85, shCy + shR * 0.3);
  ctx.quadraticCurveTo(col2 + shR * 0.85, shCy + shR * 0.95, col2, shCy + shR * 1.15);
  ctx.quadraticCurveTo(col2 - shR * 0.85, shCy + shR * 0.95, col2 - shR * 0.85, shCy + shR * 0.3);
  ctx.lineTo(col2 - shR * 0.85, shCy - shR * 0.45);
  ctx.closePath();
  ctx.fillStyle = rgba(p.violet, dark ? 0.08 : 0.05); ctx.fill();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.45 : 0.38);
  ctx.lineWidth = 1.8; ctx.stroke();

  // Lock
  const lk = shR * 0.32;
  ctx.fillStyle = rgba(p.violet, dark ? 0.55 : 0.5);
  rrect(ctx, col2 - lk, shCy + lk * 0.1, lk * 2, lk * 1.4, 2); ctx.fill();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.6 : 0.55);
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(col2, shCy + lk * 0.1, lk * 0.65, Math.PI, 0, false); ctx.stroke();

  // Crypto labels inside box
  ctx.fillStyle = rgba(p.violet, dark ? 0.55 : 0.6);
  ctx.font = `700 ${fs(0.011)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  ctx.fillText("localhost:53000", col2, shCy + shR * 1.25);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.35 : 0.4);
  ctx.font = `500 ${fs(0.009)}px monospace`;
  ctx.fillText("Ed25519 JWT Auth", col2, shCy + shR * 1.25 + fs(0.015));

  // Agent label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.02)}px -apple-system, system-ui, sans-serif`;
  ctx.textBaseline = "top";
  ctx.fillText("SignBridge Agent", col2, ay + aH + h * 0.025);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.013)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Runs in your system tray", col2, ay + aH + h * 0.06);

  // ────────────────────────────────────────────────────────
  //  USB TOKEN (right)
  // ────────────────────────────────────────────────────────
  const tW = w * 0.055;
  const tH = h * 0.26;
  const tConnH = tH * 0.22;
  const tx = col3 - tW / 2;
  const ty = rowY - tH / 2;
  const tConnY = ty - tConnH;

  // Connector
  const cW = tW * 0.6;
  ctx.fillStyle = rgba(p.tokenMetal, dark ? 0.4 : 0.5);
  rrect(ctx, col3 - cW / 2, tConnY, cW, tConnH, [4, 4, 0, 0]); ctx.fill();
  ctx.strokeStyle = rgba(p.tokenMetal, dark ? 0.55 : 0.65);
  ctx.lineWidth = 1.2;
  rrect(ctx, col3 - cW / 2, tConnY, cW, tConnH, [4, 4, 0, 0]); ctx.stroke();
  // Pins
  for (let i = 0; i < 2; i++) {
    ctx.fillStyle = rgba(p.tokenMetal, dark ? 0.65 : 0.75);
    rrect(ctx, col3 - 5 + i * 10, tConnY + 5, 3, tConnH - 9, 1); ctx.fill();
  }

  // Body
  ctx.save();
  ctx.shadowColor = dark ? "rgba(0,0,0,0.35)" : "rgba(20,10,60,0.12)";
  ctx.shadowBlur = 16; ctx.shadowOffsetY = 4;
  ctx.fillStyle = rgba(p.tokenBody, 1);
  rrect(ctx, tx, ty, tW, tH, 8); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = rgba(p.violet, dark ? 0.35 : 0.28);
  ctx.lineWidth = 1.8;
  rrect(ctx, tx, ty, tW, tH, 8); ctx.stroke();

  // Gold chip
  const chipS = tW * 0.42;
  const chipX = col3 - chipS / 2;
  const chipY2 = ty + tH * 0.25;
  ctx.fillStyle = dark ? "rgba(200,180,100,0.22)" : "rgba(180,160,80,0.16)";
  rrect(ctx, chipX, chipY2, chipS, chipS, 2); ctx.fill();
  ctx.strokeStyle = dark ? "rgba(200,180,100,0.45)" : "rgba(180,160,80,0.38)";
  ctx.lineWidth = 1;
  rrect(ctx, chipX, chipY2, chipS, chipS, 2); ctx.stroke();
  // Chip detail
  ctx.strokeStyle = dark ? "rgba(200,180,100,0.22)" : "rgba(180,160,80,0.2)";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(chipX + 2, chipY2 + chipS / 2); ctx.lineTo(chipX + chipS - 2, chipY2 + chipS / 2);
  ctx.moveTo(chipX + chipS / 2, chipY2 + 2); ctx.lineTo(chipX + chipS / 2, chipY2 + chipS - 2);
  ctx.stroke();

  // LED
  const tLed = Math.sin(t * 2.5) * 0.3 + 0.6;
  ctx.fillStyle = rgba(p.green, tLed);
  ctx.beginPath(); ctx.arc(col3, ty + tH - tH * 0.12, 3, 0, Math.PI * 2); ctx.fill();

  // X.509
  ctx.fillStyle = rgba(p.fg, dark ? 0.35 : 0.4);
  ctx.font = `700 ${fs(0.01)}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("X.509", col3, ty + tH * 0.65);

  // Token label
  ctx.fillStyle = rgba(p.fg, dark ? 0.85 : 0.9);
  ctx.font = `800 ${fs(0.02)}px -apple-system, system-ui, sans-serif`;
  ctx.textBaseline = "top";
  ctx.fillText("Your USB Token", col3, ty + tH + h * 0.025);
  ctx.fillStyle = rgba(p.fgMuted, dark ? 0.5 : 0.6);
  ctx.font = `500 ${fs(0.013)}px -apple-system, system-ui, sans-serif`;
  ctx.fillText("Private key stays here", col3, ty + tH + h * 0.06);

  // ────────────────────────────────────────────────────────
  //  ARROWS — forward (above center) and return (below center)
  //  Both are straight horizontal, same visual style
  // ────────────────────────────────────────────────────────
  const arrowGap = h * 0.04;  // distance from center for each row
  const fwdY = rowY - arrowGap;
  const retY = rowY + arrowGap;

  // Arrow endpoints — outside the element boxes
  const leftEdge = bx + bW + 4;       // right edge of browser
  const bridgeL = ax - 4;             // left edge of bridge
  const bridgeR = ax + aW + 4;        // right edge of bridge
  const rightEdge = tx - 4;           // left edge of token

  // Helper: draw one horizontal arrow
  function drawArrow(
    x1: number, y0: number, x2: number, t0: number,
    label: string, sub: string,
    color: RGB, dot: RGB,
    right: boolean, labelsAbove: boolean,
  ) {
    // Line
    ctx.strokeStyle = rgba(color, dark ? 0.25 : 0.28);
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(x1, y0); ctx.lineTo(x2, y0); ctx.stroke();
    ctx.setLineDash([]);

    // Arrow head
    const tip = right ? x2 : x1;
    const dir = right ? 0 : Math.PI;
    const hl = 10;
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
    ctx.shadowColor = rgba(dot, 0.5); ctx.shadowBlur = 10;
    ctx.fillStyle = rgba(dot, dark ? 0.75 : 0.85);
    ctx.beginPath(); ctx.arc(px, y0, 5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = rgba(dot, dark ? 0.95 : 1);
    ctx.beginPath(); ctx.arc(px, y0, 2.5, 0, Math.PI * 2); ctx.fill();

    // Labels
    const midX = (x1 + x2) / 2;
    const labelFont = fs(0.015);
    const subFont = fs(0.011);
    if (labelsAbove) {
      ctx.fillStyle = rgba(color, dark ? 0.75 : 0.8);
      ctx.font = `700 ${labelFont}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "bottom";
      ctx.fillText(label, midX, y0 - 8);
      ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
      ctx.font = `500 ${subFont}px -apple-system, system-ui, sans-serif`;
      ctx.fillText(sub, midX, y0 - 8 - labelFont - 2);
    } else {
      ctx.fillStyle = rgba(color, dark ? 0.75 : 0.8);
      ctx.font = `700 ${labelFont}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(label, midX, y0 + 8);
      ctx.fillStyle = rgba(color, dark ? 0.45 : 0.5);
      ctx.font = `500 ${subFont}px -apple-system, system-ui, sans-serif`;
      ctx.fillText(sub, midX, y0 + 8 + labelFont + 2);
    }
  }

  // Forward: Browser → Bridge → Token (labels above)
  drawArrow(leftEdge, fwdY, bridgeL, t, "doc hash", "SHA-256 digest", p.violet, p.violetBright, true, true);
  drawArrow(bridgeR, fwdY, rightEdge, t + 1.8, "sign request", "PKCS#11 call", p.violet, p.violetBright, true, true);

  // Return: Token → Bridge → Browser (labels below)
  drawArrow(bridgeR, retY, rightEdge, t + 0.9, "signed hash", "RSA / ECDSA", p.green, p.green, false, false);
  drawArrow(leftEdge, retY, bridgeL, t + 2.5, "signed PDF", "embeds hash into PDF (PAdES)", p.green, p.green, false, false);

  // ────────────────────────────────────────────────────────
  //  SECURITY STRIP (bottom)
  // ────────────────────────────────────────────────────────
  const stripY = h * 0.93;
  const labels = [
    { text: "HTTPS TLS 1.3", desc: "encrypted tunnel" },
    { text: "Ed25519 JWT", desc: "authentication" },
    { text: "HMAC-SHA256", desc: "session isolation" },
    { text: "CAPI / CNG", desc: "certificate store" },
    { text: "0ms exposure", desc: "key never extracted" },
  ];
  const gap = Math.min(w * 0.18, 130);
  const totalW = (labels.length - 1) * gap;
  const startX = w / 2 - totalW / 2;

  ctx.strokeStyle = rgba(p.line, dark ? 0.12 : 0.16);
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(startX - 20, stripY); ctx.lineTo(startX + totalW + 20, stripY); ctx.stroke();

  for (let i = 0; i < labels.length; i++) {
    const lx = startX + i * gap;
    ctx.fillStyle = rgba(p.violet, dark ? 0.45 : 0.5);
    ctx.beginPath(); ctx.arc(lx, stripY, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(p.violet, dark ? 0.65 : 0.7);
    ctx.font = `700 ${fs(0.013)}px monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(labels[i].text, lx, stripY + 8);
    ctx.fillStyle = rgba(p.fgMuted, dark ? 0.4 : 0.5);
    ctx.font = `500 ${fs(0.01)}px -apple-system, system-ui, sans-serif`;
    ctx.fillText(labels[i].desc, lx, stripY + 8 + fs(0.015));
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
    <div ref={containerRef} className={`relative ${className}`} style={{ minHeight: 380 }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
