import React from 'react';
import ProductInfo from './productInfo';

const HeroSection = () => {
    return (
        <section className="w-full flex flex-col md:flex-row relative">
            <img
                src="/images/celeard/celeard.svg"
                alt="Celeard Product"
                className="absolute -bottom-10 left-1/3 -translate-x-1/3 hidden lg:block w-1/2 drop-shadow-xl"
            />
            {/* Left Side (70%) */}
            <div className="w-full md:w-[70%] flex flex-col lg:flex-row">
                {/* Right 50% (Image and product card) */}
                <div className="w-full lg:w-2/3 h-[255px] lg:h-[390px] flex flex-col lg:flex-row items-center justify-center relative">
                    {/* Background SVG */}
                    <img
                        src="/images/celeard/hero1.svg"
                        alt="Hero BG"
                        className="lg:absolute inset-0 w-full h-full object-contain z-0 hidden lg:block"
                        style={{ pointerEvents: 'none' }}
                    />
                    <img
                        src="/images/celeard/hero1M.svg"
                        alt="Hero BG"
                        className="lg:absolute inset-0 w-full h-full object-contain z-0 block lg:hidden"
                        style={{ pointerEvents: 'none' }}
                    />
                    <div className="hidden lg:block absolute bottom-16 left-16">
                        <ProductInfo
                            title="محصول کلرد"
                            subTitle="سفیدکننده و ترمیم کننده"
                            linkColor="red"
                            size="small"
                        />
                    </div>
                    <div className="block lg:hidden absolute bottom-14 left-12">
                        <ProductInfo
                            title="محصول کلرد"
                            subTitle="سفیدکننده و ترمیم کننده"
                            linkColor="red"
                            size="very-small"
                        />
                    </div>
                </div>
                {/* Left 50% (Text, absolute) */}
                <div className="w-full lg:w-1/3 relative flex items-center justify-center">
                    <div className="hidden md:block absolute -right-40 lg:top-20 top-10">
                        <h1 className="text-2xl lg:text-3xl font-bold leading-6">
                            راز یک لبخند ماندگار <br />
                            <span className="text-[#FF3B57]">کلرد</span> معجزه زیبایی!
                        </h1>
                    </div>
                    {/* For mobile, show nothing here */}
                </div>

            </div>
            {/* Right Side (30%) */}
            <div className="w-full md:w-[30%] flex flex-col justify-center items-start px-6 py-8 md:py-0 md:pl-12 md:pr-4 gap-10 md:gap-8">
                {/* Orders, Satisfaction, Credit, Barcode */}
                <div className="flex flex-row lg:flex-col gap-1 lg:gap-5 w-full flex-wrap justify-between">
                    <div className='w-[29%] lg:w-full'>
                        <div className="text-2xl lg:text-3xl font-bold text-center lg:text-left">+۱۰۰۰</div>
                        <div className="text-sm lg:text-base text-gray-500 mt-1 text-center lg:text-left">سفارش آنلاین</div>
                    </div>
                    <div className='w-[29%] lg:w-full'>
                        <div className="text-2xl lg:text-3xl font-bold text-center lg:text-left">%۸۶</div>
                        <div className="text-sm lg:text-base text-gray-500 mt-1 text-center lg:text-left">رضایت مشتریان</div>
                    </div>
                    <div className='w-[29%] lg:w-full'>
                        <div className="text-2xl lg:text-3xl font-bold text-center lg:text-left">+۱۷۰۰</div>
                        <div className="text-sm lg:text-base text-gray-500 mt-1 text-center lg:text-left">اعتبار خرید</div>
                    </div>
                    <div className="mt-4 justify-center lg:justify-end w-full hidden lg:flex">
                        {/* Barcode SVG or image */}
                        <img src="/images/celeard/barcode.svg" alt="barcode" className="w-38 h-12 object-contain" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;