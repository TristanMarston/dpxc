'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { delaGothic } from '@/app/context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordHidden, setPasswordHidden] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastID = toast.loading('Signing in...', {
            className: '!bg-secondary-light !text-black',
            position: 'top-center',
        });

        axios
            .post(`/api/admin/login`, JSON.stringify({ username, password }))
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Successfully signed in!', {
                        id: toastID,
                        duration: 4000,
                    });

                    router.push('/admin');
                }
            })
            .catch((err) => {
                toast.error('Invalid username or password', {
                    id: toastID,
                    duration: 4000,
                });
            });
    };

    return (
        <div className='mt-28 text-secondary w-full flex flex-col items-center gap-6'>
            <div className='text-center'>
                <h1
                    className={`${delaGothic.className} text-2xl text-nowrap tiny:text-[26px] min-[390px]:text-3xl mobile:text-4xl tablet:text-5xl taptop:text-6xl laptop:text-7xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                >
                    DPXC ADMIN
                </h1>
                <h3 className={`${delaGothic.className} text-base mt-3 text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}>
                    Welcome to the DPXC administration console! Please sign in below.
                </h3>
            </div>
            <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
                <div className='w-full flex flex-col gap-5 max-w-[800px] bg-background-light rounded-lg shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)] px-4 py-6'>
                    <div className='w-full relative group'>
                        <input
                            className='w-full outline-none border-[1.5px] border-secondary px-3.5 py-2 flex items-center bg-background-light rounded-md shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)]'
                            id='username'
                            type='text'
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={() => setUsernameFocused(false)}
                        />
                        <label
                            htmlFor='username'
                            className={`transform select-none cursor-text transition-all bg-background-light origin-[0] duration-300 absolute opacity-90 top-0 left-0 h-3/4 translate-y-1.5 flex items-center ml-3.5 text-sm ${
                                usernameFocused || username.length > 0 ? '!text-[11px] !h-1/2 !-translate-y-2.5 !ml-2.5 !px-1 !opacity-100' : ''
                            }`}
                        >
                            Username
                        </label>
                    </div>
                    <div className='w-full relative group'>
                        <input
                            className='w-full outline-none border-[1.5px] border-secondary px-3.5 py-2 flex items-center bg-background-light rounded-md shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)] peer'
                            id='password'
                            type={passwordHidden ? 'password' : 'text'}
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                        <label
                            htmlFor='password'
                            className={`transform select-none cursor-text transition-all bg-background-light origin-[0] duration-300 absolute opacity-90 top-0 left-0 h-3/4 translate-y-1.5 flex items-center ml-3.5 text-sm ${
                                passwordFocused || password.length > 0 ? '!text-[11px] !h-1/2 !-translate-y-2.5 !ml-2.5 !px-1 !opacity-100' : ''
                            }`}
                        >
                            Password
                        </label>
                        {passwordHidden ? (
                            <EyeOff onClick={() => setPasswordHidden((prev) => !prev)} className='absolute right-4 top-0 translate-y-2 text-secondary' />
                        ) : (
                            <Eye onClick={() => setPasswordHidden((prev) => !prev)} className='absolute right-4 top-0 translate-y-2 text-secondary' />
                        )}
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-secondary text-background-light py-2 font-semibold transition-colors hover:bg-secondary-hover rounded-md shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_0px_0px_rgba(25,28,33,0.04),0px_0px_0px_2px_rgba(25,28,33,0.16)]'
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
