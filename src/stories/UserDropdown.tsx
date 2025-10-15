import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FaUserCircle className="w-[5rem] h-[5rem] cursor-pointer text-gray-700 hover:text-gray-900" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[18.75rem] border-2 border-action"
        align="end"
      >
        <DropdownMenuItem className="text-lg">Perfil</DropdownMenuItem>
        <DropdownMenuItem className="text-lg">Configurações</DropdownMenuItem>
        <DropdownMenuItem className="text-lg">Flashcard</DropdownMenuItem>
        <DropdownMenuItem className="text-lg">Turmas</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="data-[highlighted]:bg-red-100 data-[highlighted]:text-red-600 text-base text-red-700">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
