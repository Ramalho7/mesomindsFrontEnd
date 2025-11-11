import QuestionForm from '@/components/QuestionForm/QuestionForm';
import { useGetQuestionById } from '@/hooks/question/useGetQuestionById';
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/question/$editQuestion/edit')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  const { editQuestion } = useParams({
    from: "/_dashboard/question/$editQuestion/edit",
  });

  const { data: response, isLoading, isError } = useGetQuestionById(Number(editQuestion));

  if (isLoading) {
    return <div>Carregando questão...</div>;
  }

  if (isError || !response?.data) {
    return <div>Erro ao carregar a questão.</div>;
  }

  return <QuestionForm initialData={response.data} isEditMode={true} />
}