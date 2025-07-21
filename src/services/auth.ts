import mAxios from 'src/configs/axios'

interface RequestOtpParams {
    phoneNumber: string
}

// Helper to add sId from localStorage if present
export function withSId<T extends object>(data: T): T & { sId?: string } {
    if (typeof window !== 'undefined') {
        const sId = localStorage.getItem('jj-sid');
        if (sId) {
            return { ...data, sId };
        }
    }

    return data;
}

export const requestOtp = async (data: RequestOtpParams) => {
    const response = await mAxios.post('auth/otp', withSId(data))

    return response.data
}

interface RegisterParams {
    fname: string
    lname: string
    password: string
    nationalCode: string
    phoneNumber: string
    token: string
}

export const register = async (data: RegisterParams) => {
    const response = await mAxios.post('auth/signup', withSId(data))

    return response.data
}

interface LoginParams {
    phoneNumber: string
    password: string
}

export const login = async (data: LoginParams) => {
    const response = await mAxios.post('auth/login', withSId(data))

    return response.data
} 