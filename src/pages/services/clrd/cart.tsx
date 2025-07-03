import React, { ReactNode, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import { useRouter } from 'next/router'
import mAxios from 'src/configs/axios'
import Cart from 'src/components/celeard/cart'
import CeleardFooter from 'src/components/celeard/footer'

const CartPage = () => {
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
            <div className="flex flex-col px-3 lg:px-24 mb-14">
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

