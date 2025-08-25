import z from 'zod';

export const SessionSchema = z.object({
  email: z.email(),
  role: z.enum(['DEVICE_WRITER', 'ADMIN', 'VIEWER']),
});

export type Session = z.infer<typeof SessionSchema>;
