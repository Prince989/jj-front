import React from 'react';
import { BrandSlider } from './BrandSlider';
import { ConsultationForm } from './ConsultationForm';

const BrandConsultation = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Brand Slider Section - Takes up 2/3 of the space */}
                <div className="lg:col-span-2">
                    <BrandSlider />
                </div>

                {/* Consultation Form Section - Takes up 1/3 of the space */}
                <div className="lg:col-span-1">
                    <ConsultationForm />
                </div>
            </div>
        </div>
    );
};

export default BrandConsultation;