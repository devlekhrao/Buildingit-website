import { useEffect, useRef } from "react";

/**
 * CanvasLogo renders each venture's logo mark programmatically on an HTML5
 * <canvas> in the silver-on-black brand theme. No external image assets — the
 * marks are drawn with vector paths + a brushed-silver linear gradient so they
 * stay crisp at any size (handles devicePixelRatio).
 */

export type VentureLogo =
  | "purplebat"
  | "firstfeedback"
  | "grid"
  | "zxstudio"
  | "pillar";

type Props = {
  venture: VentureLogo;
  /** CSS pixel size (square). Defaults to 48. */
  size?: number;
  className?: string;
  /** Accent the core mark with a faint violet tint. */
  accent?: boolean;
};

/** Apply a vertical brushed-silver gradient as the current fill/stroke source. */
function silver(ctx: CanvasRenderingContext2D, s: number, accent: boolean) {
  const g = ctx.createLinearGradient(0, 0, 0, s);
  if (accent) {
    g.addColorStop(0, "#f5f3ff");
    g.addColorStop(0.4, "#e9e7f5");
    g.addColorStop(0.55, "#cbbfe6");
    g.addColorStop(0.75, "#efeefb");
    g.addColorStop(1, "#b9b4cf");
  } else {
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.35, "#e8e8ee");
    g.addColorStop(0.52, "#a9adb8");
    g.addColorStop(0.7, "#f1f2f5");
    g.addColorStop(1, "#9aa0ab");
  }
  return g;
}

function drawPurplebat(ctx: CanvasRenderingContext2D, s: number) {
  // Geometric bat: body diamond + two angular wings.
  const cx = s / 2;
  ctx.beginPath();
  ctx.moveTo(cx, s * 0.26); // top of head
  ctx.lineTo(cx - s * 0.06, s * 0.36);
  ctx.lineTo(cx - s * 0.04, s * 0.34);
  // left wing
  ctx.lineTo(cx - s * 0.16, s * 0.3);
  ctx.lineTo(cx - s * 0.34, s * 0.36);
  ctx.lineTo(cx - s * 0.26, s * 0.42);
  ctx.lineTo(cx - s * 0.4, s * 0.46);
  ctx.lineTo(cx - s * 0.22, s * 0.56);
  ctx.lineTo(cx - s * 0.12, s * 0.5);
  ctx.lineTo(cx - s * 0.08, s * 0.62);
  // chin
  ctx.lineTo(cx, s * 0.72);
  // mirror right side
  ctx.lineTo(cx + s * 0.08, s * 0.62);
  ctx.lineTo(cx + s * 0.12, s * 0.5);
  ctx.lineTo(cx + s * 0.22, s * 0.56);
  ctx.lineTo(cx + s * 0.4, s * 0.46);
  ctx.lineTo(cx + s * 0.26, s * 0.42);
  ctx.lineTo(cx + s * 0.34, s * 0.36);
  ctx.lineTo(cx + s * 0.16, s * 0.3);
  ctx.lineTo(cx + s * 0.04, s * 0.34);
  ctx.lineTo(cx + s * 0.06, s * 0.36);
  ctx.closePath();
  ctx.fill();
  // little ears
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.05, s * 0.27);
  ctx.lineTo(cx - s * 0.09, s * 0.18);
  ctx.lineTo(cx - s * 0.01, s * 0.26);
  ctx.closePath();
  ctx.moveTo(cx + s * 0.05, s * 0.27);
  ctx.lineTo(cx + s * 0.09, s * 0.18);
  ctx.lineTo(cx + s * 0.01, s * 0.26);
  ctx.closePath();
  ctx.fill();
}

