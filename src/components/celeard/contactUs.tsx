import React from 'react';


const info = [
    {
        icon: '/images/celeard/messages.svg',
        text: 'گفتگوی آنلاین',
    },
    {
        icon: '/images/celeard/email.svg',
        text: 'ایمیل',
    },
    {
        icon: '/images/celeard/call.svg',
        text: 'تلفن تماس',
    },
];
const ContactUs = () => {
    return (
        <div className='w-full flex flex-col gap-10'>
            {/* Title */}
            <div className="w-full flex flex-row justify-center lg:justify-start">
                <h2 className="text-xl lg:text-2xl font-bold text-center lg:text-left">
                    با ما در ارتباط باشید
                </h2>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-10">
                {/* Right Side (50%) */}
                <div className="w-full lg:w-[50%] flex justify-end order-2 lg:order-1">
                    <div className="flex lg:flex-row flex-col gap-6 w-full justify-center lg:justify-end">
                        {info.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center rounded-2xl p-4 min-w-[180px] min-h-[200px] shadow-sm border border-[#FFE4E1]"
                            >
                                <img src={item.icon} alt="icon" className="w-16 h-16 mb-6" />
                                <span className="text-sm text-[#888] font-medium text-center mt-2">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Left Side (50%) */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-10 order-1 lg:order-2">
                    {/* Impact Card */}
                    <div className="w-full flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md p-6 gap-6 min-h-[220px]">
                        {/* Badge */}
                        <div className="flex flex-col items-center justify-center min-w-[140px] lg:border-l">
                            <div className="relative flex items-center justify-center">
                                <span className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-full">
                                    <img src="/images/celeard/location.svg" alt="مسیریابی" className="w-14 h-14" />
                                </span>
                            </div>
                            <span className="mt-4 text-lg font-bold text-right">مسیریابی</span>
                        </div>
                        {/* Description */}
                        <div className="flex-1 text-right flex flex-col justify-center">
                            <p className="text-sm text-[#222] leading-8 text-center lg:text-right">
                                تهران , شهرک غرب, بلوار دادمان ,برج کنتراست , طبقه ۴ , واحد ۴۵۶ , شرکت جی جی لاین.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;