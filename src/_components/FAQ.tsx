'use client';

import { delaGothic, scrollVariants } from '@/app/context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type Question = {
    question: string;
    body: () => JSX.Element;
};

const raceTimes = [
    '12th Grade Boys (3 mile) - 9:00 AM',
    '12th Grade Girls (3 mile) - 9:07 AM',
    '11th Grade Boys (3 mile) - 9:45 AM',
    '11th Grade Girls (3 mile) - 9:52 AM',
    '10th Grade Boys (3 mile) - 10:30 AM',
    '10th Grade Girls (3 mile) - 10:37 AM',
    '9th Grade Boys (3 mile) - 11:15 AM',
    '9th Grade Girls (3 mile) - 11:22 AM',
];

const signUpQuestions: Question[] = [
    {
        question: "Help! It won't let me sign up!",
        body: () => (
            <div className='text-secondary'>
                <p className='pb-2'>We&apos;re so sorry you weren&apos;t able to sign up! Please refresh the page and try again.</p>
                <p>
                    If it still doesn&apos;t work, don&apos;t stress about it! We can handle your registration on the day of &ndash; signing up online just greatly helps our time management on
                    race day.
                </p>
            </div>
        ),
    },
];

let questions: Question[] = [
    {
        question: 'What time are the races?',
        body: () => (
            <div className='text-secondary'>
                <p className='pb-2'>
                    This is the schedule of events for the morning of <b>Saturday, October 11th, 2025</b>:
                </p>
                <p className='font-bold pb-1'>Run the Goodland:</p>
                <div className='pl-2 pb-2 flex flex-col gap-2'>
                    <span className='flex gap-2 items-center'>
                        <div className='rounded-full text-background bg-secondary w-6 h-6 grid place-items-center'>1</div>
                        <p>Adult Race (3 mile) - 8:00 AM</p>
                    </span>
                    <span className='flex gap-2 items-center'>
                        <div className='rounded-full text-background bg-secondary w-6 h-6 grid place-items-center'>2</div>
                        <p>Youth Race (2 mile) - 8:30 AM</p>
                    </span>
                </div>
                <p className='font-bold pb-1'>Dos Pueblos Invitational:</p>
                <div className='pl-2 flex flex-col gap-2'>
                    {raceTimes.map((time, index) => (
                        <span className='flex gap-2 items-center' key={time}>
                            <div className='rounded-full text-background bg-secondary w-6 h-6 grid place-items-center'>{index + 1}</div>
                            <p>{time}</p>
                        </span>
                    ))}
                </div>
            </div>
        ),
    },
    {
        question: 'What is the participation fee for teams?',
        body: () => (
            <div className='text-secondary'>
                <p className='pb-2'>
                    $15 per athlete registered by the <b>October 9th</b> deadline.
                </p>
                <p className='pb-2'>For teams with 30 or more athletes, the fee is capped at $450 per school.</p>
                <p>
                    All payments are due by <b>October 11th</b>; please have the payment completed by or at packet pickup on meet day. If payment is not received on meet day, the credit
                    card on file will be charged on Sunday, October 12th.
                </p>
            </div>
        ),
    },
    {
        question: 'Where do we park?',
        body: () => (
            <div className='text-secondary'>
                <p>DPI will be hosted at DPHS, located at 7266 Alameda Ave, Goleta, CA 93117. Please park in the parking lot at the corner of Alameda and Cathedral Oaks.</p>
            </div>
        ),
    },
    {
        question: 'Where do teams set up camp?',
        body: () => (
            <div className='text-secondary'>
                <p>Team camps may be in the stadium bleachers, and on the field behind both sets of bleachers. Please clean your team area!</p>
            </div>
        ),
    },
    {
        question: 'Is there merchandise available?',
        body: () => (
            <div className='text-secondary'>
                <p>Yes, merchandise will be available for purchase! In addition to a Snack Shack, we have food vendors on scene so you don&apos;t have to run out for lunch.</p>
            </div>
        ),
    },
    {
        question: 'How will the awards and scoring work?',
        body: () => (
            <div className='text-secondary'>
                <p className='pb-2'>The top 20 finishers in each race will receive our unique awards.</p>
                <p className='pb-2'>
                    First and second place teams in each race will receive plaques as soon as the team scores are confirmed. Team scores are based on the sum of a team&apos;s{' '}
                    <b>top three finishers</b>, with the lowest score taking the win.
                </p>
                <p>
                    The Gordon McClenathan Trophies used to go to the teams with the lowest combined scores from their top three finishers in three of the four grade-level races. This
                    year, instead of a trophy, each winning team earns 50% off next year&apos;s entry fee, and if your team wins both the boys and girls divisions, you&apos;ll race in
                    2026 for free!{' '}
                </p>
            </div>
        ),
    },
];

