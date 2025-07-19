import React, { useState, useEffect, ReactNode } from 'react'
import CustomOtpInput from 'src/components/validation/validation/CustomOTPInput'
import { useRouter } from 'next/router'
import { requestOtp } from 'src/services/auth'
import { useRegister } from 'src/hooks/useRegister'
import { useLogin } from 'src/hooks/useLogin'
import { toast } from 'react-hot-toast'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { handleApiError } from 'src/utils/errorHandler'

interface FormData {
    fname: string;
    lname: string;
    nationalCode: string;
    phone: string;
    password: string;
    postalCode: string;
    address: string;
    paymentType: 'installment' | 'online';
}

const VerifyOTP = () => {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [otpToken, setOtpToken] = useState<number | null>(null)
    const [timer, setTimer] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showOtpInput, setShowOtpInput] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData | null>(null)

    // Initialize hooks
    const { handleRegister, isRegistering } = useRegister()
    const { handleLogin, isLoggingIn } = useLogin()

    // Initialize form data from URL parameters
    useEffect(() => {
        const { formData: urlFormData } = router.query;
        if (urlFormData && typeof urlFormData === 'string') {
            try {
                const parsedFormData = JSON.parse(decodeURIComponent(urlFormData));
                setFormData(parsedFormData);
                setPhoneNumber(parsedFormData.phone || '');
            } catch (error) {
                console.error('Error parsing form data from URL:', error);
            }
        }
    }, [router.query]);

    useEffect(() => {
        if (!timer) return

        const intervalId = setInterval(() => {
            setTimer(timer - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timer])

    const handleRequestOTP = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            toast.error('لطفا شماره موبایل معتبر وارد کنید')

            return
        }

        try {
            setIsLoading(true)
            await requestOtp({ phoneNumber })
            setShowOtpInput(true)
            setTimer(75)
            toast.success('کد تایید ارسال شد')
        } catch (error: any) {
            handleApiError(error, 'خطا در ارسال کد تایید', toast)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerify = async () => {
        if (!otpToken || otpToken.toString().length !== 4) {
            toast.error('لطفا کد 4 رقمی را وارد کنید')

            return
        }

        if (!formData) {
            toast.error('اطلاعات فرم یافت نشد')

            return
        }

        try {
            setIsLoading(true)

            // Step 1: Register the user
            await handleRegister({
                fname: formData.fname,
                lname: formData.lname,
                password: formData.password,
                nationalCode: formData.nationalCode,
                phoneNumber: formData.phone,
                token: otpToken.toString()
            });

            // Step 2: Login the user
            await handleLogin({
                phoneNumber: formData.phone,
                password: formData.password
            });

            toast.success('ثبت نام و ورود با موفقیت انجام شد')

            // Step 3: Redirect to invoice page with form data
            if (formData) {
                const formDataString = encodeURIComponent(JSON.stringify(formData));
                router.push(`/services/clrd/invoice?formData=${formDataString}`);
            } else {
                // Fallback to returnUrl if no form data
                const returnUrl = router.query.returnUrl as string || '/services/clrd'
                router.push(`${returnUrl}`)
            }
        } catch (error: any) {
            handleApiError(error, 'خطا در تایید کد', toast)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOTP = () => {
        handleRequestOTP()
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center relative">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    aria-label="بازگشت"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>

                <h1 className="text-2xl font-bold mb-6 text-gray-900">
                    تایید شماره موبایل
                </h1>

                {!showOtpInput ? (
                    <div>
                        <p className="text-sm text-gray-600 mb-6">
                            شماره موبایل خود را وارد کنید تا کد تایید ارسال شود
                        </p>

                        <div className="mb-6">
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="09xxxxxxxxx"
                                maxLength={11}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-right"
                            />
                        </div>

                        <button
                            onClick={handleRequestOTP}
                            disabled={isLoading || !phoneNumber}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isLoading || !phoneNumber
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700'
                                }`}
                        >
                            {isLoading ? 'در حال ارسال...' : 'ارسال کد تایید'}
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-gray-600 mb-6">
                            کد ارسال شده به شماره {phoneNumber} را وارد کنید
                        </p>

                        <CustomOtpInput
                            value={otpToken}
                            onChange={(e) => setOtpToken(e)}
                            hasError={false}
                        />

                        <div className="mt-2 mb-6">
                            {timer > 0 ? (
                                <p className="text-sm text-gray-600">
                                    {timer} ثانیه تا ارسال مجدد
                                </p>
                            ) : (
                                <button
                                    onClick={handleResendOTP}
                                    disabled={isLoading || isRegistering || isLoggingIn}
                                    className={`text-red-600 underline ${isLoading || isRegistering || isLoggingIn ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-700'
                                        }`}
                                >
                                    ارسال مجدد کد تایید
                                </button>
                            )}
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={!otpToken || otpToken.toString().length !== 4 || isLoading || isRegistering || isLoggingIn}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors mb-4 ${!otpToken || otpToken.toString().length !== 4 || isLoading || isRegistering || isLoggingIn
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700'
                                }`}
                        >
                            {isLoading || isRegistering || isLoggingIn ? 'در حال تایید...' : 'تایید'}
                        </button>

                        <button
                            onClick={() => setShowOtpInput(false)}
                            disabled={isLoading || isRegistering || isLoggingIn}
                            className={`w-full py-3 px-4 rounded-lg font-medium border transition-colors ${isLoading || isRegistering || isLoggingIn
                                ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                                : 'border-red-600 text-red-600 hover:bg-red-50'
                                }`}
                        >
                            تغییر شماره موبایل
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

VerifyOTP.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

VerifyOTP.guestGuard = true

export default VerifyOTP 