import React from 'react';
import { type StoryFn, type Meta } from '@storybook/react';
import StyledHeader from './StoryHeader';

export default {
  title: 'Components/StyledHeader',
  component: StyledHeader,
} as Meta<typeof StyledHeader>;

const Template: StoryFn<typeof StyledHeader> = (args) => <StyledHeader {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isLoggedIn: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  isLoggedIn: false,
};