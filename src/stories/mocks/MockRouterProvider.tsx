import { RouterProvider, createRouter, RootRoute, Route } from '@tanstack/react-router';
import React from 'react';

export function MockRouterProvider({ children }: { children: React.ReactNode }) {
    const rootRoute = new RootRoute({
        component: () => <>{children}</>,
    });
    const route = new Route({
        getParentRoute: () => rootRoute,
        path: '/',
        component: () => <div>Home</div>,
    });
    const routeTree = rootRoute.addChildren([route]);
    const router = createRouter({ routeTree });

    return <RouterProvider router={router} />;
}