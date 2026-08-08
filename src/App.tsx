import { lazy, Suspense, useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { SidebarNav } from './components/SidebarNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CursorSparkTrail } from './components/CursorSparkTrail';

const Hero = lazy(() => import('./components/Hero').then(m => ({ default: m.Hero })));
const Experience = lazy(() => import('./components/Experience').then(m => ({ default: m.Experience })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const Skills = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })));
const Certifications = lazy(() => import('./components/Certifications').then(m => ({ default: m.Certifications })));
const Education = lazy(() => import('./components/Education').then(m => ({ default: m.Education })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function SectionFallback() {
  return <div className="h-64 animate-pulse bg-muted/30 rounded-lg" />;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-border/30">
      <div
        className="h-full transition-transform duration-150 ease-out origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
          boxShadow: '0 0 10px hsl(var(--primary) / .7)',
        }}
      />
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    const hasClass = document.documentElement.classList.contains('dark');
    if (!hasClass) document.documentElement.classList.add('dark');
    return true;
  });

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    setIsDark(next);
  };

  return (
    <ErrorBoundary>
      <div className="cinematic-shell min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden flex flex-col transition-colors duration-300">

        <ScrollProgress />
        <CursorSparkTrail />

        {/* Glass navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav command-nav px-6 md:px-12 py-4 flex items-center justify-between transition-colors duration-300">
          <a href="#hero" className="font-display font-bold text-sm tracking-tight text-foreground hover:text-primary transition-colors">
            <span className="text-primary">A</span>RPIT<span className="text-primary">.</span>DEV
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 border border-border bg-background/80 rounded-full hover:bg-muted hover:border-foreground/30 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun size={15} className="text-foreground" /> : <Moon size={15} className="text-foreground" />}
            </button>
          </div>
        </nav>

        {/* Main Layout */}
        <div id="main-content" className="flex-1 w-full px-6 md:px-12 relative flex">
          <SidebarNav />

          {/* Main Content Area */}
          <main className="w-full md:pl-48 pt-24 pb-16 space-y-24 md:space-y-36">
            <Suspense fallback={<SectionFallback />}>
              <Hero />
              <Experience />
              <Projects />
              <Skills />
              <Certifications />
              <Education />
            </Suspense>
          </main>
        </div>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
