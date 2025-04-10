// ** React Imports
import { ReactNode, ReactElement, useMemo, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  const loading = useMemo(() => {
    return auth.loading || auth.user === null;
  }, [auth.user, auth.loading])

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    // Allow access to auth pages for non-authenticated users
    if (router.pathname === '/login' || router.pathname === '/register') {
      return
    }

    if (auth.user === null && !window.localStorage.getItem('userData')) {
      router.replace('/login')
    }
  }, [router.route, auth.user])

  if (loading) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
