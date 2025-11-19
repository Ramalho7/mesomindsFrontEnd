import Header from '@/components/Header/Header';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MockAuthProvider } from './mocks/MockAuthProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { AuthState } from '@/auth';
import { MockRouterProvider } from './mocks/MockRouterProvider';
import { within } from '@testing-library/dom';

const baseAuthValue: AuthState = {
  isAuthenticated: true,
  user: { nome: 'Usuário Teste', email: 'teste@email.com' } as any, 
  login: async () => {},
  logout: () => {},
  isLoading: false,
  register: async () => {},
};

const withProviders = (authValue: AuthState) => (Story: StoryFn, context: any) => (
  <MockRouterProvider>
    <SidebarProvider>
      <MockAuthProvider value={authValue}>
        {Story({}, context)}
      </MockAuthProvider>
    </SidebarProvider>
  </MockRouterProvider>
);

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const LoggedIn: StoryObj<typeof Header> = {
  decorators: [withProviders({ ...baseAuthValue, isAuthenticated: true })],
};

export const LoggedOut: StoryObj<typeof Header> = {
  decorators: [withProviders({ ...baseAuthValue, isAuthenticated: false, user: null })],
};