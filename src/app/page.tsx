import Footer from '@/_components/_footer/Footer';
import Carousel from '@/_components/_hero/Carousel';
import Hero from '@/_components/_hero/Hero';
import Navbar from '@/_components/_navbar/Navbar';

const page = () => {
    return (
        <>
            <div className='w-full h-full flex flex-col items-center px-5'>
                <Navbar />
                <Hero />
            </div>
            <Footer />
        </>
    );
};

export default page;
