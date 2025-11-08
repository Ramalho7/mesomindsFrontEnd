import api from "@/service/axios";
import { createContentResponseSchema, createContentSchema, type CreateContentPayload, type CreateContentResponse } from "../schemas/contentSchema/PostContentShecma";

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
