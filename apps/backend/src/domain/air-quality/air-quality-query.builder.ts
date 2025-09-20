import type { Prisma } from '@prisma/client';

import type { AirQualityQuery } from './air-quality.type';

export class AirQualityQueryBuilder {
  private where: Prisma.AirQualityMeasurementWhereInput = {};
  constructor(private query: AirQualityQuery) {}

  private filterByTemperature() {
    const { minTemperature, maxTemperature } = this.query;

    if (minTemperature !== null || maxTemperature !== null) {
      this.where.temperature = {};

      if (minTemperature !== null) {
        this.where.temperature.gte = minTemperature;
      }

      if (maxTemperature !== null) {
        this.where.temperature.lte = maxTemperature;
      }
    }
  }

  private filterByTimestamp() {
    const { startTimestamp, endTimestamp } = this.query;

    if (startTimestamp || endTimestamp) {
      this.where.timestamp = {};

      if (startTimestamp) {
        this.where.timestamp.gte = startTimestamp;
      }

      if (endTimestamp) {
        this.where.timestamp.lte = endTimestamp;
      }
    }
  }

  public build() {
    this.filterByTimestamp();
    this.filterByTemperature();
    return this.where;
  }
}
