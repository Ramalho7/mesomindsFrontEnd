import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

declare module 'axios' {
    export interface AxiosRequestConfig{
        skipAuth?: boolean;
    }
}

api.interceptors.request.use(
    (config) => {
        if(!config.skipAuth){
        const token = localStorage.getItem('auth-token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;