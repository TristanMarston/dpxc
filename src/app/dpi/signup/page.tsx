import Footer from '@/_components/_footer/Footer';
import Navbar from '@/_components/_navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import SignUp from './_components/SignUp';

const page = () => {
    return (
        <>
            <Toaster />
            <div className='w-full h-full flex flex-col items-center px-5'>
                <Navbar />
                <SignUp />
            </div>
            <Footer />
        </>
    );
};

export default page;
