import Hero from '@/_components/_hero/Hero';
import Navbar from '@/_components/_navbar/Navbar';

const page = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <Navbar />
            <Hero />
        </div>
    );
};

export default page;
