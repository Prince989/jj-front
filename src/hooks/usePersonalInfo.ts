import { useState } from 'react'
import { updatePersonalInfo } from 'src/services/personalInfo'
import toast from 'react-hot-toast'

interface UsePersonalInfoProps {
    onSuccess?: () => void
}

interface UsePersonalInfoReturn {
    isUpdating: boolean
    handleUpdatePersonalInfo: (data: {
        fname: string
        lname: string
        phoneNumber: string
        nationalCode: string
    }) => Promise<void>
}

export const usePersonalInfo = ({ onSuccess }: UsePersonalInfoProps): UsePersonalInfoReturn => {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleUpdatePersonalInfo = async (data: {
        fname: string
        lname: string
        phoneNumber: string
        nationalCode: string
    }) => {
        try {
            setIsUpdating(true)
            await updatePersonalInfo(data)
            toast.success('اطلاعات با موفقیت بروزرسانی شد')
            onSuccess?.()
        } catch (error) {
            console.error('Update personal info error:', error)
            toast.error('خطا در بروزرسانی اطلاعات. لطفا دوباره تلاش کنید')
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        isUpdating,
        handleUpdatePersonalInfo
    }
} 