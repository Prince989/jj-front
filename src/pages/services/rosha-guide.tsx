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
            title: 'مشاوره اولیه و رزرو نوبت',
            description: 'با کلیک روی دکمه "دریافت نوبت" یا تماس با کلینیک، نوبت مشاوره رایگان خود را رزرو کنید. تیم ما در اسرع وقت با شما تماس خواهد گرفت تا زمان مناسب برای ویزیت هماهنگ شود.',
        },
        {
            number: 2,
            title: 'ویزیت و معاینه تخصصی',
            description: 'در اولین جلسه، دکتر متخصص دهان و دندان معاینه کاملی انجام می‌دهد و با استفاده از تصویربرداری‌های پیشرفته، وضعیت دندان‌های شما را بررسی می‌کند. این مرحله شامل عکسبرداری رادیوگرافی و اسکن سه‌بعدی است.',
        },
        {
            number: 3,
            title: 'ارائه پلن درمانی',
            description: 'پس از بررسی‌های لازم، دکتر پلن درمانی جامعی برای شما تهیه می‌کند که شامل مراحل درمان، زمان‌بندی جلسات و هزینه‌های مربوطه است. در این مرحله تمامی سوالات شما پاسخ داده می‌شود.',
        },
        {
            number: 4,
            title: 'انتخاب و پرداخت',
            description: 'پس از تایید پلن درمانی، می‌توانید از میان گزینه‌های پرداخت نقدی یا اقساطی انتخاب کنید. کلینیک روشا امکان پرداخت اقساط بدون بهره با شرایط مناسب را برای راحتی شما فراهم کرده است.',
        },
        {
            number: 5,
            title: 'شروع درمان',
            description: 'درمان شما طبق برنامه زمان‌بندی شده آغاز می‌شود. در هر جلسه، تیم متخصص کلینیک با استفاده از تجهیزات پیشرفته و استاندارد جهانی، مراحل کاشت ایمپلنت را با دقت انجام می‌دهند.',
        },
        {
            number: 6,
            title: 'پیگیری و مراقبت پس از درمان',
            description: 'پس از اتمام درمان، جلسات پیگیری منظم برای اطمینان از موفقیت درمان برگزار می‌شود. تیم کلینیک راهنمایی‌های لازم برای مراقبت از ایمپلنت‌ها و حفظ سلامت دهان و دندان را به شما ارائه می‌دهند.',
        },
    ];

    const benefits = [
        'مشاوره رایگان با دکتر متخصص',
        'استفاده از تجهیزات پیشرفته و استریل',
        'امکان پرداخت اقساطی بدون بهره',
        'گارانتی کتبی ایمپلنت‌های اصل',
        'پیگیری رایگان پس از درمان',
        'قیمت‌گذاری شفاف و قابل اعتماد',
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
                                راهنمای گام به گام خرید خدمات
                            </h1>
                            <p className="text-lg md:text-xl opacity-90 max-w-3xl">
                                در کلینیک فوق تخصصی روشا، ما شما را در تمامی مراحل درمان همراهی می‌کنیم. این راهنما به شما کمک می‌کند تا با فرآیند خرید و دریافت خدمات آشنا شوید.
                            </p>
                        </div>
                    </div>

                    {/* Steps Section */}
                    <div className="max-w-[1200px] mx-auto px-4 py-12">
                        <div className="space-y-8">
                            {steps.map((step) => (
                                <Card
                                    key={step.number}
                                    className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                                                <div className="w-16 h-16 rounded-full bg-[#6A8358] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                                                    {step.number}
                                                </div>
                                            </div>

                                            {/* Step Content */}
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 text-lg leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Benefits Section */}
                        <div className="mt-16 bg-gradient-to-br from-[#6A8358]/10 to-[#6A8358]/5 rounded-2xl p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                مزایای انتخاب کلینیک روشا
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <CheckCircleIcon className="text-[#6A8358] flex-shrink-0 mt-1" sx={{ fontSize: 28 }} />
                                        <p className="text-gray-700 text-lg">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action Section */}
                        <div className="mt-16 text-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                آماده‌اید که اولین قدم را بردارید؟
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                                همین الان نوبت مشاوره رایگان خود را رزرو کنید و اولین گام به سوی لبخندی زیبا و سالم را بردارید.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="contained"
                                    size="large"
                                    className="bg-[#6A8358] hover:bg-[#5a7350] text-white rounded-lg py-3 px-10 text-lg font-medium normal-case hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    onClick={handleWhatsAppClick}
                                >
                                    دریافت نوبت رایگان
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    className="border-2 border-[#6A8358] text-[#6A8358] hover:border-[#5a7350] hover:bg-[#6A8358]/5 rounded-lg py-3 px-10 text-lg font-medium normal-case transition-all duration-300"
                                    onClick={() => router.push('/services/rosha')}
                                >
                                    بازگشت به صفحه اصلی
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

