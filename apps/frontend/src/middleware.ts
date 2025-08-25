import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUser } from './services/auth.service';

const PROTECTED_ROUTES = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAtProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const token = request.cookies.get('access_token')?.value;

  if (!isAtProtectedRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isAtProtectedRoute) {
    const user = await getCurrentUser();

    if (!user) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('access_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
