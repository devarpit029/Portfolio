import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'systems', label: 'Projects' },
  { id: 'stack', label: 'Skills & Stack' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState('experience');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the sidebar when at the top "Overview" / Hero section
      setIsVisible(window.scrollY > 400);

      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));

      // Check if scrolled to bottom
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 200) {
        setActiveSection(NAV_ITEMS[NAV_ITEMS.length - 1].id);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // Trigger when the top of the section enters the viewport (with a 100px buffer)
          if (rect.top <= window.innerHeight - 100) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`hidden md:flex flex-col gap-8 fixed left-[82px] top-32 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center gap-4 text-xs font-medium group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm ${
              isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {/* The dot — glows and radar-pings when active */}
            <div
              className={`relative w-3 h-3 rounded-full border-2 transition-colors z-10 ${
                isActive
                  ? 'bg-primary border-primary nav-ping shadow-[0_0_10px_hsl(var(--primary))]'
                  : 'bg-background border-border group-hover:border-primary'
              }`}
            />
            {/* The label */}
            <span className="bg-background/80 px-1 backdrop-blur-sm rounded whitespace-nowrap">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}
