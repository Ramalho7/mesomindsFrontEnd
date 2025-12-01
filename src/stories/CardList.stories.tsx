import type { Meta, StoryFn } from "@storybook/react";
import CardList from "../components/CardList/CardList";
import { Delete, Edit, Lightbulb } from "lucide-react";
import { MockRouterProvider } from "./mocks/MockRouterProvider";

export default {
    title: "Components/CardList",
    component: CardList,
    decorators: [
        (Story) => (
            <MockRouterProvider>
                <Story />
            </MockRouterProvider>
        ),
    ],
} as Meta<typeof CardList>;

const Template: StoryFn<typeof CardList> = (args) => <CardList {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "1",
    title: "Simulado de Matemática",
    cardInfoName: "Questões Disponíveis",
    cardInfoNumber: 20,
    description: "Teste seus conhecimentos com este simulado de matemática. Ideal para revisar álgebra e geometria.",
    type: "Simulado",
    creationDate: "2025-12-01",
    lastUpdateDate: "2025-12-01",
    creator: "Equipe Mesominds",
    tagsName: ["Simulado", "Matemática", "Revisão"],
    titleCardDialog: "Informações do Simulado",
    descriptionCardDialog: "Este simulado contém questões de nível intermediário. Reserve 30 minutos para completá-lo.",
    confirmTextCardDialog: "Começar Simulado",
    cancelTextCardDialog: "Cancelar",
    buttonContentCardDialog: "Ver Mais",
    submitActionCardDialog: () => {
        console.log("Simulado iniciado!");
    },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    id: "2",
    title: "Resumo do Simulado de Física",
    cardInfoName: "Questões Disponíveis",
    cardInfoNumber: 15,
    description: "Confira este simulado de física com foco em cinemática e dinâmica. Ideal para revisar conceitos básicos.",
    type: "Simulado",
    creationDate: "2025-12-01",
    lastUpdateDate: "2025-12-01",
    creator: "Equipe Mesominds",
    tagsName: ["Simulado", "Física", "Cinemática"],
    editLink: "/edit/2",
    titleCardDialog: "Informações do Simulado",
    descriptionCardDialog: "Este simulado contém questões de nível básico. Reserve 20 minutos para completá-lo.",
    buttonContentCardDialog: <Lightbulb size={24}/>,
    cancelTextCardDialog: "Voltar",
    buttonContentSROnlyCardDialog: "Botão ver mais informações do simulado",
    submitActionCardDialog: () => {
        console.log("Simulado iniciado!");
    },
};

export const WithIconAdmin = Template.bind({});
WithIconAdmin.args = {
    id: "2",
    isAdmin: true,
    title: "Resumo do Simulado de Física",
    cardInfoName: "Questões Disponíveis",
    cardInfoNumber: 15,
    description: "Confira este simulado de física com foco em cinemática e dinâmica. Ideal para revisar conceitos básicos.",
    type: "Simulado",
    creationDate: "2025-12-01",
    lastUpdateDate: "2025-12-01",
    creator: "Equipe Mesominds",
    tagsName: ["Simulado", "Física", "Cinemática"],
    editLink: "/edit/2",
    editContent: <Edit size={24} />,
    titleCardDialog: "Informações do Simulado",
    descriptionCardDialog: "Este simulado contém questões de nível básico. Reserve 20 minutos para completá-lo.",
    confirmTextCardDialog: "Começar Simulado",
    cancelTextCardDialog: "Cancelar",
    buttonContentCardDialog: <Delete size={24} />,
    buttonContentSROnlyCardDialog: "Botão excluir simulado",
    submitActionCardDialog: () => {
        console.log("Simulado iniciado!");
    },
};