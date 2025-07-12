import React from 'react';
import { useForm } from 'react-hook-form';
import { useRequestClrd } from 'src/hooks/useConsultingClrd';

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

    const { isConsulting, handleConsulting } = useRequestClrd({
        onSuccess: () => {
            reset();
        }
    });

    const onSubmit = async (data: ConsultationFormData) => {
        await handleConsulting({
            phoneNumber: data.phoneNumber,
        });
    };

    return (
        <div className="w-full h-[400px] lg:h-[330px] relative mt-40">
            <img
                src="/images/celeard/hero7.svg"
                alt="Hero BG"
                className="w-full h-full hidden lg:block absolute"
                style={{ pointerEvents: 'none' }}
            />
            <img
                src="/images/celeard/hero8.svg"
                alt="Hero BG"
                className="w-full h-full lg:hidden block absolute"
                style={{ pointerEvents: 'none' }}
            />
            {/* Two Column Layout */}
            <div className="flex flex-col lg:flex-row items-center justify-between z-100 absolute p-4 top-1/2 -translate-y-1/2">
                {/* Right Column - Form */}
                <div className="w-full lg:w-1/2 flex justify-start lg:justify-center">
                    <div className="text-center">
                        <p className="text-base lg:text-2xl font-bold text-gray-900 mb-4 leading-[30px] lg:leading-[50px]">
                            برای دریافت <span className="text-[#ED1A31]">مشاوره رایگان</span> شماره تماس خود را وارد نمایید تا کارشناسان کلرد با شما ارتباط بگیرند.
                        </p>
                    </div>
                </div>
                {/* Left Column - Image */}
                <div className="w-full lg:w-1/2 flex justify-end lg:justify-center">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-right bg-white"
                                />
                                {errors.phoneNumber && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isConsulting}
                                className="w-full bg-[#ED1A31] disabled:bg-[#ca6470] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isConsulting ? 'در حال ارسال...' : 'ارسال درخواست مشاوره'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Consulting;
