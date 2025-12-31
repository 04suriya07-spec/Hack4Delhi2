
import React, { useState, useEffect } from 'react';
import { Wind, Menu, Search, User, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'py-4 glass border-b-[var(--card-border)]' : 'py-8 bg-transparent'}
      `}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[var(--text-primary)] flex items-center justify-center group-hover:rotate-[15deg] transition-all">
            <Wind className="text-[var(--bg-primary)]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Pure<span className="text-[var(--text-secondary)] opacity-50">Delhi</span></span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Wards</a>
          <a href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Analytics</a>
          <a href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Citizen Action</a>
          <a href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Resources</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-[var(--text-primary)] hover:bg-opacity-5 transition-all cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-90"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="animate-in fade-in zoom-in duration-300" /> : <Moon size={20} className="animate-in fade-in zoom-in duration-300" />}
          </button>
          
          <div className="hidden sm:block p-2.5 rounded-full hover:bg-[var(--text-primary)] hover:bg-opacity-5 transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <Search size={20} />
          </div>
          
          <div className="p-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] cursor-pointer hover:scale-105 transition-all">
            <User size={20} />
          </div>
          
          <div className="md:hidden p-2.5 rounded-full hover:bg-[var(--text-primary)] hover:bg-opacity-5 transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <Menu size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};
