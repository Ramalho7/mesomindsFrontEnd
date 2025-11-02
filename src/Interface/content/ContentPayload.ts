import type { ContentType } from "./contentType/ContentType"
import type { ContentTag } from "./contentTag/ContentTag"
import type { Images } from "./Images"
import type { Creator } from "../Criator"
import type { LastEditor } from "../LastEditor"

export type ContentPayload = {
    id: number
    title: string
    content: string
    id_materia: number | null
    content_types_id: number
    status: 'Ativo' | 'Rascunho' | 'Inativo'
    published_at: string | null
    created_at: string
    updated_at: string
    creator?: Creator | null | undefined
    last_editor?: LastEditor | null | undefined
    content_type: ContentType
    content_tags: ContentTag[]
    images: Images[] | null
    is_moderator_only?: boolean
}