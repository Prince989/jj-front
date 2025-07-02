import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const menuItems = [
    { label: 'خانه', key: 'home', href: '/services/clrd' },
    { label: 'درباره کلرد', key: 'about', href: '/services/clrd' },
    { label: 'تماس باما', key: 'contact', href: '/services/clrd' },
    { label: 'مقالات', key: 'articles', href: '/services/clrd' },
];

const CeleardHeader = () => {
    const [active, setActive] = useState('home');
    const router = useRouter();

    return (
        <header className="w-full flex items-center justify-between pt-6 rtl">
            {/* Right: Logo */}
            <div className="flex items-center gap-3 lg:gap-12">
                <img
                    src="/celeard-logo.svg"
                    alt="Celeard Logo"
                    className="w-[52px] h-[36px] object-contain cursor-pointer"
                    onClick={() => router.push('/services/clrd')}
                />
                <nav className="flex items-center gap-12">
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


            {/* Left: Buttons */}
            <div className="flex items-center gap-6">
                <Button
                    variant="contained"
                    className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-[#d0172b] h-[40px]"
                    onClick={() => router.push('/services/clrd/cart')}
                >
                    سبد خرید
                </Button>
                {/* <Button
                    variant="contained"
                    className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-[#d0172b] h-[40px]"
                >
                    ورود/ثبت نام
                </Button> */}
            </div>
        </header>
    );
};

export default CeleardHeader;
