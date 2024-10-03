'use client';

import Navbar from '@/_components/_navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import EditCollection from '../../_components/EditCollection';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CollectionProvider } from '../../context';

type ComponentProps = {
    collection: string;
};

const Page = ({ params }: { params: { collection: string } }) => {
    const customPage = useSearchParams().get('customPage');

    let DynamicComponent: React.ComponentType<ComponentProps> | null = null;

    if (customPage) {
        const componentName = (customPage as string).replace('.tsx', '');
        DynamicComponent = dynamic(() => import(`../../_components/${componentName}`), {
            ssr: false,
            loading: () => <div>Loading...</div>,
        });
    }

    return (
        <CollectionProvider>
            <Toaster />
            <div className='w-full h-fit flex flex-col items-center px-5'>
                <Navbar />
                {customPage !== null && customPage !== undefined && customPage.length > 0 && DynamicComponent ? (
                    <DynamicComponent collection={params.collection} />
                ) : (
                    <EditCollection collection={params.collection} />
                )}
            </div>
        </CollectionProvider>
    );
};

export default Page;
