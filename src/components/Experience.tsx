import { ExternalLink, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const EXPERIENCES = [
  {
    role: 'Full Stack Developer — PicScore',
    link: 'https://github.com/venu0807/picscore',
    company: 'Geometric Face Analysis SaaS',
    date: '2026 — Present',
    achievements: [
      <><strong className="text-foreground">Built production Next.js SaaS</strong> with MediaPipe face mesh + pure-TS geometric scoring.</>,
      <><strong className="text-foreground">Client-side privacy-first architecture</strong> — all CV runs in browser, image uploaded only after consent.</>,
      <><strong className="text-foreground">Supabase auth + daily limits + Stripe-ready</strong> monetization pipeline.</>,
    ],
    tech: ['Next.js', 'TypeScript', 'MediaPipe', 'Supabase', 'Stripe'],
  },
  {
    role: 'AI Developer — RoastMyCV',
    link: 'https://github.com/venu0807/roastmycv',
    company: 'AI Resume Review Platform',
    date: '2026 — Present',
    achievements: [
      <><strong className="text-foreground">Integrated Groq Llama-3.1-70B</strong> for structured resume roasting with JSON output.</>,
      <><strong className="text-foreground">PDF/DOCX parsing pipeline</strong> with heuristic section extraction + AI roast generation in under 30s.</>,
      <><strong className="text-foreground">Free tier + Pro subscription model</strong> with Supabase auth and rate limiting.</>,
    ],
    tech: ['Next.js', 'Groq', 'Llama-3.1', 'pdf-parse', 'Supabase'],
  },
  {
    role: 'AI Developer — Threat Detection',
    link: 'https://github.com/venu0807/Realtime_Threat_Detection',
    company: 'Audio Triggered Threat Detection',
    date: '2025 — Present',
    achievements: [
      <><strong className="text-foreground">Achieved sub-100ms on-device inference</strong> for real-time analysis.</>,
      <><strong className="text-foreground">Sustained 24/7 operation with &lt;5% battery drain</strong> through optimized architecture.</>,
    ],
    tech: ['Python', 'TensorFlow', 'Android', 'MediaPipe', 'Keras'],
  },
  {
    role: 'Full Stack Python Developer',
    link: 'https://github.com/venu0807/Recommendation_System',
    company: 'Movie Recommendation Platform',
    date: '2024 — 2025',
    achievements: [
      <><strong className="text-foreground">Reduced query latency by 60%</strong> through ORM optimization.</>,
      <><strong className="text-foreground">Designed highly scalable schema managing 10,000+ records</strong> efficiently.</>,
    ],
    tech: ['Python', 'Django', 'scikit-learn', 'Pandas', 'PostgreSQL'],
  },
];

export function Experience() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="pt-8">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="section-heading">Experience</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/50 hidden md:block" />

          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative md:pl-10 group">
                {/* Timeline dot */}
                <div className="absolute left-[5px] top-8 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary/50 hidden md:group-hover:border-primary md:block transition-colors duration-300" />

                <div className="gradient-border-card p-8">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                    <div>
                      <a href={exp.link} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-2 transition-colors">
                        <h3 className="text-xl font-bold text-foreground group-hover/link:text-primary transition-colors">{exp.role}</h3>
                        <ExternalLink size={16} className="text-muted-foreground group-hover/link:text-primary transition-colors shrink-0" aria-hidden="true" />
                      </a>
                      <div className="text-sm text-primary font-semibold mt-0.5">{exp.company}</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 tracking-wide shrink-0">
                      <Calendar size={12} aria-hidden="true" />
                      {exp.date}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-5">
                    {exp.achievements.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-3 items-start">
                        <span className="text-primary mt-1.5 text-[8px] shrink-0" aria-hidden="true">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t, j) => (
                      <span key={j} className="text-[10px] font-mono text-muted-foreground border border-border/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
