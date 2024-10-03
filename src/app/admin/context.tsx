'use client';

import axios from 'axios';
import { createContext, useContext, useState } from 'react';

export type View = 'formatted' | 'json' | 'grid';
export type FetchState = 'loading' | 'success' | 'failed';

type Context = {
    collectionData: any[];
    setCollectionData: React.Dispatch<React.SetStateAction<any[]>>;
    fetchState: FetchState;
    setFetchState: React.Dispatch<React.SetStateAction<FetchState>>;
    schema: any[];
    setSchema: React.Dispatch<React.SetStateAction<any[]>>;
    selectedView: View;
    setSelectedView: React.Dispatch<React.SetStateAction<View>>;
};

export const fetchCollectionData = async (collection: string) => {
    return axios
        .get(`/api/admin/fetch/collections/${collection}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const CollectionContext = createContext<Context | undefined>(undefined);
export const useCollectionContext = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }: any) => {
    const [collectionData, setCollectionData] = useState<any[]>([]);
    const [fetchState, setFetchState] = useState<FetchState>('loading');
    const [schema, setSchema] = useState<any[]>([]);
    const [selectedView, setSelectedView] = useState<View>('formatted');

    return (
        <CollectionContext.Provider value={{ collectionData, setCollectionData, fetchState, setFetchState, schema, setSchema, selectedView, setSelectedView }}>
            {children}
        </CollectionContext.Provider>
    );
};
