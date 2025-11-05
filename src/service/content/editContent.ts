import { z } from "zod";
import api from "@/service/axios";

export const EditContentSchema = z.object({
  id: z.number(),
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
});

export type EditContentPayload = z.infer<typeof EditContentSchema>;

export const EditContentResponseSchema = z.object({
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

export type EditContentResponse = z.infer<typeof EditContentResponseSchema>;

export async function EditContentApi(
  payload: EditContentPayload,
): Promise<EditContentResponse> {
  const validatedPayload = EditContentSchema.parse(payload);

  const { id, ...data } = validatedPayload;

  const requestBody = {
    title: data.title,
    content: data.content,
    content_type: data.content_type,
    content_tags: data.tags,
    status: data.status,
    is_moderator_only: data.is_moderator_only,
    published_at: data.published_at,
    images: data.images,
    image_alt_text: data.image_alt_text,
  };

  console.log("Payload enviado para o back-end:", requestBody);

  try {
    const response = await api.put<EditContentResponse>(
      `/api/conteudos/${id}`,
      requestBody,
    );

    console.log("Resposta do servidor:", response.data);
    return EditContentResponseSchema.parse(response.data);
  } catch (error: any) {
    console.error("Erro na API:", error.response?.data || error.message);
    if (error.response) {
      throw new Error(
        error.response.data.message || "Erro ao Atualizar conteúdo",
      );
    }
    throw new Error("Erro ao Atualizar conteúdo");
  }
}

