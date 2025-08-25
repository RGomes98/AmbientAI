import type { FastifyTypedInstance } from '../config/app.config';

import { AirQualityRepository } from '../repositories/air-quality.repository';
import { AirQualityController } from '../controllers/air-quality.controller';
import { AirQualityService } from '../services/air-quality.service';
import { prisma } from '../lib/database/prisma.database';

import {
  createValidator,
  getLatestValidator,
  getAllFilteredValidator,
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
    '/air-quality/get-latest',
    getLatestValidator,
    airQualityController.getLatest.bind(airQualityController)
  );
  instance.get(
    '/air-quality/get-all-filtered',
    getAllFilteredValidator,
    airQualityController.getAllFiltered.bind(airQualityController)
  );
};
