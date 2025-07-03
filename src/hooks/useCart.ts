import { useState } from 'react'
import { addToCart } from 'src/services/cart'
import toast from 'react-hot-toast'

interface UseCartProps {
    onSuccess?: () => void
}

interface UseCartReturn {
    isUpdating: boolean
    handleAddToCart: (data: {
        products: {
            productId: number
            count: number
        }[]
    }) => Promise<void>
}

export const useCart = ({ onSuccess }: UseCartProps): UseCartReturn => {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleAddToCart = async (data: { products: { productId: number; count: number }[] }) => {
        try {
            setIsUpdating(true)
            await addToCart(data)
            toast.success('محصولات با موفقیت به سبد خرید اضافه شدند')
            onSuccess?.()
        } catch (error) {
            console.error('Add to cart error:', error)
            toast.error('خطا در افزودن به سبد خرید. لطفا دوباره تلاش کنید')
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        isUpdating,
        handleAddToCart
    }
} 