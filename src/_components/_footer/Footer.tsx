'use client';

import { delaGothic } from '@/app/context';
import ContactUs from './ContactUs';
import Image from 'next/image';
import GoldLayeredWave from './GoldLayeredWave';

const Footer = ({ negativeSpacing = false }) => {
    return (
        <>
            <GoldLayeredWave negativeSpacing={negativeSpacing} />
            <section className='bg-secondary w-screen flex flex-col items-center px-5 pb-10' id='contact'>
                <h3 className={`${delaGothic.className} uppercase text-background text-2xl tiny:text-[26px] min-[390px]:text-3xl mobile:text-4xl tablet:text-5xl taptop:text-6xl laptop:text-7xl text-center font-bold tracking-wide`}>Running is Funning!</h3>
                <a href='/'>
                    <Image src={'/dpxclogo.png'} alt='logo' width={200} height={200} />
                </a>
                <ContactUs />
            </section>
        </>
    );
};

export default Footer;
