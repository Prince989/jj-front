import React, { ReactNode } from 'react'
import UserLayout from 'src/layouts/UserLayout'
import RoshaDashboardComponent from 'src/components/rosha/dashboard'

function RoshaDashboard() {
    return <RoshaDashboardComponent />
}

RoshaDashboard.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

RoshaDashboard.authGuard = false // TODO: change to true
RoshaDashboard.guestGuard = false

export default RoshaDashboard 