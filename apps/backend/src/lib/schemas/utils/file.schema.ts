import { z } from 'zod';

export const VersionSchema = z.string().regex(new RegExp(/^v?\d+\.\d+\.\d+$/));
