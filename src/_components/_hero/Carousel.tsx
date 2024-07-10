'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useRef, useState } from 'react';
import { Dela_Gothic_One } from 'next/font/google';
import { motion, stagger } from 'framer-motion';
import { itemVariants, useScreenWidth } from '@/app/context';

const delaGothic = Dela_Gothic_One({ weight: '400', subsets: ['latin'] });

type CardType = {
    url: string;
    title: string;
    id: number;
};

const cards: CardType[] = [
    {
        url: '/dpxc-landing-team-1.jpg',
        title: 'A TEAM.',
        id: 1,
    },
    {
        url: '/dpxc-landing-runners-1.jpg',
        title: 'RUNNERS.',
        id: 2,
    },
    {
        url: '/dpxc-landing-dedicated-1.jpg',
        title: 'DEDICATED.',
        id: 3,
    },
    {
        url: '/dpxc-landing-united-1.jpg',
        title: 'UNITED.',
        id: 4,
    },
    {
        url: '/dpxc-landing-champions-1.jpg',
        title: 'CHAMPIONS.',
        id: 5,
    },
    {
        url: '/dpxc-landing-strong-1.jpg',
        title: 'STRONG.',
        id: 6,
    },
    {
        url: '/dpxc-landing-team-2.jpg',
        title: 'A TEAM.',
        id: 7,
    },
    {
        url: '/dpxc-landing-runners-2.jpg',
        title: 'RUNNERS.',
        id: 8,
    },
    {
        url: '/dpxc-landing-dedicated-2.jpg',
        title: 'DEDICATED.',
        id: 9,
    },
    {
        url: '/dpxc-landing-united-2.jpg',
        title: 'UNITED.',
        id: 10,
    },
    {
        url: '/dpxc-landing-champions-2.jpg',
        title: 'CHAMPIONS.',
        id: 11,
    },
    {
        url: '/dpxc-landing-strong-2.jpg',
        title: 'STRONG.',
        id: 12,
    },
];

const AutoscrollCarousel = () => {
    const pluginForward = useRef(
        AutoScroll({
            speed: 1,
            direction: 'forward',
            breakpoints: { '(min-width: 600px)': { speed: 1.5 }, '(min-width: 1200px)': { speed: 1.75 } },
        })
    );
    const pluginBackward = useRef(
        AutoScroll({
            speed: 1,
            direction: 'backward',
            breakpoints: { '(min-width: 600px)': { speed: 1.5 }, '(min-width: 1200px)': { speed: 1.75 } },
        })
    );
    const screenWidth = useScreenWidth();
    const [showAnimation, setShowAnimation] = useState(true);

    return (
        <div>
            <motion.h2
                variants={itemVariants(1)}
                className={`${delaGothic.className} text-3xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
            >
                WE ARE...
            </motion.h2>
            <motion.div
                className='w-screen'
                variants={{ closed: { y: 50, opacity: 0 }, open: { y: 0, opacity: 1 } }}
                initial='closed'
                animate='open'
                transition={{ duration: 0.5, delay: 1.5 }}
            >
                <Carousel plugins={[pluginForward.current]} className='w-screen' opts={{ loop: true, watchDrag: false, align: 'start' }}>
                    <div className='w-full absolute h-full'>
                        <div className='absolute left-0 w-[20%] tablet:w-[25%] taptop:w-[20%] h-full bg-gradient-to-r from-background via-background to-background/0 z-20'></div>
                        <div className='absolute right-0 w-[20%] tablet:w-[25%] taptop:w-[20%] h-full bg-gradient-to-l from-background via-background to-background/0 z-20'></div>
                    </div>
                    <CarouselContent className='py-5'>
                        {(screenWidth > 600 ? cards : cards.slice(0, Math.floor(cards.length / 2))).map((card, index) => (
                            <CarouselItem
                                key={card.id}
                                className={`max-h-[150px] max-w-[125px] tablet:max-h-[225px] tablet:max-w-[185px] taptop:max-h-[280px] taptop:max-w-[225px] laptop:max-h-[310px] laptop:max-w-[260px] desktop:max-h-[350px] desktop:max-w-[300px] pl-0 ml-6 py-2`}
                            >
                                <Card card={card} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                {screenWidth < 600 && (
                    <Carousel plugins={[pluginBackward.current]} className='w-screen flex tablet:hidden' opts={{ loop: true, watchDrag: false, align: 'start' }}>
                        <div className='w-full absolute h-full'>
                            <div className='absolute left-0 w-[15%] tablet:w-[25%] taptop:w-[20%] h-full bg-gradient-to-r from-background via-background to-background/0 z-20'></div>
                            <div className='absolute right-0 w-[15%] tablet:w-[25%] taptop:w-[20%] h-full bg-gradient-to-l from-background via-background to-background/0 z-20'></div>
                        </div>
                        <CarouselContent className='py-5'>
                            {cards.slice(Math.floor(cards.length / 2), cards.length).map((card, index) => (
                                <CarouselItem
                                    key={card.id}
                                    className={`max-h-[150px] max-w-[125px] tablet:max-h-[225px] tablet:max-w-[185px] taptop:max-h-[280px] taptop:max-w-[225px] laptop:max-h-[310px] laptop:max-w-[260px] desktop:max-h-[350px] desktop:max-w-[300px] pl-0 ml-6 py-2`}
                                >
                                    <Card card={card} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
            </motion.div>
        </div>
    );
};

const Card = ({ card }: { card: CardType }) => {
    return (
        <div className='relative h-[150px] w-[125px] tablet:h-[225px] tablet:w-[185px] taptop:h-[280px] taptop:w-[225px] laptop:h-[310px] laptop:w-[260px] desktop:h-[350px] desktop:w-[300px] overflow-hidden bg-neutral-200 rounded-lg shadow-[5px_5px_0px_0px_rgba(255,213,0)] border-2 rotate-2 border-secondary'>
            <div
                style={{
                    backgroundImage: `url(${card.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className='absolute inset-0 z-0'
            ></div>
            <div className='absolute inset-0 z-10 grid place-content-center h-full bg-gradient-to-br from-black/10 to-black/20'>
                <p className={`${delaGothic.className} p-8 text-sm tablet:text-xl taptop:text-2xl desktop:text-3xl font-black uppercase text-white select-none text-nowrap`}>
                    {card.title}
                </p>
            </div>
            <div className='absolute inset-0 bg-secondary opacity-20' />
        </div>
    );
};

export default AutoscrollCarousel;
