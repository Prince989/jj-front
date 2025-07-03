import React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import { useCartQuantity } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

const pricePerItem = 998000;

const AddToCart: React.FC = () => {
    const { quantity, setQuantity, paymentType, setPaymentType } = useCartQuantity();
    const router = useRouter();

    const handleQuantityChange = (delta: number) => {
        setQuantity(q => Math.max(1, q + delta));
    };

    return (
        <div
            className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col gap-8 rtl"
            style={{ fontFamily: 'YekanBakh', direction: 'rtl' }}
        >
            {/* Title */}
            <div className="text-xl font-bold text-right mb-2">سفید کننده دندان کلرد</div>
            {/* Description */}
            <div className='flex flex-col lg:flex-row gap-4 border-b pb-4'>
                <div className="w-full lg:w-[75%] text-sm text-[#222] text-right leading-8 mb-4">
                    ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است. ژل سفید‌کننده دندان عملکردی مشابه بلیچینگ مطب‌های دندانپزشکی دارد، اما به دلیل استفاده از دوز‌های پایین‌تر و اعمال آن به مرور زمان، نتایج به صورت تدریجی در طول یک تا دو هفته قابل مشاهده است.            </div>
                {/* Quantity and Price */}
                <div className="w-full lg:w-[25%] flex flex-col justify-start gap-8 bg-[#EDF7FF] rounded-lg p-4 self-start">
                    <div className="flex flex-row items-center justify-between gap-2">
                        <div className="flex flex-col gap-1 mr-8">
                            <div className="text-xs text-[#222] font-semibold">تعداد:</div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <button
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md border border-[#EDEDED] text-lg font-bold"
                                onClick={() => handleQuantityChange(-1)}
                                aria-label="کاهش تعداد"
                                style={{ minWidth: 32 }}
                            >
                                -
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center bg-[#ED1A31] text-white rounded-md text-lg font-bold">
                                {quantity}
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
                    </div>
                    <div className="flex flex-row items-center justify-between gap-1 mr-8">
                        <div className="text-xs text-[#222] font-semibold">قیمت:</div>
                        <div className="text-xs text-[#008EFF] font-bold">{(pricePerItem * quantity).toLocaleString('fa-IR')} ت</div>

                    </div>
                </div>
            </div>
            {/* Payment Method */}
            <div className="flex flex-col gap-4 mt-4">
                <div className="text-lg font-bold text-right">نحوه پرداخت</div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
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
                        <div className="bg-[#F9FBFD] rounded-lg p-3 text-xs text-[#222] mt-1">
                            ۴ قسط <span className="text-[#008EFF] font-bold">۴۵۶/۰۰۰</span> تومانی (بازپرداخت اولین قسط ۳۱ تیرماه)
                        </div>
                        <label className="flex items-center cursor-pointer gap-2">
                            <Radio
                                checked={paymentType === 'online'}
                                onChange={() => setPaymentType('online')}
                                value="online"
                                color="primary"
                            />
                            <span className="text-sm">پرداخت آنلاین</span>
                        </label>
                    </div>
                    <Button
                        variant="contained"
                        className="bg-[#ED1A31] text-white rounded-lg py-3 px-10 normal-case text-sm font-medium hover:bg-[#d0172b]"
                        style={{ fontFamily: 'YekanBakh', minWidth: 120 }}
                        onClick={() => router.push('/services/clrd/postal-info')}
                    >
                        پرداخت
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default AddToCart;
