import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hueMix: number; // 0 = primary (orange), 1 = accent (cyan)
}

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

/** Reads an `H S% L%` custom property off the document root and returns [h, s, l]. */
function readHSL(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parts = raw.split(/\s+/).map((v) => parseFloat(v));
  if (parts.length < 3 || parts.some(Number.isNaN)) return [27, 96, 56];
  return [parts[0], parts[1], parts[2]];
}

export function ParticlesField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, moved: false });
  const particlesRef = useRef<Particle[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const PARTICLE_COUNT = 70;
    const CONNECT_DIST = 118;
    const MOUSE_RADIUS = 160;

    const init = () => {
      const w = canvas.width;
      const h = canvas.height;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.25,
        hueMix: Math.random() > 0.72 ? 1 : 0, // mostly mystic-orange, some cyan
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const spawnSpark = (x: number, y: number) => {
      if (sparksRef.current.length > 90) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 1.8;
      sparksRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        life: 0,
        maxLife: 30 + Math.random() * 25,
        size: Math.random() * 1.6 + 0.6,
        hueMix: Math.random() > 0.6 ? 1 : 0,
      });
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const [ph, ps, pl] = readHSL('--primary');
      const [ah, as_, al] = readHSL('--accent');
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      const colorFor = (mix: number, alpha: number) => {
        const h = ph + (ah - ph) * mix;
        const s = ps + (as_ - ps) * mix;
        const l = pl + (al - pl) * mix;
        return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
      };

      /* Occasionally spawn a spark trailing the cursor */
      if (mouse.moved && Math.random() < 0.55) {
        spawnSpark(mouse.x + (Math.random() - 0.5) * 6, mouse.y + (Math.random() - 0.5) * 6);
      }

      particles.forEach(p => {
        /* Mouse repel — pushes the energy field away like a hand parting mist */
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.8;
          p.vy += (dy / dist) * force * 0.8;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      });

      /* Web-strand connections between nearby embers */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.16;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = colorFor((a.hueMix + b.hueMix) / 2, alpha);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* Draw embers with soft glow */
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.shadowBlur = 6;
        ctx.shadowColor = colorFor(p.hueMix, 0.9);
        ctx.fillStyle = colorFor(p.hueMix, p.alpha);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      /* Draw + advance cursor sparks */
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02; // slight gravity drift
        s.vx *= 0.97;
        s.vy *= 0.97;

        const t = s.life / s.maxLife;
        if (t >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        const fade = 1 - t;
        ctx.beginPath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = colorFor(s.hueMix, 1);
        ctx.fillStyle = colorFor(s.hueMix, fade);
        ctx.arc(s.x, s.y, s.size * fade + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      animRef.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, moved: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, moved: false };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
      aria-hidden="true"
    />
  );
}
