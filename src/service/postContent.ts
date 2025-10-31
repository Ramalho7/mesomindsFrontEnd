import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/service/axios';

export const createContentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  content_type: z.string().min(1, 'Tipo de conteúdo é obrigatório'),
  content_tag: z.string().min(1, 'Tag do conteúdo é obrigatória'),
  status: z.enum(['Ativo', 'Rascunho', 'Arquivado'], {
    message: 'Status deve ser Ativo, Rascunho ou Arquivado',
  }),
  is_moderator_only: z.boolean(),
  images: z.array(z.instanceof(File)).optional(),
  image_alt_text: z.array(z.string()).optional(),
  published_at: z.string().optional(), // Add published_at as an optional field
}).refine(
  (data) => {
    if (data.images && data.image_alt_text) {
      return data.images.length === data.image_alt_text.length
    }
    return true
  },
  {
    message: 'Cada imagem deve ter um texto alternativo correspondente',
    path: ['image_alt_text'],
  }
)

export type CreateContentPayload = z.infer<typeof createContentSchema>

export const createContentResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    created_at: z.string(),
  }).optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
})

export type CreateContentResponse = z.infer<typeof createContentResponseSchema>

async function createContentApi(payload: CreateContentPayload): Promise<CreateContentResponse> {
  const validatedPayload = createContentSchema.parse(payload)

  const formData = new FormData()

  formData.append('title', validatedPayload.title)
  formData.append('content', validatedPayload.content)
  formData.append('content_type', validatedPayload.content_type)
  formData.append('content_tag', validatedPayload.content_tag)
  formData.append('status', validatedPayload.status)
  formData.append('is_moderator_only', validatedPayload.is_moderator_only ? '1' : '0')

  if (validatedPayload.published_at) {
    formData.append('published_at', validatedPayload.published_at)
  }

  if (validatedPayload.images && validatedPayload.images.length > 0) {
    validatedPayload.images.forEach((image) => {
      formData.append('images[]', image)
    })
  }

  if (validatedPayload.image_alt_text && validatedPayload.image_alt_text.length > 0) {
    validatedPayload.image_alt_text.forEach((altText) => {
      formData.append('image_alt_text[]', altText)
    })
  }

  console.log('Payload enviado:', Object.fromEntries(formData.entries())) // Log do payload

  try {
    const response = await api.post<CreateContentResponse>('api/conteudos', formData)

    console.log('Resposta do servidor:', response.data) // Log da resposta do servidor

    return createContentResponseSchema.parse(response.data)
  } catch (error: any) {
    console.error('Erro na API:', error.response?.data || error.message) 
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao criar conteúdo')
    }
    throw new Error('Erro ao criar conteúdo')
  }
}

export function useCreateContent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createContentApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] })
      console.log('Conteúdo criado com sucesso:', data)
    },
    onError: (error) => {
      console.error('Erro ao criar conteúdo:', error)
    },
  })
}
