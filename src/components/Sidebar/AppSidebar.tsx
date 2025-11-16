import { useAuth } from "@/auth"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"
import { Link } from "@tanstack/react-router"

export function AppSidebar() {
    const { links } = useNavigationLinks()
    const { isAuthenticated } = useAuth();

    return (
        <Sidebar 
            collapsible="offcanvas"
            className="lg:hidden"
        >
            <SidebarHeader>
                    <div className="flex flex-row items-center mt-8 gap-4">
                        <div className="w-20 h-20 rounded-full bg-black"></div>
                        <div className="text-center">Username</div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarSeparator />
                    <SidebarGroup>
                        <SidebarMenu className="space-y-4">
                            {links.map((link) => (
                                <SidebarMenuItem key={link.to}>
                                    <SidebarMenuButton asChild className="text-xl">
                                        <Link to={link.to}>
                                            {link.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarSeparator />
                    <SidebarGroup>
                        <SidebarMenu className="space-y-4">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="text-xl">
                                    {isAuthenticated &&
                                        <a href="#">Perfil</a>
                                    }
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild className="text-xl">
                                    <a href="#">Configurações</a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="text-red-500 bg-red-200 w-full text-left">
                                <button>
                                    Sair
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
        </Sidebar>
    )
}