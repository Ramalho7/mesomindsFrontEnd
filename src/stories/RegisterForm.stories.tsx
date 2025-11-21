import RegisterForm from "@/components/RegisterForm/RegisterForm";
import type { AuthState } from "@/auth";
import { MockRouterProvider } from "./mocks/MockRouterProvider";
import type { Meta, StoryFn } from "@storybook/react";
import { MockAuthProvider } from "./mocks/MockAuthProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import { PayloadRegisterSchema, type PayloadRegisterSchemaType } from "@/service/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const baseAuthValue: AuthState = {
    isAuthenticated: true,
    user: { nome: "Usuário Teste", email: "teste@email.com" } as any,
    login: async () => { },
    logout: () => { },
    isLoading: false,
    register: async () => { },
};

const withProviders =
    (authValue: AuthState) => (Story: StoryFn, context: any) => (
        <MockRouterProvider>
            <SidebarProvider>
                <MockAuthProvider value={authValue}>
                    {Story({}, context)}
                </MockAuthProvider>
            </SidebarProvider>
        </MockRouterProvider>
    );

const meta: Meta<typeof RegisterForm> = {
    title: "Components/RegisterForm",
    component: RegisterForm,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [withProviders(baseAuthValue)],
};

export default meta;

const Template: StoryFn<typeof RegisterForm> = () => {
    const form = useForm<PayloadRegisterSchemaType>({
        resolver: zodResolver(PayloadRegisterSchema),
        defaultValues: {
            nome: "",
            email: "",
            password: "",
            password_confirmation: "",
            tipo: "Aluno",
        },
    });

    const { register, handleSubmit, control, formState } = form;

    const onSubmit = (data: PayloadRegisterSchemaType) => {
        // console.log("submitted:", data);
    };

    const onError = (errors: any) => {
        // console.log("errors:", errors);
    };

    return (
        <RegisterForm
            register={register}
            handleSubmit={handleSubmit}
            control={control}
            errors={formState.errors}
            isLoading={false}
            onSubmit={onSubmit}
            onError={onError}
        />
    );
};

export const Default = Template.bind({});
Default.storyName = "Default";