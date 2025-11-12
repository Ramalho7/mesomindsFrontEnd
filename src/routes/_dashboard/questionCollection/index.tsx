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
import { CheckIcon, ChevronsUpDown, Delete, Plus, SquarePen } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import type { QuestionCollectionData } from "@/service/schemas/questionCollection/QuestionCollectionData";
import { useAuth } from "@/auth";
import { useGetQuestionsCollections } from "@/hooks/questionCollection/useGetQuestionsCollections";
import { useDeleteQuestionCollection } from "@/hooks/questionCollection/useDeleteQuestionCollection";

export const Route = createFileRoute("/_dashboard/questionCollection/")({
    component: RouteComponent,
});

const QuestionCollectionFilterSchema = z.object({
    search: z.string(),
    status: z.string(),
    type: z.enum(["Simulation", "Exam", "Activity", "Exercise"]).optional(),
    page: z.number(),
    per_page: z.number(),
});

type QuestionCollectionFilterType = z.infer<typeof QuestionCollectionFilterSchema>;

function RouteComponent() {
    const [openTypeFilter, setOpenTypeFilter] = useState(false);
    const [enable, setEnabled] = useState(false);

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<QuestionCollectionFilterType>({
        resolver: zodResolver(QuestionCollectionFilterSchema),
        defaultValues: {
            search: "",
            status: "",
            type: undefined,
            page: 1,
            per_page: 10,
        },
    });

    const search = watch("search");
    const status = watch("status");
    const type = watch("type");
    const page = watch("page");
    const per_page = watch("per_page");

    useEffect(() => {
        const handler = setTimeout(() => {
            setEnabled(true);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [search, status, type]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const pageParam = queryParams.get("page");
        if (pageParam) {
            setValue("page", parseInt(pageParam, 10));
        }
    }, [setValue]);

    const { data: questionsCollections, isError } = useGetQuestionsCollections(
        {
            search: search || undefined,
            status: status || undefined,
            type: type,
            page: page || 1,
            per_page: per_page || 10,
            enabled: enable,
        }
    );

    const { user } = useAuth();
    const { mutate: mutateDeleteCollection } = useDeleteQuestionCollection();

    const handleDelete = (collectionId: number) => {
        console.log("User tipo:", user?.tipo);
        if (user?.tipo !== "ADM") {
            alert("Você não possui permissão para deletar coleções");
            return;
        }
        if (window.confirm("Deseja realmente deletar esta coleção de questões?")) {
            mutateDeleteCollection(collectionId, {
                onSuccess: () => {
                    alert("Coleção deletada com sucesso!");
                },
                onError: (error) => {
                    alert(`Erro ao deletar coleção: ${error.message}`);
                }
            });
        }
    };

    const collectionTypes = ["Simulation", "Exam", "Activity", "Exercise"] as const;

    if (isError) {
        return <div className="text-red-500">Erro ao carregar as coleções de questões.</div>;
    }

    return (
        <div className="flex flex-col mt-10 px-4">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-black text-2xl text-secondary">Coleções de Questões</h1>
                    <Link
                        to="/questionCollection/createQuestionCollection"
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
                            placeholder="Busque por coleções"
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
                                            <SelectItem value="Active">Ativo</SelectItem>
                                            <SelectItem value="Inactive">Inativo</SelectItem>
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
                                            {field.value || "Tipo de Coleção"}
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
                                                    {collectionTypes.map((typeOption) => (
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
                {questionsCollections?.data.data?.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        Nenhuma coleção encontrada.
                    </div>
                ) : (
                    questionsCollections?.data.data.map((collection: QuestionCollectionData) => (
                        <div
                            key={collection.id}
                            className="border border-2 rounded-lg py-[24px] px-[24px] shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex flex-row justify-between items-start">
                                <div className="flex-1">
                                    <Link
                                        to="/questionCollection/$questionCollection"
                                        params={{ questionCollection: collection.id.toString() }}
                                    >
                                        <h2 className="font-bold text-lg text-secondary hover:underline">
                                            {collection.title}
                                        </h2>
                                    </Link>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {collection.description.substring(0, 100)}...
                                    </p>
                                    <div className="mt-4 flex gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Questões:</p>
                                            <p className="font-semibold">{collection.questions.length}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Data de vencimento:</p>
                                            <p className="font-semibold">
                                                {new Date(collection.due_date).toLocaleDateString("pt-BR")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-[16px] ml-4">
                                    <span className="bg-secondary/30 py-[8px] px-[12px] rounded-[8px] text-sm font-semibold whitespace-nowrap">
                                        {collection.status === "Active" ? "Ativo" : "Inativo"}
                                    </span>
                                    <span className="bg-secondary/30 py-[8px] px-[12px] rounded-[8px] text-sm font-semibold whitespace-nowrap">
                                        {collection.type}
                                    </span>
                                    <Link
                                        to="/questionCollection/$ediQuestionCollection/edit"
                                        params={{ ediQuestionCollection: String(collection.id) }}
                                    >
                                        <SquarePen className="text-accent cursor-pointer hover:text-accent/80" />
                                    </Link>
                                    <Delete
                                        className="text-accent cursor-pointer hover:text-accent/80"
                                        onClick={() => handleDelete(collection.id)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mt-4 border-t pt-4">
                                <div>
                                    <p className="text-gray-600">Criador:</p>
                                    <p className="font-semibold">{collection.created_by?.nome}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Último editor:</p>
                                    <p className="font-semibold">{collection.updated_by?.nome}</p>
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
                            href={`?page=${questionsCollections?.data.prev_page_url ? questionsCollections?.data.prev_page_url.split("page=")[1] : 1}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const pageNum = questionsCollections?.data.prev_page_url?.split("page=")[1];
                                if (pageNum) {
                                    setValue("page", parseInt(pageNum, 10));
                                }
                            }}
                        />
                    </PaginationItem>

                    {questionsCollections?.data.links
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
                            href={`?page=${questionsCollections?.data.next_page_url ? questionsCollections?.data.next_page_url.split("page=")[1] : 1}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const pageNum = questionsCollections?.data.next_page_url?.split("page=")[1];
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