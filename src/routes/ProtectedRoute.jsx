import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const auth = useAuth()

  if (!auth) {
    return (
      <div className="min-h-screen bg-[#000D38] text-white flex items-center justify-center">
        Cargando autenticación...
      </div>
    )
  }

  const { user, loading } = auth

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000D38] text-white flex items-center justify-center">
        Cargando...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return children
}