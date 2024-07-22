import Footer from '@/_components/_footer/Footer';
import Hero from '@/_components/_hero/Hero';
import Navbar from '@/_components/_navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const page = () => {
    return (
        <>
            <Toaster />
            <div className='w-full h-full flex flex-col items-center px-5'>
                <Navbar />
                <Hero />
            </div>
            <Footer />
        </>
    );
};

export default page;
