import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'

interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {

  return (
    <>
      <header className='sticky top-0 bg-white flex justify-between items-center h-[100px] border-b border-action w-full'>
        <div className="logoBrand w-[80px] h-[80px] rounded-full bg-gray"></div>
        <nav className="flex gap-[3.125rem] text-2xl">
          <Link to="/simulados">
            Simulados
          </Link>
          <Link to="/questoes">
            Questões
          </Link>
          <Link to="/conteudos">
            Conteúdos
          </Link>
          <Link to="/provas">
            Provas
          </Link>
          <Link to="/turmas">
            Turmas
          </Link>
        </nav>

        {isLoggedIn ? (
          <Button variant={"action"}>Logout</Button>
        ) : (
          <Button variant={"action"}>Entrar</Button>
        )
}
      </header>
    </>
  )
}
