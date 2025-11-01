import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import api from '@/service/axios'
import { creatorSchema } from "@/service/schemas/creatorZodSchema"
import type { ContentTypeResponse } from "@/Interface/content/contentType/ContentTypeResponse"

const contentTypeSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    creator: creatorSchema,
    last_editor: creatorSchema,
    created_at: z.string(),
    updated_at: z.string(),
    status: z.enum(['Ativo', 'Inativo']),
})

export const contentTypeResponseSchema = z.object({
    current_page: z.number(),
    data: z.array(contentTypeSchema),
    first_page_url: z.string(),
    from: z.number(),
    last_page: z.number(),
    last_page_url: z.string(),
    links: z.array(
        z.object({
            url: z.string().nullable(),
            label: z.string(),
            page: z.number().nullable(),
            active: z.boolean(),
        })
    ),
    next_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number(),
    prev_page_url: z.string().nullable(),
    to: z.number(),
    total: z.number(),
})

const apiResponseSchema = z.object({
    success: z.boolean(),
    data: contentTypeResponseSchema,
})

export type ContentTypeResponseZ = z.infer<typeof contentTypeResponseSchema>
export type ContentTag = z.infer<typeof contentTypeSchema>

async function fetchContentTypes(): Promise<ContentTypeResponse> {
    try {
        const response = await api.get('api/tiposconteudo')
        console.log('Resposta da API type:', response.data)

        const validatedResponse = apiResponseSchema.parse(response.data)

        return validatedResponse.data
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Erro de validação Zod:', error.issues)
        }
        throw error
    }
}

export function useContentTypes() {
    return useQuery({
        queryKey: ['contentTypes'],
        queryFn: fetchContentTypes,
        staleTime: 1000 * 60 * 5,
    })
}