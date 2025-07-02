import React from 'react';

const AboutSection = () => {
    return (
        <section className="w-full flex flex-col lg:mt-40 lg:mb-20 mt-20 mb-10 gap-10">
            <div className="w-full flex flex-col lg:flex-row gap-10">
                {/* Right Side (50%) */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-10">
                    <div className="w-full relative flex items-center justify-center">
                        <div className="flex flex-col gap-3">
                            <span className="text-xl font-bold leading-6">
                                درباره <span className="text-[#FF3B57]">کلرد</span>
                            </span>
                            <p className="text-sm text-gray-500">ژل سفیدکننده دندان با داشتن قیمت مناسب، استفاده‌ی آسان، تأثیرگذاری قابل قبول و رعایت استانداردهای ایمنی، به یکی از گزینه‌های محبوب خانگی برای زیبایی دندان تبدیل شده است. این ژل‌ها با فرمولاسیونی که به مینای دندان آسیب نمی‌زند، می‌توانند لکه‌های سطحی ناشی از قهوه، چای یا دخانیات را کاهش دهند. مصرف‌کنندگان با استفاده منظم از این محصولات، بدون نیاز به مراجعه به دندان‌پزشک، به لبخندی سفیدتر و اعتمادبه‌نفس بیشتر دست می‌یابند.</p>
                        </div>
                        {/* For mobile, show nothing here */}
                    </div>
                </div>
                {/* Left Side (50%) */}
                <div className="w-full lg:w-[50%] flex justify-end">
                    <div className="w-full lg:w-auto h-[390px] flex relative">
                        <img
                            src="/images/celeard/hero2.svg"
                            alt="Hero BG"
                            className="w-full h-full object-contain z-0"
                            style={{ pointerEvents: 'none' }}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row">
                {/* Left Side (40%) */}
                <div className="w-full lg:w-[40%] flex justify-end lg:order-1 order-2">
                    <div className="w-full lg:w-auto h-[255px] lg:h-[390px] flex relative">
                        <img
                            src="/images/celeard/hero3.svg"
                            alt="Hero BG"
                            className="w-full h-full object-contain z-0"
                            style={{ pointerEvents: 'none' }}
                        />
                    </div>
                </div>
                {/* Right Side (60%) */}
                <div className="w-full lg:w-[60%] flex flex-col justify-center gap-10 lg:order-2 order-1">
                    <div className='w-full flex justify-end'>
                        <div className="flex flex-col gap-3 w-full lg:w-2/3">
                            <span className="text-xl font-bold leading-6">
                                سفید کننده دندان <span className="text-[#FF3B57]">کلرد</span>
                            </span>
                            <p className="text-sm text-gray-500"> ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.</p>

                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <div className="flex flex-col gap-3 w-full lg:w-2/3">
                            <span className="text-xl font-bold leading-6">
                                سفید کننده دندان <span className="text-[#FF3B57]">کلرد</span>
                            </span>
                            <p className="text-sm text-gray-500"> ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.</p>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
