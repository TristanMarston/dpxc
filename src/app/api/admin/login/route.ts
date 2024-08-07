import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const adminUsername = process.env.ADMIN_USERNAME!;
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH!;
const jwtSecret = process.env.JWT_SECRET!;

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		if (username === adminUsername && bcrypt.compareSync(password, adminPasswordHash)) {
			const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
			const response = NextResponse.json({ success: true });
			response.cookies.set('admin-auth', token, {
				httpOnly: true,
				secure: true,
				path: '/',
				sameSite: 'strict',
				maxAge: 1800,
			});
			console.log('Authentication Successful, Token: ', token);
			return response;
		} else {
			console.log('Authentication Failed');
			return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
		}
	} catch (e) {
		console.log('error:', e);
		return NextResponse.json({ message: e }, { status: 500 });
	}
}
