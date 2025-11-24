import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'feature'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  args: {
    variant: 'default',
    size: 'md',
    className: 'w-[250px] h-[250px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>This is a default card description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Default card content goes here.</p>
        </CardContent>
        <CardFooter>
          <p>Default card footer.</p>
        </CardFooter>
      </>
    ),
  },
};

export const Feature: StoryObj<typeof Card> = {
  args: {
    variant: 'feature',
    size: 'lg',
    className: 'w-[250px] h-auto',
    children: (
      <>
        <CardHeader>
          <CardTitle>Feature Card</CardTitle>
          <CardDescription>This is a feature card description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Feature card content goes here. It highlights the unique features of this card.</p>
        </CardContent>
        <CardFooter>
          <p>Feature card footer with additional actions.</p>
        </CardFooter>
      </>
    ),
  },
};

export const Small: StoryObj<typeof Card> = {
  args: {
    variant: 'default',
    size: 'sm',
    className: 'w-[250px] h-[250px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>This is a small card description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Small card content goes here.</p>
        </CardContent>
        <CardFooter>
          <p>Small card footer.</p>
        </CardFooter>
      </>
    ),
  },
};