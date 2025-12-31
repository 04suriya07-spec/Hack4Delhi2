
import React, { useEffect, useState } from 'react';
import { WardData, PollutionLevel } from '../types';
import { GlassCard } from './GlassCard';
import { GoogleGenAI } from "@google/genai";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Sparkles, Share2, Info, Wind, Activity, Clock, TrendingUp, TrendingDown, ShieldAlert, BarChart3, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { Typewriter } from './Typewriter';
import { WardCalendar } from './WardCalendar';
import { COLORS } from '../constants';

const COLORS_LIST = Object.values(COLORS);

interface PollutionDetailsProps {
  ward: WardData;
}

const POLLUTANT_INFO: Record<string, { desc: string, source: string }> = {
  'PM2.5': { desc: 'Fine particles that penetrate deep into lungs and blood.', source: 'Vehicle exhaust, industrial emissions, construction.' },
  'PM10': { desc: 'Inhalable particles that irritate eyes, nose, and throat.', source: 'Dust, smoke, and biological particles.' },
  'NO2': { desc: 'Toxic gas causing respiratory inflammation.', source: 'High-temperature fuel combustion in vehicles.' },
  'SO2': { desc: 'Pungent gas affecting asthma and lung function.', source: 'Power plants and industrial boiler emissions.' },
  'CO': { desc: 'Odorless gas that reduces oxygen delivery in blood.', source: 'Incomplete combustion of wood or petroleum.' },
  'O3': { desc: 'Ground-level ozone formed by chemical reactions.', source: 'Reaction of sunlight with vehicle emissions.' },
  'NH3': { desc: 'Alkaline gas contributing to secondary particulate matter.', source: 'Agriculture and industrial cooling systems.' },
};

