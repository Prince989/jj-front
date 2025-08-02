import React from 'react';
import Button from '@mui/material/Button';
import ContactUs from './contactUs';
import { useOrderInfo } from '../../hooks/useOrderInfo';
import { useAuth } from '../../hooks/useAuth';
import { usePaymentRetry } from '../../hooks/usePaymentRetry';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Cart: React.FC = () => {
    const { user } = useAuth();
    const { orderInfo, isLoading: orderLoading } = useOrderInfo();
    const { retryPayment, isLoading: paymentLoading } = usePaymentRetry();

    // Helper to format numbers in Persian
    const toPersianNumber = (num: number) => num.toLocaleString('fa-IR');

    // Calculate total products across all orders
    const totalProducts = orderInfo?.data?.reduce((total, order) =>
        total + order.products.length, 0
    ) || 0;

    return (
        <div
            className="w-full flex flex-col items-center justify-center min-h-screen px-2"
        >
            {/* Card info */}
            {user && (
                <div className="w-full bg-white rounded-2xl shadow-md px-6 py-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#222]">سفارشات شما</h2>
                        <div className="text-sm text-[#666]">
                            {totalProducts} محصول
                        </div>
                    </div>

                    {orderLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ED1A31]"></div>
                            <span className="mr-3 text-[#666]">در حال بارگذاری...</span>
                        </div>
                    ) : orderInfo?.data && orderInfo.data.length > 0 ? (
                        <div className="space-y-6">
                            {orderInfo.data.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                    {/* Order Header */}
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                                        <div>
                                            <h3 className="font-semibold text-[#222]">سفارش #{order.id}</h3>
                                            <p className="text-sm text-[#666]">
                                                {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {order.isPaid ? (
                                                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                    <CheckCircleIcon className="w-4 h-4" />
                                                    <span>پرداخت موفق</span>
                                                </div>
                                            ) : order.isDestPay ? (
                                                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                    <CheckCircleIcon className="w-4 h-4" />
                                                    <span>پرداخت درب منزل</span>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    disabled={paymentLoading}
                                                    className="border-red-500 text-red-500 hover:bg-red-50 text-xs"
                                                    onClick={async () => {
                                                        const paymentUrl = await retryPayment(order.id);
                                                        if (paymentUrl) {
                                                            window.location.href = paymentUrl;
                                                        }
                                                    }}
                                                >
                                                    <ErrorIcon className="w-4 h-4 mr-1" />
                                                    {paymentLoading ? 'در حال پردازش...' : 'تکمیل پرداخت'}
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-[#666]">آدرس:</span>
                                                <p className="text-[#222]">{order.address}</p>
                                            </div>
                                            <div>
                                                <span className="text-[#666]">کد پستی:</span>
                                                <p className="text-[#222]">{order.postalCode}</p>
                                            </div>
                                            <div>
                                                <span className="text-[#666]">نوع پرداخت:</span>
                                                <p className="text-[#222]">
                                                    {order.isInstallment ? 'اقساطی' : 'آنلاین'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products in this order */}
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-[#222]">محصولات:</h4>
                                        {order.products.map((productItem) => (
                                            <div key={productItem.id} className="flex items-center gap-4 p-3 bg-[#F8F9FA] rounded-lg">
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <img src="/images/celeard/product-image.svg" alt="product" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-[#222]">
                                                                محصول #{productItem.productId}:
                                                                سفید کننده دندان کلرد
                                                            </p>
                                                            <p className="text-sm text-[#666]">
                                                                تعداد: {toPersianNumber(productItem.count)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-[#666] mb-4">هیچ سفارشی یافت نشد</p>
                            <Button
                                variant="outlined"
                                className="border-[#ED1A31] text-[#ED1A31] hover:bg-[#ED1A31] hover:text-white"
                                onClick={() => {
                                    window.location.href = '/services/clrd'; //TODO: Replace with actual URL
                                }}
                            >
                                شروع خرید
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Support/Contact Section */}
            <ContactUs />
        </div>
    );
};

export default Cart;
