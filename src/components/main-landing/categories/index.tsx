import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface CategoryItemProps {
    title: string;
    image: string;
    href: string;
}

const categories: CategoryItemProps[] = [
    {
        title: 'طلا و جواهر',
        image: '/images/main-landing/tala.png',
        href: '/categories/jewelry'
    },
    {
        title: 'لوازم خانگی',
        image: '/images/main-landing/zarf.png',
        href: '/categories/home-appliances'
    },
    {
        title: 'مد و پوشاک',
        image: '/images/main-landing/hodi.png',
        href: '/categories/fashion'
    },
    {
        title: 'موبایل و تبلت',
        image: '/images/main-landing/iphone13.png',
        href: '/categories/mobile'
    },
    {
        title: 'رستوران و کافه',
        image: '/images/main-landing/cofe.png',
        href: '/categories/restaurant'
    },
    {
        title: 'خدمات درمانی',
        image: '/images/main-landing/darman.png',
        href: '/categories/medical'
    },
    {
        title: 'کالای دیجیتال',
        image: '/images/main-landing/tv.png',
        href: '/categories/digital'
    },
    {
        title: 'خودرو و موتورسیکلت',
        image: '/images/main-landing/bmv.png',
        href: '/categories/automotive'
    }
];

const CategoryItem: React.FC<CategoryItemProps> = ({ title, image, href }) => {
    return (
        <Link href={href} className="no-underline">
            <div className="w-full lg:w-[270px] h-[270px] bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg cursor-pointer">
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
