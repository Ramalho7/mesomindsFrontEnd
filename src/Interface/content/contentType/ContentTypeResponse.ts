import type { PaginationLink } from "../../PaginationLink"
import type { ContentType } from "./ContentType"

export interface ContentTypeResponse {
  current_page: number
  data: ContentType[]
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