import React, { useState } from 'react';
import AddToCart from './addToCart';
import ProductInfo from './productInfo';


const WhyCeleardSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="w-full flex flex-col lg:mt-20 lg:mb-20 mt-10 mb-10 gap-10">
            <div className="w-full flex flex-row justify-center">
                <div className="w-full h-full flex flex-col relative">
                    <div className="w-full lg:h-full relative">

                        <img
                            src="/images/celeard/hero4.svg"
                            alt="Hero BG"
                            className="w-full h-full hidden lg:block object-contain z-0"
                            style={{ pointerEvents: 'none' }}
                        />
                        <div className="hidden lg:block absolute top-32 left-1/4 -translate-x-1/4">
                            <ProductInfo
                                title="سفید کننده دندان کلرد"
                                subTitle="سفیدکننده و ترمیم کننده"
                                price="۹۸۶,۰۰۰"
                                oldPrice="۱,۵۶۷,۰۰۰"
                                size="large"
                                addToCart
                                handleClick={() => setIsOpen(!isOpen)}
                                countdownTargetDate={new Date("2025-07-25T23:59:59Z")}
                                countdownTextSize="text-2xl"
                            />
                        </div>
                    </div>

                    <AddToCart isOpen={isOpen} />
                </div>
            </div>
        </section>
    );
};

export default WhyCeleardSection;
