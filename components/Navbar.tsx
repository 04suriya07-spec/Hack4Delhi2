
import React, { useState, useEffect, useRef } from 'react';
import { Wind, Menu, Search, User, Moon, Sun, X, MapPin } from 'lucide-react';
import { AppView, WardData } from '../types';
import { WARDS } from '../constants';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeView: AppView;
  setView: (view: AppView) => void;
  onSelectWard: (ward: WardData) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, activeView, setView, onSelectWard }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<WardData[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = WARDS.filter(w => 
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.number.toString() === searchTerm
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (ward: WardData) => {
    onSelectWard(ward);
    setSearchTerm('');
    setSearchOpen(false);
    setView(AppView.WARDS);
  };

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-[100] transition-all duration-500
        ${scrolled || searchOpen ? 'py-4 glass border-b-[var(--card-border)]' : 'py-8 bg-transparent'}
      `}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-8">
        {/* Logo */}
        <div 
          onClick={() => setView(AppView.HOME)}
          className="flex items-center gap-2 group cursor-pointer flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--text-primary)] flex items-center justify-center group-hover:rotate-[15deg] transition-all">
            <Wind className="text-[var(--bg-primary)]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Pure<span className="text-[var(--text-secondary)] opacity-50">Delhi</span></span>
        </div>

        {/* Global Search Interface */}
        <div className={`flex-1 max-w-2xl relative ${searchOpen ? 'block' : 'hidden lg:block'}`}>
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-40 group-focus-within:opacity-80 transition-opacity" size={18} />
              <input 
                type="text" 
                placeholder="Search wards, zones, or rankings..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-full bg-[var(--text-primary)]/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full py-3 pl-12 pr-6 text-sm outline-none focus:ring-2 ring-indigo-500/30 transition-all backdrop-blur-md"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X size={16} />
                </button>
              )}
           </div>

           {/* Suggestions Dropdown */}
           {searchOpen && suggestions.length > 0 && (
             <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-[var(--card-border)] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {suggestions.map((ward) => (
                  <div 
                    key={ward.id}
                    onClick={() => handleSuggestionClick(ward)}
                    className="px-6 py-4 hover:bg-[var(--text-primary)]/5 flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <MapPin size={16} className="text-indigo-500" />
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors">{ward.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Ward {ward.number} • {ward.zone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold" style={{ color: ward.aqi > 200 ? '#ff3b30' : '#34c759' }}>{ward.aqi} AQI</p>
                       <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">{ward.level}</p>
                    </div>
                  </div>
                ))}
                <div className="px-6 py-3 bg-[var(--text-primary)]/5 border-t border-[var(--card-border)] text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                   Press Enter to see all results
                </div>
             </div>
           )}
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
          {[
            { id: AppView.WARDS, label: 'Wards' },
            { id: AppView.ANALYTICS, label: 'Analytics' },
            { id: AppView.ACTION, label: 'Citizen Action' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setView(item.id)}
              className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-[var(--text-primary)] ${activeView === item.id ? 'text-indigo-500' : 'text-[var(--text-secondary)]'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-[var(--text-primary)] hover:bg-opacity-5 transition-all cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-90"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="animate-in fade-in zoom-in duration-300" /> : <Moon size={20} className="animate-in fade-in zoom-in duration-300" />}
          </button>
          
          <button 
            onClick={() => setView(AppView.HOME)}
            className="p-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] cursor-pointer hover:scale-105 transition-all"
          >
            <User size={20} />
          </button>
          
          <div className="lg:hidden p-2.5 rounded-full hover:bg-[var(--text-primary)] hover:bg-opacity-5 transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <Menu size={20} />
          </div>
        </div>
      </div>
      
      {/* Search Overlay Closer */}
      {searchOpen && (
        <div className="fixed inset-0 z-[-1] bg-black/5 dark:bg-white/5 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
      )}
    </nav>
  );
};
