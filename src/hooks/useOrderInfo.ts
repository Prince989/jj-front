import { useState, useCallback, useEffect } from 'react'
import { getOrderInfo, OrderResponse } from 'src/services/order'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

interface UseOrderInfoReturn {
    isLoading: boolean
    orderInfo: OrderResponse | null
    refetch: () => Promise<void>
}

export const useOrderInfo = (): UseOrderInfoReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [orderInfo, setOrderInfo] = useState<OrderResponse | null>(null)
    const { user } = useAuth()

    const fetchOrderInfo = useCallback(async () => {
        // Only fetch if user is logged in
        if (!user) {
            setOrderInfo(null)

            return
        }

        try {
            setIsLoading(true)
            const data = await getOrderInfo()
            setOrderInfo(data)
        } catch (error) {
            console.error('Fetch cart info error:', error)
            toast.error('خطا در دریافت اطلاعات سبد خرید')
            setOrderInfo(null)
        } finally {
            setIsLoading(false)
        }
    }, [user])

    // Auto-fetch cart info when user changes
    useEffect(() => {
        fetchOrderInfo()
    }, [fetchOrderInfo])

    return {
        isLoading,
        orderInfo,
        refetch: fetchOrderInfo
    }
} 