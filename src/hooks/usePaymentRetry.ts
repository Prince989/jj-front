import { useState, useCallback } from 'react'
import { retryPayment, PaymentRetryResponse } from 'src/services/order'
import toast from 'react-hot-toast'

interface UsePaymentRetryReturn {
    isLoading: boolean
    retryPayment: (orderId: number) => Promise<string | null>
}

export const usePaymentRetry = (): UsePaymentRetryReturn => {
    const [isLoading, setIsLoading] = useState(false)

    const handleRetryPayment = useCallback(async (orderId: number): Promise<string | null> => {
        try {
            setIsLoading(true)
            const response: PaymentRetryResponse = await retryPayment(orderId)

            if (response.data.code === 100 && response.data.url) {
                toast.success('در حال انتقال به درگاه پرداخت...')

                return response.data.url
            } else {
                toast.error('خطا در ایجاد لینک پرداخت')

                return null
            }
        } catch (error) {
            console.error('Payment retry error:', error)
            toast.error('خطا در تکمیل پرداخت')

            return null
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        retryPayment: handleRetryPayment
    }
} 