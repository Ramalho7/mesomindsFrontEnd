import type { ContentTag } from "./contentTag/ContentTag"

export type ContentPayload = {
    title: string
    content: string
    content_type: string
    content_tag: ContentTag
    status: 'Ativo' | 'Rascunho' | 'Inativo'
    published_at: string
    is_moderator_only: boolean
    images: string[]
    image_alt_text: string[]
}