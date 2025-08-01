// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
// import axios from 'axios'

// ** Cookie Import
import Cookies from 'js-cookie'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, OTPLoginParams } from './types'
import mAxios from 'src/configs/axios'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  otpLogin: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  refreshAuth: () => Promise.resolve()
}

// Cookie options
const cookieOptions = {
  expires: 7, // Cookie expires in 7 days
  secure: process.env.NODE_ENV === 'production', // Secure in production
  sameSite: 'strict' as const
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName) || Cookies.get(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await mAxios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.data })

            // Add role-based redirection for logged-in users
            if (router.pathname === '/login' || router.pathname === '/register') {
              if (response.data.data.role.name === 'businessUser') {
                router.replace('/admission')
              } else if (response.data.data.role.name === 'user') {
                router.replace('/validation')
              } else if (response.data.data.role.name === 'sponserUser') {
                router.replace('/services/clrd')
              }
            }
          })
          .catch(() => {
            // Clear both localStorage and cookies
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            Cookies.remove('userData')
            Cookies.remove('refreshToken')
            Cookies.remove('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              setLoading(false);
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const handleOTPLogin = (params: OTPLoginParams, resolve: () => void, errorCallback?: ErrCallbackType) => {
    mAxios.post(authConfig.otpLoginEndpoint, params).then(async response => {
      // Store in both localStorage and cookies
      const token = response.data.data.token
      const userData = response.data.data.userData

      // Store in localStorage
      window.localStorage.setItem(authConfig.storageTokenKeyName, token)
      window.localStorage.setItem('userData', JSON.stringify(userData))

      // Store in cookies
      Cookies.set(authConfig.storageTokenKeyName, token, cookieOptions)
      Cookies.set('userData', JSON.stringify(userData), cookieOptions)

      setUser({ ...userData })

      resolve();
    })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    mAxios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        // Store in both localStorage and cookies
        const token = response.data.data.token
        const userData = response.data.data.userData

        // Store in localStorage
        window.localStorage.setItem(authConfig.storageTokenKeyName, token)
        window.localStorage.setItem('userData', JSON.stringify(userData))

        // Store in cookies
        Cookies.set(authConfig.storageTokenKeyName, token, cookieOptions)
        Cookies.set('userData', JSON.stringify(userData), cookieOptions)

        setUser({ ...userData })

        // Determine the redirect URL based on user role
        let redirectURL = '/'
        if (userData.role.name === "businessUser") {
          redirectURL = "/admission"
        } else if (userData.role.name === "user") {
          redirectURL = "/validation"
        }

        // Navigate to the determined URL
        window.location.href = redirectURL
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)

    // Clear both localStorage and cookies
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    Cookies.remove('userData')
    Cookies.remove(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const refreshAuth = async (): Promise<void> => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName) || Cookies.get(authConfig.storageTokenKeyName)
    if (storedToken) {
      setLoading(true)
      try {
        const response = await mAxios.get(authConfig.meEndpoint, {
          headers: {
            Authorization: storedToken
          }
        })
        setUser({ ...response.data.data })
      } catch (error) {
        // Clear both localStorage and cookies on error
        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        Cookies.remove('userData')
        Cookies.remove('refreshToken')
        Cookies.remove('accessToken')
        setUser(null)
      } finally {
        setLoading(false)
      }
    } else {
      setUser(null)
      setLoading(false)
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    otpLogin: handleOTPLogin,
    logout: handleLogout,
    refreshAuth
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
