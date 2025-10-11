import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import RoshaHeader from 'src/components/rosha/header';
import RoshaFooter from 'src/components/rosha/footer';
import AuthModal from 'src/components/rosha/AuthModal';
import authConfig from 'src/configs/auth';
import Cookies from 'js-cookie';
import { handleWhatsAppClick } from '../../utils/whatsapp';

const RoshaGuide = () => {
    const router = useRouter();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication status
    useEffect(() => {
        const checkAuth = () => {
            const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName) || Cookies.get(authConfig.storageTokenKeyName);
            const isLoggedIn = !!storedToken;
            setIsAuthenticated(isLoggedIn);

            // If not authenticated, show auth modal
            if (!isLoggedIn) {
                setIsAuthModalOpen(true);
            }

            setIsLoading(false);
        };

        checkAuth();

        // Listen for storage changes
        window.addEventListener('storage', checkAuth);

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
    };

    const handleCloseAuthModal = () => {
        // Prevent closing modal if user is not authenticated
        if (!isAuthenticated) {
            return;
        }
        setIsAuthModalOpen(false);
    };

    const steps = [
        {
            number: 1,
            title: 'ورود به سایت جی‌جی لاین و انتخاب خدمات دندانپزشکی روشا',
            description: 'ابتدا وارد سایت جی‌جی لاین شوید و از میان خدمات موجود، خدمات دندانپزشکی روشا را انتخاب کنید تا به صفحه مخصوص این خدمات دسترسی پیدا کنید.',
        },
        {
            number: 2,
            title: 'انتخاب دکمه «مشاوره و نوبت‌دهی»',
            description: 'در صفحه خدمات دندانپزشکی روشا، دکمه "مشاوره و نوبت‌دهی" را انتخاب کنید تا وارد فرآیند دریافت مشاوره و تعیین نوبت شوید.',
        },
        {
            number: 3,
            title: 'ورود به واتساپ مشاوران',
            description: 'پس از انتخاب دکمه مشاوره، به واتساپ مشاوران متخصص ما متصل خواهید شد تا بتوانید با تیم مشاوره در ارتباط باشید.',
        },
        {
            number: 4,
            title: 'ارسال عکس OPG به مشاور در واتساپ و دریافت مشاوره در خصوص تعداد ایمپلنت لازم',
            description: 'عکس OPG (رادیوگرافی کامل دهان و دندان) خود را برای مشاور ارسال کنید. مشاور متخصص ما بر اساس این عکس، مشاوره تخصصی در مورد تعداد ایمپلنت مورد نیاز شما ارائه خواهد داد.',
        },
        {
            number: 5,
            title: 'خرید ایمپلنت از طریق دکمه <خرید ایمپلنت>',
            description: 'پس از دریافت مشاوره و مشخص شدن تعداد ایمپلنت مورد نیاز، دکمه "خرید ایمپلنت" را انتخاب کنید تا وارد فرآیند خرید شوید.',
        },
        {
            number: 6,
            title: 'انتخاب تعداد ایمپلنت مطابق با مشاوره دریافت شده',
            description: 'بر اساس مشاوره دریافت شده از مشاور متخصص، تعداد ایمپلنت مورد نیاز خود را انتخاب کنید و به مرحله پرداخت بروید.',
        },
        {
            number: 7,
            title: 'پرداخت آنلاین مبلغ پیش‌پرداخت از طریق دکمه <پیش‌پرداخت>',
            description: 'مبلغ پیش‌پرداخت را به صورت آنلاین و امن از طریق دکمه "پیش‌پرداخت" پرداخت کنید. سیستم پرداخت ما کاملاً امن و قابل اعتماد است.',
        },
        {
            number: 8,
            title: 'پس از پرداخت، پیامکی حاوی شماره پیگیری و تأیید پرداخت برای شما ارسال خواهد شد',
            description: 'پس از تکمیل پرداخت، پیامکی حاوی شماره پیگیری و تأیید پرداخت برای شما ارسال خواهد شد. این پیامک را نگه دارید.',
        },
        {
            number: 9,
            title: 'پس از دریافت پیامک، مجدد به لینک « دریافت نوبت » مراجعه و شماره پیگیری را به مشاور ارسال نمایید',
            description: 'پس از دریافت پیامک، مجدداً به لینک "دریافت نوبت" مراجعه کنید و شماره پیگیری دریافتی را به مشاور ارسال نمایید.',
        },
        {
            number: 10,
            title: 'مشاور تاریخ نوبت، درمان و سایر اطلاعات لازم جهت مراجعه به کلینیک را به شما اطلاع خواهد داد',
            description: 'مشاور متخصص ما تاریخ نوبت، جزئیات درمان و سایر اطلاعات لازم جهت مراجعه به کلینیک را به شما اطلاع خواهد داد.',
        },
    ];

    const benefits = [
        'مشاوره رایگان با متخصصان دندانپزشکی',
        'ارسال عکس OPG و دریافت مشاوره تخصصی',
        'خرید ایمپلنت با قیمت مناسب و شفاف',
        'پرداخت آنلاین امن و آسان',
        'پیگیری کامل فرآیند از طریق واتساپ',
        'دریافت نوبت و اطلاعات درمانی دقیق',
        'پشتیبانی ۲۴ ساعته در تمامی مراحل',
        'گارانتی کیفیت و خدمات پس از فروش',
    ];

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8358] mx-auto"></div>
                    <p className="mt-4 text-gray-600">در حال بررسی احراز هویت...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white max-w-[1440px] mx-auto relative">
            {/* Main content with conditional blur */}
            <div className={`transition-all duration-300 ${isAuthModalOpen ? 'blur-md pointer-events-none select-none' : ''}`}>
                <div className="flex flex-col relative">
                    <RoshaHeader />
                </div>
                <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
                    {/* Header Section */}
                    <div className="bg-[#6A8358] text-white py-16 px-4">
                        <div className="max-w-[1200px] mx-auto">
                            <Button
                                startIcon={<ArrowForwardIcon />}
                                onClick={() => router.back()}
                                className="text-white mb-6 hover:bg-white/10 normal-case"
                            >
                                بازگشت
                            </Button>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                راهنمای گام به گام دریافت خدمات اعتباری و دندانپزشکی روشا
                            </h1>
                            <p className="text-lg md:text-xl opacity-90 max-w-3xl">
                                این راهنمای کامل تمامی مراحل دریافت خدمات اعتباری و دندانپزشکی روشا را به صورت گام به گام شرح می‌دهد تا بتوانید به راحتی از خدمات ما بهره‌مند شوید.
                            </p>
                        </div>
                    </div>

                    {/* Steps Section */}
                    <div className="max-w-[1200px] mx-auto px-4 py-12">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                مراحل دریافت خدمات
                            </h2>
                            <div className="w-24 h-1 bg-[#6A8358] mx-auto rounded-full"></div>
                        </div>
                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <Card
                                    key={step.number}
                                    className="shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                    sx={{
                                        borderRight: '6px solid #6A8358',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            transition: 'transform 0.3s ease',
                                        },
                                    }}
                                >
                                    <CardContent className="p-6 md:p-8">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Step Number */}
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6A8358] to-[#5a7350] text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                                        {step.number}
                                                    </div>
                                                    {index < steps.length - 1 && (
                                                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-[#6A8358] to-transparent hidden md:block"></div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Step Content */}
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-relaxed">
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 text-base leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Benefits Section */}
                        <div className="mt-16 bg-gradient-to-br from-[#6A8358]/10 to-[#6A8358]/5 rounded-2xl p-8 md:p-12 border border-[#6A8358]/20">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                مزایای دریافت خدمات اعتباری و دندانپزشکی روشا
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                                    >
                                        <div className="w-12 h-12 bg-[#6A8358] rounded-full flex items-center justify-center mb-4">
                                            <CheckCircleIcon className="text-white" sx={{ fontSize: 24 }} />
                                        </div>
                                        <p className="text-gray-700 text-sm font-medium leading-relaxed">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action Section */}
                        <div className="mt-16 text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-12 border border-[#6A8358]/10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                آماده شروع فرآیند دریافت خدمات اعتباری و دندانپزشکی؟
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                                با دنبال کردن مراحل بالا، می‌توانید به راحتی از خدمات اعتباری و دندانپزشکی روشا بهره‌مند شوید. مشاوران متخصص ما در تمامی مراحل همراه شما خواهند بود.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="contained"
                                    size="large"
                                    className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-xl py-4 px-12 text-lg font-medium normal-case hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    onClick={handleWhatsAppClick}
                                >
                                    شروع مشاوره و نوبت‌دهی
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    className="border-2 border-[#6A8358] text-[#6A8358] hover:border-[#5a7350] hover:bg-[#6A8358]/5 rounded-xl py-4 px-12 text-lg font-medium normal-case transition-all duration-300"
                                    onClick={() => router.push('/services/rosha')}
                                >
                                    بازگشت به صفحه خدمات
                                </Button>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-12 text-center text-gray-600">
                            <p className="text-lg">
                                در صورت داشتن هرگونه سوال، تیم پشتیبانی ما آماده پاسخگویی به شماست.
                            </p>
                        </div>
                    </div>
                </div>
                <RoshaFooter />
            </div>

            {/* Dark overlay when auth modal is open */}
            {isAuthModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-30 z-40 pointer-events-none" />
            )}

            {/* Authentication Modal */}
            <AuthModal
                open={isAuthModalOpen}
                onClose={handleCloseAuthModal}
                onSuccess={handleAuthSuccess}
                canClose={isAuthenticated}
            />
        </div>
    );
};

RoshaGuide.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

RoshaGuide.authGuard = false;
RoshaGuide.guestGuard = false;

export default RoshaGuide;

