import React from 'react'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import ColoredText from './ColoredText'

interface CreditPlanProps {
    title: string
    features: string[]
    buttonText: string

}

const CreditPlan: React.FC<CreditPlanProps> = ({ title, features, buttonText }) => {
    return (
        <div
            className='p-4 lg:p-8 h-full rounded-[32px] bg-gradient-to-b from-primary-blue to-primary-blue-1 flex flex-col'
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
                className="text-[31px] font-extrabold text-center text-white mb-10"
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
                            className="text-xl text-white font-semibold"
                        >
                            {feature}
                        </Typography>
                    </div>
                ))}

                <img src="/images/dentistry/vertical-stars.svg" alt="vertical-stars" className="absolute bottom-[30%] left-[5%] object-cover" />

            </div>

            <Button
                variant="contained"
                className="bg-primary-orange hover:bg-primary-orange text-white rounded-lg py-3 mt-8 text-[15px] font-bold"
            >
                {buttonText}
            </Button>
        </div>
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
        <section className="py-4 lg:py-6 mt-6 w-full bg-white">

            <ColoredText
                firstText="طرح های اعتباری جی"
                middleText="جی"
                lastText="لاین"
                className="mb-10 justify-center"
                textClassName="lg:text-4xl text-2xl font-[900]"
            />
            <div className="w-full flex flex-col lg:flex-row justify-between gap-12">
                {creditPlans.map((plan, index) => (
                    <div key={index} className="w-full lg:w-1/2">
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