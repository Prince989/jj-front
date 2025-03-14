// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import mAxios from 'src/configs/axios'

interface DataParams {
    q: string
    role: string
    status: string
    currentPlan: string
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

// ** Fetch contacts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchData = createAsyncThunk('appcontacts/fetchData', async (params: DataParams | null) => {
    const response = (await mAxios.get("/get/contact")).data;
    console.log(response, "what is it");

    return response.data
})

// ** Add contact
export const addcontact = createAsyncThunk(
    'appcontacts/addcontact',
    async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        const response = await axios.post('/apps/contacts/add-contact', {
            data
        })
        dispatch(fetchData(getState().contact.params))

        return response.data
    }
)

// ** Delete contact
export const deletecontact = createAsyncThunk(
    'appcontacts/deletecontact',
    async (id: number | string, { getState, dispatch }: Redux) => {
        const response = await axios.delete('/apps/contacts/delete', {
            data: id
        })
        dispatch(fetchData(getState().contact.params))

        return response.data
    }
)

export const appcontactsSlice = createSlice({
    name: 'appcontacts',
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload.contacts
            state.total = action.payload.total
            state.params = action.payload.params
            state.allData = action.payload.allData
        })
    }
})

export default appcontactsSlice.reducer
