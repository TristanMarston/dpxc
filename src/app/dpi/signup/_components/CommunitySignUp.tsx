'use client';

import { delaGothic, scrollVariants } from '@/app/context';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import BirthDateSelector from './BirthDateSelector';
import axios from 'axios';
import toast from 'react-hot-toast';

type Participant = {
    firstName: string;
    lastName: string;
    birthYear: number;
    birthMonth: string;
    birthDay: number;
    [key: string]: string | number;
};

const CommunitySignUp = () => {
    const [formData, setFormData] = useState<Participant>({ firstName: '', lastName: '', email: '', birthYear: 0, birthMonth: '', birthDay: 0, state: '', city: '', zipCode: 0 });
    const [submitReady, setSubmitReady] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const sendObject: any = {};
        Object.keys(formData).forEach((key) => {
            if (formData[key] && formData[key].toString().length > 0 && formData[key] !== 0) sendObject[key] = formData[key];
        });

        const months: { [key: string]: string } = {
            january: '01',
            february: '02',
            march: '03',
            april: '04',
            may: '05',
            june: '06',
            july: '07',
            august: '08',
            september: '09',
            october: '10',
            november: '11',
            december: '12',
        };

        const age = Math.floor(
            (new Date().getTime() - new Date(`${sendObject.birthYear}-${sendObject.birthMonth ? months[sendObject.birthMonth.toLowerCase()] : ''}-${sendObject.birthDay}`).getTime()) /
                (365.25 * 24 * 60 * 60 * 1000)
        );
        sendObject.age = age;
        console.log(sendObject);

        const toastID = toast.loading('Signing up...', { className: '!bg-secondary-light !text-background', position: 'bottom-right' });

        axios
            .post(`/api/admin/post/dpi-community-participants`, sendObject)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Successfully signed up!', {
                        id: toastID,
                        duration: 4000,
                    });

                    setFormData({ firstName: '', lastName: '', email: '', birthYear: 0, birthMonth: '', birthDay: 0, state: '', city: '', zipCode: 0 });
                }
            })
            .catch((err) => {
                toast.error(`Couldn't sign up. Please try again.`, {
                    id: toastID,
                    duration: 4000,
                });
            });
    };

    return (
        <form className='w-full border-2 border-secondary rounded-lg p-3 tablet:p-4 bg-background-light'>
            <h4 className='text-secondary font-bold mb-1'>Name</h4>
            <div className='flex flex-col gap-3 px-2 pt-2'>
                {['firstName', 'lastName', 'email'].map((title: string, index: number) => (
                    <div key={title + index}>
                        <Input title={title} formData={formData} setFormData={setFormData} handleChange={handleChange} />
                    </div>
                ))}
            </div>
            <h4 className='text-secondary font-bold mb-1 mt-4'>Date of Birth</h4>
            <div className='flex flex-col gap-3 px-2 pt-2'>
                <BirthDateSelector formData={formData} setFormData={setFormData} />
            </div>
            <h4 className='text-secondary font-bold mb-1 mt-4'>Location</h4>
            <div className='flex flex-col gap-3 px-2 pt-2'>
                {['state', 'city', 'zipCode'].map((title: string, index: number) => (
                    <div key={title + index}>
                        <Input title={title} formData={formData} setFormData={setFormData} handleChange={handleChange} />
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-center'>
                <Dialog>
                    <DialogTrigger
                        onClick={() => setSubmitReady(false)}
                        className='bg-secondary flex items-center gap-2 mt-3 px-20 tiny:px-24 py-1.5 rounded-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,30,68,0.15)] border-2 border-background hover:bg-secondary-hover hover:scale-105 transition-all text-sm mobile:text-base'
                    >
                        Submit
                    </DialogTrigger>
                    <DialogContent className='bg-secondary rounded-md gap-2.5 text-background border-0 w-[95vw] mobile:w-[90vw] tablet:w-[512px]' aria-describedby='dialog-content'>
                        <DialogTitle className='text-[1.35rem] phone:text-2xl text-background'>Ready to submit?</DialogTitle>
                        <p className='text-sm'>
                            The community race will take place on <b>October 12th, 2024</b> at 8:00 A.M.
                        </p>
                        <span className='text-sm flex items-center'>
                            <Checkbox checked={submitReady} onCheckedChange={(checked: boolean) => setSubmitReady(checked)} className='w-5 h-5 rounded-md' />
                            <span className='ml-2'>
                                I understand that there is a <b>$15 participation fee</b>, and will show up to the event with $15.
                            </span>
                        </span>
                        <DialogClose
                            onClick={() => submitReady && handleSubmit()}
                            disabled={!submitReady}
                            className={`${
                                submitReady ? 'opacity-100' : 'opacity-60 cursor-not-allowed'
                            } bg-background transition-all mt-2 hover:bg-background-light w-full text-secondary h-10 rounded-md text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
                        >
                            Submit
                        </DialogClose>
                        <DialogClose className='bg-secondary hover:bg-background-dark text-background h-10 transition-all rounded-md text-sm hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                            Cancel
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </div>
        </form>
    );
};

const Input = ({
    title,
    formData,
    setFormData,
    handleChange,
}: {
    title: string;
    formData: Participant;
    setFormData: React.Dispatch<React.SetStateAction<Participant>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className='w-full relative group'>
            <input
                className='w-full outline-none border-[1.5px] border-secondary px-3.5 py-2 flex items-center bg-background-light rounded-md text-secondary shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)]'
                id={title}
                name={title}
                type='text'
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                value={formData[title] === 0 ? '' : formData[title]}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <label
                htmlFor={title}
                className={`transform text-secondary select-none capitalize cursor-text transition-all bg-background-light origin-[0] duration-300 absolute opacity-90 top-0 left-0 h-3/4 translate-y-1.5 flex items-center ml-3.5 text-sm ${
                    focused || (formData[title].toString().length > 0 && formData[title] !== 0) ? '!text-[11px] !h-1/2 !-translate-y-2.5 !ml-2.5 !px-1 !opacity-100' : ''
                }`}
            >
                {title.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </label>
        </div>
    );
};

export default CommunitySignUp;
