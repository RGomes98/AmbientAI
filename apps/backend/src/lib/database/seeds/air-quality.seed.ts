import { readFileSync } from 'fs';
import { join } from 'path';

import { AirQualityValueObject } from '../../../domain/air-quality/air-quality.value-object';
import { Seed } from '../../../utils/seed.util';
import { prisma } from '../prisma.database';
import { ENV } from '../../../env';

async function seed() {
  console.info('🌱 Starting the air quality data seeding process...');

  const isProd = ENV.NODE_ENV === 'production';
  const basePath = isProd ? join(process.cwd(), 'dist') : process.cwd();
  const filePath = join(basePath, 'src/data/mock_air_quality.json');
  const rawData = readFileSync(filePath, 'utf-8');

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const parsedData = AirQualityValueObject.validateMock(JSON.parse(rawData));
  const timestamps = Seed.generateUniqueTimestamps({
    count: parsedData.length,
    from: startOfYear,
    to: now,
  });

  const data = parsedData.map((entry, index) => ({ ...entry, timestamp: timestamps[index] }));
  await Seed.populate('airQualityMeasurement', data);

  console.info('✅ Air quality data successfully generated!');
}

(async () => {
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
