import { StorySidebar } from './StorySidebar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StorySidebar> = {
  title: 'Components/Sidebar',
  component: StorySidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj<typeof StorySidebar> = {
  args: {
    username: 'Nome usuário',
    links: [
      { to: '/simulados', label: 'Simulados' },
      { to: '/questoes', label: 'Questões' },
      { to: '/conteudos', label: 'Conteúdos' },
      { to: '/provas', label: 'Provas' },
      { to: '/turmas', label: 'Turmas' },
    ],
  },
};

export const Dashboard: StoryObj<typeof StorySidebar> = {
  args: {
    username: 'Admin',
    links: [
      { to: '/questoes', label: 'Questões' },
      { to: '/content/contents', label: 'Conteúdos' },
      { to: '/usuarios', label: 'Usuários' },
    ],
  },
};

export const WithLongUsername: StoryObj<typeof StorySidebar> = {
  args: {
    username: 'João da Silva Santos',
    links: [
      { to: '/simulados', label: 'Simulados' },
      { to: '/questoes', label: 'Questões' },
      { to: '/conteudos', label: 'Conteúdos' },
    ],
  },
};

export const isAuthenticatedTrue: StoryObj<typeof StorySidebar> = {
  args: {
    username: 'João da Silva Santos',
    isAuthenticated: true,
    links: [
      { to: '/simulados', label: 'Simulados' },
      { to: '/questoes', label: 'Questões' },
      { to: '/conteudos', label: 'Conteúdos' },
    ],
  },
};