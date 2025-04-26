import React from 'react'
import { Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ColoredText from 'src/components/dentistry-panel/ColoredText'

const HeroSection = () => {
    const handleCreditButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const creditPlansSection = document.getElementById('credit-plans');
        if (creditPlansSection) {
            creditPlansSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-8 bg-white w-full relative">
            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0.3; }
                    50% { opacity: 1; }
                    100% { opacity: 0.3; }
                }
                .twinkle-1 {
                    animation: twinkle 3s ease-in-out infinite;
                    animation-delay: 0s;
                }
                .twinkle-2 {
                    animation: twinkle 2s ease-in-out infinite;
                    animation-delay: 0.5s;
                }
                .twinkle-3 {
                    animation: twinkle 2s ease-in-out infinite;
                    animation-delay: 1s;
                }
            `}</style>
            <div className="flex flex-col lg:flex-row items-end justify-between lg:gap-40 gap-8">
                {/* Text Content */}
                <div className="w-full lg:w-1/2 lg:max-w-[555px] justify-between flex flex-col gap-8">
                    <div className="w-full flex flex-col">
                        <Typography
                            variant="h1"
                            className="font-black text-primary-blue lg:text-4xl text-2xl mb-2 lg:mb-5"
                        >
                            شما خدمات بگیرید ...
                        </Typography>
                        <ColoredText
                            firstText="جی"
                            middleText="جی"
                            lastText="دکتر پرداخت میکنه!"
                            className="mb-3"
                            textClassName="lg:text-4xl text-2xl font-black"
                        />
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="contained"
                                endIcon={<ArrowBackIcon />}
                                className="bg-primary-orange hover:bg-primary-orange-1 text-white rounded-md py-3 lg:px-6 px-3 text-sm"
                                onClick={handleCreditButtonClick}
                            >
                                دریافت فوری اعتبار
                            </Button>

                            <Button
                                variant="outlined"
                                className="text-primary-orange-1 border-primary-orange-1 hover:border-primary-orange-1 hover:bg-white rounded-md py-3 lg:px-6 px-3 text-sm"
                            >
                                تماس با ما
                            </Button>
                        </div>



                    </div>
                    <div className="flex justify-center lg:justify-start items-end lg:w-[80%] w-full bg-gray-1">
                        <img src="/images/dentistry/right-side-pic.png" alt="hero-image" className="h-full object-contain" />
                    </div>
                </div>

                {/* Images */}
                <div className="flex justify-center lg:justify-end items-end w-full lg:w-[40%] relative bg-gray-1">
                    <img src="/images/dentistry/left-side-pic.png" alt="hero-image" className="h-full object-contain" />
                </div>
            </div>
            <img src="/images/dentistry/blue-stars-1.svg" alt="blue-stars" className="hidden lg:block absolute top-[5%] left-[42%] object-cover twinkle-1" />
            <img src="/images/dentistry/blue-stars-2.svg" alt="blue-stars" className="absolute top-[57%] lg:top-[39%] right-0 object-cover twinkle-2" />
            <img src="/images/dentistry/blue-stars-2.svg" alt="blue-stars" className="hidden lg:block absolute top-[72%] right-[42%] object-cover twinkle-3" />
        </section>
    )
}

export default HeroSection 