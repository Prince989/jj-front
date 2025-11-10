import React, { useState, useEffect, useRef } from 'react';
import ProductConfirmationModal from './ProductConfirmationModal';
import Button from '@mui/material/Button';
import { handleWhatsAppClick } from '../../utils/whatsapp';

const CreditSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [selectedProductTitle, setSelectedProductTitle] = useState<string>('');
    const [selectedCreditId, setSelectedCreditId] = useState<number>(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to convert English numbers to Persian
    const toPersianNumbers = (num: number): string => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

        return num.toString().replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    };

    // Function to format currency with Persian numbers and commas
    const formatCurrency = (amount: number): string => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const roundedAmount = Math.round(amount);
        const formatted = roundedAmount.toLocaleString('en-US');

        return formatted.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    };

    const description = "با مشاوره صحیح و انتخاب بهترین روش درمان، ماندگاری و زیبایی لبخند شمار را تضمین می کنیم.";
    const creditItems = [
        {
            id: 1,
            title: "ایمپلنت",
            description,
        },
        {
            id: 2,
            title: "ایمپلنت",
            description,
        },
        {
            id: 3,
            title: "ایمپلنت",
            description,
        },
        {
            id: 4,
            title: "ایمپلنت",
            description,
        },
        {
            id: 5,
            title: "ایمپلنت",
            description,
        },
        {
            id: 6,
            title: "ایمپلنت",
            description,
        },
        {
            id: 7,
            title: "ایمپلنت",
            description,
        },
        {
            id: 8,
            title: "ایمپلنت",
            description,
        },
        {
            id: 9,
            title: "ایمپلنت",
            description,
        },
        {
            id: 10,
            title: "ایمپلنت",
            description,
        },
    ];

    // Calculate payment details
    const calculatePaymentDetails = (creditId: number) => {
        const installmentCount = 10;
        const totalAmount = creditId * 22000000;
        const monthlyPayment = totalAmount / installmentCount;

        return {
            totalAmount,
            installmentCount,
            monthlyPayment
        };
    };

    const handleCreditItemClick = (productId: number, productTitle: string) => {
        setSelectedProductId(productId);
        setSelectedProductTitle(productTitle);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
        setSelectedProductTitle('');
    };

    const handleSelectCredit = (id: number) => {
        setSelectedCreditId(id);
        setIsDropdownOpen(false);
    };

    const selectedItem = creditItems.find(item => item.id === selectedCreditId) || creditItems[0];
    const paymentDetails = calculatePaymentDetails(selectedCreditId);

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

                {/* Credit Selection and Details */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Custom Dropdown Selection */}
                    <div className="w-full lg:w-1/3">
                        <label className="block text-[#6A8358] font-semibold mb-3 text-lg">
                            انتخاب تعداد ایمپلنت
                        </label>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full bg-white border-2 border-[#6A8358] rounded-lg px-6 py-4 text-right flex items-center justify-between hover:border-[#557043] transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                <span className="text-[#6A8358] font-semibold text-lg">
                                    {toPersianNumbers(selectedCreditId)} {selectedItem.title}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-[#6A8358] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute z-20 w-full mt-2 bg-white border-2 border-[#6A8358] rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                    {creditItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSelectCredit(item.id)}
                                            className={`w-full px-6 py-3 text-right hover:bg-[#6A8358] hover:bg-opacity-10 transition-colors duration-150 border-b border-gray-200 last:border-b-0 ${selectedCreditId === item.id ? 'bg-[#6A8358] bg-opacity-20 font-bold' : ''
                                                }`}
                                        >
                                            <span className="text-[#6A8358] text-base">
                                                {toPersianNumbers(item.id)} {item.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                            {selectedItem.description}
                        </p>

                        {/* Call to Action Button */}
                        <div className="pt-6 w-full flex justify-center lg:justify-start">
                            <Button
                                variant="contained"
                                className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-xl py-3 px-8 text-base font-medium normal-case shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                size="large"
                                onClick={handleWhatsAppClick}
                            >
                                دریافت مشاوره رایگان
                            </Button>
                        </div>
                    </div>

                    {/* Dynamic Payment Details Card */}
                    <div className="w-full lg:w-2/3">
                        <div
                            onClick={() => handleCreditItemClick(selectedCreditId, selectedItem.title)}
                            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-cover bg-center bg-no-repeat cursor-pointer transform hover:scale-[1.02]"
                            style={{
                                backgroundImage: 'url(/images/rosha/barg.svg)'
                            }}
                        >
                            {/* Overlay for better text readability */}
                            <div className="absolute inset-0 bg-white bg-opacity-60"></div>

                            {/* Content */}
                            <div className="relative z-10 p-8 lg:p-10">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-block bg-[#6A8358] text-white px-6 py-3 rounded-full mb-4">
                                        <span className="text-2xl font-bold">
                                            {toPersianNumbers(selectedCreditId)} {selectedItem.title}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        جزئیات پرداخت و اقساط
                                    </p>
                                </div>

                                {/* Payment Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Number of Installments */}
                                    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-[#6A8358] border-opacity-30">
                                        <div className="text-center">
                                            <div className="mb-3">
                                                <svg className="w-12 h-12 mx-auto text-[#6A8358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-[#6A8358] font-bold text-lg mb-3">
                                                تعداد اقساط
                                            </h4>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {toPersianNumbers(paymentDetails.installmentCount)}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">ماه</p>
                                        </div>
                                    </div>

                                    {/* Monthly Payment */}
                                    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-[#6A8358] border-opacity-30">
                                        <div className="text-center">
                                            <div className="mb-3">
                                                <svg className="w-12 h-12 mx-auto text-[#6A8358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-[#6A8358] font-bold text-lg mb-3">
                                                مبلغ هر قسط
                                            </h4>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {formatCurrency(paymentDetails.monthlyPayment)}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">تومان</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <div className="mt-8 text-center">
                                    <div className="inline-flex items-center gap-2 text-[#6A8358] font-semibold text-lg">
                                        <span>برای ادامه کلیک کنید</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Confirmation Modal */}
            <ProductConfirmationModal
                open={isModalOpen}
                onClose={handleCloseModal}
                productId={selectedProductId}
                productTitle={selectedProductTitle}
            />
        </section>
    );
};

export default CreditSection;
