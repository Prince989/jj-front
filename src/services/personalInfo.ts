import mAxios from 'src/configs/axios'


interface UpdatePersonalInfoParams {
    fname: string
    lname: string
    phoneNumber: string
    nationalCode: string
}

export const updatePersonalInfo = async (data: UpdatePersonalInfoParams) => {
    const response = await mAxios.post('auth/updateProfile', data)

    return response.data
} 