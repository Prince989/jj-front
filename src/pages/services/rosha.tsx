import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import RoshaHeader from 'src/components/rosha/header'
import RoshaFooter from 'src/components/rosha/footer'
import RoshaHeroSection from 'src/components/rosha/heroSection'
import CreditSection from 'src/components/rosha/creditSection'
import AboutSection from 'src/components/rosha/aboutSection'
import BenefitsSection from 'src/components/rosha/benefitsSection'


const CeleardPanel = () => {


    return (
        <div className="bg-white max-w-[1440px] mx-auto">
            <div className="flex flex-col relative">
                <RoshaHeader />
            </div>
            <div className="flex flex-col">
                <RoshaHeroSection />
                <CreditSection />
                <AboutSection />
                <BenefitsSection />
            </div>
            <RoshaFooter />
        </div>
    )
}

CeleardPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CeleardPanel.authGuard = false
CeleardPanel.guestGuard = false

export default CeleardPanel

