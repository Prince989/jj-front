import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomTextField from 'src/@core/components/mui/text-field';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import ContactUs from './contactUs';
import { useState } from 'react'
import { useCartQuantity } from 'src/context/CartContext';
import { useProfile } from 'src/hooks/useProfile';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';

interface PostalInfoForm {
    fname: string;
    lname: string;
    nationalCode: string;
    phone: string;
    password: string;
    postalCode: string;
    address: string;
    paymentType: 'installment' | 'online' | 'doorstep';
}

interface InvoiceCalculation {
    productCount: number;
    unitPrice: number;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    installmentAmount?: number;
    fullPaymentAmount?: number;
    installmentDetails?: {
        firstPayment: number;
        remainingPayments: number;
        paymentCount: number;
    };
}

// Local storage keys
const LOCAL_STORAGE_KEYS = {
    POSTAL_CODE: 'postalInfo_postalCode',
    ADDRESS: 'postalInfo_address',
    JJ_SID: 'jj-sid'
};

// Helper functions for local storage
const saveToLocalStorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

const getFromLocalStorage = (key: string): string => {
    try {
        return localStorage.getItem(key) || '';
    } catch (error) {
        console.error('Error reading from localStorage:', error);

        return '';
    }
};

const pricePerItem = 986000;
const oldPricePerItem = 1567000;

