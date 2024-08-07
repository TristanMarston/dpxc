import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
	const token = request.cookies.get('admin-auth')?.value;

	if (!token && !request.nextUrl.pathname.startsWith('/admin/login')) {
		return NextResponse.redirect(new URL('/admin/login', request.url));
	}
	if (!request.nextUrl.pathname.startsWith('/admin/login')) {
		try {
			if (token) {
				jwt.verify(token, jwtSecret);
				return NextResponse.next();
			}
			return NextResponse.redirect(new URL('/admin/login', request.url));
		} catch (err) {
			return NextResponse.redirect(new URL('/admin/login', request.url));
		}
	}
}

export const config = {
	matcher: '/admin/:path*',
};
