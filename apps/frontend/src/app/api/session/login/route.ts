import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ENV } from '@/env';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(`${ENV.SERVER_URL}/auth/login`);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: 'email@example.com', password: 'RandomPassword123_' }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Failed authenticate user: ${message}`);
    }

    const data = await response.json();
    const cookie = await cookies();
    cookie.set('access_token', data.access_token, { httpOnly: true, maxAge: 86400 });
    return NextResponse.json('logged-in');
  } catch (error) {
    console.error(error);
    return NextResponse.json('unauthorized');
  }
}
