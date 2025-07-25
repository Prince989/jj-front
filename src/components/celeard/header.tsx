import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useAuth } from 'src/hooks/useAuth';
import authConfig from 'src/configs/auth';
import Cookies from 'js-cookie';

const menuItems = [
    { label: 'خانه', key: 'home', href: '/services/clrd' },
    { label: 'درباره کلرد', key: 'about', href: '/services/clrd' },
    { label: 'تماس باما', key: 'contact', href: '/services/clrd' },
    { label: 'مقالات', key: 'articles', href: '/services/clrd' },
];

const CeleardHeader = () => {
    const [active, setActive] = useState('home');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const { logout } = useAuth();
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const handleMenuClick = (item: typeof menuItems[0]) => {
        setActive(item.key);
        router.push(item.href);
        setDrawerOpen(false);
    };

    // Check authentication status
    useEffect(() => {
        const checkAuth = () => {
            const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName) || Cookies.get(authConfig.storageTokenKeyName);
            setIsLoggedIn(!!storedToken);
        };

        checkAuth();

        // Listen for storage changes
        window.addEventListener('storage', checkAuth);

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLoginClick = () => {
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/verify-otp?returnUrl=${encodeURIComponent(currentPath)}`);
    };

    const handleProfileClick = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setProfileMenuOpen(false);
        router.push('/');
    };

    return (
        <header className="w-full flex items-center justify-between px-3 lg:px-24 py-4 rtl bg-white shadow-sm sticky top-0 z-50">
            {/* Mobile: Hamburger Menu */}
            <div className="lg:hidden flex items-center">
                <IconButton onClick={() => setDrawerOpen(true)}>
                    <img src="/images/celeard/menu.svg" className='w-[34px] h-[34px]' />
                </IconButton>
            </div>
            {/* Right: Logo and Nav */}
            <div className="hidden lg:flex items-center gap-3 lg:gap-12">
                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-12">
                    {menuItems.map((item) => (
                        <span
                            key={item.key}
                            onClick={() => {
                                setActive(item.key)
                                router.push(item.href)
                            }}
                            className={`text-sm text-[#222] cursor-pointer transition font-${active === item.key ? 'bold' : 'normal'}`}
                            style={{ fontWeight: active === item.key ? 'bold' : 'normal' }}
                        >
                            {item.label}
                        </span>
                    ))}
                </nav>
            </div>
            <img
                src="/celeard-logo.webp"
                alt="Celeard Logo"
                className="w-[52px] h-[36px] object-contain cursor-pointer"
                onClick={() => router.push('/services/clrd')}
            />

            {/* Desktop: Action Button */}
            <div className="hidden lg:flex items-center gap-6">
                <Button
                    variant="contained"
                    className="border border-solid border-[#ED1A31] text-[#ED1A31] rounded-lg py-3 px-6 normal-case text-sm hover:bg-[#fff] hover:text-[#ED1A31] font-medium h-[40px]"
                    onClick={() => router.push('/services/clrd/postal-info')}
                    startIcon={<img src="/images/celeard/cart.svg" className='w-[20px] h-[20px]' />}
                >
                    سبد خرید
                </Button>

                {isLoggedIn ? (
                    <div className="relative" ref={profileMenuRef}>
                        <IconButton
                            onClick={handleProfileClick}
                            className="bg-[#ED1A31] rounded-lg w-[40px] h-[40px] p-0 hover:bg-[#d0172b]"
                        >
                            <img src="/images/celeard/profile.svg" className='w-[20px] h-[20px]' />
                        </IconButton>

                        {profileMenuOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="py-2">
                                    <button
                                        onClick={() => { router.push('/services/clrd/orders'); setProfileMenuOpen(false); }}
                                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        سفارشات
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        خروج از حساب کاربری
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm hover:bg-[#d0172b] font-medium h-[40px]"
                        onClick={handleLoginClick}
                        startIcon={<img src="/images/celeard/profile.svg" className='w-[20px] h-[20px]' />}
                    >
                        ورود/ثبت نام
                    </Button>
                )}
            </div>

            {/* Mobile: Action Button */}
            <div className="flex lg:hidden items-center gap-1">
                <IconButton onClick={() => router.push('/services/clrd/postal-info')} className='border border-solid border-[#ED1A31] rounded-[3px] w-[24px] h-[24px] p-0'>
                    <img src="/images/celeard/cart.svg" className='w-[20px] h-[20px]' />
                </IconButton>
                {isLoggedIn ? (
                    <div className="relative bg-[#ED1A31] rounded-[3px] w-[24px] h-[24px] p-0 flex justify-center items-center" >
                        <img src="/images/celeard/profile.svg" className='w-[20px] h-[20px]' />
                    </div>
                ) : (
                    <IconButton onClick={handleLoginClick} className='bg-[#ED1A31] rounded-[3px] w-[24px] h-[24px] p-0'>
                        <img src="/images/celeard/profile.svg" className='w-[20px] h-[20px]' />
                    </IconButton>
                )}
            </div>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: '95vw', maxWidth: 360, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
                }}
            >
                <div className="flex flex-col h-full justify-between rtl p-6">
                    <div>
                        <div className="flex items-center mb-8">
                            <img
                                src="/celeard-logo.webp"
                                alt="Celeard Logo"
                                className="w-[52px] h-[36px] object-contain cursor-pointer"
                                onClick={() => { router.push('/services/clrd'); setDrawerOpen(false); }}
                            />
                        </div>
                        <nav className="flex flex-col gap-6">
                            {menuItems.map((item) => (
                                <span
                                    key={item.key}
                                    onClick={() => handleMenuClick(item)}
                                    className={`text-base text-[#222] cursor-pointer transition py-2 px-1 rounded ${active === item.key ? 'font-bold bg-gray-100' : 'font-normal'}`}
                                    style={{ fontWeight: active === item.key ? 'bold' : 'normal' }}
                                >
                                    {item.label}
                                </span>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-8">
                        <Button
                            fullWidth
                            variant="contained"
                            className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-[#d0172b] h-[40px]"
                            onClick={() => { router.push('/services/clrd/postal-info'); setDrawerOpen(false); }}
                        >
                            سبد خرید
                        </Button>

                        {isLoggedIn ? (
                            <div className="mt-3 space-y-2">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="border-[#ED1A31] text-[#ED1A31] rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-[#ED1A31] hover:text-white h-[40px]"
                                    onClick={() => { router.push('/services/clrd/orders'); setDrawerOpen(false); }}
                                >
                                    سفارشات
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="border-gray-300 text-gray-700 rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-gray-100 h-[40px]"
                                    onClick={() => { handleLogout(); setDrawerOpen(false); }}
                                >
                                    خروج از حساب کاربری
                                </Button>
                            </div>
                        ) : (
                            <Button
                                fullWidth
                                variant="contained"
                                className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-[#d0172b] h-[40px] mt-3"
                                onClick={() => { handleLoginClick(); setDrawerOpen(false); }}
                            >
                                ورود/ثبت نام
                            </Button>
                        )}
                    </div>
                </div>
            </Drawer>
        </header>
    );
};

export default CeleardHeader;
