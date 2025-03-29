import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import Header from 'src/pages/dentistry-panel/components/Header'
import HeroSection from 'src/pages/dentistry-panel/components/HeroSection'
import ServicesSection from 'src/pages/dentistry-panel/components/ServicesSection'
import WhyChooseUsSection from 'src/pages/dentistry-panel/components/WhyChooseUsSection'
import CreditPlansSection from 'src/pages/dentistry-panel/components/CreditPlansSection'
import ContactFormSection from 'src/pages/dentistry-panel/components/ContactFormSection'
import Footer from 'src/pages/dentistry-panel/components/Footer'

const DentistryPanel = () => {
    return (
        <div className="bg-white">

            <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
                <Header />
                <HeroSection />
            </div>
            <div className="flex flex-col bg-white mb-24">
                <ServicesSection />
            </div>
            <div className="flex flex-col bg-white px-3 lg:px-24 gap-y-24 mb-24">
                <WhyChooseUsSection />
                <CreditPlansSection />
                <ContactFormSection />

            </div>
            <Footer />
        </div>
    )
}

DentistryPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

DentistryPanel.guestGuard = true

export default DentistryPanel

