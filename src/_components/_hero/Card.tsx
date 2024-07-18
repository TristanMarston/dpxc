import { CardType } from '@/app/context';
import React, { memo } from 'react';
import Image from 'next/image';
import { delaGothic } from '@/app/context';

const Card = memo(({ card }: { card: CardType }) => {
    return (
        <div className='relative h-[150px] w-[125px] tablet:h-[225px] tablet:w-[185px] taptop:h-[280px] taptop:w-[225px] laptop:h-[310px] laptop:w-[260px] desktop:h-[350px] desktop:w-[300px] overflow-hidden bg-neutral-200 rounded-lg shadow-[5px_5px_0px_0px_rgba(255,213,0)] border-2 rotate-2 border-secondary'>
            <Image
                src={card.url}
                alt={card.title}
                fill
                className='absolute inset-0 z-0 object-cover'
                // sizes='(min-width: 0px) 40vw, (min-width: 600px) 30vw, (min-width: 800px) 28vw, (min-width: 1000px) 26vw, (min-width: 1200px) 25vw'
                sizes='(min-width: 0px) 33vw, (min-width: 600px) 33vw, (min-width: 800px) 30vw, (min-width: 1000px) 30vw, (min-width: 1200px) 25vw'
            />
            <div className='absolute inset-0 z-10 grid place-content-center h-full bg-gradient-to-br from-black/10 to-black/20'>
                <p className={`${delaGothic.className} p-8 text-sm tablet:text-xl taptop:text-2xl desktop:text-3xl font-black uppercase text-white select-none text-nowrap`}>
                    {card.title}
                </p>
            </div>
            <div className='absolute inset-0 bg-secondary opacity-20' />
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
