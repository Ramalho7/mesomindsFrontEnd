import { z, ZodError } from "zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/service/axios";
import type { ContentPayloadResponse } from "@/Interface/content/ContentPayloadResponse";
import { imageSchema } from "../schemas/imageSchema";
import { creatorSchema } from "../schemas/creatorZodSchema";
import type { ContentPayload } from "@/Interface/content/ContentPayload";

const contentTypeSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.enum(["Ativo", "Inativo"]),
  creator: creatorSchema.nullish(),
  last_editor: creatorSchema.nullish(),
});

const contentTagSchema = z.array(
  z.object({
    id: z.number(),
    tag_name: z.string(),
    is_moderator_only: z.number(),
    count: z.number(),
    description: z.string(),
    creator: creatorSchema.nullish(),
    last_editor: creatorSchema.nullish(),
    created_at: z.string(),
    updated_at: z.string(),
    status: z.enum(["Ativo", "Inativo"]),
    pivot: z.object({
      content_id: z.number(),
      tag_id: z.number(),
    }),
  }),
);

const getContentSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  id_materia: z.number().nullable(),
  content_types_id: z.number(),
  status: z.enum(["Ativo", "Inativo", "Rascunho"]),
  published_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  creator: creatorSchema.nullish(),
  last_editor: creatorSchema.nullish(),
  content_type: contentTypeSchema,
  content_tags: contentTagSchema,
  images: z.array(imageSchema).nullable(),
  is_moderator_only: z.boolean().optional(),
});

export type getContentSchema = z.infer<typeof getContentSchema>;

const ContentByIdResponseSchema = z.object({
  success: z.boolean(),
  data: getContentSchema,
});

export async function fetchContent(id?: number): Promise<ContentPayload> {
  try {
    const url = `/api/conteudos/${id}`;
    const response = await api.get(url);
    console.log("Resposta da API:", response.data);

    const parsedResponse = ContentByIdResponseSchema.parse(response.data);
    console.log("Conteúdo validado:", parsedResponse.data);
    return parsedResponse.data;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Erro de validação do Zod:", error.issues);
    } else if (error instanceof Error) {
      console.error("Erro ao carregar o conteúdo:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error("Não foi possível carregar o conteúdo");
  }
}

