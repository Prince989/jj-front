import mAxios from 'src/configs/axios'

interface CreateOrderParams {
    transportationId: number
    hasInstallment: boolean
    address: string
    postalCode: string
}

export const createOrder = async (data: CreateOrderParams) => {
    const response = await mAxios.post('clrd/order', data)

    return response.data
} 