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

export const roshaSignup = async (data: RoshaSignupParams) => {
    const response = await mAxios.post('rosha/signup', withSId(data))

    return response.data
}

export const roshaOrder = async (data: RoshaOrderParams) => {
    const response = await mAxios.post('rosha/order', withSId(data))

    return response.data
}
