import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DangerIcon } from 'src/@core/components/IconV2';

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
        <div className="bg-white rounded-lg p-8 shadow-lg">
            {/* Title with tabs */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4 whitespace-nowrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-2 py-5 transition-colors text-md font-bold whitespace-nowrap relative
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
                    <div className="text-sm text-gray-500">
                        <span className="text-gray-400">صف انتظار : ۱/۶۵۵ نفر</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Inputs row */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg appearance-none text-right pr-4 focus:outline-none focus:border-[#FF5C00]"
                        >
                            <option value="">دسته‌بندی مورد نظر</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <KeyboardArrowDownIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative flex-1">
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="شماره تماس"
                            className="w-full p-3 border border-gray-200 rounded-lg text-right focus:outline-none focus:border-[#FF5C00]"
                            dir="rtl"
                        />
                    </div>

                    <div className="relative flex-1">
                        <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg appearance-none text-right pr-4 focus:outline-none focus:border-[#FF5C00]"
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
                    <button
                        type="submit"
                        className="w-[120px] bg-[#FF5C00] text-white py-3 rounded-lg hover:bg-[#e65200] transition-colors"
                    >
                        ثبت
                    </button>
                </div>


            </form>

            <div className="flex items-center gap-2">
                <DangerIcon width={12} height={12} className='text-[#E76382]' />
                <p className="text-xs text-gray-500 text-right">
                    برای مشاورۀ تخصصی شماره تماس خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.
                </p>
            </div>
        </div>
    );
}; 