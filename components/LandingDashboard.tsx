
import React from 'react';
import { WardData } from '../types';
import { GlassCard } from './GlassCard';
import { TrendingUp, ShieldCheck, Activity, Award, AlertTriangle } from 'lucide-react';
import { COLORS } from '../constants';

interface LandingDashboardProps {
  wards: WardData[];
  onSelect: (ward: WardData) => void;
}

export const LandingDashboard: React.FC<LandingDashboardProps> = ({ wards, onSelect }) => {
  const sortedByPollution = [...wards].sort((a, b) => b.aqi - a.aqi);
  const worstWards = sortedByPollution.slice(0, 10);
  const cleanestWards = [...sortedByPollution].reverse().slice(0, 10);

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Worst Impact Wards */}
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Pollution Hotspots</h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-widest mt-1">Top 10 Operational Hazards</p>
            </div>
          </div>

          <div className="space-y-4">
            {worstWards.map((ward, i) => (
              <GlassCard 
                key={ward.id}
                onClick={() => onSelect(ward)}
                className="!p-4 hover:!bg-red-500/5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-red-500 opacity-40">{i + 1}</span>
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-red-500 transition-colors">{ward.name}</h4>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Ward {ward.number} • {ward.zone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-500">{ward.aqi}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-red-500/60">{ward.level}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Cleanest Wards */}
        <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Eco Leaders</h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-widest mt-1">Top 10 Benchmark Wards</p>
            </div>
          </div>

          <div className="space-y-4">
            {cleanestWards.map((ward, i) => (
              <GlassCard 
                key={ward.id}
                onClick={() => onSelect(ward)}
                className="!p-4 hover:!bg-green-500/5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-green-500 opacity-40">{i + 1}</span>
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-green-500 transition-colors">{ward.name}</h4>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Ward {ward.number} • {ward.zone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-500">{ward.aqi}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-green-500/60">{ward.level}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
