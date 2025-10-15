import React from 'react';
import StyledHeader from './StoryHeader';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StyledHeader> = {
  title: 'Components/StyledHeader',
  component: StyledHeader,
};

export default meta;

export const LoggedIn: StoryObj<typeof StyledHeader> = {
  args: {
    isLoggedIn: true,
  },
};

export const LoggedOut: StoryObj<typeof StyledHeader> = {
  args: {
    isLoggedIn: false,
  },
};