import React, { useEffect, useState } from 'react';
import { BrandIcon } from './BrandIcon';

interface StartupAnimationProps {
  onComplete: () => void;
}

export const StartupAnimation: React.FC<StartupAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const startTime = Date.now();
    const duration = 1400; // 1.4 seconds smooth sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(current);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#14263A] text-white select-none transition-opacity duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center animate-fade-in">
        {/* Animated Brand Icon */}
        <div className="relative mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
          <BrandIcon size={72} />
          {/* Subtle pulse ring */}
          <div 
            className="absolute inset-0 rounded-2xl border border-[#087F79] opacity-40 animate-ping pointer-events-none" 
            style={{ animationDuration: '2s' }}
          />
        </div>

        {/* Brand identity */}
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5 flex items-center gap-2">
          Jomi Guard <span className="text-[#087F79] font-extrabold">Pro</span>
        </h1>
        
        <p className="text-xs uppercase tracking-[0.25em] text-[#D6DEE7]/70 font-semibold mb-8">
          Government Technology
        </p>

        {/* Precision Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-[#087F79] to-[#0A9891] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[11px] text-[#D6DEE7]/50 font-mono tracking-wider">
          Loading workspace...
        </span>
      </div>
    </div>
  );
};
