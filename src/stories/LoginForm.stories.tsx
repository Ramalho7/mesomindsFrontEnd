import type { AuthState } from "@/auth";
import { MockRouterProvider } from "./mocks/MockRouterProvider";
import type { Meta, StoryFn } from "@storybook/react";
import { MockAuthProvider } from "./mocks/MockAuthProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginForm from "@/components/LoginForm/LoginForm";
import { PayloadLoginShema } from "@/service/schemas/loginSchema";

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
                    <main>
                        {Story({}, context)}
                    </main>
                </MockAuthProvider>
            </SidebarProvider>
        </MockRouterProvider>
    );

const meta: Meta<typeof LoginForm> = {
    title: "Components/LoginForm",
    component: LoginForm,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [withProviders(baseAuthValue)],
};

export default meta;

const Template: StoryFn<typeof LoginForm> = (args) => {
    const form = useForm<{ email: string; password: string }>({
        resolver: zodResolver(PayloadLoginShema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { register, handleSubmit, formState } = form;

    const onSubmit = () => {
        // console.log("submitted:", data);
    };

    const onError = () => {
        // console.log("errors:", errors);
    };

    return (
        <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            errors={formState.errors} 
            isLoading={false}
            onSubmit={onSubmit}
            onError={onError}
            showRegisterLink={args.showRegisterLink} 
        />
    );
};

export const Default = Template.bind({});
Default.storyName = "Default";
Default.args = {
    showRegisterLink: true, 
};

export const AdminSection = Template.bind({});
AdminSection.storyName = "AdminSection";
AdminSection.args = {
    showRegisterLink: false,
};