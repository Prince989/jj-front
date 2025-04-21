// ** React Imports
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Component Import
import ForgotPasswordForm from 'src/components/auth/ForgotPassword'

const ForgotPassword = () => {
  const router = useRouter()

  return <ForgotPasswordForm onSwitchToLogin={() => router.push('/login')} />
}

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPassword.guestGuard = true

export default ForgotPassword
