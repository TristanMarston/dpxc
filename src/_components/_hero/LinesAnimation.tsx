import { itemVariants } from '@/app/context';
import { motion } from 'framer-motion';
import { Dela_Gothic_One } from 'next/font/google';

const delaGothic = Dela_Gothic_One({ weight: '400', subsets: ['latin'] });

const LinesAnimation = ({ text, offset }: { text: string; offset: number }) => {
    return (
        <div className='flex items-center gap-2 justify-center'>
            <motion.div className='h-1.5 bg-background rounded-full w-full relative top-0 left-0 -z-[1]'>
                <motion.div
                    className='h-1 bg-secondary rounded-full w-full'
                    initial={{ width: '0' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: offset }}
                ></motion.div>
            </motion.div>
            <motion.p
                variants={itemVariants(offset)}
                className={`${delaGothic.className} text-nowrap text-secondary text-center uppercase tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
            >
                {text}
            </motion.p>
            <motion.div className='h-1 bg-secondary rounded-full w-full relative top-0 left-0 -z-[1] grid content-center'>
                <motion.div
                    className='h-1.5 bg-background rounded-full w-full'
                    initial={{ width: '100%' }}
                    animate={{ width: '0' }}
                    transition={{ duration: 0.5, delay: offset }}
                ></motion.div>
            </motion.div>
        </div>
    );
};

export default LinesAnimation;
