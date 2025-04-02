import { useState } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

interface UsePurchaseProps {
    selectedCard: string
}

interface UsePurchaseReturn {
    isPaymentLoading: boolean
    handlePayment: () => Promise<void>
}

export const usePurchase = ({ selectedCard }: UsePurchaseProps): UsePurchaseReturn => {
    const [isPaymentLoading, setIsPaymentLoading] = useState(false)

    const handlePayment = async () => {
        try {
            setIsPaymentLoading(true)

            // First API call to get gateway information
            const { data: gatewayResponse } = await mAxios.get('/payment/gateway')

            if (!gatewayResponse.data?.[0]?.id) {
                throw new Error('Gateway information not available')
            }

            const gatewayId = gatewayResponse.data[0].id

            // Second API call to initiate payment
            const { data: paymentResponse } = await mAxios.post('/payment/pay', {
                gatewayId,
                cardId: parseInt(selectedCard)
            })

            const paymentUrl = paymentResponse.data?.data?.url
            if (!paymentUrl) {
                throw new Error('Payment URL not available')
            }

            // Open payment URL in new tab
            window.open(paymentUrl, '_blank')
            toast.success('Redirecting to payment gateway...')

        } catch (error) {
            console.error('Payment error:', error)
            toast.error('Failed to process payment. Please try again.')
        } finally {
            setIsPaymentLoading(false)
        }
    }

    return {
        isPaymentLoading,
        handlePayment
    }
} 