const PostalInfo: React.FC = () => {
    const { quantity, paymentType, setPaymentType } = useCartQuantity();
    const { user, refreshAuth } = useAuth();
    const router = useRouter();

    // Check if jj-sid exists in localStorage
    const hasJjSid = typeof window !== 'undefined' && localStorage.getItem(LOCAL_STORAGE_KEYS.JJ_SID);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        watch,
        setValue,
    } = useForm<PostalInfoForm>({
        defaultValues: {
            fname: '',
            lname: '', // Always empty string
            nationalCode: '',
            phone: '',
            password: '',
            postalCode: hasJjSid ? '' : getFromLocalStorage(LOCAL_STORAGE_KEYS.POSTAL_CODE),
            address: hasJjSid ? '' : getFromLocalStorage(LOCAL_STORAGE_KEYS.ADDRESS),
            paymentType: paymentType,
        },
    });

    const watchedPaymentType = watch('paymentType');
    const watchedPostalCode = watch('postalCode');
    const watchedAddress = watch('address');

    // Save postal code and address to local storage when they change (only if not jj-sid mode)
    useEffect(() => {
        if (!hasJjSid && watchedPostalCode) {
            saveToLocalStorage(LOCAL_STORAGE_KEYS.POSTAL_CODE, watchedPostalCode);
        }
    }, [watchedPostalCode, hasJjSid]);

    useEffect(() => {
        if (!hasJjSid && watchedAddress) {
            saveToLocalStorage(LOCAL_STORAGE_KEYS.ADDRESS, watchedAddress);
        }
    }, [watchedAddress, hasJjSid]);

    // Load saved data from local storage on component mount (only if not jj-sid mode)
    useEffect(() => {
        if (!hasJjSid) {
            const savedPostalCode = getFromLocalStorage(LOCAL_STORAGE_KEYS.POSTAL_CODE);
            const savedAddress = getFromLocalStorage(LOCAL_STORAGE_KEYS.ADDRESS);

            if (savedPostalCode) {
                setValue('postalCode', savedPostalCode);
            }
            if (savedAddress) {
                setValue('address', savedAddress);
            }
        }
    }, [setValue, hasJjSid]);

    // Invoice calculation method
    const calculateInvoice = (): InvoiceCalculation => {
        const productCount = quantity;
        const unitPrice = 986000; // قیمت واحد محصول
        const taxRate = 0.1; // 10% مالیات بر ارزش افزوده
        const shippingCost = 60000; // هزینه ارسال

        if (watchedPaymentType === 'online') {
            // پرداخت آنلاین - ارسال رایگان: (تعداد محصول × قیمت × 1.1)
            const subtotal = productCount * unitPrice;
            const tax = subtotal * taxRate;
            const total = subtotal + tax; // No shipping for online

            return {
                productCount,
                unitPrice,
                subtotal,
                tax,
                shipping: 0, // No shipping for online
                total,
            };
        } else if (watchedPaymentType === 'doorstep') {
            // پرداخت درب منزل - مشابه آنلاین + هزینه ارسال
            const subtotal = productCount * unitPrice;
            const tax = subtotal * taxRate;
            const total = subtotal + tax + shippingCost; // Add tracking cost for doorstep payment

            return {
                productCount,
                unitPrice,
                subtotal,
                tax,
                shipping: 0, // No shipping for doorstep
                total,
            };
        } else {
            // پرداخت اقساطی
            const firstInstallmentBase = (unitPrice * 0.25) + ((productCount - 1) * unitPrice);
            const firstInstallmentWithTax = firstInstallmentBase * (1 + taxRate);
            const totalPayment = firstInstallmentWithTax + shippingCost;
            const remainingInstallment = unitPrice * 0.75;

            return {
                productCount,
                unitPrice,
                subtotal: productCount * unitPrice,
                tax: firstInstallmentBase * taxRate,
                shipping: shippingCost,
                total: totalPayment,
                installmentAmount: firstInstallmentBase,
                fullPaymentAmount: remainingInstallment,
                installmentDetails: {
                    firstPayment: firstInstallmentBase,
                    remainingPayments: remainingInstallment,
                    paymentCount: 4,
                },
            };
        }
    };

    const invoice = calculateInvoice();

    // Format currency helper
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('fa-IR').format(amount);
    };

    const { profileData } = useProfile();

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    // Handle authentication navigation
    const handleAuthNavigation = (formData: PostalInfoForm) => {
        const formDataString = encodeURIComponent(JSON.stringify(formData));
        router.push(`/verify-otp?returnUrl=${encodeURIComponent('/services/clrd/invoice')}&formData=${formDataString}`);
    };

    // Navigate to invoice page
    const navigateToInvoice = (formData: PostalInfoForm) => {
        const formDataString = encodeURIComponent(JSON.stringify(formData));
        router.push(`/services/clrd/invoice?formData=${formDataString}`);
    };

    // On form submit, check authentication and proceed accordingly
    const onSubmit = async (data: PostalInfoForm) => {
        console.log('onSubmit called, user:', user);
        console.log('Form data:', data);

        // Check if user is authenticated
        if (!user) {
            console.log('User not authenticated, navigating to verify-otp');

            // If not authenticated, navigate to verify-otp page with form data
            handleAuthNavigation(data);

            return;
        }

        console.log('User is authenticated, navigating to invoice page');

        // If authenticated, navigate to invoice page
        navigateToInvoice(data);
    }

    useEffect(() => {
        if (profileData) {
            reset(prev => ({
                ...prev,
                fname: profileData.fName || '',
                lname: '', // Always empty string
                nationalCode: profileData.nationalCode || '',
                phone: profileData.phoneNumber || '',
            }));
        }
    }, [profileData, reset]);

    // Handle pre-filled form data from URL parameters
    useEffect(() => {
        const { formData } = router.query;
        if (formData && typeof formData === 'string') {
            try {
                const parsedFormData = JSON.parse(decodeURIComponent(formData));
                reset(prev => ({
                    ...prev,
                    ...parsedFormData,
                    lname: '', // Always empty string
                }));

                // Show success message when returning from OTP verification
                setShowSuccessMessage(true);

                // Hide success message after 5 seconds
                setTimeout(() => setShowSuccessMessage(false), 5000);

                // Refresh auth state when returning from OTP verification
                setTimeout(async () => {
                    await refreshAuth();
                }, 100);
            } catch (error) {
                console.error('Error parsing form data from URL:', error);
            }
        }
    }, [router.query, reset, refreshAuth]);

    // Check if user is returning from OTP verification
    const isReturningFromOTP = !!router.query.formData;

    // Check if profileData has data to determine which fields should be disabled
    const hasProfileData = profileData && (
        profileData.fName ||
        profileData.lName ||
        profileData.nationalCode ||
        profileData.phoneNumber
    );

    // Fields should be disabled if returning from OTP or if profile data exists
    const shouldDisableFields = Boolean(isReturningFromOTP || hasProfileData);

    // Helper to format numbers in Persian
    const toPersianNumber = (num: number) => num.toLocaleString('fa-IR');

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen py-10 px-2 bg-[#F9FBFD]">
            <div className="w-full max-w-[1440px] bg-[#EAF6FF] rounded-2xl shadow-md px-2 py-4 lg:px-6 lg:py-10 flex flex-col gap-8 mb-16">
                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-center">
                        <strong>تبریک!</strong> ثبت نام شما با موفقیت انجام شد. لطفا اطلاعات باقی مانده را تکمیل کنید.
                    </div>
                )}

                <div className="w-full flex flex-col lg:flex-row gap-6 items-center">
                    {/* Product Image */}
                    <div className="w-full lg:w-[40%] flex items-center justify-center bg-white rounded-2xl">
                        <img
                            src="/images/celeard/v2/celeard-product.svg"
                            alt="سفید کننده دندان کلرد"
                            className="w-full max-w-xs h-[340px] object-contain"
                            style={{ pointerEvents: 'none' }}
                        />
                    </div>
                    {/* Product Info */}
                    <div>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="text-xl lg:text-2xl font-extrabold mb-2 text-[#222]">سفید کننده دندان <span className="text-[#FF3B57]">کلرد</span></div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-lg lg:text-xl text-[#B0B0B0] line-through">{toPersianNumber(oldPricePerItem)} ت</span>
                                <span className="text-lg lg:text-2xl text-[#222] font-bold">{toPersianNumber(pricePerItem)} ت</span>
                            </div>
                        </div>
                        <div className="text-sm text-[#555] leading-7 mb-4 mt-2 lg:mt-5 text-center lg:text-right">
                            <span className='text-lg lg:text-xl text-[#222] mb-4'>سفیدکننده و ترمیم کننده</span>
                        </div>
                    </div>

                </div>
                <div className="w-full flex flex-col gap-4 my-6">
                    <div className="text-xl lg:text-2xl font-bold text-[#222] text-center lg:text-right">کاربر گرامی، لطفا فرم زیر را تکمیل نمایید.</div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
                    {/* Top Row */}
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <label className="text-right font-semibold">
                                نام و نام خانوادگی:
                                {shouldDisableFields && <span className="text-xs text-green-600 mr-1">(تکمیل شده)</span>}
                            </label>
                            <Controller
                                name="fname"
                                control={control}
                                rules={{ required: 'نام و نام خانوادگی الزامی است' }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        fullWidth
                                        placeholder="نام و نام خانوادگی"
                                        error={!!errors.fname}
                                        helperText={errors.fname?.message}
                                        disabled={shouldDisableFields}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <label className="text-right font-semibold">
                                کد ملی:
                                {shouldDisableFields && <span className="text-xs text-green-600 mr-1">(تکمیل شده)</span>}
                            </label>
                            <Controller
                                name="nationalCode"
                                control={control}
                                rules={{ required: 'کد ملی الزامی است' }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        fullWidth
                                        placeholder="کدملی"
                                        error={!!errors.nationalCode}
                                        helperText={errors.nationalCode?.message}
                                        disabled={shouldDisableFields}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Second Row - Only show if not jj-sid mode */}
                    {!hasJjSid && (
                        <>
                            <div className="w-full flex flex-col lg:flex-row gap-6">
                                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                                    <label className="text-right font-semibold">
                                        پسورد:
                                        {user && <span className="text-xs text-green-600 mr-1">(تکمیل شده)</span>}
                                        {shouldDisableFields && !user && <span className="text-xs text-green-600 mr-1">(تکمیل شده)</span>}
                                    </label>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: user ? false : 'پسورد الزامی است',
                                            validate: (value) => {

                                                // If user is authenticated, password is optional
                                                if (user) return true;

                                                // If user is not authenticated, password is required
                                                return value && value.length > 0 ? true : 'پسورد الزامی است';
                                            }
                                        }}
                                        render={({ field }) => (
                                            <CustomTextField
                                                {...field}
                                                fullWidth
                                                placeholder={user ? "اختیاری (احراز هویت انجام شده)" : "********"}
                                                error={!!errors.password}
                                                helperText={errors.password?.message}
                                                disabled={shouldDisableFields}
                                                type="password"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                                    <label className="text-right font-semibold">
                                        شماره تماس:
                                        {shouldDisableFields && <span className="text-xs text-green-600 mr-1">(تکمیل شده)</span>}
                                    </label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{ required: 'شماره تماس الزامی است' }}
                                        render={({ field }) => (
                                            <CustomTextField
                                                {...field}
                                                fullWidth
                                                placeholder="شماره تماس"
                                                error={!!errors.phone}
                                                helperText={errors.phone?.message}
                                                disabled={shouldDisableFields}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                                    <label className="text-right font-semibold">کد پستی:</label>
                                    <Controller
                                        name="postalCode"
                                        control={control}
                                        rules={{ required: 'کد پستی الزامی است' }}
                                        render={({ field }) => (
                                            <CustomTextField
                                                {...field}
                                                fullWidth
                                                placeholder="کدپستی"
                                                error={!!errors.postalCode}
                                                helperText={errors.postalCode?.message}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Address Row */}
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-right font-semibold">آدرس:</label>
                                <Controller
                                    name="address"
                                    control={control}
                                    rules={{ required: 'آدرس الزامی است' }}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            fullWidth
                                            multiline
                                            minRows={2}
                                            placeholder="آدرس"
                                            error={!!errors.address}
                                            helperText={errors.address?.message}
                                        />
                                    )}
                                />
                            </div>
                        </>
                    )}

                    {/* Show phone field separately if jj-sid mode */}
                    {hasJjSid && (
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-right font-semibold">
                                شماره تماس:
                                {shouldDisableFields && <span className="text-xs text-green-600 mr-1">(تکمیل شده)</span>}
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'شماره تماس الزامی است' }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        fullWidth
                                        placeholder="شماره تماس"
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                        disabled={shouldDisableFields}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {/* Third Row */}
                    <div className="w-full flex flex-col lg:flex-row gap-4">
                        {/* Payment Method */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-4">
                            <div className="text-lg font-bold text-right">نحوه پرداخت</div>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex flex-col items-start gap-2">
                                    <label className="flex items-center cursor-pointer gap-2">
                                        <Controller
                                            name="paymentType"
                                            control={control}
                                            render={({ field }) => (
                                                <Radio
                                                    checked={paymentType === 'installment'}
                                                    onChange={() => {
                                                        field.onChange('installment');
                                                        setPaymentType('installment');
                                                    }}
                                                    value="installment"
                                                    color="primary"
                                                />
                                            )}
                                        />
                                        <span className="text-sm">پرداخت اقساطی با اعتبار <span className="text-[#002B8A] font-bold">Jey <span className="text-[#FF6A00]">Jey</span> Line</span></span>
                                    </label>
                                    <div className="bg-[#F9FBFD] rounded-lg p-3 text-xs text-[#222] mt-1">
                                        ۴ قسط <span className="text-[#008EFF] font-bold">۲۴۶/۵۰۰</span> تومانی (بازپرداخت اولین قسط ۳۱ تیرماه)
                                    </div>
                                    <label className="flex items-center cursor-pointer gap-2">
                                        <Controller
                                            name="paymentType"
                                            control={control}
                                            render={({ field }) => (
                                                <Radio
                                                    checked={paymentType === 'online'}
                                                    onChange={() => {
                                                        field.onChange('online');
                                                        setPaymentType('online');
                                                    }}
                                                    value="online"
                                                    color="primary"
                                                />
                                            )}
                                        />
                                        <span className="text-sm">پرداخت آنلاین - ارسال رایگان</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer gap-2">
                                        <Controller
                                            name="paymentType"
                                            control={control}
                                            render={({ field }) => (
                                                <Radio
                                                    checked={paymentType === 'doorstep'}
                                                    onChange={() => {
                                                        field.onChange('doorstep');
                                                        setPaymentType('doorstep');
                                                    }}
                                                    value="doorstep"
                                                    color="primary"
                                                />
                                            )}
                                        />
                                        <span className="text-sm">پرداخت درب منزل</span>
                                    </label>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="flex flex-row justify-start">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="bg-[#ED1A31] text-white rounded-lg py-3 px-10 normal-case text-sm font-medium hover:bg-[#d0172b]"
                                    style={{ fontFamily: 'YekanBakh', minWidth: 120 }}
                                >
                                    {user ? 'مشاهده فاکتور' : 'احراز هویت'}
                                </Button>
                            </div>
                        </div>

                        {/* Invoice */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-4">
                            <div className="text-lg font-bold text-right">صورتحساب</div>

                            {/* Installment Info Banner */}
                            {watchedPaymentType === 'installment' && quantity > 1 && (
                                <div className="bg-[#FFF3CD] border border-[#FFEAA7] rounded-lg p-4 mb-4">
                                    <div className="text-sm text-[#856404] text-right">
                                        <strong>توجه:</strong> در صورت انتخاب چندین محصول، فقط یکی از محصولات به صورت اقساطی قابل پرداخت است و مابقی باید به صورت کامل پرداخت شوند.
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                {/* Product Details */}
                                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                    <span className="text-sm text-gray-600">تعداد محصول:</span>
                                    <span className="font-semibold">{invoice.productCount} عدد</span>
                                </div>

                                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                    <span className="text-sm text-gray-600">قیمت واحد:</span>
                                    <span className="font-semibold">{formatCurrency(invoice.unitPrice)} تومان</span>
                                </div>

                                {(watchedPaymentType === 'online' || watchedPaymentType === 'doorstep') && (
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                        <span className="text-sm text-gray-600">جمع کل:</span>
                                        <span className="font-semibold">{formatCurrency(invoice.subtotal)} تومان</span>
                                    </div>
                                )}

                                {/* Payment Type Specific Details */}
                                {watchedPaymentType === 'installment' ? (
                                    <>
                                        {invoice.installmentAmount && (
                                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                                <span className="text-sm text-gray-600">مبلغ قسط اول:</span>
                                                <span className="font-semibold text-[#008EFF]">{formatCurrency(invoice.installmentAmount)} تومان</span>
                                            </div>
                                        )}
                                        {invoice.fullPaymentAmount && (
                                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                                <span className="text-sm text-gray-600">مبلغ باقی مانده اقساط: <div className='text-xs text-gray-600 mt-1'>در ۳ قسط {formatCurrency(invoice.unitPrice * 0.25)} تومانی</div></span>
                                                <span className="font-semibold text-[#ED1A31]">{formatCurrency(invoice.fullPaymentAmount)} تومان</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">مالیات بر ارزش افزوده (۱۰٪):</span>
                                            <span className="font-semibold">{formatCurrency(invoice.tax)} تومان</span>
                                        </div>
                                        {/* Only show shipping for installment */}
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">هزینه ارسال:</span>
                                            <span className="font-semibold">{formatCurrency(invoice.shipping)} تومان</span>
                                        </div>
                                    </>
                                ) : watchedPaymentType === 'doorstep' ? (
                                    <>
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">پرداخت درب منزل:</span>
                                            <span className="font-semibold text-[#ED1A31]">{formatCurrency(invoice.subtotal + invoice.tax)} تومان</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">مالیات بر ارزش افزوده (۱۰٪):</span>
                                            <span className="font-semibold">{formatCurrency(invoice.tax)} تومان</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">هزینه ارسال:</span>
                                            <span className="font-semibold">{formatCurrency(60000)} تومان</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">پرداخت آنلاین:</span>
                                            <span className="font-semibold text-[#ED1A31]">{formatCurrency(invoice.total)} تومان</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">مالیات بر ارزش افزوده (۱۰٪):</span>
                                            <span className="font-semibold">{formatCurrency(invoice.tax)} تومان</span>
                                        </div>
                                        {/* Do not show shipping for online */}
                                    </>
                                )}

                                {/* Total */}
                                <div className="flex justify-between items-center pt-3">
                                    <span className="text-lg font-bold text-gray-800">مبلغ قابل پرداخت:</span>
                                    <span className="text-xl font-bold text-[#ED1A31]">{formatCurrency(invoice.total)} تومان</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            {/* Support/Contact Section */}
            <ContactUs />
        </div>
    );
};

export default PostalInfo; 