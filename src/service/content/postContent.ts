import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/service/axios";

export const createContentSchema = z
  .object({
    title: z
      .string()
      .min(1, "Título é obrigatório")
      .max(255, "Título muito longo"),
    content: z.string().min(1, "Conteúdo é obrigatório"),
    content_type: z.string().min(1, "Tipo de conteúdo é obrigatório"),
    tags: z.array(
      z.object({
        tag_name: z
          .string()
          .min(1, "Nome da tag é obrigatório")
          .max(255, "Nome da tag muito longo"),
        description: z.string().optional(),
      }),
    ),
    status: z.enum(["Ativo", "Rascunho", "Arquivado"], {
      message: "Status deve ser Ativo, Rascunho ou Arquivado",
    }),
    is_moderator_only: z.boolean(),
    images: z.array(z.string()).optional(),
    image_alt_text: z.array(z.string()).optional(),
    published_at: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.images && data.image_alt_text) {
        return data.images.length === data.image_alt_text.length;
      }
      return true;
    },
    {
      message: "Cada imagem deve ter um texto alternativo correspondente",
      path: ["image_alt_text"],
    },
  );

export type CreateContentPayload = z.infer<typeof createContentSchema>;

export const createContentResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      id: z.number(),
      title: z.string(),
      content: z.string(),
      created_at: z.string(),
    })
    .optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type CreateContentResponse = z.infer<typeof createContentResponseSchema>;

export async function createContentApi(
  payload: CreateContentPayload,
): Promise<CreateContentResponse> {
  const validatedPayload = createContentSchema.parse(payload);

  const requestBody = {
    title: validatedPayload.title,
    content: validatedPayload.content,
    content_type: validatedPayload.content_type,
    content_tags: validatedPayload.tags,
    status: validatedPayload.status,
    is_moderator_only: validatedPayload.is_moderator_only,
    published_at: validatedPayload.published_at,
    images: validatedPayload.images,
    image_alt_text: validatedPayload.image_alt_text,
  };

  console.log("Payload enviado para o back-end:", requestBody);

  try {
    const response = await api.post<CreateContentResponse>(
      "api/conteudos",
      requestBody,
    );

    console.log("Resposta do servidor:", response.data);
    return createContentResponseSchema.parse(response.data);
  } catch (error: any) {
    console.error("Erro na API:", error.response?.data || error.message);
    if (error.response) {
      throw new Error(error.response.data.message || "Erro ao criar conteúdo");
    }
    throw new Error("Erro ao criar conteúdo");
  }
}
