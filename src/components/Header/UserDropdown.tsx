import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/auth";

export function UserDropdown() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login', search: { redirect: '/' } }) 
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FaUserCircle className="w-[3.75rem] h-[3.75rem] cursor-pointer text-gray-700 hover:text-gray-900" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[19.75rem] border-2 border-accent mt-2"
        align="end"
      >
        <DropdownMenuItem asChild>
          <Link to="/perfil" className="!text-lg w-full h-full flex items-center">
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/configuracoes"
            className="!text-lg w-full h-full flex items-center"
          >
            Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/flashcards" className="!text-lg w-full h-full flex items-center">
            Flashcards
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className="data-[highlighted]:bg-red-100 data-[highlighted]:text-red-600 !text-base text-red-700 w-full h-full flex items-center" onClick={handleLogout}>
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}