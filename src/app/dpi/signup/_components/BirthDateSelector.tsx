'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';

type Participant = {
    firstName: string;
    lastName: string;
    birthYear: number;
    birthMonth: string;
    birthDay: number;
    [key: string]: string | number;
};

const BirthDateSelector = ({ formData, setFormData }: { formData: Participant; setFormData: React.Dispatch<React.SetStateAction<Participant>> }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const currentYear = new Date().getFullYear();
    const yearsArray: string[] = [];

    for (let year = currentYear; year >= 1960; year--) yearsArray.push(year.toString());
    const monthsArray: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handleChange = (name: string, value: any) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(date);
        if (date !== undefined && (date.getMonth() !== new Date().getMonth() || date.getDate() !== new Date().getDate() || date.getFullYear() !== new Date().getFullYear())) {
            setFormData({
                ...formData,
                birthDay: date.getDate(),
            });
        }
    }, [date]);

    function getDayWithOrdinal(day: number) {
        function getOrdinalSuffix(n: number) {
            if (n > 3 && n < 21) return 'th';
            switch (n % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }

        return day + getOrdinalSuffix(day);
    }

    return (
        <div className='w-full flex flex-col tablet:flex-row tablet:gap-1'>
            <Select onValueChange={(value) => handleChange('birthYear', parseInt(value))}>
                <SelectTrigger className='w-full outline-none ring-0 focus:ring-0 border-[1.5px] border-secondary px-3.5 py-2 tablet:mb-0 mb-3 flex items-center bg-background-light rounded-md text-secondary shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)]'>
                    {formData.birthYear !== 0 ? formData.birthYear : 'Year'}
                </SelectTrigger>
                <SelectContent className='bg-background-light text-secondary border-2 border-secondary'>
                    <SelectGroup>
                        {yearsArray.map((year, index) => (
                            <SelectItem key={year + index} value={year} className='hover:bg-background-lighter hover:text-secondary'>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleChange('birthMonth', value)}>
                <SelectTrigger className='w-full outline-none ring-0 focus:ring-0 border-[1.5px] border-secondary px-3.5 py-2 tablet:mb-0 mb-3 flex items-center bg-background-light rounded-md text-secondary shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)]'>
                    {formData.birthMonth.length > 0 ? formData.birthMonth : 'Month'}
                </SelectTrigger>
                <SelectContent className='bg-background-light text-secondary border-2 border-secondary'>
                    <SelectGroup>
                        {monthsArray.map((month, index) => (
                            <SelectItem key={month + index} value={month} className='hover:bg-background-lighter hover:text-secondary'>
                                {month}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Popover>
                <PopoverTrigger className='w-full outline-none ring-0 focus:ring-0 gap-2 border-[1.5px] border-secondary px-3.5 py-2 tablet:mb-0 mb-3 flex justify-between items-center bg-background-light rounded-md text-secondary shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)]'>
                    <span className='text-sm'>{formData.birthDay !== 0 ? getDayWithOrdinal(formData.birthDay) : 'Day'}</span>
                    <CalendarIcon className='h-4 w-4' />
                    {/* {date && birthDay != '' ? format(new Date(0, 0, parseInt(birthDay), 0, 0, 0), 'do') : <span className='text-gray-500 truncate'>Day</span>} */}
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0 rounded-md border-2 border-secondary'>
                    <Calendar
                        mode='single'
                        showArrows={false}
                        showOutsideDays={false}
                        className='bg-background-light text-secondary'
                        showYear={formData.birthYear}
                        showMonth={formData.birthMonth}
                        selected={date}
                        onSelect={setDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default BirthDateSelector;
