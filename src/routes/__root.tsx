import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/Sidebar/AppSidebar'

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <div className="min-h-screen">
        <Header isLoggedIn={true} />
        <div className="flex justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1140px]">
            <AppSidebar />
            <main>
              <Outlet />
            </main>
          </div>
        </div>

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </div>
    </SidebarProvider>
  ),
})