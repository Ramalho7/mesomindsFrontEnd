import React, { useState, useCallback } from 'react'
import { useCreateContent } from '@/service/content/postContent'
import Tiptap from '@/components/TipTap/Tiptap'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '../ui/button'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { useContentTags } from '@/service/content/contentTag/getContentTag'
import { useContentTypes } from '@/service/content/contentType/getContentType'
import { extractBase64Images }  from '../../utils/extractBase64Images' 

export default function ContentForm() {
    const [title, setTitle] = useState('')
    const [contentType, setContentType] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [content, setContent] = useState('')
    const [openTags, setOpenTags] = useState(false)
    const [openTypes, setOpenTypes] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const { mutate } = useCreateContent()

    const { data: contenTagData, isLoading: loadingTagData, isError: errorTagData } = useContentTags()
    const { data: contenTypeData, isLoading: loadingTypeData, isError: errorTypeData } = useContentTypes()

    const handleSubmit = useCallback(() => {

        const { images, cleanedContent } = extractBase64Images(content)

        const payload = {
            title,
            content: cleanedContent,
            content_type: contentType,
            tags: selectedTags.map((tag) => ({
                tag_name: tag,
                description: '',
            })),
            status: 'Ativo' as 'Ativo',
            published_at: new Date().toISOString().split('T')[0],
            is_moderator_only: false,
            images: images,
            image_alt_text: images.map(() => 'Descrição padrão'),
        }

        mutate(payload, {
            onSuccess: (response) => {
                console.log('Conteúdo enviado com sucesso:', response)
                alert('Conteúdo enviado com sucesso!')
            },
            onError: (error) => {
                console.error('Erro ao enviar conteúdo:', error)
                alert('Erro ao enviar conteúdo.')
            },
        })

        console.log('Payload gerado no handleSubmit:', payload)
    }, [title, content, contentType, selectedTags, mutate])

    console.error('erro, tag ', errorTagData)
    console.error('erro, type ', errorTypeData)

    console.error('erro, tag ', loadingTagData)
    console.error('erro, type ', loadingTypeData)

    return (
        <div className="w-full mt-7 mb-7">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
                className="space-y-4"
            >
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Título
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Digite o título do conteúdo"
                        required
                    />
                </div>

                <Popover open={openTags} onOpenChange={setOpenTags}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openTags}
                            className="w-[300px] justify-between"
                        >
                            {selectedTags.length > 0
                                ? selectedTags.join(', ')
                                : "Selecione ou adicione tags"}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput
                                placeholder="Buscar ou adicionar tags..."
                                value={inputValue}
                                onValueChange={setInputValue}
                            />
                            <CommandList>
                                {loadingTagData && <CommandEmpty>Carregando tags...</CommandEmpty>}
                                {errorTagData && <CommandEmpty>Erro ao carregar tags.</CommandEmpty>}
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
                                                    setSelectedTags(selectedTags.filter((t) => t !== tag.tag_name))
                                                } else {
                                                    setSelectedTags([...selectedTags, tag.tag_name])
                                                }
                                            }}
                                        >
                                            <CheckIcon
                                                className={`mr-2 h-4 w-4 ${selectedTags.includes(tag.tag_name) ? "opacity-100" : "opacity-0"
                                                    }`}
                                            />
                                            {tag.tag_name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                {inputValue && !contenTagData?.data.some((tag) => tag.tag_name === inputValue) && (
                                    <CommandItem
                                        value={inputValue}
                                        onSelect={() => {
                                            if (!selectedTags.includes(inputValue)) {
                                                setSelectedTags([...selectedTags, inputValue])
                                            }
                                            setInputValue("")
                                        }}
                                    >
                                        <CheckIcon className="mr-2 h-4 w-4 opacity-0" />
                                        Adicionar nova tag: <strong>{inputValue}</strong>
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
                            <CommandList>
                                {loadingTypeData && <CommandEmpty>Carregando tipos...</CommandEmpty>}
                                {errorTypeData && <CommandEmpty>Erro ao carregar tipos.</CommandEmpty>}
                                {!loadingTypeData && contenTypeData?.data.length === 0 && (
                                    <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                                )}
                                <CommandGroup>
                                    {contenTypeData?.data.map((type) => (
                                        <CommandItem
                                            key={type.id}
                                            value={type.title}
                                            onSelect={() => {
                                                setContentType(type.title)
                                                setOpenTypes(false)
                                            }}
                                        >
                                            <CheckIcon
                                                className={`mr-2 h-4 w-4 ${contentType === type.title ? "opacity-100" : "opacity-0"
                                                    }`}
                                            />
                                            {type.title}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
                    <Tiptap content={content} onChange={setContent} />
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Enviar Conteúdo
                    </button>
                </div>
            </form>
        </div>
    )
}