import { useState, useEffect } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

export const useAllocatedCredit = () => {
    const [loading, setLoading] = useState(true)
    const [creditAmount, setCreditAmount] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchAllocatedCredit = async () => {
        try {
            console.log('Starting API call, setting loading to true')
            setLoading(true)
            const response = await mAxios.get('/credit/amount')
            console.log('API call successful:', response.data)
            setCreditAmount(response.data.data)
            setError(null)
            console.log('Setting loading to false after success')
            setLoading(false)
        } catch (err: any) {
            console.log('API call failed:', err)
            setLoading(false)
            const persianErrorMessage = 'خطا در دریافت اعتبار تخصیص داده شده'
            setError(persianErrorMessage)
            toast.error(persianErrorMessage)
        }
    }

    useEffect(() => {
        console.log('useEffect running, current loading state:', loading)
        fetchAllocatedCredit()
    }, [])

    return { creditAmount, loading, error, refetchCredit: fetchAllocatedCredit }
} 