// ** React Imports
import { ReactNode, ReactElement } from 'react'


// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()

  // const router = useRouter()

  /* 
    useEffect(
      () => {
        if (!router.isReady) {
          return
        }
        console.log(auth.user);
        if (auth.user === null && !window.localStorage.getItem('userData')) {
          if (router.asPath !== '/') {
            router.replace({
              pathname: '/login',
              query: { returnUrl: router.asPath }
            })
          } else {
            router.replace('/login')
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [router.route]
    )
   */

  if (auth.loading || auth.user === null) {
    console.log(auth.user);

    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
