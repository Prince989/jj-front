// ** React Imports
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Login from 'src/components/auth/Login'

// ** Component Import


const LoginPage = () => {
  const router = useRouter()

  return <Login onSwitchToRegister={() => router.push('/register')} onSwitchToForgotPassword={() => router.push('/forgot-password')} />
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
