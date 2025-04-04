import React from 'react';

const BrandBanner: React.FC = () => {
    return (
        <div className="w-full bg-gradient-to-r from-[#F8F9FF] to-white py-16">
            <div className="flex flex-col-reverse md:flex-row items-center justify-around gap-8">
                {/* Left Column - Text Content */}
                <div className="relative">
                    <img
                        src="/images/credit-cards.png"
                        alt="Credit Cards"
                        className="w-full h-auto transform -rotate-12"
                    />
                </div>

                {/* Right Column - Images */}
                <div className="text-right">
                    <h1 className="text-[#1A3EB4] text-4xl md:text-5xl font-bold mb-4">
                        یک اعتبار بی پایان...
                    </h1>
                    <p className="text-[#1A3EB4] text-xl md:text-2xl">
                        بدون چک و ضامن
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrandBanner;
