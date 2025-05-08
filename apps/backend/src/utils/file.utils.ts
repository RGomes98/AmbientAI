import { readFileSync } from 'fs';
import { join } from 'path';
import { VersionSchema } from '../schemas/utils/file.schema';

const readFileContent = (path: string) => {
  try {
    const content = readFileSync(join(process.cwd(), path), 'utf-8').trim();
    if (!content) throw new Error(`${path} file is empty or invalid`);
    return content;
  } catch (err) {
    console.warn(`Failed to read file "${path}": ${err}`);
    return null;
  }
};

function readPackageVersion() {
  try {
    const json = readFileSync(join(process.cwd(), 'vercel.json'), 'utf-8').trim();
    const version = VersionSchema.safeParse(JSON.parse(json).env?.VERSION);
    if (!version.success) throw new Error("Invalid semantic version in 'package.json'");
    return version.data;
  } catch (err) {
    console.warn(err);
    return null;
  }
}

export { readFileContent, readPackageVersion };
