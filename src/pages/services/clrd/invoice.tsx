import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Import components
import CeleardHeader from 'src/components/celeard/header'
import { InvoiceComponent } from 'src/components/celeard/invoiceComponent'
import CeleardFooter from 'src/components/celeard/footer'

const InvoicePage = () => {

    return (
        <div className="bg-[#FFFCFA] max-w-[1440px] mx-auto">
            <div className="flex flex-col mb-10 lg:mb-24 relative">
                <CeleardHeader />
            </div>
            <div className="flex flex-col px-3 lg:px-24 mb-24">
                <InvoiceComponent />
            </div>
            <CeleardFooter />
        </div>
    )
}

InvoicePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePage.authGuard = false
InvoicePage.guestGuard = false

export default InvoicePage

