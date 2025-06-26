import React, { useState } from 'react';
import Button from '@mui/material/Button';

const menuItems = [
    { label: 'خانه', key: 'home' },
    { label: 'درباره کلرد', key: 'about' },
    { label: 'تماس باما', key: 'contact' },
    { label: 'مقالات', key: 'articles' },
];

const CeleardHeader = () => {
    const [active, setActive] = useState('home');

    return (
        <header className="w-full bg-[#FFFCFA] flex items-center justify-between pt-6 rtl">
            {/* Right: Logo */}
            <div className="flex items-center gap-3 lg:gap-12">
                <img
                    src="/celeard-logo.svg"
                    alt="Celeard Logo"
                    className="w-[52px] h-[36px] object-contain"
                />
                <nav className="flex items-center gap-12">
                    {menuItems.map((item) => (
                        <span
                            key={item.key}
                            onClick={() => setActive(item.key)}
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
                >
                    سبد خرید
                </Button>
                <Button
                    variant="contained"
                    className="bg-[#ED1A31] text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-[#d0172b] h-[40px]"
                >
                    ورود/ثبت نام
                </Button>
            </div>
        </header>
    );
};

export default CeleardHeader;
