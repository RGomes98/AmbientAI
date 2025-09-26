import { AirQuality } from '@/lib/schemas/air-quality.schema';

const aqiBreakpoints = {
  pm25: [
    { low: 0.0, high: 12.0, iLow: 0, iHigh: 50 },
    { low: 12.1, high: 35.4, iLow: 51, iHigh: 100 },
    { low: 35.5, high: 55.4, iLow: 101, iHigh: 150 },
    { low: 55.5, high: 150.4, iLow: 151, iHigh: 200 },
    { low: 150.5, high: 250.4, iLow: 201, iHigh: 300 },
    { low: 250.5, high: 350.4, iLow: 301, iHigh: 400 },
    { low: 350.5, high: 500.4, iLow: 401, iHigh: 500 },
  ],
  pm10: [
    { low: 0, high: 54, iLow: 0, iHigh: 50 },
    { low: 55, high: 154, iLow: 51, iHigh: 100 },
    { low: 155, high: 254, iLow: 101, iHigh: 150 },
    { low: 255, high: 354, iLow: 151, iHigh: 200 },
    { low: 355, high: 424, iLow: 201, iHigh: 300 },
    { low: 425, high: 504, iLow: 301, iHigh: 400 },
    { low: 505, high: 604, iLow: 401, iHigh: 500 },
  ],
};

function calculateSubAqi(pollutant: 'pm25' | 'pm10', concentration: number) {
  const breakpoints = aqiBreakpoints[pollutant];
  const breakpoint = breakpoints.find((b) => concentration >= b.low && concentration <= b.high);

  if (!breakpoint) {
    if (concentration > breakpoints[breakpoints.length - 1].high) {
      return breakpoints[breakpoints.length - 1].iHigh;
    }

    return 0;
  }

  const { low, high, iLow, iHigh } = breakpoint;
  const aqi = ((iHigh - iLow) / (high - low)) * (concentration - low) + iLow;
  return Math.round(aqi);
}

function getAqiCategory(aqi: number) {
  if (aqi <= 50) return 'Bom';
  if (aqi <= 100) return 'Moderado';
  if (aqi <= 150) return 'Ruim';
  if (aqi <= 200) return 'Insalubre';
  if (aqi <= 300) return 'Muito Insalubre';
  return 'Perigoso';
}

export function calculateAqi(airQualityData: AirQuality) {
  const aqiPm25 = calculateSubAqi('pm25', airQualityData.pm02Standard);
  const aqiPm10 = calculateSubAqi('pm10', airQualityData.pm10Standard);

  const finalAqi = Math.max(aqiPm25, aqiPm10);
  const category = getAqiCategory(finalAqi);

  return {
    aqi: finalAqi,
    category: category,
  };
}
