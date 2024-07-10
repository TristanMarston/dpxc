import { Dela_Gothic_One } from 'next/font/google';
import Image from 'next/image';
import LinesAnimation from './LinesAnimation';

const delaGothic = Dela_Gothic_One({ weight: '400', subsets: ['latin'] });

const WeAre = () => {
    const displayInfo = [
        {
            title: 'Runners',
            description:
                'From the athletes who have just set foot on the course, to the seasoned veterans, our pushes beyond our limits, striving for excellence with each stride we take. Together, we embrace the challenges and celebrate our victories, united by our passion for running.',
            image: '/2023xcteamphoto.png',
        },
        {
            title: 'A team',
            description:
                'From the athletes who have just set foot on the course, to the seasoned veterans, our pushes beyond our limits, striving for excellence with each stride we take.',
            image: '/2023xcteamphoto.png',
        },
    ];

    return (
        <section className='flex flex-col gap-4 max-w-[1500px]'>
            <h2 className={`${delaGothic.className} text-xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}>WE ARE...</h2>
            <div className='flex flex-col'>
                {displayInfo.map(({ title, description, image }, index) => (
                    <img src={image} className=''></img>
                ))}
            </div>
        </section>
    );
};

export default WeAre;
