// ** React Imports
import { ReactNode, ReactElement, useEffect, useMemo } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  const loading = useMemo(() => {
    console.log(auth.user, auth.loading);

    return auth.loading;
  }, [auth.user, auth.loading])

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (window.localStorage.getItem('userData') && router.pathname != "/validation") {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (loading) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
