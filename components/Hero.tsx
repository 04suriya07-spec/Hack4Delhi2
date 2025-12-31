
import React, { useEffect, useState } from 'react';
import { ArrowRight, Activity, ChevronDown } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600 opacity-10 dark:opacity-5 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-red-600 opacity-10 dark:opacity-5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
        
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-[var(--text-primary)] opacity-5 rounded-full blur-2xl animate-pulse"
            style={{
              width: Math.random() * 80 + 20 + 'px',
              height: Math.random() * 80 + 20 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 4 + 4) + 's',
              animationDelay: (Math.random() * 5) + 's'
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl text-center z-10">
        <div 
          className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-98'}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-xl text-[var(--text-secondary)]">
            <Activity size={12} className="text-red-500" />
            Live Intelligence Network
          </span>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent leading-[0.95] px-4 opacity-90">
            Breathe Better <br />Delhi.
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Real-time ward-level precision mapping of Delhi’s atmosphere. Designed for transparency, built for action.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="group relative px-10 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl">
              <span className="relative z-10 flex items-center gap-2">
                Explore Wards
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button className="px-10 py-4 rounded-full glass border-[var(--card-border)] hover:border-opacity-30 transition-all text-[var(--text-primary)] text-opacity-80 hover:bg-[var(--text-primary)] hover:bg-opacity-5">
              Submit Report
            </button>
          </div>
        </div>

        {/* City Stats Ring with Counter */}
        <div className={`mt-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block group">
             <svg className="w-56 h-56 transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-[var(--text-primary)] opacity-5"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={628}
                  strokeDashoffset={628 - (628 * 0.68)}
                  strokeLinecap="round"
                  className="text-orange-500 text-opacity-80 transition-all duration-[2500ms] ease-out-expo"
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatedCounter value={342} className="text-6xl font-light tracking-tighter text-[var(--text-primary)]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)] font-bold mt-2">City Average</span>
             </div>
             
             {/* Micro interaction glow */}
             <div className="absolute inset-0 bg-orange-500 bg-opacity-5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
         <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">Discover</span>
         <ChevronDown size={16} className="text-[var(--text-secondary)]" />
      </div>
    </section>
  );
};
