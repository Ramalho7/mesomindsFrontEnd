import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const expectedHost =
  import.meta.env.VITE_DASHBOARD_HOST || "dashboard.localhost";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: async ({ context, location }) => {
    const { auth } = context;

    if (!auth.isAuthenticated) {

      if (location.pathname === "/loginDashboard") {
        return
      }

      throw redirect({
        to: "/loginDashboard",
        search: {
          redirect: location.pathname,
        },
      });
    }


    const user = auth.user;

    const allowedTypes = ["ADM", "Moderador", "Operador"] as const;
    if (!user?.tipo || !allowedTypes.some((type) => user.tipo === type)) {
      throw redirect({ to: "/" });
    }

    const hostname = window.location.hostname;
    if (!hostname.startsWith("dashboard.") && hostname !== expectedHost) {
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