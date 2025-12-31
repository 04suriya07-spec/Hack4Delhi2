
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AirStory } from './components/AirStory';
import { WardSelector } from './components/WardSelector';
import { PollutionDetails } from './components/PollutionDetails';
import { ActionCenter } from './components/ActionCenter';
import { WARDS as MOCK_WARDS } from './constants';
import { WardData } from './types';
import { wardApi } from './api';

const App: React.FC = () => {
  const [wards, setWards] = useState<WardData[]>(MOCK_WARDS);
  const [selectedWard, setSelectedWard] = useState<WardData>(MOCK_WARDS[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const data = await wardApi.getAll();
        if (data && data.length > 0) {
          setWards(data);
          setSelectedWard(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch wards from backend, using mocks.");
      }
    };
    fetchWards();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleWardSelect = (ward: WardData) => {
    setSelectedWard(ward);
    const detailsSection = document.getElementById('ward-details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="space-y-0">
        <Hero />

        <AirStory />

        <section className="py-24">
          <div className="text-center mb-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Live Ward Network</h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-light">Interactive tracking of Delhi's micro-climates. Select a sector for granular intelligence.</p>
          </div>
          <WardSelector
            onSelect={handleWardSelect}
            selectedWardId={selectedWard.id}
          />
        </section>

        <div id="ward-details" className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--text-primary)] to-transparent opacity-5 pointer-events-none" />
          <div className="relative">
            <div className="max-w-[1440px] mx-auto px-6 mb-4 flex items-center gap-4 animate-in fade-in duration-1000">
              <div className="h-px flex-1 bg-[var(--card-border)]" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-secondary)] whitespace-nowrap">Granular Intelligence View</h2>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <PollutionDetails ward={selectedWard} />
          </div>
        </div>

        <ActionCenter />

        <footer className="max-w-[1440px] mx-auto px-6 py-24 border-t border-[var(--card-border)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8 group cursor-pointer">
                <div className="w-10 h-10 rounded-2xl bg-[var(--text-primary)] flex items-center justify-center transition-transform group-hover:rotate-[12deg]">
                  <div className="w-5 h-5 rounded-full border-[3px] border-[var(--bg-primary)]" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">PureDelhi.</span>
              </div>
              <p className="text-[var(--text-secondary)] max-w-sm leading-relaxed text-sm font-light">
                A high-fidelity monitoring infrastructure empowering Delhi’s transition to breathable atmosphere through localized, precision data.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-8">Ecosystem</h4>
              <ul className="space-y-5 text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-widest">
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">API Integration</li>
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Global Monitoring</li>
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Ward Protocols</li>
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Public Data</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-8">Resources</h4>
              <ul className="space-y-5 text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-widest">
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Health Safety</li>
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Policy Status</li>
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Citizen Guide</li>
                <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Support</li>
              </ul>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-[var(--card-border)] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">
            <p>© 2024 PureDelhi Initiative. Engineered for the future.</p>
            <div className="flex gap-12">
              <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Legal</span>
              <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Status</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Global Aesthetics Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_var(--accent-glow)_0%,_transparent_50%)]" />
      </div>
    </div>
  );
};

export default App;
