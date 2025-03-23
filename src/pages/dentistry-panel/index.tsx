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
        <>

            <div className="min-h-screen flex flex-col bg-white px-3 lg:px-24">
                <Header />
                <main className="flex-grow">
                    <HeroSection />
                </main>
            </div>
            <ServicesSection />
            <div className="min-h-screen flex flex-col bg-white px-3 lg:px-24">
                <main className="flex-grow">
                    <WhyChooseUsSection />
                    <CreditPlansSection />
                    <ContactFormSection />
                </main>
            </div>
            <Footer />
        </>
    )
}

DentistryPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

DentistryPanel.guestGuard = true

export default DentistryPanel

