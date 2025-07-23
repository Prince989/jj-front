import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

// Hero Section
const HeroSection = () => {
    const router = useRouter();
    const handleLoginClick = () => {
        router.push('/services/clrd/postal-info')
    };

    return (
        <section className="w-full flex flex-col items-center justify-start relative bg-white min-h-[450px]">
            <img
                src="/images/celeard/v2/hero1.svg"
                alt="Celeard Product"
                className="w-full h-[450px] object-cover absolute top-0 left-0"
            />
            <Button
                variant="contained"
                className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm hover:bg-[#d0172b] font-medium h-[40px] w-[200px] mt-32"
                onClick={handleLoginClick}
            >
                همین حالا سفارش دهید!
            </Button>
        </section>
    );
};

// Consulting Section
import { useForm } from 'react-hook-form';
import { useRequestClrd } from 'src/hooks/useConsultingClrd';

interface ConsultationFormData {
    name: string;
    phoneNumber: string;
}

const Consulting: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<ConsultationFormData>();

    const [phoneValue, setPhoneValue] = useState('');

    const { isConsulting, handleConsulting } = useRequestClrd({
        onSuccess: () => {
            reset();
            setPhoneValue('');
        }
    });

    const onSubmit = async (data: ConsultationFormData) => {
        // Always send English digits to API
        const normalizedPhone = persianToEnglish(data.phoneNumber);
        await handleConsulting({
            name: data.name,
            phoneNumber: normalizedPhone,
        });
    };

    // Controlled input for phoneNumber
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const englishValue = persianToEnglish(e.target.value);
        setPhoneValue(englishValue);
        setValue('phoneNumber', englishValue, { shouldValidate: true });
    };

    return (
        <div className="w-full relative">

            {/* Two Column Layout */}
            <div className="flex flex-col items-center justify-between bg-[#FFF7F2] p-6 m-5 rounded-lg">
                {/* Right Column - Form */}
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 leading-[30px]">دریافت مشاوره</h2>
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-900 mb-4 leading-[30px]">جهت دریافت <span className="text-[#ED1A31]">مشاوره رایگان</span> شماره تماس خود را وارد نمایید تا کارشناسان کلرد با شما ارتباط بگیرند. </p>
                    </div>
                </div>
                {/* Left Column - Image */}
                <div className="w-full flex justify-end">
                    <div className="w-full max-w-md">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    نام
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'نام الزامی است',
                                        minLength: {
                                            value: 2,
                                            message: 'نام باید حداقل ۲ کاراکتر باشد'
                                        }
                                    })}
                                    type="text"
                                    id="name"
                                    placeholder="مثال: علی رضایی"
                                    className="w-full px-4 text-[#9F9F9F] py-3 border border-[#FCE2D2] rounded-lg focus:ring-2 focus:ring-[#FCE2D2] focus:border-[#FCE2D2] transition-colors duration-200 text-right bg-[#FCE2D2]"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    شماره تماس
                                </label>
                                <input
                                    {...register('phoneNumber', {
                                        required: 'شماره تماس الزامی است',
                                        pattern: {
                                            value: /^(8|0)?9\d{9}$/,
                                            message: 'لطفا شماره تماس معتبر وارد کنید'
                                        }
                                    })}
                                    type="tel"
                                    id="phoneNumber"
                                    placeholder="مثال: 09123456789"
                                    className="w-full px-4 text-[#9F9F9F] py-3 border border-[#FCE2D2] rounded-lg focus:ring-2 focus:ring-[#FCE2D2] focus:border-[#FCE2D2] transition-colors duration-200 text-right bg-[#FCE2D2]"
                                    value={phoneValue}
                                    onChange={handlePhoneChange}
                                />
                                {errors.phoneNumber && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isConsulting}
                                className="w-full bg-[#ED1A31] disabled:bg-[#ca6470] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isConsulting ? 'در حال ارسال...' : 'ارسال درخواست مشاوره'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

// Features Celeard Section
import ProductInfo from "../productInfo";

