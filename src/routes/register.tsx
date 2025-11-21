import { createFileRoute, redirect } from "@tanstack/react-router";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useRegisterForm } from "@/hooks/useRegisterForm";


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
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    isLoading,
    onSubmit,
    onError,
  } = useRegisterForm(auth as any, navigate as any, search.redirect ?? "/perfil");

  return (
    <div className="min-h-screen flex items-center justify-center flex flex-col gap-[8px]  mt-10 mb-10">
      <RegisterForm
        register={register}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        isLoading={isLoading}
        onSubmit={onSubmit}
        onError={onError}
      />
    </div>
  );
}