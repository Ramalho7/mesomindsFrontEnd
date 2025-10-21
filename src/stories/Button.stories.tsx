import React from 'react';
import { type StoryFn, type Meta } from '@storybook/react';
import { Button } from '../components/ui/button'; 

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'action'], 
      description: 'Variante visual do botão'
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'], 
      description: 'Tamanho do botão'
    },
    asChild: {
      control: 'boolean',
      description: 'Renderiza como outro elemento'
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado do botão'
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de botão do shadcn/ui personalizado com variantes customizadas'
      }
    }
  }
} as Meta<typeof Button>;

type ButtonProps = React.ComponentProps<typeof Button>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args}>Texto do Botão</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  size: 'default',
};

export const Action = Template.bind({});
Action.args = {
  variant: 'action',
  size: 'default',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'default',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'default',
  size: 'lg',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'default',
  size: 'default',
  disabled: true,
};

export const AsLink: StoryFn<ButtonProps> = (args) => (
  <Button {...args} asChild>
    <a href="#" style={{ textDecoration: 'none' }}>
      Link como botão
    </a>
  </Button>
);
AsLink.args = {
  variant: 'action',
  size: 'default',
};

export const AllSizes: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
    <Button variant="default" size="default">
      Default
    </Button>
    <Button variant="default" size="sm">
      Pequeno
    </Button>
    <Button variant="default" size="md">
      Médio
    </Button>
    <Button variant="default" size="lg">
      Grande
    </Button>
  </div>
);

export const AllVariants: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
    <Button variant="default" size="default">
      Default
    </Button>
    <Button variant="action" size="default">
      Action
    </Button>
    <Button variant="destructive" size="default">
      Destructive
    </Button>
  </div>
);

export const InteractiveStates: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
    <Button variant="default" size="default">
      Default (hover me)
    </Button>
    <Button variant="action" size="default">
      Action (hover me)
    </Button>
    <Button variant="default" size="default" disabled>
      Disabled
    </Button>
  </div>
);