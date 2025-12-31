
import React, { useEffect, useState } from 'react';
import { ArrowRight, Activity, ChevronDown, MapPin, Search } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { Character } from './Character';
import { WeatherWidget } from './WeatherWidget';

interface HeroProps {
  moodColor: string;
  avgAqi: number;
  onSearch: (term: string) => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ moodColor, avgAqi, onSearch, onExplore }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Background Atmosphere */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] blur-[180px] opacity-[0.1] dark:opacity-[0.15] rounded-full animate-breath pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: moodColor }}
      />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Stats & Weather */}
        <div className="lg:col-span-4 order-2 lg:order-1 space-y-6">
           <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <WeatherWidget />
           </div>
           
           <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
             <div className="glass p-6 rounded-[2rem] border-orange-500/20 bg-orange-500/5">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                      <Activity size={16} />
                   </div>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Delhi Average</h4>
                </div>
                <div className="flex items-baseline gap-4">
                   <AnimatedCounter value={avgAqi} className="text-6xl font-light tracking-tighter" style={{ color: moodColor }} />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Hazard Level</span>
                      <span className="text-sm font-bold" style={{ color: moodColor }}>VERY POOR</span>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Center Character & Title */}
        <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center text-center">
           <div className={`transition-all duration-1000 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <Character aqi={avgAqi} />
           </div>
           
           <div className={`mt-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-current to-current/60 bg-clip-text text-transparent leading-[0.95]" style={{ color: 'rgb(var(--text-primary-rgb))' }}>
                Breathe <br />Better Delhi.
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                  onClick={onExplore}
                  className="px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                 >
                   Explore All 272 Wards <ArrowRight size={18} />
                 </button>
              </div>
           </div>
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-4 order-3 space-y-6">
           <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="glass p-8 rounded-[2rem] border-green-500/20 bg-green-500/5">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-green-500">Eco Leaderboard</h4>
                   <span className="text-[10px] font-bold text-green-500">WEEK 42</span>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xs">1</div>
                         <span className="text-sm font-semibold">Chanakyapuri</span>
                      </div>
                      <span className="text-xs font-bold text-green-500">45 AQI</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-xs">2</div>
                         <span className="text-sm font-semibold">Vasant Kunj</span>
                      </div>
                      <span className="text-xs font-bold text-green-500">120 AQI</span>
                   </div>
                </div>
                <button 
                  onClick={onExplore}
                  className="w-full mt-6 py-3 rounded-xl border border-green-500/20 text-[10px] font-bold uppercase tracking-widest text-green-500 hover:bg-green-500/5 transition-all"
                >
                  View Full Rankings
                </button>
              </div>
           </div>

           <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="glass p-8 rounded-[2rem] border-red-500/20 bg-red-500/5">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-500">Active Hotspot</h4>
                    <div className="flex gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                       <span className="text-[10px] font-bold text-red-500">LIVE</span>
                    </div>
                 </div>
                 <p className="text-lg font-bold mb-2">Janakpuri Sector 4</p>
                 <p className="text-xs text-[var(--text-secondary)] opacity-80 leading-relaxed mb-4">
                    System-detected anomaly. Enforcement team dispatched to cluster #192.
                 </p>
                 <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-[9px] font-bold text-red-500 uppercase">Alert</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
         <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: 'rgba(var(--text-secondary-rgb), 1)' }}>Discover Ward Network</span>
         <ChevronDown size={16} />
      </div>
    </section>
  );
};
