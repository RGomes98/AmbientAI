import type { AirQualityRepository } from '../repositories/air-quality.repository';
import type { AirQualityCreate } from '../domain/air-quality/air-quality.type';
import { AirQualityQueryBuilder } from '../domain/air-quality/air-quality-query.builder';
import { AirQualityValueObject } from '../domain/air-quality/air-quality.value-object';

export class AirQualityService {
  constructor(private repository: AirQualityRepository) {}

  public async createAirQualityEntries(data: AirQualityCreate[]) {
    return await this.repository.createMany(data);
  }

  public async getAllAirQualityEntries(queryString: unknown) {
    const query = AirQualityValueObject.validateQuery(queryString);
    const filterBuilder = new AirQualityQueryBuilder(query);
    const whereClause = filterBuilder.build();
    return await this.repository.findManyFiltered(whereClause);
  }
}
