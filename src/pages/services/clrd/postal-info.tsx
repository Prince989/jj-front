import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import Footer from 'src/components/footer'
import PostalInfo from 'src/components/celeard/postalInfo'

const PostalInfoPage = () => {

    return (
        <div className="bg-[#FFFCFA] max-w-[1440px] mx-auto">
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <CeleardHeader />
            </div>
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <PostalInfo />
            </div>
            <Footer />
        </div>
    )
}

PostalInfoPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

PostalInfoPage.authGuard = false
PostalInfoPage.guestGuard = false

export default PostalInfoPage

