
import React, { useEffect, useState } from 'react';
import { WardData, PollutionLevel } from '../types';
import { GlassCard } from './GlassCard';
import { GoogleGenAI } from "@google/genai";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { Sparkles, MapPin, Share2, Info, ArrowUpRight, Wind, Activity, Box } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { Typewriter } from './Typewriter';

const COLORS_LIST = ['#34c759', '#ffcc00', '#ff9500', '#ff3b30', '#8b0000', '#007aff'];

interface PollutionDetailsProps {
  ward: WardData;
}

export const PollutionDetails: React.FC<PollutionDetailsProps> = ({ ward }) => {
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const fetchAIInsights = async () => {
      setLoadingAi(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Provide 3 specific health and action recommendations for residents of ${ward.name} ward in Delhi, where the AQI is currently ${ward.aqi} (${ward.level}). Keep it brief, professional, and Apple-style premium.`,
          config: { temperature: 0.7 }
        });
        setAiAdvice(response.text || "Prioritize N95 protection and high-efficiency indoor air purification.");
      } catch (err) {
        setAiAdvice("Maintain indoor air purification and limit physical outdoor activities during peak hours.");
      } finally {
        setLoadingAi(false);
      }
    };
    fetchAIInsights();
  }, [ward]);

  const pollutantData = [
    { name: 'PM2.5', value: ward.metrics.pm25 },
    { name: 'PM10', value: ward.metrics.pm10 },
    { name: 'NO2', value: ward.metrics.no2 },
    { name: 'SO2', value: ward.metrics.so2 },
    { name: 'CO', value: ward.metrics.co * 10 },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
        <GlassCard className="!bg-[var(--card-bg)] border-[var(--card-border)] backdrop-blur-3xl p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[var(--text-primary)] bg-opacity-5 rounded-2xl border border-[var(--card-border)]">
                <MapPin className="text-[var(--text-secondary)]" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">{ward.name}</h2>
                <p className="text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest mt-1">Real-time Ward Status</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500 bg-opacity-10 border border-indigo-500 border-opacity-20 text-[10px] font-bold uppercase tracking-widest text-indigo-500 hover:bg-opacity-20 transition-all">
              <Box size={14} />
              AR View
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-[2rem] bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)]">
              <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] font-bold mb-2">Current AQI</p>
              <AnimatedCounter value={ward.aqi} className="text-5xl font-light tracking-tighter text-[var(--text-primary)]" />
            </div>
            <div className="p-6 rounded-[2rem] bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)]">
              <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] font-bold mb-2">PM 2.5</p>
              <AnimatedCounter value={ward.metrics.pm25} className="text-5xl font-light tracking-tighter text-[var(--text-primary)]" />
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-indigo-500 bg-opacity-10 border border-indigo-500 border-opacity-20 relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-4 text-indigo-500 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} className="animate-pulse" />
              AI Intelligence
            </div>
            <div className="text-sm text-[var(--text-primary)] opacity-80 leading-relaxed min-h-[120px] font-light">
              {loadingAi ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 bg-opacity-40 animate-pulse" />
                        <div 
                          className="h-2 bg-[var(--text-primary)] opacity-10 rounded-full animate-pulse" 
                          style={{ width: `${Math.floor(Math.random() * 40) + 40}%`, animationDelay: `${i * 150}ms` }} 
                        />
                      </div>
                      <div 
                        className="h-2 bg-[var(--text-primary)] opacity-5 rounded-full ml-3.5 animate-pulse" 
                        style={{ width: `${Math.floor(Math.random() * 30) + 60}%`, animationDelay: `${i * 200}ms` }} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-in fade-in duration-700">
                   <Typewriter text={aiAdvice} className="whitespace-pre-wrap" />
                </div>
              )}
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-indigo-500 bg-opacity-10 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
          </div>
        </GlassCard>

        <GlassCard className="p-8">
           <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Pollution Sources</h3>
            <Share2 size={16} className="text-[var(--text-secondary)] opacity-40" />
           </div>
           <div className="h-56">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={ward.sources}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={85}
                   paddingAngle={8}
                   dataKey="percentage"
                   nameKey="category"
                   animationBegin={200}
                   animationDuration={1500}
                 >
                   {ward.sources.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS_LIST[index % COLORS_LIST.length]} stroke="transparent" />
                   ))}
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-8">
             {ward.sources.map((src, i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS_LIST[i % COLORS_LIST.length] }} />
                   <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">{src.category}</span>
                 </div>
                 <span className="text-xs font-medium text-[var(--text-primary)]">{src.percentage}%</span>
               </div>
             ))}
           </div>
        </GlassCard>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
        <GlassCard className="h-full p-10">
           <div className="flex items-center justify-between mb-12">
             <div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Pollutant Analysis</h3>
                <p className="text-[var(--text-secondary)] text-xs font-medium mt-1">Hyper-local concentration metrics (µg/m³)</p>
             </div>
             <div className="flex gap-2">
               <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] hover:bg-opacity-10 transition-colors">
                  <Info size={16} className="text-[var(--text-secondary)]" />
               </button>
             </div>
           </div>
           
           <div className="h-[450px] mb-12">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={pollutantData}>
                 <XAxis 
                    dataKey="name" 
                    stroke="var(--text-secondary)" 
                    fontSize={10} 
                    fontWeight="bold" 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10} 
                 />
                 <YAxis hide />
                 <Tooltip 
                    cursor={{ fill: 'var(--text-primary)', opacity: 0.03 }}
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      border: '1px solid var(--card-border)', 
                      borderRadius: '16px', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                    }}
                    labelStyle={{ color: 'var(--text-primary)', marginBottom: '4px', fontWeight: 'bold' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-primary)' }}
                 />
                 <Bar dataKey="value" radius={[12, 12, 4, 4]} animationDuration={2000} barSize={40}>
                   {pollutantData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS_LIST[index % COLORS_LIST.length]} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>

           <div className="pt-8 border-t border-[var(--card-border)]">
              <h4 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-6">Expert Guidelines</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-[1.5rem] bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] hover:border-opacity-20 transition-all group">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-green-500 bg-opacity-10 flex items-center justify-center text-green-500">
                        <Wind size={14} />
                     </div>
                     <span className="text-sm font-semibold text-[var(--text-primary)]">Atmospheric Flow</span>
                   </div>
                   <p className="text-xs text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">Strategic ventilation is recommended during evening hours when surface temperatures drop.</p>
                </div>
                <div className="p-6 rounded-[1.5rem] bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] hover:border-opacity-20 transition-all group">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-red-500 bg-opacity-10 flex items-center justify-center text-red-500">
                        <Activity size={14} />
                     </div>
                     <span className="text-sm font-semibold text-[var(--text-primary)]">Activity Index</span>
                   </div>
                   <p className="text-xs text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">Outdoor physiological exertion should be moderated. Priority for respiratory-safe environments.</p>
                </div>
              </div>
           </div>
        </GlassCard>
      </div>
    </section>
  );
};
