import type { ContentTagResponse } from "@/Interface/content/contentTag/ContentTagResponse";

import { z } from "zod";
import api from "@/service/axios";
import { creatorSchema } from "@/service/schemas/creatorZodSchema";

export const contentTagSchema = z.object({
  id: z.number(),
  tag_name: z.string(),
  is_moderator_only: z.number(),
  count: z.number(),
  description: z.string(),
  creator: creatorSchema.nullable(),
  last_editor: creatorSchema.nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.enum(["Ativo", "Inativo"]),
});

export const contentTagResponseSchema = z.object({
  current_page: z.number(),
  data: z.array(contentTagSchema),
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
    }),
  ),
  next_page_url: z.string().nullable(),
  path: z.string(),
  per_page: z.number(),
  prev_page_url: z.string().nullable(),
  to: z.number(),
  total: z.number(),
});

const apiResponseSchema = z.object({
  success: z.boolean(),
  data: contentTagResponseSchema,
});

export type ContentTagResponseZ = z.infer<typeof contentTagResponseSchema>;
export type ContentTag = z.infer<typeof contentTagSchema>;

export async function fetchContentTags(): Promise<ContentTagResponse> {
  try {
    const initialResponse = await api.get("api/tagsconteudo", {
      params: { page: 1, per_page: 100 },
    });

    const validatedResponse = apiResponseSchema.parse(initialResponse.data);

    const totalItems = validatedResponse.data.total;
    const perPage = validatedResponse.data.per_page;
    const totalPages = Math.ceil(totalItems / perPage);

    let allData: ContentTag[] = [...validatedResponse.data.data];

    for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
      const response = await api.get("api/tagsconteudo", {
        params: { page: currentPage, per_page: perPage },
      });

      const pageResponse = apiResponseSchema.parse(response.data);

      if (pageResponse.data.data) {
        allData = [...allData, ...pageResponse.data.data];
      }
    }

    return {
      ...validatedResponse.data,
      data: allData,
      total: allData.length,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Erro de validação Zod:", error.issues);
    } else {
      console.error("Erro ao buscar os tipos de conteúdo:", error);
    }
    throw error;
  }
}

