import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

export const getCurrentUser = () => API.get('user/info')
