
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        glass relative overflow-hidden rounded-[24px] p-6 
        transition-all duration-500 ease-out 
        hover:translate-y-[-10px] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
    >
      {/* Micro-Atmosphere Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02] pointer-events-none" />
      <div className="absolute -inset-1/2 bg-[radial-gradient(circle_at_50%_50%,_rgba(var(--text-primary-rgb),0.03),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
