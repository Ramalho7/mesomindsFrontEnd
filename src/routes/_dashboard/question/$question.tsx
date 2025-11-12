import { Button } from '@/components/ui/button';
import TiptapReadOnly from '@/components/TipTap/TiptapReadOnly';
import { useGetQuestionById } from '@/hooks/question/useGetQuestionById';
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/question/$question')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };

  const { question } = useParams({ from: "/_dashboard/question/$question" });

  const { data: QuestionData, isLoading, isError } = useGetQuestionById(Number(question))

  if (isLoading) {
    return <div>Carregando conteúdo...</div>;
  }

  if (isError || !question) {
    return <div>Erro ao carregar o conteúdo.</div>;
  }

  if (!question) {
    return <div>Conteúdo não encontrado.</div>;
  }

  return (
    <div className="flex flex-col gap-5 mt-7 mb-7 rounded-2xl border px-[24px] py-[24px]">
      <h1 className="font-black text-2xl border-b text-secondary ">
        Detalhes do questão
      </h1>
      <p>ID: {QuestionData?.data.id}</p>
      <p>Título: {QuestionData?.data.title}</p>
      <p>Materia: {QuestionData?.data.materia}</p>
      <p>Status: {QuestionData?.data.status === "Active" ? "Ativo" : "Inativo"}</p>
      <p>Materia: {QuestionData?.data.type}</p>

      <div>
        <p className="font-semibold">Alternativas:</p>
        {QuestionData?.data.alternatives && QuestionData.data.alternatives.length > 0 ? (
          <ul className="list-disc pl-5">
            {QuestionData.data.alternatives.map((alt) => (
              <li key={alt.id} className="mb-2 flex gap-2">
                <span>{alt.content}</span>
                {alt.correct ? <span className="ml-2 text-secondary font-semibold">(Correta)</span> : <span>(Incorreta)</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma alternativa disponível</p>
        )}
      </div>

      <p>Enunciado:</p>
      <div className="border rounded-2xl px-[24px] py-[24px]">
        <TiptapReadOnly content={QuestionData?.data.content || ""} />
      </div>

      {QuestionData?.data.correction && (
        <>
          <p>Correção/Gabarito:</p>
          <div className="border rounded-2xl px-[24px] py-[24px]">
            <TiptapReadOnly content={QuestionData.data.correction} />
          </div>
        </>
      )}

      <Button type="submit" variant={"default"} onClick={handleBack}>
        Voltar
      </Button>
    </div>)
}