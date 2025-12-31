
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AirStory } from './components/AirStory';
import { ZoneAccordion } from './components/ZoneAccordion';
import { PollutionDetails } from './components/PollutionDetails';
import { ActionCenter } from './components/ActionCenter';
import { LandingDashboard } from './components/LandingDashboard';
import { WARDS, ZONE_NAMES } from './constants';
import { WardData, Zone, AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.HOME);
  const [selectedWard, setSelectedWard] = useState<WardData>(WARDS.find(w => w.name.includes('Chanakyapuri')) || WARDS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const detailsRef = useRef<HTMLDivElement>(null);
  const searchResultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleWardSelect = (ward: WardData) => {
    setSelectedWard(ward);
    setActiveView(AppView.ANALYTICS);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredWards = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return WARDS.filter(w => 
      w.name.toLowerCase().includes(term) || 
      w.number.toString().includes(term) ||
      w.zone.toLowerCase().includes(term) ||
      w.level.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const avgAqi = useMemo(() => 
    Math.round(WARDS.reduce((acc, w) => acc + w.aqi, 0) / WARDS.length),
  []);

  const moodColor = useMemo(() => {
    const aqi = selectedWard.aqi;
    if (aqi <= 50) return '#00b050';
    if (aqi <= 100) return '#92d050';
    if (aqi <= 200) return '#ffff00';
    if (aqi <= 300) return '#ffc000';
    if (aqi <= 400) return '#ff0000';
    return '#c00000';
  }, [selectedWard]);

  const handleExplore = () => {
    setActiveView(AppView.WARDS);
    document.getElementById('landing-dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative bg-[var(--bg-primary)] transition-colors duration-700 overflow-x-hidden">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        activeView={activeView} 
        setView={setActiveView} 
        onSelectWard={handleWardSelect}
      />
      
      <div className="ambient-haze" style={{ color: moodColor, opacity: theme === 'dark' ? 0.1 : 0.05 }} />
      
      <main className="relative z-10">
        {activeView === AppView.HOME && (
          <>
            <Hero moodColor={moodColor} avgAqi={avgAqi} onSearch={setSearchTerm} onExplore={handleExplore} />
            <AirStory />
            
            {searchTerm ? (
              <section ref={searchResultsRef} className="py-24 max-w-[1440px] mx-auto px-6 animate-in fade-in">
                <div className="mb-12 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">Search Intelligence</h2>
                    <p className="text-sm text-[var(--text-secondary)] opacity-60">Operational data for "{searchTerm}"</p>
                  </div>
                  <button onClick={() => setSearchTerm('')} className="text-xs font-bold uppercase tracking-widest text-indigo-500">Clear Search</button>
                </div>
                <div className="space-y-6">
                  {ZONE_NAMES.map(zone => {
                    const zw = filteredWards.filter(w => w.zone === zone);
                    if (zw.length === 0) return null;
                    return <ZoneAccordion key={zone} zone={zone} wards={zw} onWardSelect={handleWardSelect} selectedWardId={selectedWard.id} />;
                  })}
                </div>
              </section>
            ) : (
              <div id="landing-dashboard">
                <LandingDashboard wards={WARDS} onSelect={handleWardSelect} />
              </div>
            )}
          </>
        )}

        <div id="ward-details" ref={detailsRef} className="py-24 scroll-mt-24">
          <div className="max-w-[1440px] mx-auto px-6 mb-4 flex items-center gap-4">
             <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
             <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-secondary)]">Environmental Intelligence Unit</h2>
             <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          </div>
          <PollutionDetails ward={selectedWard} />
        </div>

        <ActionCenter />

        <footer className="max-w-[1440px] mx-auto px-6 py-24 border-t border-black/5 dark:border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
             <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setActiveView(AppView.HOME)}>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[var(--text-primary)]">
                    <div className="w-5 h-5 rounded-full border-[3px] border-[var(--bg-primary)]" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight">PureDelhi.</span>
                </div>
                <p className="max-w-sm text-sm font-light leading-relaxed opacity-60">
                  Delhi's official environmental source of truth. Mapping all 274 wards with high-precision CPCB telemetry and AI insights.
                </p>
             </div>
             <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-8 opacity-40">System</h4>
                <ul className="space-y-4 text-xs font-semibold">
                  <li onClick={() => setActiveView(AppView.HOME)} className="cursor-pointer hover:text-indigo-500 transition-colors">Operational Dashboard</li>
                  <li onClick={handleExplore} className="cursor-pointer hover:text-indigo-500 transition-colors">Regional Benchmarks</li>
                </ul>
             </div>
             <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-8 opacity-40">Action</h4>
                <ul className="space-y-4 text-xs font-semibold">
                  <li onClick={() => setActiveView(AppView.ACTION)} className="cursor-pointer hover:text-indigo-500 transition-colors">Report Violation</li>
                  <li className="cursor-pointer hover:text-indigo-500 transition-colors">Health Protocols</li>
                </ul>
             </div>
           </div>
           <div className="mt-24 pt-12 border-t border-black/5 dark:border-white/5 text-[9px] font-bold uppercase tracking-widest opacity-30 text-center">
              © 2024 PureDelhi Initiative. Data derived from CPCB Standard Breakpoints.
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
