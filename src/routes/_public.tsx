import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  useEffect(() => {
    const hostname = window.location.hostname

    if (hostname.startsWith('dashboard.')) {
      const mainDomain = hostname.replace('dashboard.', '')
      const currentPath = window.location.pathname
      window.location.href = `${window.location.protocol}//${mainDomain}:${window.location.port}${currentPath}`
    } else if (hostname === 'dashboard.localhost') {
      const currentPath = window.location.pathname
      window.location.href = `${window.location.protocol}//localhost:${window.location.port}${currentPath}`
    }
  }, [])

  return (
      <Outlet />
  )
}