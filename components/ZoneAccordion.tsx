
import React, { useState } from 'react';
import { Zone, WardData, PollutionLevel } from '../types';
import { ChevronDown, ChevronUp, MapPin, Activity } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedCounter } from './AnimatedCounter';
import { COLORS } from '../constants';

interface ZoneAccordionProps {
  zone: Zone;
  wards: WardData[];
  onWardSelect: (ward: WardData) => void;
  selectedWardId?: string;
}

export const ZoneAccordion: React.FC<ZoneAccordionProps> = ({ zone, wards, onWardSelect, selectedWardId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const avgAqi = Math.round(wards.reduce((acc, w) => acc + w.aqi, 0) / (wards.length || 1));

  const getLevelColor = (aqi: number) => {
    if (aqi <= 50) return COLORS.good;
    if (aqi <= 100) return COLORS.moderate;
    if (aqi <= 200) return COLORS.poor;
    if (aqi <= 300) return COLORS.veryPoor;
    return COLORS.severe;
  };

  return (
    <div className="mb-8 overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--text-primary)]/5 transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-[var(--text-primary)]/5 transition-colors"
      >
        <div className="flex items-center gap-6">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ backgroundColor: getLevelColor(avgAqi) }}
          >
            {avgAqi}
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">{zone}</h3>
            <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-widest mt-1">
              {wards.length} Wards Monitored • Avg. Index: {avgAqi}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {isOpen && (
        <div className="px-8 pb-8 animate-in fade-in slide-in-bottom duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wards.map((ward) => (
              <GlassCard 
                key={ward.id}
                onClick={() => onWardSelect(ward)}
                className={`
                  !p-5 group transition-all duration-300
                  ${selectedWardId === ward.id ? 'ring-2 ring-indigo-500/50 scale-[1.02]' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">No. {ward.number}</span>
                    <h5 className="text-base font-bold text-[var(--text-primary)] line-clamp-1">{ward.name}</h5>
                  </div>
                  <div 
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: getLevelColor(ward.aqi) }}
                  />
                </div>
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter value={ward.aqi} className="text-3xl font-light tracking-tighter" />
                  <span className="text-[10px] font-bold uppercase text-[var(--text-secondary)]">AQI</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest">
                   <span className="text-[var(--text-secondary)] opacity-60">{ward.level}</span>
                   <span className="text-indigo-500">Rank: #{ward.rankOverall}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