function drawFirstfeedback(ctx: CanvasRenderingContext2D, s: number) {
  // Rounded chat bubble with a tail + an upward spark/check inside.
  const x = s * 0.2;
  const y = s * 0.24;
  const w = s * 0.6;
  const h = s * 0.42;
  const r = s * 0.12;
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(2, s * 0.06);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  // tail
  ctx.lineTo(x + w * 0.36, y + h);
  ctx.lineTo(x + w * 0.2, y + h + s * 0.14);
  ctx.lineTo(x + w * 0.26, y + h);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.stroke();
  // upward trend arrow inside
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x + w * 0.22, y + h * 0.62);
  ctx.lineTo(x + w * 0.45, y + h * 0.4);
  ctx.lineTo(x + w * 0.6, y + h * 0.52);
  ctx.lineTo(x + w * 0.82, y + h * 0.28);
  ctx.stroke();
  // arrow head
  ctx.beginPath();
  ctx.moveTo(x + w * 0.82, y + h * 0.28);
  ctx.lineTo(x + w * 0.64, y + h * 0.26);
  ctx.moveTo(x + w * 0.82, y + h * 0.28);
  ctx.lineTo(x + w * 0.84, y + h * 0.46);
  ctx.stroke();
}

function drawGrid(ctx: CanvasRenderingContext2D, s: number) {
  // 3x3 lattice of rounded nodes with connecting lines.
  const start = s * 0.26;
  const gap = s * 0.24;
  const rad = s * 0.045;
  // connectors
  ctx.lineWidth = Math.max(1.5, s * 0.025);
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const p = start + i * gap;
    ctx.moveTo(start, p);
    ctx.lineTo(start + 2 * gap, p);
    ctx.moveTo(p, start);
    ctx.lineTo(p, start + 2 * gap);
  }
  ctx.stroke();
  // nodes
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const cx = start + c * gap;
      const cy = start + r * gap;
      const big = r === 1 && c === 1;
      ctx.beginPath();
      ctx.arc(cx, cy, big ? rad * 1.7 : rad, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawZxstudio(ctx: CanvasRenderingContext2D, s: number) {
  // Interlocking Z + X monogram built from bold strokes.
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(3, s * 0.1);
  // Z
  ctx.beginPath();
  ctx.moveTo(s * 0.24, s * 0.3);
  ctx.lineTo(s * 0.52, s * 0.3);
  ctx.lineTo(s * 0.24, s * 0.7);
  ctx.lineTo(s * 0.54, s * 0.7);
  ctx.stroke();
  // X overlapping right side
  ctx.beginPath();
  ctx.moveTo(s * 0.52, s * 0.32);
  ctx.lineTo(s * 0.78, s * 0.68);
  ctx.moveTo(s * 0.78, s * 0.32);
  ctx.lineTo(s * 0.52, s * 0.68);
  ctx.stroke();
}

function drawPillar(ctx: CanvasRenderingContext2D, s: number) {
  // Classical column: capital, fluted shaft, base.
  const cx = s / 2;
  // capital (top slab)
  ctx.fillRect(cx - s * 0.26, s * 0.24, s * 0.52, s * 0.08);
  ctx.fillRect(cx - s * 0.22, s * 0.32, s * 0.44, s * 0.05);
  // base (bottom slab)
  ctx.fillRect(cx - s * 0.22, s * 0.63, s * 0.44, s * 0.05);
  ctx.fillRect(cx - s * 0.26, s * 0.68, s * 0.52, s * 0.08);
  // three flutes (shaft columns)
  const top = s * 0.37;
  const bot = s * 0.63;
  const fw = s * 0.08;
  const xs = [cx - s * 0.16, cx - fw / 2, cx + s * 0.08];
  xs.forEach((fx) => ctx.fillRect(fx, top, fw, bot - top));
}

function draw(ctx: CanvasRenderingContext2D, venture: VentureLogo, s: number, accent: boolean) {
  const paint = silver(ctx, s, accent);
  ctx.fillStyle = paint;
  ctx.strokeStyle = paint;
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = s * 0.04;
  ctx.shadowOffsetY = s * 0.015;
  switch (venture) {
    case "purplebat":
      return drawPurplebat(ctx, s);
    case "firstfeedback":
      return drawFirstfeedback(ctx, s);
    case "grid":
      return drawGrid(ctx, s);
    case "zxstudio":
      return drawZxstudio(ctx, s);
    case "pillar":
      return drawPillar(ctx, s);
  }
}

export default function CanvasLogo({ venture, size = 48, className, accent = false }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(ctx, venture, size, accent);
  }, [venture, size, accent]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={`${venture} logo`}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
