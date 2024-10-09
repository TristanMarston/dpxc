'use client';

import { delaGothic, scrollVariants } from '@/app/context';
import BlueLayeredWave from './BlueLayeredWave';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DPIPromo = () => {
    return (
        <>
            <BlueLayeredWave />
            <section className='bg-background-lighter w-screen flex flex-col items-center px-5 pb-72'>
                <motion.h2
                    initial='hidden'
                    whileInView='visible'
                    variants={scrollVariants(0)}
                    viewport={{ once: true }}
                    className={`${delaGothic.className} text-xl tiny:text-[24px] min-[390px]:text-2xl mobile:text-3xl tablet:text-4xl taptop:text-5xl laptop:text-6xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                >
                    DPI HAS RETURNED!
                </motion.h2>
                <div className='w-full min-[500px]:w-[90%] tablet:w-4/5 laptop:w-4/5 max-w-[820px] flex flex-col items-center'>
                    <motion.div initial='hidden' whileInView='visible' variants={scrollVariants(0)} viewport={{ once: true }}>
                        <Image
                            src='/dpi-landscape-img.png'
                            alt='DPI Landscape Image'
                            width={1500}
                            height={1000}
                            className=' rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 tablet:mt-6 laptop:mt-8'
                        />
                    </motion.div>
                    <motion.p
                        initial='hidden'
                        whileInView='visible'
                        variants={scrollVariants(0)}
                        viewport={{ once: true }}
                        className='w-full text-secondary mt-3 text-xs tiny:text-sm taptop:text-base'
                    >
                        Join us on <b>October 12, 2024</b>, for our annual home cross country meet, where runners of all ages and abilities can take part in our community or youth race.
                        It&apos;s a great chance to test your skills on the same course as our team while enjoying a fun, competitive atmosphere. Sign up now to secure your spot and be
                        part of a memorable event!
                    </motion.p>
                    <motion.span initial='hidden' whileInView='visible' variants={scrollVariants(0)} viewport={{ once: true }}>
                        <Link
                            href='/dpi/signup'
                            className='bg-secondary flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,30,68,0.15)] border-2 border-background hover:bg-secondary-hover hover:scale-105 transition-all text-sm mobile:text-base'
                        >
                            Sign up now!
                            <ArrowRight />
                        </Link>
                    </motion.span>
                </div>
            </section>
        </>
    );
};

export default DPIPromo;
