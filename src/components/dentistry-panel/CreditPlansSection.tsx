import React from 'react'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import ColoredText from 'src/components/dentistry-panel/ColoredText'
import Link from "next/link";

interface CreditPlanProps {
    title: string
    features: string[]
    buttonText: string

}

const CreditPlan: React.FC<CreditPlanProps> = ({ title, features, buttonText }) => {
    return (
        <Link href={'/validation'} className="block h-full">
            <div
                className='p-4 lg:p-8 h-full rounded-[32px] bg-gradient-to-b from-primary-blue to-primary-blue-1 flex flex-col cursor-pointer'
            >
                <div className="w-4/5 h-20 rounded-2xl mx-auto my-8 flex justify-center items-center">
                    <Image
                        src="/images/dentistry/money-bag.svg"
                        width={70}
                        height={70}
                        alt="Money Bag"
                        className="text-secondary"
                    />
                </div>

                <Typography
                    variant="h4"
                    component="h3"
                    className="text-lg lg:text-2xl font-extrabold text-center text-white mb-10"
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
                'بازپرداخت ۲۴ ماهه',
                'بازپرداخت ۲۴ ماهه',
                'بدون نیاز به ضامن',
                'بدون نیاز به ضامن'
            ],
            buttonText: 'دریافت اعتبار'
        },
        {
            title: 'اعتبار ۲۰۰ میلیون تومانی',
            features: [
                'بازپرداخت ۲۴ ماهه',
                'بازپرداخت ۲۴ ماهه',
                'بدون نیاز به ضامن',
                'بدون نیاز به ضامن'
            ],
            buttonText: 'دریافت اعتبار',
        }
    ]

    return (
        <section className="w-full bg-white">

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
                        />
                    </div>
                ))}
            </div>

        </section>
    )
}

export default CreditPlansSection 