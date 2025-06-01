import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
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
