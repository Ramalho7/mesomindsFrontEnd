import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { UserDropdown } from './UserDropdown'
import { useEffect, useState } from 'react'
import { SidebarTrigger } from '../ui/sidebar'

interface HeaderProps {
  isLoggedIn: boolean
}

export default function Header({ isLoggedIn }: HeaderProps) {
  const [isDashboard, setIsDashboard] = useState(false)

  useEffect(() => {
    const hostname = window.location.hostname
    setIsDashboard(hostname.startsWith('dashboard.') || hostname === 'dashboard.localhost')
  }, [])

  const publicLinks = [
    { to: '/simulados', label: 'Simulados' },
    { to: '/questoes', label: 'Questões' },
    { to: '/conteudos', label: 'Conteúdos' },
    { to: '/provas', label: 'Provas' },
    { to: '/turmas', label: 'Turmas' },
  ]

  const dashboardLinks = [
    { to: '/questoes', label: 'Questões' },
    { to: '/content/contents', label: 'Conteúdos' },
    { to: '/usuarios', label: 'Usuários' },
  ]

  const links = isDashboard ? dashboardLinks : publicLinks

  return (
    <header className="w-full bg-white border-b border-action h-[5rem]">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 h-full">
        <div className="relative flex items-center justify-between h-full">
          <div className="sm:hidden">
            <SidebarTrigger className="p-2 rounded-md hover:bg-gray/10" />
          </div>

          <Link
            to={isDashboard ? '/dashboard' : '/'}
            className="sm:static absolute left-1/2 transform -translate-x-1/2 sm:transform-none"
          >
            <div className="logoBrand w-[3.75rem] h-[3.75rem] rounded-full bg-gray"></div>
          </Link>

          <nav className="hidden sm:flex gap-12 text-lg">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <Button variant="action">Entrar</Button>
          )}
        </div>
      </div>
    </header>
  )
}