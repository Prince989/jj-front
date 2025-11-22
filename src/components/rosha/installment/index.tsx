import React, { useEffect, useMemo, useState } from 'react';
import { Button, Chip, Typography } from '@mui/material';
import mAxios from 'src/configs/axios';
import { IResponse } from 'src/types/api';
import formatCurrency from 'src/utils/formatCurrency';

interface InstallmentItem {
    id: number,
    credit: {
        amount: number
    }
    transactions: {
        id: number,
        status: 'pending' | 'completed' | 'failed'
    }[],
    installments: {
        id: number,
        amount: number,
        status: 'pending' | 'paid' | 'overdue',
        dueDate: string,
        serviceType: 'medical' | 'beauty',
        repaymentMonths: number,
        paymentMode: 'promissoryNote' | 'installmentCheque' | 'guaranteeCheque',
        creditId: number,
        createdAt: string,
        updatedAt: string,
        services: {
            id: number,
            title: string,
            business: {
                id: number,
                title: string,
            }
        }[]
    }[]
}

interface InvoiceResponse {
    invoices: InstallmentItem[]
    usableCredit: number
}

interface RepayResponse {
    paymentId: string
    url: string
}

const InvoiceCard = (props: { invoice: InstallmentItem }) => {
    const { invoice: i } = props;
    const [pending, setPending] = useState<boolean>(false);

    const status = useMemo(() => {
        return i.transactions.filter(t => t.status === 'completed').length > 0 ? 'paid' : 'notpaid';
    }, [i]);

    const calculateTotalAmount = (): string => {
        const convertPersianToEnglish = (str: string): number => {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            let result = str;
            for (let idx = 0; idx < 10; idx++) {
                result = result.replace(new RegExp(persianNumbers[idx], 'g'), idx.toString());
            }

            return parseInt(result.replace(/[^0-9]/g, ''), 10);
        };

        const temp = i.installments.reduce((sum, item) => {
            return sum + Math.round(convertPersianToEnglish(item.amount.toString()) / item.repaymentMonths);
        }, 0);

        const total = Math.round(temp / 10);

        return total.toLocaleString('fa-IR');
    };

    const pay = () => {
        setPending(true);
        mAxios.post<IResponse<RepayResponse>>('/credit/repay', { gatewayId: 1, invoiceId: i.id }).then(res => {
            const url = res.data.data.url;
            window.location.href = url;
        }).finally(() => {
            setPending(false);
        });
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-6 my-6 border-2 border-[#6A8358] border-opacity-20 shadow-sm">
                <div className="space-y-4">
                    {i.installments.map(item => (
                        <div
                            key={item.id}
                            className="border border-[#6A8358] border-opacity-20 rounded-xl p-4 transition-shadow shadow-sm"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <Typography className="text-[#6A8358] text-lg font-bold text-right">
                                            {item.services?.[0]?.business?.title}
                                        </Typography>
                                        <Typography className="text-[#6A8358] font-bold text-lg">
                                            {formatCurrency(item.amount / item.repaymentMonths)} ت
                                        </Typography>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <Typography className="text-gray-500 text-sm text-right">
                                            نوع خدمت:
                                            {item.serviceType === 'medical' ? 'درمانی' : 'زیبایی'}
                                        </Typography>
                                        <Typography className="text-gray-500 text-sm text-left">
                                            وضعیت قسط:
                                            {item.status === 'paid'
                                                ? 'تسویه شده'
                                                : item.status === 'pending'
                                                    ? 'جاری'
                                                    : 'تاخیر خورده'}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center mt-6 mb-4 gap-4">
                            <Typography className="text-gray-500 text-sm">
                                {status === 'paid' ? 'مبلغ پرداخت شده' : ' مبلغ قابل پرداخت'}
                            </Typography>
                            <Typography className="text-[#6A8358] text-lg font-bold">
                                {calculateTotalAmount()} تومان
                            </Typography>
                        </div>
                        {status === 'paid' ? (
                            <Chip label="پرداخت شده" color="success" />
                        ) : (
                            <Button
                                variant="contained"
                                disabled={pending}
                                onClick={pay}
                                className="bg-[#6A8358] hover:bg-[#5a7350] normal-case px-6 rounded-xl"
                            >
                                پرداخت
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const RoshaInstallmentPage = (props: { isAuthenticated?: boolean }) => {
    const { isAuthenticated } = props;
    const [invoices, setInvoices] = useState<InstallmentItem[]>([]);
    const [credit, setCredit] = useState<number>(0);

    useEffect(() => {
        if (!isAuthenticated) return;
        mAxios.get<IResponse<InvoiceResponse>>('/credit/invoices')
            .then(res => {
                setInvoices(res.data.data.invoices);
                setCredit(res.data.data.usableCredit);
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

                <div className="flex items-center justify-between gap-3 my-4">
                    <div className="flex items-center gap-4">
                        <Typography className="text-gray-600 text-sm">
                            موجودی اعتبار باقی مانده:
                        </Typography>
                        <Typography className="text-[#6A8358] text-xl font-bold">
                            {formatCurrency(credit)} تومان
                        </Typography>
                    </div>
                </div>
            </div>
            {isAuthenticated && invoices.map(i => (
                <InvoiceCard key={i.id} invoice={i} />
            ))}
        </>
    );
};

export default RoshaInstallmentPage;


