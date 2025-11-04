import React, { useState, useCallback, useEffect } from "react";
import type { getContentSchema } from "@/service/content/getContentById";
import Tiptap from "@/components/TipTap/Tiptap";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useContentTags } from "@/service/content/contentTag/getContentTag";
import { useContentTypes } from "@/service/content/contentType/getContentType";
import { extractBase64Images } from "../../utils/extractBase64Images";
import { Input } from "../ui/input";
import { useRouter } from "@tanstack/react-router";
import type { ContentPayload } from "@/Interface/content/ContentPayload";
import { useCreateContent } from "@/hooks/content/useCreateContent";
import { useUpdateContent } from "@/hooks/content/useUpdateContent";

interface ContentFormProps {
  initialData?: getContentSchema | ContentPayload;
  isEditMode?: boolean;
}

export default function ContentForm({
  initialData,
  isEditMode = false,
}: ContentFormProps) {
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };

  const [title, setTitle] = useState(initialData?.title || "");
  const [contentType, setContentType] = useState(
    initialData?.content_type.title || "",
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.content_tags.map((tag) => tag.tag_name) || [],
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [openTags, setOpenTags] = useState(false);
  const [openTypes, setOpenTypes] = useState(false);
  const [inputTagsValue, setInputTagsValue] = useState("");
  const [inputTypesValue, setInputTypesValue] = useState("");

  const { mutate: createMutate } = useCreateContent();
  const { mutate: updateMutate } = useUpdateContent();

  const {
    data: contenTagData,
    isLoading: loadingTagData,
    isError: errorTagData,
  } = useContentTags();
  const {
    data: contenTypeData,
    isLoading: loadingTypeData,
    isError: errorTypeData,
  } = useContentTypes();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContentType(initialData.content_type.title);
      setSelectedTags(initialData.content_tags.map((tag) => tag.tag_name));
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = useCallback(() => {
    const { images, cleanedContent } = extractBase64Images(content);

    const payload = {
      title,
      content: cleanedContent,
      content_type: contentType,
      tags: selectedTags.map((tag) => ({
        tag_name: tag,
        description: "",
      })),
      status: "Ativo" as "Ativo",
      published_at: new Date().toISOString().split("T")[0],
      is_moderator_only: false,
      images: images,
      image_alt_text: images.map(() => "Descrição padrão"),
    };

    if (isEditMode && initialData) {
      updateMutate(
        { id: initialData.id, ...payload },
        {
          onSuccess: (response: any) => {
            console.log(`Conteúdo atualizado com sucesso:`, response);
            alert(`Conteúdo atualizado com sucesso!`);
            router.history.back();
          },
          onError: (error: any) => {
            console.error(`Erro ao atualizar conteúdo:`, error);
            alert(`Erro ao atualizar conteúdo.`);
          },
        },
      );
    } else {
      createMutate(payload, {
        onSuccess: (response: any) => {
          console.log(`Conteúdo criado com sucesso:`, response);
          alert(`Conteúdo criado com sucesso!`);
          router.history.back();
        },
        onError: (error: any) => {
          console.error(`Erro ao criar conteúdo:`, error);
          alert(`Erro ao criar conteúdo.`);
        },
      });
    }

    console.log("Payload gerado no handleSubmit:", payload);
  }, [
    title,
    content,
    contentType,
    selectedTags,
    isEditMode,
    initialData,
    createMutate,
    updateMutate,
    router,
  ]);

  console.error("erro, tag ", errorTagData);
  console.error("erro, type ", errorTypeData);

  console.error("erro, tag ", loadingTagData);
  console.error("erro, type ", loadingTypeData);

  return (
    <div className="w-full mt-7 mb-7 mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-lg font-bold">
              Título
            </label>
            <label
              htmlFor="title"
              className="text-sm font-normal font-gray-300 mb-4"
            >
              Informe o título do seu conteúdo, esse título será exibido na
              plataforma para os usuários
            </label>
          </div>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do conteúdo"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full h-full">
          <Popover open={openTags} onOpenChange={setOpenTags}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTags}
                className="w-[300px] justify-between"
              >
                {selectedTags.length > 0
                  ? selectedTags.join(", ")
                  : "Selecione ou adicione tags"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar ou adicionar tags..."
                  value={inputTagsValue}
                  onValueChange={setInputTagsValue}
                />
                <CommandList>
                  {loadingTagData && (
                    <CommandEmpty>Carregando tags...</CommandEmpty>
                  )}
                  {errorTagData && (
                    <CommandEmpty>Erro ao carregar tags.</CommandEmpty>
                  )}
                  {!loadingTagData && contenTagData?.data.length === 0 && (
                    <CommandEmpty>Nenhuma tag encontrada.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {contenTagData?.data.map((tag) => (
                      <CommandItem
                        key={tag.id}
                        value={tag.tag_name}
                        onSelect={() => {
                          if (selectedTags.includes(tag.tag_name)) {
                            setSelectedTags(
                              selectedTags.filter((t) => t !== tag.tag_name),
                            );
                          } else {
                            setSelectedTags([...selectedTags, tag.tag_name]);
                          }
                        }}
                      >
                        <CheckIcon
                          className={`mr-2 h-4 w-4 ${
                            selectedTags.includes(tag.tag_name)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {tag.tag_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {inputTagsValue &&
                    !contenTagData?.data.some(
                      (tag) => tag.tag_name === inputTagsValue,
                    ) && (
                      <CommandItem
                        value={inputTagsValue}
                        onSelect={() => {
                          if (!selectedTags.includes(inputTagsValue)) {
                            setSelectedTags([...selectedTags, inputTagsValue]);
                          }
                          setInputTagsValue("");
                        }}
                      >
                        <CheckIcon className="mr-2 h-4 w-4 opacity-0" />
                        Adicionar nova tag: <strong>{inputTagsValue}</strong>
                      </CommandItem>
                    )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openTypes} onOpenChange={setOpenTypes}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTypes}
                className="w-[300px] justify-between"
              >
                {contentType || "Selecione o tipo de conteúdo"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar ou adicionar tags..."
                  value={inputTypesValue}
                  onValueChange={setInputTypesValue}
                />
                <CommandList>
                  {loadingTypeData && (
                    <CommandEmpty>Carregando tipos...</CommandEmpty>
                  )}
                  {errorTypeData && (
                    <CommandEmpty>Erro ao carregar tipos.</CommandEmpty>
                  )}
                  {!loadingTypeData && contenTypeData?.data.length === 0 && (
                    <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {contenTypeData?.data.map((type) => (
                      <CommandItem
                        key={type.id}
                        value={type.title}
                        onSelect={() => {
                          setContentType(type.title);
                          setOpenTypes(false);
                        }}
                      >
                        <CheckIcon
                          className={`mr-2 h-4 w-4 ${
                            contentType === type.title
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {type.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {inputTypesValue &&
                    !contenTypeData?.data.some(
                      (type) => type.title === inputTypesValue,
                    ) && (
                      <CommandItem
                        value={inputTypesValue}
                        onSelect={() => {
                          setContentType(inputTypesValue);
                          setOpenTypes(false);
                        }}
                      >
                        <CheckIcon className="mr-2 h-4 w-4 opacity-0" />
                        Adicionar novo tipo: <strong>{inputTypesValue}</strong>
                      </CommandItem>
                    )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-lg font-bold">Conteúdo</label>
          <Tiptap content={content} onChange={setContent} />
        </div>

        <div className="flex justify-between">
          <Button type="submit" variant={"default"} onClick={handleBack}>
            Voltar
          </Button>
          <Button type="submit" variant={"action"}>
            {isEditMode ? "Atualizar Conteúdo" : "Enviar Conteúdo"}
          </Button>
        </div>
      </form>
    </div>
  );
}
