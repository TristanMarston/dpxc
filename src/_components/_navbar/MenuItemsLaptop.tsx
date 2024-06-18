import { NavLink } from '@/app/context';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MenuItemDropdown = ({ title, href, dropdownOptions }: { title: string; href: string; dropdownOptions: NavLink[] | undefined }) => {
    return dropdownOptions !== undefined ? (
        <NavigationMenuItem>
            <NavigationMenuTrigger className=''>
                <Link href={href || '#'}>
                    <NavigationMenuLink className={`rounded-full w-full text-base font-bold tracking-[-.1em]`}>{title}</NavigationMenuLink>
                </Link>
            </NavigationMenuTrigger>

            <NavigationMenuContent className='grid grid-cols-2 grid-rows-2 w-[360px] items-start bg-background-light border-2 border-background-light outline-none shadow-[0_4px_30px_rgba(0,0,0,.4)]'>
                {dropdownOptions.map(({ title, href, description }) => (
                    <Link href={href || '#'} className='w-full flex justify-start h-full'>
                        <NavigationMenuLink className={`hover:bg-background-lighter rounded-md flex flex-col items-left w-full h-full p-3 tracking-[-.15em] text-secondary`}>
                            <h4 className='font-semibold'>{title}</h4>
                            <p className='font-light text-[12px] tracking-tighter'>{description}</p>
                        </NavigationMenuLink>
                    </Link>
                ))}
            </NavigationMenuContent>
        </NavigationMenuItem>
    ) : (
        <MenuItem title={title} href={href} />
    );
};

const MenuItem = ({ title, href }: { title: string; href: string }) => {
    return (
        <NavigationMenuItem>
            <Link href={href || '#'} legacyBehavior passHref>
                <NavigationMenuLink className={`font-semibold tracking-[-.1em]`}>{title}</NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
};

const MenuItemsLaptop = ({ links }: { links: NavLink[] }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return loaded ? (
        <NavigationMenu className='hidden laptop:block mr-4'>
            <NavigationMenuList className='flex gap-6'>
                <div className='flex gap-6 justify-end'>
                    {links
                        .filter((link) => link.isDropdown)
                        .map(({ title, href, dropdownOptions }, index) => (
                            <MenuItemDropdown title={title} href={href} dropdownOptions={dropdownOptions} key={title + index} />
                        ))}
                </div>
                {links
                    .filter((link) => !link.isDropdown)
                    .map(({ title, href }, index) => (
                        <MenuItem title={title} href={href} key={title + index} />
                    ))}
            </NavigationMenuList>
        </NavigationMenu>
    ) : (
        <div className='w-full gap-2 justify-end hidden laptop:flex mr-4'>
            {links.map(() => (
                <Skeleton className='w-[8%] h-[20px] rounded-full' />
            ))}
        </div>
    );
};

export default MenuItemsLaptop;
