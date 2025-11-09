import QuestionForm from "@/components/QuestionForm/QuestionForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/question/createQuestion")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Enunciado</h1>
      <h2>
        Aqui escreva o seu enunciado, é suportado imagens, links, LaTex, etc.
      </h2>
      <QuestionForm/>  
    </div>
  );
}
