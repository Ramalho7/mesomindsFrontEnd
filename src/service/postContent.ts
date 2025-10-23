import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const createContentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  content_type: z.string().min(1, 'Tipo de conteúdo é obrigatório'),
  content_tag: z.string().min(1, 'Tag do conteúdo é obrigatória'),
  status: z.enum(['Ativo', 'Rascunho', 'Arquivado'], {
    message: 'Status deve ser Ativo, Rascunho ou Arquivado',
  }),
  published_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
  is_moderator_only: z.boolean(),
  images: z.array(z.instanceof(File)).optional(),
  image_alt_text: z.array(z.string()).optional(),
}).refine(
  (data) => {
    // Valida que se há imagens, deve haver alt text e vice-versa
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

// Schema de resposta da API
export const createContentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    created_at: z.string(),
  }).optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
})

export type CreateContentResponse = z.infer<typeof createContentResponseSchema>

// Constantes
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

/**
 * Função para criar o conteúdo via API
 */
async function createContentApi(payload: CreateContentPayload): Promise<CreateContentResponse> {
  // Valida o payload antes de enviar
  const validatedPayload = createContentSchema.parse(payload)

  // Cria FormData para enviar dados multipart
  const formData = new FormData()

  // Adiciona campos de texto
  formData.append('title', validatedPayload.title)
  formData.append('content', validatedPayload.content)
  formData.append('content_type', validatedPayload.content_type)
  formData.append('content_tag', validatedPayload.content_tag)
  formData.append('status', validatedPayload.status)
  formData.append('published_at', validatedPayload.published_at)
  formData.append('is_moderator_only', validatedPayload.is_moderator_only ? '1' : '0')

  // Adiciona imagens se existirem
  if (validatedPayload.images && validatedPayload.images.length > 0) {
    validatedPayload.images.forEach((image) => {
      formData.append('images[]', image)
    })
  }

  // Adiciona alt text das imagens se existir
  if (validatedPayload.image_alt_text && validatedPayload.image_alt_text.length > 0) {
    validatedPayload.image_alt_text.forEach((altText) => {
      formData.append('image_alt_text[]', altText)
    })
  }

  // Envia requisição
  const response = await fetch(`${API_URL}/contents`, {
    method: 'POST',
    body: formData,
    headers: {
      // Adicione aqui headers de autenticação se necessário
      // 'Authorization': `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao criar conteúdo')
  }

  // Valida e retorna a resposta
  return createContentResponseSchema.parse(data)
}

/**
 * Hook do TanStack Query para criar conteúdo
 */
export function useCreateContent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createContentApi,
    onSuccess: (data) => {
      // Invalida queries relacionadas quando o conteúdo é criado com sucesso
      queryClient.invalidateQueries({ queryKey: ['contents'] })
      console.log('Conteúdo criado com sucesso:', data)
    },
    onError: (error) => {
      console.error('Erro ao criar conteúdo:', error)
    },
  })
}
