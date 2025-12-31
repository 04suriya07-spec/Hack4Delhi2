
import { WardData, PollutionLevel, Zone, PollutantData, HistoricalDay } from './types';

export const COLORS = {
  good: '#00b050',         // CPCB Green
  satisfactory: '#92d050', // CPCB Light Green
  moderate: '#ffff00',     // CPCB Yellow
  poor: '#ffc000',         // CPCB Orange
  veryPoor: '#ff0000',     // CPCB Red
  severe: '#c00000',       // CPCB Dark Red/Maroon
};

export const getLevelFromAqi = (aqi: number): PollutionLevel => {
  if (aqi <= 50) return PollutionLevel.GOOD;
  if (aqi <= 100) return PollutionLevel.SATISFACTORY;
  if (aqi <= 200) return PollutionLevel.MODERATE;
  if (aqi <= 300) return PollutionLevel.POOR;
  if (aqi <= 400) return PollutionLevel.VERY_POOR;
  return PollutionLevel.SEVERE;
};

const generateMetrics = (aqi: number): PollutantData => ({
  pm25: Math.round(aqi * 0.55),
  pm10: Math.round(aqi * 0.8),
  no2: Math.round(aqi * 0.12),
  so2: Math.round(aqi * 0.05),
  co: Number((aqi * 0.006).toFixed(1)),
  o3: Math.round(aqi * 0.1),
  nh3: Math.round(aqi * 0.08)
});

const generateHistory = (baseAqi: number): HistoricalDay[] => {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const aqi = Math.max(15, baseAqi + Math.floor(Math.random() * 80) - 40);
    return {
      date: d.toISOString().split('T')[0],
      aqi,
      level: getLevelFromAqi(aqi)
    };
  });
};

const zoneBases: Record<Zone, number> = {
  [Zone.NORTH]: 285,
  [Zone.SOUTH]: 140,
  [Zone.EAST]: 340,
  [Zone.WEST]: 360,
  [Zone.CENTRAL]: 180,
};

const WARD_NAMES_POOL: Record<Zone, string[]> = {
  [Zone.NORTH]: ['Rohini', 'Model Town', 'Pitampura', 'Civil Lines', 'Burari', 'Narela', 'Adarsh Nagar', 'Badli'],
  [Zone.SOUTH]: ['Saket', 'Vasant Kunj', 'Greater Kailash', 'Hauz Khas', 'Mehrauli', 'Kalkaji', 'Malviya Nagar', 'Sangam Vihar'],
  [Zone.EAST]: ['Laxmi Nagar', 'Mayur Vihar', 'Preet Vihar', 'Shahdara', 'Krishna Nagar', 'Patparganj', 'Vivek Vihar', 'Anand Vihar'],
  [Zone.WEST]: ['Dwarka', 'Janakpuri', 'Rajouri Garden', 'Punjabi Bagh', 'Uttam Nagar', 'Palam', 'Vikaspuri', 'Tilak Nagar'],
  [Zone.CENTRAL]: ['Chanakyapuri', 'Connaught Place', 'Karol Bagh', 'Daryaganj', 'Paharganj', 'Rajender Nagar', 'Sadar Bazar'],
};

const generateWards = (): WardData[] => {
  const wards: WardData[] = [];
  const zones = Object.values(Zone);
  
  for (let i = 1; i <= 274; i++) {
    const zone = zones[Math.floor((i - 1) / (274 / 5))] || Zone.CENTRAL;
    const names = WARD_NAMES_POOL[zone];
    const baseName = names[(i - 1) % names.length];
    const sector = Math.ceil(i / names.length);
    const baseAqi = zoneBases[zone];
    const variance = Math.floor(Math.random() * 150) - 75;
    const aqi = Math.max(12, baseAqi + variance);
    
    wards.push({
      id: `ward-${i}`,
      number: i,
      name: sector > 1 ? `${baseName} Sector ${sector}` : baseName,
      zone,
      aqi,
      level: getLevelFromAqi(aqi),
      metrics: generateMetrics(aqi),
      trend24h: Array.from({ length: 12 }, () => Math.max(12, aqi + Math.floor(Math.random() * 50) - 25)),
      history30d: generateHistory(aqi),
      sources: [
        { category: 'Vehicles', percentage: 38 + Math.random() * 8 },
        { category: 'Construction', percentage: 22 + Math.random() * 6 },
        { category: 'Waste Burning', percentage: 18 + Math.random() * 10 },
        { category: 'Industry', percentage: 12 + Math.random() * 5 }
      ],
      rankOverall: 0,
      rankZone: 0,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      yoyChange: Number((Math.random() * 25 - 10).toFixed(1)),
      confidence: Math.random() > 0.15 ? 'High' : 'Medium'
    });
  }

  // Assign Ranks
  const sorted = [...wards].sort((a, b) => a.aqi - b.aqi);
  sorted.forEach((w, i) => { w.rankOverall = i + 1; });
  
  zones.forEach(z => {
    const zw = wards.filter(w => w.zone === z).sort((a, b) => a.aqi - b.aqi);
    zw.forEach((w, i) => { w.rankZone = i + 1; });
  });

  return wards;
};

export const WARDS = generateWards();
export const ZONE_NAMES = Object.values(Zone);
