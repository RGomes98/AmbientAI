import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ENV } from '@/env';

export async function GET(_request: NextRequest) {
  try {
    const url = new URL(`${ENV.SERVER_URL}/auth/login`);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: 'email@example.com', password: 'RandomPassword123_' }),
    });

    if (!response.ok) {
      throw new Error(`Failed authenticate user: ${response.statusText}`);
    }

    const data = await response.json(); //Add validation
    const cookie = await cookies();
    cookie.set('access_token', data.access_token, { httpOnly: true, maxAge: 86400 }); //Extract
    return NextResponse.json('logged-in');
  } catch (error) {
    console.error(error);
    return NextResponse.json('unauthorized');
  }
}
