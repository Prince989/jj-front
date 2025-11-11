import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import { handleWhatsAppClick } from 'src/utils/whatsapp';

const OfferSection = () => {

    const items: string[] = [
        'انجام خدمات ایمپلنت کامل (فیکسچرکره‌ای درجه یک، اباتمنت و متعلقات، کشیدن دندان، سینوس لیفت، پودر استخوان، روکش نهایی) به قیمت میانگین 37 میلیون تومان تنها با 22 میلیون تومان و بدون هیچ هزینه مازاد.',
        'ضمانت 15 ساله فیکسچر و 5 ساله شکست روکش.',
        'امکان خرید تا 10 عدد ایمپلنت برای هر فرد (قابل استفاده برای پرسنل و افراد معرفی شده توسط ایشان).',
        'پرداخت اقساط مبلغ در 10 قسط بدون سود.',
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
                                    آفر ویژۀ روشا برای هلدینگ صباایده
                                </h2>
                                <div className="mt-2 w-24 h-1 bg-[#6A8358] rounded-full ml-auto"></div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {items.map((text, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 text-gray-800 leading-8"
                                    >
                                        <span className="mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#6A8358] text-white flex-shrink-0">
                                            <CheckCircleIcon sx={{ fontSize: 20 }} />
                                        </span>
                                        <p className="text-sm sm:text-base">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-xl py-3 px-10 font-medium normal-case hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mt-8"
                            size="large"
                            onClick={handleWhatsAppClick}
                        >
                            دریافت نوبت
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default OfferSection;


