import ContentForm from '@/components/ContentForm/ContentForm'
import { useGetContentById } from '@/service/content/getContentById'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/content/$editContent')({
  component: RouteComponent,
})

function RouteComponent() {
  const { editContent } = useParams({ from: '/_dashboard/content/$editContent' })
    const { data: content, isLoading, isError } = useGetContentById(Number(editContent))

    if (isLoading) {
    return <div>Carregando conteúdo...</div>
  }

  if (isError || !content) {
    return <div>Erro ao carregar o conteúdo para edição.</div>
  }
  return (
    <ContentForm
      initialData={content}
      isEditMode={true}
      />
  )
}
