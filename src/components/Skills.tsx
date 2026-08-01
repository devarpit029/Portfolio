import { Globe, Code2, BrainCircuit, Database, Rocket, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SOFT_SKILLS = [
  'Communication',
  'Leadership',
  'Systems Thinking',
  'Rapid Prototyping',
  'Data-Driven Decisions',
];

const TECH_STACK = [
  {
    title: 'AI / LLM',
    icon: <BrainCircuit size={16} />,
    skills: [
      { name: 'Groq SDK', color: 'text-cyan-500' },
      { name: 'Llama-3.1', color: 'text-purple-500' },
      { name: 'Ollama', color: 'text-emerald-500' },
      { name: 'MediaPipe', color: 'text-green-500' },
      { name: 'TensorFlow', color: 'text-orange-500' },
      { name: 'Scikit-learn', color: 'text-orange-600' },
    ],
  },
  {
    title: 'DEV',
    icon: <Code2 size={16} />,
    skills: [
      { name: 'Next.js', color: 'text-cyan-400' },
      { name: 'TypeScript', color: 'text-blue-500' },
      { name: 'React.js', color: 'text-cyan-400' },
      { name: 'Python', color: 'text-yellow-400' },
      { name: 'Tailwind CSS', color: 'text-cyan-500' },
      { name: 'Playwright', color: 'text-green-500' },
    ],
  },
  {
    title: 'DATABASES',
    icon: <Database size={16} />,
    skills: [
      { name: 'Supabase', color: 'text-green-400' },
      { name: 'PostgreSQL', color: 'text-blue-500' },
      { name: 'SQL', color: 'text-gray-400' },
    ],
  },
  {
    title: 'INFRA & OPS',
    icon: <Rocket size={16} />,
    skills: [
      { name: 'Vercel', color: 'text-red-500' },
      { name: 'On-Device AI', color: 'text-emerald-500' },
      { name: 'Git/GitHub', color: 'text-orange-500' },
      { name: 'REST APIs', color: 'text-blue-500' },
    ],
  },
];

function SkillBadge({ name, color }: { name: string; color: string }) {
  return (
    <span className="px-3 py-1.5 bg-muted/40 border border-border/50 rounded-full text-[13px] flex items-center gap-2 font-medium transition-all duration-200 hover:border-primary/30 hover:bg-primary/5">
      <span className={`w-1.5 h-1.5 rounded-full ${color || 'bg-primary'}`} />
      {name}
    </span>
  );
}

function SkillCategory({ title, icon, skills, index }: {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; color: string }[];
  index: number;
}) {
  const { ref, inView } = useInView();
  const delay = index * 100;

  return (
    <div
      ref={ref}
      className="card-3d-depth gradient-border-card p-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) perspective(800px) rotateX(1deg)' : 'translateY(30px) perspective(800px) rotateX(3deg)',
        transition: `opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 bg-primary/10 rounded-lg text-primary" aria-hidden="true">
          {icon}
        </div>
        <h3 className="font-bold text-foreground uppercase tracking-wider text-sm">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, j) => (
          <SkillBadge key={j} name={skill.name} color={skill.color} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const { ref: sectionRef, inView: sectionInView } = useInView();

  return (
    <section id="stack" className="pt-12">
      <div ref={sectionRef} className={`reveal ${sectionInView ? 'in-view' : ''}`}>
        <h2 className="section-heading">Skills</h2>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          <div className="w-full md:w-56 shrink-0">
            <div className="flex items-center gap-3 text-xl font-bold text-foreground mb-10">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="text-primary" size={20} aria-hidden="true" />
              </div>
              Profile
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-2 font-bold text-foreground mb-6">
                <Globe size={16} className="text-primary" aria-hidden="true" />
                Languages
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg border border-border/30">
                  <span className="text-foreground font-medium">Telugu</span>
                  <span className="text-primary font-medium text-xs uppercase tracking-wide">Native</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg border border-border/30">
                  <span className="text-foreground font-medium">English</span>
                  <span className="text-muted-foreground text-xs">Professional</span>
                </div>
              </div>
            </div>

            <div>
              <div className="font-bold text-foreground mb-6">
                Soft Skills
              </div>
              <div className="flex flex-col gap-2.5 items-start">
                {SOFT_SKILLS.map((skill, i) => (
                  <span key={i} className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[13px] font-medium hover:bg-primary/15 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="font-bold text-foreground mb-8 text-lg">
              Tech Stack
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TECH_STACK.map((col, i) => (
                <SkillCategory key={i} title={col.title} icon={col.icon} skills={col.skills} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
