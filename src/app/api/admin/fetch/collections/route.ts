import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const response = await axios.get(`${process.env.API_URL}/allCollections`, {
            headers: {
                'x-api-key': process.env.API_KEY,
            },
        });

        console.log(response);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error fetching collections.' }, { status: error.response?.status ?? 500 });
    }
}