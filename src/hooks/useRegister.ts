import { useState } from 'react'
import { register } from 'src/services/auth'
import toast from 'react-hot-toast'

interface UseRegisterProps {
    onSuccess?: () => void
}

interface UseRegisterReturn {
    isRegistering: boolean
    handleRegister: (data: {
        fname: string
        lname: string
        password: string
        nationalCode: string
        phoneNumber: string
        token: string
    }) => Promise<void>
}

export const useRegister = ({ onSuccess }: UseRegisterProps = {}): UseRegisterReturn => {
    const [isRegistering, setIsRegistering] = useState(false)

    const handleRegister = async (data: { fname: string; lname: string; password: string; nationalCode: string; phoneNumber: string; token: string }) => {
        try {
            setIsRegistering(true)
            await register(data)
            toast.success('ثبت نام با موفقیت انجام شد')
            onSuccess?.()
        } catch (error) {
            console.error('Register error:', error)
            toast.error('خطا در ثبت نام. لطفا دوباره تلاش کنید')
        } finally {
            setIsRegistering(false)
        }
    }

    return {
        isRegistering,
        handleRegister
    }
} 