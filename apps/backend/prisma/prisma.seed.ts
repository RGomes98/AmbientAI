import { readFileSync } from 'fs';
import { join } from 'path';

import { AirQualityCreateSchema } from '../src/domain/air-quality/air-quality.schema';
import { prisma } from '../src/lib/database/prisma.database';
import { Seed } from '../src/utils/seed.util';

async function airQualityMeasurementSeed() {
  const filePath = join(process.cwd(), 'src', 'data', 'mock_air_quality.json');
  const rawData = readFileSync(filePath, 'utf-8');

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const parsedData = AirQualityCreateSchema.array().parse(JSON.parse(rawData));

  const timestamps = Seed.generateUniqueTimestamps({
    count: parsedData.length,
    from: startOfYear,
    to: now,
  });

  const data = parsedData.map((entry, index) => ({ ...entry, timestamp: timestamps[index] }));
  await Seed.populate('airQualityMeasurement', data);
}

(async () => {
  try {
    await airQualityMeasurementSeed();
    console.info('Seeding completed successfully!');
  } catch (error) {
    console.error('An error occurred during the seeding process:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.info('Prisma client disconnected.');
  }
})();
