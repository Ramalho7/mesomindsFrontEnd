import React from 'react';
import { type StoryFn, type Meta } from '@storybook/react';
import { Button, type ButtonProps } from '../components/Button';

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
      options: ['sm', 'md', 'lg'], 
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
        component: 'Componente de botão personalizável com variantes e tamanhos diferentes baseado em shadcn/ui'
      }
    }
  }
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args}>Texto do Botão</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  size: 'md',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Botão padrão com fundo primário, texto secundário, sombra secundária e borda secundária. No hover, muda para sombra e borda de ação.'
    }
  }
};

export const Action = Template.bind({});
Action.args = {
  variant: 'action',
  size: 'md',
};
Action.parameters = {
  docs: {
    description: {
      story: 'Botão de ação com fundo primário, texto de ação, sombra de ação e borda de ação. No hover, muda para sombra e borda secundária.'
    }
  }
};

export const Small = Template.bind({});
Small.args = {
  variant: 'default',
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  variant: 'default',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'default',
  size: 'lg',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'default',
  size: 'md',
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
  size: 'md',
};
AsLink.parameters = {
  docs: {
    description: {
      story: 'Exemplo de uso do botão como link usando a propriedade asChild.'
    }
  }
};

export const AllSizes: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
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
AllSizes.parameters = {
  docs: {
    description: {
      story: 'Comparação visual de todos os tamanhos disponíveis (sm, md, lg).'
    }
  }
};

export const AllVariants: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
    <Button variant="default" size="md">
      Default
    </Button>
    <Button variant="action" size="md">
      Action
    </Button>
  </div>
);
AllVariants.parameters = {
  docs: {
    description: {
      story: 'Comparação visual de todas as variantes disponíveis (default, action).'
    }
  }
};

export const InteractiveStates: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
    <Button variant="default" size="md">
      Default (hover me)
    </Button>
    <Button variant="action" size="md">
      Action (hover me)
    </Button>
    <Button variant="default" size="md" disabled>
      Disabled
    </Button>
  </div>
);
InteractiveStates.parameters = {
  docs: {
    description: {
      story: 'Estados interativos dos botões. Passe o mouse sobre os botões para ver os efeitos de hover definidos no CSS.'
    }
  }
};