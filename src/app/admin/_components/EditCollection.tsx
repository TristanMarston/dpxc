'use client';

import { delaGothic } from '@/app/context';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ActionBar from './_sections/ActionBar';
import FormattedView from './_sections/FormattedView';
import JSONView from './_sections/JSONView';
import GridView from './_sections/GridView';
import { fetchCollectionData, useCollectionContext } from '../context';

const EditCollection = ({ collection }: { collection: string }) => {
    const context = useCollectionContext();
    if (context === undefined) throw new Error('useContext(CollectionContext) must be used within a CollectionContext.Provider');
    const { collectionData, setCollectionData, fetchState, setFetchState, schema, setSchema, selectedView, setSelectedView } = context;

    const fetchCollection = async () => {
        const result = await fetchCollectionData(collection);

        if (result.status === 200 && result.data) {
            console.log(result);
            setCollectionData(result.data.data);
            setSchema([...result.data.schema]);
            setFetchState('success');
        } else setFetchState('failed');
    };

    useEffect(() => {
        fetchCollection();
    }, []);

    return (
        <div className='mt-28 text-secondary w-full flex flex-col items-center gap-6 max-w-[1400px]'>
            {fetchState === 'loading' ? (
                <div className='w-full h-screen flex justify-center items-center -mt-28'>
                    <div className='loader w-24 h-24'></div>
                </div>
            ) : fetchState === 'failed' ? (
                <h3 className='text-2xl font-bold'>Something went wrong. Try refreshing?</h3>
            ) : (
                fetchState === 'success' && (
                    <div className='w-full flex flex-col items-center'>
                        <section className='text-center flex flex-col items-center'>
                            <h1
                                className={`${delaGothic.className} text-3xl min-[390px]:text-4xl mobile:text-5xl tablet:text-6xl taptop:text-7xl text-center font-bold text-secondary tracking-wide uppercase [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                            >
                                {collection}
                            </h1>
                            <h3
                                className={`${delaGothic.className} text-base mt-3 max-w-[700px] text-center font-bold text-secondary tracking-wide [text-shadow:_3px_3px_3px_rgba(0,0,0)]`}
                            >
                                This is the {collection} collection, you may edit any of the fields below.
                            </h3>
                        </section>
                        <ActionBar collection={collection} />
                        {selectedView === 'formatted' ? (
                            <FormattedView collection={collection} />
                        ) : selectedView === 'json' ? (
                            <JSONView collectionData={collectionData} setCollectionData={setCollectionData} schema={schema} />
                        ) : (
                            selectedView === 'grid' && <GridView collectionData={collectionData} setCollectionData={setCollectionData} schema={schema} />
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default EditCollection;
