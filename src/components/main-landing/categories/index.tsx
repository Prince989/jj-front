import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';

interface CategoryItemProps {
    title: string;
    image: string;
    href: string;
}

const categories: CategoryItemProps[] = [
    {
        title: 'طلا و جواهر',
        image: '/images/categories/jewelry.png',
        href: '/categories/jewelry'
    },
    {
        title: 'لوازم خانگی',
        image: '/images/categories/home-appliances.png',
        href: '/categories/home-appliances'
    },
    {
        title: 'مد و پوشاک',
        image: '/images/categories/fashion.png',
        href: '/categories/fashion'
    },
    {
        title: 'موبایل و تبلت',
        image: '/images/categories/mobile.png',
        href: '/categories/mobile'
    },
    {
        title: 'رستوران و کافه',
        image: '/images/categories/restaurant.png',
        href: '/categories/restaurant'
    },
    {
        title: 'خدمات درمانی',
        image: '/images/categories/medical.png',
        href: '/categories/medical'
    },
    {
        title: 'کالای دیجیتال',
        image: '/images/categories/digital.png',
        href: '/categories/digital'
    },
    {
        title: 'خودرو و موتورسیکلت',
        image: '/images/categories/automotive.png',
        href: '/categories/automotive'
    }
];

const CategoryItem: React.FC<CategoryItemProps> = ({ title, image, href }) => {
    return (
        <Link href={href} className="no-underline">
            <div className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg cursor-pointer">
                <div className="w-32 h-32 mb-4 relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain"
                    />
                </div>
                <Typography
                    variant="h6"
                    component="h3"
                    className="text-[#212121] text-lg font-medium text-center"
                >
                    {title}
                </Typography>
            </div>
        </Link>
    );
};

const CategoriesContainer = () => {
    return (
        <section className="py-12 px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
                <Typography
                    variant="h5"
                    component="h2"
                    className="text-[#212121] text-2xl font-bold"
                >
                    دسته بندی محصولات و خدمات
                </Typography>
                <Link href="/categories" className="text-[#0B389F] text-sm no-underline hover:text-[#0B389F]/80">
                    بیشتر
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <CategoryItem key={index} {...category} />
                ))}
            </div>
        </section>
    );
};

export default CategoriesContainer;
