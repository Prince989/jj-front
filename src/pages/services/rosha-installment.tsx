import React, { ReactNode, useEffect, useState } from 'react';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import authConfig from 'src/configs/auth';
import Cookies from 'js-cookie';

// Rosha layout components
import RoshaHeader from 'src/components/rosha/header';
import RoshaFooter from 'src/components/rosha/footer';
import AuthModal from 'src/components/rosha/AuthModal';

// Rosha installment component
import RoshaInstallment from 'src/components/rosha/installment';

const RoshaInstallmentPage = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const storedToken =
                window.localStorage.getItem(authConfig.storageTokenKeyName) ||
                Cookies.get(authConfig.storageTokenKeyName);
            const isLoggedIn = !!storedToken;
            setIsAuthenticated(isLoggedIn);

            if (!isLoggedIn) {
                setIsAuthModalOpen(true);
            }
            setIsLoading(false);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
    };

    const handleCloseAuthModal = () => {
        if (!isAuthenticated) return;
        setIsAuthModalOpen(false);
    };

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
            <div className={`transition-all duration-300 ${isAuthModalOpen ? 'blur-md pointer-events-none select-none' : ''}`}>
                <div className="flex flex-col relative">
                    <RoshaHeader />
                </div>
                <div className="flex flex-col">
                    <div className="px-4 lg:px-24 py-8">
                        <RoshaInstallment isAuthenticated={isAuthenticated} />
                    </div>
                </div>
                <RoshaFooter />
            </div>

            {isAuthModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-30 z-40 pointer-events-none" />
            )}

            <AuthModal
                open={isAuthModalOpen}
                onClose={handleCloseAuthModal}
                onSuccess={handleAuthSuccess}
                canClose={isAuthenticated}
            />
        </div>
    );
};

RoshaInstallmentPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
RoshaInstallmentPage.authGuard = false;
RoshaInstallmentPage.guestGuard = false;

export default RoshaInstallmentPage;


