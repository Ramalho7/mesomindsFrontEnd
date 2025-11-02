import { Button } from '@/components/ui/button'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Popover } from '@/components/ui/popover'
import type { ContentPayload } from '@/Interface/content/ContentPayload'
import type { ContentTag } from '@/Interface/content/contentTag/ContentTag'
import { useGetContent } from '@/service/content/getContent'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { CommandInput } from 'cmdk'
import { CheckIcon, ChevronsUpDown, Command, Tag } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/_dashboard/content/contents')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const { data: contents, isLoading, isError } = useGetContent()

  if (isLoading) {
    return <div>Carregando conteúdos...</div>
  }

  if (isError) {
    return <div>Erro ao carregar os conteúdos.</div>
  }

  return (
    <div className='flex flex-col'>
      <Link to='/content/createcontent'>Create contents</Link>
      <div>

        <h1>Conteúdos</h1>
        <Input type="search" />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
            >

              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder='Selecione um filtro'>
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>

                    <CommandItem
                    >
                    </CommandItem>

                  </CommandGroup>
                </CommandList>
              </CommandInput>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        {contents?.data.map((content: ContentPayload, index: any) => (
          <div>
            <p>id {content.id}</p>
            <p>title {content.title}</p>
            {content.content_tags.map((tag: ContentTag, index: any) => (
              <div>
                {tag.tag_name}
              </div>
            ))}
            <p>Tipo: {content.content_type.title}, descricao {content.content_type.description}</p>
            <p>Criador id: {content.creator?.id}</p>
            <p>Criador: {content.creator?.nome}</p>
            <Button asChild >
              <Link to='/content/$contentId' params={{ contentId: content.id.toString() }}>Ver detalhes</Link>
            </Button>
            <Button asChild >
              <Link to='/content/$editContent' params={{ editContent: content.id.toString() }}>Editar</Link>
            </Button>
          </div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={contents?.prev_page_url || "#"} />
          </PaginationItem>
          {contents?.links.map((link: any, index: any) => (
            <PaginationItem>
              {link.url ? (
                <PaginationLink href={link.url} className={link.active ? "font-bold" : ""}>
                  {link.label}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={contents?.next_page_url || "#"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
