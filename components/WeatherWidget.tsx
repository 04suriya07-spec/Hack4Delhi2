
import React from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, Zap } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const WeatherWidget: React.FC = () => {
  return (
    <GlassCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-1">Local Climate</h4>
          <p className="text-2xl font-bold text-[var(--text-primary)]">24°C</p>
          <p className="text-xs text-[var(--text-secondary)]">Feels like 26°C • Clear Sky</p>
        </div>
        <Sun className="text-yellow-500 animate-pulse" size={32} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="flex items-center gap-2">
          <Droplets size={14} className="text-blue-400" />
          <div>
            <p className="text-[10px] font-bold uppercase text-[var(--text-secondary)] opacity-60">Humidity</p>
            <p className="text-xs font-bold">42%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={14} className="text-indigo-400" />
          <div>
            <p className="text-[10px] font-bold uppercase text-[var(--text-secondary)] opacity-60">Wind</p>
            <p className="text-xs font-bold">12 km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer size={14} className="text-red-400" />
          <div>
            <p className="text-[10px] font-bold uppercase text-[var(--text-secondary)] opacity-60">UV Index</p>
            <p className="text-xs font-bold">Moderate (4)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-yellow-400" />
          <div>
            <p className="text-[10px] font-bold uppercase text-[var(--text-secondary)] opacity-60">Visibility</p>
            <p className="text-xs font-bold">2.5 km</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
