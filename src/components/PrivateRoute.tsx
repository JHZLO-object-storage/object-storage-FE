// components/PrivateRoute.tsx
import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../apis/user'

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        getCurrentUser()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div>로딩 중...</div>

    return isAuthenticated ? element : <Navigate to="/login" />
}

export default PrivateRoute
