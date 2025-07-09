import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import PostalInfo from 'src/components/celeard/postalInfo'
import CeleardFooter from 'src/components/celeard/footer'

const PostalInfoPage = () => {

    return (
        <div className="bg-[#FFFCFA] max-w-[1440px] mx-auto">
            <div className="flex flex-col mb-10 lg:mb-24 relative">
                <CeleardHeader />
            </div>
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <PostalInfo />
            </div>
            <CeleardFooter />
        </div>
    )
}

PostalInfoPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

PostalInfoPage.authGuard = false
PostalInfoPage.guestGuard = false

export default PostalInfoPage

