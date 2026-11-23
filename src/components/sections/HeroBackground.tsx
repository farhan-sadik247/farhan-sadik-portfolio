'use client';

import React, { useEffect, useRef } from 'react';

const GAP = 26; // distance between dots, in CSS px
const STEPS = 8; // colour steps between the muted and the accent dot colour

function parseColor(value: string): [number, number, number] {
  const hex = value.trim().replace('#', '');
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  return [45, 212, 191];
}

/** Muted → accent colour ramp, read from the site's theme tokens. */
function buildPalette() {
  const styles = getComputedStyle(document.documentElement);
  const muted = parseColor(styles.getPropertyValue('--text-muted'));
  const accent = parseColor(styles.getPropertyValue('--primary'));
  return Array.from({ length: STEPS }, (_, i) => {
    const k = i / (STEPS - 1);
    const c = muted.map((m, j) => Math.round(m + (accent[j] - m) * k));
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  });
}

/**
 * Hero background: a field of dots rippling with a slow wave. Dots on the crests
 * grow and shift to the accent colour; the cursor gently swells the dots near it.
 * Canvas 2D, paused off-screen, a single still frame for reduced motion.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let palette = buildPalette();
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0, target: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Ease the cursor influence in and out, and follow the cursor with a slight lag.
      pointer.strength += (pointer.target - pointer.strength) * 0.06;
      pointer.x += (pointer.tx - pointer.x) * 0.15;
      pointer.y += (pointer.ty - pointer.y) * 0.15;
      const radius2 = 2 * 150 * 150;

      const offsetX = (width % GAP) / 2;
      const offsetY = (height % GAP) / 2;
      for (let x = offsetX; x <= width; x += GAP) {
        for (let y = offsetY; y <= height; y += GAP) {
          // Two slow interfering waves give an organic, non-repeating ripple (0..1).
          const wave =
            (Math.sin(x * 0.011 + t * 0.55) * Math.cos(y * 0.014 - t * 0.4) +
              Math.sin((x + y) * 0.006 - t * 0.3)) /
              4 +
            0.5;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const near = pointer.strength * Math.exp(-(dx * dx + dy * dy) / radius2);

          const glow = Math.min(1, Math.max(0, (wave - 0.55) * 1.8) + near);
          ctx.globalAlpha = 0.14 + wave * 0.22 + near * 0.55;
          ctx.fillStyle = palette[Math.round(glow * (STEPS - 1))];
          ctx.beginPath();
          ctx.arc(x, y, 0.7 + wave * 0.8 + near * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible ? requestAnimationFrame(loop) : 0;
    };
    const startLoop = () => {
      if (!frame && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) draw(start);
    else startLoop();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(start);
    });
    ro.observe(canvas);

    // Pause while the hero is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
    });
    io.observe(canvas);

    // Re-read colours when the theme switches.
    const mo = new MutationObserver(() => {
      palette = buildPalette();
      if (reduceMotion) draw(start);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      pointer.target = inside ? 1 : 0;
      if (!inside) return;
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (pointer.x < -1000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.target = 0;
    };
    if (finePointer && !reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full mask-[radial-gradient(ellipse_85%_75%_at_50%_45%,#000_40%,transparent_100%)]"
      />
      {/* Soft glows drawn with radial gradients: same look as a large blur() filter,
          but far cheaper to paint on slow devices. */}
      <div className="hero-glow-a absolute left-[-20%] top-[-30vh] w-[60vw] h-[80vh] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--primary)_14%,transparent),transparent)]" />
      <div className="hero-glow-b absolute right-[-20%] top-[45vh] w-[60vw] h-[80vh] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--secondary)_16%,transparent),transparent)]" />
    </div>
  );
}
