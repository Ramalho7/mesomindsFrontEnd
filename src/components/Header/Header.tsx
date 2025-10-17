import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { UserDropdown } from './UserDropdown'
import { useEffect, useState } from 'react'

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
    <header className="w-full bg-white border-b border-action h-[100px]">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to={isDashboard ? '/dashboard' : '/'}>
            <div className="logoBrand w-[80px] h-[80px] rounded-full bg-gray"></div>
          </Link>

          <nav className="flex gap-12 text-2xl">
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