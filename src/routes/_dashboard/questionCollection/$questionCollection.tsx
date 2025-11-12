import { Button } from '@/components/ui/button';
import TiptapReadOnly from '@/components/TipTap/TiptapReadOnly';
import { useGetQuestionCollectionById } from '@/hooks/questionCollection/useGetQuestionsCollectionById';
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_dashboard/questionCollection/$questionCollection',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };

  const { questionCollection } = useParams({ 
    from: "/_dashboard/questionCollection/$questionCollection" 
  });

  const { data: collectionData, isLoading, isError } = useGetQuestionCollectionById(
    Number(questionCollection)
  );

  if (isLoading) {
    return <div className="p-4">Carregando coleção...</div>;
  }

  if (isError || !collectionData) {
    return <div className="text-red-500 p-4">Erro ao carregar a coleção.</div>;
  }

  return (
    <div className="flex flex-col gap-5 mt-7 mb-7 rounded-2xl border px-[24px] py-[24px]">
      <h1 className="font-black text-2xl border-b text-secondary pb-4">
        Detalhes da Coleção
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">ID:</p>
          <p className="font-semibold">{collectionData.id}</p>
        </div>

        <div>
          <p className="text-gray-600">Título:</p>
          <p className="font-semibold text-lg">{collectionData.title}</p>
        </div>

        <div>
          <p className="text-gray-600">Status:</p>
          <p className="font-semibold">
            {collectionData.status === "Active" ? "Ativo" : "Inativo"}
          </p>
        </div>

        <div>
          <p className="text-gray-600">Tipo:</p>
          <p className="font-semibold">{collectionData.type}</p>
        </div>

        <div>
          <p className="text-gray-600">Data de Vencimento:</p>
          <p className="font-semibold">
            {new Date(collectionData.due_date).toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div>
          <p className="text-gray-600">Total de Questões:</p>
          <p className="font-semibold">{collectionData.questions.length}</p>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <p className="text-gray-600">Descrição:</p>
        <p className="mt-2"> <TiptapReadOnly content={collectionData.description}/> </p>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Criado por:</p>
            <p className="font-semibold">{collectionData.created_by?.nome}</p>
          </div>
          <div>
            <p className="text-gray-600">Última edição por:</p>
            <p className="font-semibold">{collectionData.updated_by?.nome}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h2 className="font-bold text-xl text-secondary mb-4">
          Questões ({collectionData.questions.length})
        </h2>
        {collectionData.questions && collectionData.questions.length > 0 ? (
          <div className="space-y-4">
            {collectionData.questions.map((question, index) => (
              <div
                key={question.id}
                className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      Questão {index + 1} - ID: {question.id}
                    </p>
                    <h3 className="font-semibold text-lg mt-2">
                      {question.title}
                    </h3>
                    <div className="mt-3 text-sm">
                      <TiptapReadOnly content={question.content} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-secondary/30 py-[8px] px-[12px] rounded-[8px] text-sm font-semibold whitespace-nowrap">
                      {question.type}
                    </span>
                    <span className={`py-[8px] px-[12px] rounded-[8px] text-sm font-semibold whitespace-nowrap ${
                      question.status === "Active" 
                        ? "bg-green-200" 
                        : "bg-red-200"
                    }`}>
                      {question.status}
                    </span>
                  </div>
                </div>

                {question.alternatives && question.alternatives.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <p className="font-semibold text-sm mb-2">Alternativas:</p>
                    <ul className="space-y-2">
                      {question.alternatives.map((alt: any) => (
                        <li
                          key={alt.id}
                          className={`flex gap-2 p-2 rounded ${
                            alt.correct ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <span>{alt.content}</span>
                          {alt.correct && (
                            <span className="ml-auto text-green-600 font-semibold">
                              ✓ Correta
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma questão disponível</p>
        )}
      </div>

      <Button type="submit" variant="default" onClick={handleBack}>
        Voltar
      </Button>
    </div>
  );
}