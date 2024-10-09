import { NavLink } from '@/app/context';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useRef } from 'react';

const MenuItemDropdown = ({ title, href, dropdownOptions }: { title: string; href: string; dropdownOptions: NavLink[] | undefined }) => {
    const menuRef = useRef(null);
    const triggerRef = useRef(null);

    return dropdownOptions !== undefined && dropdownOptions.length > 0 ? (
        <NavigationMenuItem>
            <NavigationMenuTrigger className='' ref={triggerRef}>
                <span className={`rounded-full w-full text-sm desktop:text-base font-bold`}>{title}</span>
            </NavigationMenuTrigger>

            <NavigationMenuContent className='flex flex-col w-[360px] right-0 items-start bg-background-light border-2 border-background-light outline-none shadow-[0_4px_30px_rgba(0,0,0,.4)]'>
                {dropdownOptions.map(({ title, href, description }) => (
                    <Link
                        href={href || '#'}
                        onClick={(e) => {
                            if (href.startsWith('#')) {
                                e.preventDefault();
                                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className='w-full flex justify-start h-full'
                        key={title + description}
                    >
                        <NavigationMenuLink className={`hover:bg-background-lighter rounded-md flex flex-col items-left w-full h-full p-3 text-secondary`}>
                            <h4 className='font-semibold'>{title}</h4>
                            <p className='font-light text-[12px]'>{description}</p>
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
            <Link
                href={href || '#'}
                onClick={(e) => {
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className='font-semibold text-sm desktop:text-base'
            >
                {title}
            </Link>
        </NavigationMenuItem>
    );
};

const MenuItemsLaptop = ({ links }: { links: NavLink[] }) => {
    return (
        <NavigationMenu className='hidden laptop:block mr-4'>
            <NavigationMenuList className='flex gap-6'>
                {links
                    .filter((link) => link.isDropdown)
                    .map(({ title, href, dropdownOptions }, index) => (
                        <MenuItemDropdown title={title} href={href} dropdownOptions={dropdownOptions} key={title + index} />
                    ))}
                {links
                    .filter((link) => !link.isDropdown)
                    .map(({ title, href }, index) => (
                        <MenuItem title={title} href={href} key={title + index} />
                    ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default MenuItemsLaptop;
