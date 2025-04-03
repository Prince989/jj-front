import { useState, useEffect } from 'react'
import mAxios from 'src/configs/axios'

interface PaymentItem {
    id: number
    userId: number
    merchantId: string
    status: string
    paymentId: string
    amount: string
    referenceId: string
    paymentMethod: string
    transactionType: string
    repaymentInvoiceId: null | string
    createdAt: string
    updatedAt: string
}

interface PaymentListResponse {
    problem: Record<string, any>
    message: string
    data: PaymentItem[]
}

export const usePaymentVerification = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const verifyPayment = async () => {
        try {
            setLoading(true)
            setError(null)

            // Step 1: Get payment list
            const paymentListResponse = await mAxios.get<PaymentListResponse>('/payment/list')

            if (!paymentListResponse.data.data.length) {
                throw new Error('No payment records found')
            }

            // Get the last payment item
            const lastPayment = paymentListResponse.data.data[paymentListResponse.data.data.length - 1]

            // Check if the payment status is completed
            if (lastPayment.status.toLowerCase() !== 'completed') {
                throw new Error(`Payment is ${lastPayment.status.toLowerCase()}`)
            }

            setLoading(false)
        } catch (err: any) {
            setError(err.message || 'Error during payment verification')
            setLoading(false)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return {
        loading,
        error,
        retryVerification: verifyPayment
    }
}

export default usePaymentVerification 