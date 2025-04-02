import { useState } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

interface FinalCreditResponse {
    problem: Record<string, any>
    message: string
    data: {
        id: number
        userId: number
        amount: number
        repaymentMonths: number
        createdAt: string
        updatedAt: string
    }
}

export const useFinalCredit = () => {
    const [loading, setLoading] = useState(false)

    const submitFinalCredit = async (months: number): Promise<boolean> => {
        setLoading(true)
        try {
            const response = await mAxios.post<FinalCreditResponse>(
                '/credit',
                { months }
            )

            if (Object.keys(response.data.problem).length === 0 && response.data.data) {
                toast.success('درخواست با موفقیت ثبت شد')

                return true
            } else {
                toast.error(response.data.message || 'خطا در ثبت درخواست')

                return false
            }
        } catch (error) {
            console.error('Error submitting final credit:', error)
            toast.error('خطا در ارتباط با سرور')

            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        submitFinalCredit
    }
}

export default useFinalCredit 