import { useState, useEffect, useRef } from 'react';
import { ParticlesField } from './ParticlesField';
import { HeroScene3D } from './HeroScene3D';
import { PortalRing } from './PortalRing';
import { useInView } from '../hooks/useInView';

const TAGLINES = [
  'MCA Student — AI & ML',
  'Aspiring Software Developer',
  'Machine Learning Enthusiast',
  'Web Developer',
];

function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView();
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="bg-card border border-border/50 rounded-xl px-6 py-7 text-center hover:border-primary/30 transition-all duration-300">
      <div className="font-mono text-3xl font-bold text-foreground mb-1 tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground tracking-wide font-medium">{label}</div>
    </div>
  );
}

function MagneticButton({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      const maxDist = 100;
      const strength = Math.min(dist / maxDist, 1);
      el.style.transform = `translate(${x * 0.15 * strength}px, ${y * 0.15 * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const cls = primary
    ? 'premium-btn-primary'
    : 'premium-btn-outline';

  return (
    <a ref={ref} href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  );
}

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => {
        setPause(false);
        setDeleting(true);
      }, 2000);
      return () => clearTimeout(t);
    }

    const current = TAGLINES[index];
    const speed = deleting ? 30 : 50;

    if (!deleting && char < current.length) {
      const t = setTimeout(() => setChar(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && char >= current.length) {
      setPause(true);
      return;
    }
    if (deleting && char > 0) {
      const t = setTimeout(() => setChar(c => c - 1), speed);
      return () => clearTimeout(t);
    }
    if (deleting && char <= 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TAGLINES.length);
      return;
    }
  }, [char, deleting, index, pause]);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return <>{TAGLINES[0]}</>;
  }

  return (
    <span className="typewriter-cursor">
      {TAGLINES[index].slice(0, char)}
    </span>
  );
}

export function Hero() {
  const { ref: scrollRef } = useInView();

  return (
    <section id="hero" className="cinematic-hero relative min-h-screen flex flex-col overflow-hidden">
      {/* Particle field background */}
      <HeroScene3D />
      <ParticlesField />

      <div className="hero-scanlines" aria-hidden="true" />
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pt-24 pb-16">
        <div className="reveal in-view">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-12 mb-16">
            {/* Profile with portal-ring mandala + glow */}
            <div className="relative shrink-0 profile-reactor portal-flash" style={{ animationDelay: '100ms' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-primary rounded-full blur-3xl glow-pulse" />
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary via-accent to-primary rounded-full opacity-60 glow-pulse" />
              <PortalRing />
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-1 bg-background shadow-2xl glow-purple">
                <img
                  src="/profile.jpeg"
                  alt="Arpit Nigam"
                  width="256"
                  height="256"
                  loading="eager"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Heading area */}
            <div className="flex-1 text-center md:text-left">
              <div className="hero-kicker text-muted-foreground mb-4 font-medium text-sm tracking-wide" style={{ animationDelay: '200ms' }}>
                <span className="hero-kicker-dot" /> AVAILABLE FOR OPPORTUNITIES &nbsp; / &nbsp; HI, I'M <span className="text-primary font-semibold">ARPIT NIGAM</span>
              </div>

              <h1 className="cinematic-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-3">
                <span className="gradient-text">Learn. Build. Innovate.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl min-h-[2.5rem]">
                <TypewriterText />
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                  MCA Student
                </span>
                <span className="px-4 py-1.5 rounded-full border border-border/50 bg-muted/50 text-sm font-medium text-foreground">
                  AI/ML Enthusiast
                </span>
                <span className="px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-sm font-medium text-foreground flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 fill-yellow-500" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  97% Spam Detection Accuracy
                </span>
              </div>

              {/* CTAs — magnetic hover */}
              <div className="flex flex-wrap gap-4 mt-10">
                <MagneticButton href="mailto:arpitnigam029@gmail.com" primary>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.15-3.8s-1.13-.36-3.7 1.36a13.3 13.3 0 0 0-7 0C6.13 2 5 2.36 5 2.36a5.5 5.5 0 0 0-.15 3.8A5.5 5.5 0 0 0 3 10.04c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4" /></svg>
                  Email Me
                </MagneticButton>
                <MagneticButton href="tel:+919399558034">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  Call Me
                </MagneticButton>
                <MagneticButton href="#systems">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                  View Projects
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Animated stat counters */}
          <div ref={scrollRef} className="hero-stats border-t border-border/50 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <AnimatedStat value={97} label="Spam Detection Accuracy" suffix="%" />
              <AnimatedStat value={3} label="Featured Projects" />
              <AnimatedStat value={61} label="Java Course Completed" suffix="h" />
              <AnimatedStat value={2} label="ML Detection Systems" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-[bounce-chevron_2s_ease-in-out_infinite]"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
