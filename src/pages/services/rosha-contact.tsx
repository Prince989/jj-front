import React, { ReactNode } from 'react'
import Head from 'next/head'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import RoshaHeader from 'src/components/rosha/header'
import RoshaFooter from 'src/components/rosha/footer'

const RoshaContact = () => {
    return (
        <div className="bg-white max-w-[1440px] mx-auto relative" dir="rtl">
            <Head>
                <title>تماس با ما | روشا</title>
                <meta
                    name="description"
                    content="راه‌های ارتباط با روشا: آدرس و شماره تماس برای ارتباط سریع و آسان."
                />
            </Head>

            <div className="flex flex-col relative">
                <RoshaHeader />
            </div>

            <div className="px-4 md:px-8 lg:px-12 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Image */}
                    <div className="bg-[#F7F9F6] rounded-xl p-6 md:p-14 shadow-sm">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#2B3A2A] mb-6">
                            تماس با ما
                        </h1>
                        <div className="space-y-5 text-gray-700 leading-8">
                            <div>
                                <p className="font-semibold text-[#2B3A2A] mb-2">آدرس</p>
                                <p>
                                    تهران - آرارات - خیابان آرارات جنوبی - بن بست شیرین - پلاک 19 - طبقه
                                    همکف
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-[#2B3A2A] mb-2">تلفن</p>
                                <p>
                                    <a
                                        href="tel:989904808839"
                                        className="text-[#6A8358] hover:text-[#567048] font-semibold transition-colors"
                                    >
                                        09904808839
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Right: Text Content */}
                    <div className="order-1 md:order-none">
                        <img
                            src="/images/rosha/contact.jpg"
                            alt="تماس با روشا"
                            className="w-full h-auto rounded-xl shadow-md object-cover"
                        />
                    </div>
                </div>
            </div>

            <RoshaFooter />
        </div>
    )
}

RoshaContact.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
    ; (RoshaContact as any).authGuard = false
    ; (RoshaContact as any).guestGuard = false

export default RoshaContact


