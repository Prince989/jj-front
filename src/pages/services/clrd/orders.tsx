import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import Order from 'src/components/celeard/orders'
import CeleardFooter from 'src/components/celeard/footer'

const OrderPage = () => {
    return (
        <div className="bg-[#FFFCFA] max-w-[1440px] mx-auto">
            <div className="flex flex-col mb-10 lg:mb-24 relative">
                <CeleardHeader />
            </div>
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <Order />
            </div>
            <CeleardFooter />
        </div>
    )
}

OrderPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

OrderPage.authGuard = true
OrderPage.guestGuard = false

export default OrderPage

