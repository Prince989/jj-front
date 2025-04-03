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

const persianErrorMessages = {
    noPaymentRecords: 'هیچ سابقه پرداختی یافت نشد',
    paymentStatus: (status: string) => `پرداخت در وضعیت ${status} است`,
    generalError: 'خطا در تأیید پرداخت'
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
                throw new Error(persianErrorMessages.noPaymentRecords)
            }

            // Get the last payment item
            const lastPayment = paymentListResponse.data.data[paymentListResponse.data.data.length - 1]

            // Check if the payment status is completed
            if (lastPayment.status.toLowerCase() !== 'completed') {
                throw new Error(persianErrorMessages.paymentStatus(lastPayment.status))
            }

            setLoading(false)
        } catch (err: any) {
            setError(persianErrorMessages.generalError)
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