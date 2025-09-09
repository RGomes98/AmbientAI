import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { LoginPayloadSchema, TokenPayloadSchema } from '@/lib/schemas/user.schema';
import { AuthenticationError, HttpException } from '@/lib/error/http.error';
import { ENV } from '@/env';

const ONE_DAY_IN_MS = 86400;

export async function POST(request: NextRequest) {
  try {
    const { username, password } = LoginPayloadSchema.parse(await request.json());

    const response = await fetch(new URL(`${ENV.SERVER_URL}/auth/login`), {
      method: 'POST',
      body: new URLSearchParams({ username, password }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new AuthenticationError(message);
    }

    const { access_token } = TokenPayloadSchema.parse(await response.json());
    const cookie = await cookies();
    cookie.set('access_token', access_token, { httpOnly: true, maxAge: ONE_DAY_IN_MS });

    return NextResponse.json('Login realizado com sucesso!', { status: response.status });
  } catch (error) {
    console.error(error);
    const { message, statusCode } = HttpException.from(error);
    return NextResponse.json(message, { status: statusCode });
  }
}
