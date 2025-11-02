import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/service/axios';

export const DeleteContentSchema = z.object({
    id: z.number().min(1, 'ID do conteúdo é obrigatório'),
})

export type DeleteContentPayload = z.infer<typeof DeleteContentSchema>

export const DeleteContentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.object({
        id: z.number(),
        title: z.string(),
    }).optional(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
})

export type DeleteContentResponse = z.infer<typeof DeleteContentResponseSchema>

async function DeleteContentApi(payload: DeleteContentPayload): Promise<DeleteContentResponse> {
    const validatedPayload = DeleteContentSchema.parse(payload)
    
    const { id } = validatedPayload

    console.log('Deletando conteúdo com ID:', id)

    try {
        const response = await api.delete<DeleteContentResponse>(`/api/conteudos/${id}`)

        console.log('Resposta do servidor:', response.data)
        return DeleteContentResponseSchema.parse(response.data)
    } catch (error: any) {
        console.error('Erro na API:', error.response?.data || error.message)
        if (error.response) {
            throw new Error(error.response.data.message || 'Erro ao deletar conteúdo')
        }
        throw new Error('Erro ao deletar conteúdo')
    }
}

export function useDeleteContent() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (payload: DeleteContentPayload) => DeleteContentApi(payload),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['content'] })
            queryClient.invalidateQueries({ queryKey: ['content', variables.id] })
        },
    })
}