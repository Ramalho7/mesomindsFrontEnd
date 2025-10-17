import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: () => {
    const hostname = window.location.hostname
    if (!hostname.startsWith('dashboard.') && hostname !== 'dashboard.localhost') {
      throw redirect({ to: '/' })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}