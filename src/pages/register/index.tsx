// ** React Imports
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Component Import
import Register from 'src/components/auth/Register'

const RegisterPage = () => {
  const router = useRouter()

  return <Register onSwitchToLogin={() => router.push('/login')} />
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

RegisterPage.guestGuard = true

export default RegisterPage
