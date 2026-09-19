import { useRef, useEffect, useMemo, useState } from "react";

import "./DotGrid.css";

// Adapted from react-bits (https://github.com/DavidHDev/react-bits) DotGrid.
// Rewritten as a lightweight canvas dot grid without GSAP so landing pages get
// the texture without an extra animation engine. Static by default under
// prefers-reduced-motion.

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

const DotGrid = ({
  dotSize = 3,
  gap = 34,
  baseColor = "#E7E5E4",
  activeColor = "#D97706",
  proximity = 120,
  className = "",
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = () => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({ cx: startX + x * cell, cy: startY + y * cell });
      }
    }
    dotsRef.current = dots;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext("2d");
    if (!canvas || !ctx || !circlePath) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const proxSq = proximity * proximity;
    const { x: px, y: py } = pointerRef.current;

    for (const dot of dotsRef.current) {
      const dx = dot.cx - px;
      const dy = dot.cy - py;
      const dsq = dx * dx + dy * dy;

      ctx.fillStyle = "rgba(215, 211, 200, 0.45)";
      if (dsq <= proxSq) {
        const dist = Math.sqrt(dsq);
        const t = 1 - dist / proximity;
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.45 + t * 0.55})`;
      }

      ctx.save();
      ctx.translate(dot.cx, dot.cy);
      ctx.fill(circlePath);
      ctx.restore();
    }
  };

  useEffect(() => {
    if (!circlePath) return;
    buildGrid();

    let rafId;
    const tick = () => {
      draw();
      rafId = requestAnimationFrame(tick);
    };
    tick();

    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => {
        buildGrid();
        draw();
      });
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener("resize", () => {
        buildGrid();
        draw();
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circlePath, proximity, baseColor]);

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;