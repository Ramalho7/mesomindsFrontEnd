import { useAuth } from "@/auth";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
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
import { formatDate } from "@/utils/formatDate";
import {
  CheckIcon,
  ChevronsUpDown,
  Delete,
  Plus,
  SquarePen,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useGetContent } from "@/hooks/content/useGetContent";
import { useDeleteContent } from "@/hooks/content/useDeleteContent";
import { useContentTags } from "@/hooks/content/contentTags/useGetContentTags";
import { useContentTypes } from "@/hooks/content/contentTypes/useGetContentTypes";

export const Route = createFileRoute("/_dashboard/content/")({
  component: RouteComponent,
});

const ContentFilterSchema = z.object({
  search: z.string(),
  status: z.string(),
  content_type: z.string(),
  content_tag: z.string(),
  page: z.number(),
});

type ContentFilterType = z.infer<typeof ContentFilterSchema>;

function RouteComponent() {
  const [openContentType, setOpenContentType] = useState(false);
  const [openContentTag, setOpenContentTag] = useState(false);
  const [enable, setEnabled] = useState(false);

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContentFilterType>({
    resolver: zodResolver(ContentFilterSchema),
    defaultValues: {
      search: "",
      status: "",
      content_type: "",
      content_tag: "",
      page: 1,
    },
  });

  const search = watch("search");
  const status = watch("status");
  const content_type = watch("content_type");
  const content_tag = watch("content_tag");
  const page = watch("page");

  useEffect(() => {
    const handler = setTimeout(() => {
      setEnabled(true);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [search, status, content_type, content_tag]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get("page");
    if (pageParam) {
      setValue("page", parseInt(pageParam, 10));
    }
  }, [setValue]);

  const { data: contents, isError } = useGetContent(
    {
      search: search || undefined,
      status: status || undefined,
      content_type: content_type || undefined,
      content_tag: content_tag || undefined,
      page: page || 1,
    },
    enable,
  );
  const { mutate: mutateDeleteContent } = useDeleteContent();

  const { user } = useAuth();

  const handleDelete = (contentId: number) => {
    console.log("User tipo:", user?.tipo);
    console.log("User tipo trimmed:", user?.tipo?.trim());
    if (user?.tipo !== "ADM") {
      alert("Você não possui permissão para deletar conteúdos");
      return;
    }
    if (window.confirm(`Deseja remover o conteúdo id: "${contentId}`)) {
      mutateDeleteContent(
        { id: contentId },
        {
          onSuccess: () => {
            console.log("Conteúdo deletado com sucesso");
          },
        },
      );
    }
  };

  const { data: allTypes } = useContentTypes();

  const uniqueContentTypes = allTypes?.data || [];

  const { data: allTags } = useContentTags();

  const uniqueContentTags = allTags?.data || [];

  if (isError) {
    return <div className="text-red-500">Erro ao carregar os conteúdos.</div>;
  }

  return (
    <div className="flex flex-col mt-10 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-black text-2xl text-secondary">Conteúdos</h1>
          <Link
            to="/content/createcontent"
            className="py-[8px] px-[8px] bg-accent rounded-lg hover:bg-accent/80"
          >
            <Plus className="text-accent-foreground" />
          </Link>
        </div>

        <form className="space-y-4">
          <div>
            <Input
              id="input-search"
              type="search"
              placeholder="Busque por conteúdos"
              {...register("search")}
              className="w-full"
            />
            {errors.search && (
              <span className="text-red-500 text-sm">
                {errors.search.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center items-center sm:flex-row gap-[8px] sm:gap-[16px]">
            <div className="relative w-full sm:w-auto">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setEnabled(false);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-auto">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                      <SelectItem value="Rascunho">Rascunho</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Controller
              name="content_type"
              control={control}
              render={({ field }) => (
                <Popover open={openContentType} onOpenChange={setOpenContentType}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openContentType}
                      className="w-full sm:w-auto justify-between"
                    >
                      {field.value || "Tipo de Conteúdo"}
                      <ChevronsUpDown className="opacity-50 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Selecione um Tipo" />
                      <CommandList>
                        <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
                        <CommandGroup heading="Tipos de Conteúdo">
                          <CommandItem
                            onSelect={() => {
                              field.onChange("");
                              setEnabled(false);
                              setOpenContentType(false);
                            }}
                          >
                            {!field.value && <CheckIcon className="mr-2 w-4 h-4" />}
                            Limpar filtro
                          </CommandItem>
                          {uniqueContentTypes.map((type) => (
                            <CommandItem
                              key={type.id}
                              onSelect={() => {
                                field.onChange(type.title);
                                setEnabled(false);
                                setOpenContentType(false);
                              }}
                            >
                              {field.value === type.title && (
                                <CheckIcon className="mr-2 w-4 h-4" />
                              )}
                              {type.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            />

            <Controller
              name="content_tag"
              control={control}
              render={({ field }) => (
                <Popover open={openContentTag} onOpenChange={setOpenContentTag}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openContentTag}
                      className="w-full sm:w-auto justify-between"
                    >
                      {field.value || "Tag de Conteúdo"}
                      <ChevronsUpDown className="opacity-50 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Selecione uma Tag" />
                      <CommandList>
                        <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
                        <CommandGroup heading="Tags">
                          <CommandItem
                            onSelect={() => {
                              field.onChange("");
                              setEnabled(false);
                              setOpenContentTag(false);
                            }}
                          >
                            {!field.value && <CheckIcon className="mr-2 w-4 h-4" />}
                            Limpar filtro
                          </CommandItem>
                          {uniqueContentTags.map((tag) => (
                            <CommandItem
                              key={tag.id}
                              onSelect={() => {
                                field.onChange(tag.tag_name);
                                setEnabled(false);
                                setOpenContentTag(false);
                              }}
                            >
                              {field.value === tag.tag_name && (
                                <CheckIcon className="mr-2 w-4 h-4" />
                              )}
                              {tag.tag_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4 mb-10">
        {contents?.data?.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Nenhum conteúdo encontrado.
          </div>
        ) : (
          contents?.data.map((content: ContentPayload) => (
            <div
              key={content.id}
              className="border border-2 rounded-lg py-[24px] px-[24px] shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-row justify-between items-start">
                <div className="flex-1">
                  <Link
                    to="/content/$contentId"
                    params={{ contentId: content.id.toString() }}
                  >
                    <h2 className="font-bold text-lg text-secondary hover:underline">
                      {content.title}
                    </h2>
                  </Link>

                  <div className="flex gap-2 items-center mt-3">
                    <p className="font-bold text-sm text-secondary">Tags:</p>
                    {content.content_tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="bg-secondary/30 py-[4px] px-[8px] rounded-[8px] text-sm"
                      >
                        {tag.tag_name}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <p className="flex gap-2 items-center text-sm">
                      <span className="font-bold text-secondary">Tipo:</span>
                      <span className="underline decoration-accent">
                        {content.content_type.title}
                      </span>
                    </p>
                    {content.content_type.description && (
                      <p className="flex gap-2 items-center text-sm">
                        <span className="font-bold text-secondary">
                          Descrição:
                        </span>
                        <span className="text-gray-600">
                          {content.content_type.description}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 ml-4">
                  <div className="flex flex-row items-center gap-[16px]">
                    <span className="bg-secondary/30 py-[8px] px-[12px] rounded-[8px] text-sm font-semibold whitespace-nowrap">
                      ID: {content.id}
                    </span>
                    <Link
                      to="/content/$editContent/edit"
                      params={{ editContent: content.id.toString() }}
                    >
                      <SquarePen className="text-accent cursor-pointer hover:text-accent/80" />
                    </Link>
                    <Delete
                      className="text-accent cursor-pointer hover:text-accent/80"
                      onClick={() => handleDelete(content.id)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-4 border-t pt-4">
                <div>
                  <p className="text-gray-600">Criador:</p>
                  <p className="font-semibold">{content.creator?.nome}</p>
                  <p className="text-gray-600 text-xs">ID: {content.creator?.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Último editor:</p>
                  <p className="font-semibold">{content.last_editor?.nome}</p>
                  <p className="text-gray-600 text-xs">ID: {content.last_editor?.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Criado em:</p>
                  <p className="font-semibold">{formatDate(content.created_at)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Atualizado em:</p>
                  <p className="font-semibold">{formatDate(content.updated_at)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination className="mt-10 mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${contents?.prev_page_url ? contents?.prev_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const pageNum = contents?.prev_page_url?.split("page=")[1];
                if (pageNum) {
                  setValue("page", parseInt(pageNum, 10));
                }
              }}
            />
          </PaginationItem>

          {contents?.links
            ?.filter((link: any) => typeof link.page === "number")
            .filter((link: any) => {
              const currentPageNum = page || 1;
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
                    setValue("page", link.page);
                  }}
                >
                  {link.page}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext
              href={`?page=${contents?.next_page_url ? contents?.next_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const pageNum = contents?.next_page_url?.split("page=")[1];
                if (pageNum) {
                  setValue("page", parseInt(pageNum, 10));
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
