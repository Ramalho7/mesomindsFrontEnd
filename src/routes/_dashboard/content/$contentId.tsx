import type { ContentTag } from '@/Interface/content/contentTag/ContentTag'
import { useGetContentById } from '@/service/content/getContentById'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/content/$contentId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { contentId } = useParams({ from: '/_dashboard/content/$contentId' })
  const { data: content, isLoading, isError } = useGetContentById(Number(contentId))

  if (isLoading) {
    return <div>Carregando conteúdo...</div>
  }

  if (isError || !content) {
    return <div>Erro ao carregar o conteúdo.</div>
  }

  if (!content) {
    return <div>Conteúdo não encontrado.</div>
  }

  return (
    <div>
      <h1>Detalhes do Conteúdo</h1>
      <p>ID: {content.id}</p>
      <p>Título: {content.title}</p>
      
      <div 
        dangerouslySetInnerHTML={{ __html: content.content }}
        className="prose prose-sm max-w-none"
      />
    </div>
  )
}