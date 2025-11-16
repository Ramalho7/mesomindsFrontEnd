import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayloadLoginShema, type PayloadLoginShemaType } from "@/service/schemas/loginSchema";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || "/",
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const { auth } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<PayloadLoginShemaType>({
    resolver: zodResolver(PayloadLoginShema),
  });

  const onSubmit: SubmitHandler<PayloadLoginShemaType> = async (data) => {
    setIsLoading(true);
    setError("");

    console.log(data);

    try {
      await auth.login(data.email, data.password);
      // Navigate to the redirect URL using router navigation
      navigate({ to: "/perfil" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues.map((e) => e.message).join(", "));
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full space-y-4 p-6 border rounded-lg"
      >
        <h1 className="text-2xl font-black text-center">Bem-vindo de volta!</h1>
        <h2 className="text-lg font-medium text-center">
          Entre com os seus dados de usuário
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          variant={"action"}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        <Link to={"/register"} search={{ redirect: "/perfil" }}>
          <p>Ainda não possui conta? Crie agora.</p>
        </Link>
      </form>
    </div>
  );
}