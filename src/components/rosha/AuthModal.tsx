import React, { useState, useEffect } from 'react';
import Icon from 'src/@core/components/icon';
import { toast } from 'react-hot-toast';
import CustomOtpInput from 'src/components/validation/validation/CustomOTPInput';
import { roshaSignup } from 'src/services/rosha';
import { requestOtp } from 'src/services/auth';
import { handleApiError } from 'src/utils/errorHandler';
import { useAuth } from 'src/hooks/useAuth';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    canClose?: boolean;
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

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onSuccess, canClose = true }) => {
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

    // Utility: convert Jalali YYYY/MM/DD to Gregorian ISO using react-date-object
    const jalaliToIso = (jalaliYmd: string): string => {
        const j = new DateObject({
            date: jalaliYmd,
            format: 'YYYY/MM/DD',
            calendar: persian
        });
        const g = j.convert(gregorian).toDate();

        return g.toISOString();
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

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        // Convert Persian numbers to English for phone number, national code, and birthdate
        if (field === 'phoneNumber' && typeof value === 'string') {
            value = convertToEnglishNumbers(value);
        } else if (field === 'nationalCode' && typeof value === 'string') {
            value = convertToEnglishNumbers(value);
        } else if (field === 'birthdate' && typeof value === 'string') {
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
                birthdate: jalaliToIso(formData.birthdate),
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

        try {
            setIsLoading(true);

            // Step 3: Login user with OTP
            otpLogin(
                {
                    phoneNumber: formData.phoneNumber,
                    token: otpToken.toString()
                },
                () => {
                    toast.success('ورود با موفقیت انجام شد');
                    setCurrentStep('success');

                    // Call onSuccess callback after a short delay
                    setTimeout(() => {
                        onSuccess?.();
                        handleClose();
                    }, 1500);
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
        if (!canClose) {
            return;
        }
        resetForm();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={canClose ? handleClose : undefined}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-[#6A8358]">
                        {currentStep === 'form' ? 'ورود به روشا' :
                            currentStep === 'otp' ? 'تایید شماره موبایل' :
                                'ورود موفق'}
                    </h2>
                    {canClose ? (
                        <button
                            onClick={handleClose}
                            className="text-[#6A8358] hover:text-[#5a7350] transition-colors"
                            aria-label="close"
                        >
                            <Icon icon='tabler:x' />
                        </button>
                    ) : (
                        <div className="w-6 h-6 flex items-center justify-center">
                            <Icon icon='tabler:lock' className="text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 pt-4 overflow-y-auto">
                    {!canClose && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Icon icon='tabler:info-circle' className="text-blue-600" />
                                <p className="text-sm text-blue-800">
                                    برای دسترسی به خدمات روشا، لطفا ابتدا وارد شوید یا ثبت نام کنید.
                                </p>
                            </div>
                        </div>
                    )}

                    {currentStep === 'form' && (
                        <div className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        تاریخ تولد
                                    </label>
                                    <DatePicker
                                        value={
                                            formData.birthdate
                                                ? new DateObject({
                                                    date: formData.birthdate,
                                                    format: 'YYYY/MM/DD',
                                                    calendar: persian
                                                })
                                                : null
                                        }
                                        onChange={(val) => {
                                            const dateObj = Array.isArray(val) ? (val[0] as DateObject | undefined) : (val as DateObject | null);
                                            const formatted = dateObj ? dateObj.format('YYYY/MM/DD') : '';
                                            handleInputChange('birthdate', formatted);
                                        }}
                                        format="YYYY/MM/DD"
                                        calendar={persian}
                                        locale={persian_fa}
                                        editable={false}
                                        calendarPosition="bottom-right"
                                        className="w-full"
                                        inputClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.birthdate ? 'border-red-500' : 'border-gray-300'}`}
                                        maxDate={new DateObject({ calendar: persian })}
                                        portal
                                    />
                                    {errors.birthdate && (
                                        <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
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

                            {/* Phone and National Code */}
                            <div className="grid grid-cols-1 gap-4">
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
                                ورود با موفقیت انجام شد
                            </p>
                            <p className="text-sm text-gray-600">
                                در حال انتقال به صفحه روشا...
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
                            {isLoading ? 'در حال تایید...' : 'تایید و ورود'}
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

export default AuthModal;
