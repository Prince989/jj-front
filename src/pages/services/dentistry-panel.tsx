import React, { ReactNode, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuth } from 'src/hooks/useAuth'

// Import components
import Header from 'src/components/header/Header'
import HeroSection from 'src/components/dentistry-panel/HeroSection'
import ServicesSection from 'src/components/dentistry-panel/ServicesSection'
import WhyChooseUsSection from 'src/components/dentistry-panel/WhyChooseUsSection'
import CreditPlansSection from 'src/components/dentistry-panel/CreditPlansSection'
import ContactFormSection from 'src/components/dentistry-panel/ContactFormSection'
import Footer from 'src/components/footer'
import { useRouter } from 'next/router'
import mAxios from 'src/configs/axios'
import AuthSection from 'src/components/dentistry-panel/AuthSection'

const DentistryPanel = () => {
    const { user } = useAuth();
    const { query, replace } = useRouter();

    useEffect(() => {
        if (query?.sId) {
            const sId = query.sId;
            mAxios.get("/sponser/validate").then(() => {
                localStorage.setItem("jj-sid", sId?.toString())
                replace("/services/dentistry-panel")
            })
                .catch(() => null)
        }
    }, [query])

    return (
        <div className="bg-white">
            <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
                <Header />
            </div>
            <div className="flex flex-col bg-white px-3 lg:px-24 mb-24 mt-3">
                <CreditPlansSection />
            </div>
            <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
                <HeroSection />
            </div>
            <div className="flex flex-col bg-white mb-24">
                <ServicesSection />
            </div>
            <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
                <WhyChooseUsSection />
            </div>
            {!user && (
                <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
                    <AuthSection />
                </div>
            )}
            <div className="flex flex-col bg-white px-3 lg:px-24 gap-y-24 mb-24">
                <ContactFormSection />
            </div>
            <Footer />
        </div>
    )
}

DentistryPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

DentistryPanel.authGuard = false
DentistryPanel.guestGuard = false

export default DentistryPanel

