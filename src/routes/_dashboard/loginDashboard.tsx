import LoginForm from '@/components/LoginForm/LoginForm';
import { useLoginForm } from '@/hooks/useLoginForm';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/loginDashboard')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/dashboard',
  }),
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const search = Route.useSearch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    isLoading,
    onSubmit,
    onError,
  } = useLoginForm(auth as any, navigate as any, search.redirect ?? '/profile');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isLoading={isLoading}
        onSubmit={onSubmit}
        onError={onError}
        showRegisterLink={false}
      />
    </div>
  );
}