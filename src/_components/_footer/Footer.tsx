import ContactUs from './ContactUs';
import Image from 'next/image';
import LayeredWave from './LayeredWave';

const Footer = () => {
    return (
        <>
            <LayeredWave />
            <section className='bg-secondary w-screen flex flex-col items-center px-5 pb-10'>
                <a href='/'>
                    <Image src={'/dpxclogo.png'} alt='logo' width={200} height={200} />
                </a>
                <ContactUs />
            </section>
        </>
    );
};

export default Footer;
