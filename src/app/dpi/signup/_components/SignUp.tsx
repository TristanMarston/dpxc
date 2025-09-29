'use client';

import { delaGothic, scrollVariants } from '@/app/context';
import { motion } from 'framer-motion';
import CommunitySignUp from './CommunitySignUp';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YouthSignUp from './YouthSignUp';

type View = 'community' | 'youth';

const SignUp = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const race = searchParams.get('race');
    const [selected, setSelected] = useState<View>(
        race !== null && race !== undefined && (race.toLowerCase() === 'community' || race.toLowerCase() === 'youth') ? (race.toLowerCase() as View) : 'community'
    );

    useEffect(() => {
        router.push(`/dpi/signup?race=${selected.toLowerCase()}`);
    }, [selected]);

    return (
            <motion.div initial='hidden' animate='visible' className='mt-28 flex flex-col items-start w-full px-2 mobile:px-3 tablet:px-4 taptop:px-8 laptop:px-12'>
                <motion.div
                    variants={scrollVariants(0)}
                    className={`${delaGothic.className} text-nowrap text-xl min-[375px]:text-2xl phone:text-[26px] mobile:text-3xl tablet:text-4xl taptop:text-5xl laptop:text-6xl text-left font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                >
                    RUN THE GOODLAND
                </motion.div>
                <motion.h4 variants={scrollVariants(0.3)} className='text-secondary text-[12px] phone:text-[13px] tablet:text-sm taptop:text-base my-3'>
                    <p>
                        Join us on Saturday, <b>October 11, 2025</b>, to run the goodland in our annual home cross country meet, where runners of all ages and abilities can take part in our community or youth race.
                        It&apos;s a great chance to test your skills on the same course as our team while enjoying a fun, competitive atmosphere. Sign up now to secure your spot and be
                        part of a memorable event!
                    </p>
                    <p className='mt-2'>
                        You are currently signing up for the <b className='lowercase'>{selected}</b> race.
                    </p>
                </motion.h4>
                <motion.div
                    variants={scrollVariants(0.5)}
                    className='flex gap-2 w-full rounded-full bg-background-light mb-5 border-2 border-secondary shadow-[0_4px_30px_rgba(0,0,0,.4)]'
                >
                    {['community', 'youth'].map((type) => (
                        <DisplayChip key={type} view={type as View} selected={selected} setSelected={setSelected} />
                    ))}
                </motion.div>
                <motion.div variants={scrollVariants(0.6)} className='w-full'>
                    {selected === 'community' ? <CommunitySignUp /> : <YouthSignUp />}
                </motion.div>
            </motion.div>
    );
};

const DisplayChip = ({ view, selected, setSelected }: { view: View; selected: View; setSelected: React.Dispatch<React.SetStateAction<View>> }) => {
    return (
        <button onClick={() => setSelected(view)} className='py-1.5 relative rounded-full w-full'>
            {selected === view && (
                <motion.span layoutId='pill-tab' transition={{ type: 'spring', duration: 0.5 }} className='rounded-full absolute inset-0 z-0 bg-secondary w-full'></motion.span>
            )}
            <div className={`relative z-10 font-semibold capitalize ${selected === view ? 'text-background-light' : 'text-secondary'}`}>{view}</div>
        </button>
    );
};

export default SignUp;
