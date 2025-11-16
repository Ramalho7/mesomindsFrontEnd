import React from "react";
import { Button } from "../components/ui/button";
import { UserDropdown } from "./UserDropdown";
import { Menu } from "lucide-react";

interface StyledHeaderProps {
  isAuthenticated: boolean;
  links?: string[];
}

const StyledHeader: React.FC<StyledHeaderProps> = ({
  isAuthenticated,
  links = ['Simulados', 'Questões', 'Conteúdos', 'Provas', 'Turmas'],
}) => {
  return (
    <>
      <header className="bg-white flex justify-between items-center h-[100px] border-b border-action w-full px-4 sm:px-6 lg:px-8">
        <div className="sm:hidden">
          <Menu className="w-12 h-12 p-2 rounded-md hover:bg-gray-100 text-black" strokeWidth={2.5}/>
        </div>

        <div className="logoBrand w-[80px] h-[80px] rounded-full bg-gray"></div>

        <nav className="hidden sm:flex gap-[3.125rem] text-2xl">
          {links.map((link, index) => (
            <span key={index}>{link}</span>
          ))}
        </nav>

        {isAuthenticated ? (
          <UserDropdown />
        ) : (
          <Button variant="action">Entrar</Button>
        )}
      </header>
    </>
  );
};

export default StyledHeader;
