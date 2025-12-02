import { useState } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { PayloadLoginShema, type PayloadLoginShemaType } from "@/schemas/loginSchema";
import { z } from "zod";

type AuthLike = {
    login: (email: string, password: string) => Promise<any>;
};

type NavigateFn = (opts: { to: string }) => void;

export function useLoginForm(auth: AuthLike, navigate: NavigateFn, redirectTo: string = "") {
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<PayloadLoginShemaType>({
        resolver: zodResolver(PayloadLoginShema),
    });

    const onError = (formErrors: FieldErrors<PayloadLoginShemaType>) => {
        const first = Object.values(formErrors)[0] as any;
        const message = first?.message ?? "Erro de validação";
        toast.error(String(message));
    };

    const onSubmit: SubmitHandler<PayloadLoginShemaType> = async (data) => {
        setIsLoading(true);
        try {
            await auth.login(data.email, data.password);
            toast.success("Login realizado com sucesso!");
            navigate({ to: redirectTo });
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                const message = err?.message || "Erro ao realizar login. Por favor, tente novamente.";
                toast.error(message);
            } else {
                const message = err?.message ?? "Erro ao realizar login. Por favor, tente novamente.";
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