import mAxios from 'src/configs/axios'
import { withSId } from './auth'

interface CreateOrderParams {
    transportationId: number
    hasInstallment: boolean
    address: string
    postalCode: string
    isDestPay?: boolean
}

// Order item types based on the real API response
export interface OrderProductItem {
    id: number
    productId: number
    count: number
    cartId: number | null
    orderId: number
    createdAt: string
    updatedAt: string
}

export interface OrderData {
    id: number
    userId: number
    address: string
    postalCode: string
    transportationId: number
    isInstallment: boolean
    createdAt: string
    updatedAt: string
    products: OrderProductItem[]
    isPaid: boolean
    isDestPay?: boolean
}

export interface OrderResponse {
    problem: {}
    message: string
    data: OrderData[]
}

// Payment retry response types
export interface PaymentRetryData {
    authority: string
    fee: number
    fee_type: string
    code: number
    message: string
    url: string
}

export interface PaymentRetryResponse {
    problem: {}
    message: string
    data: PaymentRetryData
}

export const createOrder = async (data: CreateOrderParams) => {
    const response = await mAxios.post('clrd/order', withSId(data))

    return response.data
}

export const getOrderInfo = async (): Promise<OrderResponse> => {
    const response = await mAxios.get('clrd/order')

    return response.data;
}

export const retryPayment = async (orderId: number): Promise<PaymentRetryResponse> => {
    const response = await mAxios.post('clrd/pay/again', {
        orderId
    })

    return response.data
}