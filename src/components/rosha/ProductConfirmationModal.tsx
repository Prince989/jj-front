import React, { useState } from 'react';
import Icon from 'src/@core/components/icon';
import { toast } from 'react-hot-toast';
import { roshaOrder } from 'src/services/rosha';
import { handleApiError } from 'src/utils/errorHandler';

interface ProductConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    productId: number | null;
    productTitle?: string;
}

const ProductConfirmationModal: React.FC<ProductConfirmationModalProps> = ({
    open,
    onClose,
    productId,
    productTitle
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [termsError, setTermsError] = useState('');

    const handleConfirm = async () => {
        if (!productId) {
            toast.error('شناسه محصول یافت نشد');

            return;
        }

        if (!acceptTerms) {
            setTermsError('لطفا شرایط و قوانین را بپذیرید');

            return;
        }

        try {
            setIsLoading(true);

            const orderResponse = await roshaOrder({ productId });
            toast.success('سفارش با موفقیت ثبت شد');

            // Navigate to payment gateway if URL exists
            if (orderResponse?.data?.data?.url) {
                const gatewayUrl = orderResponse.data.data.url;
                window.location.href = gatewayUrl;
            } else {
                // Fallback: navigate to rosha services page
                window.location.href = '/services/rosha';
            }
        } catch (error: any) {
            handleApiError(error, 'خطا در ایجاد سفارش', toast);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setAcceptTerms(false);
            setTermsError('');
            onClose();
        }
    };

    const handleTermsChange = (checked: boolean) => {
        setAcceptTerms(checked);
        if (checked && termsError) {
            setTermsError('');
        }
    };

    const toPersianNumbers = (num: number): string => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

        return num.toString().replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
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
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-[#6A8358]">
                        تایید خرید
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="text-[#6A8358] hover:text-[#5a7350] transition-colors disabled:opacity-50"
                        aria-label="close"
                    >
                        <Icon icon='tabler:x' />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="text-center space-y-4">
                        {/* Product Info */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {toPersianNumbers(productId ?? 0)}  {productTitle}
                            </h3>
                            <p className="text-sm text-gray-600">
                                آیا مطمئن هستید که می‌خواهید این محصول را خریداری کنید؟
                            </p>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start space-x-3 rtl:space-x-reverse">
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    checked={acceptTerms}
                                    onChange={(e) => handleTermsChange(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-[#6A8358] border-gray-300 rounded focus:ring-[#6A8358]"
                                />
                                <label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed">
                                    <span className="font-medium text-gray-900">کاربر گرامی</span> در صورتی که نمیدانید
                                    <span className="text-red-600 font-medium"> چه تعداد ایمپلنت</span> نیاز دارید لطفا در وهله اول از قسمت
                                    <span className="text-red-600 font-medium"> دریافت نوبت</span> با کارشناسان روشا در ارتباط باشید در غیر این صورت خرید شما دچار مشکل خواهد شد و تیم جی جی مسئولیتی بابت این امر ندارد.
                                </label>
                            </div>
                            {termsError && (
                                <p className="text-red-500 text-sm mt-2">{termsError}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-4 border-t border-gray-200">
                    <div className="flex space-x-3 rtl:space-x-reverse">
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className={`flex-1 py-3 px-4 rounded-md font-medium border transition-colors ${isLoading
                                ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            انصراف
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#6A8358] hover:bg-[#5a7350] text-white'
                                }`}
                        >
                            {isLoading ? 'در حال پردازش...' : 'تایید و خرید'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductConfirmationModal;
