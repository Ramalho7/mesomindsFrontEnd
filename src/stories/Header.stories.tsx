import StyledHeader from './StoryHeader';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StyledHeader> = {
  title: 'Components/Header',
  component: StyledHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const LoggedIn: StoryObj<typeof StyledHeader> = {
  args: {
    isLoggedIn: true,
    links: ['Simulados', 'Questões', 'Conteúdos', 'Provas', 'Turmas'],
  },
};

export const LoggedOut: StoryObj<typeof StyledHeader> = {
  args: {
    isLoggedIn: false,
    links: ['Simulados', 'Questões', 'Conteúdos', 'Provas', 'Turmas'],
  },
};

export const Dashboard: StoryObj<typeof StyledHeader> = {
  args: {
    isLoggedIn: true,
    links: ['Questões', 'Conteúdos', 'Usuários'],
  },
};