import api from "@/service/axios";
import { DeleteContentResponseSchema, DeleteContentSchema, type DeleteContentPayload, type DeleteContentResponse } from "../../schemas/contentSchema/DeleteContentSchema";

export async function DeleteContentApi(
  payload: DeleteContentPayload,
): Promise<DeleteContentResponse> {
  const validatedPayload = DeleteContentSchema.parse(payload);

  const { id } = validatedPayload;

  console.log("Deletando conteúdo com ID:", id);

  try {
    const response = await api.delete<DeleteContentResponse>(
      `/api/conteudos/${id}`,
    );

    console.log("Resposta do servidor:", response.data);
    return DeleteContentResponseSchema.parse(response.data);
  } catch (error: any) {
    console.error("Erro na API:", error.response?.data || error.message);
    if (error.response) {
      throw new Error(
        error.response.data.message || "Erro ao deletar conteúdo",
      );
    }
    throw new Error("Erro ao deletar conteúdo");
  }
}

