import mAxios from 'src/configs/axios'

export interface SponsorStatistics {
    views: Record<string, any>
    otps: Record<string, any>
    logins: Record<string, any>
    signups: Record<string, any>
    orders: Record<string, any>
}

export interface SponsorExcelResponse {
    problem: Record<string, any>
    message: string
    data: {
        url: string
    }
}

export const getSponsorStatistics = async (hour: number) => {
    const response = await mAxios.get<SponsorStatistics>(`/sponser/statistics?hour=${hour}`)

    return response.data
}

export const getSponsorExcel = async (hour: number) => {
    const response = await mAxios.get<SponsorExcelResponse>(`/sponser/excel?hour=${hour}`)

    return response.data
} 