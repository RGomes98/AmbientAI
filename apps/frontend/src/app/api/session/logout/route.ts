import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { HttpException } from '@/lib/error/http.error';

export async function GET(request: NextRequest) {
  try {
    const cookie = await cookies();
    cookie.delete('access_token');
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error(error);
    const { message, statusCode } = HttpException.from(error);
    return NextResponse.json(message, { status: statusCode });
  }
}
