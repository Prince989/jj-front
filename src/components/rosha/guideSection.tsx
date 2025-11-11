import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const GuideSection = () => {
    const steps: Array<{ number: number; title: string; description?: string }> = [
        {
            number: 1,
            title:
                'در سایت جی‌جی‌لاین با شماره موبایلی که در شرکت صباایده ثبت شده است (همان شماره‌ای که در دیتابیس شرکت موجود است) ثبت‌نام کنید.',
            description: 'شماره شما بررسی می‌شود و پیامک تأیید برایتان ارسال خواهد شد.',
        },
        {
            number: 2,
            title:
                'تعداد ایمپلنت‌هایی را که قصد دارید در یک سال آینده برای خود یا اعضای خانواده استفاده کنید، انتخاب نمایید.',
        },
        {
            number: 3,
            title: 'قسط اول (10 درصد مبلغ) را به‌صورت آنلاین به‌عنوان پیش‌پرداخت واریز کنید.',
            description: 'مابقی مبلغ در 9 قسط ماهیانه بدون سود قابل پرداخت است.',
        },
        {
            number: 4,
            title:
                'در صورتی که حداکثر ۳ عدد ایمپلنت انتخاب کرده باشید، پس از واریز پیش‌پرداخت، به تعداد ایمپلنت درخواستی برای شما کد پیامک ارسال می‌شود.',
            description:
                'اما اگر ۴ عدد یا بیشتر انتخاب کرده‌اید، لازم است ابتدا به واحد مالی شرکت مراجعه کرده و یک سفته ضمانتی امضا کنید. سفته‌ها از قبل در واحد مالی آماده هستند و نیازی به تهیه سفته توسط شما نیست. پس از امضا، کدهای مربوط به تعداد ایمپلنت درخواستی برایتان پیامک خواهد شد.',
        },
        {
            number: 5,
            title:
                'سپس از طریق تماس باپشتیبانی کلینیک روشا که مختص پرسنل صبا ایده میباشد  (اکانت منیجر صباایده در کلینیک روشا) به شماره 09397777221 تماس حاصل فرمائید  تا وقت ویزیت خود را رزرو کنید.',
            description:
                'در ضمن لینک ارتباط برای چت با شماره تماس فوق از طریق واتس آپ در سایت در قسمت نوبت دهی قرار داده شده است.',
        },
        {
            number: 6,
            title:
                'در روز مراجعه به کلینیک روشا، کدهای دریافتی را ارائه دهید (خودتان یا فردی که از طرف شما مراجعه کرده است). پس از تأیید کدها، فرآیند درمان بلافاصله آغاز می‌شود.',
        },
    ];

    return (
        <section dir="rtl" className="w-full bg-white">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-24 py-8 lg:py-12">
                <Card
                    className="shadow-[0_0_60px_-20px_rgba(106,131,88,0.25)] rounded-2xl border border-[#6A8358]/15"
                    sx={{
                        overflow: 'hidden',
                        background:
                            'linear-gradient(180deg, rgba(106,131,88,0.05) 0%, rgba(255,255,255,0.9) 100%)',
                    }}
                >
                    <CardContent className="p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col gap-6">
                            <div className="text-right">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-relaxed">
                                    راهنمای گام به گام
                                </h2>
                                <div className="mt-2 w-24 h-1 bg-[#6A8358] rounded-full ml-auto"></div>
                            </div>

                            {/* Timeline */}
                            <div className="relative mt-2 sm:mt-4">
                                {/* Vertical line on the right (RTL) */}
                                <div className="absolute right-6 sm:right-8 top-0 bottom-0 w-0.5 bg-[#6A8358]/20 pointer-events-none"></div>

                                <div className="space-y-5 sm:space-y-6">
                                    {steps.map((step) => (
                                        <div key={step.number} className="relative pr-16 sm:pr-24">
                                            {/* Step number circle */}
                                            <div className="absolute right-0 sm:right-2 top-0">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#6A8358] to-[#5a7350] text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg">
                                                    {step.number}
                                                </div>
                                            </div>
                                            {/* Step card */}
                                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 ring-1 ring-[#6A8358]/10 shadow-sm">
                                                <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-relaxed">
                                                    {step.title}
                                                </h3>
                                                {step.description ? (
                                                    <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default GuideSection;


