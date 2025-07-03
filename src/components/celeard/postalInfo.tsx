import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomTextField from 'src/@core/components/mui/text-field';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import ContactUs from './contactUs';
import OTPDialog from 'src/components/validation/validation/steps/OTPDialog'
import { useCart } from 'src/hooks/useCart'
import { useOrder } from 'src/hooks/useOrder'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRequestOtp } from 'src/hooks/useRequestOtp'
import { useRegister } from 'src/hooks/useRegister'
import { useLogin } from 'src/hooks/useLogin'
import { useRouter } from 'next/navigation';
import { useCartQuantity } from 'src/context/CartContext';
import authConfig from 'src/configs/auth'

interface PostalInfoForm {
    fname: string;
    lname: string;
    nationalCode: string;
    phone: string;
    password: string;
    postalCode: string;
    address: string;
    paymentType: 'installment' | 'online';
}

const PostalInfo: React.FC = () => {
    const { quantity, paymentType, setPaymentType } = useCartQuantity();
    const router = useRouter()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PostalInfoForm>({
        defaultValues: {
            fname: '',
            lname: '',
            nationalCode: '',
            phone: '',
            password: '',
            postalCode: '',
            address: '',
            paymentType: paymentType,
        },
    });

    // const { profileData } = useProfile();

    const [showOtpDialog, setShowOtpDialog] = useState(false)
    const [pendingFormData, setPendingFormData] = useState<PostalInfoForm | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    // Add hooks for new flow
    const { requestOtpCode, isRequesting } = useRequestOtp()
    const { handleRegister, isRegistering } = useRegister()
    const { handleLogin, isLoggingIn } = useLogin()
    const { handleAddToCart } = useCart({})
    const { handleCreateOrder } = useOrder({})

    // On form submit, request OTP and store form data
    const onSubmit = async (data: PostalInfoForm) => {
        // Check for token in localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem(authConfig.storageTokenKeyName) : null;
        if (token) {
            setIsProcessing(true);
            try {
                // Only add to cart and create order
                await handleAddToCart({
                    products: [{ productId: 1, count: quantity }]
                });
                const orderDetail = await handleCreateOrder({
                    transportationId: 1,
                    hasInstallment: data.paymentType === 'installment',
                    address: data.address,
                    postalCode: data.postalCode
                });
                const { data: { url, message } } = orderDetail?.data;
                if (message === "Success") {
                    toast.success('سفارش با موفقیت ثبت شد');
                    router.push('/services/clrd');
                    window.open(url, "_blank")
                }
            } catch (err) {
                // Errors are handled in hooks, but you can add more here if needed
            } finally {
                setIsProcessing(false);
            }
        } else {
            setPendingFormData(data)
            try {
                await requestOtpCode({ phoneNumber: data.phone })
                setShowOtpDialog(true)
            } catch (err) {
                setShowOtpDialog(false)

                // Error handled in hook
            }
        }
    }

    // Handle OTP verification and chained API calls
    const handleOtpVerification = async (token: string) => {
        setShowOtpDialog(false)
        if (!pendingFormData) return
        setIsProcessing(true)
        try {
            // 1. Register user
            await handleRegister({
                fname: pendingFormData.fname,
                lname: pendingFormData.lname,
                phoneNumber: pendingFormData.phone,
                password: pendingFormData.password,
                nationalCode: pendingFormData.nationalCode,
                token
            })

            // 2. Login user
            await handleLogin({
                phoneNumber: pendingFormData.phone,
                password: pendingFormData.password
            })

            // 3. Add to cart
            await handleAddToCart({
                products: [{ productId: 1, count: quantity }]
            })

            // 4. Create order
            const orderDetail = await handleCreateOrder({
                transportationId: 1,
                hasInstallment: pendingFormData.paymentType === 'installment',
                address: pendingFormData.address,
                postalCode: pendingFormData.postalCode
            })
            const { data: { url, message } } = orderDetail?.data;
            if (message === "Success") {
                toast.success('سفارش با موفقیت ثبت شد');
                router.push('/services/clrd');
                window.open(url, "_blank")
            }
        } catch (err) {

            // Errors are handled in hooks, but you can add more here if needed
        } finally {
            setIsProcessing(false)
            setPendingFormData(null)
        }
    }

    // useEffect(() => {
    //     if (profileData) {
    //         reset(prev => ({
    //             ...prev,
    //             fname: profileData.fName || '',
    //             lname: profileData.lName || '',
    //             nationalCode: profileData.nationalCode || '',
    //             phone: profileData.phoneNumber || '',
    //         }));
    //     }
    // }, [profileData, reset]);

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen py-10 px-2 bg-[#F9FBFD]">
            {/* OTP Dialog */}
            <OTPDialog
                open={showOtpDialog}
                onClose={() => setShowOtpDialog(false)}
                onVerify={handleOtpVerification}
            />
            {/* Optionally show a loading overlay when processing */}
            {isProcessing && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-lg">در حال پردازش...</div>
                </div>
            )}
            <div className="w-full max-w-[1440px] bg-[#EAF6FF] rounded-2xl shadow-md px-6 py-10 flex flex-col gap-8 mb-16">
                <div className="w-full flex flex-col gap-4 mb-6">
                    <div className="text-xl lg:text-2xl font-bold text-[#222] text-center lg:text-right">کاربر گرامی، لطفا فرم زیر را تکمیل نمایید.</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
                    {/* Top Row */}
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-1/3 flex flex-col gap-2">
                            <label className="text-right font-semibold">نام:</label>
                            <Controller
                                name="fname"
                                control={control}
                                rules={{ required: 'نام الزامی است' }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        fullWidth
                                        placeholder="نام"
                                        error={!!errors.fname}
                                        helperText={errors.fname?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 flex flex-col gap-2">
                            <label className="text-right font-semibold">نام خانوادگی:</label>
                            <Controller
                                name="lname"
                                control={control}
                                rules={{ required: 'نام خانوادگی الزامی است' }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        fullWidth
                                        placeholder="نام خانوادگی"
                                        error={!!errors.lname}
                                        helperText={errors.lname?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 flex flex-col gap-2">
                            <label className="text-right font-semibold">کد ملی:</label>
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
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {/* Second Row */}
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-1/3 flex flex-col gap-2">
                            <label className="text-right font-semibold">پسورد:</label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'پسورد الزامی است' }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        fullWidth
                                        placeholder="********"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 flex flex-col gap-2">
                            <label className="text-right font-semibold">شماره تماس:</label>
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
                    {/* Payment Method */}
                    <div className="w-full flex flex-col gap-4">
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
                                    ۴ قسط <span className="text-[#008EFF] font-bold">۴۵۶/۰۰۰</span> تومانی (بازپرداخت اولین قسط ۳۱ تیرماه)
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
                                    <span className="text-sm">پرداخت آنلاین</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="flex flex-row justify-start">
                        <Button
                            type="submit"
                            variant="contained"
                            className="bg-[#ED1A31] text-white rounded-lg py-3 px-10 normal-case text-sm font-medium hover:bg-[#d0172b]"
                            style={{ fontFamily: 'YekanBakh', minWidth: 120 }}
                            disabled={isProcessing || isRegistering || isLoggingIn || isRequesting}
                        >
                            پرداخت نهایی
                        </Button>
                    </div>
                </form>
            </div>
            {/* Support/Contact Section */}
            <ContactUs />
        </div>
    );
};

export default PostalInfo;
