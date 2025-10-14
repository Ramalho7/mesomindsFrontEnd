import React from 'react';
import { Button } from '../components/ui/button';

interface StyledHeaderProps {
  isLoggedIn: boolean;
}

const StyledHeader: React.FC<StyledHeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="sticky top-0 bg-white flex justify-between items-center h-[100px] border-b border-action w-full">
      <div className="logoBrand w-[80px] h-[80px] rounded-full bg-gray"></div>
      <nav className="flex gap-[3.125rem] text-2xl">
        <span>Simulados</span>
        <span>Questões</span>
        <span>Conteúdos</span>
        <span>Provas</span>
        <span>Turmas</span>
      </nav>
      {isLoggedIn ? (
        <Button variant="action">Logout</Button>
      ) : (
        <Button variant="action">Entrar</Button>
      )}
    </header>
  );
};

export default StyledHeader;