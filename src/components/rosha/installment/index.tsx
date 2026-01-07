import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { format } from 'date-fns-jalali';
import mAxios from 'src/configs/axios';
import { IResponse } from 'src/types/api';
import formatCurrency from 'src/utils/formatCurrency';

interface InstallmentItem {
    id: number
    createdAt: string
    installment: {
        amount: number
        repaymentMonths: number
    }
    transactions: {
        id: number
        status: 'pending' | 'completed' | 'failed'
    }[]
    amount: number
}

interface InvoiceResponse {
    invoices: InstallmentItem[]
}

interface RepayResponse {
    paymentId: string
    url: string
}

// Utility function to convert ISO date to Jalali format
const convertToJalali = (dateString: string): string => {
    try {
        const date = new Date(dateString);

        return format(date, 'yyyy/MM/dd');
    } catch (error) {
        console.error('Error converting date to Jalali:', error);

        return dateString; // Return original string if conversion fails
    }
};

const InvoiceCard = (props: { invoice: InstallmentItem }) => {
    const { invoice: i } = props;
    const [pending, setPending] = useState<boolean>(false);

    const status = useMemo(() => {
        // Handle edge cases: null, undefined, or empty transactions array
        if (!i.transactions || i.transactions.length === 0) {

            return 'notpaid';
        }

        // Check if any transaction has completed status
        return i.transactions.some(t => t.status === 'completed') ? 'paid' : 'notpaid';
    }, [i.transactions]);

    const pay = () => {
        setPending(true);
        mAxios.post<IResponse<RepayResponse>>(`/rosha/pay/invoice/${i.id}`).then(res => {
            const url = res.data.data.url;
            window.location.href = url;
        }).finally(() => {
            setPending(false);
        });
    };

    const isPaid = status === 'paid';

    return (
        <div className={`bg-white rounded-3xl p-8 my-6 shadow-lg transition-all duration-300 ${isPaid
            ? 'border-2 border-green-200 bg-gradient-to-br from-white to-green-50'
            : 'border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50'
            }`}>
            {/* Header with Status Badge */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
                <Typography className="text-[#6A8358] text-xl font-bold text-right">
                    فاکتور قسط ماهانه
                </Typography>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isPaid
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                    }`}>
                    {isPaid ? (
                        <>
                            <CheckCircleIcon className="text-green-600" fontSize="small" />
                            <Typography className="text-sm font-semibold">
                                پرداخت شده
                            </Typography>
                        </>
                    ) : (
                        <>
                            <ErrorOutlineIcon className="text-orange-600" fontSize="small" />
                            <Typography className="text-sm font-semibold">
                                پرداخت نشده
                            </Typography>
                        </>
                    )}
                </div>
            </div>

            {/* Main Amount Display */}
            <div className="text-center mb-6">
                <Typography className="text-gray-500 text-sm mb-2">
                    {isPaid ? 'مبلغ پرداخت شده' : 'مبلغ قابل پرداخت'}
                </Typography>
                <Typography className={`text-4xl font-bold mb-2 ${isPaid ? 'text-green-600' : 'text-[#6A8358]'
                    }`}>
                    {formatCurrency(i.installment.amount)}
                </Typography>
                <Typography className="text-gray-400 text-lg">
                    تومان
                </Typography>
            </div>

            {/* Installment Details */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                    <Typography className="text-gray-600 text-sm">
                        تعداد اقساط
                    </Typography>
                    <Typography className="text-[#6A8358] font-semibold">
                        {i.installment.repaymentMonths} ماه
                    </Typography>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <Typography className="text-gray-600 text-sm">
                        تاریخ ایجاد
                    </Typography>
                    <Typography className="text-[#6A8358] font-semibold">
                        {convertToJalali(i.createdAt)}
                    </Typography>
                </div>
            </div>

            {/* Action Button */}
            {!isPaid && (
                <div className="flex justify-center">
                    <Button
                        variant="contained"
                        disabled={pending}
                        onClick={pay}
                        className="bg-[#6A8358] hover:bg-[#5a7350] normal-case px-8 py-3 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                        fullWidth
                    >
                        {pending ? 'در حال پردازش...' : 'پرداخت قسط'}
                    </Button>
                </div>
            )}
        </div>
    );
};

const RoshaInstallmentPage = (props: { isAuthenticated?: boolean }) => {
    const { isAuthenticated } = props;
    const [invoices, setInvoices] = useState<InstallmentItem[]>([]);

    useEffect(() => {
        if (!isAuthenticated) return;
        mAxios.get<IResponse<InvoiceResponse>>('/rosha/invoices')
            .then(res => {
                setInvoices(res.data.data.invoices);
            })
            .catch(() => {
                // Silently ignore errors when not authenticated or forbidden
            });
    }, [isAuthenticated]);

    return (
        <>
            <div className="bg-white rounded-2xl p-6 my-6 border-2 border-[#6A8358] border-opacity-20 shadow-sm">
                <Typography className="text-[#6A8358] my-5 text-xl font-bold">
                    فاکتور های اقساط
                </Typography>
            </div>
            {isAuthenticated && invoices.map(i => (
                <InvoiceCard key={i.id} invoice={i} />
            ))}
        </>
    );
};

export default RoshaInstallmentPage;


