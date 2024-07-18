'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { itemVariants, useScreenWidth, CardType, delaGothic } from '@/app/context';
import dynamic from 'next/dynamic';

const DynamicCard = dynamic(() => import('./Card'), { ssr: false });

const cards: CardType[] = [
    {
        url: '/dpxc-landing-team-1.jpg',
        title: 'A TEAM.',
        id: 1,
    },
    {
        url: '/dpxc-landing-runners-1.JPG',
        title: 'RUNNERS.',
        id: 2,
    },
    {
        url: '/dpxc-landing-dedicated-1.JPG',
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
        url: '/dpxc-landing-strong-1.JPG',
        title: 'STRONG.',
        id: 6,
    },
    {
        url: '/dpxc-landing-team-2.JPG',
        title: 'A TEAM.',
        id: 7,
    },
    {
        url: '/dpxc-landing-runners-2.JPG',
        title: 'RUNNERS.',
        id: 8,
    },
    {
        url: '/dpxc-landing-dedicated-2.JPG',
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
        url: '/dpxc-landing-strong-2.JPG',
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
                                <DynamicCard card={card} />
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
                                    <DynamicCard card={card} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
            </motion.div>
        </div>
    );
};

export default AutoscrollCarousel;
