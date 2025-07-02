import { useState } from 'react'
import { login } from 'src/services/auth'
import toast from 'react-hot-toast'
import authConfig from 'src/configs/auth'

interface UseLoginProps {
    onSuccess?: () => void
}

interface UseLoginReturn {
    isLoggingIn: boolean
    handleLogin: (data: {
        phoneNumber: string
        password: string
    }) => Promise<void>
}

export const useLogin = ({ onSuccess }: UseLoginProps = {}): UseLoginReturn => {
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const handleLogin = async (data: { phoneNumber: string; password: string }) => {
        try {
            setIsLoggingIn(true)
            const response = await login(data)
            const { token, userData } = response?.data;

            // Store in localStorage
            window.localStorage.setItem(authConfig.storageTokenKeyName, token)
            window.localStorage.setItem('userData', JSON.stringify(userData))
            toast.success('ورود با موفقیت انجام شد')
            onSuccess?.()
        } catch (error) {
            console.error('Login error:', error)
            toast.error('خطا در ورود. لطفا دوباره تلاش کنید')
        } finally {
            setIsLoggingIn(false)
        }
    }

    return {
        isLoggingIn,
        handleLogin
    }
} 