import type { Schema } from 'zod';
import { readFileSync } from 'fs';
import { join } from 'path';

export class File {
  public static readContent<T>(filePath: string, fileSchema: Schema<T>, JSONSelector?: (json: any) => any) {
    try {
      const fullPath = join(process.cwd(), filePath);
      const rawFile = readFileSync(fullPath, 'utf-8').trim();

      const content = JSONSelector ? JSONSelector(JSON.parse(rawFile)) : rawFile;
      const result = fileSchema.safeParse(content);

      if (!result.success) {
        const error = result.error.format()._errors.at(0) ?? 'Schema validation failed';
        throw new Error(`"${filePath}" does not match expected format. ${error}.`);
      }

      return result.data;
    } catch (error) {
      console.warn(`Failed to read or parse "${filePath}".`, error);
      return null;
    }
  }
}
