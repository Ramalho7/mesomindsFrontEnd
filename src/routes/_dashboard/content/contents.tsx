import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { PopoverContent, PopoverTrigger, Popover } from '@/components/ui/popover'
import type { ContentPayload } from '@/Interface/content/ContentPayload'
import type { ContentTag } from '@/Interface/content/contentTag/ContentTag'
import type { ContentType } from '@/service/content/contentType/getContentType'
import { useGetContent } from '@/service/content/getContent'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const Route = createFileRoute('/_dashboard/content/contents')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openStatusFilter, setOpenStatusFilter] = useState(false);
  const [openContentType, setOpenContentType] = useState(false);
  const [openContentTag, setOpenContentTag] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [contentTypeFilter, setContentTypeFilter] = useState<string | undefined>(undefined);
  const [contentTagFilter, setContentTagFilter] = useState<string | undefined>(undefined);

  const [enable, setEnabled] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setEnabled(true);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [search, statusFilter, contentTypeFilter, contentTagFilter])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page');
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, []);

  const { data: contents, isLoading, isError } = useGetContent({
    search,
    status: statusFilter,
    content_type: contentTypeFilter,
    content_tag: contentTagFilter,
    page: currentPage
  },
    enable
  )


  // if (isLoading) {
  //   return <div>Carregando conteúdos...</div>
  // }

  if (isError) {
    return <div>Erro ao carregar os conteúdos.</div>
  }

  const uniqueStatuses = contents?.data
    .map((content: ContentPayload) => content.status)
    .filter((status, index, self) => self.indexOf(status) === index);

  const uniqueContentTypes = contents?.data.reduce<ContentType[]>((acc, content) => {
    if (!acc.some((item) => item.id === content.content_type.id)) {
      acc.push(content.content_type as ContentType);
    }
    return acc;
  }, []);

  const uniqueContentTags = contents?.data
    .flatMap((content) => content.content_tags)
    .reduce<ContentTag[]>((acc, tag) => {
      if (!acc.some((item) => item.id === tag.id)) {
        acc.push(tag);
      }
      return acc;
    }, []);

  return (
    <div className='flex flex-col'>
      <Link to='/content/createcontent'>Create contents</Link>
      <div>

        <h1 className='text-2xl text-secondary'>Conteúdos</h1>
        <Input
          id='input-search'
          name='input-search'
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setEnabled(false)
          }}
          placeholder='Busque por conteúdos'
          className='mt-[24px] mb-[16px]'
        />

        <div className='flex flex-col sm:flex-row justify-center align-center gap-[8px] sm:gap-[16px]'>
          <Popover open={openStatusFilter} onOpenChange={setOpenStatusFilter}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openStatusFilter}
              >
                Status
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder='Selecione um Status' />
                <CommandList>
                  <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
                  <CommandGroup heading="Status">
                    {uniqueStatuses?.map((status) => (
                      <CommandItem
                        key={status}
                        onSelect={() => {
                          setStatusFilter(status);
                          setEnabled(false);
                          setOpenStatusFilter(false);
                        }}
                      >
                        {statusFilter === status && <CheckIcon className="mr-2" />}
                        {status}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openContentType} onOpenChange={setOpenContentType}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openContentType}
              >
                Tipo de conteúdo
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder='Selecione um Status' />
                <CommandList>
                  <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
                  <CommandGroup heading="Tipos">
                    {uniqueContentTypes?.map((contentType) => (
                      <CommandItem
                        key={contentType.id}
                        onSelect={() => {
                          setContentTypeFilter(contentType.title);
                          setEnabled(false);
                          setOpenContentType(false);
                        }}
                      >
                        {contentTypeFilter === contentType.title && <CheckIcon className="mr-2" />}
                        {contentType.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>


          <Popover open={openContentTag} onOpenChange={setOpenContentTag}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openContentTag}
              >
                Tipo de conteúdo
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder='Selecione um Status' />
                <CommandList>
                  <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
                  <CommandGroup heading="Tags">
                    {uniqueContentTags?.map((contentTag) => (
                      <CommandItem
                        key={contentTag.id}
                        onSelect={() => {
                          setContentTagFilter(contentTag.tag_name);
                          setEnabled(false);
                          setOpenContentTag(false);
                        }}
                      >
                        {contentTagFilter === contentTag.tag_name && <CheckIcon className="mr-2" />}
                        {contentTag.tag_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className='w-full'>
        {contents?.data.map((content: ContentPayload, index: any) => (
          <div key={content.id} className='border border-2 rounded-lg py-[24px] px-[24px]'>
            <div className='flex justify-between mb-[16px]'>
              <p><span className='bg-secondary py-[8px] px-[8px] rounded-lg text-secondary-foreground text-lg font-bold'>Título</span> <span className='font-bold text-secondary'>{content.title}</span></p>
              <p><span className='bg-secondary py-[8px] px-[8px] rounded-lg text-secondary-foreground text-lg font-bold'>ID</span> <span className='font-bold text-secondary'>{content.id}</span></p>
            </div>
            <div className='flex gap-2'>
              <p>Tags:</p>
              {content.content_tags.map((tag: ContentTag, index: any) => (
                <div key={tag.id} className='bg-secondary py-[8px] px-[8px] rounded-[8px]'>
                  {tag.tag_name}
                </div>
              ))}
            </div>
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
      <Pagination className='mt-10 mb-10'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${contents?.prev_page_url ? contents?.prev_page_url.split('page=')[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const page = contents?.prev_page_url?.split('page=')[1];
                setCurrentPage(page ? parseInt(page, 10) : 1);
              }}
            />
          </PaginationItem>
          {contents?.links.some((link: any) => link.page && link.page > currentPage + 1) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {contents?.links
            .filter((link: any) => typeof link.page === 'number')
            .reduce<any[]>((acc, link: any) => {
              if (!acc.some((item) => item.page === link.page)) {
                acc.push(link);
              }
              return acc;
            }, [])
            .filter((link: any) => {
              const currentPageNum = currentPage;
              return link.page >= currentPageNum - 1 && link.page <= currentPageNum + 1;
            })
            .map((link: any) => (
              <PaginationItem key={`page-${link.page}`}>
                <PaginationLink
                  href={`?page=${link.page}`}
                  isActive={link.active}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(link.page);
                  }}
                >
                  {link.page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {contents?.links.some((link: any) => link.page && link.page > currentPage + 1) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={`?page=${contents?.next_page_url ? contents?.next_page_url.split('page=')[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const page = contents?.next_page_url?.split('page=')[1];
                setCurrentPage(page ? parseInt(page, 10) : 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
