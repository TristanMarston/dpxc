'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import BirthDateSelector from './BirthDateSelector';
import toast from 'react-hot-toast';
import axios from 'axios';

type Participant = {
    firstName: string;
    lastName: string;
    birthYear: number;
    birthMonth: string;
    birthDay: number;
    [key: string]: string | number;
};

const YouthSignUp = () => {
    const [formData, setFormData] = useState<Participant>({ firstName: '', lastName: '', birthYear: 0, birthMonth: '', birthDay: 0 });
    const [submitReady, setSubmitReady] = useState(false);
    const [waiverAgreed, setWaiverAgreed] = useState(false);

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
        delete sendObject.birthYear;
        delete sendObject.birthMonth;
        delete sendObject.birthDay;
        sendObject.age = age;
        console.log(sendObject);

        const toastID = toast.loading('Signing up...', { className: '!bg-secondary-light !text-background', position: 'bottom-right' });

        axios
            .post(`/api/admin/post/goodland-youth-participants`, sendObject)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    toast.success('Successfully signed up!', {
                        id: toastID,
                        duration: 4000,
                    });

                    setFormData({ firstName: '', lastName: '', birthYear: 0, birthMonth: '', birthDay: 0 });
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
        <form className='w-full border-2 border-secondary rounded-3xl p-3 tablet:p-5 bg-background-light'>
            <h4 className='text-secondary font-bold mb-1'>Name</h4>
            <div className='flex flex-col gap-3 px-2 pt-2'>
                {['firstName', 'lastName'].map((title: string, index: number) => (
                    <div key={title + index}>
                        <Input title={title} formData={formData} setFormData={setFormData} handleChange={handleChange} />
                    </div>
                ))}
            </div>
            <h4 className='text-secondary font-bold mb-1 mt-4'>Date of Birth</h4>
            <div className='flex flex-col gap-3 px-2 pt-2'>
                <BirthDateSelector formData={formData} setFormData={setFormData} />
            </div>
            <div className='w-full flex justify-center'>
                <Dialog>
                    <DialogTrigger
                        onClick={() => {
                            setSubmitReady(false);
                            setWaiverAgreed(false);
                        }}
                        className='bg-secondary flex items-center gap-2 mt-3 px-20 tiny:px-24 py-1.5 rounded-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,30,68,0.15)] border-2 border-background hover:bg-secondary-hover hover:scale-105 transition-all text-sm mobile:text-base'
                    >
                        Submit
                    </DialogTrigger>
                    <DialogContent className='bg-secondary rounded-md gap-2.5 text-background border-0 w-[95vw] mobile:w-[90vw] tablet:w-[512px]' aria-describedby='dialog-content'>
                        <DialogTitle className='text-[1.35rem] phone:text-2xl text-background'>Ready to submit?</DialogTitle>
                        <p className='text-sm'>
                            The youth race will take place on <b>October 11th, 2025</b> at 8:30 A.M.
                        </p>
                        <span className='text-sm flex items-center'>
                            <Checkbox checked={submitReady} onCheckedChange={(checked: boolean) => setSubmitReady(checked)} className='w-5 h-5 rounded-md' />
                            <span className='ml-2'>
                                I understand that there is a <b>$10 participation fee</b>, and will show up to the event with $10.
                            </span>
                        </span>
                        <span className='text-sm flex items-center'>
                            <Checkbox checked={waiverAgreed} onCheckedChange={(checked: boolean) => setWaiverAgreed(checked)} className='w-5 h-5 rounded-md' />
                            <span className='ml-2'>By checking this box, I acknowledge that I have read and agree to the terms of the waiver below.</span>
                        </span>
                        <div className='max-h-20 overflow-y-scroll p-2 text-xs shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-md'>
                            The Undersigned hereby agrees to defend, indemnify, and hold harmless Dos Pueblos High School and Santa Barbara Unified School District, its officials,
                            employers and agents from and against all loss, liability, charges, and expenses (including attorneys&apos; fees) and cases of whatsoever character may arise
                            by reason of the participation in this year&apos;s Dos Pueblos Cross Country Invitational or be connected anyway therewith. The above-mentioned agencies do
                            not provide accident, medical, liability or workers compensation insurance for program participants.
                        </div>
                        <DialogClose
                            onClick={() => submitReady && waiverAgreed && handleSubmit()}
                            disabled={!submitReady || !waiverAgreed}
                            className={`${
                                submitReady && waiverAgreed ? 'opacity-100' : 'opacity-60 cursor-not-allowed'
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
                    focused || (formData[title].toString().length > 0 && formData[title] !== 0) ? '!text-[11px] !h-1/2 !-translate-y-2.5 !ml-2.5 !px-1 !opacity-100 font-semibold' : 'font-normal'
                }`}
            >
                {title.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </label>
        </div>
    );
};

export default YouthSignUp;
