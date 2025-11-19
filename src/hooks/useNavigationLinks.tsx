import { useContext, useEffect, useState, createContext } from "react";

export type NavigationLink = { to: string; label: string };

export const NavigationLinksContext = createContext<{
  links: NavigationLink[];
  isDashboard: boolean;
} | null>(null);

export function useNavigationLinks() {
  const contextValue = useContext(NavigationLinksContext);
  const [isDashboard, setIsDashboard] = useState(false);

  if (contextValue) {
    return contextValue;
  }

  useEffect(() => {
    const hostname = window.location.hostname;
    setIsDashboard(
      hostname.startsWith("dashboard.") || hostname === "dashboard.localhost",
    );
  }, []);

  const publicLinks: NavigationLink[] = [
    { to: "/simulados", label: "Simulados" },
    { to: "/questoes", label: "Questões" },
    { to: "/conteudos", label: "Conteúdos" },
    { to: "/provas", label: "Provas" },
  ];

  const dashboardLinks: NavigationLink[] = [
    { to: "/question", label: "Questões" },
    { to: "/content", label: "Conteúdos" },
    { to: "/questionCollection/", label: "Coleção de questões"}
  ];

  const links: NavigationLink[] = isDashboard ? dashboardLinks : publicLinks;

  return { links, isDashboard };
}

