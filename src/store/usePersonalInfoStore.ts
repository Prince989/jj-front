import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface PersonalInfo {
    fullName: string
    nationalId: string
    phoneNumber: string
    birthDate: string
    postalCode: string
    address: string
}

export interface CardInfo {
    id: string | number
    title: string
    credit: number
    price: number
    installCount: number
    subTitle: string[]
    createdAt?: string
    updatedAt?: string
    image?: string
}

export interface PersonalInfoStore {
    personalInfo: PersonalInfo | null
    cardInfo: CardInfo | null
    activeStep: number
    creditAmount: number | null
    setPersonalInfo: (info: PersonalInfo) => void
    setCardInfo: (info: CardInfo) => void
    setActiveStep: (step: number) => void
    setCreditAmount: (amount: number) => void
    clearPersonalInfo: () => void
    clearCardInfo: () => void
}

export const usePersonalInfoStore = create<PersonalInfoStore>()(
    persist(
        (set) => ({
            personalInfo: null,
            cardInfo: null,
            activeStep: 0,
            creditAmount: null,
            setPersonalInfo: (info) => set({ personalInfo: info }),
            setCardInfo: (info) => set({ cardInfo: info }),
            setActiveStep: (step) => set({ activeStep: step }),
            setCreditAmount: (amount) => set({ creditAmount: amount }),
            clearPersonalInfo: () => set({ personalInfo: null }),
            clearCardInfo: () => set({ cardInfo: null })
        }),
        {
            name: 'personal-info-storage', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
        }
    )
) 