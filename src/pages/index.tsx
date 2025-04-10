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
import FeaturedSection from 'src/components/main-landing/featured'
import Supporters from 'src/components/main-landing/supporters'
import HeaderBanner from 'src/components/main-landing/header-banner'
import Comments from 'src/components/main-landing/comments'

const MainLanding = () => {
  import Banner from 'src/components/main-landing/banner'
  import LoanBox from 'src/components/main-landing/loan'
  import CategoriesContainer from 'src/components/main-landing/categories'
  import BrandBanner from 'src/components/main-landing/brand-banner'
  import BrandConsultation from 'src/components/main-landing/consultation'
  import FeaturedSection from 'src/components/main-landing/featured'
  import Supporters from 'src/components/main-landing/supporters'
  import HeaderBanner from 'src/components/main-landing/header-banner'
  import Comments from 'src/components/main-landing/comments'

  const MainLanding = () => {
    return (
      <div className="bg-white">
        <HeaderBanner />
        <div className="flex flex-col bg-white px-3 lg:px-24">
          <Header />
        </div>
        <div className="flex flex-col px-3 lg:px-24 lg:mb-56 lg:max-h-[650px]" style={{ background: 'linear-gradient(209.22deg, #002B8A 11.23%, #6E9BFF 91.22%)' }}>
          <Banner />
          <LoanBox />
        </div>
        <HeaderBanner />
        <div className="flex flex-col bg-white px-3 lg:px-24">
          <Header />
        </div>
        <div className="flex flex-col px-3 lg:px-24 lg:mb-56 lg:max-h-[650px]" style={{ background: 'linear-gradient(209.22deg, #002B8A 11.23%, #6E9BFF 91.22%)' }}>
          <Banner />
          <LoanBox />
        </div>
        <div className="flex flex-col bg-white px-3 lg:px-24 mb-24">
          <CategoriesContainer />
        </div>
        <div className="flex flex-col px-3 lg:px-24 mb-[600px] lg:mb-72 max-h-[380px] bg-[#EEF9FF]">
          <BrandBanner />
          <BrandConsultation />
        </div>
        <div className="flex flex-col bg-white px-3 lg:px-24">
          <FeaturedSection />
          <CategoriesContainer />
        </div>
        <div className="flex flex-col px-3 lg:px-24 mb-[600px] lg:mb-72 max-h-[380px] bg-[#EEF9FF]">
          <BrandBanner />
          <BrandConsultation />
        </div>
        <div className="flex flex-col bg-white px-3 lg:px-24">
          <FeaturedSection />
        </div>
        <div className="flex flex-col bg-white my-24">
          <Comments />
          <div className="flex flex-col bg-white my-24">
            <Comments />
          </div>
          <div className="flex flex-col bg-white my-24">
            <Supporters />
            <div className="flex flex-col bg-white my-24">
              <Supporters />
            </div>
            <Footer />
          </div>
          )
}

MainLanding.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
MainLanding.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// Set both guards to false to prevent any auth-related redirects
          MainLanding.authGuard = false
          MainLanding.guestGuard = true

          export default MainLanding
          export default MainLanding

