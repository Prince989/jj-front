import { useRouter } from 'next/navigation';
import React from 'react';

const quickLinks = [
    { label: 'درباره ما', href: '#' },
    { label: 'تماس با ما', href: '#' },
    { label: 'خانه', href: '#' },
    { label: 'سبد خرید', href: '/services/clrd/cart' },
];

export default function CeleardFooter() {
    const router = useRouter();

    return (
        <footer className="bg-[#FFE4E1] w-full pt-12 pb-8 px-4 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-0">
                {/* Quick Access Columns */}
                <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-right">
                    {/* Logo */}
                    <div className="mb-4">
                        <img src="/celeard-logo.svg" alt="Celeard Logo" className="h-14 w-auto mx-auto lg:mx-0 cursor-pointer" onClick={() => router.push('/services/clrd')} />
                    </div>
                    {/* Description */}
                    <p className="text-[15px] text-black mb-6 leading-7">
                        ژل سفیدکننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوزهای پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.
                    </p>
                    {/* Social Icons */}
                    <div className="flex flex-row gap-4 justify-center lg:justify-end">
                        {/* Placeholder icons, replace with real ones later */}
                        <a href="#" className="w-4 h-4 flex items-center justify-center">
                            <img src="/images/celeard/insta.svg" alt="Instagram" className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-4 h-4 flex items-center justify-center">
                            <img src="/images/celeard/telegram.svg" alt="Telegram" className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-4 h-4 flex items-center justify-center">
                            <img src="/images/celeard/x.svg" alt="Whatsapp" className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-4 h-4 flex items-center justify-center">
                            <img src="/images/celeard/youtube.svg" alt="Youtube" className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-4 h-4 flex items-center justify-center">
                            <img src="/images/celeard/threads.svg" alt="Threads" className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                {/* Right Section: Logo, Description, Socials */}
                <div className="w-full lg:w-[60%] flex flex-col lg:flex-row lg:justify-end gap-8 lg:gap-16">
                    {[0].map((col) => (
                        <div
                            key={col}
                            className="flex flex-col items-center sm:items-start pt-4 sm:pt-8"
                        >
                            <h3 className="font-bold text-lg mb-4">دسترسی سریع</h3>
                            <ul className="space-y-3 text-center sm:text-right">
                                {quickLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.href} className="hover:underline text-base text-black">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


            </div>
        </footer>
    );
}
