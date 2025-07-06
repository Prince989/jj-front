import { useState } from 'react'
import { AddConsultingParams, addConsulting } from 'src/services/cart'
import toast from 'react-hot-toast'

interface UseRequestClrdProps {
    onSuccess?: () => void
}

interface UseConsultingClrd {
    isConsulting: boolean
    handleConsulting: (data: AddConsultingParams) => Promise<void>
}

export const useRequestClrd = ({ onSuccess }: UseRequestClrdProps = {}): UseConsultingClrd => {
    const [isConsulting, setIsConsulting] = useState(false)

    const handleConsulting = async (data: AddConsultingParams) => {
        try {
            setIsConsulting(true)
            await addConsulting(data)
            toast.success('درخواست با موفقیت ثبت شد')
            onSuccess?.()
        } catch (error) {
            console.error('Request CLRD error:', error)
            toast.error('خطا در ثبت درخواست. لطفا دوباره تلاش کنید')
        } finally {
            setIsConsulting(false)
        }
    }

    return {
        isConsulting,
        handleConsulting
    }
} 