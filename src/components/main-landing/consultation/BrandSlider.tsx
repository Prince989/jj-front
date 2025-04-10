import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const tabs = [
    { id: 'digital', title: 'برند های دیجیتال', active: true },
    { id: 'clothing', title: 'برند های مد و پوشاک' },
    { id: 'cosmetic', title: 'برند های آرایشی بهداشتی' },
    { id: 'home', title: 'برند های لوازم خانگی' },
];

const brands = {
    digital: [
        { id: 1, name: 'Apple', logo: '/images/main-landing/apple.svg' },
        { id: 2, name: 'Samsung', logo: '/images/main-landing/samsung.svg' },
        { id: 3, name: 'Huawei', logo: '/images/main-landing/huawei.svg' },
        { id: 4, name: 'Xiaomi', logo: '/images/main-landing/xiaomi.svg' },
        { id: 5, name: 'LG', logo: '/images/main-landing/lg.svg' },
        { id: 6, name: 'Samsung', logo: '/images/main-landing/samsung.svg' },
    ],
    clothing: [
        { id: 1, name: 'Nike', logo: '/images/main-landing/nike.svg' },
        { id: 2, name: 'Adidas', logo: '/images/main-landing/adidas.svg' },
        { id: 3, name: 'Zara', logo: '/images/main-landing/zara.svg' },
        { id: 4, name: 'H&M', logo: '/images/main-landing/hm.svg' },
        { id: 5, name: 'Puma', logo: '/images/main-landing/puma.svg' },
        { id: 6, name: 'Levi\'s', logo: '/images/main-landing/levis.svg' },
    ],
    cosmetic: [
        { id: 1, name: 'L\'Oreal', logo: '/images/main-landing/loreal.svg' },
        { id: 2, name: 'Estee Lauder', logo: '/images/main-landing/estee.svg' },
        { id: 3, name: 'MAC', logo: '/images/main-landing/mac.svg' },
        { id: 4, name: 'Maybelline', logo: '/images/main-landing/maybelline.svg' },
        { id: 5, name: 'Revlon', logo: '/images/main-landing/revlon.svg' },
        { id: 6, name: 'Clinique', logo: '/images/main-landing/clinique.svg' },
    ],
    home: [
        { id: 1, name: 'Bosch', logo: '/images/main-landing/bosch.svg' },
        { id: 2, name: 'Siemens', logo: '/images/main-landing/siemens.svg' },
        { id: 3, name: 'LG', logo: '/images/main-landing/lg.svg' },
        { id: 4, name: 'Samsung', logo: '/images/main-landing/samsung.svg' },
        { id: 5, name: 'Whirlpool', logo: '/images/main-landing/whirlpool.svg' },
        { id: 6, name: 'Electrolux', logo: '/images/main-landing/electrolux.svg' },
    ],
};

export const BrandSlider = () => {
    const [activeTab, setActiveTab] = useState('digital');

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            direction: 'rtl',
            dragFree: true,
            slidesToScroll: 1,
            containScroll: false,
            skipSnaps: false,
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', () => {
                // Removed unused selectedIndex state
            });
        }
    }, [emblaApi]);

    return (
        <div className="w-full bg-white rounded-lg px-5 h-[230px] shadow-lg flex flex-col justify-start pt-4">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-2 py-5 transition-colors text-[10px] lg:text-sm font-bold whitespace-nowrap relative
                            ${activeTab === tab.id
                                ? 'text-primary-orange after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-orange'
                                : 'text-black hover:text-primary-orange'
                            }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Slider */}
            <div className="overflow-hidden relative" ref={emblaRef}>
                <div className="flex">
                    {[...brands[activeTab as keyof typeof brands], ...brands[activeTab as keyof typeof brands]].map((brand, index) => (
                        <div
                            key={`${brand.id}-${index}`}
                            className="flex-[0_0_85px] lg:flex-[0_0_85px] min-w-0 px-2 mr-4"
                        >
                            <div className="w-[85px] h-[85px] flex items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-primary transition-colors cursor-pointer">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* Arrow Navigation */}
                <div className="flex justify-between items-center mt-4 absolute top-[30%] left-0 transform -translate-y-1/2">
                    {/* <button onClick={() => emblaApi && emblaApi.scrollNext()} className="p-2 bg-white rounded-full shadow-lg">
                        <ChevronRightIcon fontSize="small" />
                    </button> */}
                    <button onClick={() => emblaApi && emblaApi.scrollPrev()} className="p-2 bg-white rounded-full shadow-lg">
                        <ChevronLeftIcon fontSize="small" />
                    </button>

                </div>
            </div>


        </div>
    );
};