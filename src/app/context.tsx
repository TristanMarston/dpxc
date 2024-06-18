export type NavLink = {
    title: string;
    href: string;
    isDropdown: boolean;
    dropdownOptions?: NavLink[];
    description?: string;
};