import React, { useState } from 'react';
import CreditRequestModal from './CreditRequestModal';

const CreditSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    // Function to convert English numbers to Persian
    const toPersianNumbers = (num: number): string => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

        return num.toString().replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    };
    const creditItems = [
        {
            id: 1,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 2,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 3,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 4,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 5,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 6,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 7,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 8,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 9,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
        {
            id: 10,
            title: "ایمپلنت",
            description: "با انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند بیماران را تضمین میکند."
        },
    ];

    const handleCreditItemClick = (productId: number) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    return (
        <section className="w-full bg-white py-12 lg:py-16">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-24">
                {/* Section Title */}
                <div className="mb-8 lg:mb-12">
                    <div className="flex items-center">
                        {/* Title text */}
                        <h2 className="text-xl lg:text-2xl font-bold text-[#6A8358] whitespace-nowrap">
                            خرید اعتبار
                        </h2>
                        {/* Dotted line extending from left */}
                        <div className="flex-1 h-0.5 border-dotted border-b-2 border-[#6A8358] mr-4"></div>

                    </div>
                </div>

                {/* Credit Items Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
                    {creditItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleCreditItemClick(item.id)}
                            className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-cover bg-center bg-no-repeat cursor-pointer"
                            style={{
                                backgroundImage: 'url(/images/rosha/barg.svg)'
                            }}
                        >
                            {/* Content positioned above overlay */}
                            <div className="relative z-10 p-6 text-center min-h-[200px] flex flex-col justify-center items-center">
                                {/* Number */}
                                <div className="mb-4">
                                    <span className="text-4xl lg:text-5xl font-bold text-[#6A8358]">
                                        {toPersianNumbers(item.id)}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl lg:text-2xl font-bold text-[#6A8358] mb-3">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Credit Request Modal */}
            <CreditRequestModal
                open={isModalOpen}
                onClose={handleCloseModal}
                productId={selectedProductId}
            />
        </section>
    );
};

export default CreditSection;
