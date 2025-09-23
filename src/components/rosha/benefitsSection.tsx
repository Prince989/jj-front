import Button from '@mui/material/Button';
import React from 'react';

const BenefitsSection = () => {
    const benefits = [
        {
            title: "ظاهر طبیعی",
            description: "ایمپلنت‌ها بسیار شبیه دندان‌های واقعی هستند و لبخندی زیبا و طبیعی ایجاد می‌کنند."
        },
        {
            title: "عملکرد بالا",
            description: "به دلیل اتصال مستقیم به استخوان فک، قدرت جویدن مشابه دندان‌های طبیعی ارائه می‌دهند."
        },
        {
            title: "ماندگاری طولانی",
            description: "در صورت رعایت بهداشت دهان و دندان، ایمپلنت‌ها می‌توانند سال‌ها یا حتی مادام‌العمر دوام داشته باشند."
        },
        {
            title: "حفظ استخوان فک",
            description: "ایمپلنت‌ها از تحلیل استخوان در ناحیه بی‌دندانی جلوگیری می‌کنند."
        },
        {
            title: "عدم آسیب به دندان‌های مجاور",
            description: "برخلاف بریج‌ها، نیازی به تراشیدن یا آسیب رساندن به دندان‌های مجاور نیست."
        },
        {
            title: "بهبود کیفیت زندگی",
            description: "با بازگشت توانایی صحبت، خندیدن و خوردن بدون نگرانی، اعتماد به نفس افزایش می‌یابد."
        }
    ];

    return (
        <section className="w-full bg-white relative overflow-hidden">
            {/* Main Content Container */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-24 py-8 lg:py-16">
                {/* Section Title */}
                <div className="mb-8 lg:mb-12">
                    <div className="flex items-center">
                        {/* Title text */}
                        <h2 className="text-xl lg:text-2xl font-bold text-[#6A8358] whitespace-nowrap">
                            فواید ایمپلنت
                        </h2>
                        {/* Dotted line extending from left */}
                        <div className="flex-1 h-0.5 border-dotted border-b-2 border-[#6A8358] mr-4"></div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16">
                    {/* Left Side - Image */}
                    <div className="w-full lg:w-1/2 relative order-1 lg:order-1">
                        <div className="relative w-full lg:h-[400px] rounded-2xl overflow-hidden">
                            <img
                                src="/images/rosha/cons.svg"
                                alt="فواید ایمپلنت دندان"
                                className="w-full h-full object-contain p-4"
                            />
                        </div>
                    </div>

                    {/* Right Side - Benefits Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start space-y-4 order-2 lg:order-2">
                        {/* Introductory Text */}
                        <div className="text-right">
                            <p className="text-base text-gray-800 mb-6 leading-relaxed">
                                فواید ایمپلنت دندان بسیار زیاد است و به همین دلیل یکی از بهترین روش‌های جایگزینی دندان از دست رفته محسوب می‌شود. از مهم‌ترین مزایا می‌توان به موارد زیر اشاره کرد:
                            </p>
                        </div>

                        {/* Benefits List */}
                        <div className="w-full space-y-3">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-1 space-x-reverse">
                                    <div className="flex-1">
                                        <h3 className="text-base text-[#6A8358] font-bold mb-1">
                                            • {benefit.title}:   <span className="font-normal text-gray-700 leading-relaxed text-base">
                                                {benefit.description}
                                            </span>
                                        </h3>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action Button */}
                        <div className="pt-6 w-full flex justify-center lg:justify-start">
                            <Button
                                variant="contained"
                                className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-xl py-3 px-8 text-base font-medium normal-case shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                size="large"
                            >
                                دریافت مشاوره رایگان
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
