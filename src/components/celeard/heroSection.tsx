import React from 'react';

const HeroSection = () => {
    return (
        <section className="w-full flex flex-col md:flex-row relative">
            <img
                src="/images/celeard/celeard.svg"
                alt="Celeard Product"
                className="absolute -bottom-10 left-1/3 -translate-x-1/3 hidden lg:block w-1/2 drop-shadow-xl"
            />
            {/* Top Text (for mobile first) */}
            <div className="w-full md:w-0 flex flex-col items-center justify-center px-4 py-8 md:hidden">
                <h1 className="text-3xl sm:text-4xl font-bold text-center leading-snug">
                    راز یک لبخند ماندگار <br />
                    <span className="text-[#FF3B57]">کلرد</span> معجزه زیبایی!
                </h1>
            </div>
            {/* Left Side (70%) */}
            <div className="w-full md:w-[70%] flex flex-col lg:flex-row">
                {/* Right 50% (Image and product card) */}
                <div className="w-full lg:w-2/3 h-[255px] lg:h-[390px] flex items-center justify-center relative">
                    {/* Background SVG */}
                    <img
                        src="/images/celeard/hero1.svg"
                        alt="Hero BG"
                        className="absolute inset-0 w-full h-full object-contain z-0"
                        style={{ pointerEvents: 'none' }}
                    />
                </div>
                {/* Left 50% (Text, absolute) */}
                <div className="w-full lg:w-1/3 relative flex items-center justify-center">
                    <div className="hidden md:block absolute -right-40 top-20">
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
                <div className="flex flex-col gap-5 w-full">
                    <div>
                        <div className="text-3xl font-bold text-center lg:text-left">+1000</div>
                        <div className="text-base text-gray-500 mt-1 text-center lg:text-left">سفارش آنلاین</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-center lg:text-left">%76</div>
                        <div className="text-base text-gray-500 mt-1 text-center lg:text-left">رضایت مشتریان</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-center lg:text-left">+1700</div>
                        <div className="text-base text-gray-500 mt-1 text-center lg:text-left">اعتبار خرید</div>
                    </div>
                    <div className="mt-4 flex justify-center lg:justify-end">
                        {/* Barcode SVG or image */}
                        <img src="/images/celeard/barcode.svg" alt="barcode" className="w-38 h-12 object-contain" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;



{/* Product Card */ }
// <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
//     {/* Product Image */}
//     <img
//         src="/images/celeard/celeard.svg"
//         alt="Celeard Product"
//         className="w-40 md:w-52 lg:w-60 xl:w-64 mx-auto drop-shadow-xl"
//     />
//     {/* Product Card Content */}
//     <div className="bg-[#FFE7E7] rounded-3xl shadow-lg px-6 py-6 mt-4 w-64 max-w-full flex flex-col items-center">
//         <div className="flex items-center gap-2 mb-2">
//             <span className="text-lg font-bold">محصول کلرد</span>
//             {/* Stars */}
//             <span className="flex flex-col items-center ml-2">
//                 <span className="text-[#FF3B57] text-xl">★</span>
//                 <span className="text-[#FF3B57] text-xl">★</span>
//                 <span className="text-[#FF3B57] text-xl">★</span>
//                 <span className="text-[#FF3B57] text-xl">★</span>
//                 <span className="text-[#FF3B57] text-xl">★</span>
//             </span>
//         </div>
//         <div className="text-gray-600 text-sm mb-2">سفیدکننده و ترمیم کننده</div>
//         <div className="text-lg font-bold mb-2">۹۹۸,۰۰۰ ت</div>
//         <a
//             href="#"
//             className="text-[#FF3B57] font-bold underline underline-offset-4 hover:text-[#e62a47] transition-colors"
//         >
//             خرید محصول
//         </a>
//     </div>
// </div>