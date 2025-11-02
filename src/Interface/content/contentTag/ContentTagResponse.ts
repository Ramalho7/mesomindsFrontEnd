import type { ContentTag } from "./ContentTag"
import type { PaginationLink } from "../../PaginationLink"

export type ContentTagResponse = {
    current_page: number
    data: ContentTag[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: PaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}