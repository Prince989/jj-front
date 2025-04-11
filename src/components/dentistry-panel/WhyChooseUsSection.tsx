import React from 'react'
import { Typography } from '@mui/material'
import ColoredText from 'src/components/dentistry-panel/ColoredText'

const WhyChooseUsSection = () => {
    const benefits = [
        'دریافت اعتبار خُرد جی جی دکتر بدون ضامن، چک، کارمزد و سود',
        'خرید بدون پول، پرداخت در اقساط دو ماهه',
        'دریافت اعتبار از ۵۰ میلیون تومان تا ۲۰۰ میلیون تومان',
        'دریافت آنلاین و آنی اعتبار در کمتر از ۲۰ دقیقه',
        'بیش از ۱۲۰۰۰۰ فروشگاه و مراکز خدماتی در سراسر کشور',
        'امکان خرید، هم به شکل حضوری و هم آنلاین'
    ]

    return (
        <section className="relative flex flex-col lg:flex-row w-full bg-gradient-to-b from-sky-50 to-primary-blue-2 rounded-3xl p-7">
            <style>{`
                @keyframes twinkleOrange {
                    0% { opacity: 0.2; transform: rotate(0deg); }
                    50% { opacity: 1; transform: rotate(180deg); }
                    100% { opacity: 0.2; transform: rotate(360deg); }
                }
                .twinkleOrange-1 {
                    animation: twinkleOrange 3s ease-in-out infinite;
                    animation-delay: 0s;
                }
            `}</style>
            {/* left side with benefits */}
            <div className="w-full lg:w-1/2 lg:p-8">
                <ColoredText
                    firstText="چرا جی"
                    middleText="جی"
                    lastText="دکتر را انتخاب کنیم؟"
                    className="mb-6"
                    textClassName="lg:text-3xl text-lg font-[900]"
                />

                <div className="flex flex-col z-10 gap-2">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex items-start mb-2 gap-1"
                        >
                            <span className="inline-block w-2 h-2 min-w-[8px] rounded-full bg-primary-blue m-0 mt-2 lg:mt-3" />
                            <Typography
                                variant="body1"
                                className="text-primary-blue text-sm lg:text-lg font-normal"
                            >
                                {benefit}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side with dental logo */}
            <div className="w-full lg:w-1/2 flex justify-center items-center">
                <div className="relative w-full h-full flex flex-col justify-center items-center p-8">
                    <img
                        src="/images/main-landing/darman.png"

                        // src="/images/dentistry/marham-logo.png"
                        alt="Dental logo design"
                        className="w-[400px] lg:w-[400px] mb-4"
                    />
                </div>
            </div>

            <img
                src="/images/dentistry/orange-star.svg"
                alt="orange-star"
                className="absolute bottom-[2%] left-[5%] object-cover twinkleOrange-1"
            />
        </section>
    )
}

export default WhyChooseUsSection 