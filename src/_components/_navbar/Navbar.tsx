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

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [links, setLinks] = useState<NavLink[]>([]);

    useEffect(() => {
        if (links.length === 0) {
            axios
                .get('/api/admin/fetch/collections/navbar')
                .then((res) => {
                    console.log(res);
                    if (res.status === 200 || res.status === 201) {
                        setLinks(() => {
                            const ret: NavLink[] = [];
                            res.data.data.forEach((item: any) => {
                                const obj: NavLink = { title: '', href: '', isDropdown: false };
                                obj.title = item.title;
                                obj.href = item.href;
                                obj.isDropdown = item.isDropdown;
                                obj.dropdownOptions = [...item.dropDownOptions];
                                ret.push(obj);
                            });
                            return ret;
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);

    // const links: NavLink[] = [
    //     {
    //         title: 'Cross Country',
    //         href: '',
    //         isDropdown: true,
    //         dropdownOptions: [
    //             { title: 'New Runners', href: '', isDropdown: false, description: "Let's begin here." },
    //             { title: 'DP Invitational', href: '', isDropdown: false, description: 'Our home XC meet.' },
    //             { title: 'Team Captains', href: '', isDropdown: false, description: 'Meet the best.' },
    //             { title: 'Training Plans', href: '', isDropdown: false, description: 'We work hard.' },
    //         ],
    //     },
    //     {
    //         title: 'Distance Track',
    //         href: '',
    //         isDropdown: true,
    //         dropdownOptions: [
    //             { title: 'Schedule 2025', href: '', isDropdown: false, description: 'Our plan.' },
    //             { title: 'Track Meets', href: '', isDropdown: false, description: 'Where we shine.' },
    //             { title: 'Plan for Week', href: '', isDropdown: false, description: 'What we do.' },
    //             { title: 'Race Day Prep', href: '', isDropdown: false, description: 'How to prepare.' },
    //         ],
    //     },
    //     { title: 'Donate', href: '', isDropdown: false },
    //     { title: 'Volunteer', href: '', isDropdown: false },
    //     { title: 'Our Athletes', href: '', isDropdown: false },
    //     { title: 'Schedule', href: '', isDropdown: false },
    // ];

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
