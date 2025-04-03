import { create } from 'zustand'

export interface PersonalInfo {
    fullName: string
    nationalId: string
    phoneNumber: string
    birthDate: string
    postalCode: string
    address: string
}

export interface CardInfo {
    id: string
    image: string
    title: string
    price: string
    description: string
    amount: string
    status?: string
}

export interface PersonalInfoStore {
    personalInfo: PersonalInfo | null
    cardInfo: CardInfo | null
    activeStep: number
    setPersonalInfo: (info: PersonalInfo) => void
    setCardInfo: (info: CardInfo) => void
    setActiveStep: (step: number) => void
    clearPersonalInfo: () => void
    clearCardInfo: () => void
}

export const usePersonalInfoStore = create<PersonalInfoStore>((set) => ({
    personalInfo: null,
    cardInfo: null,
    activeStep: 0,
    setPersonalInfo: (info) => set({ personalInfo: info }),
    setCardInfo: (info) => set({ cardInfo: info }),
    setActiveStep: (step) => set({ activeStep: step }),
    clearPersonalInfo: () => set({ personalInfo: null }),
    clearCardInfo: () => set({ cardInfo: null })
})) 