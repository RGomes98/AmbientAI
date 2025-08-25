import type { Prisma, PrismaClient } from '@prisma/client';
import { AirQualityCreate } from '../domain/air-quality/air-quality.type';

export class AirQualityRepository {
  constructor(private db: PrismaClient) {}

  public async createMany(data: AirQualityCreate[]) {
    return await this.db.airQualityMeasurement.createManyAndReturn({ data });
  }

  public async findManyFiltered(whereClause: Prisma.AirQualityMeasurementWhereInput) {
    return await this.db.airQualityMeasurement.findMany({
      where: whereClause,
      orderBy: { timestamp: 'asc' },
    });
  }
}
