import { useState } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

export const usePaymentVerification = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getVerificationOtp = async () => {
        try {
            setLoading(true)
            await mAxios.get('/financial/verificationGetOtp')

            return true
        } catch (error) {
            toast.error('خطا در درخواست اعتبارسنجی')
            setError('خطا در درخواست اعتبارسنجی')

            return false
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async (token: string) => {
        try {
            setLoading(true)
            await mAxios.post('/financial/verificationCheckOtp', {
                otp: token
            })

            return true
        } catch (error) {
            toast.error('خطا در تایید کد')
            setError('خطا در تایید کد')

            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        getVerificationOtp,
        verifyOtp
    }
}

export default usePaymentVerification 