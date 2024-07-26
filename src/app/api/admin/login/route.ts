import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { username, password } = await request.json();
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
        const response = NextResponse.json({ success: true });
        response.cookies.set('admin-auth', 'true', { httpOnly: true, path: '/' });
        return response;
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
