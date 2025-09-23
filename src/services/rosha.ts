import mAxios from 'src/configs/axios'
import { withSId } from './auth'

interface RoshaSignupParams {
    fname: string
    lname: string
    birthdate: string
    nationalCode: string
    phoneNumber: string
}

interface RoshaOrderParams {
    productId: number
}

interface RoshaValidateParams {
    code: string
}

interface RoshaValidateResponse {
    problem: {}
    message: string
    data: {
        problem: {}
        message: string
        data: {
            id: number
            fName: string
            lName: string
            phoneNumber: string
            nationalCode: string
            birthDate: string
            isRoshaValid: boolean
        }
    }
}

interface RoshaUseParams {
    code: string
}

export const roshaSignup = async (data: RoshaSignupParams) => {
    const response = await mAxios.post('rosha/signup', withSId(data))

    return response.data
}

export const roshaOrder = async (data: RoshaOrderParams) => {
    const response = await mAxios.post('rosha/order', withSId(data))

    return response.data
}

export const roshaValidate = async (data: RoshaValidateParams): Promise<RoshaValidateResponse> => {
    const response = await mAxios.post('rosha/validate', data)

    return response.data
}

export const roshaUse = async (data: RoshaUseParams) => {
    const response = await mAxios.post('rosha/use', data)

    return response.data
}
