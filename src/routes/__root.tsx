import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header/Header'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <Header isLoggedIn={false}/>
      <div className="flex justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1140px]">
          <Outlet />
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
  ),
})