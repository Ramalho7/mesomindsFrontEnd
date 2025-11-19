import { AppSidebar } from '@/components/Sidebar/AppSidebar';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { MockAuthProvider } from './mocks/MockAuthProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MockRouterProvider } from './mocks/MockRouterProvider';
import { MockNavigationLinksProvider } from './mocks/MockNavigationLinksProvider';

const baseAuthValue = {
  isAuthenticated: true,
  user: { nome: 'Usuário Teste', email: 'teste@email.com' },
  login: async () => { },
  logout: () => { },
  isLoading: false,
  register: async () => { },
};

const withProviders = (authValue: any) => (Story: StoryFn, context: any) => (
  <MockRouterProvider>
    <SidebarProvider>
      <MockAuthProvider value={authValue}>
        <MockNavigationLinksProvider>
          {Story({}, context)}
        </MockNavigationLinksProvider>
      </MockAuthProvider>
    </SidebarProvider>
  </MockRouterProvider>
);

const meta: Meta<typeof AppSidebar> = {
  title: 'Components/AppSidebar',
  component: AppSidebar,
  decorators: [withProviders(baseAuthValue)],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj<typeof AppSidebar> = {};

export const NotAuthenticated: StoryObj<typeof AppSidebar> = {
  decorators: [withProviders({ ...baseAuthValue, isAuthenticated: false, user: null })],
};