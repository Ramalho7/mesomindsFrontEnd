import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { expectedHost } from './_dashboard'

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
    } else if (hostname === expectedHost) {
      const currentPath = window.location.pathname
      window.location.href = `${window.location.protocol}//${expectedHost}:${window.location.port}${currentPath}`
    }
  }, [])

  return (
      <Outlet />
  )
}