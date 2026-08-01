import { Mail, ArrowUp, Code2 } from 'lucide-react';

function GitHubIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.15-3.8s-1.13-.36-3.7 1.36a13.3 13.3 0 0 0-7 0C6.13 2 5 2.36 5 2.36a5.5 5.5 0 0 0-.15 3.8A5.5 5.5 0 0 0 3 10.04c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
    </svg>
  );
}

function LinkedInIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FooterLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      aria-label={label}
    >
      <span className="group-hover:text-primary transition-colors" aria-hidden="true">
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative mt-24 border-t border-border/50">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="w-full px-6 md:px-12 py-20 flex flex-col items-center text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Code2 size={24} className="text-primary" aria-hidden="true" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Let's build something
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
            I build production AI systems. If you have an interesting problem where AI is the right tool — let's talk.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href="mailto:pvgreddy3@gmail.com"
            className="premium-btn-primary group"
          >
            <Mail size={16} aria-hidden="true" />
            Get in touch
            <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
          </a>
          <a
            href="https://www.linkedin.com/in/venu-gopal-reddy-palugulla-4948b8258"
            target="_blank"
            rel="noreferrer"
            className="premium-btn-outline"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
        </div>

        {/* Social links row */}
        <div className="flex items-center gap-8 mb-8">
          <FooterLink href="https://github.com/venu0807" icon={<GitHubIcon size={18} />} label="GitHub" />
          <FooterLink href="https://www.linkedin.com/in/venu-gopal-reddy-palugulla-4948b8258" icon={<LinkedInIcon size={18} />} label="LinkedIn" />
          <FooterLink href="mailto:pvgreddy3@gmail.com" icon={<Mail size={18} />} label="Email" />
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between w-full max-w-md pt-6 border-t border-border/30">
          <div className="text-xs text-muted-foreground/70 font-medium tracking-wide">
            &copy; 2026 Venu Gopal Reddy
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-primary transition-colors font-medium"
            aria-label="Scroll to top"
          >
            Back to top
            <ArrowUp size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
