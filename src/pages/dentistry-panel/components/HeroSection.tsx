import React from 'react'
import { Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ColoredText from './ColoredText'

const HeroSection = () => {
    return (
        <section className="py-8 bg-white w-full relative">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
                {/* Text Content */}
                <div className="w-full lg:w-1/2 lg:max-w-[575px] justify-between flex flex-col gap-8">
                    <div className="w-full flex flex-col">
                        <Typography
                            variant="h1"
                            className="font-black text-primary-blue lg:text-5xl text-3xl mb-3 lg:mb-9"
                        >
                            شما خدمات بگیرید ...
                        </Typography>
                        <ColoredText
                            firstText="جی"
                            middleText="جی"
                            lastText="لاین پرداخت میکنه!"
                            className="mb-3"
                            textClassName="lg:text-5xl text-3xl font-[900]"
                        />
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="contained"
                                endIcon={<ArrowBackIcon />}
                                className="bg-primary-orange hover:bg-primary-orange-1 text-white rounded-md py-3 px-6"
                            >
                                راهنمای دریافت اعتبار
                            </Button>

                            <Button
                                variant="outlined"
                                className="text-primary-orange-1 border-primary-orange-1 hover:bg-primary/5 rounded-md py-3 px-6"
                            >
                                تماس با ما
                            </Button>
                        </div>



                    </div>
                    <div className="flex justify-center lg:justify-start items-end w-full bg-gray-1">
                        <img src="/images/dentistry/right-side-pic.png" alt="hero-image" className="h-full object-contain" />
                    </div>
                </div>

                {/* Images */}
                <div className="flex justify-center lg:justify-end items-end w-full lg:w-1/2 relative bg-gray-1">
                    <img src="/images/dentistry/left-side-pic.png" alt="hero-image" className="h-full object-contain" />
                </div>
            </div>
            <img src="/images/dentistry/blue-stars-1.svg" alt="blue-stars" className="hidden lg:block absolute top-[5%] left-[45%] object-cover" />
            <img src="/images/dentistry/blue-stars-2.svg" alt="blue-stars" className="hidden lg:block absolute top-[39%] right-0 object-cover" />
        </section>
    )
}

export default HeroSection 