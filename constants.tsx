
import React from 'react';
import { WardData, PollutionLevel, ActionRecommendation } from './types';
import { 
  Wind, 
  Car, 
  Factory, 
  Flame, 
  ShieldAlert, 
  Leaf, 
  Mask, 
  Home 
} from 'lucide-react';

export const COLORS = {
  good: '#34c759',
  moderate: '#ffcc00',
  poor: '#ff9500',
  veryPoor: '#ff3b30',
  severe: '#8b0000',
  bgDark: '#000000',
  bgLight: '#f5f5f7',
  textMain: '#1d1d1f'
};

export const WARDS: WardData[] = [
  {
    id: 'w1',
    name: 'Rohini',
    number: 1,
    aqi: 342,
    level: PollutionLevel.VERY_POOR,
    metrics: { pm25: 180, pm10: 250, no2: 45, so2: 12, co: 2.1 },
    trend: [310, 320, 345, 340, 335, 342],
    sources: [
      { category: 'Vehicles', percentage: 40 },
      { category: 'Construction', percentage: 30 },
      { category: 'Waste Burning', percentage: 20 },
      { category: 'Industry', percentage: 10 }
    ]
  },
  {
    id: 'w2',
    name: 'Dwarka',
    number: 2,
    aqi: 215,
    level: PollutionLevel.POOR,
    metrics: { pm25: 110, pm10: 180, no2: 30, so2: 8, co: 1.5 },
    trend: [190, 200, 210, 220, 215, 215],
    sources: [
      { category: 'Vehicles', percentage: 50 },
      { category: 'Construction', percentage: 25 },
      { category: 'Waste Burning', percentage: 15 },
      { category: 'Industry', percentage: 10 }
    ]
  },
  {
    id: 'w3',
    name: 'Janakpuri',
    number: 3,
    aqi: 405,
    level: PollutionLevel.SEVERE,
    metrics: { pm25: 280, pm10: 410, no2: 60, so2: 18, co: 3.2 },
    trend: [380, 390, 410, 420, 405, 405],
    sources: [
      { category: 'Vehicles', percentage: 35 },
      { category: 'Industry', percentage: 35 },
      { category: 'Waste Burning', percentage: 20 },
      { category: 'Construction', percentage: 10 }
    ]
  },
  {
    id: 'w4',
    name: 'Chanakyapuri',
    number: 4,
    aqi: 85,
    level: PollutionLevel.GOOD,
    metrics: { pm25: 45, pm10: 70, no2: 15, so2: 4, co: 0.8 },
    trend: [90, 85, 80, 88, 85, 85],
    sources: [
      { category: 'Vehicles', percentage: 70 },
      { category: 'Waste Burning', percentage: 10 },
      { category: 'Construction', percentage: 15 },
      { category: 'Industry', percentage: 5 }
    ]
  }
];

export const RECOMMENDATIONS: ActionRecommendation[] = [
  {
    id: 'r1',
    title: 'Wear N95 Mask',
    description: 'High concentration of fine particulate matter detected. Ensure outdoor movement is limited or use N95 grade protection.',
    priority: 'High',
    icon: 'Mask'
  },
  {
    id: 'r2',
    title: 'Purify Indoor Air',
    description: 'Keep windows closed and run air purifiers on high setting. Use HEPA filters for maximum efficiency.',
    priority: 'High',
    icon: 'Home'
  },
  {
    id: 'r3',
    title: 'Avoid Heavy Exercise',
    description: 'Outdoor physical activity should be minimized to prevent deep inhalation of pollutants.',
    priority: 'Medium',
    icon: 'Wind'
  }
];
