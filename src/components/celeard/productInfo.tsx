import Link from 'next/link';
import React from 'react';

interface ProductInfoProps {
    title: string;
    subTitle: string;
    price?: string | number;
    oldPrice?: string | number;
    linkColor?: 'red' | 'blue';
    addToCart?: boolean;
    size?: 'small' | 'large' | 'very-small';
    className?: string;
    href?: string;
    handleClick?: () => void
}

const CartIcon = ({ color = '#fff', size = 28 }: { color?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8, verticalAlign: 'middle' }}>
        <g>
            <circle cx="22.5" cy="22.5" r="1.5" fill={color} />
            <circle cx="10.5" cy="22.5" r="1.5" fill={color} />
            <path d="M3 5h2.5l2.7 12.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6l1.6-7.6H7.1" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
        </g>
    </svg>
);

const ProductInfo: React.FC<ProductInfoProps> = ({
    title,
    subTitle,
    price,
    oldPrice,
    linkColor,
    addToCart,
    size = 'small',
    className = '',
    href = "/services/clrd/cart",
    handleClick
}) => {
    // Color and background based on link prop
    const color = linkColor === 'red' ? 'text-[#ED1A31]' : 'text-[#1B94FF]';
    const borderRadius = size === 'large' ? 'rounded-[8px]' : size === 'very-small' ? 'rounded-[2.5px]' : 'rounded-[5px]';
    const padding = size === 'large' ? 'py-6 px-8' : size === 'very-small' ? 'py-[9px] px-5' : 'py-[18px] px-5';
    const titleSize = size === 'large' ? 'text-[28px]' : size === 'very-small' ? 'text-[10]' : 'text-[20px]';
    const subTitleSize = size === 'large' ? 'text-[18px]' : size === 'very-small' ? 'text-[9px]' : 'text-[16px]';
    const priceSize = size === 'large' ? 'text-[28px]' : size === 'very-small' ? 'text-[13px]' : 'text-[20px]';
    const oldPriceSize = size === 'large' ? 'text-[20px]' : size === 'very-small' ? 'text-[8px]' : 'text-[16px]';
    const linkSize = size === 'large' ? 'text-[24px]' : size === 'very-small' ? 'text-[12px]' : 'text-[18px]';
    const buttonSize = size === 'large' ? 'text-[16px]' : size === 'very-small' ? 'text-[6px]' : 'text-[12px]';
    const buttonPadding = size === 'large' ? 'py-2 px-4' : size === 'very-small' ? 'py-1 px-1.5' : 'py-2 px-3';

    return (
        <div
            className={`flex flex-col items-center box-border ${padding} ${className}`}
        >
            <div className={`font-bold ${titleSize} text-[#232323] mb-1`}>
                {title}
            </div>
            <div className={`font-normal ${subTitleSize} text-[#444] mb-4`}>
                {subTitle}
            </div>
            <div className={`flex items-center`}>
                {oldPrice && (
                    <span
                        className={`font-medium ${oldPriceSize} text-[#AAAAAA] line-through ml-3`}
                    >
                        {oldPrice} ت
                    </span>
                )}
                {price && <span
                    className={`font-bold ${priceSize} text-[#232323] tracking-wider`}
                >
                    {price} ت
                </span>}

            </div>
            {addToCart ? (
                <button
                    className={`bg-[#ED1A31] text-white font-medium ${buttonSize} border-none ${borderRadius} ${buttonPadding} cursor-pointer flex items-center mt-4`}
                    onClick={handleClick}
                >
                    <span className="mr-2">
                        <CartIcon color="#fff" size={size === 'large' ? 18 : 15} />
                    </span>
                    افزودن به سبد خرید
                </button>
            ) : linkColor ? (
                <Link
                    href={href}
                    className={`${color} ${linkSize} underline cursor-pointer`}
                >
                    خرید محصول
                </Link>
            ) : null}
        </div>
    );
};

export default ProductInfo;
