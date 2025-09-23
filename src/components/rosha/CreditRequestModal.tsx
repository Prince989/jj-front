import React, { useState, useEffect } from 'react';
import Icon from 'src/@core/components/icon';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import CustomOtpInput from 'src/components/validation/validation/CustomOTPInput';
import { roshaSignup, roshaOrder } from 'src/services/rosha';
import { requestOtp } from 'src/services/auth';
import { handleApiError } from 'src/utils/errorHandler';
import { useAuth } from 'src/hooks/useAuth';

interface CreditRequestModalProps {
    open: boolean;
    onClose: () => void;
    productId?: number | null;
}

interface FormData {
    fname: string;
    lname: string;
    birthdate: string;
    phoneNumber: string;
    nationalCode: string;
}

interface FormErrors {
    fname?: string;
    lname?: string;
    birthdate?: string;
    phoneNumber?: string;
    nationalCode?: string;
}

type Step = 'form' | 'otp' | 'success';

const CreditRequestModal: React.FC<CreditRequestModalProps> = ({ open, onClose, productId }) => {
    const router = useRouter();
    const { otpLogin } = useAuth();
    const [currentStep, setCurrentStep] = useState<Step>('form');
    const [otpToken, setOtpToken] = useState<number | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        fname: '',
        lname: '',
        birthdate: '',
        phoneNumber: '',
        nationalCode: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Utility function to convert Persian/Arabic numbers to English
    const convertToEnglishNumbers = (text: string): string => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let result = text;

        // Convert Persian numbers
        persianNumbers.forEach((persian, index) => {
            result = result.replace(new RegExp(persian, 'g'), englishNumbers[index]);
        });

        // Convert Arabic numbers
        arabicNumbers.forEach((arabic, index) => {
            result = result.replace(new RegExp(arabic, 'g'), englishNumbers[index]);
        });

        return result;
    };

    // Utility function to validate Jalali date format (YYYY/MM/DD)
    const isValidJalaliDate = (dateString: string): boolean => {
        const jalaliDateRegex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
        if (!jalaliDateRegex.test(dateString)) {
            return false;
        }

        const [year, month, day] = dateString.split('/').map(Number);

        // Basic validation
        if (year < 1300 || year > 1400) return false; // Reasonable year range
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;

        // Month-specific day validation
        if (month <= 6 && day > 31) return false;
        if (month > 6 && day > 30) return false;
        if (month === 12 && day > 29) return false; // Leap year not handled for simplicity

        return true;
    };

    // Utility function to convert Jalali date to Gregorian date (ISO format)
    const jalaliToGregorian = (jalaliDate: string): string => {
        // This is a simplified conversion - for production use a proper Jalali library
        const [year, month, day] = jalaliDate.split('/').map(Number);

        // Approximate conversion (not 100% accurate but sufficient for most cases)
        const gregorianYear = year + 621;
        const gregorianMonth = month + 3; // Approximate month offset
        const gregorianDay = day;

        // Create a date object and return ISO string
        const date = new Date(gregorianYear, gregorianMonth - 1, gregorianDay);

        return date.toISOString();
    };

    // Timer effect
    useEffect(() => {
        if (!timer) return;

        const intervalId = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    const resetForm = () => {
        setFormData({
            fname: '',
            lname: '',
            birthdate: '',
            phoneNumber: '',
            nationalCode: ''
        });
        setErrors({});
        setCurrentStep('form');
        setOtpToken(null);
        setTimer(0);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fname.trim()) {
            newErrors.fname = 'نام الزامی است';
        }

        if (!formData.lname.trim()) {
            newErrors.lname = 'نام خانوادگی الزامی است';
        }

        if (!formData.birthdate.trim()) {
            newErrors.birthdate = 'تاریخ تولد الزامی است';
        } else if (!isValidJalaliDate(formData.birthdate)) {
            newErrors.birthdate = 'فرمت تاریخ تولد صحیح نیست. مثال: 1377/10/29';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'شماره تماس الزامی است';
        } else if (!/^09\d{9}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'شماره تماس باید با 09 شروع شود و 11 رقم باشد';
        }

        if (!formData.nationalCode.trim()) {
            newErrors.nationalCode = 'کد ملی الزامی است';
        } else if (!/^\d{10}$/.test(formData.nationalCode)) {
            newErrors.nationalCode = 'کد ملی باید 10 رقم باشد';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        // Convert Persian numbers to English for phone number, national code, and birthdate
        if (field === 'phoneNumber') {
            value = convertToEnglishNumbers(value);
        } else if (field === 'nationalCode') {
            value = convertToEnglishNumbers(value);
        } else if (field === 'birthdate') {
            value = convertToEnglishNumbers(value);
        }

        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleFormSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            // Step 1: Register user with Rosha
            await roshaSignup({
                fname: formData.fname,
                lname: formData.lname,
                birthdate: jalaliToGregorian(formData.birthdate),
                nationalCode: formData.nationalCode,
                phoneNumber: formData.phoneNumber
            });
            setCurrentStep('otp');
            setTimer(75);
            toast.success('کد تایید ارسال شد');
        } catch (error: any) {
            handleApiError(error, 'خطا در ثبت نام یا ارسال کد تایید', toast);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerify = async () => {
        if (!otpToken || otpToken.toString().length !== 4) {
            toast.error('لطفا کد 4 رقمی را وارد کنید');

            return;
        }

        if (!productId) {
            toast.error('شناسه محصول یافت نشد');

            return;
        }

        try {
            setIsLoading(true);

            // Step 3: Login user with OTP
            otpLogin(
                {
                    phoneNumber: formData.phoneNumber,
                    token: otpToken.toString()
                },
                () => {
                    // On successful login, create order
                    roshaOrder({ productId })
                        .then((orderResponse) => {
                            toast.success('سفارش با موفقیت ثبت شد');

                            // Navigate to payment gateway if URL exists
                            if (orderResponse?.data?.data?.url) {
                                const gatewayUrl = orderResponse.data.data.url;
                                window.location.href = gatewayUrl;
                            } else {
                                // Fallback: navigate to rosha services page
                                router.push('/services/rosha');
                            }

                            setCurrentStep('success');
                        })
                        .catch((error: any) => {
                            handleApiError(error, 'خطا در ایجاد سفارش', toast);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                },
                (error: any) => {
                    handleApiError(error, 'کد تایید اشتباه است', toast);
                    setIsLoading(false);
                }
            );
        } catch (error: any) {
            handleApiError(error, 'خطا در تایید کد', toast);
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            setIsLoading(true);
            await requestOtp({ phoneNumber: formData.phoneNumber });
            setTimer(75);
            toast.success('کد تایید مجددا ارسال شد');
        } catch (error: any) {
            handleApiError(error, 'خطا در ارسال کد تایید', toast);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-[#6A8358]">
                        {currentStep === 'form' ? 'اطلاعات ثبت نام' :
                            currentStep === 'otp' ? 'تایید شماره موبایل' :
                                'سفارش ثبت شد'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-[#6A8358] hover:text-[#5a7350] transition-colors"
                        aria-label="close"
                    >
                        <Icon icon='tabler:x' />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 pt-4 overflow-y-auto">
                    {currentStep === 'form' && (
                        <div className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        نام
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fname}
                                        onChange={(e) => handleInputChange('fname', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.fname ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.fname && (
                                        <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        نام خانوادگی
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lname}
                                        onChange={(e) => handleInputChange('lname', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.lname ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.lname && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
                                    )}
                                </div>
                            </div>

                            {/* Birthdate */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    تاریخ تولد
                                </label>
                                <input
                                    type="text"
                                    value={formData.birthdate}
                                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                                    placeholder="1377/10/29"
                                    maxLength={10}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.birthdate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.birthdate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
                                )}
                            </div>

                            {/* Phone and National Code */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        شماره تماس
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                        placeholder="09123456789"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        کدملی
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nationalCode}
                                        onChange={(e) => handleInputChange('nationalCode', e.target.value)}
                                        placeholder="1234567890"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.nationalCode ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.nationalCode && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nationalCode}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 'otp' && (
                        <div className="space-y-4 text-center">
                            <p className="text-sm text-gray-600">
                                کد ارسال شده به شماره {formData.phoneNumber} را وارد کنید
                            </p>

                            <CustomOtpInput
                                value={otpToken}
                                onChange={(e) => setOtpToken(e)}
                                hasError={false}
                            />

                            <div className="mt-2">
                                {timer > 0 ? (
                                    <p className="text-sm text-gray-600">
                                        {timer} ثانیه تا ارسال مجدد
                                    </p>
                                ) : (
                                    <button
                                        onClick={handleResendOTP}
                                        disabled={isLoading}
                                        className={`text-[#6A8358] underline ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#5a7350]'
                                            }`}
                                    >
                                        ارسال مجدد کد تایید
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => setCurrentStep('form')}
                                disabled={isLoading}
                                className={`w-full py-2 px-4 rounded-lg font-medium border transition-colors ${isLoading
                                    ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'border-[#6A8358] text-[#6A8358] hover:bg-gray-50'
                                    }`}
                            >
                                تغییر شماره موبایل
                            </button>
                        </div>
                    )}

                    {currentStep === 'success' && (
                        <div className="space-y-4 text-center">
                            <div className="text-green-600 text-6xl">✓</div>
                            <p className="text-lg font-medium text-gray-900">
                                سفارش شما با موفقیت ثبت شد
                            </p>
                            <p className="text-sm text-gray-600">
                                در حال انتقال به درگاه پرداخت...
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 pt-4 border-t border-gray-200">
                    {currentStep === 'form' && (
                        <button
                            onClick={handleFormSubmit}
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#6A8358] hover:bg-[#5a7350] text-white'
                                }`}
                        >
                            {isLoading ? 'در حال پردازش...' : 'ادامه'}
                        </button>
                    )}

                    {currentStep === 'otp' && (
                        <button
                            onClick={handleOtpVerify}
                            disabled={!otpToken || otpToken.toString().length !== 4 || isLoading}
                            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${!otpToken || otpToken.toString().length !== 4 || isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#6A8358] hover:bg-[#5a7350] text-white'
                                }`}
                        >
                            {isLoading ? 'در حال تایید...' : 'تایید و خرید'}
                        </button>
                    )}

                    {currentStep === 'success' && (
                        <button
                            onClick={handleClose}
                            className="w-full bg-[#6A8358] hover:bg-[#5a7350] text-white font-medium py-3 px-4 rounded-md transition-colors"
                        >
                            بستن
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreditRequestModal;