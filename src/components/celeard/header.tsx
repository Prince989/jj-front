import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

const menuItems = [
    { label: 'خانه', key: 'home', href: '/services/clrd' },
    { label: 'درباره کلرد', key: 'about', href: '/services/clrd' },
    { label: 'تماس باما', key: 'contact', href: '/services/clrd' },
    { label: 'مقالات', key: 'articles', href: '/services/clrd' },
];

const CeleardHeader = () => {
    const [active, setActive] = useState('home');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();

    const handleMenuClick = (item: typeof menuItems[0]) => {
        setActive(item.key);
        router.push(item.href);
        setDrawerOpen(false);
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
            <div className="flex items-center gap-3 lg:gap-12">
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
                src="/celeard-logo.svg"
                alt="Celeard Logo"
                className="w-[52px] h-[36px] object-contain cursor-pointer"
                onClick={() => router.push('/services/clrd')}
            />

            {/* Desktop: Action Button */}
            <div className="hidden lg:flex items-center gap-6">
                <Button
                    variant="contained"
                    className="border border-solid border-[#ED1A31] text-[#ED1A31] rounded-lg py-3 px-6 normal-case text-sm hover:bg-[#fff] hover:text-[#ED1A31] font-medium h-[40px]"
                    onClick={() => router.push('/services/clrd/cart')}
                    startIcon={<img src="/images/celeard/cart.svg" className='w-[20px] h-[20px]' />}
                >
                    سبد خرید
                </Button>
                <Button
                    variant="contained"
                    className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm hover:bg-[#d0172b] font-medium h-[40px]"
                    onClick={() => router.push('/services/clrd/cart')}
                    startIcon={<img src="/images/celeard/profile.svg" className='w-[20px] h-[20px]' />}
                >
                    ورود/ثبت نام
                </Button>
            </div>

            {/* Mobile: Action Button */}
            <div className="flex lg:hidden items-center gap-1">
                <IconButton onClick={() => router.push('/services/clrd/cart')} className='border border-solid border-[#ED1A31] rounded-[3px] w-[24px] h-[24px] p-0'>
                    <img src="/images/celeard/cart.svg" className='w-[20px] h-[20px]' />
                </IconButton>
                <IconButton onClick={() => router.push('/services/clrd/cart')} className='bg-[#ED1A31] rounded-[3px] w-[24px] h-[24px] p-0'>
                    <img src="/images/celeard/profile.svg" className='w-[20px] h-[20px]' />
                </IconButton>

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
                                src="/celeard-logo.svg"
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
                            onClick={() => { router.push('/services/clrd/cart'); setDrawerOpen(false); }}
                        >
                            سبد خرید
                        </Button>
                    </div>
                </div>
            </Drawer>
        </header>
    );
};

export default CeleardHeader;
