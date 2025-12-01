import { useRouter } from "@tanstack/react-router";
import { useForm, Controller, type SubmitHandler, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { PostQuestionCollectionSchema, type PostQuestionCollectionType } from "@/service/schemas/questionCollection/PostQuestionCollection";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateQuestionCollection } from "@/hooks/questionCollection/useCreateQuestionCollection";
import { useUpdateQuestionCollection } from "@/hooks/questionCollection/useUpdateQuestionCollection";
import { UpdateQuestionCollectionSchema, type UpdateQuestionCollectionType } from "@/service/schemas/questionCollection/UpdateQuestionCollectionSchema";
import Tiptap from "../TipTap/Tiptap";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useGetMaterias } from "@/hooks/materia/useGetMateria";
import { useEffect, useState } from "react";
import type { QuestionCollectionData } from "@/service/schemas/questionCollection/QuestionCollectionData";
import type { PostQuestionSchemaType } from "@/service/schemas/questionSchema/PostQuestionSchema";
import { PostQuestionSchema } from "@/service/schemas/questionSchema/PostQuestionSchema";

interface QuestionCollectionFormProps {
    initialData?: QuestionCollectionData;
    isEditMode?: boolean;
}

export default function QuestionCollectionForm({
    initialData,
    isEditMode = false,
}: QuestionCollectionFormProps) {
    const router = useRouter();

    const handleBack = () => {
        router.history.back();
    };

    const [questions, setQuestions] = useState<PostQuestionSchemaType[]>(
        initialData?.questions?.map(q => ({
            title: q.title,
            content: q.content,
            correction: "",
            materia: null,
            type: q.type,
            status: "Active",
            alternatives: q.alternatives?.map(alt => ({
                content: alt.content,
                correct: typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct
            })) || []
        })) || []
    );

    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<PostQuestionCollectionType>({
        mode: "onBlur",
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            subject_id: initialData?.subject_id || 0,
            type: (initialData?.type as "Simulation" | "Exam" | "Activity" | "Exercise") || "Simulation",
            due_date: initialData?.due_date ? initialData.due_date.split('T')[0] : "",
            status: "Active",
            questions: questions,
        }
    });

    const { mutate: createCollectionMutate, isPending } = useCreateQuestionCollection();
    const { mutate: updateCollectionMutate, isPending: isUpdatePending } = useUpdateQuestionCollection();
    const { data: materiaData } = useGetMaterias();

    const isSubmitting = isPending || isUpdatePending;

    // Sincroniza o estado de questions com o formulário
    useEffect(() => {
        setValue('questions', questions);
    }, [questions, setValue]);

    const handleAddQuestion = (questionData: PostQuestionSchemaType) => {
        if (editingQuestionIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editingQuestionIndex] = questionData;
            setQuestions(updatedQuestions);
            setEditingQuestionIndex(null);
        } else {
            setQuestions([...questions, questionData]);
        }
        setShowQuestionModal(false);
    };

    const handleEditQuestion = (index: number) => {
        setEditingQuestionIndex(index);
        setShowQuestionModal(true);
    };

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const onFormSubmit: SubmitHandler<PostQuestionCollectionType> = (data) => {
        console.log("Dados do formulário:", data);

        if (isEditMode && initialData?.id) {
            // Prepara os dados para update com IDs das questões existentes
            const updateData: UpdateQuestionCollectionType = {
                title: data.title,
                description: data.description,
                subject_id: data.subject_id,
                type: data.type,
                due_date: data.due_date,
                status: data.status,
                questions: questions.map((q, index) => ({
                    id: initialData.questions?.[index]?.id, // ID se existir
                    title: q.title,
                    content: q.content,
                    correction: q.correction,
                    type: q.type,
                    status: q.status,
                    alternatives: q.alternatives?.map((alt, altIndex) => ({
                        id: initialData.questions?.[index]?.alternatives?.[altIndex]?.id, // ID se existir
                        content: alt.content,
                        correct: alt.correct ?? false,
                    })),
                })),
            };

            // Valida com Zod antes de enviar
            const validationResult = UpdateQuestionCollectionSchema.safeParse(updateData);
            
            if (!validationResult.success) {
                console.error("Erros de validação:", validationResult.error.issues);
                alert("Erro na validação: " + validationResult.error.issues.map(i => i.message).join(", "));
                return;
            }

            console.log("Payload de atualização validado:", validationResult.data);

            updateCollectionMutate(
                { id: initialData.id, data: validationResult.data },
                {
                    onSuccess: () => {
                        alert("Coleção atualizada com sucesso!");
                        router.history.back();
                    },
                    onError: (error) => {
                        alert(`Erro ao atualizar coleção: ${error.message}`);
                    }
                }
            );
        } else {
            // Valida com Zod antes de enviar
            const validationResult = PostQuestionCollectionSchema.safeParse(data);
            
            if (!validationResult.success) {
                console.error("Erros de validação:", validationResult.error.issues);
                alert("Erro na validação: " + validationResult.error.issues.map(i => i.message).join(", "));
                return;
            }

            console.log("Payload validado:", validationResult.data);

            createCollectionMutate(validationResult.data, {
                onSuccess: () => {
                    alert("Coleção criada com sucesso!");
                    router.history.back();
                },
                onError: (error) => {
                    alert(`Erro ao criar coleção: ${error.message}`);
                }
            });
        }
    };

    useEffect(() => {
        console.log("Erros do formulário:", errors);
    }, [errors]);

    return (
        <div className="mt-5 mb-5">
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="border rounded-lg p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-secondary">Informações da Coleção</h2>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-lg font-semibold">Título da Coleção</label>
                        <Input
                            type="text"
                            id="title"
                            {...register("title")}
                            placeholder="Informe o título da coleção"
                            disabled={isSubmitting}
                        />
                        {errors.title && (
                            <span className="text-red-500 text-sm">{errors.title.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-lg font-semibold">Descrição</label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <Tiptap content={field.value} onChange={field.onChange} />
                            )}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">{errors.description.message}</span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold">Matéria</label>
                            <Controller
                                control={control}
                                name="subject_id"
                                render={({ field }) => (
                                    <Select
                                        value={field.value ? String(field.value) : ""}
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a matéria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {materiaData?.data?.data?.map((materia) => (
                                                    <SelectItem key={materia.id} value={String(materia.id)}>
                                                        {materia.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.subject_id && (
                                <span className="text-red-500 text-sm">{errors.subject_id.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold">Tipo</label>
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <Select
                                        value={field.value || ""}
                                        onValueChange={field.onChange}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Simulation">Simulado</SelectItem>
                                                <SelectItem value="Exam">Prova</SelectItem>
                                                <SelectItem value="Activity">Atividade</SelectItem>
                                                <SelectItem value="Exercise">Exercício</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.type && (
                                <span className="text-red-500 text-sm">{errors.type.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="due_date" className="text-lg font-semibold">Data de Vencimento</label>
                            <Input
                                type="date"
                                id="due_date"
                                {...register("due_date")}
                                disabled={isSubmitting}
                            />
                            {errors.due_date && (
                                <span className="text-red-500 text-sm">{errors.due_date.message}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-secondary">Questões ({questions.length})</h2>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setEditingQuestionIndex(null);
                                setShowQuestionModal(true);
                            }}
                            disabled={isSubmitting}
                        >
                            <Plus className="mr-2" /> Adicionar Questão
                        </Button>
                    </div>

                    {questions.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                            Nenhuma questão adicionada. Clique em "Adicionar Questão" para começar.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {questions.map((question, index) => (
                                <div key={index} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600">Questão {index + 1}</p>
                                            <h3 className="font-semibold text-lg mt-1">{question.title}</h3>
                                            <div className="flex gap-2 mt-2">
                                                <span className="bg-secondary/30 py-1 px-3 rounded-md text-sm">
                                                    {question.type}
                                                </span>
                                                {question.alternatives && question.alternatives.length > 0 && (
                                                    <span className="bg-blue-100 py-1 px-3 rounded-md text-sm">
                                                        {question.alternatives.length} alternativas
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEditQuestion(index)}
                                                disabled={isSubmitting}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveQuestion(index)}
                                                disabled={isSubmitting}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={isSubmitting}
                    >
                        Voltar
                    </Button>
                    <Button
                        type="submit"
                        variant="default"
                        disabled={isSubmitting || questions.length === 0}
                    >
                        {isSubmitting
                            ? (isEditMode ? "Salvando..." : "Criando...")
                            : (isEditMode ? "Salvar Alterações" : "Criar Coleção")
                        }
                    </Button>
                </div>
            </form>

            {showQuestionModal && (
                <QuestionFormModal
                    initialData={editingQuestionIndex !== null ? questions[editingQuestionIndex] : undefined}
                    onSave={handleAddQuestion}
                    onCancel={() => {
                        setShowQuestionModal(false);
                        setEditingQuestionIndex(null);
                    }}
                />
            )}
        </div>
    );
}

interface QuestionFormModalProps {
    initialData?: PostQuestionSchemaType;
    onSave: (data: PostQuestionSchemaType) => void;
    onCancel: () => void;
}

function QuestionFormModal({ initialData, onSave, onCancel }: QuestionFormModalProps) {
    const { data: materiaData } = useGetMaterias();

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<PostQuestionSchemaType>({
        mode: "onBlur",
        defaultValues: {
            title: initialData?.title || "",
            content: initialData?.content || "",
            correction: initialData?.correction || "",
            materia: initialData?.materia || null,
            type: initialData?.type || "Multipla",
            status: "Active",
            alternatives: initialData?.alternatives && initialData.alternatives.length > 0
                ? initialData.alternatives
                : initialData?.type === "Aberta"
                    ? []
                    : [{ content: "", correct: false }]
        }
    });

    const questionType = watch("type");

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "alternatives",
    });

    const handleAddAlternative = () => {
        append({ content: "", correct: false });
    };

    const handleRemoveAlternative = (index: number) => {
        remove(index);
    };

    const handleToggleCorrect = (index: number) => {
        if (questionType === "Multipla") {
            fields.forEach((_, i) => {
                update(i, { ...fields[i], correct: i === index });
            });
        } else {
            update(index, { ...fields[index], correct: !fields[index].correct });
        }
    };

    const onFormSubmit: SubmitHandler<PostQuestionSchemaType> = (data) => {
        if (questionType !== "Aberta" && (!data.alternatives || data.alternatives.length === 0)) {
            alert("Adicione pelo menos uma alternativa!");
            return;
        }

        // Valida com Zod
        const validationResult = PostQuestionSchema.safeParse(data);
        
        if (!validationResult.success) {
            console.error("Erros de validação:", validationResult.error.issues);
            alert("Erro na validação: " + validationResult.error.issues.map(i => i.message).join(", "));
            return;
        }

        onSave(validationResult.data);
    };

    useEffect(() => {
        if (questionType === "Aberta") {
            while (fields.length > 0) {
                remove(0);
            }
        } else if (fields.length === 0) {
            append({ content: "", correct: false });
        }
    }, [questionType, fields.length, append, remove]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-6 z-10">
                    <h2 className="text-2xl font-bold text-secondary">
                        {initialData ? "Editar Questão" : "Nova Questão"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-lg font-semibold">Título da questão</label>
                        <Input
                            type="text"
                            id="title"
                            {...register("title")}
                            placeholder="Informe o título da questão"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-sm">{errors.title.message}</span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Matéria</label>
                            <Controller
                                control={control}
                                name="materia"
                                render={({ field }) => (
                                    <Select
                                        value={field.value !== null ? String(field.value) : ""}
                                        onValueChange={(value) => field.onChange(value ? Number(value) : null)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a matéria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {materiaData?.data?.data?.map((materia) => (
                                                    <SelectItem key={materia.id} value={String(materia.id)}>
                                                        {materia.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.materia && (
                                <span className="text-red-500 text-sm">{errors.materia.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Tipo de questão</label>
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <Select value={field.value || ""} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Multipla">Múltipla escolha</SelectItem>
                                                <SelectItem value="VerdadeiroFalso">Verdadeiro ou falso</SelectItem>
                                                <SelectItem value="Aberta">Aberta</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.type && (
                                <span className="text-red-500 text-sm">{errors.type.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Enunciado</label>
                        <Controller
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <Tiptap content={field.value} onChange={field.onChange} />
                            )}
                        />
                        {errors.content && (
                            <span className="text-red-500 text-sm">{errors.content.message}</span>
                        )}
                    </div>

                    {questionType !== "Aberta" && (
                        <div className="space-y-2">
                            <label className="font-semibold">Alternativas</label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={field.correct}
                                        onChange={() => handleToggleCorrect(index)}
                                        className="h-5 w-5"
                                    />
                                    <Input
                                        {...register(`alternatives.${index}.content`)}
                                        placeholder={`Alternativa ${index + 1}`}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveAlternative(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddAlternative}
                            >
                                <Plus className="h-4 w-4 mr-2" /> Adicionar Alternativa
                            </Button>
                            {errors.alternatives && (
                                <span className="text-red-500 text-sm">{errors.alternatives.message}</span>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                            {questionType === "Aberta" ? "Gabarito Esperado" : "Explicação da correção"}
                        </label>
                        <Controller
                            control={control}
                            name="correction"
                            render={({ field }) => (
                                <Tiptap content={field.value || ""} onChange={field.onChange} />
                            )}
                        />
                    </div>

                    <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end gap-2 mt-6 z-10">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="default">
                            {initialData ? "Salvar" : "Adicionar"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}