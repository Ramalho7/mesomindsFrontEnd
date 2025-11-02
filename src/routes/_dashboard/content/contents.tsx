import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import type { ContentPayload } from "@/Interface/content/ContentPayload";
import type { ContentTag } from "@/Interface/content/contentTag/ContentTag";
import type { ContentType } from "@/service/content/contentType/getContentType";
import { useGetContent } from "@/service/content/getContent";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CheckIcon, ChevronsUpDown, Plus, SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/content/contents")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openStatusFilter, setOpenStatusFilter] = useState(false);
  const [openContentType, setOpenContentType] = useState(false);
  const [openContentTag, setOpenContentTag] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [contentTypeFilter, setContentTypeFilter] = useState<
    string | undefined
  >(undefined);
  const [contentTagFilter, setContentTagFilter] = useState<string | undefined>(
    undefined,
  );

  const [enable, setEnabled] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setEnabled(true);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [search, statusFilter, contentTypeFilter, contentTagFilter]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page");
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, []);

  const {
    data: contents,
    isLoading,
    isError,
  } = useGetContent(
    {
      search,
      status: statusFilter,
      content_type: contentTypeFilter,
      content_tag: contentTagFilter,
      page: currentPage,
    },
    enable,
  );

  // if (isLoading) {
  //   return <div>Carregando conteúdos...</div>
  // }

  if (isError) {
    return <div>Erro ao carregar os conteúdos.</div>;
  }

  const uniqueStatuses = contents?.data
    .map((content: ContentPayload) => content.status)
    .filter((status, index, self) => self.indexOf(status) === index);

  const uniqueContentTypes = contents?.data.reduce<ContentType[]>(
    (acc, content) => {
      if (!acc.some((item) => item.id === content.content_type.id)) {
        acc.push(content.content_type as ContentType);
      }
      return acc;
    },
    [],
  );

  const uniqueContentTags = contents?.data
    .flatMap((content) => content.content_tags)
    .reduce<ContentTag[]>((acc, tag) => {
      if (!acc.some((item) => item.id === tag.id)) {
        acc.push(tag);
      }
      return acc;
    }, []);

  return (
    <div className="flex flex-col mt-10">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-black text-2xl text-secondary">Conteúdos</h1>
          <Link
            to="/content/createcontent"
            className="py-[8px] px-[8px] bg-accent rounded-lg"
          >
            <Plus className="text-accent-foreground" />
          </Link>
        </div>
        <Input
          id="input-search"
          name="input-search"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setEnabled(false);
          }}
          placeholder="Busque por conteúdos"
          className="mt-[24px] mb-[16px]"
        />

        <div className="flex flex-col sm:flex-row justify-center align-center gap-[8px] sm:gap-[16px]">
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
                <CommandInput placeholder="Selecione um Status" />
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
                        {statusFilter === status && (
                          <CheckIcon className="mr-2" />
                        )}
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
                <CommandInput placeholder="Selecione um Status" />
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
                        {contentTypeFilter === contentType.title && (
                          <CheckIcon className="mr-2" />
                        )}
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
                <CommandInput placeholder="Selecione um Status" />
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
                        {contentTagFilter === contentTag.tag_name && (
                          <CheckIcon className="mr-2" />
                        )}
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

      <div className="flex flex-col mx-auto mt-10 mb-10 gap-10 w-full">
        {contents?.data.map((content: ContentPayload, index: any) => (
          <div
            key={content.id}
            className="border border-2 rounded-lg py-[24px] px-[24px] shadow-md"
          >
            <div className="flex justify-between mb-[16px]">
              <p>
                <Link
                  to="/content/$contentId"
                  params={{ contentId: content.id.toString() }}
                  className="flex gap-2 items-center"
                >
                  <span className="bg-secondary py-[8px] px-[8px] rounded-lg text-secondary-foreground text-lg font-bold">
                    Título
                  </span>{" "}
                  <span className="font-bold text-secondary">
                    {content.title}
                  </span>
                </Link>
              </p>
              <div className="flex gap-8 items-center">
                <p>
                  <Link
                    to="/content/$contentId"
                    params={{ contentId: content.id.toString() }}
                    className="flex gap-2 items-center"
                  >
                    <span className="bg-secondary py-[8px] px-[8px] rounded-lg text-secondary-foreground text-lg font-bold">
                      ID
                    </span>

                    <span className="font-bold text-secondary">
                      {content.id}
                    </span>
                  </Link>
                </p>
                <Link
                  to="/content/$editContent"
                  params={{ editContent: content.id.toString() }}
                >
                  <SquarePen className="text-accent" />
                </Link>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-bold text-lg text-secondary">Tags:</p>
              {content.content_tags.map((tag: ContentTag, index: any) => (
                <div
                  key={tag.id}
                  className="bg-secondary/30 py-[8px] px-[8px] rounded-[8px]"
                >
                  {tag.tag_name}
                </div>
              ))}
            </div>
            <div>
              <p className="flex flex-col">
                <span className="flex gap-2 items-center">
                  <span className="font-bold text-secondary text-lg">
                    Tipo:
                  </span>
                  <span className="text-md underline decoration-accent">
                    {content.content_type.title}
                  </span>
                </span>
                <span className="flex gap-2 items-center">
                  <span className="font-bold text-secondary text-lg">
                    Descricao Tipo:
                  </span>
                  <span className="text-md underline decoration-accent">
                    {content.content_type.description}
                  </span>
                </span>
              </p>
            </div>
            <p className="flex gap-2 items-center">
              <span className="font-bold text-secondary text-lg">
                Nome criador:
              </span>
              {content.creator?.nome}
            </p>
            <p className="flex gap-2 items-center">
              <span className="font-bold text-secondary text-lg">
                Criador id:
              </span>{" "}
              {content.creator?.id}
            </p>
          </div>
        ))}
      </div>
      <Pagination className="mt-10 mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${contents?.prev_page_url ? contents?.prev_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const page = contents?.prev_page_url?.split("page=")[1];
                setCurrentPage(page ? parseInt(page, 10) : 1);
              }}
            />
          </PaginationItem>
          {contents?.links.some(
            (link: any) => link.page && link.page > currentPage + 1,
          ) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {contents?.links
            .filter((link: any) => typeof link.page === "number")
            .reduce<any[]>((acc, link: any) => {
              if (!acc.some((item) => item.page === link.page)) {
                acc.push(link);
              }
              return acc;
            }, [])
            .filter((link: any) => {
              const currentPageNum = currentPage;
              return (
                link.page >= currentPageNum - 1 &&
                link.page <= currentPageNum + 1
              );
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

          {contents?.links.some(
            (link: any) => link.page && link.page > currentPage + 1,
          ) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={`?page=${contents?.next_page_url ? contents?.next_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const page = contents?.next_page_url?.split("page=")[1];
                setCurrentPage(page ? parseInt(page, 10) : 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
