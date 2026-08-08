/**
 * Summoning-circle style ring for the hero profile photo — dashed rune ticks
 * on a rotating ring, with small orbiting sparks. Pure CSS-driven rotation
 * (via .rune-ring / .rune-ring-reverse) so it respects prefers-reduced-motion.
 */
export function PortalRing() {
  const ticks = Array.from({ length: 24 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity=".25" />
        </radialGradient>
      </defs>

      {/* outer rune circle — orange, slow rotation */}
      <g className="rune-ring" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="100" cy="100" r="92" fill="none" stroke="hsl(var(--primary))" strokeOpacity=".35" strokeWidth="0.6" />
        {ticks.map((i) => {
          const angle = (i / ticks.length) * Math.PI * 2;
          const long = i % 3 === 0;
          const r1 = 92;
          const r2 = long ? 86 : 88.5;
          const x1 = 100 + r1 * Math.cos(angle);
          const y1 = 100 + r1 * Math.sin(angle);
          const x2 = 100 + r2 * Math.cos(angle);
          const y2 = 100 + r2 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(var(--primary))"
              strokeWidth={long ? 1 : 0.5}
              strokeOpacity={long ? 0.75 : 0.4}
              className="rune-tick"
            />
          );
        })}
      </g>

      {/* inner mandala circle — cyan, reverse rotation */}
      <g className="rune-ring-reverse" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="100" cy="100" r="78" fill="none" stroke="hsl(var(--accent))" strokeOpacity=".4" strokeWidth="0.5" strokeDasharray="1 5" />
        <circle cx="100" cy="22" r="1.6" fill="hsl(var(--accent))" className="rune-spark" style={{ filter: 'drop-shadow(0 0 4px hsl(var(--accent)))' }} />
        <circle cx="178" cy="100" r="1.1" fill="hsl(var(--primary))" className="rune-spark" style={{ animationDelay: '.6s', filter: 'drop-shadow(0 0 4px hsl(var(--primary)))' }} />
        <circle cx="100" cy="178" r="1.3" fill="hsl(var(--accent))" className="rune-spark" style={{ animationDelay: '1.2s', filter: 'drop-shadow(0 0 4px hsl(var(--accent)))' }} />
      </g>

      <circle cx="100" cy="100" r="96" fill="url(#portalGlow)" />
    </svg>
  );
}
