import React, { useEffect, useRef } from 'react';

const FitText = ({ text, className, align }: { text: string; className: string; align: 'left' | 'right' | 'center' }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        resizeText();

        window.addEventListener('resize', resizeText);

        return () => {
            window.removeEventListener('resize', resizeText);
        };
    }, []);

    const resizeText = () => {
        const container = containerRef.current;
        const text = textRef.current;
        const maxFont = 16;

        if (!container || !text) {
            return;
        }

        const containerWidth = container.offsetWidth;
        let min = 1;
        let max = 2500;

        while (min <= max) {
            const mid = Math.floor((min + max) / 2);
            text.style.fontSize = mid + 'px';

            if (text.offsetWidth <= containerWidth) {
                min = mid + 1;
            } else {
                max = mid - 1;
            }
        }

        text.style.fontSize = `${max > maxFont ? maxFont : max}px`;
    };

    return (
        <div
            className={`flex w-full items-center overflow-hidden ${
                align === 'left' ? 'justify-left' : align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-center'
            }`}
            ref={containerRef}
        >
            <span className={`bottom-0 left-0 whitespace-nowrap text-center ${className}`} ref={textRef}>
                {text}
            </span>
        </div>
    );
};

export default FitText;
