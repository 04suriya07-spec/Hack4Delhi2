
import React from 'react';
import { WARDS, COLORS } from '../constants';
import { WardData, PollutionLevel } from '../types';
import { GlassCard } from './GlassCard';
import { TrendingUp, TrendingDown, ChevronRight, Navigation, Award } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface WardSelectorProps {
  onSelect: (ward: WardData) => void;
  selectedWardId?: string;
}

export const WardSelector: React.FC<WardSelectorProps> = ({ onSelect, selectedWardId }) => {
  const getLevelColor = (level: PollutionLevel) => {
    switch(level) {
      case PollutionLevel.GOOD: return COLORS.good;
      case PollutionLevel.MODERATE: return COLORS.moderate;
      case PollutionLevel.POOR: return COLORS.poor;
      case PollutionLevel.VERY_POOR: return COLORS.veryPoor;
      case PollutionLevel.SEVERE: return COLORS.severe;
      default: return '#fff';
    }
  };

  const cleanestWardId = [...WARDS].sort((a, b) => a.aqi - b.aqi)[0]?.id;

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        // In a real app, we'd find the nearest ward. Here we'll select Dwarka as a proxy.
        onSelect(WARDS[1]);
      });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
           <div className="w-1 h-8 bg-indigo-500 rounded-full" />
           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Regional Sectors</h4>
        </div>
        <button 
          onClick={handleDetectLocation}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-opacity-10 transition-all active:scale-95"
        >
          <Navigation size={12} />
          Find My Ward
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WARDS.map((ward, idx) => (
          <div 
            key={ward.id} 
            className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <GlassCard 
              onClick={() => onSelect(ward)}
              className={`
                relative overflow-hidden group min-h-[220px] flex flex-col justify-between
                ${selectedWardId === ward.id ? 'ring-2 ring-indigo-500 ring-opacity-40 !bg-[var(--text-primary)] !bg-opacity-10' : ''}
                hover:scale-[1.02]
              `}
            >
              {ward.id === cleanestWardId && (
                <div className="absolute top-4 right-4 text-green-500">
                  <Award size={18} className="animate-pulse" />
                </div>
              )}
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] font-bold">Ward {ward.number}</p>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{ward.name}</h3>
                  </div>
                  <div 
                    className="w-2.5 h-2.5 rounded-full shadow-lg"
                    style={{ backgroundColor: getLevelColor(ward.level) }}
                  />
                </div>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <AnimatedCounter value={ward.aqi} className="text-5xl font-light tracking-tighter text-[var(--text-primary)]" />
                  <span className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-widest">AQI</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                  {ward.aqi > 300 ? (
                    <TrendingUp size={12} className="text-red-500" />
                  ) : (
                    <TrendingDown size={12} className="text-green-500" />
                  )}
                  <span className={ward.aqi > 300 ? "text-red-500" : "text-green-500"}>
                    {ward.aqi > 300 ? '+12% Trend' : '-5% Trend'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-end gap-1 h-8 w-24">
                  {ward.trend.map((val, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-[var(--text-primary)] bg-opacity-10 rounded-sm transition-all duration-500 group-hover:bg-opacity-20" 
                      style={{ height: (val / 500) * 100 + '%' }}
                    />
                  ))}
                </div>
                <ChevronRight size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all" />
              </div>

              <div 
                className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--text-primary)] to-transparent opacity-5 rounded-full blur-2xl -translate-y-12 translate-x-12 pointer-events-none"
              />
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
};
