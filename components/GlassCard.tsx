
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
        glass rounded-[24px] p-6 
        transition-all duration-300 ease-out 
        hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
