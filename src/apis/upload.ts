import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

export const uploadFile = (file: File, permission: string, password?: string) => {
    const formData = new FormData()
    formData.append('file', file)

    const params: any = {permission}
    if (permission === 'SECRET' && password) {
        params.password = password
    }

    return API.post('/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
        params,
    })
}
