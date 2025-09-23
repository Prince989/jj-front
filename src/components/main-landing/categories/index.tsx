import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface CategoryItemProps {
    title: string;
    image: string;
    href: string;
    badge?: string;
}

const categories: CategoryItemProps[] = [
    {
        title: 'دندان پزشکی جی جی',
        image: '/images/main-landing/darman.png',
        href: '/services/dentistry-panel',
        badge: "",
    },
    {
        title: 'سفید کننده دندان کلرد',
        image: "/images/celeard/v2/celeard-product.svg",
        href: '/services/clrd',
        badge: ""
    },
    {
        title: 'کلینیک دندان پزشکی روشا',
        image: '/images/rosha/logo.jpeg',
        href: '/services/rosha',
        badge: ""
    },
    {
        title: 'مد و پوشاک',
        image: '/images/main-landing/hodi.png',
        href: '',
        badge: "به زودی"
    },
    {
        title: 'موبایل و تبلت',
        image: '/images/main-landing/iphone13.png',
        href: '',
        badge: "به زودی"
    },
    {
        title: 'رستوران و کافه',
        image: '/images/main-landing/cofe.png',
        href: '',
        badge: "به زودی"
    },
    {
        title: 'کالای دیجیتال',
        image: '/images/main-landing/tv.png',
        href: '',
        badge: "به زودی"
    },
    {
        title: 'خودرو و موتورسیکلت',
        image: '/images/main-landing/bmv.png',
        href: '',
        badge: "به زودی"
    }
];

const CategoryItem: React.FC<CategoryItemProps> = ({ title, image, href, badge }) => {
    const isDisabled = !href;

    return (
        <Link href={href} className={`no-underline ${isDisabled ? 'pointer-events-none' : ''}`}>
            <div className={`relative w-full lg:w-[270px] h-[270px] bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${!isDisabled ? 'hover:shadow-lg cursor-pointer' : 'opacity-70'}`}>
                {badge && (
                    <div className="absolute top-4 right-4 bg-gray-400 text-white px-3 py-1 rounded-full text-sm z-20">
                        {badge}
                    </div>
                )}
                <div className="w-[190px] h-[190px] mb-4 relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain"
                    />
                </div>
                <Typography
                    variant="h6"
                    component="h3"
                    className="text-black text-lg font-medium text-center"
                >
                    {title}
                </Typography>
            </div>
        </Link>
    );
};

const CategoriesContainer = () => {
    return (
        <section className="py-12 px-4 lg:px-0">
            <div className="flex items-center justify-center lg:justify-between mb-8">
                <Typography
                    variant="h5"
                    component="h2"
                    className="text-primary-blue text-center text-lg lg:text-2xl font-bold"
                >
                    دسته بندی محصولات و خدمات
                </Typography>
                <Link href="/categories" className="hidden lg:flex items-center gap-1 text-[#3D7AFF] text-sm no-underline hover:text-primary-blue/80">
                    بیشتر
                    <ChevronLeftIcon fontSize="small" />
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {categories.map((category, index) => (
                    <CategoryItem key={index} {...category} />
                ))}
            </div>
        </section>
    );
};

export default CategoriesContainer;
