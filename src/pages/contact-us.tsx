import React, { ReactNode } from 'react'
import Head from 'next/head'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Header from 'src/components/header/Header'
import Footer from 'src/components/footer'

const ContactUs = () => {
  return (
    <div className="bg-white" dir="rtl">
      <Head>
        <title>تماس با ما | جی جی</title>
        <meta
          name="description"
          content="راه‌های ارتباط با جی جی: آدرس و شماره تماس برای ارتباط سریع و آسان."
        />
      </Head>

      <div className="flex flex-col bg-white px-3 lg:px-24">
        <Header />
      </div>
      <div className="flex flex-col bg-white px-3 lg:px-36 py-12">
        <div className="w-full bg-[#EEF9FF] rounded-xl p-6 md:p-10 shadow-sm">
          <h1 className="text-xl md:text-2xl font-bold text-[#002B8A] mb-6">
            تماس با ما
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[#002B8A] font-semibold mb-2">آدرس</p>
                <p className="text-[#212121] leading-8">
                  تهران - تهران پارس فلکه سوم - خیابان اخوت - خیابان ۲۱۰ غربی - پلاک ۶ - واحد ۷
                </p>
              </div>
              <div>
                <p className="text-[#002B8A] font-semibold mb-2">تلفن</p>
                <a
                  href="tel:+989384923744"
                  className="text-primary-orange hover:text-[#E05F00] font-semibold transition-colors"
                >
                  ۰۹۳۸۴۹۲۳۷۴۴
                </a>
              </div>
            </div>
            <div className="order-1 md:order-none">
              <div className="w-full h-full rounded-lg bg-white border border-[#D6E9FF] flex items-center justify-center text-[#6E9BFF]">
                <img
                  src="/images/rosha/contact.jpg"
                  alt="تماس با jjdr"
                  className="w-full h-auto rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

ContactUs.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
  ; (ContactUs as any).authGuard = false
  ; (ContactUs as any).guestGuard = true

export default ContactUs