const FAQ = ({ className, setWidth, signInQuestions }: { className?: string; setWidth?: boolean; signInQuestions?: boolean }) => {
    if (!setWidth) setWidth = false;

    let faqQuestions: Question[] = [];
    if (!signInQuestions) {
        signInQuestions = false;
        faqQuestions = [...questions];
    } else {
        faqQuestions = [...signUpQuestions, ...questions];
    }
    const [questionsOpen, setQuestionsOpen] = useState<boolean[]>(new Array(faqQuestions.length).fill(false));

    useEffect(() => {
        console.log(questionsOpen);
    }, [questionsOpen]);

    return (
        <div className={`w-full px-5 flex flex-col items-center ${className}`}>
            <section className={`${setWidth ? 'min-[500px]:w-[90%] tablet:w-4/5 laptop:w-4/5 max-w-[820px]' : 'w-full'}`}>
                <motion.h2
                    initial='hidden'
                    whileInView='visible'
                    variants={scrollVariants(0)}
                    viewport={{ once: true }}
                    className={`${delaGothic.className} pb-2 text-xl tiny:text-[24px] min-[390px]:text-2xl mobile:text-3xl tablet:text-4xl taptop:text-5xl laptop:text-6xl text-left font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                >
                    FAQ
                </motion.h2>
                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    variants={scrollVariants(0)}
                    className='w-full h-1 rounded-full bg-secondary [box-shadow:_3px_3px_3px_rgba(0,0,0)]'
                />
                <Accordion
                    type='single'
                    collapsible
                    onValueChange={(value: string) => {
                        const index = value.length > 0 ? parseInt(value) : -1;

                        setQuestionsOpen((prev) => prev.map((_, i) => (i === index ? true : false)));
                    }}
                    className='w-full'
                >
                    {faqQuestions.map(({ question, body }, index) => (
                        <AccordionItem value={index.toString()} key={question}>
                            <AccordionTrigger>
                                <motion.div
                                    className='w-full text-left font-bold text-secondary'
                                    initial='hidden'
                                    whileInView='visible'
                                    viewport={{ once: true }}
                                    variants={scrollVariants(0)}
                                >
                                    <span className='py-[18px] flex justify-between items-center [text-shadow:_3px_3px_3px_rgba(0,0,0)]'>
                                        <p className='flex items-center text-left text-lg font-bold text-secondary [text-shadow:_3px_3px_3px_rgba(0,0,0)]'>{question}</p>
                                        <ChevronDown
                                            className={`${questionsOpen[index] ? 'rotate-180' : 'rotate-0'} h-8 w-8 text-secondary shrink-0 transition-transform duration-200`}
                                        />
                                    </span>
                                    <div className='w-full h-0.5 rounded-full bg-secondary [box-shadow:_3px_3px_3px_rgba(0,0,0)]' />
                                </motion.div>
                            </AccordionTrigger>
                            <AccordionContent className='px-2 pt-4 pb-0'>{body()}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
};

export default FAQ;
