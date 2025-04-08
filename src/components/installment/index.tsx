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
        status: "pending" | "completed" | "failed"
    }[],
    installments: {
        id: 1,
        amount: 10000,
        status: "pending" | "paid" | "overdue",
        dueDate: string,
        serviceType: "medical" | "beauty",
        repaymentMonths: number,
        paymentMode: "promissoryNote" | "installmentCheque" | "guaranteeCheque",
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

interface RepayResponse {
    paymentId: string
    url: string
}

const InvoiceCard = (props: { invoice: InstallmentItem }) => {

    const { invoice: i } = props;

    const [pending, setPending] = useState<boolean>(false);

    const status = useMemo(() => {
        return i.transactions.filter(t => t.status == "completed").length > 0 ? "paid" : "notpaid"
    }, [i])

    const calculateTotalAmount = (): string => {
        const convertPersianToEnglish = (str: string): number => {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            let result = str;
            for (let i = 0; i < 10; i++) {
                result = result.replace(new RegExp(persianNumbers[i], 'g'), i.toString());
            }

            return parseInt(result.replace(/[^0-9]/g, ''), 10);
        };


        const temp = i.installments.reduce((sum, item) => {
            return sum + (Math.round(convertPersianToEnglish(item.amount.toString()) / item.repaymentMonths));
        }, 0);

        const total = Math.round(temp / 10);

        // Convert back to Persian format with thousands separator
        return total.toLocaleString('fa-IR');
    };

    const pay = () => {
        setPending(true)
        mAxios.post<IResponse<RepayResponse>>("/credit/repay", { gatewayId: 1, invoiceId: i.id }).then(res => {
            const url = res.data.data.url;

            window.location.href = url;
        })
    }

    return (
        <>
            <div className="bg-white rounded-lg p-4 my-4">

                <div className="space-y-4">
                    {i.installments.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-100 shadow-sm rounded-lg p-4 transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <Typography className="text-primary-blue text-lg font-bold text-right">
                                            {
                                                item.services?.[0]?.business?.title
                                            }
                                        </Typography>
                                        <Typography className="text-primary-blue font-bold text-lg">
                                            {formatCurrency(item.amount / item.repaymentMonths)} ت
                                        </Typography>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <Typography className="text-gray-500 text-sm text-right">
                                            نوع خدمت:
                                            {
                                                item.serviceType == "medical" ? "درمانی" : "زیبایی"
                                            }
                                        </Typography>
                                        <Typography className="text-gray-500 text-sm text-left">
                                            وضعیت قسط:
                                            {
                                                item.status == "paid" ?
                                                    "تسویه شده" : (
                                                        item.status == "pending" ?
                                                            "جاری" : "تاخیر خورده"
                                                    )

                                            }
                                        </Typography>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center mt-6 mb-4 gap-4">
                            <Typography className="text-gray-500 text-sm">
                                {
                                    status == "paid" ?
                                        "مبلغ پرداخت شده"
                                        :
                                        " مبلغ قابل پرداخت"
                                }
                            </Typography>
                            <Typography className="text-primary-orange text-lg font-bold">
                                {calculateTotalAmount()} تومان
                            </Typography>
                        </div>
                        {
                            status == "paid" ?
                                <Chip label="پرداخت شده" color="success" />
                                :
                                <Button
                                    variant="contained"
                                    disabled={pending}
                                    onClick={() => pay()}
                                    className="bg-primary-orange hover:bg-primary-orange/90 normal-case px-6"
                                >
                                    پرداخت
                                </Button>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

const InstallmentPage = () => {
    const [invoices, setInvoices] = useState<InstallmentItem[]>([])

    useEffect(() => {
        mAxios.get<IResponse<InstallmentItem[]>>("/credit/invoices").then(res => {
            setInvoices(res.data.data)
        })
    }, [])

    // const [] 

    // Helper function to convert Persian numbers and calculate amount


    return (
        <>
            <div className='bg-white rounded-lg p-4 my-4'>
                <Typography className="text-primary-blue my-5 text-xl font-bold">
                    فاکتور های اقساط
                </Typography>

                <div className="flex items-center justify-between gap-3 my-4">
                    <div className="flex items-center gap-4">
                        <Typography className="text-gray-500 text-sm">
                            موجودی اعتبار باقی مانده:
                        </Typography>
                        <Typography className="text-primary-blue text-xl font-bold">
                            {
                                formatCurrency(invoices?.[0]?.credit?.amount) + " "
                            }
                            تومان
                        </Typography>
                    </div>
                </div>
            </div>
            {
                invoices.map(i => (
                    <InvoiceCard key={i.id} invoice={i} />
                ))
            }
        </>
    );
};

export default InstallmentPage;
