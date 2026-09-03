import Footer from '@/_components/_footer/Footer';
import Navbar from '@/_components/_navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import SignUp from './_components/SignUp';
import { Suspense } from 'react';
import FAQ from '@/_components/FAQ';

const page = () => {
    return (
        <Suspense>
            <Toaster />
            <div className='w-full h-fit flex flex-col items-center px-5'>
                <Navbar />
                <SignUp />
                <FAQ className='mt-16 px-2 mobile:px-3 tablet:px-4 taptop:px-8 laptop:px-12' setWidth={false} signInQuestions />
            </div>
            <Footer />
        </Suspense>
    );
};

export default page;
