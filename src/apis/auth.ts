import axios from 'axios'
import type {LoginRequest, SignUpRequest} from '../models/auth'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

export const login = async (data: LoginRequest) => {
    const response = await API.post('auth/login', data)
    return response.data
}

export const signup = (data: SignUpRequest) => API.post('auth/register', data)

export const signout = async () => {
    const response = await API.post('auth/logout')
    return response.data
}
