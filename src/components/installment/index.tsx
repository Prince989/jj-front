import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface InstallmentItem {
    id: string;
    title: string;
    description: string;
    branch: string;
    amount: string;
}

const InstallmentPage = () => {
    const [activeTab, setActiveTab] = useState('thisMonth');

    // Helper function to convert Persian numbers and calculate amount
    const calculateTotalAmount = (items: InstallmentItem[]): string => {
        const convertPersianToEnglish = (str: string): number => {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            let result = str;
            for (let i = 0; i < 10; i++) {
                result = result.replace(new RegExp(persianNumbers[i], 'g'), i.toString());
            }

            return parseInt(result.replace(/[^0-9]/g, ''), 10);
        };

        const total = items.reduce((sum, item) => {
            return sum + convertPersianToEnglish(item.amount);
        }, 0);

        // Convert back to Persian format with thousands separator
        return total.toLocaleString('fa-IR');
    };

    const tabs = [
        { id: 'thisMonth', title: 'اقساط این ماه' },
        { id: 'nextMonths', title: 'اقساط ماه های بعدی' },
    ];

    // Sample data for this month's installments
    const thisMonthInstallments: InstallmentItem[] = [
        {
            id: '1',
            title: 'کلینیک دندان پزشکی مردم',
            description: 'عصب کشی، ایمپلنت و ...',
            branch: 'شعبه ۳ سعادت آباد',
            amount: '۰۱/۲۸۷/۰۰۰',
        },
        {
            id: '2',
            title: 'کلینیک دندان پزشکی مردم',
            description: 'عصب کشی، ایمپلنت و ...',
            branch: 'شعبه ۳ سعادت آباد',
            amount: '۰۱/۲۸۷/۰۰۰',
        },
    ];

    // Sample data for next months' installments
    const nextMonthsInstallments: InstallmentItem[] = [
        {
            id: '3',
            title: 'کلینیک دندان پزشکی آینده',
            description: 'جراحی لثه و ارتودنسی',
            branch: 'شعبه ۲ ونک',
            amount: '۰۲/۵۰۰/۰۰۰',
        },
        {
            id: '4',
            title: 'کلینیک دندان پزشکی سلامت',
            description: 'پر کردن دندان و جرم گیری',
            branch: 'شعبه ۱ تجریش',
            amount: '۰۰/۸۵۰/۰۰۰',
        },
    ];

    const activeItems = activeTab === 'thisMonth' ? thisMonthInstallments : nextMonthsInstallments;

    return (
        <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between gap-3 my-4">
                <Typography className="text-primary-blue text-xl font-bold">
                    پرداخت اقساط
                </Typography>
                <div className="flex items-center gap-4">
                    <Typography className="text-gray-500 text-sm">
                        موجودی اعتبار باقی مانده:
                    </Typography>
                    <Typography className="text-primary-blue text-xl font-bold">
                        ۳۳/۴۵۰/۰۰۰ تومان
                    </Typography>
                </div>
            </div>
            <div className="bg-[#F1FFEF] rounded-[10px] p-3 mb-8 flex items-start gap-2">
                <CheckCircleIcon className="text-[#129D00]" />
                <Typography className="text-gray-500 text-sm">
                    کاربر گرامی! سررسید پرداخت شما ۳۱ فروردین ماه میباشد.
                </Typography>
            </div>

            <div className="flex border-b mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 transition-colors text-sm font-bold relative
                            ${activeTab === tab.id
                                ? 'text-primary-orange after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-orange'
                                : 'text-black hover:text-primary-orange'
                            }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {activeItems.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-100 shadow-sm rounded-lg p-4 transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-primary-blue text-lg font-bold text-right">
                                        {item.title}
                                    </Typography>
                                    <Typography className="text-primary-blue font-bold text-lg">
                                        {item.amount} ت
                                    </Typography>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <Typography className="text-gray-500 text-sm text-right">
                                        {item.branch}
                                    </Typography>
                                    <Typography className="text-gray-500 text-sm text-left">
                                        {item.description}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center mt-6 mb-4 gap-4">
                        <Typography className="text-gray-500 text-sm">
                            مبلغ قابل پرداخت:
                        </Typography>
                        <Typography className="text-primary-orange text-lg font-bold">
                            {calculateTotalAmount(activeItems)} تومان
                        </Typography>
                    </div>
                    <Button
                        variant="contained"
                        className="bg-primary-orange hover:bg-primary-orange/90 normal-case px-6"
                    >
                        پرداخت
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default InstallmentPage;
