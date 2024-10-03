import Navbar from '@/_components/_navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import EditCollection from '../../_components/EditCollection';
import { CollectionProvider } from '../../context';

const page = ({ params }: { params: { component: string } }) => {
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
