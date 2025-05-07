import { readFileSync } from 'fs';
import { join } from 'path';

export function readFileContent(filePath: string) {
  try {
    const content = readFileSync(join(__dirname, filePath), 'utf-8').trim();
    if (!content) throw new Error(`${filePath} file is empty or invalid`);
    return content;
  } catch (err) {
    console.warn(err);
    return null;
  }
}
