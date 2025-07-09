import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import Cart from 'src/components/celeard/cart'
import CeleardFooter from 'src/components/celeard/footer'

const CartPage = () => {

    return (
        <div className="bg-[#FFFCFA] max-w-[1440px] mx-auto">
            <div className="flex flex-col mb-10 lg:mb-24 relative">
                <CeleardHeader />
            </div>
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <Cart />
            </div>
            <CeleardFooter />
        </div>
    )
}

CartPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CartPage.authGuard = false
CartPage.guestGuard = false

export default CartPage

