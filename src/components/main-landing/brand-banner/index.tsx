import React from 'react';

const BrandBanner: React.FC = () => {
    return (
        <div className="w-full pt-8">
            <div className="flex flex-col-reverse md:flex-row items-center justify-around gap-8">
                {/* Left Column - Text Content */}
                <div className="relative">
                    <img
                        src="/images/main-landing/watches.png"
                        alt="Credit Cards"
                        className="w-full h-auto transform -rotate-12"
                    />
                </div>

                {/* Right Column - Images */}
                <div className="text-right">
                    <h1 className="text-primary-blue text-center lg:text-left text-3xl lg:text-4xl font-[900] mb-4">
                        یک اعتبار بی پایان...
                    </h1>
                    <p className="text-primary-blue text-center lg:text-left text-xl md:text-2xl">
                        بدون چک و ضامن
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrandBanner;
