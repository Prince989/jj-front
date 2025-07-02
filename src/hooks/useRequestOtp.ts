import { useState } from 'react'
import { requestOtp } from 'src/services/auth'
import toast from 'react-hot-toast'

interface UseRequestOtpProps {
    onSuccess?: () => void
}

interface UseRequestOtpReturn {
    isRequesting: boolean
    requestOtpCode: (data: { phoneNumber: string }) => Promise<void>
}

export const useRequestOtp = ({ onSuccess }: UseRequestOtpProps = {}): UseRequestOtpReturn => {
    const [isRequesting, setIsRequesting] = useState(false)

    const requestOtpCode = async (data: { phoneNumber: string }) => {
        try {
            setIsRequesting(true)
            await requestOtp(data)
            toast.success('کد تایید با موفقیت ارسال شد')
            onSuccess?.()
        } catch (error) {
            console.error('Request OTP error:', error)
            toast.error('خطا در ارسال کد تایید. لطفا دوباره تلاش کنید')
        } finally {
            setIsRequesting(false)
        }
    }

    return {
        isRequesting,
        requestOtpCode
    }
} 