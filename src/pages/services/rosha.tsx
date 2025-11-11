import React, { ReactNode, useState, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import authConfig from 'src/configs/auth'
import Cookies from 'js-cookie'

// Import components
import RoshaHeader from 'src/components/rosha/header'
import RoshaFooter from 'src/components/rosha/footer'
import RoshaHeroSection from 'src/components/rosha/heroSection'
import CreditSection from 'src/components/rosha/creditSection'
import AuthModal from 'src/components/rosha/AuthModal'
import OfferSection from 'src/components/rosha/offerSection'
import GuideSection from 'src/components/rosha/guideSection'


const RoshaPanel = () => {
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
                <div className="flex flex-col">
                    <RoshaHeroSection />
                    <OfferSection />
                    <GuideSection />
                    <div id="credit-section">
                        <CreditSection />
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
    )
}

RoshaPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

RoshaPanel.authGuard = false
RoshaPanel.guestGuard = false

export default RoshaPanel

