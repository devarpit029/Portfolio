import { Code2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SYSTEMS = [
  { name: 'Real-Time Sign Language Detection', status: 'ML', statusColor: 'text-primary bg-primary/10', description: 'Real-time hand-gesture recognition system that improves communication accessibility for hearing-impaired users.', architecture: 'Python + MediaPipe + OpenCV + ML', stack: ['Python', 'MediaPipe', 'OpenCV', 'Machine Learning'] },
  { name: 'Email & SMS Spam Detection', status: '97% Accuracy', statusColor: 'text-green-500 bg-green-500/10', description: 'Spam-classification model using TF-IDF and Naive Bayes, with Logistic Regression and SVM used for comparison.', architecture: 'Python + Scikit-learn + NLP', stack: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF', 'Naive Bayes'] },
  { name: 'Bus Transport Management System', status: 'Java', statusColor: 'text-cyan-500 bg-cyan-500/10', description: 'Database-driven application for buses, routes, schedules, seat booking, and fare calculation.', architecture: 'Java + MySQL', stack: ['Java', 'MySQL', 'SQL', 'Database Design'] },
];

export function Projects() {
  const { ref, inView } = useInView();
  return <section id="systems" className="pt-8"><div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}><h2 className="section-heading">Projects</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{SYSTEMS.map(sys => <div key={sys.name} className="gradient-border-card p-8 flex flex-col h-full"><div className="flex justify-between items-start mb-5"><h3 className="text-xl font-bold text-foreground">{sys.name}</h3><span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${sys.statusColor} shrink-0 ml-3`}>{sys.status}</span></div><p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">{sys.description}</p><div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 font-mono"><Code2 size={12} className="text-primary" />{sys.architecture}</div><div className="pt-5 border-t border-border/50"><div className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground mb-3">Stack</div><div className="flex flex-wrap gap-1.5">{sys.stack.map(tech => <span key={tech} className="text-[10px] font-mono text-foreground border border-border/50 px-2 py-1 rounded bg-muted/30">{tech}</span>)}</div></div></div>)}</div></div></section>;
}
