'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { displayToast, useScreenWidth } from '@/app/context';
import toast from 'react-hot-toast';

interface MessageForm {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

const ContactUs = () => {
    const [formData, setFormData] = useState<MessageForm>({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });
    const messageRef = useRef() as React.RefObject<HTMLTextAreaElement>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (/\S+@\S+\.\S+/.test(formData.email.trim()) && formData.message.trim().length > 0) {
            const toastID = toast.loading('Sending message...', { className: '!bg-secondary-light !text-black', position: 'bottom-right' });

            axios
                .post(`/api/sendMessage`, formData)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        toast.success('Message successfully sent!', {
                            id: toastID,
                            duration: 4000,
                        });

                        setFormData({
                            firstName: '',
                            lastName: '',
                            email: '',
                            subject: '',
                            message: '',
                        });
                    }
                })
                .catch((err) => {
                    toast.error('Message failed to send.', {
                        id: toastID,
                        duration: 4000,
                    });
                });
        } else
            displayToast(
                false,
                !/\S+@\S+\.\S+/.test(formData.email.trim()) && formData.message.trim().length === 0
                    ? 'Invalid email and message.'
                    : !/\S+@\S+\.\S+/.test(formData.email.trim())
                    ? 'Invalid email.'
                    : formData.message.trim().length === 0
                    ? 'No message found.'
                    : 'Invalid email or message.'
            );
    };

    return (
        <div className='w-full text-center flex flex-col gap-1 text-background'>
            <div className='flex flex-col gap-3 mb-5'>
                <h1 className={`text-xl font-bold text-center`}>Have any questions?</h1>
                <span className='text-sm text-center'>
                    <p>Our team will try our best to respond within 24 hours. If you do not receive a reply promptly, please send another message or email.</p>
                </span>
            </div>
            <h2 className='text-xl font-bold text-center mb-8'>Contact Us</h2>
            <form onSubmit={handleSubmit} className='space-y-4 grid place-items-center'>
                <div className='grid grid-cols-2 gap-y-6 gap-x-3 mb-5 w-full max-w-[1200px]'>
                    {(Object.keys(formData) as (keyof MessageForm)[]).map((key: string) => {
                        const split = key.split(/(?=[A-Z])/);
                        const label = `${split.length == 2 && split[1].trim().length > 0 ? `${split[0]} ${split[1]}` : split[0]}${key === 'message' || key === 'email' ? '*' : ''}`;
                        const inputClassName = `w-full pt-3 outline-none bg-transparent border-b-[1.5px] border-b-background h-11 ${
                            key === 'message' ? 'overflow-y-auto resize-none' : ''
                        }`;

                        return (
                            <div
                                key={key + 'footer'}
                                className={`${
                                    key === 'message'
                                        ? 'col-span-2'
                                        : key === 'email' || key === 'subject'
                                        ? 'col-span-2 tablet:col-span-1'
                                        : key === 'firstName' || key === 'lastName'
                                        ? 'col-span-2 mobile:col-span-1'
                                        : ''
                                } flex flex-col items-start`}
                            >
                                <label htmlFor={key} className='capitalize font-semibold'>
                                    {label}
                                </label>
                                {key === 'message' ? (
                                    <textarea
                                        autoComplete='off'
                                        autoCapitalize='off'
                                        id={key}
                                        name={key}
                                        rows={1}
                                        value={formData[key as keyof MessageForm]}
                                        onChange={handleChange}
                                        ref={messageRef}
                                        onChangeCapture={() => {
                                            if (messageRef.current) {
                                                messageRef.current.style.height = 'auto';
                                                messageRef.current.style.height = `${messageRef.current.scrollHeight + 8}px`;
                                            }
                                        }}
                                        className={inputClassName}
                                    ></textarea>
                                ) : (
                                    <input
                                        type='text'
                                        autoComplete='off'
                                        autoCapitalize='off'
                                        id={key}
                                        name={key}
                                        value={formData[key as keyof MessageForm]}
                                        onChange={handleChange}
                                        className={inputClassName}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                <Dialog>
                    <DialogTrigger className='px-20 py-1.5 outline-none text-background rounded-full border-2 border-background shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)] bg-secondary hover:bg-secondary-hover transition-colors'>
                        Submit
                    </DialogTrigger>
                    <DialogContent className='bg-secondary rounded-md gap-2.5 text-background border-0 w-[95vw] mobile:w-[90vw] tablet:w-[512px]' aria-describedby='dialog-content'>
                        <DialogHeader className='flex flex-col items-start text-background'>
                            <DialogTitle className='text-[1.35rem] phone:text-2xl text-background'>Ready to submit?</DialogTitle>
                            <div className='flex flex-col items-start text-left w-full gap-2 text-xs phone:text-sm tablet:text-base text-background'>
                                <p>Please confirm your message. Our team will try our best to respond via email within 24 hours.</p>
                                <div className='w-full flex flex-col gap-2'>
                                    {(Object.keys(formData) as (keyof MessageForm)[]).map((key: string, index: number) => {
                                        const split = key.split(/(?=[A-Z])/);
                                        const label = `${split.length == 2 && split[1].trim().length > 0 ? `${split[0]} ${split[1]}` : split[0]}${
                                            key === 'message' || key === 'email' ? '*' : ''
                                        }`;

                                        return (
                                            <div className='flex' key={key + 'modal'}>
                                                <label
                                                    htmlFor='name'
                                                    className='text-right text-nowrap lowercase items-center justify-end pr-3 inline-flex min-w-[100px] tablet:min-w-[112px]'
                                                >
                                                    {label}
                                                </label>
                                                {key == 'message' ? (
                                                    <textarea
                                                        value={formData[key as keyof MessageForm]}
                                                        onChange={handleChange}
                                                        autoComplete='off'
                                                        autoCapitalize='off'
                                                        name={key}
                                                        className={`${
                                                            formData[key as keyof MessageForm].length == 0 ? 'border-[2.5px] border-red-500 opacity-80' : 'border-0'
                                                        } text-sm outline-0 rounded-md text-secondary text-ellipsis overflow-y-auto bg-background min-h-[4.25rem] max-h-32 h-full w-full px-2 py-2 border-gray-100 shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)]`}
                                                    ></textarea>
                                                ) : (
                                                    <input
                                                        type='text'
                                                        value={formData[key as keyof MessageForm]}
                                                        autoComplete='off'
                                                        autoCapitalize='off'
                                                        onChange={handleChange}
                                                        name={key}
                                                        className={`${
                                                            key == 'email' && !/\S+@\S+\.\S+/.test(formData[key as keyof MessageForm])
                                                                ? 'border-red-500 opacity-80'
                                                                : 'border-transparent'
                                                        } border-[2.5px] text-sm outline-0 bg-background h-8 w-full rounded-md text-secondary px-2 py-2 shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)]`}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogClose
                            type='submit'
                            onClick={handleSubmit}
                            className='bg-background transition-all mt-2 hover:bg-background-light w-full text-secondary h-10 rounded-md text-sm'
                        >
                            Submit
                        </DialogClose>
                        <DialogClose className='bg-secondary hover:bg-background-dark text-background h-10 transition-all rounded-md text-sm hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                            Cancel
                        </DialogClose>
                    </DialogContent>
                </Dialog>
                <button
                    type='submit'
                    className='hidden px-20 py-1.5 text-background rounded-full border-2 border-background shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)] bg-secondary hover:bg-secondary-hover transition-colors'
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
