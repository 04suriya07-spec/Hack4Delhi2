
import React from 'react';
import { PollutionLevel } from '../types';

interface CharacterProps {
  aqi: number;
}

export const Character: React.FC<CharacterProps> = ({ aqi }) => {
  // Emotion logic updated for CPCB 6-tier levels
  const getEmotion = () => {
    if (aqi <= 50) return 'happy';      // Good
    if (aqi <= 100) return 'satisfactory'; // Satisfactory
    if (aqi <= 200) return 'neutral';    // Moderate
    if (aqi <= 300) return 'worried';    // Poor
    if (aqi <= 400) return 'sad';        // Very Poor
    return 'sick';                       // Severe
  };

  const emotion = getEmotion();

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 animate-breath group">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl transition-all duration-1000">
        {/* Head */}
        <circle cx="100" cy="100" r="80" fill="#FFD54F" className="transition-colors duration-1000" />
        
        {/* Hair - Cap Style */}
        <path d="M40,70 Q100,20 160,70 L160,100 L40,100 Z" fill="#424242" />

        {/* Eyes */}
        {(emotion === 'happy' || emotion === 'satisfactory') && (
          <>
            <circle cx="70" cy="90" r="8" fill="#212121" />
            <circle cx="130" cy="90" r="8" fill="#212121" />
          </>
        )}
        {emotion === 'neutral' && (
          <>
            <rect x="60" y="85" width="20" height="4" rx="2" fill="#212121" />
            <rect x="120" y="85" width="20" height="4" rx="2" fill="#212121" />
          </>
        )}
        {emotion === 'worried' && (
          <>
            <path d="M60,95 Q70,85 80,95" fill="none" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
            <path d="M120,95 Q130,85 140,95" fill="none" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {(emotion === 'sad' || emotion === 'sick') && (
          <>
            <path d="M60,100 Q70,90 80,100" fill="none" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
            <path d="M120,100 Q130,90 140,100" fill="none" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
            {emotion === 'sick' && <path d="M70,110 L130,110" stroke="#c00000" strokeWidth="8" strokeLinecap="round" opacity="0.4" />}
          </>
        )}

        {/* Mouth */}
        {emotion === 'happy' && (
          <path d="M60,130 Q100,160 140,130" fill="none" stroke="#212121" strokeWidth="6" strokeLinecap="round" />
        )}
        {emotion === 'satisfactory' && (
          <path d="M65,135 Q100,150 135,135" fill="none" stroke="#212121" strokeWidth="6" strokeLinecap="round" />
        )}
        {emotion === 'neutral' && (
          <line x1="70" y1="140" x2="130" y2="140" stroke="#212121" strokeWidth="6" strokeLinecap="round" />
        )}
        {emotion === 'worried' && (
          <path d="M70,145 Q100,135 130,145" fill="none" stroke="#212121" strokeWidth="6" strokeLinecap="round" />
        )}
        {(emotion === 'sad' || emotion === 'sick') && (
          <path d="M70,150 Q100,120 130,150" fill="none" stroke="#212121" strokeWidth="6" strokeLinecap="round" />
        )}

        {/* Mask for Severe levels */}
        {emotion === 'sick' && (
          <rect x="50" y="110" width="100" height="60" rx="10" fill="white" stroke="#E0E0E0" strokeWidth="2" />
        )}
      </svg>
      
      {/* Dynamic atmospheric particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: Math.min(aqi / 15, 25) }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10 blur-[0.5px] animate-float"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: 4 + Math.random() * 6 + 's'
            }}
          />
        ))}
      </div>
    </div>
  );
};
