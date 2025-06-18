import type { FastifyTypedInstance } from '../config/app.config';

import { createValidator, getAllFilteredValidator } from '../validators/air-quality.validator';
import { AirQualityRepository } from '../repositories/air-quality.repository';
import { AirQualityController } from '../controllers/air-quality.controller';
import { AirQualityService } from '../services/air-quality.service';
import { prisma } from '../lib/database/prisma.database';

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
    '/air-quality/get-all-filtered',
    getAllFilteredValidator,
    airQualityController.getAllFiltered.bind(airQualityController)
  );
};
