import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useAuth } from '@/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from '../components/Header/Header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/Sidebar/AppSidebar'
import Footer from '@/components/Footer/Footer'
import type { User } from '@/Interface/User'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

interface MyRouterContext {
  auth: AuthState
}

const queryClient = new QueryClient()

function RootComponent() {
  const { isAuthenticated } = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={false}>
        <div className="flex w-full">
          <AppSidebar />
          <div className="flex-1 w-full">
            <div className="min-h-screen flex flex-col">
              <Header isLoggedIn={isAuthenticated} />

              <div className="flex justify-center flex-1">
                <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1140px]">
                  <main>
                    <Outlet />
                  </main>
                </div>
              </div>
              
              <Footer/>
              
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
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})