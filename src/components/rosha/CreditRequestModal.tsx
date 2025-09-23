import React, { useState } from 'react';
import Icon from 'src/@core/components/icon';

interface CreditRequestModalProps {
    open: boolean;
    onClose: () => void;
}

interface FormData {
    fullName: string;
    dateOfBirth: Date | null;
    phoneNumber: string;
    nationalId: string;
    acknowledgeWarning: boolean;
}

interface FormErrors {
    fullName?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    nationalId?: string;
    acknowledgeWarning?: string;
}

const CreditRequestModal: React.FC<CreditRequestModalProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        dateOfBirth: null,
        phoneNumber: '',
        nationalId: '',
        acknowledgeWarning: false
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const resetForm = () => {
        setFormData({
            fullName: '',
            dateOfBirth: null,
            phoneNumber: '',
            nationalId: '',
            acknowledgeWarning: false
        });
        setErrors({});
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'نام و نام خانوادگی الزامی است';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'تاریخ تولد الزامی است';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'شماره تماس الزامی است';
        } else if (!/^09\d{9}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'شماره تماس باید با 09 شروع شود و 11 رقم باشد';
        }

        if (!formData.nationalId.trim()) {
            newErrors.nationalId = 'کد ملی الزامی است';
        } else if (!/^\d{10}$/.test(formData.nationalId)) {
            newErrors.nationalId = 'کد ملی باید 10 رقم باشد';
        }

        if (!formData.acknowledgeWarning) {
            newErrors.acknowledgeWarning = 'لطفا متن هشدار را مطالعه کرده و تایید کنید';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: any) => {
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

    const handleSubmit = () => {
        if (validateForm()) {

            // Handle form submission here
            console.log('Form submitted:', formData);

            // You can add API call here
            onClose();
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
                        لطفا اطلاعات زیر را وارد نمایید.
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
                    <div className="space-y-6">
                        {/* First Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    نام و نام خانوادگی
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    تاریخ تولد
                                </label>
                                <input
                                    type="text"
                                    value={formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString('fa-IR') : ''}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        // Simple date parsing - you can enhance this based on your needs
                                        const date = value ? new Date(value) : null;
                                        handleInputChange('dateOfBirth', date);
                                    }}
                                    placeholder="مثال: 1375/01/15"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.dateOfBirth && (
                                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                                )}
                            </div>

                        </div>

                        {/* Second Row */}
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
                                    value={formData.nationalId}
                                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                                    placeholder="1234567890"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A8358] ${errors.nationalId ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.nationalId && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>
                                )}
                            </div>
                        </div>

                        {/* Warning Section */}
                        <div className="mt-4">
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="acknowledgeWarning"
                                    checked={formData.acknowledgeWarning}
                                    onChange={(e) => handleInputChange('acknowledgeWarning', e.target.checked)}
                                    className={`mt-1 h-4 w-4 text-[#6A8358] focus:ring-[#6A8358] border-gray-300 rounded ${errors.acknowledgeWarning ? 'border-red-500' : ''
                                        }`}
                                />
                                <label htmlFor="acknowledgeWarning" className="text-sm text-gray-700 leading-relaxed">
                                    کاربر گرامی در صورتی که نمیدانید{' '}
                                    <span className="text-red-600 font-bold">
                                        چه تعداد ایمپلنت
                                    </span>{' '}
                                    نیاز دارید لطفا در وهله اول از قسمت{' '}
                                    <span className="text-red-600 font-bold">
                                        دریافت نوبت
                                    </span>{' '}
                                    با کارشناسان روشا در ارتباط باشید. در غیر این صورت خرید شما دچار مشکل خواهد شد و تیم جی جی مسئولیتی بابت این امر ندارد.
                                </label>
                            </div>
                            {errors.acknowledgeWarning && (
                                <p className="text-red-500 text-sm mt-1">{errors.acknowledgeWarning}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#6A8358] hover:bg-[#5a7350] text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
                    >
                        خرید
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreditRequestModal;