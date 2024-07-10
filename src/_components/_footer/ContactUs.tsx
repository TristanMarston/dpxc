import Link from 'next/link';

const ContactUs = () => {
    return (
        <div className='w-full text-center flex flex-col gap-1 text-background'>
            {/* <h2 className='text-xl text-center font-bold'>Have any questions?</h2>
            <p>Email us at</p>
            <Link href='mailto:dpxc@gmail.com' className='underline'>
                dpxc@gmail.com
            </Link> */}
            <div className='flex flex-col gap-5 mb-5'>
                <h1 className={`text-xl font-bold text-center`}>Have any questions?</h1>
                <h4 className={`text-sm text-center flex flex-col gap-y-3`}>
                    <p className='block tablet:hidden'>
                        Contact us below, or email{' '}
                        <a className='underline' href='mailto:dpxc@gmail.com'>
                            dpxc@gmail.com
                        </a>
                    </p>
                    <p className='hidden tablet:block'>
                        Contact us at below, or email{' '}
                        <a className='underline' href='mailto:dpxc@gmail.com'>
                            dpxc@gmail.com
                        </a>
                    </p>
                    <p>Our team will try our best to respond within 24 hours. If you do not receive a reply promptly, please send another message or email.</p>
                </h4>
            </div>
        </div>
    );
};

export default ContactUs;
