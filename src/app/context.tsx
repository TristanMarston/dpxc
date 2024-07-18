'use client';

import { Dela_Gothic_One } from 'next/font/google';
import { useEffect, useState } from 'react';

export const delaGothic = Dela_Gothic_One({ weight: '400', subsets: ['latin'], display: 'swap' });

export type NavLink = {
    title: string;
    href: string;
    isDropdown: boolean;
    dropdownOptions?: NavLink[];
    description?: string;
};

export type CardType = {
    url: string;
    title: string;
    id: number;
};

export const generateID = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
};

export const itemVariants = (delay: number) => ({
    hidden: { scale: 0.6, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', bounce: 0.25, delay: delay } },
    // hidden: { scale: 1, opacity: 1 },
    // visible: { scale: 1, opacity: 1 },
});

export const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const updateScreenWidth = () => setScreenWidth(window.innerWidth);

        updateScreenWidth();
        window.addEventListener('resize', updateScreenWidth);

        return () => window.removeEventListener('resize', updateScreenWidth);
    }, []);

    return screenWidth;
};
