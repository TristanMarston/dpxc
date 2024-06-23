'use client';

import { NavLink } from '@/app/context';
import { motion } from 'framer-motion';
import { Dela_Gothic_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const delaGothic = Dela_Gothic_One({ weight: '400', subsets: ['latin'] });

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = (delay: number) => ({
        hidden: { scale: 0.3, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', bounce: 0.25, delay: delay } },
    });

    const buttons: NavLink[] = [
        { title: 'Our Team', href: '', isDropdown: false },
        { title: 'Support Us', href: '', isDropdown: false },
    ];

    const shapeImages = ['/dpxclogo-blue.jpg'];

    return (
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='flex flex-col gap-20 m-12 laptop:mt-16'>
            <div className='flex flex-col gap-5 w-full'>
                <span className='flex justify-center w-full'>
                    <span className='flex items-center gap-2 justify-center w-[275px] tiny:w-[350px] mobile:w-[400px] tablet:w-[550px] taptop:w-[690px] laptop:w-[850px]'>
                        <motion.div className='h-1 bg-[#00214B] rounded-full w-full relative top-0 left-0 -z-[1]'>
                            <motion.div
                                className='h-1 bg-secondary rounded-full w-full'
                                initial={{ width: '0' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                        </motion.div>
                        <motion.p variants={itemVariants(0)} className='text-nowrap text-secondary text-center'>
                            THIS IS
                        </motion.p>
                        <motion.div className='h-1 bg-secondary rounded-full w-full relative top-0 left-0 -z-[1]'>
                            <motion.div
                                className='h-1 bg-[#00214B] rounded-full w-full'
                                initial={{ width: '100%' }}
                                animate={{ width: '0' }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                        </motion.div>
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
                            key={title}
                            className='px-5 py-1.5 text-xs tiny:text-sm mobile:text-base text-secondary rounded-full border-2 border-secondary shadow-[5px_5px_0_rgba(255,213,0,1)] hover:bg-background-lighter hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all'
                        >
                            {title}
                        </Link>
                    ))}
                </motion.div>
            </div>
            <div className='w-full h-full rounded-lg items-center relative' style={{ backgroundImage: `url('/2023xcteamphoto.png')`, backgroundSize: 'cover' }}>
                <div className='absolute inset-0 bg-secondary opacity-20 rounded-lg'></div>
            </div>
        </motion.div>
    );
};

export default Hero;
