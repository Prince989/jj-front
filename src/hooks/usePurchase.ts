import { useState } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'
import axios from 'axios'
import authConfig from "../configs/auth";

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

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            // First API call to get gateway information
            const { data: gatewayResponse } = await axios.get(baseUrl + 'payment/gateway')

            if (!gatewayResponse.data?.[0]?.id) {
                throw new Error('اطلاعات درگاه در دسترس نیست')
            }

            const gatewayId = gatewayResponse.data[0].id

            const sId = localStorage.getItem("jj-sid");
            let sponserId = null

            if (sId) {
                sponserId = sId;
            }

            sponserId = sponserId ? { sId: sponserId } : {}

            // Second API call to initiate payment
            const { data: paymentResponse } = await mAxios.post(baseUrl + 'payment/pay', {
                gatewayId,
                cardId: parseInt(selectedCard),
                ...sponserId
            },
                {
                    headers: {
                        Authorization: typeof window !== 'undefined' ? localStorage.getItem(authConfig.storageTokenKeyName) : ""
                    }
                })

            const paymentUrl = paymentResponse.data?.data?.url
            if (!paymentUrl) {
                throw new Error('آدرس پرداخت در دسترس نیست')
            }

            // Open payment URL in new tab
            window.location.href = paymentUrl
            toast.success('در حال انتقال به درگاه پرداخت...')

        } catch (error) {
            console.error('Payment error:', error)
            toast.error('خطا در پرداخت. لطفا دوباره تلاش کنید')
        } finally {
            setIsPaymentLoading(false)
        }
    }

    return {
        isPaymentLoading,
        handlePayment
    }
} 