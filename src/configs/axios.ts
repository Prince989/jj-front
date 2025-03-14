import axios from "axios";
import authConfig from "./auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const mAxios = axios.create({
    baseURL: baseUrl + "/api",
    headers: {
        Authorization: typeof window !== 'undefined' ? localStorage.getItem(authConfig.storageTokenKeyName) : ""
    }
})

export default mAxios;