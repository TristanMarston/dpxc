import type { Metadata } from 'next';
import { Lexend_Mega } from 'next/font/google';
import './globals.css';

const fredoka = Lexend_Mega({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DPXC',
    description: 'Dos Pueblos High School - Cross Country',
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
            <body className={`${fredoka.className} min-h-screen min-w-screen p-0 mx-5 bg-background`}>{children}</body>
        </html>
    );
}
