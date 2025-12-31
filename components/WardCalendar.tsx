
import React from 'react';
import { HistoricalDay, PollutionLevel } from '../types';
import { COLORS } from '../constants';

interface WardCalendarProps {
  history: HistoricalDay[];
}

export const WardCalendar: React.FC<WardCalendarProps> = ({ history }) => {
  const getLevelColor = (level: PollutionLevel) => {
    switch(level) {
      case PollutionLevel.GOOD: return COLORS.good;
      case PollutionLevel.MODERATE: return COLORS.moderate;
      case PollutionLevel.POOR: return COLORS.poor;
      case PollutionLevel.VERY_POOR: return COLORS.veryPoor;
      case PollutionLevel.SEVERE: return COLORS.severe;
      default: return 'transparent';
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em]">30-Day Air Quality Calendar</h4>
        <div className="flex gap-2">
          {Object.values(PollutionLevel).map((lvl) => (
            <div key={lvl} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLevelColor(lvl) }} />
              <span className="text-[8px] font-bold opacity-40 uppercase">{lvl}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
        {history.map((day, idx) => (
          <div 
            key={idx}
            className="group relative aspect-square rounded-lg transition-all hover:scale-110 cursor-help"
            style={{ backgroundColor: getLevelColor(day.level), opacity: 0.8 }}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[8px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {day.date}: {day.aqi} AQI
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
