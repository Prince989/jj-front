import { useState } from 'react'
import { createOrder } from 'src/services/order'
import toast from 'react-hot-toast'

interface UseOrderProps {
    onSuccess?: () => void
}

interface UseOrderReturn {
    isUpdating: boolean
    handleCreateOrder: (data: {
        transportationId: number
        hasInstallment: boolean
        address: string
        postalCode: string
        isDestPay?: boolean
    }) => Promise<any>
}

export const useOrder = ({ onSuccess }: UseOrderProps): UseOrderReturn => {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleCreateOrder = async (data: { transportationId: number; hasInstallment: boolean; address: string; postalCode: string; isDestPay?: boolean }) => {
        try {
            setIsUpdating(true)
            const result = await createOrder(data)
            toast.success('سفارش با موفقیت ثبت شد')
            onSuccess?.()

            return result
        } catch (error) {
            console.error('Create order error:', error)
            toast.error('خطا در ثبت سفارش. لطفا دوباره تلاش کنید')
            throw error
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        isUpdating,
        handleCreateOrder
    }
} 