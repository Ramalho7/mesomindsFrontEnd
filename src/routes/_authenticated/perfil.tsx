import { useAuth } from '@/auth'
import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/perfil')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  console.log('User:', user)

  const handleLogout = () => {
    logout()
    navigate({ to: '/login', search: { redirect: '/' } }) 
  }

  if (!user) {
    return <div>Loading user data...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
        <p className="text-gray-600">
          Hello, <strong>{user?.nome}</strong>! You are successfully
          authenticated.
        </p>
        <p className="text-sm text-gray-500 mt-2">Email: {user?.email}</p>
      </div>
    </div>
  );
}
