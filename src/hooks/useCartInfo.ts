import { useState, useCallback } from 'react'
import { getCartInfo } from 'src/services/cart'
import toast from 'react-hot-toast'

interface UseCartInfoReturn {
    isLoading: boolean
    cartInfo: any
    refetch: () => Promise<void>
}

export const useCartInfo = (): UseCartInfoReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [cartInfo, setCartInfo] = useState<any>(null)

    const fetchCartInfo = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = await getCartInfo()
            setCartInfo(data)
        } catch (error) {
            console.error('Fetch cart info error:', error)
            toast.error('خطا در دریافت اطلاعات سبد خرید')
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        cartInfo,
        refetch: fetchCartInfo
    }
} 