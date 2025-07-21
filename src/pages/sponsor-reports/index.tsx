import React, { ReactNode } from 'react'
import UserLayout from 'src/layouts/UserLayout'
import SponsorReportsComponent from 'src/components/sponsor-reports'

function SponsorReports() {
    return <SponsorReportsComponent />
}

SponsorReports.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

SponsorReports.authGuard = true
SponsorReports.guestGuard = false

export default SponsorReports 