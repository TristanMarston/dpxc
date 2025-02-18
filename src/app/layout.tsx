import type { Metadata } from 'next';
import { Unbounded } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const unbounded = Unbounded({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DPXC',
    description: "Let's go Chargers! Running is funning!",
    icons: {
        icon: [
            {
                url: '/dpxclogo-blue.jpg',
                href: '/dpxclogo-blue.jpg',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${unbounded.className} overflow-x-hidden h-screen w-screen p-0 bg-background`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
