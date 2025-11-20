import { useAuth } from "@/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useNavigationLinks } from "@/hooks/useNavigationLinks";
import { Link } from "@tanstack/react-router";

export function AppSidebar() {
  const { links } = useNavigationLinks();
  const { isAuthenticated } = useAuth();

  return (
    <nav aria-label="Abrir menu lateral" className="lg:hidden">
      <Sidebar collapsible="offcanvas" data-testid="app-sidebar">
        <SidebarHeader>
          <div className="flex flex-row items-center mt-8 gap-4">
            <div className="w-20 h-20 rounded-full bg-black"></div>
            <div className="text-center">Nome usuário</div>
          </div>
        </SidebarHeader>

        <SidebarContent data-testid="sidebar-content">
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarMenu>
              {links && links.length > 0 ? (
                links.map((link) => (
                  <SidebarMenuItem key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm block px-4 py-2 hover:bg-gray-100"
                    >
                      {link.label}
                    </Link>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="p-4">Nenhum link disponível</div>
              )}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator />
        </SidebarContent>

        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              {isAuthenticated && (
                <button
                  className="text-red-500 bg-red-100 w-full text-left px-4 py-2 rounded hover:bg-red-200"
                  data-testid="sidebar-logout-button"
                >
                  Sair
                </button>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </nav>
  );
}

