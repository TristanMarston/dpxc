import { motion } from 'framer-motion';
import { CirclePlus, FileText, Loader, RotateCcw, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import Icon from '@/_components/Icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React, { useEffect, useRef, useState } from 'react';
import { fetchCollectionData, useCollectionContext } from '../../context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CreateDocument from './CreateDocument';

type View = 'formatted' | 'json' | 'grid';

const ActionBar = ({ collection }: { collection: string }) => {
    const context = useCollectionContext();
    if (context === undefined) throw new Error('useContext(CollectionContext) must be used within a CollectionContext.Provider');
    const { collectionData, setCollectionData, fetchState, setFetchState, schema, setSchema, selectedView, setSelectedView } = context;
    const [refreshed, setRefreshed] = useState(true);
    const [insertDocumentModal, setInsertDocumentModal] = useState(false);

    const views: { view: View; icon: keyof typeof dynamicIconImports }[] = [
        { view: 'formatted', icon: 'menu' },
        { view: 'json', icon: 'braces' },
        { view: 'grid', icon: 'layout-grid' },
    ];

    const refreshDocuments = async () => {
        setRefreshed(false);
        const result = await fetchCollectionData(collection);

        if (result.status === 200 && result.data) {
            setCollectionData(result.data.data);
            setSchema([...result.data.schema]);
            setFetchState('success');
            setRefreshed(true);
        } else setFetchState('failed');
    };

    return (
        <>
            <section className='w-full mt-10'>
                <div className='w-full bg-background-light rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] flex items-center justify-between py-3 px-4 text-background-light'>
                    <div className='flex items-center justify-start gap-3'>
                        <Popover>
                            <PopoverTrigger className='bg-secondary rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] font-semibold w-fit px-4 py-2 uppercase flex items-center justify-center gap-2 transition-colors hover:bg-secondary-hover'>
                                <CirclePlus className='w-5 h-5' strokeWidth={2.5} />
                                ADD DATA
                            </PopoverTrigger>
                            <PopoverContent align='start' className='bg-secondary text-background-light left-0 border-0 flex flex-col p-0'>
                                <PopoverClose className='flex gap-3 items-center text-background-light font-bold rounded-md hover:bg-secondary-hover transition-colors px-3 pb-2 pt-3'>
                                    <FileText />
                                    <h3>Import JSON or CSV</h3>
                                </PopoverClose>
                                <PopoverClose
                                    onClick={() => setInsertDocumentModal(true)}
                                    className='flex gap-3 items-center text-background-light font-bold rounded-md hover:bg-secondary-hover transition-colors px-3 pt-2 pb-3'
                                >
                                    <CirclePlus />
                                    <h3>Insert Document</h3>
                                </PopoverClose>
                            </PopoverContent>
                        </Popover>
                        <button className='bg-background-lighter text-secondary rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] font-semibold w-fit px-4 py-2 uppercase flex items-center justify-center gap-2 transition-colors hover:bg-background-lightest'>
                            <SquareArrowOutUpRight className='w-5 h-5' strokeWidth={2.5} />
                            EXPORT DATA
                        </button>
                        {/* <button className='bg-background-lighter text-secondary rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] font-semibold w-fit px-4 py-2 uppercase flex items-center justify-center gap-2 transition-colors hover:bg-background-lightest'>
                        <Trash2 className='w-5 h-5' strokeWidth={2.5} />
                        DELETE
                    </button> */}
                    </div>
                    <div className='flex items-center justify-end gap-2'>
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger
                                    className='grid place-items-center bg-background-light hover:bg-background-lighter p-2 rounded-full cursor-pointer transition-colors'
                                    onClick={() => refreshDocuments()}
                                >
                                    {refreshed ? <RotateCcw className='text-secondary' strokeWidth={2.5} /> : <Loader className='text-secondary animate-spin' strokeWidth={2.5} />}
                                </TooltipTrigger>
                                <TooltipContent className='bg-background text-secondary outline-none border-none'>Refresh</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {/* <div className='bg-background-lighter rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] p-1 font-semibold w-fit h-fit uppercase flex items-center justify-center gap-1 relative max-h-10'>
                        {views.map(({ view, icon }, index) => (
                            <DisplayChip view={view} icon={icon} selectedView={selectedView} setSelectedView={setSelectedView} key={view + index} />
                        ))}
                    </div> */}
                    </div>
                </div>
            </section>
            <Dialog open={insertDocumentModal} onOpenChange={setInsertDocumentModal}>
                <DialogContent className='bg-secondary rounded-md gap-2.5 text-background border-0 w-[95vw] mobile:w-[90vw] tablet:w-[512px]'>
                    <CreateDocument collection={collection} duplicate={false} data={{}} />
                </DialogContent>
            </Dialog>
        </>
    );
};

const DisplayChip = ({
    icon,
    view,
    selectedView,
    setSelectedView,
}: {
    icon: keyof typeof dynamicIconImports;
    view: View;
    selectedView: View;
    setSelectedView: React.Dispatch<React.SetStateAction<View>>;
}) => {
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (iconRef.current) iconRef.current.setAttribute('class', selectedView === view ? 'relative z-10 text-background-lighter' : 'relative z-10 text-secondary');
    }, [selectedView]);

    return (
        <button onClick={() => setSelectedView(view)} className='px-2 py-2 relative rounded-full w-1/3'>
            {selectedView === view && (
                <motion.span layoutId='pill-tab' transition={{ type: 'spring', duration: 0.5 }} className='rounded-full my-1 absolute inset-0 z-0 bg-secondary w-full'></motion.span>
            )}
            <div ref={iconRef} className='relative z-10'>
                <Icon name={icon} />
            </div>
        </button>
    );
};

export default ActionBar;
