import toast from 'react-hot-toast'
import mAxios from 'src/configs/axios'
import { AxiosError } from 'axios'

// Validation status type
export type ValidationStatus = 'veryHighRisk' | 'highRisk' | 'mediumRisk' | 'lowRisk' | 'veryLowRisk'

// Response type for validation API
interface ValidationResponse {
    problem: Record<string, unknown>
    message: string
    data: {
        id: number
        userId: number
        validationStatus: ValidationStatus
        hasUnpaidChecks: boolean
        hasUnpaidInstallments: boolean
        validatedForCredit: boolean
        createdAt: string
        updatedAt: string
    }
}

export const useFinancialValidation = () => {
    const validateFinancial = async () => {
        try {
            const { data } = await mAxios.get<ValidationResponse>('/financial/validate')

            return data.data
        } catch (error) {
            console.error('Error during validation:', error)
            throw error
        }
    }

    const getValidationMessage = (status: ValidationStatus) => {
        const messages = {
            veryHighRisk: 'وضعیت اعتبارسنجی شما با ریسک بسیار بالا می باشد',
            highRisk: 'وضعیت اعتبارسنجی شما با ریسک بالا می باشد',
            mediumRisk: 'وضعیت اعتبارسنجی شما با ریسک متوسط می باشد',
            lowRisk: 'وضعیت اعتبارسنجی شما با ریسک پایین می باشد',
            veryLowRisk: 'وضعیت اعتبارسنجی شما با ریسک بسیار پایین می باشد'
        }

        return messages[status]
    }

    const handleValidation = async () => {
        try {
            const result = await validateFinancial()
            const message = getValidationMessage(result.validationStatus)

            // Show toast based on validation status
            toast.success(message)

            return result
        } catch (error) {
            // Handle axios error specifically
            const axiosError = error as AxiosError<ValidationResponse>
            const errorMessage = axiosError.response?.data?.message || 'خطا در اعتبارسنجی. لطفا دوباره تلاش کنید'

            toast.error(errorMessage)
            throw error
        }
    }

    return { handleValidation }
} 