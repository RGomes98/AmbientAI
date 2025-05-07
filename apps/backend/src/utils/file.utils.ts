import { readFileSync } from 'fs';
import { join } from 'path';
import { VersionSchema } from '../schemas/utils/file.schema';

function readFileContent(relativePath: string) {
  try {
    const fullPath = join(__dirname, relativePath);
    const content = readFileSync(fullPath, 'utf-8').trim();

    if (!content) throw new Error(`${relativePath} file is empty or invalid`);
    return content;
  } catch (err) {
    console.warn(`Failed to read file "${relativePath}":`, err);
    return null;
  }
}

function readPackageVersion() {
  try {
    const pkgPath = join(process.cwd(), 'package.json');
    const rawContent = readFileSync(pkgPath, 'utf-8').trim();

    const version = VersionSchema.safeParse(JSON.parse(rawContent)?.version);
    if (!version.success) throw new Error("Invalid semantic version in 'package.json'");

    return version.data;
  } catch (err) {
    console.warn(err);
    return null;
  }
}

export { readFileContent, readPackageVersion };
