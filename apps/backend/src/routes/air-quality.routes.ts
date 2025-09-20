import type { FastifyTypedInstance } from '../config/app.config';

import { AirQualityRepository } from '../repositories/air-quality.repository';
import { AirQualityController } from '../controllers/air-quality.controller';
import { AirQualityService } from '../services/air-quality.service';
import { prisma } from '../lib/database/prisma.database';

import {
  createValidator,
  latestValidator,
  filteredValidator,
  averageValidator,
} from '../validators/air-quality.validator';

const airQualityRepository = new AirQualityRepository(prisma);
const airQualityService = new AirQualityService(airQualityRepository);
const airQualityController = new AirQualityController(airQualityService);

export const airQuality = async (instance: FastifyTypedInstance) => {
  instance.post(
    '/air-quality/create',
    createValidator,
    airQualityController.create.bind(airQualityController)
  );
  instance.get(
    '/air-quality/latest',
    latestValidator,
    airQualityController.latest.bind(airQualityController)
  );
  instance.get(
    '/air-quality/filtered',
    filteredValidator,
    airQualityController.filtered.bind(airQualityController)
  );
  instance.get(
    '/air-quality/average',
    averageValidator,
    airQualityController.average.bind(airQualityController)
  );
};
