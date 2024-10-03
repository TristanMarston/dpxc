'use client';

import { delaGothic, useScreenWidth } from '@/app/context';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const pageCollections: string[] = [];
const componentCollections: string[] = ['navbar'];

const AdminDashboard = () => {
    const [collections, setCollections] = useState<string[]>([]);
    const [pages, setPages] = useState<string[]>([]);
    const [components, setComponents] = useState<string[]>([]);
    const [fetched, setFetched] = useState(false);
    const screenWidth = useScreenWidth();

    const [combinedCollections, setCombinedCollections] = useState<{ name: string; type: string }[]>([]);
    const [filteredResults, setFilteredResults] = useState<{ name: string; type: string }[]>([]);

    useEffect(() => {
        const fetchCollections = async () => {
            axios
                .get('/api/admin/fetch/collections')
                .then((res) => {
                    if (res.status === 201) {
                        const collectionsData = [...res.data.names.filter((name: string) => !pageCollections.includes(name) && !componentCollections.includes(name))];
                        const componentsData = [...res.data.names.filter((name: string) => componentCollections.includes(name))];
                        const pagesData = [...res.data.names.filter((name: string) => pageCollections.includes(name))];

                        setCombinedCollections(() => {
                            const result: { name: string; type: string }[] = [];
                            collectionsData.forEach((name) => result.push({ name, type: 'collection' }));
                            componentsData.forEach((name) => result.push({ name, type: 'component' }));
                            pagesData.forEach((name) => result.push({ name, type: 'page' }));
                            return result;
                        });

                        setCollections(() => collectionsData);
                        setComponents(() => componentsData);
                        setPages(() => pagesData);
                        setFetched(true);
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
        <div className='mt-28 text-secondary w-full flex flex-col items-center gap-6 max-w-[1400px]'>
            <div className='text-center'>
                <h1
                    className={`${delaGothic.className} text-3xl text-nowrap min-[390px]:text-4xl mobile:text-5xl tablet:text-6xl taptop:text-7xl text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                >
                    DPXC ADMIN
                </h1>
                <h3 className={`${delaGothic.className} text-base mt-3 max-w-[700px] text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}>
                    Welcome to the DPXC administration console! Use the search bar on the left to find various administrative actions, and look on the right for results and databases.
                </h3>
            </div>
            <ResizablePanelGroup direction={screenWidth > 700 ? 'horizontal' : 'vertical'} className='w-full rounded-lg border-2 border-secondary lablet:max-h-[600px] mb-5'>
                <ResizablePanel defaultSize={35} minSize={25} maxSize={60} className='max-lablet:!basis-auto min-w-[280px]'>
                    <div className='flex flex-col w-full h-full p-6'>
                        <SearchBar combinedCollections={combinedCollections} filteredResults={filteredResults} setFilteredResults={setFilteredResults} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle={screenWidth > 700} className='text-background bg-secondary' />
                <ResizablePanel defaultSize={65} minSize={40} maxSize={75} className='max-lablet:!basis-auto'>
                    <div className='flex flex-col gap-6 h-full p-6 overflow-y-scroll max-h-[500px] lablet:max-h-none'>
                        {fetched ? (
                            filteredResults.map(({ name, type }, index) => (
                                <Link
                                    href={`/admin/${type}/${name.replaceAll(' ', '-')}`}
                                    key={name + index}
                                    className='w-full min-h-[150px] rounded-xl bg-background-light border-2 border-secondary shadow-[5px_5px_0px_0px_rgba(255,213,0)] flex flex-col justify-between p-4 transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] hover:bg-background-lighter cursor-pointer'
                                >
                                    <h3 className='font-bold tracking-wider lowercase text-lg'>{name}</h3>
                                    <h6 className='font-semibold uppercase tracking-wide text-sm'>{type}</h6>
                                </Link>
                            ))
                        ) : (
                            <>
                                <Skeleton className='w-full min-h-[150px] rounded-xl bg-background-light border-2 border-secondary shadow-[5px_5px_0px_0px_rgba(255,213,0)] flex flex-col justify-between p-4 transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] hover:bg-background-lighter cursor-pointer' />
                                <Skeleton className='w-full min-h-[150px] rounded-xl bg-background-light border-2 border-secondary shadow-[5px_5px_0px_0px_rgba(255,213,0)] flex flex-col justify-between p-4 transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] hover:bg-background-lighter cursor-pointer' />
                                <Skeleton className='w-full min-h-[150px] rounded-xl bg-background-light border-2 border-secondary shadow-[5px_5px_0px_0px_rgba(255,213,0)] flex flex-col justify-between p-4 transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] hover:bg-background-lighter cursor-pointer' />
                                <Skeleton className='w-full min-h-[150px] rounded-xl bg-background-light border-2 border-secondary shadow-[5px_5px_0px_0px_rgba(255,213,0)] flex flex-col justify-between p-4 transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] hover:bg-background-lighter cursor-pointer' />
                            </>
                        )}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

const SearchBar = ({
    combinedCollections,
    filteredResults,
    setFilteredResults,
}: {
    combinedCollections: { name: string; type: string }[];
    filteredResults: { name: string; type: string }[];
    setFilteredResults: React.Dispatch<React.SetStateAction<{ name: string; type: string }[]>>;
}) => {
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState('');
    const sections = ['collection', 'component', 'page'];

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredResults(combinedCollections);
            return;
        } else setFilteredResults(combinedCollections.filter((collection) => collection.name.toLowerCase().includes(query.toLowerCase())));
    }, [query, combinedCollections]);

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
                    open: { opacity: 1, height: `fit-content`, display: 'block', borderTop: '1px solid #ffd500' },
                    collapsed: { opacity: 0, height: '0px', display: 'none', borderTop: '0' },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
                <section className='flex flex-col gap-1.5 pb-1.5'>
                    {filteredResults.length > 0 ? (
                        sections.map(
                            (type, index) =>
                                filteredResults.filter((collection) => collection.type === type).length > 0 && (
                                    <div key={type + index}>
                                        <div className={`bg-background-lighter w-full py-1 pl-2 text-secondary font-bold tracking-wide mb-1.5 uppercase`}>{type}s</div>
                                        {filteredResults
                                            .filter((collection) => collection.type === type)
                                            .map(({ name, type }, index) => (
                                                <Link href={`/admin/${type}/${name.replaceAll(' ', '-')}`}>
                                                    <div key={name + index} className='px-2 w-full h-fit'>
                                                        <span className='block w-full rounded-lg hover:bg-background-lightest py-1 px-2 transition-colors lowercase'>{name}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                )
                        )
                    ) : (
                        <div className='py-3 flex flex-col items-center justify-center font-bold gap-1'>
                            <span>No results found.</span>
                            <span>Try searching again?</span>
                        </div>
                    )}
                </section>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
