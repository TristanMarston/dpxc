'use client';

import { NavLink, itemVariants } from '@/app/context';
import Link from 'next/link';
import LinesAnimation from './LinesAnimation';
import AutoscrollCarousel from './Carousel';
import { delaGothic } from '@/app/context';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });

const Hero = () => {
    const buttons: NavLink[] = [
        { title: 'Our Team', href: '', isDropdown: false },
        { title: 'Support Us', href: '', isDropdown: false },
    ];

    return (
        <>
            <MotionDiv initial='hidden' animate='visible' transition={{ staggerChildren: 0.1 }} className='flex flex-col relative mt-28 gap-16'>
                <div className='flex flex-col gap-5 w-full items-center'>
                    <span className='flex justify-center w-full'>
                        <span className='w-[275px] tiny:w-[340px] mobile:w-[400px] tablet:w-[575px] taptop:w-[690px] laptop:w-[850px]'>
                            <LinesAnimation text='THIS IS' offset={0} />
                        </span>
                    </span>
                    <MotionDiv
                        variants={itemVariants(0.5)}
                        className={`${delaGothic.className} text-2xl text-nowrap tiny:text-[26px] min-[390px]:text-3xl mobile:text-4xl tablet:text-5xl taptop:text-6xl laptop:text-7xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                    >
                        DOS PUEBLOS
                        <br />
                        CROSS COUNTRY
                    </MotionDiv>
                    <MotionDiv variants={itemVariants(0.6)} className='flex gap-4 w-full justify-center'>
                        {buttons.map(({ title, href }) => (
                            <Link
                                href={href || '#'}
                                key={title}
                                className='px-5 text-nowrap text-center py-1.5 text-xs tiny:text-sm mobile:text-base text-secondary rounded-full border-2 border-secondary shadow-[5px_5px_0_rgba(255,213,0,1)] hover:bg-background-lighter hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all'
                            >
                                {title}
                            </Link>
                        ))}
                    </MotionDiv>
                </div>

                <AutoscrollCarousel />
            </MotionDiv>
        </>
    );
};

export default Hero;
