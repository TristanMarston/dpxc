'use client';

import { Dela_Gothic_One } from 'next/font/google';
import { useEffect, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';

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

export interface MessageForm {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

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

export const displayToast = (success: boolean, message: string, className?: string) => {
    const settings: Partial<Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'>> = {
        duration: 20000,
        position: 'bottom-right',
        className: `!bg-secondary-light !text-black ${className}`,
    };

    if (success) toast.success(message, settings);
    else toast.error(message, settings);
};

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
