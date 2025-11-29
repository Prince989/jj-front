import React from 'react'
import { Typography } from '@mui/material'
import Image from 'next/image'
import ColoredText from 'src/components/dentistry-panel/ColoredText'

interface CreditPlanProps {
    title: string
    subTitle: string
    features: string[]

}

const FeaturedBox: React.FC<CreditPlanProps> = ({ title, features, subTitle }) => {
    return (
        <div
            className='p-4 lg:p-8 h-full rounded-[32px] bg-gradient-to-b from-primary-blue to-primary-blue-1 flex flex-col justify-between'
        >
            <div className="flex flex-col items-center justify-center">
                <Typography
                    variant="h5"
                    component="h5"
                    className="text-lg lg:text-2xl font-extrabold text-center text-white mb-4"
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="span"
                    className="text-md font-light text-center text-white mb-10"
                >
                    {subTitle}
                </Typography>
            </div>

            <div className="relative flex flex-col bg-white/10 rounded-2xl p-7 gap-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-center mb-2 z-10"
                    >
                        <Image
                            src="/images/dentistry/check-circle.svg"
                            width={19}
                            height={19}
                            alt="Check"
                            className="ml-2"
                        />
                        <Typography
                            variant="body1"
                            className="text-base text-white font-semibold"
                        >
                            {feature}
                        </Typography>
                    </div>
                ))}

                <img src="/images/dentistry/vertical-stars.svg" alt="vertical-stars" className="absolute bottom-[5%] left-[5%] object-cover" />

            </div>
        </div>
    )
}

const FeaturedSection = () => {
    const creditPlans = [
        {
            title: 'خرید اقساطی برای همه',
            subTitle: 'فقط با احراز هویت و اعتبارسنجی، بدون نیاز به مراجعه حضوری',
            features: [
                'فرآیند کاملا آنلاین',
                'تایید سریع درخواست'

            ],
        },
        {
            title: 'بدون هیچ هزینه اضافی',
            subTitle: 'پرداخت اقساطی بدون هیچ هزینه اضافی، فقط اصل مبلغ',
            features: [
                'کارمزد صفر درصد',
                'بدون پیش پرداخت'
            ],
        },
        {
            title: 'تنوع خدمات',
            subTitle: 'قابل استفاده در انواع فروشگاه‌ها و مراکز خدماتی',
            features: [
                'خدمات درمانی و پزشکی',
                'کالای دیجیتال و لوازم خانگی'
            ],
        },
    ]

    return (
        <section className="w-full bg-white">

            <ColoredText
                firstText="ویژگی های جی"
                middleText="جی"
                lastText="دکتر"
                className="mb-5 justify-center"
                textClassName="lg:text-3xl text-2xl font-[700]"
            />
            <Typography
                variant="body1"
                className="text-lg text-gray-800 text-center mb-10"
            >
                تجربه‌ای متفاوت در خرید اقساطی
            </Typography>
            <div className="w-full flex flex-col lg:flex-row justify-center gap-8">
                {creditPlans.map((plan, index) => (
                    <div key={index} className="w-full lg:w-[33%]">
                        <FeaturedBox
                            title={plan.title}
                            subTitle={plan.subTitle}
                            features={plan.features}
                        />
                    </div>
                ))}
            </div>

        </section>
    )
}

export default FeaturedSection 