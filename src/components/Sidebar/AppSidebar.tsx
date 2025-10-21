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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Link } from "@tanstack/react-router"
import { ChevronUp, User2 } from "lucide-react"
import { Button } from "../ui/button"

export function AppSidebar() {
    const { links } = useNavigationLinks()

    return (
        <Sidebar >
            <SidebarHeader>
                <div className="flex flex-row items-center mt-8 gap-4">
                    <div className="w-20 h-20 rounded-full bg-black"></div>
                    <div className="text-center">Nome usuário</div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarMenu className="space-y-4">
                        {links && links.map((link: any) => (
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