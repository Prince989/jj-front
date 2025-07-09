import React from 'react';
import ContactUs from './contactUs';

const features = [
    {
        icon: '/images/celeard/profile2.svg',
        text: 'متناسب با جنس دندان',
    },
    {
        icon: '/images/celeard/drop.svg',
        text: 'استفاده از مواد طبیعی',
    },
    {
        icon: '/images/celeard/health.svg',
        text: 'ایمن برای دندان ها',
    },
];

const WhyComponent = () => {

    return (
        <section className="w-full flex flex-col lg:mt-20 lg:mb-20 mt-10 mb-10 gap-10">
            {/* Title */}
            <div className="w-full flex flex-row">
                <h2 className="text-xl lg:text-2xl font-bold text-center lg:text-left">
                    چرا باید از <span className="text-[#ED1A31]">کلرد</span> استفاده کنیم؟
                </h2>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-10 mb-14">
                {/* Right Side (50%) */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-10">
                    {/* Impact Card */}
                    <div className="w-full flex flex-row items-center bg-white rounded-2xl shadow-md p-3 lg:p-4 gap-3 lg:gap-6 lg:min-h-[200px]">
                        {/* Badge */}
                        <div className="flex flex-col items-center justify-center w-[25%] border-l">
                            <div className="relative flex items-center justify-center">
                                <span className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-full">
                                    <img src="/images/celeard/verify.svg" alt="تاثیرگذاری" className="w-14 h-14" />
                                </span>
                            </div>
                            <span className="mt-4 text-sm lg:text-lg font-bold text-right">تاثیرگذاری</span>
                        </div>
                        {/* Description */}
                        <div className="flex-1 text-right flex flex-col justify-center w-[75%]">
                            <p className="text-xs lg:text-sm text-[#222] leading-8 text-center lg:text-right">
                                ژل سفیدکننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوزهای پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Left Side (50%) */}
                <div className="w-full lg:w-[50%] flex justify-end">
                    <div className="flex flex-row gap-3 lg:gap-6 w-full justify-center lg:justify-between">
                        {features.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center rounded-2xl p-1 lg:p-4 min-w-[100px] h-[100px] lg:min-w-[180px] lg:min-h-[200px] shadow-sm border border-[#FFE4E1]"
                            >
                                <img src={item.icon} alt="icon" className="w-9 h-9 lg:w-16 lg:h-16 lg:mb-6" />
                                <span className="text-xs lg:text-sm text-[#888] font-medium text-center mt-2">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ContactUs />
        </section>
    );
};

export default WhyComponent;
