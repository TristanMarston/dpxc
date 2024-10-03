import ContactUs from './ContactUs';
import Image from 'next/image';
import GoldLayeredWave from './GoldLayeredWave';

const Footer = ({ negativeSpacing = false }) => {
    return (
        <>
            <GoldLayeredWave negativeSpacing={negativeSpacing} />
            <section className='bg-secondary w-screen flex flex-col items-center px-5 pb-10' id='contact'>
                <a href='/'>
                    <Image src={'/dpxclogo.png'} alt='logo' width={200} height={200} />
                </a>
                <ContactUs />
            </section>
        </>
    );
};

export default Footer;
