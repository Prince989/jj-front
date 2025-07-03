import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
        <header className="w-full flex items-center justify-between pt-6 rtl">
            {/* Right: Logo and Nav */}
            <div className="flex items-center gap-3 lg:gap-12">
                <img
                    src="/celeard-logo.svg"
                    alt="Celeard Logo"
                    className="w-[52px] h-[36px] object-contain cursor-pointer"
                    onClick={() => router.push('/services/clrd')}
                />
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

            {/* Desktop: Action Button */}
            <div className="hidden lg:flex items-center gap-6">
                <Button
                    variant="contained"
                    className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-[#d0172b] h-[40px]"
                    onClick={() => router.push('/services/clrd/cart')}
                >
                    سبد خرید
                </Button>
            </div>

            {/* Mobile: Hamburger Menu */}
            <div className="lg:hidden flex items-center">
                <IconButton onClick={() => setDrawerOpen(true)}>
                    <MenuIcon fontSize="large" />
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
