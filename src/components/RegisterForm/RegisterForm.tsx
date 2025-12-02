import { Controller, type Control, type UseFormRegister, type UseFormHandleSubmit, type FieldErrors } from "react-hook-form";
import type { PayloadRegisterSchemaType } from "@/schemas/registerSchema";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

interface Props {
    register: UseFormRegister<PayloadRegisterSchemaType>;
    handleSubmit: UseFormHandleSubmit<PayloadRegisterSchemaType>;
    control: Control<PayloadRegisterSchemaType>;
    errors: FieldErrors<PayloadRegisterSchemaType>;
    isLoading: boolean;
    onSubmit: (data: PayloadRegisterSchemaType) => void;
    onError?: (errors: FieldErrors<PayloadRegisterSchemaType>) => void;
    showRegisterLink?: boolean,
}

export default function RegisterForm({
    register,
    handleSubmit,
    control,
    errors,
    isLoading,
    onSubmit,
    onError,
}: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center flex flex-col gap-[8px]  mt-10 mb-10">
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                noValidate
                className="max-w-md w-full space-y-4 p-6 border rounded-lg items-center justify-center"
            >
                <h1 className="text-2xl font-black text-center text-secondary">Crie sua conta</h1>
                <h2 className="text-md font-medium text-center">
                    Destrave na matemática agora mesmo
                </h2>

                <div>
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium mb-1">
                            Nome
                        </label>
                        <Input
                            id="nome"
                            type="text"
                            {...register("nome")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
                        />
                        {errors.nome && (
                            <p className="text-destructive-foreground text-sm mt-1 mb-1">{errors.nome.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="text"
                            {...register("email")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
                        />
                        {errors.email && (
                            <p className="text-destructive-foreground text-sm mt-1 mb-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-1"
                        >
                            Senha
                        </label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
                        />
                        {errors.password && (
                            <p className="text-destructive-foreground text-sm mt-1 mb-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium mb-1"
                        >
                            Confirme a senha
                        </label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            {...register("password_confirmation")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
                        />
                        {errors.password_confirmation && (
                            <p className="text-destructive-foreground text-sm mt-1 mb-1">{errors.password_confirmation.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="tipo" className="block text-sm font-medium mb-1">
                            Tipo de usuário
                        </label>
                        <Controller
                            control={control}
                            name="tipo"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full" id="tipo" aria-labelledby="tipo-label">
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Aluno">Aluno</SelectItem>
                                        <SelectItem value="Professor">Professor</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.tipo && (
                            <p className="text-destructive-foreground text-sm mt-1 mb-1">{errors.tipo.message}</p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    variant={"action"}
                    className="w-full disable:opacity-50 disable:cursor-not-allowed"
                >
                    {isLoading ? "Registrando..." : "Registrar-se"}
                </Button>

                <Link to={"/login"} search={{ redirect: "/perfil" }}>
                    <p>
                        Já possui conta?{" "}
                        <span className="underline decoration-accent">Acesse agora.</span>
                    </p>
                </Link>
            </form>
        </div>
    );
}