import React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import ContactUs from './contactUs';
import { useCartQuantity } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

const pricePerItem = 986000;
const oldPricePerItem = 1567000;

const Cart: React.FC = () => {
    const { quantity, setQuantity, paymentType, setPaymentType } = useCartQuantity();
    const router = useRouter();
    const handleQuantityChange = (delta: number) => {
        setQuantity(q => Math.max(1, q + delta));
    };

    // Helper to format numbers in Persian
    const toPersianNumber = (num: number) => num.toLocaleString('fa-IR');

    return (
        <div
            className="w-full flex flex-col items-center justify-center min-h-screen px-2"
        >
            {/* Main Card */}
            <div className="w-full bg-[#EDF7FF] rounded-2xl shadow-md px-6 py-10 flex flex-col lg:flex-row gap-8 mb-16">
                {/* Product Details & Controls */}
                <div className="w-full lg:w-[60%] flex flex-col gap-6 justify-between order-2 lg:order-1">
                    {/* Product Info */}
                    <div>
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                            <div className="text-2xl font-extrabold mb-2 text-[#222]">سفید کننده دندان کلرد</div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-xl text-[#B0B0B0] line-through">{toPersianNumber(oldPricePerItem)} ت</span>
                                <span className="text-2xl text-[#222] font-bold">{toPersianNumber(pricePerItem)} ت</span>
                            </div>
                        </div>
                        <div className="text-sm text-[#555] leading-7 mb-4 mt-8 text-center lg:text-right">
                            <span className='text-xl text-[#222] mb-4'>سفیدکننده و ترمیم کننده</span>
                            <p className='text-sm text-[#222] mt-4'>
                                ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است. ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.
                            </p>
                        </div>
                    </div>
                    {/* Quantity & Price */}
                    <div className="flex flex-col sm:flex-row gap-6 items-center bg-[#EDF7FF] rounded-lg w-full">
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-xs text-[#222] font-semibold">تعداد:</span>
                            <button
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md border border-[#EDEDED] text-lg font-bold"
                                onClick={() => handleQuantityChange(-1)}
                                aria-label="کاهش تعداد"
                                style={{ minWidth: 32 }}
                            >
                                -
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center bg-[#ED1A31] text-white rounded-md text-lg font-bold">
                                {toPersianNumber(quantity)}
                            </span>
                            <button
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md border border-[#EDEDED] text-lg font-bold"
                                onClick={() => handleQuantityChange(1)}
                                aria-label="افزایش تعداد"
                                style={{ minWidth: 32 }}
                            >
                                +
                            </button>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-xs text-[#222] font-semibold">قیمت:</span>
                            <span className="text-xs text-[#008EFF] font-bold">{toPersianNumber(pricePerItem * quantity)} ت</span>
                        </div>
                    </div>
                    {/* Payment Method */}
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="text-lg font-bold text-right">نحوه پرداخت</div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex flex-col items-start gap-2">
                                <label className="flex items-center cursor-pointer gap-2">
                                    <Radio
                                        checked={paymentType === 'installment'}
                                        onChange={() => setPaymentType('installment')}
                                        value="installment"
                                        color="primary"
                                    />
                                    <span className="text-sm">پرداخت اقساطی با اعتبار <span className="text-[#002B8A] font-bold">Jey <span className="text-[#FF6A00]">Jey</span> Line</span></span>
                                </label>
                                {/* {paymentType === 'installment' && ( */}
                                <div className="bg-white rounded-lg p-3 text-xs text-[#222] mt-1">
                                    ۴ قسط <span className="text-[#008EFF] font-bold">۴۵۶,۰۰۰</span> تومانی (بازپرداخت اولین قسط ۳۱ تیرماه)
                                </div>
                                {/*  )} */}
                                <label className="flex items-center cursor-pointer gap-2">
                                    <Radio
                                        checked={paymentType === 'online'}
                                        onChange={() => setPaymentType('online')}
                                        value="online"
                                        color="primary"
                                    />
                                    <span className="text-sm">پرداخت آنلاین - ارسال رایگان</span>
                                </label>
                                <label className="flex items-center cursor-pointer gap-2">
                                    <Radio
                                        checked={paymentType === 'doorstep'}
                                        onChange={() => setPaymentType('doorstep')}
                                        value="doorstep"
                                        color="primary"
                                    />
                                    <span className="text-sm">پرداخت درب منزل</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-start'>
                        <Button
                            variant="contained"
                            className="bg-[#ED1A31] text-white rounded-lg py-3 px-10 normal-case text-sm font-medium hover:bg-[#d0172b]"
                            style={{ fontFamily: 'YekanBakh', minWidth: 120 }}
                            onClick={() => router.push('/services/clrd/postal-info')}
                        >
                            ثبت سفارش
                        </Button>
                    </div>
                </div>
                {/* Product Image */}
                <div className="w-full lg:w-[40%] flex items-center justify-center bg-white rounded-2xl order-1 lg:order-2">
                    <img
                        src="/images/celeard/v2/celeard-product.svg"
                        alt="سفید کننده دندان کلرد"
                        className="w-full max-w-xs h-[340px] object-contain"
                        style={{ pointerEvents: 'none' }}
                    />
                </div>
            </div>

            {/* Support/Contact Section */}
            <ContactUs />
        </div>
    );
};

export default Cart;
