import axios from 'axios';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: any }) {
    const { collection, id } = params;
    if (collection === null || collection.length === 0 || id === null || id.length === 0) return NextResponse.json({ message: 'Please provide collection and id.' }, { status: 500 });

    try {
        const response = await axios.delete(`${process.env.API_URL}/${collection}/${id}`, {
            headers: {
                'x-api-key': process.env.API_KEY,
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error changing document' }, { status: error.response?.status ?? 500 });
    }
}
