import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import type {
    UseFormRegister,
    UseFormHandleSubmit,
    FieldErrors,
} from "react-hook-form";
import type { PayloadLoginShemaType } from "@/service/schemas/loginSchema";

interface Props {
    register: UseFormRegister<PayloadLoginShemaType>;
    handleSubmit: UseFormHandleSubmit<PayloadLoginShemaType>;
    errors: FieldErrors<PayloadLoginShemaType>;
    isLoading: boolean;
    onSubmit: (data: PayloadLoginShemaType) => void;
    onError?: (errors: FieldErrors<PayloadLoginShemaType>) => void;
    showRegisterLink?: boolean,
}

export default function LoginForm({
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    onError,
    showRegisterLink = true
}: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="max-w-md w-full space-y-4 p-6 border rounded-lg"
            >
                <h1 className="text-2xl font-black text-center text-secondary">Bem-vindo de volta!</h1>
                <h2 className="text-md font-medium text-center">
                    Entre com os seus dados de usuário
                </h2>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                        <p className="text-destructive-foreground text-sm mt-1 mb-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Senha
                    </label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && (
                        <p className="text-destructive-foreground text-sm mt-1 mb-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    variant={"action"}
                >
                    {isLoading ? "Entrando..." : "Entrar"}
                </Button>


                {showRegisterLink &&
                    <Link to={"/register"} search={{ redirect: "/perfil" }}>
                        <p>Ainda não possui conta? <span className="underline decoration-accent">Crie agora.</span></p>
                    </Link>
                }
            </form>
        </div>
    );
}