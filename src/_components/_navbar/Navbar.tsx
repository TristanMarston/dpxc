'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { NavLink } from '@/app/context';
import MenuItemsLaptop from './MenuItemsLaptop';
import MenuToggle from './MenuToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links: NavLink[] = [
        {
            title: 'Cross Country',
            href: '',
            isDropdown: true,
            dropdownOptions: [
                { title: 'New Runners', href: '', isDropdown: false, description: "Let's begin here." },
                { title: 'DP Invitational', href: '', isDropdown: false, description: 'Our home XC meet.' },
                { title: 'Team Captains', href: '', isDropdown: false, description: 'Meet the best.' },
                { title: 'Training Plans', href: '', isDropdown: false, description: 'We work hard.' },
            ],
        },
        {
            title: 'Distance Track',
            href: '',
            isDropdown: true,
            dropdownOptions: [
                { title: 'Schedule 2025', href: '', isDropdown: false, description: 'Our plan.' },
                { title: 'Track Meets', href: '', isDropdown: false, description: 'Where we shine.' },
                { title: 'Plan for Week', href: '', isDropdown: false, description: 'What we do.' },
                { title: 'Race Day Prep', href: '', isDropdown: false, description: 'How to prepare.' },
            ],
        },
        { title: 'Donate', href: '', isDropdown: false },
        { title: 'Volunteer', href: '', isDropdown: false },
        { title: 'Our Athletes', href: '', isDropdown: false },
        { title: 'Schedule', href: '', isDropdown: false },
    ];

    return (
        <>
            <section className='w-screen fixed top-0 backdrop-blur-sm px-5 taptop:px-7 z-[60]'>
                <motion.nav
                    animate={isOpen ? 'open' : 'closed'}
                    className='w-full sticky mt-5 bg-background-light h-[60px] rounded-full text-secondary shadow-[0_4px_30px_rgba(0,0,0,.4)] pl-2 pr-3 flex items-center justify-between'
                >
                    <a href='/'>
                        <Image src={'/dpxclogo.png'} alt='logo' width={60} height={60} />
                    </a>
                    <MenuToggle toggle={() => setIsOpen((prev) => !prev)} isOpen={isOpen} color={isOpen ? '#00295E' : '#FFD500'} />
                    <MenuItemsLaptop links={links} />
                </motion.nav>
            </section>
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
        </>
    );
};

export default Navbar;
