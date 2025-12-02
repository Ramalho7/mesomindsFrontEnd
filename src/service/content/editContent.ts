import api from "@/service/axios";
import { EditContentResponseSchema, EditContentSchema, type EditContentPayload, type EditContentResponse } from "../../schemas/contentSchema/EditContentSchema";

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

