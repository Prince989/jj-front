import React from 'react';
import Button from '@mui/material/Button';
import Icon from 'src/@core/components/icon';

const RoshaHeroSection = () => {
    const handleScrollToCredit = () => {
        if (typeof window === 'undefined') return;
        const target = document.getElementById('credit-section');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const toPersianDigits = (input: string) => input.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

    const stats = [
        { value: '33', label: 'متخصص', icon: 'mdi:account-star-outline' },
        { value: '2000', label: 'وسعت', icon: 'mdi:map-marker-outline' },
        { value: '6987', label: 'کامپوزیت و لمینت موفق', icon: 'mdi:tooth-outline' },
        { value: '30987', label: 'ایمپلنت موفق', icon: 'mdi:tooth' }
    ];

    return (
        <section className="w-full bg-white relative overflow-hidden">
            {/* Main Content Container */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-24 py-8 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16">

                    {/* Left Side - Image Collage */}
                    <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start space-y-4 sm:space-y-6 order-2 lg:order-1">
                        {/* Main Headline */}
                        <div className="space-y-2 text-center lg:text-right">
                            <div className="flex items-end text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                <span>کلینیک تخصصی روشا</span>
                                <span className="block text-base sm:text-lg lg:text-xl font-normal mt-2 text-black">(سعادت آباد)</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#6A8358] leading-tight">
                                بزرگترین مرکز ایمپلنت دیجیتال کشور
                            </h1>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-full sm:max-w-lg lg:max-w-xl">
                            {stats.map((item, i) => (
                                <div
                                    key={i}
                                    className="relative rounded-2xl bg-white p-4 sm:p-6 lg:p-8 shadow-[0_0_60px_-20px_rgba(106,131,88,0.35)] ring-1 ring-[#6A8358]/10"
                                >
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-700 text-center">
                                        {toPersianDigits(item.value)}
                                    </div>
                                    <div className="mt-4 sm:mt-6 flex items-center justify-start gap-2 text-gray-700">
                                        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#6A8358]/10 text-[#6A8358]">
                                            <Icon icon={item.icon} fontSize="1.4rem" />
                                        </span>
                                        <span className="text-xs sm:text-sm lg:text-base lg:whitespace-nowrap">{item.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute -bottom-2 -right-4 w-[57px] h-[117px]">
                            <img
                                src="/images/rosha/barg1.svg"
                                alt="Dental treatment"
                                className="w-full h-full object-contain lg:object-cover"
                            />
                        </div>

                        <div className="absolute -top-4 -left-5 w-[39px] h-[81px]">
                            <img
                                src="/images/rosha/barg2.svg"
                                alt="Dental treatment"
                                className="w-full h-full object-contain lg:object-cover"
                            />
                        </div>

                        {/* Call to Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="contained"
                                className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-lg py-2 px-8 text-lg font-medium normal-case hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                size="large"
                                onClick={handleScrollToCredit}
                            >
                                خرید اعتبار
                            </Button>
                        </div>
                    </div>
                    {/* Right Side - Text Content */}
                    <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
                        <div className="relative w-full h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
                            {/* Main Image Container with Grid Layout */}
                            <div className="w-full h-full">
                                {/* Top Right - Dental treatment scene */}
                                <div className="relative rounded-xl overflow-hidden">
                                    <img
                                        src="/images/rosha/hero1.svg"
                                        alt="Dental treatment"
                                        className="w-full h-full object-contain lg:object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoshaHeroSection;
