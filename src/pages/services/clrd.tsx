import React, { ReactNode, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import CeleardFooter from 'src/components/celeard/footer'
import CeleardLandingV2 from 'src/components/celeard/landingV2/mobile'
import Consulting from 'src/components/celeard/consulting'
import HeroSection from 'src/components/celeard/heroSection'
import WhyCeleardSection from 'src/components/celeard/whyCeleardSection'
import AboutSection from 'src/components/celeard/aboutSection'
import WhyComponent from 'src/components/celeard/WhyComponent'
import { useRouter } from 'next/router'
import mAxios from 'src/configs/axios'

const CeleardPanel = () => {


    const { query, replace } = useRouter();

    useEffect(() => {
        console.log("query", query)
        if (query?.sId) {
            const sId = query.sId;
            mAxios.get("/sponser/validate?sId=" + query.sId).then(() => {
                localStorage.setItem("jj-sid", sId?.toString())
                replace("/services/clrd")
            })
                .catch(() => null)
        }
    }, [query])

    return (
        <div className="bg-[#FFFCFA] max-w-[1440px] mx-auto">
            <div className="flex flex-col relative">
                <CeleardHeader />
            </div>
            <div className="flex lg:hidden flex-col">
                <CeleardLandingV2 />
            </div>
            <div className="hidden lg:flex flex-col px-3 lg:px-24 mb-24">
                <HeroSection />
                <Consulting />
                <WhyCeleardSection />
                <AboutSection />
                <WhyComponent />
            </div>
            <CeleardFooter />
        </div>
    )
}

CeleardPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CeleardPanel.authGuard = false
CeleardPanel.guestGuard = false

export default CeleardPanel

