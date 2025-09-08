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
      orderBy: { timestamp: 'asc' },
    });
  }
}
