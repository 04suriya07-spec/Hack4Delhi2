
import React from 'react';
import { WARDS } from '../constants';
import { GlassCard } from './GlassCard';
import { AlertCircle, Wind, ShieldCheck } from 'lucide-react';

export const AirStory: React.FC = () => {
  const worstWard = [...WARDS].sort((a, b) => b.aqi - a.aqi)[0];
  const avgAqi = Math.round(WARDS.reduce((acc, w) => acc + w.aqi, 0) / WARDS.length);

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <div className="flex-1">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-6">Today's Air Story</h2>
          <div className="space-y-6">
            <p className="text-3xl md:text-4xl font-medium leading-tight text-[var(--text-primary)]">
              Delhi's air quality is currently <span className="text-orange-500 font-bold">Moderately Poor</span> with an average AQI of <span className="text-[var(--text-primary)] font-bold">{avgAqi}</span>. 
              The most affected area is <span className="text-red-500 font-bold">{worstWard.name}</span>, where levels have peaked at <span className="text-red-500 font-bold">{worstWard.aqi}</span>.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)]">
                 <Wind size={16} className="text-orange-500" />
                 <span className="text-sm text-[var(--text-secondary)]">Primary Pollutant: PM 2.5</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)]">
                 <ShieldCheck size={16} className="text-green-500" />
                 <span className="text-sm text-[var(--text-secondary)]">Health Risk: Moderate for sensitive groups</span>
               </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 flex flex-col gap-4">
          <GlassCard className="!bg-red-500 !bg-opacity-10 !border-red-500 !border-opacity-20 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <AlertCircle className="text-red-500" size={24} />
               <span className="text-[10px] font-bold uppercase tracking-widest bg-red-500 text-white px-2 py-0.5 rounded">Critical</span>
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)] mb-1">Highest Concentration</p>
              <h4 className="text-xl font-bold text-[var(--text-primary)]">{worstWard.name}</h4>
              <p className="text-3xl font-light text-red-500 mt-2">{worstWard.aqi} <span className="text-sm">AQI</span></p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
