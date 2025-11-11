import { useRouter } from "@tanstack/react-router";
import { useForm, Controller, useFieldArray, type SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { PostQuestionSchema, type PostQuestionSchemaType } from "@/service/schemas/questionSchema/PostQuestionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateQuestion } from "@/hooks/question/useCreateQuestion";
import { useEditQuestion } from "@/hooks/question/useEditQuestion";
import Tiptap from "../TipTap/Tiptap";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useGetMaterias } from "@/hooks/materia/useGetMateria";
import { useEffect } from "react";
import type { QuestionDataType } from "@/service/schemas/questionSchema/ResponseQuestionSchema";

interface QuestionFormProps {
  initialData?: QuestionDataType;
  isEditMode?: boolean;
}

export default function QuestionForm({
  initialData,
  isEditMode = false,
}: QuestionFormProps) {

  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  }

  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<PostQuestionSchemaType>({
    resolver: zodResolver(PostQuestionSchema),
    defaultValues: isEditMode && initialData ? {
      title: initialData.title,
      content: initialData.content,
      correction: initialData.correction || "",
      materia: initialData.materia,
      type: initialData.type,
      alternatives: initialData.alternatives && initialData.alternatives.length > 0
        ? initialData.alternatives.map(alt => ({
          content: alt.content,
          correct: typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct
        }))
        : initialData.type === "Aberta"
          ? []
          : [{ content: "", correct: false }]
    } : {
      title: "",
      content: "",
      correction: "",
      materia: null,
      type: "Multipla",
      alternatives: [{ content: "", correct: false }]
    }
  })

  const { mutate: createQuestionMutate, isPending: isPendingCreateQuestion } = useCreateQuestion({
    onSuccess: () => {
      alert("Questão criada com sucesso!");
      router.history.back();
    },
    onError: (error) => {
      alert("Erro ao criar questão. Verifique o console para mais detalhes.");
    }
  });

  const { mutate: editQuestionMutate, isPending: isPendingEditQuestion } = useEditQuestion();

  useEffect(() => {
    if (initialData && isEditMode) {
      console.log("Resetando formulário com dados:", initialData);
      reset({
        title: initialData.title,
        content: initialData.content,
        correction: initialData.correction || "",
        materia: initialData.materia,
        type: initialData.type,
        alternatives: initialData.alternatives && initialData.alternatives.length > 0
          ? initialData.alternatives.map(alt => ({
            content: alt.content,
            correct: typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct
          }))
          : initialData.type === "Aberta"
            ? []
            : [{ content: "", correct: false }]
      });
    }
  }, [initialData, isEditMode, reset]);

  const { data: materiaData } = useGetMaterias()

  const questionType = watch("type")

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "alternatives",
  });

  const handleAddAlternative = () => {
    append({ content: "", correct: false })
  }

  const handleRemoveAlternative = (index: number) => {
    remove(index);
  }

  const handleToggleCorrect = (index: number) => {
    if (questionType === "Multipla") {
      fields.forEach((_, i) => {
        update(i, { ...fields[i], correct: i === index });
      })
    } else {
      update(index, { ...fields[index], correct: !fields[index].correct })
    }
  }

  const onFormSubmit: SubmitHandler<PostQuestionSchemaType> = (data) => {
    if (questionType !== "Aberta" && (!data.alternatives || data.alternatives.length === 0)) {
      alert("Adicione pelo menos uma alternativa!");
      return;
    }

    const payload: PostQuestionSchemaType = {
      title: data.title,
      content: data.content,
      correction: data.correction || "",
      materia: data.materia,
      type: data.type,
      alternatives: questionType === "Aberta" ? undefined : data.alternatives,
    };

    console.log("Payload a ser enviado:", payload);
    console.log("Tipo de questão:", questionType);
    console.log("Modo de edição:", isEditMode);

    if (isEditMode && initialData?.id) {
      editQuestionMutate({
        id: initialData.id,
        ...payload
      });
    } else {
      createQuestionMutate(payload);
    }
  };

  useEffect(() => {
    console.log("Erros do formulário:", errors);
    console.log("Tipo de questão:", questionType);
  }, [errors, questionType]);

  useEffect(() => {
    if (questionType === "Aberta") {
      while (fields.length > 0) {
        remove(0);
      }
    } else if (fields.length === 0) {
      append({ content: "", correct: false });
    }
  }, [questionType, fields.length, append, remove]);

  const isPending = isPendingCreateQuestion || isPendingEditQuestion;

  return (
    <div className="mt-5 mb-5">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="title" className="text-xl">Titulo da questao</label>
            <Input
              type="text"
              id="title"
              {...register("title")}
              placeholder="Informe o titulo da questão"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title.message}</span>
            )}
          </div>

          <div className="flex items-center justify-center gap-[16px]">
            <div className="flex flex-col items-center">
              <Controller
                control={control}
                name="materia"
                render={({ field }) => {
                  console.log("Valor do campo materia:", field.value);
                  return (
                    <Select
                      value={field.value !== null ? String(field.value) : ""}
                      onValueChange={(value) => {
                        const numValue = value ? Number(value) : null;
                        console.log("Mudando materia para:", numValue);
                        field.onChange(numValue);
                      }}
                      disabled={isPending}
                    >
                      <SelectTrigger className="">
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
                  );
                }}
              />
              {errors.materia && (
                <span className="text-red-500 text-sm">{errors.materia.message}</span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  console.log("Valor do campo type:", field.value);
                  return (
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) => {
                        console.log("Mudando type para:", value);
                        field.onChange(value);
                      }}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo da questão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos</SelectLabel>
                          <SelectItem value="Multipla">Múltipla escolha</SelectItem>
                          <SelectItem value="VerdadeiroFalso">Verdadeiro ou falso</SelectItem>
                          <SelectItem value="Aberta">Aberta</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              {errors.type && (
                <span className="text-red-500 text-sm">{errors.type.message}</span>
              )}
            </div>
          </div>

          <label htmlFor="content" className="text-xl">Enunciado</label>
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

          {questionType !== "Aberta" && (
            <div>
              <label className="text-xl">Alternativas</label>
              <div className="flex items-center flex-col w-full gap-[16px]">
                {fields.map((field, index) => (
                  <div key={field.id}
                    className="flex items-center flex-row w-full gap-[8px]">
                    <input
                      type="checkbox"
                      checked={field.correct}
                      onChange={() => handleToggleCorrect(index)}
                      disabled={isPending}
                      className="h-[24px] w-[24px]"
                    />
                    <Input
                      {...register(`alternatives.${index}.content` as const)}
                      placeholder={`Alternativa ${index + 1}`}
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveAlternative(index)}
                      disabled={isPending}
                    >Remover
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddAlternative}
                className="mt-4"
                disabled={isPending}
              >
                <Plus className="text-accent" /> Adicionar Alternativa
              </Button>
            </div>
          )}

          <div>
            <label>
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

          <div className="flex w-full items-center justify-between">
            <Button
              type="button"
              variant={"outline"}
              onClick={handleBack}
              disabled={isPending}>
              Voltar
            </Button>
            <Button
              type="submit"
              variant={"default"}
              disabled={isPending}
            >
              {isPending
                ? (isEditMode ? "Editando..." : "Criando...")
                : (isEditMode ? "Salvar alterações" : "Criar questão")
              }
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}