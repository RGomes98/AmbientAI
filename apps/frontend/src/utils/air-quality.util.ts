export type AirQualityData = {
  pm25?: number | null;
  pm10?: number | null;
  co?: number | null;
  so2?: number | null;
  no2?: number | null;
};

export type AqiResult = {
  aqi: number;
  category: string;
  dominantPollutant: keyof AirQualityData | 'N/A';
  individualAqi: {
    [key in keyof AirQualityData]?: number;
  };
};

type Breakpoint = {
  low: number;
  high: number;
  aqiLow: number;
  aqiHigh: number;
};

const breakpoints: { [key in keyof Required<AirQualityData>]: Breakpoint[] } = {
  pm25: [
    { low: 0.0, high: 12.0, aqiLow: 0, aqiHigh: 50 },
    { low: 12.1, high: 35.4, aqiLow: 51, aqiHigh: 100 },
    { low: 35.5, high: 55.4, aqiLow: 101, aqiHigh: 150 },
    { low: 55.5, high: 150.4, aqiLow: 151, aqiHigh: 200 },
    { low: 150.5, high: 250.4, aqiLow: 201, aqiHigh: 300 },
    { low: 250.5, high: 500.4, aqiLow: 301, aqiHigh: 500 },
  ],
  pm10: [
    { low: 0, high: 54, aqiLow: 0, aqiHigh: 50 },
    { low: 55, high: 154, aqiLow: 51, aqiHigh: 100 },
    { low: 155, high: 254, aqiLow: 101, aqiHigh: 150 },
    { low: 255, high: 354, aqiLow: 151, aqiHigh: 200 },
    { low: 355, high: 424, aqiLow: 201, aqiHigh: 300 },
    { low: 425, high: 604, aqiLow: 301, aqiHigh: 500 },
  ],
  co: [
    { low: 0.0, high: 4.4, aqiLow: 0, aqiHigh: 50 },
    { low: 4.5, high: 9.4, aqiLow: 51, aqiHigh: 100 },
    { low: 9.5, high: 12.4, aqiLow: 101, aqiHigh: 150 },
    { low: 12.5, high: 15.4, aqiLow: 151, aqiHigh: 200 },
    { low: 15.5, high: 30.4, aqiLow: 201, aqiHigh: 300 },
    { low: 30.5, high: 50.4, aqiLow: 301, aqiHigh: 500 },
  ],
  so2: [
    { low: 0, high: 35, aqiLow: 0, aqiHigh: 50 },
    { low: 36, high: 75, aqiLow: 51, aqiHigh: 100 },
    { low: 76, high: 185, aqiLow: 101, aqiHigh: 150 },
    { low: 186, high: 304, aqiLow: 151, aqiHigh: 200 },

    { low: 305, high: 604, aqiLow: 201, aqiHigh: 300 },
  ],
  no2: [
    { low: 0, high: 53, aqiLow: 0, aqiHigh: 50 },
    { low: 54, high: 100, aqiLow: 51, aqiHigh: 100 },
    { low: 101, high: 360, aqiLow: 101, aqiHigh: 150 },
    { low: 361, high: 649, aqiLow: 151, aqiHigh: 200 },
    { low: 650, high: 1249, aqiLow: 201, aqiHigh: 300 },
    { low: 1250, high: 2049, aqiLow: 301, aqiHigh: 500 },
  ],
};

const getAqiCategory = (aqi: number): string => {
  if (aqi <= 50) return 'Boa';
  if (aqi <= 100) return 'Moderada';
  if (aqi <= 150) return 'Insalubre para Grupos Sensíveis';
  if (aqi <= 200) return 'Insalubre';
  if (aqi <= 300) return 'Muito Insalubre';
  return 'Perigosa';
};

export function calculateAqi(data: AirQualityData): AqiResult {
  const individualAqi: { [key in keyof AirQualityData]?: number } = {};

  for (const key in data) {
    const pollutant = key as keyof AirQualityData;
    const concentration = data[pollutant];

    if (concentration === null || concentration === undefined) {
      continue;
    }

    const pollutantBreakpoints = breakpoints[pollutant];
    const breakpoint = pollutantBreakpoints.find((bp) => concentration >= bp.low && concentration <= bp.high);

    if (breakpoint) {
      const { low: bpLow, high: bpHigh, aqiLow: iLow, aqiHigh: iHigh } = breakpoint;
      const subIndex = ((iHigh - iLow) / (bpHigh - bpLow)) * (concentration - bpLow) + iLow;
      individualAqi[pollutant] = Math.round(subIndex);
    }
  }

  let finalAqi = 0;
  let dominantPollutant: keyof AirQualityData | 'N/A' = 'N/A';

  for (const key in individualAqi) {
    const pollutant = key as keyof AirQualityData;
    const aqiValue = individualAqi[pollutant];
    if (aqiValue && aqiValue > finalAqi) {
      finalAqi = aqiValue;
      dominantPollutant = pollutant;
    }
  }

  return {
    aqi: finalAqi,
    category: getAqiCategory(finalAqi),
    dominantPollutant,
    individualAqi,
  };
}
