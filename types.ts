
export enum PollutionLevel {
  GOOD = 'Good',
  MODERATE = 'Moderate',
  POOR = 'Poor',
  VERY_POOR = 'Very Poor',
  SEVERE = 'Severe'
}

export interface PollutantData {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
}

export interface WardData {
  id: string;
  name: string;
  number: number;
  aqi: number;
  level: PollutionLevel;
  metrics: PollutantData;
  trend: number[];
  sources: {
    category: string;
    percentage: number;
  }[];
}

export interface ActionRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  icon: string;
}
