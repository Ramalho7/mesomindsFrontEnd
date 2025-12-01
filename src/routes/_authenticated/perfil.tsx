import { useAuth } from "@/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export const Route = createFileRoute("/_authenticated/perfil")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Carregando dados do usuário...</div>;
  }

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">
          Olá, {user?.nome}, bem-vindo de volta!
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end" className="rounded-lg py-[8px] px-[8px] bg-primary border-1 shadow-lg "
          >
            <DropdownMenuItem
              onSelect={() => {
                  logout();
                  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
                  const isDashboard = hostname.startsWith("dashboard.") || hostname === "dashboard.localhost";
                  if (isDashboard) {
                    navigate({ to: "/loginDashboard", search: { redirect: "/" } });
                  } else {
                    navigate({ to: "/login", search: { redirect: "/" } });
                  }
                }}
              className="px-4 py-2 rounded-md text-destructive focus:outline-none focus:ring-0 hover:bg-muted"
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-center">Perfil do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarFallback className="text-3xl bg-accent text-accent-foreground">
                {getInitials(user.nome)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-secondary mb-2">{user.nome}</h2>
            <p className="text-sm text-gray-600 mb-4">{user.email}</p>
            <span className="bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
              {user.tipo === "ADM" ? "Administrador" : "Professor"}
            </span>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">E-mail:</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tipo de usuário:</p>
                <p className="font-semibold">
                  {user.tipo === "ADM" ? "Administrador" : "Professor"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Data de criação:</p>
                <p className="font-semibold">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("pt-BR")
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Badges:</p>
                <p className="font-semibold">Streak de 100 dias</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Turmas:</p>
                <p className="font-semibold">Turma 1, turma 2</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de questões respondidas:</p>
                <p className="font-semibold">45</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de simulados realizados:</p>
                  <p className="font-semibold">45</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
