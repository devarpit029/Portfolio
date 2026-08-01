import { useRef, useState } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SYSTEMS = [
  {
    name: 'PicScore — AI Face Rating',
    link: 'https://github.com/venu0807/picscore',
    status: 'Live',
    statusColor: 'text-primary bg-primary/10',
    description: 'Geometric facial analysis SaaS. MediaPipe face mesh + pure TS scoring. Zero ML bias, client-side privacy, Stripe monetization.',
    architecture: 'Next.js + Supabase + MediaPipe',
    stack: ['Next.js', 'TypeScript', 'MediaPipe', 'Supabase', 'Tailwind'],
  },
  {
    name: 'RoastMyCV — AI Resume Reviewer',
    link: 'https://github.com/venu0807/roastmycv',
    status: 'Live',
    statusColor: 'text-primary bg-primary/10',
    description: 'Brutal resume roasting by Llama-3.1-70B via Groq. Parse PDF/DOCX → extract sections → AI roast in under 30s.',
    architecture: 'Next.js + Groq LLM + pdf-parse',
    stack: ['Next.js', 'Groq', 'Llama-3.1', 'pdf-parse', 'Supabase'],
  },
  {
    name: 'Jarvis — Job Automation Pipeline',
    link: 'https://github.com/venu0807/jarvis',
    status: 'In Production',
    statusColor: 'text-green-500 bg-green-500/10',
    description: 'AI-powered automation suite applying to 8 Indian job portals simultaneously. Auto-resume tailoring via local Ollama. Daily email reports.',
    architecture: 'Playwright + Ollama + LaTeX',
    stack: ['Python', 'Playwright', 'Ollama', 'LaTeX', 'SMTP'],
  },
  {
    name: 'Movie Recommender System',
    link: 'https://github.com/venu0807/Recommendation_System',
    status: '334 Tests',
    statusColor: 'text-cyan-500 bg-cyan-500/10',
    description: 'Hybrid movie recommendation engine with collaborative filtering + content-based filtering. Django backend, TMDB integration.',
    architecture: 'Django + REST + scikit-learn',
    stack: ['Python', 'Django', 'scikit-learn', 'Pandas', 'PostgreSQL'],
  },
  {
    name: 'SafeguardAI — On-Device Safety',
    link: 'https://github.com/venu0807/SafeguardAI',
    status: '89% Accuracy',
    statusColor: 'text-yellow-500 bg-yellow-500/10',
    description: 'Mobile-first violent content detection CNN. TensorFlow Lite on Android with MediaPipe face preprocessing. All inference on-device.',
    architecture: 'CNN + TFLite + Android',
    stack: ['Python', 'TensorFlow', 'Android', 'MediaPipe', 'Keras'],
  },
  {
    name: 'Automation QA Framework',
    link: 'https://github.com/venu0807/Automation---QA-Developer',
    status: 'Open Source',
    statusColor: 'text-cyan-500 bg-cyan-500/10',
    description: 'End-to-end testing pipelines ensuring high software quality. Scalable test suites validating complex UI interactions.',
    architecture: 'Cypress + E2E Testing',
    stack: ['JavaScript', 'Cypress', 'QA', 'n8n'],
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: `${-x * 20}px ${-y * 20}px 40px -12px hsl(var(--primary) / 0.15), 0 8px 32px -8px hsl(var(--foreground) / 0.1)`,
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)',
      transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out',
      boxShadow: 'none',
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
    >
      {children}
    </div>
  );
}

export function Projects() {
  const { ref, inView } = useInView();

  return (
    <section id="systems" className="pt-8">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="section-heading">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SYSTEMS.map((sys, i) => (
            <TiltCard key={i}>
              <div className="gradient-border-card p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-5">
                  <a href={sys.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 transition-colors">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{sys.name}</h3>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" aria-hidden="true" />
                  </a>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${sys.statusColor} shrink-0 ml-3`}>
                    {sys.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                  {sys.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 font-mono">
                  <Code2 size={12} className="text-primary" aria-hidden="true" />
                  {sys.architecture}
                </div>

                <div className="pt-5 border-t border-border/50">
                  <div className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground mb-3">
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sys.stack.map((tech, j) => (
                      <span key={j} className="text-[10px] font-mono text-foreground border border-border/50 px-2 py-1 rounded bg-muted/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
