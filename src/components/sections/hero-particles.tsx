"use client";

import { useEffect, useRef } from "react";

type Particle = {
  rx: number;
  ry: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
};

const SAMPLE_STEP = 4;
const ALPHA_THRESHOLD = 100;
const LOGO_SRC = "/logo-icon-512.png";

export function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Touch/coarse-pointer devices have no persistent hover, so the
    // mouse-repel physics loop never triggers anyway — skip the
    // continuous requestAnimationFrame loop and mouse listeners and
    // just render the settled particle shape once, like the
    // reduced-motion path. Saves battery/CPU on phones.
    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const staticOnly = reduced || isCoarsePointer;

    const state = {
      particles: [] as Particle[],
      mouse: { x: -9999, y: -9999, active: false },
      raf: 0,
      visible: true,
      width: 0,
      height: 0,
      dpr: 1,
    };

    let img: HTMLImageElement | null = null;

    const sampleFromImage = (image: HTMLImageElement) => {
      const W = state.width;
      const H = state.height;
      if (W < 4 || H < 4) {
        state.particles = [];
        return;
      }
      // Fit the logo inside the container, preserving aspect ratio.
      const pad = 0.12; // small margin so particles don't touch the edges
      const boxW = W * (1 - pad);
      const boxH = H * (1 - pad);
      const imgAspect = image.naturalWidth / image.naturalHeight;
      const boxAspect = boxW / boxH;
      let dw: number;
      let dh: number;
      if (imgAspect > boxAspect) {
        dw = boxW;
        dh = boxW / imgAspect;
      } else {
        dh = boxH;
        dw = boxH * imgAspect;
      }
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;

      const off = document.createElement("canvas");
      off.width = Math.max(2, Math.floor(dw));
      off.height = Math.max(2, Math.floor(dh));
      const offCtx = off.getContext("2d");
      if (!offCtx) return;
      offCtx.drawImage(image, 0, 0, off.width, off.height);

      let data: ImageData;
      try {
        data = offCtx.getImageData(0, 0, off.width, off.height);
      } catch {
        return;
      }
      const px = data.data;
      const out: Particle[] = [];
      for (let y = 0; y < off.height; y += SAMPLE_STEP) {
        for (let x = 0; x < off.width; x += SAMPLE_STEP) {
          const i = (y * off.width + x) * 4;
          const a = px[i + 3];
          if (a < ALPHA_THRESHOLD) continue;
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          const fx = dx + x;
          const fy = dy + y;
          out.push({
            rx: fx,
            ry: fy,
            x: fx,
            y: fy,
            vx: 0,
            vy: 0,
            size: 1.1 + Math.random() * 0.7,
            color: `rgba(${r}, ${g}, ${b}, 0.95)`,
          });
        }
      }
      state.particles = out;
    };

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      state.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = rect.width * state.dpr;
      canvas.height = rect.height * state.dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    setSize();

    const drawOnce = () => {
      ctx.clearRect(0, 0, state.width, state.height);
      for (const p of state.particles) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.rx, p.ry, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loaded = new Image();
    loaded.onload = () => {
      img = loaded;
      sampleFromImage(loaded);
      if (staticOnly) drawOnce();
    };
    loaded.src = LOGO_SRC;

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      setSize();
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (img) {
          sampleFromImage(img);
          if (staticOnly) drawOnce();
        }
      }, 200);
    };
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      state.mouse.x = e.clientX - rect.left;
      state.mouse.y = e.clientY - rect.top;
      state.mouse.active = true;
    };
    const onLeave = () => {
      state.mouse.active = false;
      state.mouse.x = -9999;
      state.mouse.y = -9999;
    };
    if (!staticOnly) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }

    const tick = () => {
      ctx.clearRect(0, 0, state.width, state.height);

      const radius = 110;
      const radiusSq = radius * radius;

      for (const p of state.particles) {
        if (state.mouse.active) {
          const dx = p.x - state.mouse.x;
          const dy = p.y - state.mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const force = ((radius - dist) / radius) * 2.2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (p.rx - p.x) * 0.018;
        p.vy += (p.ry - p.y) * 0.018;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (state.visible) {
        state.raf = requestAnimationFrame(tick);
      }
    };

    if (!staticOnly) {
      state.raf = requestAnimationFrame(tick);
    }

    let io: IntersectionObserver | null = null;
    if (!staticOnly && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          const wasVisible = state.visible;
          state.visible = entry.isIntersecting;
          if (state.visible && !wasVisible) {
            state.raf = requestAnimationFrame(tick);
          }
        },
        { threshold: 0, rootMargin: "100px" }
      );
      io.observe(container);
    }

    return () => {
      cancelAnimationFrame(state.raf);
      state.visible = false;
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (!staticOnly) {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
      }
      io?.disconnect();
      state.particles.length = 0;
      img = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
