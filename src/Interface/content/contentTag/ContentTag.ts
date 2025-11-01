import type { Creator } from "../../Criator"
import type { LastEditor } from "../../LastEditor"

export type ContentTag = {
    id: number
    tag_name: string
    is_moderator_only: number
    count: number
    description: string
    creator: Creator | null
    last_editor: LastEditor | null
    created_at: string
    updated_at: string
    status: 'Ativo' | 'Inativo'
}