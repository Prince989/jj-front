import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

export const ConsultationForm = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Handle form submission
    };

    return (
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold text-right mb-6">مشاوره تخصصی</h2>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>صف انتظار : ۱/۶۵۵ نفر</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg appearance-none text-right pr-4"
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

                <div className="relative">
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="شماره تماس"
                        className="w-full p-3 border border-gray-200 rounded-lg text-right"
                        dir="rtl"
                    />
                </div>

                <div className="relative">
                    <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg appearance-none text-right pr-4"
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
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    ثبت
                </button>
            </form>

            <p className="text-xs text-gray-500 text-right mt-4">
                برای مشاورۀ تخصصی شماره تماس خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.
            </p>
        </div>
    );
}; 