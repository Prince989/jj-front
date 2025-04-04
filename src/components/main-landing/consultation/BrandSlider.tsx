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
        { id: 1, name: 'Apple', logo: '/brands/apple.svg' },
        { id: 2, name: 'Samsung', logo: '/brands/samsung.svg' },
        { id: 3, name: 'Huawei', logo: '/brands/huawei.svg' },
        { id: 4, name: 'Xiaomi', logo: '/brands/mi.svg' },
        { id: 5, name: 'LG', logo: '/brands/lg.svg' },
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
        <div className="w-full bg-white rounded-lg p-6">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                            <div className="flex items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-primary transition-colors cursor-pointer">
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