import { useEffect, useState } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

export interface ProfileData {
    id: number
    fName: string
    lName: string
    phoneNumber: string
    nationalCode: string
    birthDate: string | null
    creditScore: number
    creditLimit: string
    walletBalance: string
    gender: string
}

export const useProfile = () => {
    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState<ProfileData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await mAxios.get('/auth/profile')
            setProfileData(response.data.data)
            setError(null)
        } catch (err: any) {
            setError('خطا در دریافت اطلاعات پروفایل')
            toast.error('خطا در دریافت اطلاعات پروفایل')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return { profileData, loading, error, refetchProfile: fetchProfile }
} 