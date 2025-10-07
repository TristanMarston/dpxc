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

const ActionBar = ({ collection }: { collection: string }) => {
    const context = useCollectionContext();
    if (context === undefined) throw new Error('useContext(CollectionContext) must be used within a CollectionContext.Provider');
    const { collectionData, setCollectionData, fetchState, setFetchState, schema, setSchema, selectedView, setSelectedView } = context;
    const [refreshed, setRefreshed] = useState(true);
    const [insertDocumentModal, setInsertDocumentModal] = useState(false);

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
                <div className='w-full bg-background-light rounded-2xl action-bar-horizontal:rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] action-bar-horizontal:flex items-center justify-between py-3 px-4 text-background-light'>
                    <div className='flex flex-col action-bar-horizontal:flex-row action-bar-horizontal:items-center justify-start gap-3'>
                        <Popover>
                            <PopoverTrigger className='bg-secondary w-full action-bar-horizontal:w-fit rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] font-semibold pl-6 pr-4 action-bar-horizontal:px-4 py-2 uppercase flex items-center action-bar-horizontal:justify-center gap-2 transition-colors hover:bg-secondary-hover'>
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
                        <div className='bg-background-lighter text-secondary w-full action-bar-horizontal:w-fit rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] font-semibold pl-6 pr-4 action-bar-horizontal:px-4 py-2 uppercase flex items-center action-bar-horizontal:justify-center gap-2 transition-colors hover:bg-background-lightest'>
                            {collectionData.length} ENTRIES
                        </div>
                        <div
                            onClick={() => refreshDocuments()}
                            className='cursor-pointer action-bar-horizontal:hidden flex bg-background-lighter text-secondary w-full action-bar-horizontal:w-fit rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] font-semibold pl-6 pr-4 action-bar-horizontal:px-4 py-2 uppercase items-center action-bar-horizontal:justify-center gap-2 transition-colors hover:bg-background-lightest'
                        >
                            {refreshed ? <RotateCcw className='text-secondary' strokeWidth={2.5} /> : <Loader className='text-secondary animate-spin' strokeWidth={2.5} />}
                            REFRESH
                        </div>
                        {/* <button className='bg-background-lighter text-secondary rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)] font-semibold w-fit px-4 py-2 uppercase flex items-center justify-center gap-2 transition-colors hover:bg-background-lightest'>
                        <Trash2 className='w-5 h-5' strokeWidth={2.5} />
                        DELETE
                    </button> */}
                    </div>
                    <div className='hidden action-bar-horizontal:flex items-center justify-end gap-2'>
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

export default ActionBar;
