import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        const response = await axios.post(`${process.env.API_URL}/messages`, formData, {
            headers: {
                'x-api-key': process.env.API_KEY,
            },
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error sending message' }, { status: error.response?.status || 500 });
    }
}
