import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PublicRoute() {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (user?.id) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export default PublicRoute