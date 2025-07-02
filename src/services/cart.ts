import mAxios from 'src/configs/axios'

interface CartProduct {
    productId: number
    count: number
}

interface AddToCartParams {
    products: CartProduct[]
}

export const addToCart = async (data: AddToCartParams) => {
    const response = await mAxios.post('clrd/cart', data)

    return response.data
}

export const getCartInfo = async () => {
    const response = await mAxios.get('clrd/cart')

    return response.data
} 