import QuestionForm from "@/components/QuestionForm/QuestionForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/question/createQuestion")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl">Criar Questão</h1>
      <QuestionForm/>  
    </div>
  );
}
