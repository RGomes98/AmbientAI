import z from 'zod';

export const SessionSchema = z.object({
  email: z.email(),
  role: z.enum(['DEVICE_WRITER', 'ADMIN', 'VIEWER']),
});

export const LoginPayloadSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const TokenPayloadSchema = z.object({
  access_token: z.jwt(),
  token_type: z.literal('Bearer'),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;
export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type Session = z.infer<typeof SessionSchema>;
