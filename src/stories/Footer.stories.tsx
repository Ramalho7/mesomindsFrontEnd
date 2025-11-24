import Footer from '@/components/Footer/Footer';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { MockRouterProvider } from './mocks/MockRouterProvider';
import { MockAuthProvider } from './mocks/MockAuthProvider';
import { SidebarProvider } from '@/components/ui/sidebar';

const baseAuthValue = {
  isAuthenticated: true,
  user: { nome: 'Usuário Teste', email: 'teste@email.com' },
  login: async () => {},
  logout: () => {},
  isLoading: false,
  register: async () => {},
};

const withProviders = (authValue: any) => (Story: StoryFn, context: any) => (
  <MockRouterProvider>
    <SidebarProvider>
      <MockAuthProvider value={authValue}>
        {Story({}, context)}
      </MockAuthProvider>
    </SidebarProvider>
  </MockRouterProvider>
);

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  decorators: [withProviders(baseAuthValue)],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<typeof Footer> = {};