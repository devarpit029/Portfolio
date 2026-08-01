import { ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export function Certifications() {
  const { ref, inView } = useInView();
  const certifications = [
    {
      title: "Full Stack Java Developer Program",
      link: "https://drive.google.com/file/d/1ZVFwlRAh3_I4M5uSibgwYRN9qZ2K-_9M/view?usp=sharing",
      issuer: "Wipro",
      date: "July 2025 – Oct 2025",
      description: "Enterprise curriculum covering Java, Object-Oriented Programming, Data Structures, SQL, and scalable API design with emphasis on algorithms and system architecture."
    },
    {
      title: "Full Stack Python Developer Program",
      link: "https://drive.google.com/file/d/1CS81JFPO8L9vSmByeIGmTdETCP0P4K7V/view?usp=sharing",
      issuer: "Besant Technologies",
      date: "2023 – 2024",
      description: "Completed 400+ hours of project-based training in Python, Django, Django REST Framework, React.js, and MySQL. Delivered 5+ full-stack applications integrating machine learning models with production-ready backend APIs and responsive frontends."
    }
  ];

  return (
    <section id="certifications" className="pt-8">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="section-heading">Certifications</h2>

        <div className="space-y-6">
          {certifications.map((cert, i) => (
            <div key={i} className="gradient-border-card p-8">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                <div>
                  <a href={cert.link || "#"} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 transition-colors">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{cert.title}</h3>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                  </a>
                  <div className="text-sm font-semibold text-primary mt-1">{cert.issuer}</div>
                </div>
                <div className="text-xs font-medium text-muted-foreground/80 tracking-wide shrink-0">
                  {cert.date}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
