import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { UserDropdown } from './UserDropdown'
import { SidebarTrigger, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../Sidebar/AppSidebar'
import { useNavigationLinks } from '@/hooks/useNavigationLinks'
import { Menu } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean
}

export default function Header({ isLoggedIn }: HeaderProps) {
  const { links, isDashboard } = useNavigationLinks()

  return (
    <header className="w-full bg-white border-b border-action h-[100px]">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="sm:hidden">
              <SidebarTrigger className="p-2 rounded-md hover:bg-gray/10 text-black">
              </SidebarTrigger>    
          </div>

          <Link to={isDashboard ? '/dashboard' : '/'}>
            <div className="logoBrand w-[80px] h-[80px] rounded-full bg-gray"></div>
          </Link>

          <nav className="hidden sm:flex gap-12 text-2xl">
            {links.map((link: any) => (
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