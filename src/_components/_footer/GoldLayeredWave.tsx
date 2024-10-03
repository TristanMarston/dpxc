'use client';

import { useEffect, useRef } from 'react';

const GoldLayeredWave = ({ negativeSpacing = false }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const bbox = getSVGBoundingBox(svgRef.current);
            svgRef.current.setAttribute('viewBox', `${bbox.x} ${bbox.y - 5} ${bbox.width} ${bbox.height}`);
        }
    }, []);

    const getSVGBoundingBox = (svg: SVGSVGElement): DOMRect => {
        const paths = svg.querySelectorAll('path');
        let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;

        paths.forEach((path) => {
            const bbox = path.getBBox();
            if (bbox.x < minX) minX = bbox.x;
            if (bbox.y < minY) minY = bbox.y;
            if (bbox.x + bbox.width > maxX) maxX = bbox.x + bbox.width;
            if (bbox.y + bbox.height > maxY) maxY = bbox.y + bbox.height;
        });

        return new DOMRect(minX, minY, maxX - minX, maxY - minY);
    };

    return (
        <svg
            className={`w-screen ${negativeSpacing ? '-mt-36' : 'mt-36'}`}
            id='visual'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            ref={svgRef}
            version='1.1'
        >
            <rect x='0' y='0' fill='#001E44'></rect>

            <path
                d='M0 576L25 568.5C50 561 100 546 150 552.8C200 559.7 250 588.3 300 597.2C350 606 400 595 450 581.2C500 567.3 550 550.7 600 554.7C650 558.7 700 583.3 750 593.8C800 604.3 850 600.7 875 598.8L900 597L900 811L875 811C850 811 800 811 750 811C700 811 650 811 600 811C550 811 500 811 450 811C400 811 350 811 300 811C250 811 200 811 150 811C100 811 50 811 25 811L0 811Z'
                fill='#fff2b2'
            ></path>
            <path
                d='M0 634L25 621.5C50 609 100 584 150 575C200 566 250 573 300 587C350 601 400 622 450 617.5C500 613 550 583 600 587.2C650 591.3 700 629.7 750 629.3C800 629 850 590 875 570.5L900 551L900 811L875 811C850 811 800 811 750 811C700 811 650 811 600 811C550 811 500 811 450 811C400 811 350 811 300 811C250 811 200 811 150 811C100 811 50 811 25 811L0 811Z'
                fill='#ffed98'
            ></path>
            <path
                d='M0 584L25 601.5C50 619 100 654 150 659.7C200 665.3 250 641.7 300 637.8C350 634 400 650 450 660.7C500 671.3 550 676.7 600 673C650 669.3 700 656.7 750 651.8C800 647 850 650 875 651.5L900 653L900 811L875 811C850 811 800 811 750 811C700 811 650 811 600 811C550 811 500 811 450 811C400 811 350 811 300 811C250 811 200 811 150 811C100 811 50 811 25 811L0 811Z'
                fill='#ffe77d'
            ></path>
            <path
                d='M0 674L25 666.7C50 659.3 100 644.7 150 644.8C200 645 250 660 300 675.8C350 691.7 400 708.3 450 716.3C500 724.3 550 723.7 600 722C650 720.3 700 717.7 750 718C800 718.3 850 721.7 875 723.3L900 725L900 811L875 811C850 811 800 811 750 811C700 811 650 811 600 811C550 811 500 811 450 811C400 811 350 811 300 811C250 811 200 811 150 811C100 811 50 811 25 811L0 811Z'
                fill='#ffe160'
            ></path>
            <path
                d='M0 703L25 698.5C50 694 100 685 150 688.3C200 691.7 250 707.3 300 708.7C350 710 400 697 450 700.5C500 704 550 724 600 734.5C650 745 700 746 750 742.8C800 739.7 850 732.3 875 728.7L900 725L900 811L875 811C850 811 800 811 750 811C700 811 650 811 600 811C550 811 500 811 450 811C400 811 350 811 300 811C250 811 200 811 150 811C100 811 50 811 25 811L0 811Z'
                fill='#ffdb3f'
            ></path>
            <path
                d='M0 732L25 735.5C50 739 100 746 150 753.7C200 761.3 250 769.7 300 767.8C350 766 400 754 450 746.3C500 738.7 550 735.3 600 732.8C650 730.3 700 728.7 750 733C800 737.3 850 747.7 875 752.8L900 758L900 811L875 811C850 811 800 811 750 811C700 811 650 811 600 811C550 811 500 811 450 811C400 811 350 811 300 811C250 811 200 811 150 811C100 811 50 811 25 811L0 811Z'
                fill='#ffd500'
            ></path>
        </svg>
    );
};

export default GoldLayeredWave;
