import { subDays } from 'date-fns';

import type { AirQualityRepository } from '../repositories/air-quality.repository';
import { AirQualityQueryBuilder } from '../domain/air-quality/air-quality-query.builder';
import { AirQualityValueObject } from '../domain/air-quality/air-quality.value-object';
import { AirQualityCreateSchema } from '../domain/air-quality/air-quality.schema';

export class AirQualityService {
  constructor(private repository: AirQualityRepository) {}

  public async createAirQualityEntries(data: unknown) {
    const parsed = AirQualityCreateSchema.array().parse(data);
    return await this.repository.createMany(parsed);
  }

  public async getLatestAirQualityEntry() {
    return await this.repository.findLatest();
  }

  public async getAllAirQualityEntries(queryString: unknown) {
    const query = AirQualityValueObject.validateQuery(queryString);
    const filterBuilder = new AirQualityQueryBuilder(query);
    const whereClause = filterBuilder.build();
    return await this.repository.findManyFiltered(whereClause, query.take);
  }

  public async getWeeklyComparison() {
    const today = new Date();

    const startOfThisWeek = subDays(today, 7);
    const endOfThisWeek = today;

    const startOfLastWeek = subDays(today, 14);
    const endOfLastWeek = subDays(today, 7);

    const thisWeekAvgPromise = this.repository.getWeeklyAverages(startOfThisWeek, endOfThisWeek);
    const lastWeekAvgPromise = this.repository.getWeeklyAverages(startOfLastWeek, endOfLastWeek);

    const [lastWeekAvg, thisWeekAvg] = await Promise.all([lastWeekAvgPromise, thisWeekAvgPromise]);
    return { lastWeekAvg: lastWeekAvg._avg, thisWeekAvg: thisWeekAvg._avg };
  }
}