const FeaturesCeleardSection = () => {
    const router = useRouter();

    return (
        <div className="w-full relative bg-[#F2FCF5]">
            <div className="flex flex-col items-center justify-between p-4">
                <img
                    src="/images/celeard/v2/hero2.svg"
                    alt="Celeard Product"
                    className="w-full h-[250px] object-contain"
                />
                <ProductInfo
                    title="سفید کننده دندان کلرد"
                    subTitle="سفیدکننده و ترمیم کننده"
                    price="۹۸۶,۰۰۰"
                    oldPrice="۱,۵۶۷,۰۰۰"
                    size="small"
                    addToCart
                    handleClick={() => router.push('/services/clrd/postal-info')}
                    countdownSeconds={48 * 3600 + 23 * 60 + 3} // 48:23:03
                    countdownTextSize="text-xl"
                />
            </div>
        </div>
    )
};

// About Section
const AboutSection = () => {
    return (
        <section className="w-full flex flex-col lg:mt-40 lg:mb-20 gap-10">
            <div className="w-full flex flex-col gap-5 px-5 bg-[url('/images/celeard/v2/hero4.svg')] bg-no-repeat bg-center bg-cover">
                <div className="w-full flex flex-col items-start gap-4 pt-10">
                    <div className="w-full relative flex flex-col items-center justify-center">
                        <div className="flex flex-col gap-3">
                            <span className="text-xl font-bold leading-6">
                                درباره <span className="text-[#FF3B57]">کلرد</span>
                            </span>
                            <p className="text-sm text-gray-500 text-justify">ژل سفیدکننده دندان با داشتن قیمت مناسب، استفاده‌ی آسان، تأثیرگذاری قابل قبول و رعایت استانداردهای ایمنی، به یکی از گزینه‌های محبوب خانگی برای زیبایی دندان تبدیل شده است. این ژل‌ها با فرمولاسیونی که به مینای دندان آسیب نمی‌زند، می‌توانند لکه‌های سطحی ناشی از قهوه، چای یا دخانیات را کاهش دهند. مصرف‌کنندگان با استفاده منظم از این محصولات، بدون نیاز به مراجعه به دندان‌پزشک، به لبخندی سفیدتر و اعتمادبه‌نفس بیشتر دست می‌یابند.</p>
                        </div>
                        <img
                            src="/images/celeard/v2/hero3.svg"
                            alt="Celeard Product"
                            className="w-full h-[310px] object-contain"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-4">
                    <div className='w-full flex flex-col items-end gap-4'>
                        <div className="w-full flex flex-col gap-3 mb-4">
                            <span className="text-xl font-bold leading-6">
                                سفید کننده دندان <span className="text-[#FF3B57]">کلرد</span>
                            </span>
                            <p className="text-sm text-gray-500 text-justify"> ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.</p>
                        </div>
                        <div className='w-full lg:w-2/3 flex flex-col items-start justify-start gap-2'>
                            <span className="text-xl font-bold leading-6 mb-2">
                                فواید <span className="text-[#FF3B57]">کلرد</span>
                            </span>
                            <div className='w-full flex gap-2 items-center mb-2'>
                                <img src="/images/celeard/tick-green.svg" alt="tick" className='w-[18px] h-[18px] object-contain' />
                                <p className="text-sm text-gray-500">اثرگذاری در کوتاه مدت</p>
                            </div>
                            <div className='w-full flex gap-2 items-center mb-2'>
                                <img src="/images/celeard/tick-green.svg" alt="tick" className='w-[18px] h-[18px] object-contain' />
                                <p className="text-sm text-gray-500">مناسب برای دندان های حساس</p>
                            </div>
                            <div className='w-full flex gap-2 items-center mb-2'>
                                <img src="/images/celeard/tick-green.svg" alt="tick" className='w-[18px] h-[18px] object-contain' />
                                <p className="text-sm text-gray-500">راهکاری بدون دردسر</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Why Celeard Section
const WhyCeleardSection = () => {

    return (
        <section className="w-full flex flex-col gap-5 py-8 px-5">
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-bold leading-6">چرا باید از <span className="text-[#FF3B57]">کلرد</span> استفاده کنیم؟</h2>
                <p className="text-sm text-gray-500 text-center"> ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.</p>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <img src="/images/celeard/v2/hero5.svg" alt="Celeard Product" className="w-full h-[150px] object-contain" />
                </div>
            </div>
        </section>
    );
};

// How to use Celeard Section
const HowToUseCeleardSection = () => {
    const router = useRouter();

    return (
        <div className="w-full relative bg-[#F2FCF5] py-4">
            <div className="w-full h-[475px] flex flex-col items-center justify-end p-4 bg-[url('/images/celeard/v2/hero6.svg')] bg-no-repeat positon-top bg-contain">
                <ProductInfo
                    title="سفید کننده دندان کلرد"
                    subTitle="سفیدکننده و ترمیم کننده"
                    price="۹۸۶,۰۰۰"
                    oldPrice="۱,۵۶۷,۰۰۰"
                    size="small"
                    addToCart
                    handleClick={() => router.push('/services/clrd/postal-info')}
                    countdownSeconds={48 * 3600 + 23 * 60 + 3} // 48:23:03
                    countdownTextSize="text-xl"
                />
            </div>
        </div>
    )
};

//Comments Section
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const comments = [
    {
        id: 1,
        name: "محمد رضا صادقی",
        comment: "ژل سفید کننده دندان عملکردی مشابه بلیچینگ مطب های دندانپزشکی داشت، من خیلی راضی هستم..",
        rating: 4,
        avatar: "/images/avatars/1.png"
    },
    {
        id: 2,
        name: "مریم صدری",
        comment: "حتما از مشاوره رایگانشون استفاده کنید، خیلی خوب راهنمایی میکنند.",
        rating: 5,
        avatar: "/images/avatars/2.png"
    },
    {
        id: 3,
        name: "افشین حسینی",
        comment: "واقعا راضی هستم، کاملا سفیدی رو روی دندون هام دیدم",
        rating: 4,
        avatar: "/images/avatars/3.png"
    },
    {
        id: 4,
        name: "سمیرا احمدی",
        comment: "وقتی دیدم میتونم قسطی هم بخرم سریع سفارش دادم، واقعا بی نظیره.",
        rating: 5,
        avatar: "/images/avatars/4.png"
    },
    {
        id: 5,
        name: "سحر کریمی",
        comment: "نتایج قابل توجهی در مدت کوتاه مشاهده کردم.",
        rating: 4,
        avatar: "/images/avatars/5.png"
    },
    {
        id: 6,
        name: "الهه رضایی",
        comment: "برای دندان‌های حساس هم مناسب است.",
        rating: 5,
        avatar: "/images/avatars/6.png"
    }
];

const CommentsSection = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            direction: 'rtl',
            dragFree: false,
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
            skipSnaps: false,
        },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', () => {
                setSelectedIndex(emblaApi.selectedScrollSnap());
            });
        }
    }, [emblaApi]);

    const renderStars = (rating: number) => {

        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-orange-400' : 'text-gray-300'}`}
                fill={index < rating ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
        ));
    };

    return (
        <div className="w-full relative py-8">
            <div className="w-full flex flex-col items-center justify-center gap-6 h-[450px] bg-[url('/images/celeard/v2/hero7.svg')] bg-no-repeat bg-center bg-cover">
                <h2 className="text-xl font-bold leading-6">نظرات کاربران</h2>

                {/* Slider */}
                <div className="overflow-hidden relative w-full h-[350px]" ref={emblaRef}>
                    <div className="flex">
                        {[...comments, ...comments].map((comment, index) => {
                            const isActive = selectedIndex === index;

                            return (
                                <div
                                    key={`${comment.id}-${index}`}
                                    className={`flex-[0_0_200px] min-w-0 mr-3 transition-all duration-300 ${isActive ? 'mt-12 scale-110' : 'mt-0 scale-100'
                                        }`}
                                >
                                    <div className={`w-full bg-white rounded-lg min-h-[250px] shadow-md p-6 flex flex-col gap-4 transform transition-all duration-300 hover:scale-105 ${isActive ? 'shadow-lg' : 'shadow-md'
                                        }`}>
                                        {/* Rating */}
                                        <div className="flex gap-1">
                                            {renderStars(comment.rating)}
                                        </div>

                                        {/* Profile Picture and Name */}
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={comment.avatar}
                                                alt={comment.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="font-bold text-black text-sm">
                                                {comment.name}
                                            </span>
                                        </div>

                                        {/* Comment */}
                                        <p className="text-black text-xs leading-relaxed">
                                            {comment.comment}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Landing Page ---
import * as React from "react";
import { persianToEnglish } from "src/utils/dentistry-panel/validation";

function CeleardLandingV2() {
    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            <HeroSection />
            <Consulting />
            <FeaturesCeleardSection />
            <AboutSection />
            <WhyCeleardSection />
            <HowToUseCeleardSection />
            <CommentsSection />
        </div>
    );
}

export default CeleardLandingV2;