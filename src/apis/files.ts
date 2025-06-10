import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

export const getFileList = async () => {
    const response = await API.get('/files')
    return response.data
}

export const getFileDetail = async (id: string) => {
    const response = await API.get(`/files/${id}`)
    return response.data
}

export const deleteFile = async (id: string) => {
    const response = await API.delete(`/files/${id}`)
    return response.data
}

export const updateFilePermission = async (id: string, permission: string, password?: string) => {
    const response = await API.put(`/files/${id}/permission`, {
        permission,
        password: password || ''
    })
    return response.data
}
