import axios from 'axios'
import type {LoginRequest, SignUpRequest} from '../models/auth'

const API = axios.create({
    baseURL: 'http://localhost:8080/api/v1/auth',
    withCredentials: true
})

export const login = async (data: LoginRequest) => {
    const response = await API.post('/login', data)
    return response.data
}

export const signup = (data: SignUpRequest) => API.post('/register', data)

export const signout = async () => {
    const response = await API.post('/logout')
    return response.data
}
