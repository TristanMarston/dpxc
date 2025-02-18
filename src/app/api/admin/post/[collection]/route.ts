import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { collection: string } }) {
    const { collection } = params;
    const data = await request.json();
    
    if (Object.keys(data).length === 0) return NextResponse.json({ message: 'Please provide body.' }, { status: 500 });
    if (collection === null || collection.length === 0) return NextResponse.json({ message: 'Please provide collection.' }, { status: 500 });

    try {
        const response = await axios.post(`${process.env.API_URL}/${collection}`, data, {
            headers: {
                'x-api-key': process.env.API_KEY,
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error posting document.' }, { status: error.response?.status ?? 500 });
    }
}
