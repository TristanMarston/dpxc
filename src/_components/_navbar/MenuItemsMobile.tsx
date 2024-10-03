import { NavLink } from '@/app/context';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HoverListItem = ({ title, href, className }: { title: string; href: string; className?: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link
                href={href || '#'}
                onClick={(e) => {
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className={`font-bold text-xl min-[320px]:text-2xl min-[400px]:text-3xl w-full flex justify-end`}
            >
                <span className={`inline-block text-secondary text-right ${className}`}>
                    {title}
                    <motion.div className='h-1 bg-secondary rounded-full' initial={{ width: '0%' }} animate={{ width: isHovered ? '100%' : '0%' }} transition={{ duration: 0.2 }} />
                </span>
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
        <motion.li className='flex flex-col cursor-pointer text-secondary' variants={parentVariants} initial={false} animate={selectedDropdown === title ? 'open' : 'closed'}>
            <div className='flex gap-2 items-center mb-2' onClick={() => setSelectedDropdown((prev) => (prev === title ? 'null' : title))}>
                <Link href={href || '#'} className='font-bold text-xl min-[320px]:text-2xl min-[400px]:text-3xl select-none text-right'>
                    {title}
                </Link>
                <ChevronDown className={`${title === selectedDropdown ? 'rotate-180' : 'rotate-0'} w-8 h-8 transition-all`} />
            </div>
            <motion.ul variants={contentVariants} animate={selectedDropdown === title ? 'open' : 'closed'} className='flex flex-col gap-3'>
                {dropdownOptions.map(({ title, href }, index) => (
                    <HoverListItem title={title} href={href} key={title + index} className='text-base text-right' />
                ))}
            </motion.ul>
        </motion.li>
    ) : (
        <HoverListItem title={title} href={href} />
    );
};

const MenuItems = ({ links, isOpen }: { links: NavLink[]; isOpen: boolean }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('null');

    useEffect(() => {
        if (!isOpen) {
            setSelectedDropdown('null');
        }
    }, [isOpen]);

    return (
        <nav className='fixed top-0 right-0 bottom-0 w-full min-h-full bg-background-light translate-x-[100%] will-change-transform pt-24 z-[50] overflow-y-auto laptop:hidden'>
            <ul className='flex flex-col items-end gap-7 pr-3 mobile:pr-8 pt-5 mr-5 overflow-y-auto'>
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
    );
};

export default MenuItems;
