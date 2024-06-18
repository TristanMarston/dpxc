import { NavLink } from '@/app/context';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HoverListItem = ({ title, href, className }: { title: string; href: string; className?: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link href={href || '#'} className={`font-bold tracking-[-.15em] text-3xl w-full flex justify-end`}>
                <p className={`inline-block ${className}`}>
                    {title}
                    <motion.div className='h-1 bg-secondary rounded-full' initial={{ width: '0%' }} animate={{ width: isHovered ? '100%' : '0%' }} transition={{ duration: 0.2 }} />
                </p>
            </Link>
        </li>
    );
};

const HoverListItemCollapsible = ({
    title,
    href,
    selectedDropdown,
    setSelectedDropdown,
    dropdownOptions,
}: {
    title: string;
    href: string;
    selectedDropdown: string;
    setSelectedDropdown: React.Dispatch<React.SetStateAction<string>>;
    dropdownOptions: NavLink[] | undefined;
}) => {
    const parentVariants = {
        open: { height: '100%', transition: { duration: 0.5 } },
        closed: { height: '2.375rem', transition: { duration: 0.5 } },
    };

    const contentVariants = {
        open: { opacity: 1, transition: { duration: 0.3 } },
        closed: { opacity: 0, transition: { duration: 0.3 } },
    };

    return dropdownOptions ? (
        <motion.li className='flex flex-col cursor-pointer' variants={parentVariants} initial={false} animate={selectedDropdown === title ? 'open' : 'closed'}>
            <div className='flex gap-2 items-center mb-2' onClick={() => setSelectedDropdown((prev) => (prev === title ? 'null' : title))}>
                <Link href={href || '#'} className='font-bold tracking-[-.15em] text-3xl select-none'>
                    {title}
                </Link>
                <ChevronDown className={`${title === selectedDropdown ? 'rotate-180' : 'rotate-0'} w-8 h-8 transition-all`} />
            </div>
            <motion.ul variants={contentVariants} animate={selectedDropdown === title ? 'open' : 'closed'} className='flex flex-col gap-3'>
                {dropdownOptions.map(({ title, href }, index) => (
                    <HoverListItem title={title} href={href} key={title + index} className='text-base text-right tracking-[-.1em]' />
                ))}
            </motion.ul>
        </motion.li>
    ) : (
        <HoverListItem title={title} href={href} />
    );
};

const MenuItems = ({ links, isOpen }: { links: NavLink[]; isOpen: boolean }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('null');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!isOpen) setSelectedDropdown('null');
    }, [isOpen]);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        loaded && (
            <nav className='fixed top-0 right-0 bottom-0 w-full bg-background-light translate-x-[100%] will-change-transform pt-24'>
                <ul className='flex flex-col items-end gap-7 pr-3 tiny:pr-8 mobile:pr-12 pt-5 mr-5'>
                    {links.map(({ title, href, isDropdown, dropdownOptions }, index) =>
                        isDropdown ? (
                            <HoverListItemCollapsible
                                title={title}
                                href={href}
                                key={title + index}
                                selectedDropdown={selectedDropdown}
                                setSelectedDropdown={setSelectedDropdown}
                                dropdownOptions={dropdownOptions}
                            />
                        ) : (
                            <HoverListItem title={title} href={href} key={title + index} />
                        )
                    )}
                </ul>
            </nav>
        )
    );
};

export default MenuItems;
