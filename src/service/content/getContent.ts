import { z, ZodError } from 'zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/service/axios';
import type { ContentPayloadResponse } from '@/Interface/content/ContentPayloadResponse';
import { imageSchema } from '../schemas/imageSchema';
import { creatorSchema } from '../schemas/creatorZodSchema';

const contentTypeSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    status: z.enum(['Ativo', 'Inativo']),
    creator: creatorSchema.nullish(),
    last_editor: creatorSchema.nullish(),
});

const contentTagSchema = z.array(
    z.object({
        id: z.number(),
        tag_name: z.string(),
        is_moderator_only: z.number(),
        count: z.number(),
        description: z.string(),
        creator: creatorSchema.nullish(),
        last_editor: creatorSchema.nullish(),
        created_at: z.string(),
        updated_at: z.string(),
        status: z.enum(['Ativo', 'Inativo']),
        pivot: z.object({
            content_id: z.number(),
            tag_id: z.number(),
        }),
    })
);

const getContentSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    id_materia: z.number().nullable(),
    content_types_id: z.number(),
    status: z.enum(['Ativo', 'Inativo', 'Rascunho']),
    published_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    creator: creatorSchema.nullish(),
    last_editor: creatorSchema.nullish(),
    content_type: contentTypeSchema,
    content_tags: contentTagSchema,
    images: z.array(imageSchema).nullable(),
    is_moderator_only: z.boolean().optional(),
});

export type getContentSchema = z.infer<typeof getContentSchema>

export const getContentSchemaResponse = z.object({
    current_page: z.number(),
    data: z.array(getContentSchema),
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
    prev_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number(),
    to: z.number(),
    total: z.number(),
});

const apiResponseSchema = z.object({
    success: z.boolean(),
    data: getContentSchemaResponse,
})

export type ContentResponseZ = z.infer<typeof getContentSchemaResponse>

async function fetchContents(): Promise<ContentPayloadResponse> {
    try {
        const response = await api.get('/api/conteudos');
        console.log('Resposta da API:', response.data);

        const parsedResponse = apiResponseSchema.parse(response.data);

        console.log('Conteúdo validado:', parsedResponse.data);
        return parsedResponse.data;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error('Erro de validação do Zod:', error.issues);
        } else if (error instanceof Error) {
            console.error('Erro ao carregar os conteúdos:', error.message);
        } else {
            console.error('Erro desconhecido:', error);
        }
        throw new Error('Não foi possível carregar os conteúdos');
    }
}

export function useGetContent() {
    return useQuery({
        queryKey: ['content'],
        queryFn: fetchContents,
        staleTime: 1000 * 60 * 5,
    })
}