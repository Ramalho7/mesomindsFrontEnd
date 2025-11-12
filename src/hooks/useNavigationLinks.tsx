import { useEffect, useState } from "react";

export function useNavigationLinks() {
  const [isDashboard, setIsDashboard] = useState(false);

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
    { to: "/content/contents", label: "Conteúdos" },
    { to: "/questionCollection/", label: "Coleção de questões"}
  ];

  const links: NavigationLink[] = isDashboard ? dashboardLinks : publicLinks;

  return { links, isDashboard };
}

