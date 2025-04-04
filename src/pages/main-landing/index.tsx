import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import Header from 'src/components/dentistry-panel/header/Header'
import Footer from 'src/components/dentistry-panel/Footer'
import Banner from 'src/components/main-landing/banner'
import LoanBox from 'src/components/main-landing/loan'
import CategoriesContainer from 'src/components/main-landing/categories'
import BrandBanner from 'src/components/main-landing/brand-banner'
import BrandConsultation from 'src/components/main-landing/consultation'
import FeaturedBox from 'src/components/main-landing/featured'
import Supporters from 'src/components/main-landing/supporters'
import HeaderBanner from 'src/components/main-landing/header-banner'

const MainLanding = () => {
  return (
    <div className="bg-white">
      <HeaderBanner />
      <div className="flex flex-col bg-white px-3 lg:px-24">
        <Header />
      </div>
      <div className="flex flex-col bg-[#1a237e] px-3 lg:px-24">
        <Banner />
        <LoanBox />
      </div>
      <div className="flex flex-col bg-white px-3 lg:px-24">
        <CategoriesContainer />
      </div>
      <div className="flex flex-col bg-white mb-24">
        <BrandBanner />
        <BrandConsultation />
      </div>
      <div className="flex flex-col bg-white px-3 lg:px-24">
        <FeaturedBox />
      </div>
      <div className="flex flex-col bg-white mb-24">
        <Supporters />
      </div>
      <Footer />
    </div>
  )
}

MainLanding.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// Set both guards to false to prevent any auth-related redirects
MainLanding.authGuard = false
MainLanding.guestGuard = false

export default MainLanding

