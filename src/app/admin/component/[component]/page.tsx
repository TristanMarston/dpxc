import Navbar from '@/_components/_navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import EditCollection from '../../_components/EditCollection';
import { CollectionProvider } from '../../context';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async (props: { params: Promise<{ component: string }> }) => {
    const params = await props.params;
    return (
        <CollectionProvider>
            <Toaster />
            <div className='w-full h-fit flex flex-col items-center px-5'>
                <Navbar />
                <EditCollection collection={params.component} />
            </div>
        </CollectionProvider>
    );
};

export default page;
