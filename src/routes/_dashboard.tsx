import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: async ({ context }) => {
    const { auth } = context;

    if (!auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    const user = auth.user;

    if (!auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    const allowedTypes = ["ADM", "Moderador", "Operador"] as const;
    if (!user?.tipo || !allowedTypes.some((type) => user.tipo === type)) {
      throw redirect({ to: "/" });
    }

    const hostname = window.location.hostname;
    if (
      !hostname.startsWith("dashboard.") &&
      hostname !== "dashboard.localhost"
    ) {
      throw redirect({ to: "/" });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}