'use client';

import { NavLink, itemVariants } from '@/app/context';
import Link from 'next/link';
import LinesAnimation from './LinesAnimation';
import AutoscrollCarousel from './Carousel';
import { delaGothic } from '@/app/context';
import { motion } from 'framer-motion';
import { ArrowRight, CircleArrowRight } from 'lucide-react';

const Hero = () => {
    const buttons: NavLink[] = [
        { title: 'Sign Up!', href: '/dpi/signup', isDropdown: false },
        { title: 'Contact Us', href: '#contact', isDropdown: false },
    ];

    return (
        <>
            <motion.div initial='hidden' animate='visible' transition={{ staggerChildren: 0.1 }} className='flex flex-col relative mt-28 gap-16'>
                <div className='flex flex-col gap-5 w-full items-center'>
                    <motion.div variants={itemVariants(2)}>
                        <Link
                            href='/dpi/signup'
                            className='bg-background-lighter rounded-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(255,213,0,0.15)] border border-secondary text-secondary text-xs px-3 py-1 flex gap-1.5 items-center group hover:scale-105 transition-all cursor-pointer'
                        >
                            <span>Sign up to run the Goodland!</span>
                            <CircleArrowRight className='group-hover:translate-x-[2px] transition-all' strokeWidth={1.5} />
                        </Link>
                    </motion.div>
                    <span className='flex justify-center w-full'>
                        <span className='w-[275px] tiny:w-[340px] mobile:w-[400px] tablet:w-[575px] taptop:w-[690px] laptop:w-[850px]'>
                            <LinesAnimation text='THIS IS' offset={0} />
                        </span>
                    </span>
                    <motion.div
                        variants={itemVariants(0.5)}
                        className={`${delaGothic.className} text-2xl text-nowrap tiny:text-[26px] min-[390px]:text-3xl mobile:text-4xl tablet:text-5xl taptop:text-6xl laptop:text-7xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                    >
                        DOS PUEBLOS
                        <br />
                        CROSS COUNTRY
                    </motion.div>
                    <motion.div variants={itemVariants(0.6)} className='flex gap-4 w-full justify-center'>
                        {buttons.map(({ title, href }) => (
                            <Link
                                href={href || '#'}
                                onClick={(e) => {
                                    if (href.startsWith('#')) {
                                        e.preventDefault();
                                        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                key={title}
                                className='px-5 text-nowrap text-center py-1.5 text-xs tiny:text-sm mobile:text-base text-secondary rounded-full border-2 border-secondary shadow-[5px_5px_0_rgba(255,213,0,1)] hover:bg-background-lighter hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all'
                            >
                                {title}
                            </Link>
                        ))}
                    </motion.div>
                </div>

                <AutoscrollCarousel />
            </motion.div>
        </>
    );
};

export default Hero;
