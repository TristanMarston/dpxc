import Footer from '@/_components/_footer/Footer';
import Navbar from '@/_components/_navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import SignUp from './_components/SignUp';
import { Suspense } from 'react';

const page = () => {
    return (
        <Suspense>
            <Toaster />
            <div className='w-full h-fit flex flex-col items-center px-5'>
                <Navbar />
                <SignUp />
            </div>
            <Footer />
        </Suspense>
    );
};

export default page;
