import { CardDialog } from "@/components/AlertDialog/CardDialog";
import type { Meta, StoryFn } from "@storybook/react";

export default {
    title: "Components/CardDialog",
    component: CardDialog,
} as Meta<typeof CardDialog>;

const Template: StoryFn<typeof CardDialog> = (args) => <CardDialog {...args} />;
export const Default = Template.bind({});
Default.args = {
    title: "Confirmar ação",
    description: "Você tem certeza que deseja continuar?",
    confirmText: "Sim",
    cancelText: "Não",
    buttonContent: "Abrir Diálogo",
    submitAction: () => console.log("Ação confirmada!"),
};