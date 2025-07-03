import mAxios from 'src/configs/axios'

interface RequestOtpParams {
    phoneNumber: string
}

export const requestOtp = async (data: RequestOtpParams) => {
    const response = await mAxios.post('auth/otp', data)

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
    const response = await mAxios.post('auth/signup', data)

    return response.data
}

interface LoginParams {
    phoneNumber: string
    password: string
}

export const login = async (data: LoginParams) => {
    const response = await mAxios.post('auth/login', data)

    return response.data
} 