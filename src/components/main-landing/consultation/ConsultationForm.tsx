import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DangerIcon } from 'src/@core/components/IconV2';
import Button from '@mui/material/Button';

const categories = [
    'کالای دیجیتال',
    'مد و پوشاک',
    'آرایشی بهداشتی',
    'لوازم خانگی',
];

const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');

    return `${hour}:30`;
});

const tabs = [
    { id: 'consultation', title: 'مشاوره تخصصی' }
];

export const ConsultationForm = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [phone, setPhone] = useState('');
    const [activeTab, setActiveTab] = useState('consultation');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Handle form submission
    };

    return (
        <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
            {/* Title with tabs */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4 whitespace-nowrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-2 py-5 transition-colors text-[10px] lg:text-sm font-bold whitespace-nowrap relative
                                    ${activeTab === tab.id
                                        ? 'text-[#FF5C00] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF5C00]'
                                        : 'text-black hover:text-[#FF5C00]'
                                    }`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                    {/* Queue status */}
                    <div className="text-[10px] lg:text-sm text-gray-500">
                        <span className="text-gray-400">صف انتظار : ۱/۶۵۵ نفر</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mb-6">
                    {/* First row - Category and Phone */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative col-span-1">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg text-[10px] lg:text-sm appearance-none text-right pr-4 focus:outline-none focus:border-[#FF5C00]"
                            >
                                <option value="">دسته‌بندی</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <KeyboardArrowDownIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <div className="relative col-span-1">
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="شماره تماس"
                                className="w-full p-3 border border-gray-200 rounded-lg text-right text-[10px] lg:text-sm focus:outline-none focus:border-[#FF5C00]"
                                dir="rtl"
                            />
                        </div>

                        {/* Desktop-only spacers */}
                        <div className="hidden lg:block col-span-2"></div>
                    </div>

                    {/* Second row - Time and Submit button */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative col-span-1">
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg text-[10px] lg:text-sm appearance-none text-right pr-4 focus:outline-none focus:border-[#FF5C00]"
                            >
                                <option value="">ساعت تماس</option>
                                {timeSlots.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                            <KeyboardArrowDownIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <Button
                            className="bg-primary-orange hover:bg-primary-orange-1 text-white rounded-md py-2 lg:px-6 px-3 text-sm w-full lg:w-auto"
                        >
                            ثبت
                        </Button>

                        {/* Desktop-only spacers */}
                        <div className="hidden lg:block col-span-2"></div>
                    </div>
                </div>
            </form>

            <div className="flex items-center gap-2">
                <DangerIcon width={12} height={12} className='text-[#E76382]' />
                <p className="text-[10px] lg:text-base text-gray-500 text-right">
                    برای مشاورۀ تخصصی شماره تماس خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.
                </p>
            </div>
        </div>
    );
}; 