import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

interface ConsultationFormData {
    phoneNumber: string;
}

const Consulting: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ConsultationFormData>();

    const onSubmit = (data: ConsultationFormData) => {
        console.log('Phone number submitted:', data.phoneNumber);

        // Here you can add your API call to submit the phone number
        reset();
    };

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        برای مشاوره بیشتر شماره تماس خود را وارد کنید تا همکاران ما در اسرع وقت باشما ارتباط بگیرند.
                    </h2>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Image */}
                    <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="w-full max-w-md">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="phoneNumber"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        شماره تماس
                                    </label>
                                    <input
                                        {...register('phoneNumber', {
                                            required: 'شماره تماس الزامی است',
                                            pattern: {
                                                value: /^(\+98|0)?9\d{9}$/,
                                                message: 'لطفا شماره تماس معتبر وارد کنید'
                                            }
                                        })}
                                        type="tel"
                                        id="phoneNumber"
                                        placeholder="مثال: 09123456789"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-right"
                                    />
                                    {errors.phoneNumber && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    ارسال درخواست مشاوره
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="flex justify-center lg:justify-start order-1 lg:order-2">
                        <div className="relative w-full max-w-md h-80">
                            <Image
                                src="/images/celeard/consulting.svg"
                                alt="Consulting"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Consulting;
