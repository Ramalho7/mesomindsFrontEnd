import React from 'react';
import { NavigationLinksContext, type NavigationLink } from '@/hooks/useNavigationLinks';

interface MockNavigationLinksProviderProps {
  children: React.ReactNode;
  isDashboard?: boolean;
}

export function MockNavigationLinksProvider({ 
  children, 
  isDashboard = false 
}: MockNavigationLinksProviderProps) {
  const links: NavigationLink[] = [
    { to: '/simulados', label: 'Simulados' },
    { to: '/questoes', label: 'Questões' },
    { to: '/conteudos', label: 'Conteúdos' },
    { to: '/provas', label: 'Provas' },
    { to: '/turmas', label: 'Turmas' },
  ];

  return (
    <NavigationLinksContext.Provider value={{ links, isDashboard }}>
      {children}
    </NavigationLinksContext.Provider>
  );
}