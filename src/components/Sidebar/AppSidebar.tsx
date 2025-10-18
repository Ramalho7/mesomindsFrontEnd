import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "lucide-react";

export function AppSidebar() {

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                {links && links.map((link) => (
                    <SidebarGroup >
                        <Link key={link.to} to={link.to} className="block py-2 px-3 rounded hover:bg-gray/10">
                            {link.label}
                        </Link>
                    </SidebarGroup>
                ))}
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}