import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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

    // Add other categories as needed
};

export const BrandSlider = () => {
    const [activeTab, setActiveTab] = useState('digital');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            direction: 'rtl',
            dragFree: true,
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', () => {
                setSelectedIndex(emblaApi.selectedScrollSnap());
            });
        }
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    return (
        <div className="w-full bg-white rounded-lg px-6 pt-6 pb-4 shadow-lg">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-2 py-5 transition-colors text-md font-bold whitespace-nowrap relative
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
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                    {brands[activeTab as keyof typeof brands]?.map((brand) => (
                        <div
                            key={brand.id}
                            className="flex-[0_0_calc(20%-16px)]"
                        >
                            <div className="w-full h-[85px] flex items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-primary transition-colors cursor-pointer">
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
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-4">
                {brands[activeTab as keyof typeof brands]?.map((_, index) => (
                    <IconButton
                        key={index}
                        onClick={() => scrollTo(index)}
                        className="p-1"
                        size="small"
                    >
                        <FiberManualRecordIcon
                            className={`text-sm ${selectedIndex === index ? 'text-primary' : 'text-gray-400'}`}
                        />
                    </IconButton>
                ))}
            </div>
        </div>
    );
};