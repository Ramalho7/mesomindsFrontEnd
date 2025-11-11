import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetQuestionsCollections } from '@/hooks/questionCollection/useGetQuestionsCollections'
import { formatDate } from '@/utils/formatDate'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/_public/simulados/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [enable, setEnabled] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setEnabled(true)
    }, 200)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

  const { data: simulados, isLoading, isError } = useGetQuestionsCollections({
    search: search || undefined,
    status: "Active",
    type: "Simulation",
    page: currentPage,
    per_page: 10,
    enabled: enable,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Carregando simulados...</p>
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500">Erro ao carregar os simulados.</div>
  }

  return (
    <div className="flex flex-col mt-10 px-4">
      <div className="mb-8">
        <h1 className="font-black text-2xl text-secondary mb-4">Simulados Disponíveis</h1>
        
        <Input
          id="input-search"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setEnabled(false)
          }}
          placeholder="Busque por simulados"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-10">
        {!simulados?.data.data || simulados.data.data.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Nenhum simulado disponível no momento.</p>
          </div>
        ) : (
          simulados.data.data.map((simulado) => (
            <Link
              key={simulado.id}
              to="/simulados/$simulado"
              params={{ simulado: String(simulado.id) }}
              className="border-2 border-gray-300 rounded-lg p-6 hover:border-secondary hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-secondary mb-2">{simulado.title}</h2>
                  <div 
                    className="prose max-w-none text-gray-700 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: simulado.description }}
                  />
                </div>
                <span className="bg-secondary/30 py-2 px-4 rounded-lg text-sm font-semibold whitespace-nowrap ml-4">
                  {simulado.questions?.length || 0} questões
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                <div>
                  <p className="text-gray-600">Matéria:</p>
                  <p className="font-semibold">{simulado.subject_id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Data de vencimento:</p>
                  <p className="font-semibold">
                    {simulado.due_date ? formatDate(simulado.due_date) : "Sem prazo"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {simulados?.data.data && simulados.data.data.length > 0 && (
        <Pagination className="mt-10 mb-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${simulados?.data.prev_page_url ? simulados?.data.prev_page_url.split("page=")[1] : 1}`}
                onClick={(e) => {
                  e.preventDefault()
                  const page = simulados?.data.prev_page_url?.split("page=")[1]
                  if (page) {
                    setCurrentPage(parseInt(page, 10))
                  }
                }}
              />
            </PaginationItem>

            {simulados?.data.links
              ?.filter((link: any) => typeof link.page === "number")
              .filter((link: any) => {
                const currentPageNum = currentPage
                return (
                  link.page >= currentPageNum - 1 &&
                  link.page <= currentPageNum + 1
                )
              })
              .map((link: any) => (
                <PaginationItem key={`page-${link.page}`}>
                  <PaginationLink
                    href={`?page=${link.page}`}
                    isActive={link.active}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(link.page)
                    }}
                  >
                    {link.page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            <PaginationItem>
              <PaginationNext
                href={`?page=${simulados?.data.next_page_url ? simulados?.data.next_page_url.split("page=")[1] : 1}`}
                onClick={(e) => {
                  e.preventDefault()
                  const page = simulados?.data.next_page_url?.split("page=")[1]
                  if (page) {
                    setCurrentPage(parseInt(page, 10))
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
