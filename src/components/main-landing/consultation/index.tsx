import React from 'react';
import { BrandSlider } from './BrandSlider';
import { ConsultationForm } from './ConsultationForm';

const BrandConsultation = () => {
    return (
        <div className="container mx-auto pb-8 -mt-6 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6">
                {/* Consultation Form Section - Takes up 1/3 of the space */}
                <div className="lg:col-span-1">
                    <ConsultationForm />
                </div>
                {/* Brand Slider Section - Takes up 2/3 of the space */}
                <div className="lg:col-span-1">
                    <BrandSlider />
                </div>
            </div>
        </div>
    );
};

export default BrandConsultation;