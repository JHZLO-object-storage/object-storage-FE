import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8080/api/v1/user',
    withCredentials: true
})

export const getCurrentUser = () => API.get('/info')
