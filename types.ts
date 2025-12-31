
export enum PollutionLevel {
  GOOD = 'Good',
  SATISFACTORY = 'Satisfactory',
  MODERATE = 'Moderate',
  POOR = 'Poor',
  VERY_POOR = 'Very Poor',
  SEVERE = 'Severe'
}

export enum Zone {
  NORTH = 'North Delhi',
  SOUTH = 'South Delhi',
  EAST = 'East Delhi',
  WEST = 'West Delhi',
  CENTRAL = 'Central Delhi'
}

export enum AppView {
  HOME = 'home',
  WARDS = 'wards',
  ANALYTICS = 'analytics',
  ACTION = 'action'
}

export interface PollutantData {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  nh3: number;
}

export interface HistoricalDay {
  date: string;
  aqi: number;
  level: PollutionLevel;
}

export interface WardData {
  id: string;
  name: string;
  number: number;
  zone: Zone;
  aqi: number;
  level: PollutionLevel;
  metrics: PollutantData;
  trend24h: number[];
  history30d: HistoricalDay[];
  sources: {
    category: string;
    percentage: number;
  }[];
  rankOverall: number;
  rankZone: number;
  lastUpdated: string;
  yoyChange: number;
  confidence: 'High' | 'Medium' | 'Low';
}
