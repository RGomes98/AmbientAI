import type { Prisma, PrismaClient } from '@prisma/client';

import { AirQualityCreate } from '../domain/air-quality/air-quality.type';

export class AirQualityRepository {
  constructor(private db: PrismaClient) {}

  public async createMany(data: AirQualityCreate[]) {
    return await this.db.airQualityMeasurement.createManyAndReturn({ data });
  }

  public async findLatest() {
    return await this.db.airQualityMeasurement.findFirst({ orderBy: { timestamp: 'desc' } });
  }

  public async findManyFiltered(whereClause: Prisma.AirQualityMeasurementWhereInput, take?: number) {
    return await this.db.airQualityMeasurement.findMany({
      take,
      where: whereClause,
      orderBy: { timestamp: 'desc' },
    });
  }

  public async getWeeklyAverages(startDate: Date, endDate: Date) {
    return this.db.airQualityMeasurement.aggregate({
      where: { timestamp: { gte: startDate, lte: endDate } },
      _avg: {
        temperature: true,
        tempCompensated: true,
        humidity: true,
        humCompensated: true,
        pm01: true,
        pm02: true,
        pm10: true,
        pm003Count: true,
        co2: true,
        tvocIndex: true,
        tvocRaw: true,
        noxIndex: true,
        noxRaw: true,
      },
    });
  }
}
