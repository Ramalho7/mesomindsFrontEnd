import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { UserDropdown } from './UserDropdown'
import { useNavigationLinks } from '@/hooks/useNavigationLinks'
import { SidebarTrigger } from '../ui/sidebar'
import { useAuth } from '@/auth'

export default function Header() {
  const { links, isDashboard } = useNavigationLinks()
  const { isAuthenticated } = useAuth();

  return (
    <header className="w-full bg-white border-b border-accent h-[100px]">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <SidebarTrigger className="sm:hidden" />
          <Link to={isDashboard ? '/dashboard' : '/'}>
            <div className="logoBrand w-[80px] h-[80px] rounded-full bg-gray-800"></div>
          </Link>

          <nav className="hidden sm:flex gap-12 text-2xl">
            {links.map((link: NavigationLink) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <Link to='/login' search={{ redirect: '/perfil' }}><Button variant="action">Entrar</Button></Link>
          )}
        </div>
      </div>
    </header>
  )
}