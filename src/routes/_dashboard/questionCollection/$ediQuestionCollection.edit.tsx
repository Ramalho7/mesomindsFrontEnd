import { createFileRoute } from '@tanstack/react-router'
import QuestionCollectionForm from '@/components/QuestionCollectionForm/QuestionCollectionForm'
import { useGetQuestionCollectionById } from '@/hooks/questionCollection/useGetQuestionsCollectionById'

export const Route = createFileRoute(
  '/_dashboard/questionCollection/$ediQuestionCollection/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { ediQuestionCollection } = Route.useParams()
  const { data: collectionData, isLoading, isError } = useGetQuestionCollectionById(Number(ediQuestionCollection))

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>
  }

  if (isError || !collectionData) {
    return <div className="text-red-500">Erro ao carregar a coleção de questões.</div>
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-secondary mb-6">Editar Coleção de Questões</h1>
      <QuestionCollectionForm 
        initialData={collectionData} 
        isEditMode={true}
      />
    </div>
  )
}
