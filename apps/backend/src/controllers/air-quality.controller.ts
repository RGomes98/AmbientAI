import type { FastifyReply, FastifyRequest } from 'fastify';

import type { AirQualityCreate } from '../domain/air-quality/air-quality.type';
import type { AirQualityService } from '../services/air-quality.service';
import type { ApiKeyHeaders } from '../domain/api-key/api-key.type';

export class AirQualityController {
  constructor(private service: AirQualityService) {}

  public async create(
    request: FastifyRequest<{ Headers: ApiKeyHeaders; Body: AirQualityCreate[] }>,
    reply: FastifyReply
  ) {
    const data = await this.service.createAirQualityEntries(request.body);
    return reply.status(201).send(data);
  }

  public async getAllFiltered(request: FastifyRequest, reply: FastifyReply) {
    const data = await this.service.getAllAirQualityEntries(request.query);
    return reply.status(200).send(data);
  }
}
