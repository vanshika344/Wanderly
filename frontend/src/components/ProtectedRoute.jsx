import { Navigate } from "react-router-dom"
import { useAuth } from "../AuthContext"

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <p className="p-10 text-center text-sm text-[#5c534c]">Loading...</p>
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
