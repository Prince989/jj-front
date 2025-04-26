import React from 'react'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import ColoredText from 'src/components/dentistry-panel/ColoredText'
import Link from "next/link";

interface CreditPlanProps {
    title: string
    features: string[]
    buttonText: string
    image: string
    link: string
}

const CreditPlan: React.FC<CreditPlanProps> = ({ title, features, buttonText, image, link }) => {
    return (
        <Link href={link} className="block h-full">
            <div
                className='p-4 lg:p-8 h-full rounded-[32px] bg-gradient-to-b from-primary-blue to-primary-blue-1 flex flex-col justify-between cursor-pointer'
            >
                <div className='flex flex-col'>
                    <div className="w-full h-20 rounded-2xl mx-auto my-8 flex justify-center items-center">
                        <Image
                            src={image}
                            width={350}
                            height={150}
                            alt="Money Bag"
                            className="text-secondary"

                        />
                    </div>

                    <Typography
                        variant="h4"
                        component="h3"
                        className="text-lg lg:text-2xl font-extrabold text-center text-white mb-10 lg:mt-8"
                    >
                        {title}
                    </Typography>

                    <div className="relative flex flex-col bg-white/10 rounded-2xl p-7 gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center mb-2"
                            >
                                <Image
                                    src="/images/dentistry/check-circle.svg"
                                    width={24}
                                    height={24}
                                    alt="Check"
                                    className="ml-2"
                                />
                                <Typography
                                    variant="body1"
                                    className="text-lg lg:text-xl text-white font-semibold"
                                >
                                    {feature}
                                </Typography>
                            </div>
                        ))}

                        <img src="/images/dentistry/vertical-stars.svg" alt="vertical-stars" className="absolute bottom-[30%] left-[5%] object-cover" />

                    </div>
                </div>
                <Button
                    variant="contained"
                    fullWidth
                    className="bg-primary-orange hover:bg-primary-orange text-white rounded-lg py-3 mt-8 text-[15px] font-bold"
                >
                    {buttonText}
                </Button>
            </div>
        </Link>
    )
}


const CreditPlansSection = () => {
    const creditPlans = [
        {
            title: 'اعتبار ۵۰ میلیون تومانی',
            features: [
                'اقساط ۶ ماهه',
                'سقف اعتبار ۵۰ میلیون',
                'ویزیت اولیه پزشک رایگان',
                'بدون سود و کارمزد',
                'هزینه فعال سازی با ۵۰٪ تخفیف ۱ میلیون',
            ],
            buttonText: 'دریافت اعتبار',
            image: '/images/validation-forms/50mil.svg',
            link: '/validation?card=50mil'
        },
        {
            title: 'اعتبار ۲۰۰ میلیون تومانی',
            features: [
                'اعتبار تا ۲۴ ماه',
                'سقف اعتبار ۲۰۰ میلیون',
                'ویزیت اولیه پزشک رایگان',
                'تا ۱۲ ماه بدون سود و کارمزد',
                '۵میلیون اعتبار بدون نیاز به چک و سفته',
                'هزینه فعالسازی با ۵۰٪ تخفیف ۴ میلیون',
            ],
            buttonText: 'دریافت اعتبار',
            image: '/images/validation-forms/200mil.svg',
            link: '/validation?card=200mil'
        }
    ]

    return (
        <section className="w-full bg-white" id="credit-plans">

            <ColoredText
                firstText="طرح های اعتباری جی"
                middleText="جی"
                lastText="دکتر"
                className="mb-5 justify-center"
                textClassName="lg:text-4xl text-2xl font-[900]"
            />
            <h6 className="text-primary-blue text-sm lg:text-lg font-normal text-center mb-10">
                لطفا یکی از کارت های اعتباری را انتخاب کنید
            </h6>

            <div className="w-full flex flex-col lg:flex-row justify-center gap-12">
                {creditPlans.map((plan, index) => (
                    <div key={index} className="w-full lg:w-[36%]">
                        <CreditPlan
                            title={plan.title}
                            features={plan.features}
                            buttonText={plan.buttonText}
                            image={plan.image}
                            link={plan.link}
                        />
                    </div>
                ))}
            </div>

        </section>
    )
}

export default CreditPlansSection 