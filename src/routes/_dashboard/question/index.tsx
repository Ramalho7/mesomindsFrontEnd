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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDown, Plus, X } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useGetQuestions } from "@/hooks/question/useGetQuestions";
import { useGetMaterias } from "@/hooks/materia/useGetMateria";
import type { QuestionDataType } from "@/service/schemas/questionSchema/ResponseQuestionSchema";

export const Route = createFileRoute("/_dashboard/question/")({
  component: RouteComponent,
});

const QuestionFilterSchema = z.object({
  search: z.string(),
  status: z.string(),
  type: z.enum(["Multipla", "VerdadeiroFalso", "Aberta"]).optional(),
  materia: z.string(),
  page: z.number(),
});

type QuestionFilterType = z.infer<typeof QuestionFilterSchema>;

function RouteComponent() {
  const [openTypeFilter, setOpenTypeFilter] = useState(false);
  const [openMateriaFilter, setOpenMateriaFilter] = useState(false);
  const [enable, setEnabled] = useState(false);

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuestionFilterType>({
    resolver: zodResolver(QuestionFilterSchema),
    defaultValues: {
      search: "",
      status: "",
      type: undefined,
      materia: "",
      page: 1,
    },
  });

  const search = watch("search");
  const status = watch("status");
  const type = watch("type");
  const materia = watch("materia");
  const page = watch("page");

  useEffect(() => {
    const handler = setTimeout(() => {
      setEnabled(true);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [search, status, type, materia]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get("page");
    if (pageParam) {
      setValue("page", parseInt(pageParam, 10));
    }
  }, [setValue]);

  const { data: questions, isError } = useGetQuestions(
    {
      search: search || undefined,
      status: status || undefined,
      type: type,
      materia: materia || undefined,
      page: page || 1,
    },
    enable,
  );

  const { data: materias } = useGetMaterias();

  const questionTypes = ["Multipla", "VerdadeiroFalso", "Aberta"] as const;

  if (isError) {
    return <div className="text-red-500">Erro ao carregar as questões.</div>;
  }

  return (
    <div className="flex flex-col mt-10 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-black text-2xl text-secondary">Questões</h1>
          <Link
            to="/question/createQuestion"
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
              placeholder="Busque por questões"
              {...register("search")}
              className="w-full"
            />
            {errors.search && (
              <span className="text-red-500 text-sm">
                {errors.search.message}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-[8px] sm:gap-[16px]">
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
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Popover open={openTypeFilter} onOpenChange={setOpenTypeFilter}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openTypeFilter}
                      className="w-full sm:w-auto justify-between"
                    >
                      {field.value || "Tipo de Questão"}
                      <ChevronsUpDown className="opacity-50 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Selecione um Tipo" />
                      <CommandList>
                        <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
                        <CommandGroup heading="Tipos">
                          <CommandItem
                            onSelect={() => {
                              field.onChange(undefined);
                              setEnabled(false);
                              setOpenTypeFilter(false);
                            }}
                          >
                            {!field.value && <CheckIcon className="mr-2 w-4 h-4" />}
                            Limpar filtro
                          </CommandItem>
                          {questionTypes.map((typeOption) => (
                            <CommandItem
                              key={typeOption}
                              onSelect={() => {
                                field.onChange(typeOption);
                                setEnabled(false);
                                setOpenTypeFilter(false);
                              }}
                            >
                              {field.value === typeOption && (
                                <CheckIcon className="mr-2 w-4 h-4" />
                              )}
                              {typeOption}
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
        {questions?.data.data?.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Nenhuma questão encontrada.
          </div>
        ) : (
          questions?.data.data.map((question: QuestionDataType) => (
            <div
              key={question.id}
              className="border border-2 rounded-lg py-[24px] px-[24px] shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-[16px]">
                <div>
                  <h2 className="font-bold text-lg text-secondary">
                    {question.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {question.content.substring(0, 100)}...
                  </p>
                </div>
                <span className="bg-secondary/30 py-[8px] px-[12px] rounded-[8px] text-sm font-semibold">
                  {question.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Criador:</p>
                  <p className="font-semibold">{question.creator?.nome}</p>
                </div>
                <div>
                  <p className="text-gray-600">Último editor:</p>
                  <p className="font-semibold">{question.last_editor?.nome}</p>
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
              href={`?page=${questions?.data.prev_page_url ? questions?.data.prev_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const pageNum = questions?.data.prev_page_url?.split("page=")[1];
                if (pageNum) {
                  setValue("page", parseInt(pageNum, 10));
                }
              }}
            />
          </PaginationItem>

          {questions?.data.links
            .filter((link: any) => typeof link.page === "number")
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
              href={`?page=${questions?.data.next_page_url ? questions?.data.next_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const pageNum = questions?.data.next_page_url?.split("page=")[1];
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