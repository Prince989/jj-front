import { useState, useEffect } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

export const useAllocatedCredit = () => {
    const [loading, setLoading] = useState(true)
    const [creditAmount, setCreditAmount] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchAllocatedCredit = async () => {
        try {
            setLoading(true)
            const response = await mAxios.get('/credit/amount')
            setCreditAmount(response.data.data)
            setError(null)
        } catch (err: any) {
            const persianErrorMessage = 'خطا در دریافت اعتبار تخصیص داده شده'
            setError(persianErrorMessage)
            toast.error(persianErrorMessage)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllocatedCredit()
    }, [])

    return { creditAmount, loading, error, refetchCredit: fetchAllocatedCredit }
} 