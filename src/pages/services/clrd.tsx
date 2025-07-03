import React, { ReactNode, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import HeroSection from 'src/components/celeard/heroSection'
import { useRouter } from 'next/router'
import mAxios from 'src/configs/axios'
import AboutSection from 'src/components/celeard/aboutSection'
import WhyCeleardSection from 'src/components/celeard/whyCeleardSection'
import CeleardFooter from 'src/components/celeard/footer'

const CeleardPanel = () => {
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
        <div className="bg-[#FFFCFA] max-w-[1440px] mx-auto">
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <CeleardHeader />
            </div>
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <HeroSection />
                <AboutSection />
                <WhyCeleardSection />
            </div>
            <CeleardFooter />
        </div>
    )
}

CeleardPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CeleardPanel.authGuard = false
CeleardPanel.guestGuard = false

export default CeleardPanel

