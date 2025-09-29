'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import { NavLink } from '@/app/context';
import MenuItemsLaptop from './MenuItemsLaptop';
import MenuToggle from './MenuToggle';
import Link from 'next/link';
import axios from 'axios';

const navLinks: NavLink[] = [
    {
        title: 'DPI Signup',
        href: '#',
        isDropdown: true,
        dropdownOptions: [
            {
                title: 'Community Race',
                href: '/dpi/signup?race=community',
                description: 'Take part in our community race!',
            },
            {
                title: 'Youth Race',
                href: '/dpi/signup?race=youth',
                description: 'Sign up a little one to race!',
            },
        ],
    },
    {
        title: 'Contact Us',
        href: '#contact',
        isDropdown: false,
        dropdownOptions: [],
    },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [links, setLinks] = useState<NavLink[]>(navLinks);

    // useEffect(() => {
    //     if (links.length === 0) {
    //         axios
    //             .get('/api/admin/fetch/collections/navbar')
    //             .then((res) => {
    //                 if (res.status === 200 || res.status === 201) {
    //                     setLinks(() => {
    //                         const ret: NavLink[] = [];
    //                         res.data.data.forEach((item: any) => {
    //                             const obj: NavLink = { title: '', href: '', isDropdown: false };
    //                             obj.title = item.title;
    //                             obj.href = item.href;
    //                             obj.isDropdown = item.isDropdown;
    //                             obj.dropdownOptions = [...item.dropDownOptions];
    //                             ret.push(obj);
    //                         });
    //                         return ret;
    //                     });
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //     }
    // }, []);

    return (
        <>
            <section className='w-screen fixed top-0 backdrop-blur-sm px-5 taptop:px-7 z-[60]'>
                <motion.nav
                    animate={isOpen ? 'open' : 'closed'}
                    className='w-full sticky mt-5 bg-background-light h-[60px] rounded-full text-secondary shadow-[0_4px_30px_rgba(0,0,0,.4)] pl-2 pr-3 flex items-center justify-between'
                >
                    <Link href='/' className='max-w-[60px] w-full h-full relative'>
                        <Image src={'/dpxclogo.png'} alt='logo' width={60} height={60} />
                        {/* <Image src={'/dpxclogo.png'} alt='logo' quality={100} className='w-full h-auto object-contain' fill priority sizes='100%' /> */}
                    </Link>
                    <MenuToggle toggle={() => setIsOpen((prev) => !prev)} isOpen={isOpen} color={isOpen ? '#00295E' : '#FFD500'} />
                    <MenuItemsLaptop links={links} />
                </motion.nav>
            </section>
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
        </>
    );
};

export default Navbar;
