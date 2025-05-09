import type { Schema } from 'zod';
import { readFileSync } from 'fs';
import { join } from 'path';

export const readFileContent = <T>(
  fileName: string,
  schema: Schema<T>,
  JSONSelector?: (json: any) => any
) => {
  try {
    const path = join(process.cwd(), fileName);
    const content = readFileSync(path, 'utf-8').trim();

    const value = typeof JSONSelector === 'function' ? JSONSelector(JSON.parse(content)) : content;
    const result = schema.safeParse(value);

    if (!result.success) throw new Error(`${fileName} file is empty or invalid`);
    return result.data;
  } catch (err) {
    console.warn(`Failed to read file "${fileName}": ${err}`);
    return null;
  }
};
