import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { forwardRef, memo, Suspense } from 'react';

const fallback = <div style={{ background: '#00295E', width: 24, height: 24 }} />;

interface IconProps extends LucideProps {
    name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name]);

    return (
        <Suspense fallback={fallback}>
            <LucideIcon {...props} />
        </Suspense>
    );
};

export default memo(Icon);
