import { useState } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { PayloadRegisterSchema, type PayloadRegisterSchemaType } from "@/schemas/registerSchema";
import { z } from "zod";

type AuthLike = {
    register: (
        email: string,
        password: string,
        password_confirmation: string,
        nome: string,
        tipo: string
    ) => Promise<any>;
};

type NavigateFn = (opts: { to: string }) => void;

export function useRegisterForm(auth: AuthLike, navigate: NavigateFn, redirectTo: string = "/perfil") {
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<PayloadRegisterSchemaType>({
        resolver: zodResolver(PayloadRegisterSchema),
        defaultValues: { tipo: "Aluno" },
    });

    const onError = (formErrors: FieldErrors<PayloadRegisterSchemaType>) => {
        const first = Object.values(formErrors)[0] as any;
        const message = first?.message ?? "Erro de validação";
        toast.error(String(message));
    };

    const onSubmit: SubmitHandler<PayloadRegisterSchemaType> = async (data) => {
        setIsLoading(true);
        try {
            await auth.register(
                data.email,
                data.password,
                data.password_confirmation,
                data.nome,
                data.tipo
            );
            toast.success("Registro realizado com sucesso!");
            navigate({ to: redirectTo });
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                const message = err?.message || "Erro ao registrar. Por favor, tente novamente.";
                toast.error(message);
            } else {
                const message = err?.message ?? "Erro ao registrar. Por favor, tente novamente.";
                toast.error(message);
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        ...methods,
        isLoading,
        setIsLoading,
        onSubmit,
        onError,
    };
}
