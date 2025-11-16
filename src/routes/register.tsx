import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PayloadRegisterSchema, type PayloadRegisterSchemaType } from "@/service/schemas/registerSchema";
import { Controller, useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

export const Route = createFileRoute("/register")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || "/perfil",
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { auth } = Route.useRouteContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { register, handleSubmit, control, formState: {errors}, } =
    useForm<PayloadRegisterSchemaType>({
      resolver: zodResolver(PayloadRegisterSchema),
      defaultValues: {
        tipo: "Aluno",
      },
    });


  const onError = (formErrors: FieldErrors<PayloadRegisterSchemaType>) => {
    const first = Object.values(formErrors)[0] as any;
    const message = first?.message ?? "Erro de validação";
    toast.error(String(message));
    setError(String(message));
  };

  const onSubmit: SubmitHandler<PayloadRegisterSchemaType> = async (
    data: any
  ) => {
    setIsLoading(true);
    setError(null);

    console.table(data);

    try {
      await auth.register(
        data.email,
        data.password,
        data.password_confirmation,
        data.nome,
        data.tipo
      );
      toast.success("Registro realizado com sucesso!");
      navigate({ to: "/perfil" });
    } catch (err: any) {
      console.log("catch chamado em register.tsx:", err);
      const message = err?.message || "Erro ao registrar. Por favor, tente novamente.";
      toast.error(message);
      setError(message);
      console.error("Erro ao registrar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex flex-col gap-[8px]  mt-10 mb-10">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="max-w-md w-full space-y-4 p-6 border rounded-lg items-center justify-center"
      >
        <h1 className="text-2xl font-black text-center">Crie sua conta</h1>
        <h2 className="text-lg font-medium text-center">
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
              <p className="text-destructive-foreground text-sm font-bold mt-1 mb-1">{errors.nome.message}</p>
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
              <p className="text-destructive-foreground text-md font-bold mt-1 mb-1">{errors.email.message}</p>
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
              <p className="text-destructive-foreground text-md font-bold mt-1 mb-1">{errors.password.message}</p>
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
              <p className="text-destructive-foreground text-md font-bold mt-1 mb-1">{errors.password_confirmation.message}</p>
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
                  <SelectTrigger className="w-full">
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
              <p className="text-destructive-foreground text-md font-bold mt-1 mb-1">{errors.tipo.message}</p>
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