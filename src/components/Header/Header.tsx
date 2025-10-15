import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { UserDropdown } from './UserDropdown';

interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <>
      <header className="w-full bg-white border-b border-action h-[100px]">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="logoBrand w-[80px] h-[80px] rounded-full bg-gray"></div>

            <nav className="flex gap-12 text-2xl">
              <Link to="/simulados">Simulados</Link>
              <Link to="/questoes">Questões</Link>
              <Link to="/conteudos">Conteúdos</Link>
              <Link to="/provas">Provas</Link>
              <Link to="/turmas">Turmas</Link>
            </nav>

            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <Button variant="action">Entrar</Button>
            )}
          </div>
        </div>
      </header>
    </>
  )
}