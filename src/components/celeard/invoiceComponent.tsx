import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/useAuth';
import { useCart } from 'src/hooks/useCart';
import { useOrder } from 'src/hooks/useOrder';
import { useCartQuantity } from 'src/context/CartContext';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';

interface InvoiceData {
    fname: string;
    lname: string;
    nationalCode: string;
    phone: string;
    postalCode: string;
    address: string;
    paymentType: 'installment' | 'online';
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

// Helper function to convert Persian numbers to English numbers
const convertPersianToEnglishNumbers = (text: string): string => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let result = text;
    persianNumbers.forEach((persianNum, index) => {
        result = result.replace(new RegExp(persianNum, 'g'), englishNumbers[index]);
    });

    return result;
};

// Helper function to process form data before submission
const processFormData = (data: InvoiceData): InvoiceData => {
    return {
        ...data,
        phone: convertPersianToEnglishNumbers(data.phone),
        postalCode: convertPersianToEnglishNumbers(data.postalCode),
        nationalCode: convertPersianToEnglishNumbers(data.nationalCode),
    };
};

export const InvoiceComponent = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { quantity, paymentType } = useCartQuantity();
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Add hooks for cart and order
    const { handleAddToCart } = useCart({});
    const { handleCreateOrder } = useOrder({});

    // Invoice calculation method
    const calculateInvoice = (): InvoiceCalculation => {
        const productCount = quantity;
        const unitPrice = 986000; // قیمت واحد محصول
        const taxRate = 0.1; // 10% مالیات بر ارزش افزوده
        const shippingCost = 60000; // هزینه ارسال

        if (paymentType === 'online') {
            // پرداخت آنلاین: (تعداد محصول × قیمت × 1.1) + 60000
            const subtotal = productCount * unitPrice;
            const tax = subtotal * taxRate;
            const total = subtotal + tax + shippingCost;

            return {
                productCount,
                unitPrice,
                subtotal,
                tax,
                shipping: shippingCost,
                total,
            };
        } else {
            // پرداخت اقساطی
            // مبلغ قسط اول: ((25%*unitPrice)+((count-1)*unitPrice))
            const firstInstallmentBase = (unitPrice * 0.25) + ((productCount - 1) * unitPrice);

            // مالیات بر ارزش افزوده مبلغ قسط اول: value*1.1
            const firstInstallmentWithTax = firstInstallmentBase * (1 + taxRate);

            // مبلغ قابل پرداخت: مبلغ قسط اول + مالیات + هزینه ارسال
            const totalPayment = firstInstallmentWithTax + shippingCost;

            // مبلغ باقی مانده اقساط: (75%*unitPrice)
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

    // Load invoice data from URL parameters
    useEffect(() => {
        const { formData } = router.query;
        if (formData && typeof formData === 'string') {
            try {
                const parsedFormData = JSON.parse(decodeURIComponent(formData));
                setInvoiceData(parsedFormData);
            } catch (error) {
                console.error('Error parsing form data from URL:', error);
                toast.error('خطا در بارگذاری اطلاعات فاکتور');
                router.push('/services/clrd/postal-info');
            }
        } else {
            // If no form data, redirect back to postal info
            router.push('/services/clrd/postal-info');
        }
    }, [router.query, router]);

    // Handle payment
    const handlePayment = async () => {
        if (!user) {
            toast.error('لطفا ابتدا وارد حساب کاربری خود شوید');

            return;
        }

        if (!invoiceData) {
            toast.error('اطلاعات فاکتور در دسترس نیست');

            return;
        }

        setIsProcessing(true);
        try {
            // Process form data
            const processedData = processFormData(invoiceData);
            console.log('Processed data:', processedData);

            // Add to cart
            console.log('Adding to cart...');
            await handleAddToCart({
                products: [{ productId: 1, count: quantity }]
            });

            // Create order
            console.log('Creating order...');
            const orderDetail = await handleCreateOrder({
                transportationId: 1,
                hasInstallment: processedData.paymentType === 'installment',
                address: processedData.address,
                postalCode: processedData.postalCode
            });

            console.log('Order detail:', orderDetail);
            const { data: { url, message } } = orderDetail?.data;
            if (message === "Success") {
                toast.success('سفارش با موفقیت ثبت شد');
                window.open(url, "_blank");
            }
        } catch (err: any) {
            console.error("order-error", err);

            // Extract error message from response
            let errorMessage = 'خطا در ثبت سفارش';

            if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }

            toast.error(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!invoiceData) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen">
                <div className="text-lg">در حال بارگذاری...</div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen py-10 px-3 lg:px-24 bg-[#F9FBFD]">
            {/* Loading overlay when processing */}
            {isProcessing && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-lg">در حال پردازش...</div>
                </div>
            )}

            <div className="w-full max-w-[1440px] bg-white rounded-2xl shadow-md px-6 py-10 flex flex-col gap-8 mb-16">
                {/* Header */}
                <div className="w-full flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="text-xl lg:text-2xl font-bold text-[#222] text-center lg:text-right">
                            فاکتور خرید
                        </div>
                        <Button
                            onClick={() => router.push('/services/clrd/postal-info')}
                            variant="outlined"
                            className="text-[#ED1A31] border-[#ED1A31] hover:bg-[#ED1A31] hover:text-white"
                            style={{ fontFamily: 'YekanBakh' }}
                        >
                            بازگشت
                        </Button>

                    </div>
                    <div className="text-sm text-gray-600 text-center lg:text-right">
                        لطفا اطلاعات زیر را بررسی کرده و در صورت صحت، پرداخت را انجام دهید
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Customer Information */}
                    <div className="flex flex-col gap-6">
                        <div className="text-lg font-bold text-right text-[#222]">اطلاعات مشتری</div>

                        <div className="bg-[#F9FBFD] rounded-lg p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">نام و نام خانوادگی:</span>
                                <span className="font-semibold">{invoiceData.fname} {invoiceData.lname}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">کد ملی:</span>
                                <span className="font-semibold">{invoiceData.nationalCode}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">شماره تماس:</span>
                                <span className="font-semibold">{invoiceData.phone}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">کد پستی:</span>
                                <span className="font-semibold">{invoiceData.postalCode}</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-600 text-right">آدرس:</span>
                                <div className="bg-white rounded p-3 text-right">
                                    {invoiceData.address}
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="text-lg font-bold text-right text-[#222]">روش پرداخت</div>
                        <div className="bg-[#F9FBFD] rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">نوع پرداخت:</span>
                                <span className="font-semibold text-[#008EFF]">
                                    {paymentType === 'installment' ? 'پرداخت اقساطی' : 'پرداخت آنلاین'}
                                </span>
                            </div>
                            {paymentType === 'installment' && (
                                <div className="mt-2 text-xs text-gray-600 text-right">
                                    ۴ قسط <span className="text-[#008EFF] font-bold">۲۴۶/۵۰۰</span> تومانی
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="flex flex-col gap-6">
                        <div className="text-lg font-bold text-right text-[#222]">جزئیات فاکتور</div>

                        <div className="bg-[#F9FBFD] rounded-lg p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">تعداد محصول:</span>
                                <span className="font-semibold">{invoice.productCount} عدد</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">قیمت واحد:</span>
                                <span className="font-semibold">{formatCurrency(invoice.unitPrice)} تومان</span>
                            </div>

                            {paymentType !== 'installment' && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">جمع کل:</span>
                                    <span className="font-semibold">{formatCurrency(invoice.subtotal)} تومان</span>
                                </div>
                            )}

                            {/* Payment Type Specific Details */}
                            {paymentType === 'installment' ? (
                                <>
                                    {invoice.installmentAmount && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">مبلغ قسط اول:</span>
                                            <span className="font-semibold text-[#008EFF]">{formatCurrency(invoice.installmentAmount)} تومان</span>
                                        </div>
                                    )}
                                    {invoice.fullPaymentAmount && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">مبلغ باقی مانده اقساط:</span>
                                            <span className="font-semibold text-[#ED1A31]">{formatCurrency(invoice.fullPaymentAmount)} تومان</span>
                                        </div>
                                    )}
                                </>
                            ) : null}

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">مالیات بر ارزش افزوده (۱۰٪):</span>
                                <span className="font-semibold">{formatCurrency(invoice.tax)} تومان</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">هزینه ارسال:</span>
                                <span className="font-semibold">{formatCurrency(invoice.shipping)} تومان</span>
                            </div>

                            <div className="border-t border-gray-300 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">مبلغ قابل پرداخت:</span>
                                    <span className="text-xl font-bold text-[#ED1A31]">{formatCurrency(invoice.total)} تومان</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <div className="flex justify-center">
                            <Button
                                onClick={handlePayment}
                                variant="contained"
                                className="bg-[#ED1A31] text-white rounded-lg py-3 px-10 normal-case text-sm font-medium hover:bg-[#d0172b]"
                                style={{ fontFamily: 'YekanBakh', minWidth: 200 }}
                                disabled={isProcessing || !user}
                            >
                                {!user ? 'لطفا ابتدا وارد شوید' : isProcessing ? 'در حال پردازش...' : 'پرداخت نهایی'}
                            </Button>
                        </div>

                        {!user && (
                            <div className="text-center text-sm text-red-600">
                                برای ادامه فرآیند پرداخت، لطفا ابتدا وارد حساب کاربری خود شوید
                                <br />
                                <Button
                                    onClick={() => router.push('/services/clrd/postal-info')}
                                    variant="text"
                                    className="text-[#ED1A31] mt-2"
                                    style={{ fontFamily: 'YekanBakh' }}
                                >
                                    بازگشت به صفحه اطلاعات
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};