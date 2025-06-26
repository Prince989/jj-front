import React, { ReactNode, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuth } from 'src/hooks/useAuth'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import HeroSection from 'src/components/dentistry-panel/HeroSection'
import Footer from 'src/components/footer'
import { useRouter } from 'next/router'
import mAxios from 'src/configs/axios'

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
        <div className="bg-white">
            <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
                <CeleardHeader />
            </div>
            <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
                <HeroSection />
            </div>
            <Footer />
        </div>
    )
}

CeleardPanel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CeleardPanel.authGuard = false
CeleardPanel.guestGuard = false

export default CeleardPanel

