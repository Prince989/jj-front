import React from 'react';
import Button from '@mui/material/Button';

const RoshaHeroSection = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '989390614113';
        const message = 'سلام، می‌خواهم نوبت دریافت کنم.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="w-full bg-white relative overflow-hidden">
            {/* Main Content Container */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-24 py-8 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16">

                    {/* Left Side - Image Collage */}
                    <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start space-y-6 order-2 lg:order-1">
                        {/* Main Headline */}
                        <div className="space-y-2">
                            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                سلامت دهان و دندان شما در
                            </h1>
                            <h1 className="text-2xl lg:text-4xl font-bold text-[#6A8358] leading-tight">
                                کلینیک فوق تخصصی روشا
                            </h1>
                        </div>

                        {/* Description Text */}
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed max-w-lg text-center lg:text-right">
                            کلینیک تخصصی ایمپلنت دندان با استفاده از تجهیزات پیشرفته و تیمی مجرب خدمات کاشت دندان را به صورت حرفه ای و ایمن ارائه میدهد و با انتخاب بهترین روش درمان ماندگاری و زیبایی لبخند بیماران را تضمین میکند.
                        </p>

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

                        {/* Call to Action Button */}
                        <div className="pt-4">
                            <Button
                                variant="contained"
                                className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-lg py-2 px-8 text-lg font-medium normal-case hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                size="large"
                                onClick={handleWhatsAppClick}
                            >
                                دریافت نوبت
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
