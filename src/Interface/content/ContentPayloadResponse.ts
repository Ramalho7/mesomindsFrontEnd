import type { PaginationLink } from "../PaginationLink";
import type { ContentPayload } from "./ContentPayload";

export type ContentPayloadResponse = {
  current_page: number;
  data: ContentPayload[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
