'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
    const router = useRouter();

    useEffect(() => router.push('/dpi/community-sign-up'), []);

    return <></>;
};

export default Page;
