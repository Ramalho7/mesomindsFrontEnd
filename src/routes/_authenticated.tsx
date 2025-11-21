import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      if (location.pathname === '/login') {
        return
      }
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname
        },
      })
    }
  },
  component: () => <Outlet />,
})