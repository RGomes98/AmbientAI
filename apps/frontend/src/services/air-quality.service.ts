import { ENV } from '@/env';
import { AirQualitySchema, AirQualityWeeklyComparisonSchema } from '@/lib/schemas/air-quality.schema';
import { Query } from '@/utils/query.util';
import { Session } from '@/utils/session.util';

export async function getLatestAirQuality() {
  try {
    const token = await Session.getAuthorizationToken('access_token');

    if (!token) {
      throw new Error('Unauthorized.');
    }

    const response = await fetch(new URL(`${ENV.SERVER_URL}/air-quality/latest`), {
      method: 'GET',
      headers: { Authorization: Session.generateAuthorizationHeaders(token) },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Failed to fetch air quality data: ${message}`);
    }

    return AirQualitySchema.parse(await response.json());
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFilteredAirQuality(query: Record<string, string>) {
  try {
    const token = await Session.getAuthorizationToken('access_token');

    if (!token) {
      throw new Error('Unauthorized.');
    }

    const url = Query.mutateParamsToURL({
      params: query,
      type: 'append',
      url: `${ENV.SERVER_URL}/air-quality/filtered`,
    });

    if (!url) {
      throw new Error('Malformed URL at ``getFilteredAirQuality` service.');
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: Session.generateAuthorizationHeaders(token) },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Failed to fetch air quality data: ${message}`);
    }

    return AirQualitySchema.array().parse(await response.json());
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getWeeklyAverages() {
  try {
    const token = await Session.getAuthorizationToken('access_token');

    if (!token) {
      throw new Error('Unauthorized.');
    }

    const response = await fetch(new URL(`${ENV.SERVER_URL}/air-quality/average`), {
      method: 'GET',
      headers: { Authorization: Session.generateAuthorizationHeaders(token) },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Failed to fetch air quality weekly average: ${message}`);
    }

    return AirQualityWeeklyComparisonSchema.parse(await response.json());
  } catch (error) {
    console.error(error);
    return null;
  }
}
