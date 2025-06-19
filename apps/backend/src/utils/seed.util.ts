import type { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '../lib/database/prisma.database';

type TimestampGenerationOptions = {
  count: number;
  from: Date;
  to?: Date;
};

type ModelName = {
  [Model in keyof PrismaClient]: PrismaClient[Model] extends { createMany: Function } ? Model : never;
}[keyof PrismaClient];

type CreateManyData<T extends ModelName> =
  Prisma.Args<PrismaClient[T], 'createMany'> extends { data: infer D } ? D : never;

export class Seed {
  public static generateUniqueTimestamps(options: TimestampGenerationOptions) {
    const { count, from, to = new Date() } = options;

    const startTime = from.getTime();
    const endTime = to.getTime();

    if (startTime > endTime) {
      throw new Error("The 'from' date cannot be after the 'to' date.");
    }

    const availableSeconds = Math.floor((endTime - startTime) / 1000);

    if (count > availableSeconds) {
      throw new Error(`Requested count (${count}) exceeds available seconds in range (${availableSeconds}).`);
    }

    const uniqueTimestamps = new Set<number>();
    const timeRange = endTime - startTime;

    while (uniqueTimestamps.size < count) {
      const randomTime = startTime + Math.random() * timeRange;
      const secondValue = Math.floor(randomTime / 1000) * 1000;
      uniqueTimestamps.add(secondValue);
    }

    return Array.from(uniqueTimestamps).map((timestamp) => new Date(timestamp));
  }

  public static async populate<T extends ModelName>(modelName: T, data: CreateManyData<T>) {
    const model = prisma[modelName];

    try {
      const result = await (model as any).createMany({ data });
      console.log(`Created ${result.count} new records in ${modelName}.`);
    } catch (error) {
      console.error(`Error creating records in ${modelName}.`);
      throw error;
    }
  }
}
