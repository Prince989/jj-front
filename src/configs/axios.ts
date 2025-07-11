import axios from "axios";
import authConfig from "./auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const mAxios = axios.create({
    baseURL: baseUrl,
});

// Add a request interceptor
mAxios.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem(authConfig.storageTokenKeyName);
        config.headers.Authorization = token ? token : "";
    }

    return config;
});

// Add a response interceptor
mAxios.interceptors.response.use(
    response => response,
    error => {
        if (typeof window !== "undefined" && error.response && error.response.status === 403) {
            localStorage.removeItem(authConfig.storageTokenKeyName);
            localStorage.removeItem('userData');
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default mAxios;