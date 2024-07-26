import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdmin = request.cookies.get('admin-auth')?.value === 'true';

    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login' && !isAdmin) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin' && isAdmin) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
