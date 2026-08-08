import { Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const EXPERIENCES = [{
  role: 'Web Development Intern',
  company: 'IT GEEKS',
  date: 'Internship',
  achievements: [
    <>Built <strong className="text-foreground">responsive web pages</strong> using HTML, CSS, and Bootstrap.</>,
    <>Assisted with <strong className="text-foreground">UI debugging</strong> and page-load performance optimization.</>,
  ],
  tech: ['HTML5', 'CSS3', 'Bootstrap'],
}];

export function Experience() {
  const { ref, inView } = useInView();
  return <section id="experience" className="pt-8"><div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
    <h2 className="section-heading">Experience</h2><div className="relative"><div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/50 hidden md:block" />
      <div className="space-y-6">{EXPERIENCES.map((exp, i) => <div key={i} className="relative md:pl-10 group"><div className="absolute left-[5px] top-8 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary/50 hidden md:group-hover:border-primary md:block transition-colors duration-300" />
        <div className="gradient-border-card p-8"><div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4"><div><h3 className="text-xl font-bold text-foreground">{exp.role}</h3><div className="text-sm text-primary font-semibold mt-0.5">{exp.company}</div></div><div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 tracking-wide shrink-0"><Calendar size={12} />{exp.date}</div></div>
          <ul className="space-y-3 mb-5">{exp.achievements.map((item, j) => <li key={j} className="text-sm text-muted-foreground flex gap-3 items-start"><span className="text-primary mt-1.5 text-[8px] shrink-0">■</span><span>{item}</span></li>)}</ul>
          <div className="flex flex-wrap gap-1.5">{exp.tech.map(t => <span key={t} className="text-[10px] font-mono text-muted-foreground border border-border/50 px-2 py-0.5 rounded">{t}</span>)}</div></div></div>)}</div></div>
  </div></section>;
}
