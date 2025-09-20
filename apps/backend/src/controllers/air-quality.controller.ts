import type { FastifyReply, FastifyRequest } from 'fastify';

import type { AirQualityService } from '../services/air-quality.service';
import { AirQualityValueObject } from '../domain/air-quality/air-quality.value-object';

export class AirQualityController {
  constructor(private service: AirQualityService) {}

  public async create(request: FastifyRequest, reply: FastifyReply) {
    const data = await this.service.createAirQualityEntries(AirQualityValueObject.validate(request.body));
    return reply.status(201).send(data);
  }

  public async filtered(request: FastifyRequest, reply: FastifyReply) {
    const data = await this.service.getAllAirQualityEntries(request.query);
    return reply.status(200).send(data);
  }

  public async latest(_request: FastifyRequest, reply: FastifyReply) {
    const data = await this.service.getLatestAirQualityEntry();
    return reply.status(200).send(data);
  }

  public async average(_request: FastifyRequest, reply: FastifyReply) {
    const data = await this.service.getWeeklyComparison();
    return reply.status(200).send(data);
  }
}
