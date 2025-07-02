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
    }) => Promise<void>
}

export const useOrder = ({ onSuccess }: UseOrderProps): UseOrderReturn => {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleCreateOrder = async (data: { transportationId: number; hasInstallment: boolean; address: string; postalCode: string }) => {
        try {
            setIsUpdating(true)
            await createOrder(data)
            toast.success('سفارش با موفقیت ثبت شد')
            onSuccess?.()
        } catch (error) {
            console.error('Create order error:', error)
            toast.error('خطا در ثبت سفارش. لطفا دوباره تلاش کنید')
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        isUpdating,
        handleCreateOrder
    }
} 