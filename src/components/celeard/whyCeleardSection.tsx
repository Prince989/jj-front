import React from 'react';
import AddToCart from './addToCart';
import ProductInfo from './productInfo';


const WhyCeleardSection = () => {
    return (
        <section className="w-full flex flex-col lg:mt-20 lg:mb-20 mt-10 mb-10 gap-10">
            <div className="w-full flex flex-row justify-center">
                <div className="w-full h-full flex flex-col relative">
                    <div className="w-full h-[500px] lg:h-full relative">

                        <img
                            src="/images/celeard/hero4.svg"
                            alt="Hero BG"
                            className="w-full h-full hidden lg:block object-contain z-0"
                            style={{ pointerEvents: 'none' }}
                        />
                        <img
                            src="/images/celeard/hero9.svg"
                            alt="Hero BG"
                            className="w-full h-full block lg:hidden object-contain z-0 absolute"
                            style={{ pointerEvents: 'none' }}
                        />
                        <img
                            src="/images/celeard/hero10.png"
                            alt="Hero BG"
                            className="w-[80px] block lg:hidden object-contain z-2 top-[20%] left-1/2 -translate-x-1/2 absolute"
                            style={{ pointerEvents: 'none' }}
                        />
                        <div className="hidden lg:block absolute top-48 left-1/4 -translate-x-1/4">
                            <ProductInfo
                                title="سفید کننده دندان کلرد"
                                subTitle="سفیدکننده و ترمیم کننده"
                                price="۹۸۶,۰۰۰"
                                oldPrice="۱,۵۶۷,۰۰۰"
                                size="large"
                            />
                        </div>
                        <div className="block lg:hidden absolute bottom-16 left-[50px] z-10">
                            <ProductInfo
                                title="سفید کننده دندان کلرد"
                                subTitle="سفیدکننده و ترمیم کننده"
                                price="۹۸۶,۰۰۰"
                                oldPrice="۱,۵۶۷,۰۰۰"
                                size="small"
                            />
                        </div>
                    </div>

                    <AddToCart />
                </div>
            </div>
        </section>
    );
};

export default WhyCeleardSection;
