import React from 'react';
import { handleWhatsAppClick } from '../../utils/whatsapp';
import Button from '@mui/material/Button';


const AboutSection = () => {

    const creditPlans = [
        {
            id: 1,
            title: "یک ایمپلنت",
            description: "مناسب برای جایگزینی یک دندان از دست رفته، با پیش پرداخت اندک و اقساط منعطف."
        },
        {
            id: 2,
            title: "دو ایمپلنت",
            description: "ویژه بیمارانی که به دو کاشت دندان نیاز دارند، همراه با تخفیف و شرایط بازپرداخت آسان تر."
        },
        {
            id: 3,
            title: "سه ایمپلنت",
            description: "طرحی اقتصادی و کامل برای کاشت سه دندان، همراه با بیشترین تخفیف و طولانی ترین دوره بازپرداخت."
        }
    ];

    return (
        <section id="about-section" className="w-full bg-white relative overflow-hidden">
            {/* Main Content Container */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-24 py-8 lg:py-16">
                {/* Section Title */}
                <div className="mb-8 lg:mb-12">
                    <div className="flex items-center">
                        {/* Title text */}
                        <h2 className="text-xl lg:text-2xl font-bold text-[#6A8358] whitespace-nowrap">
                            دریافت اعتبار
                        </h2>
                        {/* Dotted line extending from left */}
                        <div className="flex-1 h-0.5 border-dotted border-b-2 border-[#6A8358] mr-4"></div>

                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16">

                    {/* Left Side - Image Collage */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start space-y-2 order-2 lg:order-1">
                        {/* Main Headline */}
                        <div className="text-right">
                            <p className="text-base text-gray-800 mb-2 leading-relaxed">
                                کلینیک تخصصی دندان پزشکی ما به منظور تسهیل درمان بیماران، شرایط ویژه ای برای دریافت اعتبار ایمپلنت فراهم کرده است. بر اساس نیاز خود میتوانید از سه طرح زیر استفاده کنید:
                            </p>
                        </div>
                        {/* Credit Plans */}
                        <div className="w-full space-y-1">
                            {creditPlans.map((plan) => (
                                <div key={plan.id} className="flex items-start space-x-3 space-x-reverse rounded-xl">
                                    <span>•</span> <h3 className="text-base text-[#6A8358] mb-2">{plan.title}: <span className="text-gray-700 leading-relaxed">{plan.description}</span></h3>
                                </div>
                            ))}
                        </div>
                        {/* Concluding Text */}
                        <div className="text-right">
                            <p className="text-gray-700 leading-relaxed text-base">
                                تمامی طرح ها شامل مشاوره رایگان معاینات تخصصی و استفاده از متریال استاندارد و با کیفیت هستند. هدف ما ایجاد تجربه ای مطمئن و لبخندی ماندگار با شرایط مالی آسان برای شماست.
                            </p>
                        </div>
                        <Button
                            variant="contained"
                            className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-lg py-2 px-8 text-lg font-medium normal-case hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            size="large"
                            onClick={handleWhatsAppClick}
                        >
                            دریافت نوبت
                        </Button>
                    </div>
                    {/* Right Side - Text Content */}
                    <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
                        <div className="relative w-full lg:h-[400px] rounded-2xl overflow-hidden">
                            {/* Main Image Container with Grid Layout */}
                            <div className="w-full h-full">
                                {/* Top Right - Dental treatment scene */}
                                <div className="relative rounded-xl overflow-hidden">
                                    <img
                                        src="/images/rosha/about.svg"
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

export default AboutSection;
