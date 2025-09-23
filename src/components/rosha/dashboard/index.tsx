import React, { useState, useEffect } from 'react'
import CustomOtpInput from 'src/components/validation/validation/CustomOTPInput'
import { requestOtp } from 'src/services/auth'
import { roshaValidate, roshaUse } from 'src/services/rosha'
import { toast } from 'react-hot-toast'
import { handleApiError } from 'src/utils/errorHandler'
import { useAuth } from 'src/hooks/useAuth'
import { format } from 'date-fns-jalali'

type Step = 'phone' | 'otp' | 'patientCode' | 'validation' | 'success' | 'error'

interface PatientInfo {
    id: number
    fName: string
    lName: string
    phoneNumber: string
    nationalCode: string
    birthDate: string
    isRoshaValid: boolean
}

// Utility function to convert ISO date to Jalali format
const convertToJalali = (dateString: string): string => {
    try {
        const date = new Date(dateString)

        return format(date, 'yyyy/MM/dd')
    } catch (error) {
        console.error('Error converting date to Jalali:', error)

        return dateString // Return original string if conversion fails
    }
}

const RoshaDashboardComponent = () => {
    const [currentStep, setCurrentStep] = useState<Step>('phone')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [otpCode, setOtpCode] = useState<number | null>(null)
    const [patientCode, setPatientCode] = useState<string>('')
    const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const [errorMessage, setErrorMessage] = useState<string>('')

    // Initialize auth hook
    const { user, loading: authLoading, otpLogin } = useAuth()

    // Check if user is already logged in and skip phone/OTP steps
    useEffect(() => {
        if (!authLoading && user) {
            // User is already logged in, skip to patientCode step
            setCurrentStep('patientCode')
        } else if (!authLoading && !user) {
            // User is not logged in, start with phone step
            setCurrentStep('phone')
        }
    }, [user, authLoading])

    // Timer effect
    React.useEffect(() => {
        if (!timer) return

        const intervalId = setInterval(() => {
            setTimer(timer - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timer])

    const handlePhoneSubmit = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            setErrorMessage('لطفا شماره موبایل معتبر وارد کنید')
            toast.error('لطفا شماره موبایل معتبر وارد کنید')

            return
        }

        setIsLoading(true)
        setErrorMessage('')
        try {
            await requestOtp({ phoneNumber })
            setCurrentStep('otp')
            setTimer(75)
            toast.success('کد تایید ارسال شد')
        } catch (error: any) {
            handleApiError(error, 'خطا در ارسال کد تایید', toast)
            setErrorMessage('خطا در ارسال کد تایید')
        } finally {
            setIsLoading(false)
        }
    }

    const handleOtpSubmit = async () => {
        if (!otpCode || otpCode.toString().length !== 4) {
            setErrorMessage('لطفا کد ۴ رقمی را وارد کنید')
            toast.error('لطفا کد ۴ رقمی را وارد کنید')

            return
        }

        setIsLoading(true)
        setErrorMessage('')

        // Use real OTP login service
        otpLogin(
            {
                phoneNumber,
                token: otpCode.toString()
            },
            () => {
                // Success callback
                setCurrentStep('patientCode')
                toast.success('کد تایید با موفقیت تایید شد')
                setIsLoading(false)
            },
            (error: any) => {
                // Error callback
                handleApiError(error, 'کد تایید اشتباه است', toast)
                setErrorMessage('کد تایید اشتباه است')
                setIsLoading(false)
            }
        )
    }

    const handlePatientCodeSubmit = async () => {
        if (!patientCode || patientCode.length < 4) {
            setErrorMessage('لطفا کد بیمار را وارد کنید')

            return
        }

        setIsLoading(true)
        setErrorMessage('')
        try {
            // Call real API to validate patient code
            const response = await roshaValidate({ code: patientCode })

            // Extract patient data from nested response structure
            const patientInfo = response.data.data
            setPatientInfo(patientInfo)
            setCurrentStep('validation')
            toast.success('اطلاعات بیمار با موفقیت دریافت شد')
        } catch (error: any) {
            handleApiError(error, 'کد بیمار یافت نشد', toast)
            setErrorMessage('کد بیمار یافت نشد')
        } finally {
            setIsLoading(false)
        }
    }

    const handleValidationSubmit = async () => {
        setIsLoading(true)
        setErrorMessage('')
        try {
            // Call real API to use/consume the patient code
            await roshaUse({ code: patientCode })
            setCurrentStep('success')
            toast.success('کد بیمار با موفقیت ابطال شد')
        } catch (error: any) {
            handleApiError(error, 'خطا در ابطال کد بیمار', toast)
            setCurrentStep('error')
            setErrorMessage('خطا در ابطال کد بیمار')
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOtp = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            toast.error('لطفا شماره موبایل معتبر وارد کنید')

            return
        }

        setIsLoading(true)
        setErrorMessage('')
        try {
            await requestOtp({ phoneNumber })
            setTimer(75)
            toast.success('کد جدید ارسال شد')
        } catch (error: any) {
            handleApiError(error, 'خطا در ارسال مجدد کد تایید', toast)
            setErrorMessage('خطا در ارسال مجدد کد تایید')
        } finally {
            setIsLoading(false)
        }
    }

    const resetFlow = () => {
        // If user is logged in, reset to patientCode step, otherwise to phone step
        setCurrentStep(user ? 'patientCode' : 'phone')
        setPhoneNumber('')
        setOtpCode(null)
        setPatientCode('')
        setPatientInfo(null)
        setErrorMessage('')
        setTimer(0)
    }

    const getStepTitleAndSubtitle = () => {
        switch (currentStep) {
            case 'phone':
                return {
                    title: 'احراز هویت',
                    subtitle: 'ادمین گرامی! لطفا جهت احراز هویت شماره همراه خود را وارد نمایید تا حساب کاربری شما فعال شود.'
                }
            case 'otp':
                return {
                    title: 'احراز هویت',
                    subtitle: 'ادمین گرامی! لطفا جهت احراز هویت کد ارسالی به شماره همراه خود را وارد نمایید تا حساب کاربری شما فعال شود.'
                }
            case 'patientCode':
                return {
                    title: 'ابطال کردن کد بیماران',
                    subtitle: 'ادمین گرامی! لطفا برای ابطال کردن کدهای بیماران، کدها را در کادر زیر وارد نمایید. دقت فرمایید هر کدی که از سمت بیمار قرائت میشود یک واحد ایمپلنت خریداری شده می باشد. در صورتی که کد قرائت شده درست نبود و سیستم آن را تشخیص نداد از ارائه خدمات به بیمار امتناع نمایید با سپاس.'
                }
            case 'validation':
                return {
                    title: 'ابطال کردن کد بیماران',
                    subtitle: 'ادمین گرامی! لطفا برای ابطال کردن کدهای بیماران، کدها را در کادر زیر وارد نمایید. دقت فرمایید هر کدی که از سمت بیمار قرائت میشود یک واحد ایمپلنت خریداری شده می باشد. در صورتی که کد قرائت شده درست نبود و سیستم آن را تشخیص نداد از ارائه خدمات به بیمار امتناع نمایید با سپاس.'
                }
            case 'success':
                return {
                    title: 'عملیات موفق',
                    subtitle: 'کد بیمار با موفقیت ابطال شد.'
                }
            case 'error':
                return {
                    title: 'خطا در عملیات',
                    subtitle: 'خطا در پردازش اطلاعات!'
                }
            default:
                return {
                    title: 'داشبورد',
                    subtitle: 'ادمین گرامی! لطفا جهت احراز هویت شماره همراه خود را وارد نمایید تا حساب کاربری شما فعال شود.'
                }
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 'phone':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            احراز هویت
                        </h2>
                        <p className="text-gray-600 mb-8">
                            ادمین گرامی! لطفا شماره تماس خود را وارد نمایید.
                        </p>

                        <div className="mb-8">
                            <div className="flex gap-2 max-w-md mx-auto">
                                <div className="w-3/4">
                                    <input
                                        type="tel"
                                        placeholder="شماره موبایل"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        maxLength={11}
                                        className="w-full px-3 py-3 border border-[#6A8358] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A8358] focus:border-transparent text-right"
                                    />
                                </div>
                                <div className="w-1/4">
                                    <input
                                        type="text"
                                        value="۹۸+"
                                        disabled
                                        className="w-full px-3 py-3 bg-gray-100 border border-[#6A8358] rounded-lg text-center text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePhoneSubmit}
                            disabled={isLoading}
                            className="min-w-[200px] px-6 py-3 bg-[#6A8358] text-white rounded-lg hover:bg-[#6A8368] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    در حال پردازش...
                                </div>
                            ) : (
                                'تایید'
                            )}
                        </button>
                    </div>
                )

            case 'otp':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            احراز هویت
                        </h2>
                        <p className="text-gray-600 mb-8">
                            ادمین گرامی! لطفا کد ارسال شده را وارد نمایید.
                        </p>

                        <div className="mb-8">
                            <CustomOtpInput
                                value={otpCode}
                                onChange={setOtpCode}
                                hasError={false}
                            />
                        </div>

                        <div className="mb-8">
                            {timer > 0 ? (
                                <p className="text-sm text-gray-600">
                                    {timer} ثانیه تا ارسال مجدد
                                </p>
                            ) : (
                                <button
                                    onClick={handleResendOtp}
                                    disabled={isLoading}
                                    className={`text-blue-600 hover:text-blue-700 underline text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? 'در حال ارسال...' : 'ارسال مجدد کد تایید'}
                                </button>
                            )}
                        </div>

                        <button
                            onClick={handleOtpSubmit}
                            disabled={isLoading || !otpCode || otpCode.toString().length !== 4}
                            className="min-w-[200px] px-6 py-3 bg-[#6A8358] text-white rounded-lg hover:bg-[#6A8368] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    در حال پردازش...
                                </div>
                            ) : (
                                'بررسی کد'
                            )}
                        </button>
                    </div>
                )

            case 'patientCode':
                return (
                    <div className="text-center">
                        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">
                                ابطال کد بیمار مراجعه کننده
                            </h3>
                            <p className="text-gray-600 mb-8">
                                ادمین گرامی لطفا کد بیمار را وارد نمایید.
                            </p>

                            <div className="mb-8">
                                <div className="flex gap-2 max-w-md mx-auto">
                                    <div className="w-2/3">
                                        <input
                                            type="text"
                                            placeholder="کد بیمار"
                                            value={patientCode}
                                            onChange={(e) => setPatientCode(e.target.value)}
                                            className="w-full px-3 py-3 border border-[#6A8358] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A8358] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <input
                                            type="text"
                                            value="کد کاربر"
                                            disabled
                                            className="w-full px-3 py-3 bg-gray-100 border border-[#6A8358] rounded-lg text-center text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePatientCodeSubmit}
                                disabled={isLoading || !patientCode}
                                className="min-w-[300px] px-6 py-3 bg-[#6A8358] text-white rounded-lg hover:bg-[#6A8368] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        در حال پردازش...
                                    </div>
                                ) : (
                                    'بررسی اطلاعات بیمار و ابطال کد'
                                )}
                            </button>
                        </div>
                    </div>
                )

            case 'validation':
                return (
                    <div className="text-center">
                        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            نام و نام خانوادگی
                                        </label>
                                        <input
                                            type="text"
                                            value={patientInfo ? `${patientInfo.fName} ${patientInfo.lName}` : ''}
                                            disabled
                                            className="w-full px-3 py-3 bg-gray-100 border border-[#6A8358] rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            شماره ملی
                                        </label>
                                        <input
                                            type="text"
                                            value={patientInfo?.nationalCode || ''}
                                            disabled
                                            className="w-full px-3 py-3 bg-gray-100 border border-[#6A8358] rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            تاریخ تولد
                                        </label>
                                        <input
                                            type="text"
                                            value={patientInfo?.birthDate ? convertToJalali(patientInfo.birthDate) : ''}
                                            disabled
                                            className="w-full px-3 py-3 bg-gray-100 border border-[#6A8358] rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            شماره همراه
                                        </label>
                                        <input
                                            type="text"
                                            value={patientInfo?.phoneNumber || ''}
                                            disabled
                                            className="w-full px-3 py-3 bg-gray-100 border border-[#6A8358] rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleValidationSubmit}
                                disabled={isLoading}
                                className="min-w-[200px] px-6 py-3 bg-[#6A8358] text-white rounded-lg hover:bg-[#6A8368] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        در حال پردازش...
                                    </div>
                                ) : (
                                    'ابطال کد'
                                )}
                            </button>
                        </div>
                    </div>
                )

            case 'success':
                return (
                    <div className="text-center">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
                            کد بیمار با موفقیت ابطال شد!
                        </div>
                        <button
                            onClick={resetFlow}
                            className="px-6 py-3 bg-[#6A8358] text-white rounded-lg hover:bg-[#6A8368] font-medium"
                        >
                            شروع مجدد
                        </button>
                    </div>
                )

            case 'error':
                return (
                    <div className="text-center">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
                            خطا در پردازش اطلاعات!
                        </div>
                        <button
                            onClick={resetFlow}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                        >
                            تلاش مجدد
                        </button>
                    </div>
                )

            default:
                return null
        }
    }

    const { title, subtitle } = getStepTitleAndSubtitle()

    // Show loading state while checking authentication
    if (authLoading) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-full bg-white rounded-lg shadow-lg px-8 pt-8 pb-16">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-[#6A8358] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">در حال بررسی احراز هویت...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full bg-white rounded-lg shadow-lg px-8 pt-8 pb-16">
                <div className="mb-24">
                    <h1 className="text-xl font-bold text-[#6A8358] text-right mb-2">
                        {title}
                    </h1>
                    <p className="text-gray-600 text-right text-sm">
                        {subtitle}
                    </p>
                </div>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {errorMessage}
                    </div>
                )}

                {renderStep()}
            </div>
        </div>
    )
}

export default RoshaDashboardComponent 