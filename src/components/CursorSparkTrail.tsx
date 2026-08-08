import { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hueMix: number;
}

function readHSL(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parts = raw.split(/\s+/).map((v) => parseFloat(v));
  if (parts.length < 3 || parts.some(Number.isNaN)) return [27, 96, 56];
  return [parts[0], parts[1], parts[2]];
}

/**
 * Fixed full-viewport canvas that draws a faint trail of mystic embers
 * following the cursor across the whole site (not just the hero).
 * No-ops entirely on touch devices and when reduced motion is requested.
 */
export function CursorSparkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let sparks: Spark[] = [];
    let animId = 0;
    let last = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      last = { x: e.clientX, y: e.clientY };
      if (dist < 4 || sparks.length > 60) return;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.6;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.15,
        life: 0,
        maxLife: 26 + Math.random() * 18,
        size: Math.random() * 1.4 + 0.5,
        hueMix: Math.random() > 0.65 ? 1 : 0,
      });
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const [ph, ps, pl] = readHSL('--primary');
      const [ah, as_, al] = readHSL('--accent');
      const colorFor = (mix: number, alpha: number) => {
        const hh = ph + (ah - ph) * mix;
        const ss = ps + (as_ - ps) * mix;
        const ll = pl + (al - pl) * mix;
        return `hsla(${hh}, ${ss}%, ${ll}%, ${alpha})`;
      };

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.015;
        s.vx *= 0.97;
        s.vy *= 0.97;

        const t = s.life / s.maxLife;
        if (t >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        const fade = 1 - t;
        ctx.beginPath();
        ctx.shadowBlur = 8;
        ctx.shadowColor = colorFor(s.hueMix, 1);
        ctx.fillStyle = colorFor(s.hueMix, fade * 0.8);
        ctx.arc(s.x, s.y, s.size * fade + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
      sparks = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[55]"
      aria-hidden="true"
    />
  );
}