export const PollutionDetails: React.FC<PollutionDetailsProps> = ({ ward }) => {
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [expandedPollutant, setExpandedPollutant] = useState<string | null>(null);

  useEffect(() => {
    const fetchAIInsights = async () => {
      setLoadingAi(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Current AQI: ${ward.aqi} (${ward.level}) per CPCB standards. Ward: ${ward.name}, Zone: ${ward.zone}. PM2.5: ${ward.metrics.pm25}. 
Provide a high-fidelity civic action plan including 3 health warnings and 2 enforcement steps for local authorities. Use a professional, official tone.`,
          config: { temperature: 0.6 }
        });
        setAiAdvice(response.text || "Prioritize health protection and source monitoring.");
      } catch (err) {
        setAiAdvice("Data suggests elevated risk. Limit outdoor exposure for children and the elderly.");
      } finally {
        setLoadingAi(false);
      }
    };
    fetchAIInsights();
  }, [ward]);

  const pollutantData = [
    { name: 'PM2.5', value: ward.metrics.pm25, unit: 'µg/m³' },
    { name: 'PM10', value: ward.metrics.pm10, unit: 'µg/m³' },
    { name: 'NO2', value: ward.metrics.no2, unit: 'µg/m³' },
    { name: 'SO2', value: ward.metrics.so2, unit: 'µg/m³' },
    { name: 'CO', value: ward.metrics.co, unit: 'mg/m³' },
    { name: 'O3', value: ward.metrics.o3, unit: 'µg/m³' },
    { name: 'NH3', value: ward.metrics.nh3, unit: 'µg/m³' },
  ];

  const trendData = ward.trend24h.map((val, i) => ({ time: `${i*2}h`, value: val }));

  const getLevelColor = (aqi: number) => {
    if (aqi <= 50) return COLORS.good;
    if (aqi <= 100) return COLORS.satisfactory;
    if (aqi <= 200) return COLORS.moderate;
    if (aqi <= 300) return COLORS.poor;
    if (aqi <= 400) return COLORS.veryPoor;
    return COLORS.severe;
  };

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Analytics Core */}
      <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-bottom duration-1000">
        <GlassCard className="p-10">
           <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
             <div>
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">{ward.name} Analytics</h3>
                   <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-[9px] font-bold uppercase tracking-widest border border-indigo-500/20">Operational Sector</span>
                </div>
                <div className="flex items-center gap-4 text-[var(--text-secondary)] text-xs font-medium">
                   <p>Sector {ward.number} • {ward.zone}</p>
                   <div className="flex items-center gap-1.5 opacity-60">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Updated {ward.lastUpdated} IST (Refresh: 1m)
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-50 mb-1">
                      <Activity size={12} />
                      CPCB Confidence
                   </div>
                   <span className={`text-xs font-bold ${ward.confidence === 'High' ? 'text-green-500' : 'text-yellow-500'}`}>{ward.confidence} Score</span>
                </div>
                <div className="w-px h-10 bg-[var(--card-border)] mx-2" />
                <button className="p-3 rounded-full glass hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  <Share2 size={16} className="text-[var(--text-secondary)]" />
               </button>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
             <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-[var(--text-primary)]/5 border border-[var(--card-border)] flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">Official AQI (CPCB)</p>
                <div className="flex items-baseline gap-2">
                   <AnimatedCounter value={ward.aqi} className="text-7xl font-light tracking-tighter" style={{ color: getLevelColor(ward.aqi) }} />
                   <span className="text-xs font-bold text-[var(--text-secondary)] opacity-50">/500</span>
                </div>
                <div className="mt-4 px-4 py-2 rounded-xl inline-block w-max text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: getLevelColor(ward.aqi) + '20', color: getLevelColor(ward.aqi) }}>
                   Status: {ward.level}
                </div>
             </div>
             
             <div className="md:col-span-8 p-8 rounded-[2.5rem] bg-[var(--text-primary)]/5 border border-[var(--card-border)]">
                <div className="flex justify-between items-center mb-6">
                   <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">Minute-Wise Intensity Trend</p>
                   <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-indigo-500 uppercase">Live Sensor Mesh</span>
                   </div>
                </div>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorAqi)" strokeWidth={2.5} animationDuration={1500} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
           </div>

           {/* Detailed Pollutant Breakdown */}
           <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <BarChart3 size={16} className="text-[var(--text-secondary)]" />
                    <h4 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em]">Pollutant Concentrations</h4>
                 </div>
                 <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-40">
                    <HelpCircle size={12} />
                    Click for Info
                 </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                 {pollutantData.map((p) => (
                   <div 
                    key={p.name} 
                    onClick={() => setExpandedPollutant(expandedPollutant === p.name ? null : p.name)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${expandedPollutant === p.name ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-[var(--text-primary)]/5 border-[var(--card-border)] hover:bg-[var(--text-primary)]/10'}`}
                   >
                     <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1 opacity-60">{p.name}</p>
                     <p className="text-xl font-bold text-[var(--text-primary)]">{p.value}</p>
                     <p className="text-[8px] font-bold text-[var(--text-secondary)] opacity-40 mt-0.5">{p.unit}</p>
                   </div>
                 ))}
              </div>

              {expandedPollutant && (
                <div className="mt-4 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 animate-in fade-in slide-in-bottom duration-300">
                   <div className="flex items-center justify-between mb-2">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-indigo-500">About {expandedPollutant}</h5>
                      <button onClick={() => setExpandedPollutant(null)} className="text-[var(--text-secondary)] hover:text-indigo-500"><ChevronUp size={16} /></button>
                   </div>
                   <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{POLLUTANT_INFO[expandedPollutant].desc}</p>
                   <p className="text-xs text-[var(--text-secondary)] font-light"><span className="font-bold">Main Sources:</span> {POLLUTANT_INFO[expandedPollutant].source}</p>
                </div>
              )}
           </div>

           <WardCalendar history={ward.history30d} />
        </GlassCard>
      </div>

      {/* Action and Context Sidebar */}
      <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
        <GlassCard className="p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent">
           <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-indigo-500" size={24} />
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Official Directive</h4>
           </div>
           <div className="text-sm leading-relaxed font-light text-[var(--text-primary)]/80 min-h-[220px]">
              {loadingAi ? (
                <div className="space-y-5">
                  {[1, 0.9, 1, 0.8].map((w, i) => <div key={i} className="h-3.5 bg-indigo-500/10 rounded-full animate-pulse" style={{ width: `${w*100}%` }} />)}
                </div>
              ) : (
                <Typewriter text={aiAdvice} speed={8} />
              )}
           </div>
           <div className="mt-8 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
              <ShieldAlert className="text-indigo-500" size={20} />
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Priority Alert Level Active</p>
           </div>
        </GlassCard>

        <GlassCard className="p-8">
           <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-8">Pollution Source Matrix</h4>
           <div className="h-60">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={ward.sources} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={10} dataKey="percentage" nameKey="category">
                   {ward.sources.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_LIST[index % COLORS_LIST.length]} stroke="transparent" />)}
                 </Pie>
                 <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="space-y-4 mt-8">
             {ward.sources.map((src, i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS_LIST[i % COLORS_LIST.length] }} />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">{src.category}</span>
                 </div>
                 <span className="text-xs font-bold text-[var(--text-primary)]">{src.percentage}%</span>
               </div>
             ))}
           </div>
        </GlassCard>

        <div className="p-8 rounded-[2.5rem] border border-[var(--card-border)] bg-[var(--text-primary)]/5 space-y-6">
           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Regional Benchmarks</h4>
           <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Zone Ranking</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">#{ward.rankZone} of {Math.ceil(274/5)}</span>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Annual Delta</span>
              <div className={`flex items-center gap-1.5 font-bold text-sm ${ward.yoyChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                 {ward.yoyChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                 {Math.abs(ward.yoyChange)}%
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
