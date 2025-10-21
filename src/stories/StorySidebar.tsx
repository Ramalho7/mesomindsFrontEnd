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
    SidebarProvider,
} from "@/components/ui/sidebar"
import { useState } from "react";

interface StorySidebarProps {
    links?: { to: string; label: string }[]
    username?: string
    isLoggedIn: boolean
}

export function StorySidebar({
    links = [
        { to: '/simulados', label: 'Simulados' },
        { to: '/questoes', label: 'Questões' },
        { to: '/conteudos', label: 'Conteúdos' },
        { to: '/provas', label: 'Provas' },
        { to: '/turmas', label: 'Turmas' },
    ],
    username = 'Nome usuário',
    isLoggedIn = false,
}: StorySidebarProps) {

    return (
        <SidebarProvider defaultOpen={true}>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex flex-row items-center mt-8 gap-4">
                        <div className="w-20 h-20 rounded-full bg-black"></div>
                        <div className="text-center">{username}</div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarSeparator />
                    <SidebarGroup>
                        <SidebarMenu className="space-y-4">
                            {links.map((link) => (
                                <SidebarMenuItem key={link.to}>
                                    <SidebarMenuButton asChild className="text-xl">
                                        <a href={link.to}>
                                            {link.label}
                                        </a>
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
                                    {isLoggedIn &&
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
        </SidebarProvider>
    )
}
