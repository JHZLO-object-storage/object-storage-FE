// utils/auth.ts
export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken') // 또는 sessionStorage 등
}
