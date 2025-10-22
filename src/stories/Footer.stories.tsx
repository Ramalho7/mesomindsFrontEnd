import StoryFooter from './StoryFooter';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StoryFooter> = {
  title: 'Components/Footer',
  component: StoryFooter,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj<typeof StoryFooter> = {
  args: {
    
  },
};