import React from 'react'
import { Typography } from '@mui/material'
import ColoredText from './ColoredText'

const WhyChooseUsSection = () => {
    const benefits = [
        'دریافت اعتبار خُرد جی جی لاین بدون ضامن، چک، کارمزد و سود',
        'خرید بدون پول، پرداخت در اقساط دو ماهه',
        'دریافت اعتبار از ۵۰ میلیون تومان تا ۲۰۰ میلیون تومان',
        'دریافت آنلاین و آنی اعتبار در کمتر از ۲۰ دقیقه',
        'بیش از ۱۲۰۰۰۰ فروشگاه و مراکز خدماتی در سراسر کشور',
        'امکان خرید، هم به شکل حضوری و هم آنلاین'
    ]

    return (
        <section className="relative flex flex-col lg:flex-row w-full bg-gradient-to-b from-sky-50 to-primary-blue-2 rounded-3xl my-20 p-7">
            {/* left side with benefits */}
            <div className="w-full lg:w-1/2 lg:p-8">
                <ColoredText
                    firstText="چرا جی"
                    middleText="جی"
                    lastText="لاین را انتخاب کنیم؟"
                    className="lg:mb-3 mb-6 justify-center"
                    textClassName="lg:text-4xl text-2xl font-[900]"
                />

                <div className="relative z-10">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex items-start mb-2 gap-1"
                        >
                            <span className="inline-block w-2 h-2 min-w-[8px] rounded-full bg-primary-blue m-0 mt-2" />
                            <Typography
                                variant="body1"
                                className="text-primary-blue text-base lg:text-xl font-normal"
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
                        src="/images/dentistry/marham-logo.png"
                        alt="Dental logo design"
                        className="w-[400px] lg:w-[400px] mb-4"
                    />
                </div>
            </div>
            <img src="/images/dentistry/orange-star.svg" alt="orange-star" className="hidden lg:block absolute bottom-[5%] right-[5%] object-cover" />

        </section>
    )
}

export default WhyChooseUsSection 