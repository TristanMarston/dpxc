'use client';

import { delaGothic } from '@/app/context';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [collections, setCollections] = useState<string[]>([]);

    useEffect(() => {
        const fetchCollections = async () => {
            axios
                .get('/api/admin/fetch/collections')
                .then((res) => {
                    if (res.status === 201) {
                        setCollections(res.data.names);
                    }
                })
                .catch((err) => {
                    console.log('Error fetching data:', err.response ? err.response.data : err.message);
                    console.error(err);
                });
        };

        fetchCollections();
    }, []);

    return (
        <div className='mt-28 text-secondary w-full flex flex-col items-center gap-6'>
            <div className='text-center'>
                <h1
                    className={`${delaGothic.className} text-2xl text-nowrap tiny:text-[26px] min-[390px]:text-3xl mobile:text-4xl tablet:text-5xl taptop:text-6xl laptop:text-7xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                >
                    DPXC ADMIN
                </h1>
                <h3 className={`${delaGothic.className} text-base mt-3 max-w-[700px] text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}>
                    Welcome to the DPXC administration console! Use the search bar on the left to find various administrative actions, and look on the right for results and databases.
                </h3>
            </div>
            <ResizablePanelGroup direction='horizontal' className='min-h-[75vh] w-full rounded-lg border border-secondary'>
                <ResizablePanel defaultSize={35} minSize={25} maxSize={60}>
                    <div className='flex flex-col w-full h-full p-6'>
                        <SearchBar collections={collections} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle className='text-background bg-secondary' />
                <ResizablePanel defaultSize={65} minSize={40} maxSize={75}>
                    <div className='flex h-full items-center justify-center p-6'>
                        <span className='font-semibold'>Content</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

const SearchBar = ({ collections }: { collections: string[] }) => {
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState('');

    return (
        <div className='bg-background-light h-fit w-full rounded-xl shadow-[0_4px_30px_rgba(0,0,0,.4)] *:text-secondary relative'>
            <input
                placeholder='Search...'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`outline-none w-full bg-background-light text-secondary pl-10 pr-2 py-2.5 rounded-xl placeholder:text-secondary placeholder:opacity-80`}
            />
            <Search className='absolute left-3 top-3 opacity-80 w-5 h-5' />
            <motion.div
                initial='collapsed'
                animate={focused ? 'open' : 'collapsed'}
                variants={{
                    open: { opacity: 1, height: '250px', display: 'block', borderTop: '1px solid #ffd500' },
                    collapsed: { opacity: 0, height: '0px', display: 'none', borderTop: '0' },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
                <section>
                    <div className='bg-background-lighter w-full py-1 pl-2 text-secondary font-bold tracking-wide'>DATABASES</div>
                    {collections.map((collection, index) => (
                        <div key={collection + index} className='px-2 py-2 w-full'>
                            <Link href={`/admin/collection/${collection}`} className='block w-full rounded-lg hover:bg-background-lightest py-1 px-2 transition-colors capitalize'>
                                {collection}
                            </Link>
                        </div>
                    ))}
                </section>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
